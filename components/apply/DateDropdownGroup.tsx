import React, { useEffect } from 'react';
import type { Lang } from '../../data/i18n/types';
import {
  applyDateColDay,
  applyDateColMonth,
  applyDateColYear,
  applyDateGrid,
  applyDateQuestion,
  applyDateSection,
  applyDateSelectInner,
  applyDateSelectInnerYear,
  applyDateSelectShell,
  applyDateSubLabel,
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

function DateSelect({
  id,
  label,
  value,
  onChange,
  columnClass,
  selectClass = applyDateSelectInner,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  columnClass: string;
  selectClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={columnClass}>
      <label htmlFor={id} className={applyDateSubLabel}>
        {label}
      </label>
      <div className={applyDateSelectShell}>
        <select id={id} className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </select>
      </div>
    </div>
  );
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
  const uid = label.replace(/\s+/g, '-').slice(0, 24);

  useEffect(() => {
    if (value.day && Number(value.day) > days.length) {
      onChange({ ...value, day: String(days.length) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.year, value.month, days.length]);

  return (
    <section className={applyDateSection} aria-label={label}>
      <p className={applyDateQuestion}>{label}</p>
      <div className={applyDateGrid}>
        <DateSelect
          id={`${uid}-year`}
          label={yearLabel}
          value={value.year}
          onChange={(year) => onChange({ ...value, year })}
          columnClass={applyDateColYear}
          selectClass={applyDateSelectInnerYear}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </DateSelect>

        <DateSelect
          id={`${uid}-month`}
          label={monthLabel}
          value={value.month}
          onChange={(month) => onChange({ ...value, month })}
          columnClass={applyDateColMonth}
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </DateSelect>

        <DateSelect
          id={`${uid}-day`}
          label={dayLabel}
          value={value.day}
          onChange={(day) => onChange({ ...value, day })}
          columnClass={applyDateColDay}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d.padStart(2, '0')}
            </option>
          ))}
        </DateSelect>
      </div>
    </section>
  );
};
