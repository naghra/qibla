import type { CheckoutSessionResponse } from './paymentService';

export interface CheckoutOrderSummary {
  serviceName: string;
  destinationName: string;
  totalAmount: number;
}

export interface CachedCheckoutPayload {
  checkout: CheckoutSessionResponse;
  application: CheckoutOrderSummary;
}

const storageKey = (sessionId: string) => `dac_checkout_${sessionId}`;

export function saveCheckoutCache(sessionId: string, payload: CachedCheckoutPayload): void {
  try {
    sessionStorage.setItem(storageKey(sessionId), JSON.stringify(payload));
  } catch {
    /* private mode / quota */
  }
}

export function loadCheckoutCache(sessionId: string): CachedCheckoutPayload | null {
  try {
    const raw = sessionStorage.getItem(storageKey(sessionId));
    if (!raw) return null;
    return JSON.parse(raw) as CachedCheckoutPayload;
  } catch {
    return null;
  }
}
