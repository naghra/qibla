import React from 'react';
import { countryFlag } from '../data/countries';

interface HeroBadgeProps {
  line1: string;
  line2: string;
  countryCode?: string;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({ line1, line2, countryCode }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    {countryCode && (
      <span className="text-3xl leading-none" aria-hidden>
        {countryFlag(countryCode)}
      </span>
    )}
    <div className="space-y-0.5">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">{line1}</p>
      <h1 className="text-pretty text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{line2}</h1>
    </div>
  </div>
);
