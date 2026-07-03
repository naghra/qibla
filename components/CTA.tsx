import React from 'react';
import { ArrowLeft, Shield, Clock, Headphones } from 'lucide-react';

interface CTAProps {
  onApply: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onApply }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          بطاقة الوصول الرقمية التايلاندية
          <br />
          <span className="text-accent-400">بضغطات قليلة فقط</span>
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          تجاوز المواقع الحكومية المعقدة. قدّم عبر الإنترنت مع إرشاد خبير وتحقق فوري ومعالجة سريعة.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent-400" />
            معدل موافقة 99.9%
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent-400" />
            تقديم في 5 دقائق
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-accent-400" />
            دعم خبير 24/7
          </div>
        </div>

        <button
          onClick={onApply}
          className="inline-flex items-center gap-2 px-10 py-4 bg-accent-500 hover:bg-accent-400 text-slate-900 font-bold rounded-xl transition-all shadow-xl shadow-accent-500/30 text-lg active:scale-95"
        >
          احصل على بطاقة TDAC
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
