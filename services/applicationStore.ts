import type {
  ApplicationInput,
  ApplicationStatus,
  DashboardStats,
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

export function saveApplication(input: ApplicationInput): StoredApplication {
  const now = new Date().toISOString();
  const record: StoredApplication = {
    id: generateId(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
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

export function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
): StoredApplication | undefined {
  const apps = readAll();
  const index = apps.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  apps[index] = {
    ...apps[index],
    status,
    adminNotes: adminNotes ?? apps[index].adminNotes,
    updatedAt: new Date().toISOString(),
  };
  writeAll(apps);
  return apps[index];
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

  return apps.reduce<DashboardStats>(
    (acc, app) => {
      acc.total += 1;
      acc[app.status] += 1;
      acc.totalRevenue += app.totalAmount;
      if (new Date(app.createdAt).toDateString() === today) acc.todayCount += 1;
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
    }
  );
}

/** Seed demo data when store is empty (admin preview). */
export function seedDemoApplicationsIfEmpty(): void {
  if (readAll().length > 0) return;

  const demo: ApplicationInput = {
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
  };

  saveApplication(demo);
}
