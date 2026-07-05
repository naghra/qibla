/** Server-side pricing catalog — must match public plan prices. Amounts in USD. */
const CATALOG = {
  thailand: {
    tdac: {
      standard: { price: 65, priorityFee: 0, name: 'Standard' },
      fast: { price: 65, priorityFee: 20, name: 'Fast' },
      ultra: { price: 65, priorityFee: 25, name: 'Ultra Fast' },
    },
  },
};

export function getPlanPricing(destinationSlug, serviceSlug, planId) {
  return CATALOG[destinationSlug]?.[serviceSlug]?.[planId] ?? null;
}

export function calculateOrderAmount(destinationSlug, serviceSlug, planId, travelerCount) {
  const plan = getPlanPricing(destinationSlug, serviceSlug, planId);
  if (!plan) {
    throw new Error('Invalid destination, service, or plan');
  }
  const count = Number(travelerCount);
  if (!Number.isFinite(count) || count < 1 || count > 20) {
    throw new Error('Invalid traveler count');
  }

  const perTraveler = plan.price + plan.priorityFee;
  return {
    perTraveler,
    totalAmount: perTraveler * count,
    travelerCount: count,
    planName: plan.name,
    currency: 'usd',
  };
}
