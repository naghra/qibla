import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            ماذا يقول مسافرونا
          </h2>
          <p className="text-slate-600">تجارب حقيقية من مسافرين وثقوا بنا في طلبات بطاقة TDAC.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-brand-200 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
