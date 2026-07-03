import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Smartphone } from 'lucide-react';
import type { Translations } from '../../data/i18n/types';
import type { PricingPlanItem } from '../../data/i18n/types';
import type { PlanId } from '../../types';
import { applyCard, applyDividerText, applySection, applySectionInner } from './applyStyles';

interface ResumeStepProps {
  a: Translations['apply'];
  plans: PricingPlanItem[];
  selectedPlanId: PlanId;
  onPlanChange: (id: PlanId) => void;
  travelerCount: number;
  total: number;
  estimatedAt: string;
  destinationName: string;
}

export const ResumeStep: React.FC<ResumeStepProps> = ({
  a,
  plans,
  selectedPlanId,
  onPlanChange,
  travelerCount,
  total,
  estimatedAt,
  destinationName,
}) => {
  const [esimOpen, setEsimOpen] = useState(false);
  const speedPlans = plans.filter((p) => p.id === 'fast' || p.id === 'ultra');

  return (
    <div className={`${applySection} w-full`}>
      <div className={`${applySectionInner} space-y-5`}>
        <div className="flex items-center justify-between text-base">
          <span className="font-normal text-gray-950">{a.totalTravelers(travelerCount)}</span>
          <span className="font-semibold text-gray-950" dir="ltr">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="space-y-3">
          {speedPlans.map((plan) => {
            const selected = selectedPlanId === plan.id;
            const isUltra = plan.id === 'ultra';
            return (
              <label
                key={plan.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition hover:border-gray-950 ${
                  selected ? 'border-gray-950 bg-white' : 'border-gray-200 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="processing-speed"
                  checked={selected}
                  onChange={() => onPlanChange(plan.id as PlanId)}
                  className="mt-1 size-[18px] shrink-0 border-gray-400 text-gray-950 focus:ring-gray-950"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-gray-950">{plan.name}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{a.getInTime(plan.time)}</p>
                      {isUltra && (
                        <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-blue-500">
                          <Zap className="size-3.5 fill-blue-500 text-blue-500" />
                          {a.fastest}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 text-base font-semibold text-gray-950" dir="ltr">
                      ${plan.priorityFee.toFixed(2)}
                    </span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
          <span className="text-gray-600">{a.estimatedProcessingAt}</span>
          <span className="font-medium text-gray-950" dir="ltr">
            {estimatedAt}
          </span>
        </div>

        <div className="relative flex items-center py-1">
          <div className="h-px flex-1 bg-gray-200" />
          <span className={applyDividerText}>{a.essentialsFor(destinationName)}</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className={applyCard}>
          <button
            type="button"
            onClick={() => setEsimOpen(!esimOpen)}
            className="flex w-full items-center gap-3 p-4 text-start"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <Smartphone className="size-5" />
            </span>
            <span className="min-w-0 flex-1 text-sm font-normal leading-snug text-gray-950">
              {a.esimTitle(destinationName)}
            </span>
            {esimOpen ? (
              <ChevronUp className="size-5 shrink-0 text-gray-400" />
            ) : (
              <ChevronDown className="size-5 shrink-0 text-gray-400" />
            )}
          </button>
          {esimOpen && (
            <div className="border-t border-gray-200 px-4 pb-4 pt-3">
              <p className="text-sm text-gray-500">{a.esimDescription}</p>
              <p className="mt-2 text-xs text-gray-400">{a.esimComingSoon}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
