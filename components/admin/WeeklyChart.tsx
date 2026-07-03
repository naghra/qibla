import React from 'react';
import type { DailyCount } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface WeeklyChartProps {
  data: DailyCount[];
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="relative flex items-end justify-between gap-1 sm:gap-2" style={{ minHeight: 120 }}>
      {data.map((day) => (
        <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-xs font-bold text-gray-700">{day.count}</span>
          <div className="flex w-full items-end justify-center" style={{ height: 80 }}>
            <div
              className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
              style={{ height: `${Math.max((day.count / max) * 100, day.count > 0 ? 8 : 2)}%` }}
              title={`${day.label}: ${day.count}`}
            />
          </div>
          <span className="text-[10px] text-gray-400 sm:text-xs">{day.label}</span>
        </div>
      ))}
      {data.every((d) => d.count === 0) && (
        <p className="absolute inset-x-0 text-center text-sm text-gray-400">{adminLabels.dashboard.noData}</p>
      )}
    </div>
  );
};
