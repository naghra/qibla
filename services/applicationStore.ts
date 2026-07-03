import type {
  ApplicationInput,
  ApplicationStatus,
  DailyCount,
  DashboardStats,
  DestinationStat,
  StoredApplication,
} from '../types/admin';

const STORAGE_KEY = 'qibla_applications';

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

export function saveApplication(input: ApplicationInput): StoredApplication {
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

export function getApplications(): StoredApplication[] {
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getApplication(id: string): StoredApplication | undefined {
  return readAll().find((a) => a.id === id);
}

export function getPendingCount(): number {
  return readAll().filter((a) => a.status === 'pending').length;
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
): StoredApplication | undefined {
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

export function bulkUpdateStatus(ids: string[], status: ApplicationStatus): number {
  let updated = 0;
  for (const id of ids) {
    if (updateApplicationStatus(id, status)) updated += 1;
  }
  return updated;
}

export function deleteApplication(id: string): boolean {
  const apps = readAll();
  const next = apps.filter((a) => a.id !== id);
  if (next.length === apps.length) return false;
  writeAll(next);
  return true;
}

export function getDashboardStats(): DashboardStats {
  const apps = readAll();
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

export function getDailyCounts(days = 7): DailyCount[] {
  const apps = readAll();
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

export function getTopDestinations(limit = 5): DestinationStat[] {
  const apps = readAll();
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

/** Seed demo data when store is empty (admin preview). */
export function seedDemoApplicationsIfEmpty(): void {
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
      planId: 'express',
      planName: 'Express',
      totalAmount: 89,
      data: {
        plan: 'express',
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
    {
      lang: 'en',
      destinationSlug: 'jamaica',
      destinationName: 'Jamaica',
      serviceSlug: 'c5-form',
      serviceName: 'Jamaica C5 Form',
      planId: 'standard',
      planName: 'Standard',
      totalAmount: 55,
      data: {
        plan: 'standard',
        travelers: [
          {
            firstName: 'Michael',
            lastName: 'Brown',
            passportNumber: 'UK4455667',
            nationality: 'GB',
            dateOfBirth: '1995-11-08',
            gender: 'male',
            email: 'michael@example.com',
            phone: '+44 7700 900123',
          },
        ],
        travel: {
          arrivalDate: '2026-07-20',
          departureDate: '2026-07-28',
          flightNumber: 'BA178',
          purposeOfVisit: 'tourism',
          accommodationAddress: 'Montego Bay Resort',
          accommodationCity: 'Montego Bay',
        },
      },
    },
  ];

  for (const demo of demos) {
    saveApplication(demo);
  }

  const apps = readAll();
  if (apps[1]) updateApplicationStatus(apps[1].id, 'processing');
  if (apps[2]) updateApplicationStatus(apps[2].id, 'approved', 'تم التحقق من البيانات');
}
