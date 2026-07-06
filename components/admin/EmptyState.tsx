import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { adminCard } from './adminStyles';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description }) => (
  <div className={`${adminCard} flex flex-col items-center justify-center border-dashed border-slate-200/80 bg-slate-50/50 px-6 py-14 text-center`}>
    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500 ring-1 ring-indigo-500/10">
      <Icon className="size-6" />
    </div>
    <p className="font-semibold text-slate-700">{title}</p>
    {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
  </div>
);
