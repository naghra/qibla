import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/content';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <HelpCircle className="w-4 h-4" />
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            إجابات على أسئلتك
          </h2>
          <p className="text-slate-600">
            كل ما تحتاج معرفته عن بطاقة TDAC والمعالجة والرسوم والأمان.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-slate-50 transition-colors"
              >
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
                <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          لم تجد إجابتك؟{' '}
          <a href="#contact" className="text-brand-600 font-bold hover:underline">
            تواصل مع فريق الدعم 24/7
          </a>
        </p>
      </div>
    </section>
  );
};
