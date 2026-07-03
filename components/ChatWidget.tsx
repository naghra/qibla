import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex size-14 items-center justify-center rounded-full border border-blue-600 bg-blue-500 text-white shadow-lg transition hover:bg-blue-600 active:scale-95"
        aria-label="دردشة الدعم"
      >
        <MessageCircle className="size-6" />
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-40 w-[min(100vw-3rem,360px)] overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-2xl fade-in">
          <div className="flex items-center justify-between bg-blue-500 px-5 py-4 text-white">
            <div>
              <p className="font-bold">دعم 24/7</p>
              <p className="text-xs text-blue-100">نرد عادةً خلال دقائق</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-blue-600">
              <X className="size-5" />
            </button>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-gray-600">
              مرحباً! كيف يمكننا مساعدتك في طلب بطاقة TDAC؟
            </p>
            <a
              href="mailto:support@travelsmart.example"
              className="block w-full rounded-2xl border border-blue-600 bg-blue-500 py-2.5 text-center text-sm font-bold text-white"
            >
              راسلنا عبر البريد
            </a>
            <p className="text-center text-xs text-gray-400">متاح على مدار الساعة</p>
          </div>
        </div>
      )}
    </>
  );
};
