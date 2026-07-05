import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Translations } from '../../data/i18n/types';
import type { Lang } from '../../data/i18n/types';
import type { TravelerData } from '../../types';
import { DateDropdownGroup } from './DateDropdownGroup';
import { CountrySelect } from './CountrySelect';
import { GenderRadioGroup } from './GenderRadioGroup';
import {
  applyCard,
  applyDashedBox,
  applyDividerText,
  applyFieldGroup,
  applyFieldShell,
  applyHelper,
  applyInputInner,
  applyLabel,
  applySectionInner,
  applyTravelerHeader,
} from './applyStyles';
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
    <article className={applyCard}>
      <button type="button" onClick={() => setOpen(!open)} className={applyTravelerHeader}>
        <span>{title}</span>
        {open ? <ChevronUp className="size-5 shrink-0" /> : <ChevronDown className="size-5 shrink-0" />}
      </button>

      {open && (
        <div className={`${applySectionInner} p-4 sm:p-5`}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />

          <button type="button" onClick={() => fileRef.current?.click()} className={applyDashedBox}>
            {a.autofillPassport}
          </button>

          <div className="relative flex items-center">
            <div className="h-px flex-1 bg-gray-200" />
            <span className={applyDividerText}>{a.orFillManually}</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className={applyFieldGroup}>
            <label className={applyLabel}>{a.firstMiddleName}</label>
            <div className={applyFieldShell}>
              <input
                className={applyInputInner}
                value={traveler.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                placeholder={a.firstNamePlaceholder}
              />
            </div>
          </div>

          <div className={applyFieldGroup}>
            <label className={applyLabel}>{a.lastNameLabel}</label>
            <div className={applyFieldShell}>
              <input
                className={applyInputInner}
                value={traveler.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                placeholder={a.lastNamePlaceholder}
              />
            </div>
          </div>

          <DateDropdownGroup
            label={a.dateOfBirth}
            value={dob}
            onChange={onDobChange}
            lang={lang}
            yearLabel={a.year}
            monthLabel={a.month}
            dayLabel={a.day}
            yearRange="birth"
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

          <div className={applyFieldGroup}>
            <label className={applyLabel}>{a.passportNumberLabel}</label>
            <div className={applyFieldShell}>
              <input
                className={applyInputInner}
                value={traveler.passportNumber}
                onChange={(e) => onChange('passportNumber', e.target.value.toUpperCase())}
                dir="ltr"
                autoComplete="off"
              />
            </div>
            <p className={applyHelper}>{a.passportNumberHelper}</p>
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
            yearRange="passportIssue"
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
            yearRange="passportExpiry"
          />

          {!isPrimary && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="w-full rounded-2xl border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              {a.removeTraveler}
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export function travelerDateParts(
  traveler: TravelerData,
  field: 'dateOfBirth' | 'passportIssueDate' | 'passportExpiryDate'
): DateParts {
  const iso = traveler[field];
  if (iso) return isoToDateParts(iso);
  if (field === 'dateOfBirth') return defaultDateParts(-365 * 30);
  if (field === 'passportIssueDate') return defaultDateParts(-365 * 3);
  return defaultDateParts(365 * 5);
}
