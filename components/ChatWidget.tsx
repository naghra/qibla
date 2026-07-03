import React, { useState } from 'react';
import { MessageCircle, Plane, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatWidgetProps {
  variant?: 'chat' | 'plane';
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ variant = 'chat' }) => {
  const { t, dir } = useLanguage();
  const { chat: c } = t;
  const [open, setOpen] = useState(false);

  const Icon = variant === 'plane' ? Plane : MessageCircle;
  const positionClass = dir === 'rtl' ? 'left-5 sm:left-6' : 'right-5 sm:right-6';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:bg-blue-600 active:scale-95 ${positionClass}`}
        aria-label={c.title}
      >
        <Icon className="size-6" />
      </button>

      {open && (
        <div
          className={`fixed bottom-24 z-40 w-[min(100vw-2.5rem,360px)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl fade-in ${positionClass}`}
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
              className="block w-full rounded-xl bg-blue-500 py-3 text-center text-sm font-bold text-white"
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
