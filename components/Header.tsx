import React, { useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { SITE_NAME, navLinks } from '../data/content';

interface HeaderProps {
  onApply: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApply }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <span className="text-lg font-bold text-slate-900 hidden sm:block">{SITE_NAME}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onApply}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-95"
            >
              قدّم الآن
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="القائمة"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 border-t border-slate-100 pt-4 fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onApply(); }}
                className="mt-2 mx-4 py-3 bg-brand-600 text-white font-bold rounded-xl"
              >
                قدّم الآن
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
