import React from 'react';
import { Clock } from 'lucide-react';
import { pricingPlans } from '../data/content';
import { PlanId } from '../types';
import { PrimaryButton, SectionHeader } from './ui';

interface PricingProps {
  onApply: (plan?: PlanId) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onApply }) => {
  return (
    <section className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader
        title="خطط أسعار بطاقة TDAC"
        subtitle="اختر سرعة المعالجة المناسبة لجدول سفرك. تبدأ رسوم الخدمة من 65.00$ للمسافر."
      />

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <li
            key={plan.id}
            className="group overflow-hidden rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 transition-all"
          >
            <article className="flex h-full flex-col p-4 sm:p-8">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100">
                <Clock className="size-4 text-blue-500" />
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-xs font-medium uppercase text-blue-500">{plan.time}</p>
                <h3 className="text-lg font-bold text-gray-900">
                  {plan.name} — بطاقة TDAC
                </h3>
              </div>

              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-gray-600">
                {plan.description}
              </p>

              <span className="my-4 block h-px w-8 bg-gray-200 transition-all group-hover:w-12 group-hover:bg-blue-300" />

              <div>
                {plan.priorityFee > 0 ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        ${plan.price + plan.priorityFee}
                      </span>
                      <span className="text-xs text-gray-400">رسوم خدمة</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      ${plan.price}/مسافر + ${plan.priorityFee} رسوم أولوية لمرة واحدة
                    </p>
                  </>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-xs text-gray-400">رسوم خدمة / مسافر</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {plan.features.map((feature) => (
                  <span key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="size-4 fill-blue-500" viewBox="0 0 256 256">
                      <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <PrimaryButton onClick={() => onApply(plan.id as PlanId)} className="w-full">
                  قدّم الآن
                </PrimaryButton>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
