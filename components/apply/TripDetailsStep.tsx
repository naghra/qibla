import React from 'react';
import type { Translations } from '../../data/i18n/types';
import type { Lang } from '../../data/i18n/types';
import type { DateParts } from '../../utils/dateParts';
import { DateDropdownGroup } from './DateDropdownGroup';
import { PhoneCountrySelect, getDialPrefix } from './PhoneCountrySelect';
import {
  applyFieldGroup,
  applyFieldShell,
  applyHelper,
  applyInputInner,
  applyLabel,
  applySection,
  applySectionInner,
} from './applyStyles';

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
  const displayPhone = phone.startsWith(dial) ? phone : phone ? `${dial} ${phone}` : dial;

  return (
    <div className={`${applySection} w-full`}>
      <div className={applySectionInner}>
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

        <div className={applyFieldGroup}>
          <label htmlFor="apply-email" className={applyLabel}>
            {a.emailLabel}
          </label>
          <div className={applyFieldShell}>
            <input
              id="apply-email"
              type="email"
              className={applyInputInner}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder={a.emailPlaceholder}
              dir="ltr"
              autoComplete="email"
            />
          </div>
          <p className={applyHelper}>{a.emailHelper}</p>
        </div>

        <PhoneCountrySelect
          label={a.phoneCountryLabel}
          value={phoneCountry}
          onChange={onPhoneCountryChange}
          lang={lang}
        />

        <div className={applyFieldGroup}>
          <label htmlFor="apply-phone" className={applyLabel}>
            {a.phoneLabel}
          </label>
          <div className={applyFieldShell}>
            <input
              id="apply-phone"
              type="tel"
              className={applyInputInner}
              value={displayPhone}
              onChange={(e) => {
                const raw = e.target.value.replace(dial, '').trim();
                onPhoneChange(raw.replace(/[^\d\s-]/g, ''));
              }}
              dir="ltr"
              autoComplete="tel-national"
            />
          </div>
          <p className={applyHelper}>{a.phoneSmsNote}</p>
        </div>
      </div>
    </div>
  );
};
