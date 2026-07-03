import React from 'react';
import type { StatusChange } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';
import { StatusBadge } from './StatusBadge';

interface ActivityTimelineProps {
  history: StatusChange[];
  createdAt: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ history, createdAt }) => {
  const items = history.length > 0 ? history : [{ status: 'pending' as const, at: createdAt }];

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <ol className="relative space-y-4 border-s-2 border-gray-100 ps-4">
      {items.map((entry, i) => (
        <li key={`${entry.at}-${i}`} className="relative">
          <span className="absolute -start-[21px] top-1 size-3 rounded-full border-2 border-white bg-blue-500 ring-2 ring-blue-100" />
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={entry.status} />
            <time className="text-xs text-gray-400">{formatTime(entry.at)}</time>
          </div>
          {entry.note && <p className="mt-1 text-xs text-gray-500">{entry.note}</p>}
          {i === 0 && (
            <p className="mt-0.5 text-xs text-gray-400">{adminLabels.detail.created}</p>
          )}
        </li>
      ))}
    </ol>
  );
};
