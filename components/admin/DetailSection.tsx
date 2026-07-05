import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface DetailSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  icon: Icon,
  children,
  className = '',
}) => (
  <section
    className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
  >
    <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-4 py-3 sm:px-5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-gray-100">
        <Icon className="size-4" />
      </div>
      <h2 className="text-sm font-bold text-gray-900 sm:text-base">{title}</h2>
    </div>
    <div className="p-4 sm:p-5">{children}</div>
  </section>
);

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  fullWidth?: boolean;
}

export const DetailField: React.FC<DetailFieldProps> = ({
  label,
  value,
  mono = false,
  fullWidth = false,
}) => (
  <div className={fullWidth ? 'sm:col-span-2' : undefined}>
    <dt className="mb-1 text-xs font-medium text-gray-500">{label}</dt>
    <dd
      className={`text-sm font-semibold text-gray-900 ${mono ? 'font-mono text-[13px] font-medium' : ''} ${
        value === 'غير متوفر' ? 'font-normal text-gray-400' : ''
      }`}
      dir={mono ? 'ltr' : undefined}
    >
      {value}
    </dd>
  </div>
);

export const DetailGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
);
