import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getNavLinks } from '../utils/navLinks';
import { buildPath } from '../data/destinations';
import { Logo } from './Logo';

interface SiteHeaderProps {
  variant?: 'light' | 'dark';
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ variant = 'light' }) => {
  const { t, lang, pageScope } = useLanguage();
  const navLinks = getNavLinks(t, pageScope.type);
  const [open, setOpen] = useState(false);
  const homePath = buildPath(lang);
  const isDark = variant === 'dark';

  return (
    <>
      <header className={`container mx-auto p-4 ${isDark ? 'text-white' : ''}`}>
        <div className="flex items-center justify-between gap-4">
          <Link to={homePath} className="flex items-center gap-3">
            <Logo inverted={isDark} className="h-8" showText={false} />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isDark ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className={`rounded-lg p-2 lg:hidden ${isDark ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label={t.nav.menu}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[90] bg-white fade-in">
          <div className="flex min-h-full flex-col p-8">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="text-gray-500">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 font-medium text-gray-700 hover:bg-blue-50"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
