import React, { useEffect, useRef } from 'react';
import { loadStripe, type StripeEmbeddedCheckout } from '@stripe/stripe-js';

interface EmbeddedCheckoutProps {
  publishableKey: string;
  clientSecret: string;
  onError?: (message: string) => void;
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({
  publishableKey,
  clientSecret,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);

  useEffect(() => {
    if (!publishableKey || !clientSecret || !containerRef.current) return;

    let cancelled = false;

    void (async () => {
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe || cancelled) return;

        const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
        if (cancelled) {
          checkout.destroy();
          return;
        }

        checkoutRef.current = checkout;
        checkout.mount(containerRef.current!);
      } catch (err) {
        if (!cancelled) {
          onError?.(err instanceof Error ? err.message : 'checkout_mount_failed');
        }
      }
    })();

    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [publishableKey, clientSecret, onError]);

  return (
    <div
      ref={containerRef}
      className="embedded-checkout-host min-h-[32rem] w-full overflow-hidden rounded-2xl bg-white"
    />
  );
};
