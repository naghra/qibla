import React from 'react';
import { SITE_NAME, navLinks } from '../data/content';
import { Logo } from './Logo';

const legalLinks = [
  { label: 'سياسة الخصوصية', href: '#' },
  { label: 'شروط الخدمة', href: '#' },
  { label: 'سياسة الاسترداد', href: '#' },
  { label: 'إخلاء المسؤولية', href: '#' },
];

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-gray-50 py-16">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-md text-sm leading-relaxed text-gray-600">
            {SITE_NAME} شركة خاصة مستقلة تقدم مساعدة في طلبات مستندات السفر.
            غير تابعة لأي جهة حكومية. يمكنك التقديم مباشرة عبر الموقع الرسمي للحكومة التايلاندية.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gray-900">روابط سريعة</h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-gray-600 transition hover:text-blue-500">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gray-900">قانوني</h4>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-gray-600 transition hover:text-blue-500">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-gray-200 px-4 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 sm:flex-row sm:text-right">
          <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
          <p>support@travelsmart.example · دردشة مباشرة 24/7</p>
        </div>
      </div>
    </footer>
  );
};
