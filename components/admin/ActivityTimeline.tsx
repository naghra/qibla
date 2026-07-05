import React from 'react';
import type { StatusChange } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';
import { StatusBadge } from './StatusBadge';
import { formatAdminDate } from '../../utils/adminFormatters';

interface ActivityTimelineProps {
  history: StatusChange[];
  createdAt: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ history, createdAt }) => {
  const items = history.length > 0 ? history : [{ status: 'pending' as const, at: createdAt }];

  return (
    <ol className="relative space-y-0">
      {items.map((entry, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={`${entry.at}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span className="absolute start-[15px] top-8 h-[calc(100%-1rem)] w-0.5 bg-gray-200" aria-hidden />
            )}
            <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-sm ring-4 ring-blue-50">
              <span className="size-2 rounded-full bg-white" />
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={entry.status} />
                <time className="text-xs font-medium text-gray-500">{formatAdminDate(entry.at, true)}</time>
              </div>
              {entry.note && <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{entry.note}</p>}
              {i === 0 && (
                <p className="mt-1 text-[11px] text-gray-400">{adminLabels.detail.created}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
