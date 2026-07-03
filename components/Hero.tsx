import React from 'react';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { requirements, SITE_NAME } from '../data/content';

interface HeroProps {
  onApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApply }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <FileText className="w-4 h-4 text-accent-400" />
            بطاقة الوصول الرقمية التايلاندية TDAC
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            تقديم بطاقة الوصول الرقمية التايلاندية
            <span className="text-accent-400"> بدون تعقيد</span>
          </h1>

          <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
            بطاقة TDAC هي متطلب إلزامي لجميع غير التايلانديين. أكمل طلبك عبر الإنترنت قبل المغادرة
            واحصل على رمز QR لتسهيل إجراءات الهجرة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={onApply}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-xl transition-all shadow-xl shadow-accent-500/30 hover:shadow-accent-500/50 active:scale-95 text-lg"
            >
              قدّم طلبك الآن
              <ArrowLeft className="w-5 h-5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 font-bold rounded-xl transition-all"
            >
              كيف يعمل
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
            <p className="text-sm text-blue-200 mb-4 font-medium">ما ستحتاجه للتقديم:</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {requirements.map((req) => (
                <li key={req} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-accent-400 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/90 text-amber-950 text-center py-3 px-4 text-sm font-medium">
        {SITE_NAME} شركة خاصة مستقلة — غير تابعة لأي جهة حكومية. يمكنك أيضاً التقديم عبر الموقع الرسمي للحكومة.
      </div>
    </section>
  );
};
