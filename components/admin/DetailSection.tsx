import React from 'react';
import type { LucideIcon } from 'lucide-react';

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
  <section
    className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
  >
    <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-gray-100">
          <Icon className="size-4" />
        </div>
        <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base">{title}</h2>
      </div>
      {action}
    </div>
    <div className="divide-y divide-gray-100 px-4 sm:px-5">{children}</div>
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
      <dt className="text-xs font-medium text-gray-500 sm:text-sm">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2">
        <span
          className={`break-all text-sm font-semibold text-gray-900 ${
            mono ? 'font-mono text-[13px] font-medium tracking-tight' : ''
          } ${empty ? 'font-normal text-gray-400' : ''}`}
          dir={mono ? 'ltr' : undefined}
        >
          {value}
        </span>
        {copyText && !empty && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600"
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
