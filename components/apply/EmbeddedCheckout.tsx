import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { StripeEmbeddedCheckout } from '@stripe/stripe-js';
import { getStripe } from '../../services/stripeLoader';

interface EmbeddedCheckoutProps {
  publishableKey: string;
  clientSecret: string;
  onError?: (message: string) => void;
  onReady?: () => void;
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({
  publishableKey,
  clientSecret,
  onError,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);
  const [mounting, setMounting] = useState(true);

  useEffect(() => {
    if (!publishableKey || !clientSecret || !containerRef.current) return;

    let cancelled = false;
    setMounting(true);

    void (async () => {
      try {
        const stripe = await getStripe(publishableKey);
        if (!stripe || cancelled) return;

        const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
        if (cancelled) {
          checkout.destroy();
          return;
        }

        checkoutRef.current = checkout;
        checkout.mount(containerRef.current!);
        if (!cancelled) {
          setMounting(false);
          onReady?.();
        }
      } catch (err) {
        if (!cancelled) {
          setMounting(false);
          onError?.(err instanceof Error ? err.message : 'checkout_mount_failed');
        }
      }
    })();

    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [publishableKey, clientSecret, onError, onReady]);

  return (
    <div className="relative w-full">
      {mounting && (
        <div className="absolute inset-0 z-10 flex min-h-[32rem] flex-col items-center justify-center gap-3 rounded-2xl bg-white">
          <Loader2 className="size-9 animate-spin text-indigo-600" />
          <div className="h-3 w-40 animate-pulse rounded-full bg-gray-100" />
          <div className="h-3 w-56 animate-pulse rounded-full bg-gray-100" />
        </div>
      )}
      <div
        ref={containerRef}
        className={`embedded-checkout-host min-h-[32rem] w-full overflow-hidden rounded-2xl bg-white ${mounting ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
