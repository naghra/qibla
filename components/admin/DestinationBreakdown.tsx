import React from 'react';
import { Link } from 'react-router-dom';
import type { DestinationStat } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface DestinationBreakdownProps {
  items: DestinationStat[];
}

export const DestinationBreakdown: React.FC<DestinationBreakdownProps> = ({ items }) => {
  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-slate-400">{adminLabels.dashboard.noData}</p>;
  }

  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <ul className="space-y-3.5">
      {items.map((item, idx) => (
        <li key={item.slug}>
          <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2.5 font-medium text-slate-800">
              <span className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-xs font-bold text-indigo-600">
                {idx + 1}
              </span>
              {item.name}
            </span>
            <span className="shrink-0 text-xs text-slate-500 sm:text-sm">
              <span className="whitespace-nowrap font-semibold text-slate-700">{item.count}</span>
              <span className="mx-1 text-slate-300">·</span>
              <span dir="ltr" className="font-medium text-emerald-600">
                ${item.revenue}
              </span>
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-violet-500 transition-all duration-500"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
      <li className="pt-1">
        <Link
          to="/admin/destinations"
          className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          {adminLabels.dashboard.viewAll} →
        </Link>
      </li>
    </ul>
  );
};
