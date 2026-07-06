/** Shared admin design tokens — premium glass + indigo accent system */

export const adminCard =
  'admin-card rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur-md sm:p-5';

export const adminCardHover =
  'admin-card-hover transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5';

export const adminSectionTitle = 'text-sm font-bold tracking-tight text-slate-800 sm:text-base';

export const adminSectionSubtitle = 'text-xs text-slate-500 sm:text-sm';

export const adminBtnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]';

export const adminBtnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 active:scale-[0.98]';

export const adminBtnGhost =
  'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900';

export const adminInput =
  'w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 py-2.5 text-sm text-slate-800 shadow-sm backdrop-blur-sm transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

export const adminIconBox = (tone: 'indigo' | 'amber' | 'emerald' | 'violet' | 'rose' | 'sky') => {
  const tones = {
    indigo: 'bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-indigo-600 ring-indigo-500/20',
    amber: 'bg-gradient-to-br from-amber-500/15 to-orange-500/10 text-amber-600 ring-amber-500/20',
    emerald: 'bg-gradient-to-br from-emerald-500/15 to-teal-500/10 text-emerald-600 ring-emerald-500/20',
    violet: 'bg-gradient-to-br from-violet-500/15 to-purple-500/10 text-violet-600 ring-violet-500/20',
    rose: 'bg-gradient-to-br from-rose-500/15 to-pink-500/10 text-rose-600 ring-rose-500/20',
    sky: 'bg-gradient-to-br from-sky-500/15 to-blue-500/10 text-sky-600 ring-sky-500/20',
  };
  return `flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 sm:size-10 ${tones[tone]}`;
};

export const adminStatAccent = {
  blue: 'admin-stat-accent admin-stat-blue',
  green: 'admin-stat-accent admin-stat-green',
  amber: 'admin-stat-accent admin-stat-amber',
  red: 'admin-stat-accent admin-stat-red',
  gray: 'admin-stat-accent admin-stat-gray',
  violet: 'admin-stat-accent admin-stat-violet',
} as const;
