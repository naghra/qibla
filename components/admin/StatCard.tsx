import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'violet';
  hint?: string;
  onClick?: () => void;
}

const accents = {
  blue: 'bg-blue-50 text-blue-600 ring-blue-100',
  green: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  amber: 'bg-amber-50 text-amber-600 ring-amber-100',
  red: 'bg-red-50 text-red-600 ring-red-100',
  gray: 'bg-gray-100 text-gray-600 ring-gray-200',
  violet: 'bg-violet-50 text-violet-600 ring-violet-100',
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  accent = 'blue',
  hint,
  onClick,
}) => {
  const Tag = onClick ? 'button' : 'article';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`rounded-2xl border border-gray-100 bg-white p-4 text-start shadow-sm transition sm:p-5 ${
        onClick ? 'cursor-pointer hover:border-blue-200 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
          <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">{value}</p>
          {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
        </div>
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 sm:size-10 ${accents[accent]}`}>
          <Icon className="size-4 sm:size-5" />
        </div>
      </div>
    </Tag>
  );
};
