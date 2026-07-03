import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_NAME, navLinks } from '../data/content';
import { THAILAND_FLAG } from '../data/assets';
import { Logo } from './Logo';

interface HeaderProps {
  onApply: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApply }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="order-1 mr-auto flex items-center gap-4">
            <span className="text-4xl leading-none">{THAILAND_FLAG}</span>
            <Logo inverted className="h-8" />
            <span className="sr-only font-bold">{SITE_NAME}</span>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-200 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="order-3 ml-auto text-white lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="size-8" />
          </button>
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
            <button
              onClick={() => { setOpen(false); onApply(); }}
              className="mt-8 w-full rounded-2xl border border-blue-600 bg-blue-500 py-3 font-bold text-white"
            >
              قدّم الآن
            </button>
          </div>
        </div>
      )}
    </>
  );
};
