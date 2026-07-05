import { countriesData } from '../data/countries';
import { getCountryName } from './countryName';

const GENDER_LABELS: Record<string, string> = {
  male: 'ذكر',
  female: 'أنثى',
  other: 'آخر',
};

const PURPOSE_LABELS: Record<string, string> = {
  tourism: 'سياحة',
  business: 'أعمال',
  transit: 'عبور',
  study: 'دراسة',
  work: 'عمل',
  family: 'زيارة عائلية',
  medical: 'علاج',
};

export function displayValue(value: string | undefined | null, fallback = 'غير متوفر'): string {
  const v = value?.trim();
  return v ? v : fallback;
}

export function formatAdminDate(iso: string | undefined, withTime = false): string {
  if (!iso?.trim()) return 'غير متوفر';
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

export function formatGender(value: string | undefined): string {
  if (!value?.trim()) return 'غير متوفر';
  return GENDER_LABELS[value.toLowerCase()] ?? value;
}

export function formatPurpose(value: string | undefined): string {
  if (!value?.trim()) return 'غير متوفر';
  return PURPOSE_LABELS[value.toLowerCase()] ?? value;
}

export function countryLabel(code: string | undefined, lang: 'ar' | 'en' = 'ar'): string {
  if (!code?.trim()) return 'غير متوفر';
  const c = countriesData.find((x) => x.code === code);
  return c ? getCountryName(c, lang) : code;
}

export function travelerInitials(first: string, last: string): string {
  const a = first.trim().charAt(0);
  const b = last.trim().charAt(0);
  return (a + b).toUpperCase() || '?';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
