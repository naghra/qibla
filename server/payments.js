import Stripe from 'stripe';
import { calculateOrderAmount } from './pricing.js';
import {
  createApplication,
  getApplicationById,
  getApplicationByStripeSession,
  markApplicationPaid,
  setApplicationStripeSession,
} from './db.js';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' });
}

function siteOrigin() {
  return (process.env.SITE_ORIGIN || process.env.VITE_SITE_ORIGIN || 'https://dacgateway.com').replace(/\/$/, '');
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function validateCheckoutInput(body) {
  const required = [
    'lang',
    'destinationSlug',
    'destinationName',
    'serviceSlug',
    'serviceName',
    'planId',
    'data',
  ];
  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === '') {
      throw new Error(`Missing field: ${key}`);
    }
  }
  if (!body.data?.travelers?.length) {
    throw new Error('At least one traveler is required');
  }
  const email = body.data.travelers[0]?.email?.trim();
  if (!email) {
    throw new Error('Traveler email is required');
  }
}

export async function handlePaymentsApi(req, res, urlPath) {
  try {
    if (urlPath === '/api/checkout/sessions' && req.method === 'POST') {
      const stripe = getStripe();
      if (!stripe) {
        sendJson(res, 503, { error: 'stripe_not_configured' });
        return true;
      }

      const body = await readJsonBody(req);
      validateCheckoutInput(body);

      const pricing = calculateOrderAmount(
        body.destinationSlug,
        body.serviceSlug,
        body.planId,
        body.data.travelers.length
      );

      const app = await createApplication({
        lang: body.lang,
        destinationSlug: body.destinationSlug,
        destinationName: body.destinationName,
        serviceSlug: body.serviceSlug,
        serviceName: body.serviceName,
        planId: body.planId,
        planName: pricing.planName,
        totalAmount: pricing.totalAmount,
        data: body.data,
        paymentStatus: 'unpaid',
      });

      const origin = siteOrigin();
      const basePath = `/${body.lang}/${body.destinationSlug}/${body.serviceSlug}/apply`;
      const successUrl = `${origin}${basePath}?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}${basePath}?payment_cancelled=1`;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: body.data.travelers[0].email.trim(),
        line_items: [
          {
            price_data: {
              currency: pricing.currency,
              unit_amount: Math.round(pricing.perTraveler * 100),
              product_data: {
                name: `${body.serviceName} — ${pricing.planName}`,
                description: `${pricing.travelerCount} traveler(s) · ${body.destinationName}`,
              },
            },
            quantity: pricing.travelerCount,
          },
        ],
        metadata: {
          applicationId: app.id,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      await setApplicationStripeSession(app.id, session.id);

      sendJson(res, 200, {
        url: session.url,
        sessionId: session.id,
        applicationId: app.id,
      });
      return true;
    }

    const verifyMatch = urlPath.match(/^\/api\/checkout\/sessions\/([^/]+)$/);
    if (verifyMatch && req.method === 'GET') {
      const sessionId = decodeURIComponent(verifyMatch[1]);
      const stripe = getStripe();

      let app = await getApplicationByStripeSession(sessionId);
      if (!app) {
        sendJson(res, 404, { error: 'session_not_found' });
        return true;
      }

      if (app.paymentStatus !== 'paid' && stripe) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
          app = await markApplicationPaid(
            app.id,
            session.id,
            typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id
          );
        }
      }

      sendJson(res, 200, {
        paid: app.paymentStatus === 'paid',
        application: app,
      });
      return true;
    }

    return false;
  } catch (err) {
    console.error('Payments API error:', err);
    sendJson(res, 400, { error: err.message || 'Payment error' });
    return true;
  }
}

export async function handleStripeWebhook(req, res, rawBody) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe || !webhookSecret) {
    res.writeHead(503);
    res.end('Stripe webhook not configured');
    return;
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    res.writeHead(400);
    res.end('Missing stripe-signature');
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const applicationId = session.metadata?.applicationId;
      if (applicationId) {
        await markApplicationPaid(
          applicationId,
          session.id,
          typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id
        );
      }
    }

    res.writeHead(200);
    res.end(JSON.stringify({ received: true }));
  } catch (err) {
    console.error('Stripe webhook error:', err.message);
    res.writeHead(400);
    res.end(`Webhook Error: ${err.message}`);
  }
}

export function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
