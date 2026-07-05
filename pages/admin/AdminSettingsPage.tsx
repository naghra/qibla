import React, { useEffect, useState } from 'react';
import { KeyRound, CreditCard, Save, Trash2, Check, AlertCircle, Copy } from 'lucide-react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { adminLabels } from '../../data/adminLabels';
import {
  fetchAdminSettings,
  saveAdminSettings,
  type AdminOpenAiSettings,
  type AdminStripeSettings,
} from '../../services/adminSettingsService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const MODEL_OPTIONS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'gpt-4.1-mini'];

function sourceLabel(
  savedInPanel: boolean,
  savedInEnv: boolean,
  labels: { sourcePanel: string; sourceEnv: string; sourceNone: string }
) {
  if (savedInPanel) return labels.sourcePanel;
  if (savedInEnv) return labels.sourceEnv;
  return labels.sourceNone;
}

export const AdminSettingsPage: React.FC = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const s = adminLabels.settings;

  const [loading, setLoading] = useState(true);
  const [savingOpenai, setSavingOpenai] = useState(false);
  const [savingStripe, setSavingStripe] = useState(false);
  const [savedOpenai, setSavedOpenai] = useState(false);
  const [savedStripe, setSavedStripe] = useState(false);
  const [openaiError, setOpenaiError] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [openai, setOpenai] = useState<AdminOpenAiSettings | null>(null);
  const [stripe, setStripe] = useState<AdminStripeSettings | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [visionModel, setVisionModel] = useState('gpt-4o');
  const [stripeSecretKey, setStripeSecretKey] = useState('');
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    void fetchAdminSettings()
      .then((data) => {
        setOpenai(data.openai);
        setStripe(data.stripe);
        setVisionModel(data.openai.visionModel || 'gpt-4o');
      })
      .catch((err) => {
        if (err instanceof Error && err.message === 'unauthorized') {
          logout();
          navigate('/admin/login');
          return;
        }
        setOpenaiError(s.loadError);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, logout, navigate, s.loadError]);

  const handleUnauthorized = (err: unknown) => {
    if (err instanceof Error && err.message === 'unauthorized') {
      logout();
      navigate('/admin/login');
      return true;
    }
    return false;
  };

  const handleSaveOpenai = () => {
    setSavingOpenai(true);
    setOpenaiError(null);
    setSavedOpenai(false);

    const payload: { openaiApiKey?: string; openaiVisionModel: string } = { openaiVisionModel: visionModel };
    if (apiKey.trim()) payload.openaiApiKey = apiKey.trim();

    void saveAdminSettings(payload)
      .then((data) => {
        setOpenai(data.openai);
        setStripe(data.stripe);
        setApiKey('');
        setSavedOpenai(true);
        setTimeout(() => setSavedOpenai(false), 2500);
      })
      .catch((err) => {
        if (handleUnauthorized(err)) return;
        setOpenaiError(s.saveError);
      })
      .finally(() => setSavingOpenai(false));
  };

  const handleClearOpenaiKey = () => {
    if (!window.confirm(s.confirmClear)) return;
    setSavingOpenai(true);
    setOpenaiError(null);
    void saveAdminSettings({ clearOpenaiKey: true })
      .then((data) => {
        setOpenai(data.openai);
        setApiKey('');
      })
      .catch((err) => {
        if (handleUnauthorized(err)) return;
        setOpenaiError(s.saveError);
      })
      .finally(() => setSavingOpenai(false));
  };

  const handleSaveStripe = () => {
    if (!stripeSecretKey.trim() && !stripeWebhookSecret.trim()) {
      setStripeError('أدخل Secret Key أو Webhook Secret على الأقل.');
      return;
    }

    setSavingStripe(true);
    setStripeError(null);
    setSavedStripe(false);

    const payload: { stripeSecretKey?: string; stripeWebhookSecret?: string } = {};
    if (stripeSecretKey.trim()) payload.stripeSecretKey = stripeSecretKey.trim();
    if (stripeWebhookSecret.trim()) payload.stripeWebhookSecret = stripeWebhookSecret.trim();

    void saveAdminSettings(payload)
      .then((data) => {
        setOpenai(data.openai);
        setStripe(data.stripe);
        setStripeSecretKey('');
        setStripeWebhookSecret('');
        setSavedStripe(true);
        setTimeout(() => setSavedStripe(false), 2500);
      })
      .catch((err) => {
        if (handleUnauthorized(err)) return;
        setStripeError(s.saveError);
      })
      .finally(() => setSavingStripe(false));
  };

  const handleClearStripeSecret = () => {
    if (!window.confirm(s.confirmClearStripeSecret)) return;
    setSavingStripe(true);
    setStripeError(null);
    void saveAdminSettings({ clearStripeSecretKey: true })
      .then((data) => {
        setStripe(data.stripe);
        setStripeSecretKey('');
      })
      .catch((err) => {
        if (handleUnauthorized(err)) return;
        setStripeError(s.saveError);
      })
      .finally(() => setSavingStripe(false));
  };

  const handleClearStripeWebhook = () => {
    if (!window.confirm(s.confirmClearStripeWebhook)) return;
    setSavingStripe(true);
    setStripeError(null);
    void saveAdminSettings({ clearStripeWebhookSecret: true })
      .then((data) => {
        setStripe(data.stripe);
        setStripeWebhookSecret('');
      })
      .catch((err) => {
        if (handleUnauthorized(err)) return;
        setStripeError(s.saveError);
      })
      .finally(() => setSavingStripe(false));
  };

  const handleCopyWebhookUrl = async () => {
    if (!stripe?.webhookUrl) return;
    try {
      await navigator.clipboard.writeText(stripe.webhookUrl);
      setCopiedWebhook(true);
      setTimeout(() => setCopiedWebhook(false), 2000);
    } catch {
      setStripeError('تعذّر نسخ الرابط');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <div className="size-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full p-3 sm:p-6 lg:p-8">
      <AdminPageHeader title={s.title} subtitle={s.subtitle} icon={KeyRound} />

      <div className="mx-auto max-w-2xl space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{s.openaiTitle}</h2>
              <p className="mt-1 text-sm text-gray-500">{s.openaiSubtitle}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                openai?.configured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {openai?.configured ? s.configured : s.notConfigured}
            </span>
          </div>

          {openai?.keyPreview && (
            <div className="mb-4 rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100">
              <p className="text-xs text-gray-500">{s.currentKey}</p>
              <p className="mt-1 font-mono text-sm text-gray-800" dir="ltr">
                {openai.keyPreview}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {sourceLabel(openai.savedInPanel, openai.savedInEnv, s)}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="openai-key" className="mb-1.5 block text-sm font-medium text-gray-700">
                {s.apiKeyLabel}
              </label>
              <input
                id="openai-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={openai?.configured ? s.apiKeyPlaceholderUpdate : s.apiKeyPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                dir="ltr"
                autoComplete="off"
              />
              <p className="mt-1.5 text-xs text-gray-500">{s.apiKeyHint}</p>
            </div>

            <div>
              <label htmlFor="openai-model" className="mb-1.5 block text-sm font-medium text-gray-700">
                {s.modelLabel}
              </label>
              <select
                id="openai-model"
                value={visionModel}
                onChange={(e) => setVisionModel(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {MODEL_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-gray-500">{s.modelHint}</p>
            </div>
          </div>

          {openaiError && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {openaiError}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSaveOpenai}
              disabled={savingOpenai}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {savedOpenai ? <Check className="size-4" /> : <Save className="size-4" />}
              {savedOpenai ? s.saved : savingOpenai ? s.saving : s.save}
            </button>
            {openai?.savedInPanel && (
              <button
                type="button"
                onClick={handleClearOpenaiKey}
                disabled={savingOpenai}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {s.clearKey}
              </button>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                <CreditCard className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{s.stripeTitle}</h2>
                <p className="mt-1 text-sm text-gray-500">{s.stripeSubtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  stripe?.configured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {stripe?.configured ? s.configured : s.notConfigured}
              </span>
              {stripe?.mode === 'live' && (
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
                  {s.stripeModeLive}
                </span>
              )}
              {stripe?.mode === 'test' && (
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                  {s.stripeModeTest}
                </span>
              )}
              {stripe?.mode === 'unknown' && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                  {s.stripeModeUnknown}
                </span>
              )}
            </div>
          </div>

          {(stripe?.secretKeyPreview || stripe?.webhookSecretPreview) && (
            <div className="mb-4 space-y-3">
              {stripe.secretKeyPreview && (
                <div className="rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100">
                  <p className="text-xs text-gray-500">{s.stripeSecretLabel}</p>
                  <p className="mt-1 font-mono text-sm text-gray-800" dir="ltr">
                    {stripe.secretKeyPreview}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {sourceLabel(stripe.savedInPanel.secret, stripe.savedInEnv.secret, s)}
                  </p>
                </div>
              )}
              {stripe.webhookSecretPreview && (
                <div className="rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100">
                  <p className="text-xs text-gray-500">{s.stripeWebhookLabel}</p>
                  <p className="mt-1 font-mono text-sm text-gray-800" dir="ltr">
                    {stripe.webhookSecretPreview}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {sourceLabel(stripe.savedInPanel.webhook, stripe.savedInEnv.webhook, s)}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mb-4 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 px-4 py-3">
            <p className="text-xs font-medium text-indigo-900">{s.stripeWebhookUrlLabel}</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <code className="flex-1 break-all rounded-lg bg-white px-3 py-2 text-xs text-gray-800 ring-1 ring-indigo-100" dir="ltr">
                {stripe?.webhookUrl}
              </code>
              <button
                type="button"
                onClick={() => void handleCopyWebhookUrl()}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
              >
                {copiedWebhook ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedWebhook ? s.copied : s.copy}
              </button>
            </div>
            <p className="mt-2 text-xs text-indigo-800/80">
              {s.stripeWebhookStatus}:{' '}
              {stripe?.webhookConfigured ? s.stripeWebhookActive : s.stripeWebhookMissing}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="stripe-secret" className="mb-1.5 block text-sm font-medium text-gray-700">
                {s.stripeSecretLabel}
              </label>
              <input
                id="stripe-secret"
                type="password"
                value={stripeSecretKey}
                onChange={(e) => setStripeSecretKey(e.target.value)}
                placeholder={stripe?.configured ? s.stripeSecretPlaceholderUpdate : s.stripeSecretPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                dir="ltr"
                autoComplete="off"
              />
              <p className="mt-1.5 text-xs text-gray-500">{s.stripeSecretHint}</p>
            </div>

            <div>
              <label htmlFor="stripe-webhook" className="mb-1.5 block text-sm font-medium text-gray-700">
                {s.stripeWebhookLabel}
              </label>
              <input
                id="stripe-webhook"
                type="password"
                value={stripeWebhookSecret}
                onChange={(e) => setStripeWebhookSecret(e.target.value)}
                placeholder={stripe?.webhookConfigured ? s.stripeWebhookPlaceholderUpdate : s.stripeWebhookPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                dir="ltr"
                autoComplete="off"
              />
              <p className="mt-1.5 text-xs text-gray-500">{s.stripeWebhookHint}</p>
            </div>
          </div>

          {stripeError && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {stripeError}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleSaveStripe}
              disabled={savingStripe}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {savedStripe ? <Check className="size-4" /> : <Save className="size-4" />}
              {savedStripe ? s.saved : savingStripe ? s.saving : s.stripeSave}
            </button>
            {stripe?.savedInPanel.secret && (
              <button
                type="button"
                onClick={handleClearStripeSecret}
                disabled={savingStripe}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {s.clearStripeSecret}
              </button>
            )}
            {stripe?.savedInPanel.webhook && (
              <button
                type="button"
                onClick={handleClearStripeWebhook}
                disabled={savingStripe}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {s.clearStripeWebhook}
              </button>
            )}
          </div>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          {s.securityNote}
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
          {s.stripeSecurityNote}
        </div>
      </div>
    </div>
  );
};
