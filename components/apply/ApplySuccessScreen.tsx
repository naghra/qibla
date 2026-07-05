import React from 'react';
import {
  CheckCircle2,
  Mail,
  ShieldCheck,
  Clock,
  FileText,
  ArrowRight,
  ArrowLeft,
  Headphones,
} from 'lucide-react';
import { Logo } from '../Logo';
import { applySuccessCopy } from '../../data/i18n/applySuccessCopy';
import { useLanguage } from '../../context/LanguageContext';

export interface ApplySuccessScreenProps {
  submittedId: string | null;
  applicantName: string;
  email: string;
  destinationName: string;
  serviceName: string;
  planName: string;
  travelerCount: number;
  total: number;
  estimatedAt: string;
  onDone: () => void;
}

export const ApplySuccessScreen: React.FC<ApplySuccessScreenProps> = ({
  submittedId,
  applicantName,
  email,
  destinationName,
  serviceName,
  planName,
  travelerCount,
  total,
  estimatedAt,
  onDone,
}) => {
  const { lang } = useLanguage();
  const c = applySuccessCopy[lang];
  const firstName = applicantName.trim().split(/\s+/)[0] || applicantName;
  const DoneArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const summaryRows = [
    { label: c.destination, value: destinationName },
    { label: c.document, value: serviceName },
    { label: c.plan, value: planName },
    { label: c.travelers, value: String(travelerCount) },
    { label: c.amount, value: `$${total.toFixed(2)}`, ltr: true },
    { label: c.processingLabel, value: estimatedAt, ltr: true },
  ];

  return (
    <div className="fade-in mx-auto w-full max-w-3xl pb-8">
      {/* Official header band */}
      <div className="overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0c1929] via-[#1e3a8a] to-[#1d4ed8] px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="flex items-start justify-between gap-4">
          <Logo inverted className="h-9" showText={false} />
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-100">
            {c.badge}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="absolute inset-0 scale-110 rounded-full bg-emerald-400/20 blur-xl" />
            <div className="relative flex size-20 items-center justify-center rounded-full border-4 border-white/30 bg-emerald-500 shadow-lg ring-8 ring-emerald-500/20">
              <CheckCircle2 className="size-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-100/90">{c.subtitle}</p>
        </div>
      </div>

      {/* Reference card */}
      <div className="-mt-5 mx-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:mx-8 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/60 px-4 py-4 text-center sm:text-start">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {c.referenceLabel}
            </p>
            <p
              className="mt-1.5 break-all font-mono text-lg font-bold text-[#1e3a8a] sm:text-xl"
              dir="ltr"
            >
              {submittedId ?? '—'}
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {c.statusLabel}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm font-bold text-emerald-700">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              {c.statusValue}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <Mail className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-600">
              {c.thanks(firstName)} {c.emailNotice}
            </p>
            <p className="mt-0.5 truncate font-semibold text-gray-900" dir="ltr">
              {email}
            </p>
          </div>
        </div>
      </div>

      {/* Summary + steps */}
      <div className="mt-6 space-y-6 px-1 sm:px-2">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-5 py-3.5">
            <FileText className="size-4 text-blue-700" />
            <h3 className="text-sm font-bold text-gray-900">{c.detailsTitle}</h3>
          </div>
          <dl className="divide-y divide-gray-100">
            {summaryRows.map(({ label, value, ltr }) => (
              <div key={label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd
                  className="text-end text-sm font-semibold text-gray-900"
                  dir={ltr ? 'ltr' : undefined}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-5 py-3.5">
            <Clock className="size-4 text-blue-700" />
            <h3 className="text-sm font-bold text-gray-900">{c.nextStepsTitle}</h3>
          </div>
          <ol className="space-y-0 px-5 py-4">
            {c.steps.map((step, i) => (
              <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
                {i < c.steps.length - 1 && (
                  <span
                    className="absolute start-[15px] top-8 h-[calc(100%-0.5rem)] w-0.5 bg-blue-100"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-bold text-white shadow-sm">
                  {i + 1}
                </span>
                <p className="min-w-0 pt-1 text-sm leading-relaxed text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50/80 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="size-5 shrink-0 text-amber-700" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">{c.importantTitle}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-amber-900/85">{c.importantText}</p>
            </div>
          </div>
        </section>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
          <Headphones className="size-3.5" />
          {c.supportNote}
        </p>

        <button
          type="button"
          onClick={onDone}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1e3a8a] py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#1d4ed8] active:scale-[0.99]"
        >
          {c.backToHome}
          <DoneArrow className="size-4" />
        </button>
      </div>
    </div>
  );
};
