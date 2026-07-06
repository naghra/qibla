import React from 'react';
import type { ApplicationStatus } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface StatusBarChartProps {
  data: Record<ApplicationStatus, number>;
  total: number;
}

const colors: Record<ApplicationStatus, { bar: string; dot: string; bg: string }> = {
  pending: { bar: 'bg-gradient-to-l from-amber-400 to-amber-500', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  processing: { bar: 'bg-gradient-to-l from-indigo-400 to-indigo-600', dot: 'bg-indigo-500', bg: 'bg-indigo-50' },
  approved: { bar: 'bg-gradient-to-l from-emerald-400 to-emerald-600', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  rejected: { bar: 'bg-gradient-to-l from-rose-400 to-rose-500', dot: 'bg-rose-500', bg: 'bg-rose-50' },
};

const order: ApplicationStatus[] = ['pending', 'processing', 'approved', 'rejected'];

export const StatusBarChart: React.FC<StatusBarChartProps> = ({ data, total }) => {
  if (total === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">{adminLabels.dashboard.noData}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex h-3.5 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        {order.map((status) => {
          const pct = (data[status] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={status}
              className={`${colors[status].bar} transition-all duration-500`}
              style={{ width: `${pct}%` }}
              title={`${adminLabels.status[status]}: ${data[status]}`}
            />
          );
        })}
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {order.map((status) => (
          <li
            key={status}
            className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs sm:text-sm ${colors[status].bg}`}
          >
            <span className={`size-2 shrink-0 rounded-full ${colors[status].dot}`} />
            <span className="text-slate-600">{adminLabels.status[status]}</span>
            <span className="ms-auto font-bold text-slate-900">{data[status]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
