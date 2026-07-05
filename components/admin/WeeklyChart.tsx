import React from 'react';
import type { DailyCount } from '../../types/admin';
import { adminLabels } from '../../data/adminLabels';

interface WeeklyChartProps {
  data: DailyCount[];
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="relative flex items-end justify-between gap-1.5 sm:gap-2.5" style={{ minHeight: 140 }}>
      {data.map((day) => {
        const heightPct = Math.max((day.count / max) * 100, day.count > 0 ? 10 : 3);
        return (
          <div key={day.date} className="group flex flex-1 flex-col items-center gap-1.5">
            <span className="text-xs font-bold text-slate-700 transition group-hover:text-indigo-600">
              {day.count}
            </span>
            <div className="flex w-full items-end justify-center" style={{ height: 90 }}>
              <div
                className="admin-chart-bar w-full max-w-9"
                style={{ height: `${heightPct}%` }}
                title={`${day.label}: ${day.count}`}
              />
            </div>
            <span className="text-[10px] font-medium text-slate-400 sm:text-xs">{day.label}</span>
          </div>
        );
      })}
      {data.every((d) => d.count === 0) && (
        <p className="absolute inset-x-0 text-center text-sm text-slate-400">{adminLabels.dashboard.noData}</p>
      )}
    </div>
  );
};
