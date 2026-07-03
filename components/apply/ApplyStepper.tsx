import React from 'react';
import { Check } from 'lucide-react';

interface ApplyStepperProps {
  steps: string[];
  current: number;
}

export const ApplyStepper: React.FC<ApplyStepperProps> = ({ steps, current }) => (
  <nav aria-label="Progress" className="mb-8">
    <ol className="flex items-start justify-between">
      {steps.map((label, index) => {
        const active = index === current;
        const done = index < current;
        return (
          <li key={label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {index > 0 && (
                <div className={`h-px flex-1 ${done || active ? 'bg-gray-900' : 'bg-gray-200'}`} />
              )}
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                  active || done
                    ? 'bg-gray-900 text-white'
                    : 'border-2 border-gray-200 bg-white text-gray-400'
                }`}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-px flex-1 ${done ? 'bg-gray-900' : 'bg-gray-200'}`} />
              )}
            </div>
            <span
              className={`mt-2 max-w-[5.5rem] text-center text-xs leading-tight sm:max-w-none sm:text-sm ${
                active ? 'font-semibold text-gray-900' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  </nav>
);
