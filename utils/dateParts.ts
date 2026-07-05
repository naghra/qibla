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

export type YearRangePreset = 'travel' | 'birth' | 'passportIssue' | 'passportExpiry';

function rangeYears(start: number, end: number, descending = false): string[] {
  const years: string[] = [];
  if (descending) {
    for (let y = end; y >= start; y -= 1) years.push(String(y));
  } else {
    for (let y = start; y <= end; y += 1) years.push(String(y));
  }
  return years;
}

export function getYearOptions(preset: YearRangePreset = 'travel'): string[] {
  const now = new Date().getFullYear();

  switch (preset) {
    case 'birth':
      return rangeYears(now - 100, now, true);
    case 'passportIssue':
      return rangeYears(now - 15, now, true);
    case 'passportExpiry':
      return rangeYears(now, now + 15);
    case 'travel':
    default:
      return rangeYears(now, now + 1);
  }
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
