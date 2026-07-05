import { deleteSiteSetting, getSiteSetting, setSiteSetting } from './db.js';
import { sendUnauthorized, verifyAdminPassword } from './adminAuth.js';

const KEYS = {
  openaiApiKey: 'openai_api_key',
  openaiVisionModel: 'openai_vision_model',
  stripeSecretKey: 'stripe_secret_key',
  stripePublishableKey: 'stripe_publishable_key',
  stripeWebhookSecret: 'stripe_webhook_secret',
};

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

function maskSecret(value) {
  if (!value || value.length < 8) return '••••••••';
  if (value.length <= 12) return `${value.slice(0, 3)}••••`;
  return `${value.slice(0, 7)}••••${value.slice(-4)}`;
}

function siteOrigin() {
  return (process.env.SITE_ORIGIN || process.env.VITE_SITE_ORIGIN || 'https://dacgateway.com').replace(/\/$/, '');
}

function stripeMode(secretKey) {
  if (!secretKey) return null;
  if (secretKey.startsWith('sk_live_') || secretKey.startsWith('rk_live_')) return 'live';
  if (secretKey.startsWith('sk_test_') || secretKey.startsWith('rk_test_')) return 'test';
  return 'unknown';
}

export async function getOpenAiCredentials() {
  const dbKey = await getSiteSetting(KEYS.openaiApiKey);
  const dbModel = await getSiteSetting(KEYS.openaiVisionModel);
  const envKey = process.env.OPENAI_API_KEY?.trim();
  const envModel = process.env.OPENAI_VISION_MODEL?.trim();

  const apiKey = dbKey?.trim() || envKey || '';
  const visionModel = dbModel?.trim() || envModel || 'gpt-4o';
  const source = dbKey?.trim() ? 'database' : envKey ? 'env' : 'none';

  return { apiKey, visionModel, source };
}

export async function getStripeCredentials() {
  const dbSecret = await getSiteSetting(KEYS.stripeSecretKey);
  const dbPublishable = await getSiteSetting(KEYS.stripePublishableKey);
  const dbWebhook = await getSiteSetting(KEYS.stripeWebhookSecret);
  const envSecret = process.env.STRIPE_SECRET_KEY?.trim();
  const envPublishable = process.env.STRIPE_PUBLISHABLE_KEY?.trim();
  const envWebhook = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  const secretKey = dbSecret?.trim() || envSecret || '';
  const publishableKey = dbPublishable?.trim() || envPublishable || '';
  const webhookSecret = dbWebhook?.trim() || envWebhook || '';
  const secretSource = dbSecret?.trim() ? 'database' : envSecret ? 'env' : 'none';
  const publishableSource = dbPublishable?.trim() ? 'database' : envPublishable ? 'env' : 'none';
  const webhookSource = dbWebhook?.trim() ? 'database' : envWebhook ? 'env' : 'none';

  return { secretKey, publishableKey, webhookSecret, secretSource, publishableSource, webhookSource };
}

async function buildAdminSettingsPayload() {
  const dbKey = await getSiteSetting(KEYS.openaiApiKey);
  const dbModel = await getSiteSetting(KEYS.openaiVisionModel);
  const dbStripeSecret = await getSiteSetting(KEYS.stripeSecretKey);
  const dbStripePublishable = await getSiteSetting(KEYS.stripePublishableKey);
  const dbStripeWebhook = await getSiteSetting(KEYS.stripeWebhookSecret);
  const envKey = process.env.OPENAI_API_KEY?.trim();
  const envStripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
  const envStripePublishable = process.env.STRIPE_PUBLISHABLE_KEY?.trim();
  const envStripeWebhook = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const { apiKey, visionModel, source } = await getOpenAiCredentials();
  const { secretKey, publishableKey, webhookSecret, secretSource, publishableSource, webhookSource } =
    await getStripeCredentials();

  return {
    openai: {
      configured: Boolean(apiKey),
      keyPreview: apiKey ? maskSecret(apiKey) : null,
      visionModel,
      source,
      savedInPanel: Boolean(dbKey?.trim()),
      savedInEnv: Boolean(envKey),
    },
    stripe: {
      configured: Boolean(secretKey && publishableKey),
      secretConfigured: Boolean(secretKey),
      publishableConfigured: Boolean(publishableKey),
      webhookConfigured: Boolean(webhookSecret),
      secretKeyPreview: secretKey ? maskSecret(secretKey) : null,
      publishableKeyPreview: publishableKey ? maskSecret(publishableKey) : null,
      webhookSecretPreview: webhookSecret ? maskSecret(webhookSecret) : null,
      mode: stripeMode(secretKey),
      webhookUrl: `${siteOrigin()}/api/stripe/webhook`,
      secretSource,
      publishableSource,
      webhookSource,
      savedInPanel: {
        secret: Boolean(dbStripeSecret?.trim()),
        publishable: Boolean(dbStripePublishable?.trim()),
        webhook: Boolean(dbStripeWebhook?.trim()),
      },
      savedInEnv: {
        secret: Boolean(envStripeSecret),
        publishable: Boolean(envStripePublishable),
        webhook: Boolean(envStripeWebhook),
      },
    },
  };
}

export async function handleAdminSettingsApi(req, res, urlPath) {
  if (urlPath !== '/api/admin/settings') return false;

  if (!verifyAdminPassword(req)) {
    sendUnauthorized(res);
    return true;
  }

  try {
    if (req.method === 'GET') {
      sendJson(res, 200, await buildAdminSettingsPayload());
      return true;
    }

    if (req.method === 'PUT') {
      const body = await readJsonBody(req);

      if (body.clearOpenaiKey === true) {
        await deleteSiteSetting(KEYS.openaiApiKey);
      } else if (typeof body.openaiApiKey === 'string' && body.openaiApiKey.trim()) {
        await setSiteSetting(KEYS.openaiApiKey, body.openaiApiKey.trim());
      }

      if (typeof body.openaiVisionModel === 'string' && body.openaiVisionModel.trim()) {
        await setSiteSetting(KEYS.openaiVisionModel, body.openaiVisionModel.trim());
      }

      if (body.clearStripeSecretKey === true) {
        await deleteSiteSetting(KEYS.stripeSecretKey);
      } else if (typeof body.stripeSecretKey === 'string' && body.stripeSecretKey.trim()) {
        await setSiteSetting(KEYS.stripeSecretKey, body.stripeSecretKey.trim());
      }

      if (body.clearStripePublishableKey === true) {
        await deleteSiteSetting(KEYS.stripePublishableKey);
      } else if (typeof body.stripePublishableKey === 'string' && body.stripePublishableKey.trim()) {
        await setSiteSetting(KEYS.stripePublishableKey, body.stripePublishableKey.trim());
      }

      if (body.clearStripeWebhookSecret === true) {
        await deleteSiteSetting(KEYS.stripeWebhookSecret);
      } else if (typeof body.stripeWebhookSecret === 'string' && body.stripeWebhookSecret.trim()) {
        await setSiteSetting(KEYS.stripeWebhookSecret, body.stripeWebhookSecret.trim());
      }

      sendJson(res, 200, await buildAdminSettingsPayload());
      return true;
    }

    sendJson(res, 405, { error: 'method_not_allowed' });
    return true;
  } catch (err) {
    console.error('Admin settings API error:', err);
    sendJson(res, 500, { error: 'settings_error' });
    return true;
  }
}
