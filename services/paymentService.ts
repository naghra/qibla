import type { ApplicationInput } from '../types/admin';
import type { CheckoutOrderSummary } from './checkoutCache';

export interface CheckoutSessionResponse {
  clientSecret: string;
  publishableKey: string;
  sessionId: string;
  applicationId: string;
  application?: CheckoutOrderSummary;
}

export interface VerifySessionResponse {
  paid: boolean;
  application: {
    id: string;
    serviceName: string;
    destinationName: string;
    totalAmount: number;
    paymentStatus?: string;
    [key: string]: unknown;
  };
  clientSecret?: string;
  publishableKey?: string;
  sessionId?: string;
}

export class CheckoutError extends Error {
  code?: string;
  status: number;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'CheckoutError';
    this.status = status;
    this.code = code;
  }
}

export async function fetchCheckoutConfig(): Promise<{ publishableKey: string } | null> {
  const res = await fetch('/api/checkout/config');
  if (!res.ok) return null;
  const data = (await res.json()) as { publishableKey?: string };
  return data.publishableKey ? { publishableKey: data.publishableKey } : null;
}

export async function createCheckoutSession(
  input: ApplicationInput
): Promise<CheckoutSessionResponse> {
  const res = await fetch('/api/checkout/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lang: input.lang,
      destinationSlug: input.destinationSlug,
      destinationName: input.destinationName,
      serviceSlug: input.serviceSlug,
      serviceName: input.serviceName,
      planId: input.planId,
      data: input.data,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    clientSecret?: string;
    publishableKey?: string;
    sessionId?: string;
    applicationId?: string;
    application?: CheckoutOrderSummary;
  };

  if (!res.ok) {
    throw new CheckoutError(data.error || 'Checkout failed', res.status, data.error);
  }

  if (!data.clientSecret || !data.publishableKey) {
    throw new CheckoutError('Invalid checkout session response', res.status);
  }

  return data as CheckoutSessionResponse;
}

export async function verifyCheckoutSession(sessionId: string): Promise<VerifySessionResponse> {
  const res = await fetch(`/api/checkout/sessions/${encodeURIComponent(sessionId)}`);
  if (!res.ok) {
    throw new CheckoutError('Payment verification failed', res.status);
  }
  return res.json() as Promise<VerifySessionResponse>;
}

export async function fetchCheckoutEmbed(sessionId: string): Promise<{
  checkout: CheckoutSessionResponse;
  application: CheckoutOrderSummary;
}> {
  const result = await verifyCheckoutSession(sessionId);
  if (result.paid) {
    throw new CheckoutError('already_paid', 409, 'already_paid');
  }
  if (!result.clientSecret || !result.publishableKey) {
    throw new CheckoutError('checkout_unavailable', 404, 'checkout_unavailable');
  }

  const application: CheckoutOrderSummary = {
    serviceName: result.application.serviceName,
    destinationName: result.application.destinationName,
    totalAmount: Number(result.application.totalAmount),
  };

  return {
    checkout: {
      clientSecret: result.clientSecret,
      publishableKey: result.publishableKey,
      sessionId: result.sessionId ?? sessionId,
      applicationId: result.application.id,
      application,
    },
    application,
  };
}
