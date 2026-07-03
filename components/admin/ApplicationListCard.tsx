import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Eye, Trash2, Check } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { QuickStatusSelect } from './QuickStatusSelect';
import { adminLabels } from '../../data/adminLabels';
import type { ApplicationStatus, StoredApplication } from '../../types/admin';

interface ApplicationListCardProps {
  app: StoredApplication;
  formatDate: (iso: string) => string;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: ApplicationStatus) => void;
  compact?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
}

export const ApplicationListCard: React.FC<ApplicationListCardProps> = ({
  app,
  formatDate,
  onDelete,
  onStatusChange,
  compact = false,
  selectable = false,
  selected = false,
  onSelect,
}) => {
  const traveler = app.data.travelers[0];
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    await navigator.clipboard.writeText(app.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className={`w-full max-w-full rounded-xl border bg-white p-4 shadow-sm transition ${selected ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}>
      <div className="mb-3 flex items-start gap-3">
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelect?.(app.id, e.target.checked)}
            className="mt-1 size-4 rounded border-gray-300 text-blue-600"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <Link
                  to={`/admin/applications/${app.id}`}
                  className="break-all font-mono text-xs text-blue-600 hover:underline"
                  dir="ltr"
                >
                  {app.id}
                </Link>
                <button
                  type="button"
                  onClick={copyId}
                  className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  title={adminLabels.applications.copyId}
                >
                  {copied ? <Check className="size-3 text-green-600" /> : <Copy className="size-3" />}
                </button>
              </div>
              <p className="mt-1 font-bold text-gray-900">
                {traveler?.firstName} {traveler?.lastName}
              </p>
              {!compact && (
                <p className="truncate text-xs text-gray-500" dir="ltr">
                  {traveler?.email}
                </p>
              )}
            </div>
            {!onStatusChange && <StatusBadge status={app.status} />}
          </div>
        </div>
      </div>

      {onStatusChange && (
        <div className="mb-3">
          <QuickStatusSelect
            value={app.status}
            onChange={(s) => onStatusChange(app.id, s)}
            size="sm"
          />
        </div>
      )}

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
