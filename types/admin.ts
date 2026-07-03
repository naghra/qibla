import type { ApplicationData, PlanId } from '../types';
import type { Lang } from '../data/i18n/types';

export type ApplicationStatus = 'pending' | 'processing' | 'approved' | 'rejected';

export type ApplicationSortField = 'date' | 'amount' | 'name';

export interface StatusChange {
  status: ApplicationStatus;
  at: string;
  note?: string;
}

export interface StoredApplication {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  lang: Lang;
  destinationSlug: string;
  destinationName: string;
  serviceSlug: string;
  serviceName: string;
  planId: PlanId;
  planName: string;
  totalAmount: number;
  data: ApplicationData;
  adminNotes?: string;
  statusHistory?: StatusChange[];
}

export interface ApplicationInput {
  lang: Lang;
  destinationSlug: string;
  destinationName: string;
  serviceSlug: string;
  serviceName: string;
  planId: PlanId;
  planName: string;
  totalAmount: number;
  data: ApplicationData;
}

export interface DashboardStats {
  total: number;
  pending: number;
  processing: number;
  approved: number;
  rejected: number;
  totalRevenue: number;
  todayCount: number;
  weekCount: number;
  weekRevenue: number;
  approvalRate: number;
}

export interface DailyCount {
  date: string;
  label: string;
  count: number;
}

export interface DestinationStat {
  slug: string;
  name: string;
  count: number;
  revenue: number;
}
