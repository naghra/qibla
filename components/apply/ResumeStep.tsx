import React, { useState } from 'react';
import { CardSim, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import type { Translations } from '../../data/i18n/types';
import type { PricingPlanItem } from '../../data/i18n/types';
import type { PlanId } from '../../types';
import {
  applyCard,
  applyDividerText,
  applyResumeEsimCard,
  applyResumePlanCard,
  applySection,
  applySectionInner,
} from './applyStyles';

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
      <div className={`${applySectionInner} space-y-6`}>
        <div className="flex items-center justify-between text-base text-gray-950">
          <span>{a.totalTravelers(travelerCount)}</span>
          <span className="font-semibold" dir="ltr">
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
                className={`${applyResumePlanCard} ${
                  selected ? 'border-gray-950' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="processing-speed"
                  checked={selected}
                  onChange={() => onPlanChange(plan.id as PlanId)}
                  className="apply-resume-radio mt-0.5 size-[18px] shrink-0 border-gray-300 text-gray-950 focus:ring-gray-950"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-gray-950">{plan.name}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{a.getInTime(plan.time)}</p>
                    </div>
                    <span className="shrink-0 text-base font-semibold text-gray-950" dir="ltr">
                      ${plan.priorityFee.toFixed(2)}
                    </span>
                  </div>
                  {isUltra && (
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-600">
                        <Zap className="size-4 fill-purple-500 text-purple-500" strokeWidth={0} />
                        {a.fastest}
                      </span>
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-950">
          <span className="text-gray-600">{a.estimatedProcessingAt}</span>
          <span className="font-medium" dir="ltr">
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
            className={`${applyResumeEsimCard} w-full text-start`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <CardSim className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1 text-sm leading-snug text-gray-950">
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
