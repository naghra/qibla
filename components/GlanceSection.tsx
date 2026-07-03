import React from 'react';
import {
  Clock,
  CalendarDays,
  Hourglass,
  RefreshCw,
  Globe,
  QrCode,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { PrimaryButton, CheckItem } from './ui';
import { glanceItems, requirements, SITE_NAME } from '../data/content';
import { THAILAND_FLAG } from '../data/assets';

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  calendar: CalendarDays,
  hourglass: Hourglass,
  refresh: RefreshCw,
  globe: Globe,
  qr: QrCode,
};

interface GlanceSectionProps {
  onApply: () => void;
}

export const GlanceSection: React.FC<GlanceSectionProps> = ({ onApply }) => {
  return (
    <section id="how-to-apply" className="container mx-auto space-y-12 px-4 py-24">
      <div className="space-y-4 text-center">
        <h2 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          عن بطاقة الوصول الرقمية TDAC {THAILAND_FLAG}
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-xl">
          بطاقة TDAC هي متطلب إلزامي لدخول تايلاند لجميع غير التايلانديين. أكمل طلبك عبر الإنترنت
          قبل المغادرة واحصل على رمز QR لتسهيل إجراءات الهجرة.
        </p>
      </div>

      <div className="overflow-hidden rounded-4xl border border-blue-100/60 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 shadow-sm">
        {/* Card header */}
        <div className="border-b border-blue-100/60 bg-white/60 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md shadow-blue-500/20">
              <FileText className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">نظرة سريعة على بطاقة الوصول</h3>
              <p className="text-sm text-gray-500">كل ما تحتاج معرفته قبل التقديم</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          {/* Info grid */}
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glanceItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <dt className="mb-3 flex items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 transition group-hover:bg-blue-100">
                      <Icon className="size-4" strokeWidth={2.25} />
                    </span>
                    <span className="text-sm font-semibold text-blue-600">{item.title}</span>
                  </dt>
                  <dd className="space-y-1.5">
                    <p className="text-base font-bold text-gray-900">{item.highlight}</p>
                    <p className="text-pretty text-sm leading-relaxed text-gray-600">{item.text}</p>
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* Requirements */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-blue-500" />
              <h4 className="text-base font-bold text-gray-900">ما ستحتاجه للتقديم</h4>
            </div>
            <ul className="mb-6 grid gap-3 sm:grid-cols-2">
              {requirements.map((req) => (
                <CheckItem key={req}>{req}</CheckItem>
              ))}
            </ul>
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <PrimaryButton onClick={onApply}>قدّم الآن عبر الإنترنت</PrimaryButton>
              <p className="max-w-sm text-pretty text-xs leading-relaxed text-gray-500">
                {SITE_NAME} شركة خاصة — غير تابعة لأي جهة حكومية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
