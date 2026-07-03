import React from 'react';
import { Header } from './Header';
import { PrimaryButton, CheckItem } from './ui';
import { requirements, SITE_NAME } from '../data/content';
import { IMAGES, THAILAND_FLAG } from '../data/assets';
import { Logo } from './Logo';

interface HeroProps {
  onApply: () => void;
}

const trustItems = [
  { icon: 'star', label: 'تقييم ممتاز على Trustpilot' },
  { icon: 'lock', label: 'معالجة آمنة' },
  { icon: 'check', label: 'دعم 24/7' },
  { icon: 'check', label: 'تحقق فوري' },
];

const TrustIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'star') {
    return (
      <svg className="size-4 fill-blue-400" viewBox="0 0 256 256">
        <path d="M235.36,98.49A12.21,12.21,0,0,0,224.59,90l-61.47-5L139.44,27.67a12.37,12.37,0,0,0-22.88,0L92.88,85,31.41,90a12.45,12.45,0,0,0-7.07,21.84l46.85,40.41L56.87,212.64a12.35,12.35,0,0,0,18.51,13.49L128,193.77l52.62,32.36a12.12,12.12,0,0,0,13.69-.51,12.28,12.28,0,0,0,4.82-13l-14.32-60.42,46.85-40.41A12.29,12.29,0,0,0,235.36,98.49Z" />
      </svg>
    );
  }
  if (type === 'lock') {
    return (
      <svg className="size-4 fill-blue-400" viewBox="0 0 256 256">
        <path d="M208,84H172V56a44,44,0,0,0-88,0V84H48A12,12,0,0,0,36,96V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V96A12,12,0,0,0,208,84ZM92,56a36,36,0,0,1,72,0V84H92Z" />
      </svg>
    );
  }
  return (
    <svg className="size-4 fill-blue-400" viewBox="0 0 256 256">
      <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
    </svg>
  );
};

export const Hero: React.FC<HeroProps> = ({ onApply }) => {
  return (
    <section className="p-4">
      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border-8 border-white">
        <div className="hero-fallback absolute inset-0 overflow-hidden rounded-4xl">
          <img
            src={IMAGES.hero}
            alt="تايلاند"
            className="absolute inset-0 h-full w-full rounded-4xl object-cover object-center"
            loading="eager"
            fetchPriority="high"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="hero-overlay absolute inset-0 rounded-4xl" aria-hidden />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <Header onApply={onApply} />

          <div className="mx-auto w-full max-w-xl flex-1 space-y-8 p-8 text-center text-white">
            <div className="space-y-4">
              <div className="relative -right-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <span className="text-5xl">{THAILAND_FLAG}</span>
                <Logo className="h-10" inverted showText={false} />
              </div>
              <h1 className="text-pretty text-2xl font-bold sm:text-3xl lg:text-4xl">
                تقديم بطاقة الوصول الرقمية التايلاندية (TDAC) بدون تعقيد
              </h1>
              <p className="text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
                أكمل طلب بطاقة الوصول الرقمية قبل المغادرة واحصل على رمز QR لتسهيل إجراءات الهجرة في تايلاند.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-2">
                  <TrustIcon type={item.icon} />
                  <span className="font-medium text-gray-200">{item.label}</span>
                </div>
              ))}
            </div>

            <div>
              <PrimaryButton onClick={onApply} className="px-8 py-3.5 text-base">
                قدّم الآن عبر الإنترنت
              </PrimaryButton>
            </div>
          </div>

          <p className="relative z-10 px-8 pb-6 text-center text-sm text-gray-300">
            {SITE_NAME} شركة خاصة مستقلة — غير تابعة لأي جهة حكومية. يمكنك أيضاً التقديم عبر{' '}
            <a
              href="https://tdac.immigration.go.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-white"
            >
              الموقع الرسمي للحكومة
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export const HeroAbout: React.FC<{ onApply: () => void }> = ({ onApply }) => {
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

      <div className="rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8">
        <div className="space-y-8 p-4">
          <div className="flex items-center gap-4">
            <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
              <svg className="size-4 fill-current" viewBox="0 0 256 256">
                <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">نظرة سريعة على بطاقة الوصول</h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              { title: 'وقت المعالجة', text: 'فوري — تُنشأ بطاقتك ورمز QR مباشرة بعد الإرسال.' },
              { title: 'الصلاحية', text: 'صالحة حتى تاريخ الوصول المحدد في البطاقة.' },
              { title: 'مدة الإقامة', text: 'تُحدد حسب حالة التأشيرة وقرار ضابط الهجرة.' },
              { title: 'الدخول', text: 'دخول واحد — قدّم طلباً جديداً لكل دخول إلى تايلاند.' },
              { title: 'كيفية التقديم', text: '100% عبر الإنترنت من أي جهاز قبل رحلتك.' },
              { title: 'عند الوصول', text: 'اعرض البطاقة مع رمز QR من هاتفك أو بريدك الإلكتروني.' },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center gap-2 font-medium text-blue-500">
                  <svg className="size-4 fill-blue-500" viewBox="0 0 256 256">
                    <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
                  </svg>
                  {item.title}
                </div>
                <p className="text-pretty text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-8">
            <h4 className="font-bold text-gray-900">ما ستحتاجه للتقديم</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {requirements.map((req) => (
                <CheckItem key={req}>{req}</CheckItem>
              ))}
            </ul>
            <div className="pt-4">
              <PrimaryButton onClick={onApply}>قدّم الآن عبر الإنترنت</PrimaryButton>
            </div>
            <p className="text-pretty text-xs leading-relaxed text-gray-500">
              {SITE_NAME} شركة خاصة تقدم مساعدة في طلبات مستندات السفر. غير تابعة لأي جهة حكومية.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const StatsBar: React.FC = () => {
  const stats = [
    { value: '~5 د', label: 'وقت المعالجة' },
    { value: '99.9%', label: 'معدل الموافقة*' },
    { value: '30 يوم', label: 'الصلاحية' },
    { value: '24/7', label: 'دعم متواصل' },
  ];

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-gray-900 sm:text-5xl">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-gray-400">
        *تعتمد الموافقة على الجهة المختصة ودقة المعلومات المقدمة.
      </p>
    </section>
  );
};
