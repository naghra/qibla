import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
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
import {
  PassportScanError,
  scanPassportImage,
  type PassportScanData,
} from '../../services/passportScanService';

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
  onPassportExtracted: (data: PassportScanData) => void;
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
  onPassportExtracted,
  dob,
  issue,
  expiry,
  onRemove,
}) => {
  const [open, setOpen] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<{ tone: 'success' | 'error' | 'warn'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const title = isPrimary
    ? `${a.traveler(index + 1)}: ${a.travelerYourself}`
    : a.traveler(index + 1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setScanning(true);
    setScanMessage(null);

    void scanPassportImage(file)
      .then(({ data, missing }) => {
        onPassportExtracted(data);
        if (missing.length > 0) {
          setScanMessage({ tone: 'warn', text: a.passportScanPartial });
        } else {
          setScanMessage({ tone: 'success', text: a.passportScanSuccess });
        }
      })
      .catch((err: unknown) => {
        if (err instanceof PassportScanError) {
          if (err.partial) onPassportExtracted(err.partial);
          if (err.code === 'image_too_large') {
            setScanMessage({ tone: 'error', text: a.passportScanTooLarge });
            return;
          }
          if (err.code === 'invalid_image_type') {
            setScanMessage({ tone: 'error', text: a.passportScanInvalidType });
            return;
          }
          if (err.code === 'extraction_incomplete' && err.partial) {
            setScanMessage({ tone: 'warn', text: a.passportScanPartial });
            return;
          }
          if (err.code === 'openai_request_failed') {
            setScanMessage({ tone: 'error', text: a.passportScanOpenAiError });
            return;
          }
          if (err.code === 'openai_not_configured') {
            setScanMessage({ tone: 'error', text: a.passportScanNotConfigured });
            return;
          }
          if (err.code === 'payload_too_large') {
            setScanMessage({ tone: 'error', text: a.passportScanTooLarge });
            return;
          }
          if (err.code === 'heic_not_supported') {
            setScanMessage({ tone: 'error', text: a.passportScanHeic });
            return;
          }
        }
        setScanMessage({ tone: 'error', text: a.passportScanError });
      })
      .finally(() => setScanning(false));
  };

  return (
    <article className={applyCard}>
      <button type="button" onClick={() => setOpen(!open)} className={applyTravelerHeader}>
        <span>{title}</span>
        {open ? <ChevronUp className="size-5 shrink-0" /> : <ChevronDown className="size-5 shrink-0" />}
      </button>

      {open && (
        <div className={`${applySectionInner} p-4 sm:p-5`}>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={scanning}
            className={`${applyDashedBox} ${scanning ? 'pointer-events-none opacity-70' : ''}`}
          >
            {scanning ? (
              <>
                <Loader2 className="size-5 animate-spin text-blue-500" />
                {a.passportScanning}
              </>
            ) : (
              a.autofillPassport
            )}
          </button>

          {scanMessage && (
            <p
              className={`rounded-xl px-3 py-2 text-sm ${
                scanMessage.tone === 'success'
                  ? 'bg-emerald-50 text-emerald-800'
                  : scanMessage.tone === 'warn'
                    ? 'bg-amber-50 text-amber-900'
                    : 'bg-red-50 text-red-800'
              }`}
              role="status"
            >
              {scanMessage.text}
            </p>
          )}

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

export function passportScanToUpdates(data: PassportScanData): {
  patch: Partial<TravelerData>;
  dob?: DateParts;
  issue?: DateParts;
  expiry?: DateParts;
} {
  const patch: Partial<TravelerData> = {};

  if (data.firstName?.trim()) patch.firstName = data.firstName.trim();
  if (data.lastName?.trim()) patch.lastName = data.lastName.trim();
  if (data.passportNumber?.trim()) patch.passportNumber = data.passportNumber.trim();
  if (data.nationality?.trim()) patch.nationality = data.nationality.trim();
  if (data.passportCountry?.trim()) patch.passportCountry = data.passportCountry.trim();
  if (data.gender === 'male' || data.gender === 'female' || data.gender === 'other') {
    patch.gender = data.gender;
  }
  if (data.dateOfBirth) patch.dateOfBirth = data.dateOfBirth;
  if (data.passportIssueDate) patch.passportIssueDate = data.passportIssueDate;
  if (data.passportExpiryDate) patch.passportExpiryDate = data.passportExpiryDate;

  return {
    patch,
    dob: data.dateOfBirth ? isoToDateParts(data.dateOfBirth) : undefined,
    issue: data.passportIssueDate ? isoToDateParts(data.passportIssueDate) : undefined,
    expiry: data.passportExpiryDate ? isoToDateParts(data.passportExpiryDate) : undefined,
  };
}
