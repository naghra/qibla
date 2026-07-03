import React, { useState } from 'react';
import { faqs } from '../data/content';
import { SectionHeader } from './ui';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader
        title="الأسئلة الشائعة"
        subtitle="إجابات عن بطاقة TDAC وأوقات المعالجة والرسوم وكيف نحافظ على أمان معلوماتك."
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="cursor-pointer rounded-2xl bg-gradient-to-tl from-white to-blue-100/30 p-4 transition-all"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold text-gray-900">{faq.question}</h3>
              <svg
                className={`size-4 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                viewBox="0 0 256 256"
                fill="currentColor"
              >
                <path d="M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z" />
              </svg>
            </div>
            {openIndex === index && (
              <p className="pt-4 text-pretty text-sm leading-relaxed text-gray-600 fade-in">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">
        لم تجد إجابتك؟{' '}
        <a href="#contact" className="font-bold text-blue-500 underline">
          تواصل مع فريق الدعم 24/7
        </a>
      </p>
    </section>
  );
};
