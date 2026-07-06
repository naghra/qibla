import type { ApplicationInput, StoredApplication } from '../types/admin';

export interface CheckoutSessionResponse {
  clientSecret: string;
  publishableKey: string;
  sessionId: string;
  applicationId: string;
}

export interface VerifySessionResponse {
  paid: boolean;
  application: StoredApplication;
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

export async function fetchCheckoutEmbed(sessionId: string): Promise<CheckoutSessionResponse> {
  const result = await verifyCheckoutSession(sessionId);
  if (result.paid) {
    throw new CheckoutError('already_paid', 409, 'already_paid');
  }
  if (!result.clientSecret || !result.publishableKey) {
    throw new CheckoutError('checkout_unavailable', 404, 'checkout_unavailable');
  }
  return {
    clientSecret: result.clientSecret,
    publishableKey: result.publishableKey,
    sessionId: result.sessionId ?? sessionId,
    applicationId: result.application.id,
  };
}
