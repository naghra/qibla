import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { adminLabels } from '../../data/adminLabels';
import type { StoredApplication } from '../../types/admin';

interface ApplicationListCardProps {
  app: StoredApplication;
  formatDate: (iso: string) => string;
  onDelete: (id: string) => void;
  compact?: boolean;
}

export const ApplicationListCard: React.FC<ApplicationListCardProps> = ({
  app,
  formatDate,
  onDelete,
  compact = false,
}) => {
  const traveler = app.data.travelers[0];

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link
            to={`/admin/applications/${app.id}`}
            className="break-all font-mono text-xs text-blue-600 hover:underline"
            dir="ltr"
          >
            {app.id}
          </Link>
          <p className="mt-1 font-bold text-gray-900">
            {traveler?.firstName} {traveler?.lastName}
          </p>
          {!compact && (
            <p className="truncate text-xs text-gray-500" dir="ltr">
              {traveler?.email}
            </p>
          )}
        </div>
        <StatusBadge status={app.status} />
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div>
          <dt className="text-gray-400">{adminLabels.applications.destination}</dt>
          <dd className="font-medium text-gray-700">{app.destinationName}</dd>
        </div>
        {!compact && (
          <div>
            <dt className="text-gray-400">{adminLabels.applications.service}</dt>
            <dd className="font-medium text-gray-700">{app.serviceName}</dd>
          </div>
        )}
        <div>
          <dt className="text-gray-400">{adminLabels.applications.amount}</dt>
          <dd className="font-bold text-gray-900" dir="ltr">${app.totalAmount}</dd>
        </div>
        <div>
          <dt className="text-gray-400">{adminLabels.applications.date}</dt>
          <dd className="text-gray-600">{formatDate(app.createdAt)}</dd>
        </div>
      </dl>

      {!compact && (
        <div className="mt-3 flex gap-2 border-t border-gray-50 pt-3">
          <Link
            to={`/admin/applications/${app.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-700"
          >
            <Eye className="size-4" />
            {adminLabels.applications.view}
          </Link>
          <button
            type="button"
            onClick={() => onDelete(app.id)}
            className="flex items-center justify-center rounded-lg bg-red-50 px-4 py-2 text-red-600"
            aria-label={adminLabels.applications.delete}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </article>
  );
};
