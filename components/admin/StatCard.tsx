import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { adminCard, adminCardHover, adminIconBox, adminStatAccent } from './adminStyles';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'blue' | 'green' | 'amber' | 'red' | 'gray' | 'violet';
  hint?: string;
  onClick?: () => void;
}

const iconTones = {
  blue: 'indigo' as const,
  green: 'emerald' as const,
  amber: 'amber' as const,
  red: 'rose' as const,
  gray: 'sky' as const,
  violet: 'violet' as const,
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
      className={`${adminCard} ${adminStatAccent[accent]} ${adminCardHover} text-start ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <p className="mt-1 bg-gradient-to-l from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
        <div className={adminIconBox(iconTones[accent])}>
          <Icon className="size-4 sm:size-5" />
        </div>
      </div>
    </Tag>
  );
};
