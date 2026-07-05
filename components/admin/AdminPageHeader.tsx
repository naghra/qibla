import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { adminIconBox } from './adminStyles';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
}) => (
  <header className="mb-5 flex flex-col gap-4 sm:mb-7">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className={adminIconBox('indigo')}>
              <Icon className="size-5" />
            </span>
          )}
          <div className="min-w-0">
            <h1 className="min-w-0 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>
      </div>
      {actions && (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          {actions}
        </div>
      )}
    </div>
  </header>
);
