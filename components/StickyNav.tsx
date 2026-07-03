import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { SITE_NAME, navLinks } from '../data/content';
import { THAILAND_FLAG } from '../data/assets';
import { PrimaryButton } from './ui';
import { useScroll } from '../hooks/useScroll';

interface StickyNavProps {
  onApply: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({ onApply }) => {
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);

  if (!scrolled) return null;

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md fade-in">
        <div className="container mx-auto flex items-center justify-between gap-4 p-4">
          <a href="#" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0 })}>
            <span className="text-2xl">{THAILAND_FLAG}</span>
            <Logo showText={false} />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-blue-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <PrimaryButton onClick={onApply} className="hidden px-4 py-2 text-sm sm:inline-flex">
              قدّم الآن
            </PrimaryButton>
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="القائمة"
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
              <span className="font-bold text-gray-900">{SITE_NAME}</span>
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
            <PrimaryButton onClick={() => { setOpen(false); onApply(); }} className="mt-6 w-full">
              قدّم الآن
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};
