import React from 'react';
import { Check } from 'lucide-react';

interface ApplyStepperProps {
  steps: string[];
  current: number;
}

export const ApplyStepper: React.FC<ApplyStepperProps> = ({ steps, current }) => (
  <nav aria-label="Progress" className="w-full">
    <ol className="apply-stepper flex w-full flex-row items-center gap-2">
      {steps.map((label, index) => {
        const active = index === current;
        const done = index < current;
        const isLast = index === steps.length - 1;
        const filled = done || active;

        return (
          <li
            key={label}
            className={`apply-stepper-item flex items-center ${isLast ? 'flex-none' : 'w-0 flex-1'}`}
          >
            <div className="flex w-full items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                    filled
                      ? 'bg-gray-950 text-gray-50'
                      : 'border border-gray-200 bg-white text-gray-950'
                  }`}
                >
                  {done ? <Check className="size-4" strokeWidth={2.5} /> : index + 1}
                </span>
                <span
                  className={`mt-1 max-w-[5.5rem] px-1 text-center text-xs font-medium sm:max-w-none sm:text-base ${
                    active ? 'text-gray-950' : done ? 'font-medium text-gray-700' : 'font-bold text-gray-600'
                  }`}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <span
                  className={`apply-stepper-bar ms-2 h-1 flex-1 rounded-full ${
                    index < current ? 'bg-gray-950' : 'bg-gray-200'
                  }`}
                  aria-hidden
                />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  </nav>
);
