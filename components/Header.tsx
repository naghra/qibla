import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getNavLinks } from '../utils/navLinks';
import { buildPath } from '../data/destinations';
import { Logo } from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onApply: () => void;
  hubMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onApply, hubMode = false }) => {
  const { t, lang, pageScope } = useLanguage();
  const navLinks = getNavLinks(t, pageScope.type);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <Link to={buildPath(lang)} className="order-1 flex items-center gap-3">
            <Logo inverted className="h-8" showText />
          </Link>

          <nav className="order-2 hidden flex-1 items-center justify-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-200 transition hover:text-white"
                >
                  <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="order-3 flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <button
              onClick={() => setOpen(true)}
              className="text-white lg:hidden"
              aria-label={t.nav.menu}
            >
              <Menu className="size-8" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[90] bg-white fade-in">
          <div className="flex min-h-full flex-col p-8">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-3">
                <LanguageSwitcher variant="light" />
                <button onClick={() => setOpen(false)} className="text-gray-500">
                  <X className="size-6" />
                </button>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 hover:bg-blue-50"
                  >
                    <Icon className="size-5 text-blue-500" aria-hidden />
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <button
              onClick={() => { setOpen(false); onApply(); }}
              className="mt-8 w-full rounded-2xl border border-blue-600 bg-blue-500 py-3 font-bold text-white"
            >
              {hubMode ? t.hero.cta : t.nav.applyNow}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
