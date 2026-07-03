/** Shared class names matching travelsmarttravelfast apply form */
export const applySection = 'space-y-12';
export const applySectionInner = 'scroll-mt-4 space-y-8';
export const applyFieldGroup = 'space-y-2';
export const applyLabel = 'mb-1 block text-sm font-medium text-gray-950';
export const applyQuestion = 'font-medium text-sm text-gray-950';
export const applySubLabel = 'mb-1 block text-sm font-medium text-gray-950';

export const applyFieldShell =
  'apply-field-shell relative flex rounded-2xl border border-gray-200 bg-white outline-none transition hover:border-gray-950';
export const applySelectShell =
  'apply-select-shell relative flex rounded-2xl border border-gray-200 bg-white outline-none transition hover:border-gray-950 cursor-pointer';

export const applyInputInner =
  'apply-input-inner w-full border-0 bg-transparent px-6 py-3.5 text-base text-gray-950 outline-none placeholder:text-gray-400';
export const applySelectInner =
  'apply-select-inner w-full appearance-none border-0 bg-transparent px-6 py-3.5 text-base text-gray-950 outline-none';
export const applySelectWithFlagInner =
  'apply-select-inner w-full appearance-none border-0 bg-transparent py-3.5 pe-10 ps-12 text-base text-gray-950 outline-none';

/** @deprecated use applyFieldShell + applyInputInner */
export const applyInput = `${applyFieldShell} ${applyInputInner}`;

export const applyBtnPrimary =
  'apply-btn-primary relative flex w-full flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-blue-600 bg-blue-500 px-6 py-3 text-lg font-medium text-gray-50 transition hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50';
export const applyBtnGhost =
  'flex w-full items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-gray-600 transition hover:text-gray-950';
export const applyBtnAddTraveler =
  'flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-100 py-4 text-base font-medium text-gray-950 transition hover:border-gray-950 hover:bg-gray-200';
export const applyTravelerHeader =
  'flex w-full items-center justify-between bg-blue-950/70 px-4 py-3.5 text-base font-medium text-white';
export const applyCard = 'overflow-hidden rounded-2xl border border-gray-200 bg-white';
export const applyDashedBox =
  'w-full rounded-2xl border-2 border-dashed border-gray-400 px-4 py-6 text-center text-sm font-normal text-gray-700 transition hover:border-gray-500 hover:bg-gray-50/50';
export const applyHelper = 'mt-1 text-sm text-gray-500';
export const applyDividerText = 'px-3 text-xs text-gray-400';

/** Step 1 date pickers — pill selects in 3-column grid */
export const applyDateSection = 'space-y-2';
export const applyDateQuestion = 'font-medium text-sm text-gray-950';
export const applyDateGrid = 'grid grid-cols-3 gap-4 sm:gap-8';
export const applyDateSubLabel = 'mb-1 block text-sm font-medium text-gray-950';
export const applyDateSelectShell =
  'apply-date-select-shell relative flex min-w-0 rounded-full border border-gray-200 bg-white outline-none transition hover:border-gray-950 cursor-pointer';
export const applyDateSelectInner =
  'apply-date-select-inner w-full min-w-0 appearance-none border-0 bg-transparent px-4 py-3 text-sm text-gray-950 outline-none pe-9 sm:px-5 sm:text-base';
