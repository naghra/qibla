import { loadStripe, type Stripe } from '@stripe/stripe-js';

const stripePromises = new Map<string, Promise<Stripe | null>>();

/** Start loading Stripe.js early; safe to call multiple times for the same key. */
export function preloadStripe(publishableKey: string): Promise<Stripe | null> {
  if (!publishableKey) return Promise.resolve(null);
  let promise = stripePromises.get(publishableKey);
  if (!promise) {
    promise = loadStripe(publishableKey);
    stripePromises.set(publishableKey, promise);
  }
  return promise;
}

export function getStripe(publishableKey: string): Promise<Stripe | null> {
  return preloadStripe(publishableKey);
}
