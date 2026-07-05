import type {
  ApplicationInput,
  ApplicationStatus,
  DailyCount,
  DashboardStats,
  DestinationStat,
  StoredApplication,
} from '../types/admin';

const STORAGE_KEY = 'qibla_applications';

function useApi(): boolean {
  return import.meta.env.PROD || import.meta.env.VITE_USE_API === 'true';
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function readAll(): StoredApplication[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredApplication[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(apps: StoredApplication[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function generateId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `APP-${ts}-${rand}`;
}

function weekStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - 6);
  return d;
}

export async function saveApplication(input: ApplicationInput): Promise<StoredApplication> {
  if (useApi()) {
    try {
      return await apiFetch<StoredApplication>('/api/applications', {
        method: 'POST',
        body: JSON.stringify(input),
      });
    } catch {
      // fall through to localStorage
    }
  }

  const now = new Date().toISOString();
  const record: StoredApplication = {
    id: generateId(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    statusHistory: [{ status: 'pending', at: now }],
    ...input,
  };
  const apps = readAll();
  apps.unshift(record);
  writeAll(apps);
  return record;
}

export async function getApplications(): Promise<StoredApplication[]> {
  if (useApi()) {
    try {
      return await apiFetch<StoredApplication[]>('/api/applications');
    } catch {
      // fall through
    }
  }
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getApplication(id: string): Promise<StoredApplication | undefined> {
  if (useApi()) {
    try {
      const app = await apiFetch<StoredApplication>(`/api/applications/${encodeURIComponent(id)}`);
      return app;
    } catch {
      // fall through
    }
  }
  return readAll().find((a) => a.id === id);
}

export async function getPendingCount(): Promise<number> {
  const apps = await getApplications();
  return apps.filter((a) => a.status === 'pending').length;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
): Promise<StoredApplication | undefined> {
  if (useApi()) {
    try {
      return await apiFetch<StoredApplication>(`/api/applications/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, adminNotes }),
      });
    } catch {
      // fall through
    }
  }

  const apps = readAll();
  const index = apps.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  const now = new Date().toISOString();
  const prev = apps[index];
  const history = [...(prev.statusHistory ?? [{ status: prev.status, at: prev.createdAt }])];

  if (prev.status !== status) {
    history.push({ status, at: now });
  }

  apps[index] = {
    ...prev,
    status,
    adminNotes: adminNotes ?? prev.adminNotes,
    updatedAt: now,
    statusHistory: history,
  };
  writeAll(apps);
  return apps[index];
}

export async function bulkUpdateStatus(ids: string[], status: ApplicationStatus): Promise<number> {
  if (useApi()) {
    try {
      const result = await apiFetch<{ updated: number }>('/api/applications/bulk', {
        method: 'PATCH',
        body: JSON.stringify({ ids, status }),
      });
      return result.updated;
    } catch {
      // fall through
    }
  }

  let updated = 0;
  for (const id of ids) {
    if (await updateApplicationStatus(id, status)) updated += 1;
  }
  return updated;
}

export async function deleteApplication(id: string): Promise<boolean> {
  if (useApi()) {
    try {
      await apiFetch<void>(`/api/applications/${encodeURIComponent(id)}`, { method: 'DELETE' });
      return true;
    } catch {
      // fall through
    }
  }

  const apps = readAll();
  const next = apps.filter((a) => a.id !== id);
  if (next.length === apps.length) return false;
  writeAll(next);
  return true;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const apps = await getApplications();
  const today = new Date().toDateString();
  const week = weekStart();

  const stats = apps.reduce<DashboardStats>(
    (acc, app) => {
      acc.total += 1;
      acc[app.status] += 1;
      acc.totalRevenue += app.totalAmount;

      const created = new Date(app.createdAt);
      if (created.toDateString() === today) acc.todayCount += 1;
      if (created >= week) {
        acc.weekCount += 1;
        acc.weekRevenue += app.totalAmount;
      }
      return acc;
    },
    {
      total: 0,
      pending: 0,
      processing: 0,
      approved: 0,
      rejected: 0,
      totalRevenue: 0,
      todayCount: 0,
      weekCount: 0,
      weekRevenue: 0,
      approvalRate: 0,
    }
  );

  const decided = stats.approved + stats.rejected;
  stats.approvalRate = decided > 0 ? Math.round((stats.approved / decided) * 100) : 0;
  return stats;
}

export async function getDailyCounts(days = 7): Promise<DailyCount[]> {
  const apps = await getApplications();
  const result: DailyCount[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const count = apps.filter((a) => new Date(a.createdAt).toDateString() === key).length;
    result.push({
      date: key,
      label: d.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric' }),
      count,
    });
  }
  return result;
}

export async function getTopDestinations(limit = 5): Promise<DestinationStat[]> {
  const apps = await getApplications();
  const map = new Map<string, DestinationStat>();

  for (const app of apps) {
    const existing = map.get(app.destinationSlug);
    if (existing) {
      existing.count += 1;
      existing.revenue += app.totalAmount;
    } else {
      map.set(app.destinationSlug, {
        slug: app.destinationSlug,
        name: app.destinationName,
        count: 1,
        revenue: app.totalAmount,
      });
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

export function exportApplicationsCsv(apps: StoredApplication[]): string {
  const headers = [
    'ID',
    'Status',
    'Applicant',
    'Email',
    'Phone',
    'Destination',
    'Service',
    'Plan',
    'Amount',
    'Created',
    'Updated',
  ];

  const rows = apps.map((app) => {
    const t = app.data.travelers[0];
    return [
      app.id,
      app.status,
      `${t?.firstName ?? ''} ${t?.lastName ?? ''}`.trim(),
      t?.email ?? '',
      t?.phone ?? '',
      app.destinationName,
      app.serviceName,
      app.planName,
      String(app.totalAmount),
      app.createdAt,
      app.updatedAt,
    ];
  });

  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');
}

export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Seed demo data when store is empty (admin preview, dev only). */
export async function seedDemoApplicationsIfEmpty(): Promise<void> {
  if (import.meta.env.PROD) return;
  if (readAll().length > 0) return;

  const demos: ApplicationInput[] = [
    {
      lang: 'en',
      destinationSlug: 'aruba',
      destinationName: 'Aruba',
      serviceSlug: 'ed-card',
      serviceName: 'Aruba ED Card',
      planId: 'standard',
      planName: 'Standard',
      totalAmount: 65,
      data: {
        plan: 'standard',
        travelers: [
          {
            firstName: 'John',
            lastName: 'Smith',
            passportNumber: 'AB1234567',
            nationality: 'US',
            dateOfBirth: '1990-05-15',
            gender: 'male',
            email: 'john@example.com',
            phone: '+1 555 0100',
          },
        ],
        travel: {
          arrivalDate: '2026-08-01',
          departureDate: '2026-08-10',
          flightNumber: 'AA123',
          purposeOfVisit: 'tourism',
          accommodationAddress: '123 Palm Beach Rd',
          accommodationCity: 'Oranjestad',
        },
      },
    },
    {
      lang: 'ar',
      destinationSlug: 'thailand',
      destinationName: 'Thailand',
      serviceSlug: 'tdac',
      serviceName: 'Thailand Digital Arrival Card',
      planId: 'fast',
      planName: 'Fast',
      totalAmount: 89,
      data: {
        plan: 'fast',
        travelers: [
          {
            firstName: 'Sarah',
            lastName: 'Ahmed',
            passportNumber: 'EG9876543',
            nationality: 'EG',
            dateOfBirth: '1988-03-22',
            gender: 'female',
            email: 'sarah@example.com',
            phone: '+20 100 555 1234',
          },
        ],
        travel: {
          arrivalDate: '2026-09-15',
          departureDate: '2026-09-25',
          flightNumber: 'TG456',
          purposeOfVisit: 'tourism',
          accommodationAddress: 'Sukhumvit Soi 11',
          accommodationCity: 'Bangkok',
        },
      },
    },
  ];

  for (const demo of demos) {
    await saveApplication(demo);
  }

  const apps = await getApplications();
  if (apps[1]) await updateApplicationStatus(apps[1].id, 'processing');
  if (apps[2]) await updateApplicationStatus(apps[2].id, 'approved', 'تم التحقق من البيانات');
}
