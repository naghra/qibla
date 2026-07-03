import React, { useState } from 'react';
import { Search, ChevronDown, Globe } from 'lucide-react';
import { countries } from '../data/content';

export const Countries: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = countries.filter((c) => c.includes(search));
  const displayed = showAll ? filtered : filtered.slice(0, 20);

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Globe className="w-4 h-4" />
            {countries.length}+ دولة
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            الدول التي تتطلب بطاقة TDAC
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            يجب على جميع المسافرين الدوليين إلى تايلاند إكمال نموذج الوصول الرقمي قبل الوصول.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن بلدك..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {displayed.map((country) => (
            <div
              key={country}
              className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-100 text-sm"
            >
              <span className="font-medium text-slate-800">{country}</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">مطلوب</span>
            </div>
          ))}
        </div>

        {filtered.length > 20 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors"
            >
              {showAll ? 'عرض أقل' : `عرض جميع ${filtered.length} دولة`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
