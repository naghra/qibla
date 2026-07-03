import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminLabels } from '../../data/adminLabels';

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-4 sm:p-6" dir="rtl">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-100">
            <Lock className="size-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{adminLabels.login.title}</h1>
          <p className="mt-2 text-sm text-gray-500">{adminLabels.login.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="text-sm font-medium text-red-600">{adminLabels.login.error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {adminLabels.login.submit}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400 sm:mt-6">{adminLabels.login.hint}</p>
      </div>
    </div>
  );
};
