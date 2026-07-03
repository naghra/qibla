import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
      <Icon className="size-6" />
    </div>
    <p className="font-medium text-gray-700">{title}</p>
    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
  </div>
);
