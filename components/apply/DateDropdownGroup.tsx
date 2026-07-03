import React, { useEffect } from 'react';
import type { Lang } from '../../data/i18n/types';
import {
  applyFieldGroup,
  applyQuestion,
  applySelectInner,
  applySelectShell,
  applySubLabel,
} from './applyStyles';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.year, value.month, days.length]);

  return (
    <fieldset className={applyFieldGroup}>
      <legend className={applyQuestion}>{label}</legend>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={applySubLabel}>{yearLabel}</label>
          <div className={applySelectShell}>
            <select
              className={applySelectInner}
              value={value.year}
              onChange={(e) => onChange({ ...value, year: e.target.value })}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={applySubLabel}>{monthLabel}</label>
          <div className={applySelectShell}>
            <select
              className={applySelectInner}
              value={value.month}
              onChange={(e) => onChange({ ...value, month: e.target.value })}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={applySubLabel}>{dayLabel}</label>
          <div className={applySelectShell}>
            <select
              className={applySelectInner}
              value={value.day}
              onChange={(e) => onChange({ ...value, day: e.target.value })}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d.padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </fieldset>
  );
};
