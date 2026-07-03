import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ChatWidget: React.FC = () => {
  const { t, dir } = useLanguage();
  const { chat: c } = t;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 z-40 flex size-14 items-center justify-center rounded-full border border-blue-600 bg-blue-500 text-white shadow-lg transition hover:bg-blue-600 active:scale-95 ${
          dir === 'rtl' ? 'left-6' : 'right-6'
        }`}
        aria-label={c.title}
      >
        <MessageCircle className="size-6" />
      </button>

      {open && (
        <div
          className={`fixed bottom-24 z-40 w-[min(100vw-3rem,360px)] overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-2xl fade-in ${
            dir === 'rtl' ? 'left-6' : 'right-6'
          }`}
        >
          <div className="flex items-center justify-between bg-blue-500 px-5 py-4 text-white">
            <div>
              <p className="font-bold">{c.title}</p>
              <p className="text-xs text-blue-100">{c.subtitle}</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-blue-600">
              <X className="size-5" />
            </button>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-gray-600">{c.greeting}</p>
            <a
              href="mailto:support@travelsmart.example"
              className="block w-full rounded-2xl border border-blue-600 bg-blue-500 py-2.5 text-center text-sm font-bold text-white"
            >
              {c.emailButton}
            </a>
            <p className="text-center text-xs text-gray-400">{c.available}</p>
          </div>
        </div>
      )}
    </>
  );
};
