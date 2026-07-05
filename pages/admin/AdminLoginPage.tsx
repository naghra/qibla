import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, BarChart3, FileCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLabels } from '../../data/adminLabels';

const featureIcons = [BarChart3, FileCheck, Shield];

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row" dir="rtl">
      {/* Hero panel */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(99,102,241,0.4), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(139,92,246,0.3), transparent)',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{adminLabels.siteName}</p>
              <p className="text-sm text-indigo-200/70">{adminLabels.siteTagline}</p>
            </div>
          </div>
        </div>
        <div className="relative space-y-8">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            إدارة احترافية
            <br />
            <span className="bg-gradient-to-l from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              لطلبات المسافرين
            </span>
          </h2>
          <ul className="space-y-4">
            {adminLabels.login.features.map((feat, i) => {
              const Icon = featureIcons[i] ?? Shield;
              return (
                <li key={feat} className="flex items-center gap-4 text-slate-300">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 backdrop-blur-sm">
                    <Icon className="size-4 text-indigo-200" />
                  </span>
                  <span className="font-medium">{feat}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="relative text-xs text-slate-500">© DacGateway</p>
      </div>

      {/* Login form */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-50 p-4 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(139,92,246,0.06), transparent)',
          }}
        />
        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center lg:text-start">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/30 lg:mx-0">
              <Lock className="size-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{adminLabels.login.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{adminLabels.login.subtitle}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-8"
          >
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                {adminLabels.login.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 ring-1 ring-rose-200/60">
                {adminLabels.login.error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl active:scale-[0.98]"
            >
              {adminLabels.login.submit}
              <ArrowLeft className="size-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400 lg:text-start">{adminLabels.login.hint}</p>
        </div>
      </div>
    </div>
  );
};
