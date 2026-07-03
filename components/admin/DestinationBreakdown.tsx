import React from 'react';
import { Link } from 'react-router-dom';
import type { DestinationStat } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface DestinationBreakdownProps {
  items: DestinationStat[];
}

export const DestinationBreakdown: React.FC<DestinationBreakdownProps> = ({ items }) => {
  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-gray-400">{adminLabels.dashboard.noData}</p>;
  }

  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={item.slug}>
          <div className="mb-1 flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 font-medium text-gray-800">
              <span className="flex size-5 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500">
                {idx + 1}
              </span>
              {item.name}
            </span>
            <span className="shrink-0 text-gray-500">
              {item.count} {adminLabels.dashboard.applications}
              <span className="mx-1 text-gray-300">·</span>
              <span dir="ltr">${item.revenue}</span>
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
      <li className="pt-1">
        <Link to="/admin/destinations" className="text-xs font-medium text-blue-600 hover:underline">
          {adminLabels.dashboard.viewAll} →
        </Link>
      </li>
    </ul>
  );
};
