import React, { useEffect, useState } from 'react';
import { KeyRound, Save, Trash2, Check, AlertCircle } from 'lucide-react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { adminLabels } from '../../data/adminLabels';
import {
  fetchAdminSettings,
  saveAdminSettings,
  type AdminOpenAiSettings,
} from '../../services/adminSettingsService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const MODEL_OPTIONS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'gpt-4.1-mini'];

export const AdminSettingsPage: React.FC = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const s = adminLabels.settings;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openai, setOpenai] = useState<AdminOpenAiSettings | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [visionModel, setVisionModel] = useState('gpt-4o');

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    void fetchAdminSettings()
      .then((data) => {
        setOpenai(data.openai);
        setVisionModel(data.openai.visionModel || 'gpt-4o');
      })
      .catch((err) => {
        if (err instanceof Error && err.message === 'unauthorized') {
          logout();
          navigate('/admin/login');
          return;
        }
        setError(s.loadError);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, logout, navigate, s.loadError]);

  const handleSave = () => {
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload: { openaiApiKey?: string; openaiVisionModel: string } = { openaiVisionModel: visionModel };
    if (apiKey.trim()) payload.openaiApiKey = apiKey.trim();

    void saveAdminSettings(payload)
      .then((data) => {
        setOpenai(data.openai);
        setApiKey('');
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      })
      .catch((err) => {
        if (err instanceof Error && err.message === 'unauthorized') {
          logout();
          navigate('/admin/login');
          return;
        }
        setError(s.saveError);
      })
      .finally(() => setSaving(false));
  };

  const handleClearKey = () => {
    if (!window.confirm(s.confirmClear)) return;
    setSaving(true);
    setError(null);
    void saveAdminSettings({ clearOpenaiKey: true })
      .then((data) => {
        setOpenai(data.openai);
        setApiKey('');
      })
      .catch(() => setError(s.saveError))
      .finally(() => setSaving(false));
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
                {openai.savedInPanel ? s.sourcePanel : openai.savedInEnv ? s.sourceEnv : s.sourceNone}
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
            </div>
          </div>

          {error && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saved ? <Check className="size-4" /> : <Save className="size-4" />}
              {saved ? s.saved : saving ? s.saving : s.save}
            </button>
            {openai?.savedInPanel && (
              <button
                type="button"
                onClick={handleClearKey}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {s.clearKey}
              </button>
            )}
          </div>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          {s.securityNote}
        </div>
      </div>
    </div>
  );
};
