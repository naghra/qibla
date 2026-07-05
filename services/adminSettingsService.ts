export interface AdminOpenAiSettings {
  configured: boolean;
  keyPreview: string | null;
  visionModel: string;
  source: 'database' | 'env' | 'none';
  savedInPanel: boolean;
  savedInEnv: boolean;
}

export interface AdminStripeSettings {
  configured: boolean;
  secretConfigured: boolean;
  publishableConfigured: boolean;
  webhookConfigured: boolean;
  secretKeyPreview: string | null;
  publishableKeyPreview: string | null;
  webhookSecretPreview: string | null;
  mode: 'live' | 'test' | 'unknown' | null;
  webhookUrl: string;
  secretSource: 'database' | 'env' | 'none';
  publishableSource: 'database' | 'env' | 'none';
  webhookSource: 'database' | 'env' | 'none';
  savedInPanel: { secret: boolean; publishable: boolean; webhook: boolean };
  savedInEnv: { secret: boolean; publishable: boolean; webhook: boolean };
}

export interface AdminSettingsResponse {
  openai: AdminOpenAiSettings;
  stripe: AdminStripeSettings;
}

export interface AdminSettingsUpdate {
  openaiApiKey?: string;
  openaiVisionModel?: string;
  clearOpenaiKey?: boolean;
  stripeSecretKey?: string;
  stripePublishableKey?: string;
  stripeWebhookSecret?: string;
  clearStripeSecretKey?: boolean;
  clearStripePublishableKey?: boolean;
  clearStripeWebhookSecret?: boolean;
}

function getAdminPassword(): string {
  return sessionStorage.getItem('qibla_admin_pwd') || import.meta.env.VITE_ADMIN_PASSWORD || '';
}

function adminHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const password = getAdminPassword();
  if (password) headers['X-Admin-Password'] = password;
  return headers;
}

export async function fetchAdminSettings(): Promise<AdminSettingsResponse> {
  const res = await fetch('/api/admin/settings', { headers: adminHeaders() });
  if (res.status === 401) throw new Error('unauthorized');
  if (!res.ok) throw new Error('settings_fetch_failed');
  return res.json() as Promise<AdminSettingsResponse>;
}

export async function saveAdminSettings(update: AdminSettingsUpdate): Promise<AdminSettingsResponse> {
  const res = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(update),
  });
  if (res.status === 401) throw new Error('unauthorized');
  if (!res.ok) throw new Error('settings_save_failed');
  return res.json() as Promise<AdminSettingsResponse>;
}
