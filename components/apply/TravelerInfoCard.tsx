import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Camera } from 'lucide-react';
import type { Translations } from '../../data/i18n/types';
import type { Lang } from '../../data/i18n/types';
import type { TravelerData } from '../../types';
import { DateDropdownGroup } from './DateDropdownGroup';
import { CountrySelect } from './CountrySelect';
import { GenderRadioGroup } from './GenderRadioGroup';
import { DateParts, defaultDateParts, isoToDateParts, datePartsToIso } from '../../utils/dateParts';

interface TravelerInfoCardProps {
  index: number;
  traveler: TravelerData;
  a: Translations['apply'];
  lang: Lang;
  isPrimary: boolean;
  onChange: (field: keyof TravelerData, value: string) => void;
  onDobChange: (parts: DateParts) => void;
  onIssueChange: (parts: DateParts) => void;
  onExpiryChange: (parts: DateParts) => void;
  dob: DateParts;
  issue: DateParts;
  expiry: DateParts;
  onRemove?: () => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export const TravelerInfoCard: React.FC<TravelerInfoCardProps> = ({
  index,
  traveler,
  a,
  lang,
  isPrimary,
  onChange,
  onDobChange,
  onIssueChange,
  onExpiryChange,
  dob,
  issue,
  expiry,
  onRemove,
}) => {
  const [open, setOpen] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const title = isPrimary
    ? `${a.traveler(index + 1)}: ${a.travelerYourself}`
    : a.traveler(index + 1);

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-slate-900 px-4 py-3 text-start text-white"
      >
        <span className="text-sm font-semibold">{title}</span>
        {open ? <ChevronUp className="size-5 shrink-0" /> : <ChevronDown className="size-5 shrink-0" />}
      </button>

      {open && (
        <div className="space-y-5 p-4 sm:p-5">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-900 px-4 py-5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <Camera className="size-5 shrink-0" />
            {a.autofillPassport}
          </button>

          <div className="relative flex items-center py-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">{a.orFillManually}</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900">{a.firstMiddleName}</label>
            <input
              className={inputClass}
              value={traveler.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              placeholder={a.firstNamePlaceholder}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900">{a.lastNameLabel}</label>
            <input
              className={inputClass}
              value={traveler.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              placeholder={a.lastNamePlaceholder}
            />
          </div>

          <DateDropdownGroup
            label={a.dateOfBirth}
            value={dob}
            onChange={onDobChange}
            lang={lang}
            yearLabel={a.year}
            monthLabel={a.month}
            dayLabel={a.day}
          />

          <GenderRadioGroup
            label={a.gender}
            name={`gender-${index}`}
            value={traveler.gender}
            onChange={(v) => onChange('gender', v)}
            options={[
              { value: 'male', label: a.male },
              { value: 'female', label: a.female },
              { value: 'other', label: a.genderOther },
            ]}
          />

          <CountrySelect
            label={a.passportCountryLabel}
            value={traveler.passportCountry ?? ''}
            onChange={(v) => onChange('passportCountry', v)}
            lang={lang}
          />

          <CountrySelect
            label={a.nationalityOnPassport}
            value={traveler.nationality}
            onChange={(v) => onChange('nationality', v)}
            lang={lang}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900">{a.passportNumberLabel}</label>
            <input
              className={inputClass}
              value={traveler.passportNumber}
              onChange={(e) => onChange('passportNumber', e.target.value.toUpperCase())}
              dir="ltr"
              autoComplete="off"
            />
            <p className="mt-1.5 text-xs text-gray-500">{a.passportNumberHelper}</p>
          </div>

          <DateDropdownGroup
            label={a.passportIssueDate}
            value={issue}
            onChange={(parts) => {
              onIssueChange(parts);
              onChange('passportIssueDate', datePartsToIso(parts));
            }}
            lang={lang}
            yearLabel={a.year}
            monthLabel={a.month}
            dayLabel={a.day}
          />

          <DateDropdownGroup
            label={a.passportExpiryDate}
            value={expiry}
            onChange={(parts) => {
              onExpiryChange(parts);
              onChange('passportExpiryDate', datePartsToIso(parts));
            }}
            lang={lang}
            yearLabel={a.year}
            monthLabel={a.month}
            dayLabel={a.day}
          />

          {!isPrimary && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="w-full rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              {a.removeTraveler}
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export function travelerDateParts(traveler: TravelerData, field: 'dateOfBirth' | 'passportIssueDate' | 'passportExpiryDate'): DateParts {
  const iso = traveler[field];
  if (iso) return isoToDateParts(iso);
  if (field === 'dateOfBirth') return defaultDateParts(-365 * 30);
  if (field === 'passportIssueDate') return defaultDateParts(-365 * 3);
  return defaultDateParts(365 * 5);
}
