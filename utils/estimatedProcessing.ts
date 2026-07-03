import type { PlanId } from '../types';

const processingMs: Record<PlanId, number> = {
  standard: 8 * 60 * 60 * 1000,
  fast: 2 * 60 * 60 * 1000,
  ultra: 15 * 60 * 1000,
};

export function computeEstimatedProcessing(planId: PlanId, lang: 'en' | 'ar'): string {
  const at = new Date(Date.now() + processingMs[planId]);
  return at.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
