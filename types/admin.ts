import type { ApplicationData, PlanId } from '../types';
import type { Lang } from '../data/i18n/types';

export type ApplicationStatus = 'pending' | 'processing' | 'approved' | 'rejected';

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
}
