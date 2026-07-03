import React from 'react';
import { Check, Zap } from 'lucide-react';
import { pricingPlans } from '../data/content';
import { PlanId } from '../types';

interface PricingProps {
  onApply: (plan?: PlanId) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onApply }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            خطط أسعار بطاقة TDAC
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            اختر سرعة المعالجة المناسبة لجدول سفرك. تبدأ رسوم الخدمة من 65$ للمسافر.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 border-2 transition-all ${
                plan.popular
                  ? 'border-brand-500 shadow-xl shadow-brand-500/10 scale-[1.02]'
                  : 'border-slate-100 hover:border-brand-200 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  الأكثر طلباً
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-sm font-bold text-brand-600 mb-1">{plan.time}</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-600">{plan.description}</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-slate-100">
                {plan.priorityFee > 0 ? (
                  <>
                    <p className="text-3xl font-extrabold text-slate-900">
                      ${plan.price + plan.priorityFee}
                      <span className="text-sm font-normal text-slate-500"> رسوم خدمة</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      ${plan.price}/مسافر + ${plan.priorityFee} رسوم أولوية لمرة واحدة
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-extrabold text-slate-900">
                    ${plan.price}
                    <span className="text-sm font-normal text-slate-500"> رسوم خدمة / مسافر</span>
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onApply(plan.id as PlanId)}
                className={`w-full py-3.5 font-bold rounded-xl transition-all active:scale-95 ${
                  plan.popular
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-slate-100 hover:bg-brand-50 text-slate-900 hover:text-brand-700'
                }`}
              >
                قدّم الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
