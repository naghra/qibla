/** Google Ads conversion tracking — Purchase (AW-18303187266) */

const PURCHASE_SEND_TO = 'AW-18303187266/LhpaCKrP3cscEMLy0ZdE';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface PurchaseConversionParams {
  transactionId: string;
  value: number;
  currency?: string;
}

/** Fire Google Ads purchase conversion once per transaction_id. */
export function trackGoogleAdsPurchase({
  transactionId,
  value,
  currency = 'USD',
}: PurchaseConversionParams): void {
  if (!transactionId || typeof window.gtag !== 'function') return;

  const dedupeKey = `gads_purchase_${transactionId}`;
  try {
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, '1');
  } catch {
    /* private browsing */
  }

  window.gtag('event', 'conversion', {
    send_to: PURCHASE_SEND_TO,
    value,
    currency,
    transaction_id: transactionId,
  });
}
