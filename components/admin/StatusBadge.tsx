import React from 'react';
import type { ApplicationStatus } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

const styles: Record<ApplicationStatus, string> = {
  pending: 'bg-gradient-to-l from-amber-100 to-orange-100 text-amber-800 ring-amber-200/60',
  processing: 'bg-gradient-to-l from-indigo-100 to-violet-100 text-indigo-800 ring-indigo-200/60',
  approved: 'bg-gradient-to-l from-emerald-100 to-teal-100 text-emerald-800 ring-emerald-200/60',
  rejected: 'bg-gradient-to-l from-rose-100 to-pink-100 text-rose-800 ring-rose-200/60',
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${styles[status]}`}>
    {adminLabels.status[status]}
  </span>
);
