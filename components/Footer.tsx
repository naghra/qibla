import React from 'react';
import { Logo } from './Logo';
import { PaymentMethodBadges } from './PaymentMethodBadges';
import { useLanguage } from '../context/LanguageContext';
import { getNavLinks } from '../utils/navLinks';

export const Footer: React.FC = () => {
  const { t, pageScope } = useLanguage();
  const navLinks = getNavLinks(t, pageScope.type);
  const { footer: f } = t;

  return (
    <footer id="contact" className="border-t border-gray-100 bg-gray-50 py-16">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-md text-sm leading-relaxed text-gray-600">{f.description}</p>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-gray-900">{f.quickLinks}</h4>
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
          <h4 className="mb-4 font-bold text-gray-900">{f.legal}</h4>
          <ul className="space-y-2">
            {f.legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-gray-600 transition hover:text-blue-500">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-10 px-4">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">{f.paymentMethodsTitle}</h4>
          <PaymentMethodBadges />
          <div className="space-y-1 text-sm text-gray-500">
            <p>{f.paymentSslNote}</p>
            <p>{f.paymentPciNote}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-gray-200 px-4 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {t.siteName}. {f.copyright}</p>
          <p>{f.contact}</p>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">{f.disclaimer}</p>
      </div>
    </footer>
  );
};
