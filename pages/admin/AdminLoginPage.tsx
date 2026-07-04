import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, BarChart3, FileCheck } from 'lucide-react';
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
      <div className="relative hidden flex-1 flex-col justify-between bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-10 text-white lg:flex">
        <div>
          <p className="text-2xl font-bold">{adminLabels.siteName}</p>
          <p className="mt-1 text-slate-400">{adminLabels.siteTagline}</p>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold leading-tight">
            إدارة احترافية<br />لطلبات المسافرين
          </h2>
          <ul className="space-y-3">
            {adminLabels.login.features.map((feat, i) => {
              const Icon = featureIcons[i] ?? Shield;
              return (
                <li key={feat} className="flex items-center gap-3 text-slate-300">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="size-4" />
                  </span>
                  {feat}
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-xs text-slate-500">© Qibla Travel Documents</p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-50 p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-start">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 lg:mx-0">
              <Lock className="size-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{adminLabels.login.title}</h1>
            <p className="mt-2 text-sm text-gray-500">{adminLabels.login.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
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
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-600">{adminLabels.login.error}</p>
            )}

            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {adminLabels.login.submit}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400 lg:text-start">
            {import.meta.env.DEV ? 'Development: default password is qibla-admin' : adminLabels.login.hint}
          </p>
        </div>
      </div>
    </div>
  );
};
