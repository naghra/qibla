import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { PrimaryButton } from './ui';
import { useScroll } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';
import { getNavLinks } from '../utils/navLinks';
import { buildPath } from '../data/destinations';

interface StickyNavProps {
  onApply: () => void;
  hubMode?: boolean;
}

export const StickyNav: React.FC<StickyNavProps> = ({ onApply, hubMode = false }) => {
  const { t, lang, pageScope } = useLanguage();
  const navLinks = getNavLinks(t, pageScope.type);
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);

  if (!scrolled) return null;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md fade-in">
        <div className="container mx-auto flex items-center justify-between gap-4 p-4">
          <Link to={buildPath(lang)} className="flex min-w-0 items-center gap-3">
            <Logo showText={false} />
            <span className="hidden truncate font-bold text-gray-900 sm:inline">{t.siteName}</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-500"
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <PrimaryButton onClick={onApply} className="hidden px-4 py-2 text-sm sm:inline-flex">
              {hubMode ? t.hero.cta : t.nav.applyNow}
            </PrimaryButton>
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label={t.nav.menu}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white fade-in lg:hidden">
          <div className="flex min-h-full flex-col p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-gray-900">{t.siteName}</span>
              <button onClick={() => setOpen(false)} className="text-gray-500">
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
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-700 hover:bg-blue-50"
                  >
                    <Icon className="size-5 text-blue-500" aria-hidden />
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <PrimaryButton onClick={() => { setOpen(false); onApply(); }} className="mt-6 w-full">
              {hubMode ? t.hero.cta : t.nav.applyNow}
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};
