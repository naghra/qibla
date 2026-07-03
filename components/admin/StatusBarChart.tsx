import React from 'react';
import type { ApplicationStatus } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface StatusBarChartProps {
  data: Record<ApplicationStatus, number>;
  total: number;
}

const colors: Record<ApplicationStatus, string> = {
  pending: 'bg-amber-400',
  processing: 'bg-blue-500',
  approved: 'bg-emerald-500',
  rejected: 'bg-red-400',
};

const order: ApplicationStatus[] = ['pending', 'processing', 'approved', 'rejected'];

export const StatusBarChart: React.FC<StatusBarChartProps> = ({ data, total }) => {
  if (total === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">{adminLabels.dashboard.noData}</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-gray-100">
        {order.map((status) => {
          const pct = (data[status] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={status}
              className={`${colors[status]} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${adminLabels.status[status]}: ${data[status]}`}
            />
          );
        })}
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {order.map((status) => (
          <li key={status} className="flex items-center gap-2 text-xs sm:text-sm">
            <span className={`size-2.5 shrink-0 rounded-full ${colors[status]}`} />
            <span className="text-gray-600">{adminLabels.status[status]}</span>
            <span className="ms-auto font-bold text-gray-900">{data[status]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
