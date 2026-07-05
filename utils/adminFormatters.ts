import { adminLabels } from '../data/adminLabels';
import type { StoredApplication } from '../types/admin';
import type { TravelerData } from '../types';
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

export function formatPhoneDisplay(
  phone: string | undefined,
  phoneCountry: string | undefined,
  lang: 'ar' | 'en' = 'ar'
): string {
  if (!phone?.trim()) return 'غير متوفر';
  const country = phoneCountry?.trim() ? countryLabel(phoneCountry, lang) : '';
  if (country && country !== 'غير متوفر') {
    return `${phone} — ${country}`;
  }
  return phone;
}

export function travelerInitials(first: string, last: string): string {
  const a = first.trim().charAt(0);
  const b = last.trim().charAt(0);
  return (a + b).toUpperCase() || '?';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function line(label: string, value: string): string {
  return `${label}: ${value}`;
}

function travelerBlock(traveler: TravelerData, index: number, lang: 'ar' | 'en'): string[] {
  const L = adminLabels.detail;
  const prefix = index > 0 ? `\n── مسافر ${index + 1} ──\n` : '\n── المسافر ──\n';
  return [
    prefix,
    line(L.applicant, displayValue(`${traveler.firstName} ${traveler.lastName}`.trim())),
    line(L.email, displayValue(traveler.email)),
    line(L.phone, formatPhoneDisplay(traveler.phone, traveler.phoneCountry, lang)),
    line(L.dateOfBirth, formatAdminDate(traveler.dateOfBirth)),
    line(L.gender, formatGender(traveler.gender)),
    line(L.nationality, countryLabel(traveler.nationality, lang)),
    line(L.passport, displayValue(traveler.passportNumber)),
    line(L.passportCountry, countryLabel(traveler.passportCountry, lang)),
    line(L.passportIssue, formatAdminDate(traveler.passportIssueDate)),
    line(L.passportExpiry, formatAdminDate(traveler.passportExpiryDate)),
  ];
}

export function formatApplicationAsText(app: StoredApplication): string {
  const L = adminLabels;
  const D = L.detail;
  const travel = app.data.travel;
  const accommodation = [travel.accommodationAddress, travel.accommodationCity]
    .filter(Boolean)
    .join('، ');

  const lines: string[] = [
    '══════════════════════════════',
    'DacGateway — تفاصيل الطلب',
    '══════════════════════════════',
    '',
    line(L.applications.id, app.id),
    line(L.applications.status, L.status[app.status]),
    line(D.created, formatAdminDate(app.createdAt, true)),
    line(D.updated, formatAdminDate(app.updatedAt, true)),
    '',
    '── ملخص الطلب ──',
    line(L.applications.destination, app.destinationName),
    line(L.applications.service, app.serviceName),
    line(L.applications.plan, app.planName),
    line(L.applications.amount, formatCurrency(app.totalAmount)),
    line(D.lang, app.lang.toUpperCase()),
  ];

  app.data.travelers.forEach((t, i) => {
    lines.push(...travelerBlock(t, i, app.lang));
  });

  lines.push(
    '\n── تفاصيل السفر ──',
    line(D.arrival, formatAdminDate(travel.arrivalDate)),
    line(D.departure, formatAdminDate(travel.departureDate)),
    line(D.flight, displayValue(travel.flightNumber)),
    line(D.purpose, formatPurpose(travel.purposeOfVisit)),
    line(D.accommodation, displayValue(accommodation || undefined))
  );

  if (app.adminNotes?.trim()) {
    lines.push('', line(D.adminNotes, app.adminNotes.trim()));
  }

  if (app.statusHistory?.length) {
    lines.push('\n── سجل الحالة ──');
    for (const h of app.statusHistory) {
      lines.push(`• ${L.status[h.status]} — ${formatAdminDate(h.at, true)}`);
    }
  }

  lines.push('', '══════════════════════════════');
  return lines.join('\n');
}
