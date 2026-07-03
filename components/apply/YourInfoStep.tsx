import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Translations } from '../../data/i18n/types';
import type { Lang } from '../../data/i18n/types';
import type { TravelerData } from '../../types';
import { TravelerInfoCard, travelerDateParts } from './TravelerInfoCard';
import { applyBtnAddTraveler, applySection } from './applyStyles';
import { DateParts, datePartsToIso } from '../../utils/dateParts';

interface YourInfoStepProps {
  a: Translations['apply'];
  lang: Lang;
  travelers: TravelerData[];
  onUpdateTraveler: (index: number, field: keyof TravelerData, value: string) => void;
  onAddTraveler: () => void;
  onRemoveTraveler: (index: number) => void;
  dobParts: DateParts[];
  issueParts: DateParts[];
  expiryParts: DateParts[];
  onDobChange: (index: number, parts: DateParts) => void;
  onIssueChange: (index: number, parts: DateParts) => void;
  onExpiryChange: (index: number, parts: DateParts) => void;
}

export const YourInfoStep: React.FC<YourInfoStepProps> = ({
  a,
  lang,
  travelers,
  onUpdateTraveler,
  onAddTraveler,
  onRemoveTraveler,
  dobParts,
  issueParts,
  expiryParts,
  onDobChange,
  onIssueChange,
  onExpiryChange,
}) => (
  <div className={`${applySection} w-full space-y-4`}>
    {travelers.map((traveler, index) => (
      <TravelerInfoCard
        key={index}
        index={index}
        traveler={traveler}
        a={a}
        lang={lang}
        isPrimary={index === 0}
        onChange={(field, value) => onUpdateTraveler(index, field, value)}
        onDobChange={(parts) => {
          onDobChange(index, parts);
          onUpdateTraveler(index, 'dateOfBirth', datePartsToIso(parts));
        }}
        onIssueChange={(parts) => onIssueChange(index, parts)}
        onExpiryChange={(parts) => onExpiryChange(index, parts)}
        dob={dobParts[index] ?? travelerDateParts(traveler, 'dateOfBirth')}
        issue={issueParts[index] ?? travelerDateParts(traveler, 'passportIssueDate')}
        expiry={expiryParts[index] ?? travelerDateParts(traveler, 'passportExpiryDate')}
        onRemove={index > 0 ? () => onRemoveTraveler(index) : undefined}
      />
    ))}

    <button type="button" onClick={onAddTraveler} className={applyBtnAddTraveler}>
      <Plus className="size-4" />
      {a.addTraveler}
    </button>
  </div>
);
