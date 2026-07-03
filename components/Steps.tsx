import React from 'react';
import { steps } from '../data/content';

interface StepsProps {
  onApply: () => void;
}

export const Steps: React.FC<StepsProps> = ({ onApply }) => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            قدّم في 3 خطوات سهلة
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            الحصول على بطاقة الوصول الرقمية لم يكن أسهل من قبل!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-brand-200 translate-x-1/2 z-0" />
              )}
              <div className="relative z-10 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full">
                <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mb-6 shadow-lg shadow-brand-500/30">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-sm text-center">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
            ابدأ تقديم بطاقة الوصول الرقمية اليوم
          </h3>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            انضم لآلاف المسافرين الذين بسّطوا طلباتهم مع عمليتنا الإرشادية.
          </p>
          <ul className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium text-slate-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              معالجة سريعة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              استرداد قبل المعالجة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              دعم خبير 24/7
            </li>
          </ul>
          <button
            onClick={onApply}
            className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/25 active:scale-95"
          >
            احصل على بطاقة TDAC
          </button>
        </div>
      </div>
    </section>
  );
};
