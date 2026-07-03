import React from 'react';
import { applyQuestion } from './applyStyles';

interface GenderOption {
  value: string;
  label: string;
}

interface GenderRadioGroupProps {
  label: string;
  name: string;
  value: string;
  options: GenderOption[];
  onChange: (value: string) => void;
}

export const GenderRadioGroup: React.FC<GenderRadioGroupProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => (
  <fieldset className="space-y-2">
    <legend className={applyQuestion}>{label}</legend>
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition hover:border-gray-950 ${
              selected ? 'border-gray-950 bg-white' : 'border-gray-200 bg-white'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="size-[18px] shrink-0 border-gray-400 text-gray-950 focus:ring-gray-950"
            />
            <span className="text-base font-normal text-gray-950">{opt.label}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);
