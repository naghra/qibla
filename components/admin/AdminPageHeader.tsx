import React from 'react';
import type { LucideIcon } from 'lucide-react';

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
  <header className="mb-4 flex flex-col gap-3 sm:mb-6">
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        {Icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="size-5" />
          </span>
        )}
        <h1 className="min-w-0 text-lg font-bold text-gray-900 sm:text-2xl">{title}</h1>
      </div>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
    {actions && (
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        {actions}
      </div>
    )}
  </header>
);
