import React from 'react';

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
  <fieldset>
    <legend className="mb-2 block text-sm font-medium text-gray-900">{label}</legend>
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
              selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="size-4 border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);
