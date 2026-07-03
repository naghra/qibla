import React from 'react';
import { Plane, Mail, MessageCircle } from 'lucide-react';
import { SITE_NAME, navLinks } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white -rotate-45" />
              </div>
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed">
              شركة خاصة تقدم مساعدة في طلبات مستندات السفر. غير تابعة لأي جهة حكومية.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-brand-400" />
                support@travelsmart.example
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4 text-brand-400" />
                دردشة مباشرة 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-slate-500">
            إخلاء مسؤولية: هذا الموقع خدمة مساعدة خاصة وليس الموقع الرسمي للحكومة التايلاندية.
          </p>
        </div>
      </div>
    </footer>
  );
};
