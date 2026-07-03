export interface DateParts {
  year: string;
  month: string;
  day: string;
}

export function defaultDateParts(offsetDays = 0): DateParts {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return {
    year: String(d.getFullYear()),
    month: String(d.getMonth() + 1),
    day: String(d.getDate()),
  };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function datePartsToIso(parts: DateParts): string {
  if (!parts.year || !parts.month || !parts.day) return '';
  const y = parts.year.padStart(4, '0');
  const m = parts.month.padStart(2, '0');
  const d = parts.day.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isoToDateParts(iso: string): DateParts {
  if (!iso) return { year: '', month: '', day: '' };
  const [y, m, d] = iso.split('-');
  return { year: y ?? '', month: String(Number(m)), day: String(Number(d)) };
}

export function getYearOptions(): string[] {
  const y = new Date().getFullYear();
  return [String(y), String(y + 1)];
}

export function getMonthOptions(lang: 'en' | 'ar'): { value: string; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => {
    const value = String(i + 1);
    const label = new Date(2000, i, 1).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long' });
    return { value, label };
  });
}

export function getDayOptions(year: string, month: string): string[] {
  if (!year || !month) return Array.from({ length: 31 }, (_, i) => String(i + 1));
  const count = daysInMonth(Number(year), Number(month));
  return Array.from({ length: count }, (_, i) => String(i + 1));
}
