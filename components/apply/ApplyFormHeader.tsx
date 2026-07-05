import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Globe, AlignLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { buildPath } from '../../data/destinations';
import { CountryFlag } from '../CountryFlag';
import { getNavLinks } from '../../utils/navLinks';

export const ApplyFormHeader: React.FC = () => {
  const { t, lang, setLang, pageScope, destination } = useLanguage();
  const [open, setOpen] = useState(false);
  const navLinks = getNavLinks(t, pageScope.type);

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white">
        <div className="container mx-auto flex items-center justify-between gap-4 p-4">
          <div className="order-1 me-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="apply-menu-btn flex aspect-square items-center justify-center rounded-full p-3 text-gray-800 transition hover:bg-gray-100 active:scale-95"
              aria-label={t.nav.menu}
            >
              <AlignLeft className="size-6" strokeWidth={1.75} />
            </button>
          </div>

          <Link
            to={buildPath(lang)}
            className="apply-logo-link relative order-2 flex -ms-4 items-center justify-center gap-2 overflow-hidden text-gray-800 transition active:scale-95 sm:ms-0"
          >
            <span className="relative -ms-8 sm:ms-0" aria-hidden>
              <CountryFlag code={destination?.countryCode ?? 'UN'} size={28} />
            </span>
            <img
              src="/images/logo.webp"
              alt={t.siteName}
              className="relative z-[1] h-8 w-auto object-contain"
            />
            <span className="sr-only font-bold">{t.siteName}</span>
          </Link>

          <div className="order-3 ms-auto">
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center justify-center overflow-hidden rounded-2xl p-0 text-gray-800 transition hover:bg-gray-100 active:scale-95"
              aria-label="Language"
            >
              <Globe className="size-8" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-white fade-in">
          <div className="flex min-h-full flex-col p-6">
            <div className="mb-6 flex items-center justify-between">
              <Link to={buildPath(lang)} onClick={() => setOpen(false)} className="flex items-center gap-2">
                <img src="/images/logo.webp" alt={t.siteName} className="h-8 w-auto" />
                <span className="font-bold text-gray-950">{t.siteName}</span>
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-gray-500">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-medium text-gray-950 hover:bg-gray-50"
                  >
                    <Icon className="size-5 text-blue-500" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
