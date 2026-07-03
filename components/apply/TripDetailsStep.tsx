import React from 'react';
import type { Translations } from '../../data/i18n/types';
import type { Lang } from '../../data/i18n/types';
import type { DateParts } from '../../utils/dateParts';
import { DateDropdownGroup } from './DateDropdownGroup';
import { PhoneCountrySelect, getDialPrefix } from './PhoneCountrySelect';

interface TripDetailsStepProps {
  a: Translations['apply'];
  lang: Lang;
  arrival: DateParts;
  departure: DateParts;
  onArrivalChange: (v: DateParts) => void;
  onDepartureChange: (v: DateParts) => void;
  email: string;
  onEmailChange: (v: string) => void;
  phoneCountry: string;
  onPhoneCountryChange: (v: string) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export const TripDetailsStep: React.FC<TripDetailsStepProps> = ({
  a,
  lang,
  arrival,
  departure,
  onArrivalChange,
  onDepartureChange,
  email,
  onEmailChange,
  phoneCountry,
  onPhoneCountryChange,
  phone,
  onPhoneChange,
}) => {
  const dial = getDialPrefix(phoneCountry);

  return (
    <div className="space-y-6">
      <DateDropdownGroup
        label={a.arriveQuestion}
        value={arrival}
        onChange={onArrivalChange}
        lang={lang}
        yearLabel={a.year}
        monthLabel={a.month}
        dayLabel={a.day}
      />

      <DateDropdownGroup
        label={a.departQuestion}
        value={departure}
        onChange={onDepartureChange}
        lang={lang}
        yearLabel={a.year}
        monthLabel={a.month}
        dayLabel={a.day}
      />

      <div>
        <label htmlFor="apply-email" className="mb-1.5 block text-sm font-medium text-gray-900">
          {a.emailLabel}
        </label>
        <input
          id="apply-email"
          type="email"
          className={inputClass}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={a.emailPlaceholder}
          dir="ltr"
          autoComplete="email"
        />
        <p className="mt-1.5 text-xs text-gray-500">{a.emailHelper}</p>
      </div>

      <PhoneCountrySelect
        label={a.phoneCountryLabel}
        value={phoneCountry}
        onChange={onPhoneCountryChange}
        lang={lang}
      />

      <div>
        <label htmlFor="apply-phone" className="mb-1.5 block text-sm font-medium text-gray-900">
          {a.phoneLabel}
        </label>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <span className="flex shrink-0 items-center border-e border-gray-200 bg-gray-50 px-3 text-sm text-gray-600" dir="ltr">
            {dial}
          </span>
          <input
            id="apply-phone"
            type="tel"
            className="min-w-0 flex-1 border-0 bg-white px-3 py-2.5 text-sm focus:outline-none"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d\s-]/g, ''))}
            placeholder=""
            dir="ltr"
            autoComplete="tel-national"
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-500">{a.phoneSmsNote}</p>
      </div>
    </div>
  );
};
