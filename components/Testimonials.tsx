import React from 'react';
import { testimonials } from '../data/content';
import { SectionHeader } from './ui';

export const Testimonials: React.FC = () => {
  return (
    <section className="container mx-auto space-y-12 px-4 py-24">
      <SectionHeader
        title="ماذا يقول مسافرونا"
        subtitle="تجارب حقيقية من مسافرين وثقوا بنا في طلبات بطاقة TDAC."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="rounded-4xl bg-gradient-to-tl from-white to-blue-100/30 p-4 sm:p-8"
          >
            <p className="text-pretty text-sm leading-relaxed text-gray-600">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-bold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">موثوق من مسافرين حول العالم</p>
    </section>
  );
};
