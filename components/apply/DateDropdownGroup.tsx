import React, { useEffect } from 'react';
import type { Lang } from '../../data/i18n/types';
import {
  DateParts,
  getDayOptions,
  getMonthOptions,
  getYearOptions,
} from '../../utils/dateParts';

interface DateDropdownGroupProps {
  label: string;
  value: DateParts;
  onChange: (next: DateParts) => void;
  lang: Lang;
  yearLabel: string;
  monthLabel: string;
  dayLabel: string;
}

const selectClass =
  'w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export const DateDropdownGroup: React.FC<DateDropdownGroupProps> = ({
  label,
  value,
  onChange,
  lang,
  yearLabel,
  monthLabel,
  dayLabel,
}) => {
  const years = getYearOptions();
  const months = getMonthOptions(lang);
  const days = getDayOptions(value.year, value.month);

  useEffect(() => {
    if (value.day && Number(value.day) > days.length) {
      onChange({ ...value, day: String(days.length) });
    }
  }, [value.year, value.month, days.length]);

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-gray-900">{label}</legend>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-500">{yearLabel}</label>
          <select
            className={selectClass}
            value={value.year}
            onChange={(e) => onChange({ ...value, year: e.target.value })}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">{monthLabel}</label>
          <select
            className={selectClass}
            value={value.month}
            onChange={(e) => onChange({ ...value, month: e.target.value })}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">{dayLabel}</label>
          <select
            className={selectClass}
            value={value.day}
            onChange={(e) => onChange({ ...value, day: e.target.value })}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d.padStart(2, '0')}</option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
};
