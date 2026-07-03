import React from 'react';
import { steps } from '../data/content';
import { IMAGES } from '../data/assets';
import { PrimaryButton, SectionHeader } from './ui';

interface StepsProps {
  onApply: () => void;
}

export const Steps: React.FC<StepsProps> = ({ onApply }) => {
  return (
    <section id="how-it-works" className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader
        title="قدّم في 3 خطوات سهلة"
        subtitle="الحصول على بطاقة الوصول الرقمية لم يكن أسهل من قبل. بضع خطوات بسيطة وأنت جاهز للسفر!"
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid gap-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex flex-col gap-4 rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8"
            >
              <p className="text-sm font-medium uppercase text-blue-500">الخطوة {step.number}</p>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>

        <img
          src={IMAGES.tourist}
          alt="مسافر"
          className="aspect-4/5 w-full max-w-xs justify-self-center overflow-hidden rounded-4xl object-cover lg:max-w-none"
        />
      </div>

      <div className="mx-auto max-w-3xl rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-8 text-center sm:p-12">
        <h3 className="text-2xl font-bold text-gray-900">ابدأ تقديم بطاقة الوصول الرقمية اليوم</h3>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-gray-600">
          انضم لآلاف المسافرين الذين بسّطوا طلباتهم مع عمليتنا الإرشادية.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {['معالجة سريعة', 'استرداد قبل المعالجة', 'دعم خبير 24/7'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg className="size-4 fill-blue-500" viewBox="0 0 256 256">
                <path d="M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <PrimaryButton onClick={onApply}>احصل على بطاقة TDAC</PrimaryButton>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          معدل موافقة يصل إلى 99.9% · متوسط المعالجة أقل من 24 ساعة · آمن ومشفّر
        </p>
      </div>
    </section>
  );
};
