import React from 'react';
import type { ApplicationStatus } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface QuickStatusSelectProps {
  value: ApplicationStatus;
  onChange: (status: ApplicationStatus) => void;
  size?: 'sm' | 'md';
}

export const QuickStatusSelect: React.FC<QuickStatusSelectProps> = ({
  value,
  onChange,
  size = 'md',
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as ApplicationStatus)}
    onClick={(e) => e.stopPropagation()}
    className={`rounded-lg border border-gray-200 bg-white font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
      size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
    }`}
  >
    {(Object.keys(adminLabels.status) as ApplicationStatus[]).map((s) => (
      <option key={s} value={s}>
        {adminLabels.status[s]}
      </option>
    ))}
  </select>
);
