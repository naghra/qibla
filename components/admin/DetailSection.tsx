import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { adminCard, adminIconBox } from './adminStyles';

interface DetailSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  icon: Icon,
  children,
  className = '',
  action,
}) => (
  <section className={`${adminCard} overflow-hidden p-0 ${className}`}>
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-gradient-to-l from-slate-50/80 to-white px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className={adminIconBox('indigo')}>
          <Icon className="size-4" />
        </div>
        <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">{title}</h2>
      </div>
      {action}
    </div>
    <div className="divide-y divide-slate-100 px-4 sm:px-5">{children}</div>
  </section>
);

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  copyText?: string;
}

export const DetailField: React.FC<DetailFieldProps> = ({
  label,
  value,
  mono = false,
  copyText,
}) => {
  const [copied, setCopied] = React.useState(false);
  const empty = value === 'غير متوفر';

  const handleCopy = async () => {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid grid-cols-[minmax(5.5rem,32%)_1fr] items-start gap-x-4 gap-y-1 py-3.5 sm:items-center">
      <dt className="text-xs font-medium text-slate-500 sm:text-sm">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2">
        <span
          className={`break-all text-sm font-semibold text-slate-900 ${
            mono ? 'font-mono text-[13px] font-medium tracking-tight' : ''
          } ${empty ? 'font-normal text-slate-400' : ''}`}
          dir={mono ? 'ltr' : undefined}
        >
          {value}
        </span>
        {copyText && !empty && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
            title="نسخ"
          >
            {copied ? (
              <span className="text-[10px] font-bold text-emerald-600">✓</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            )}
          </button>
        )}
      </dd>
    </div>
  );
};

export const DetailGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dl className="contents">{children}</dl>
);
