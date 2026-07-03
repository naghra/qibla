import React from 'react';
import { SITE_NAME, navLinks } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-gray-50 py-16">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/shapes/svg?seed=travel&backgroundColor=3b82f6"
              alt=""
              className="h-8 w-8"
            />
            <span className="text-lg font-bold text-gray-900">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            شركة خاصة تقدم مساعدة في طلبات مستندات السفر. غير تابعة لأي جهة حكومية.
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
          <h4 className="mb-4 font-bold text-gray-900">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>support@travelsmart.example</li>
            <li>دردشة مباشرة 24/7</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-gray-200 px-4 pt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        <p className="mt-2">
          إخلاء مسؤولية: هذا الموقع خدمة مساعدة خاصة وليس الموقع الرسمي للحكومة التايلاندية.
        </p>
      </div>
    </footer>
  );
};
