import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { ApplyFormHeader } from './apply/ApplyFormHeader';
import { EmbeddedCheckout } from './apply/EmbeddedCheckout';
import { ChatWidget } from './ChatWidget';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';
import {
  CheckoutError,
  fetchCheckoutEmbed,
  verifyCheckoutSession,
} from '../services/paymentService';
import type { CheckoutSessionResponse } from '../services/paymentService';
import type { StoredApplication } from '../types/admin';

export const PaymentPage: React.FC = () => {
  const { t, lang, destination, service } = useLanguage();
  const a = t.apply;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState<CheckoutSessionResponse | null>(null);
  const [application, setApplication] = useState<StoredApplication | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applyPath =
    destination && service ? buildPath(lang, destination.slug, service.slug, true) : buildPath(lang);

  useEffect(() => {
    if (!sessionId) {
      navigate(applyPath, { replace: true });
      return;
    }

    void fetchCheckoutEmbed(sessionId)
      .then((session) => {
        setCheckout(session);
        return verifyCheckoutSession(sessionId);
      })
      .then((result) => {
        setApplication(result.application);
      })
      .catch((err: unknown) => {
        if (err instanceof CheckoutError && err.code === 'already_paid') {
          navigate(`${applyPath}?session_id=${encodeURIComponent(sessionId)}`, { replace: true });
          return;
        }
        setError(err instanceof Error ? err.message : a.paymentError);
      })
      .finally(() => setLoading(false));
  }, [sessionId, applyPath, navigate, a.paymentError]);

  const handleBack = () => {
    navigate(applyPath);
  };

  return (
    <div
      data-apply-form
      className={`min-h-svh bg-gradient-to-b from-slate-50 to-white text-gray-950 ${lang === 'en' ? 'font-quicksand' : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <ApplyFormHeader />

      <main className="w-full">
        <div className="container mx-auto max-w-3xl flex-1 px-4 pb-24 pt-6 sm:pt-10">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            {a.paymentBackToApply}
          </button>

          <div className="mb-8 text-center sm:text-start">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 sm:mx-0">
              <Lock className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">{a.paymentPageTitle}</h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">{a.paymentCheckoutSubtitle}</p>
          </div>

          {application && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {a.orderSummary}
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{application.serviceName}</p>
                  <p className="text-sm text-gray-600">{application.destinationName}</p>
                </div>
                <div className="text-end">
                  <p className="text-xs text-gray-500">{a.total}</p>
                  <p className="text-2xl font-bold text-indigo-600" dir="ltr">
                    ${application.totalAmount}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                <span>{a.termsNote}</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex min-h-[28rem] flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white py-16">
              <Loader2 className="size-10 animate-spin text-indigo-600" />
              <p className="text-sm font-medium text-gray-600">{a.paymentProcessing}</p>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800" role="alert">
              {error}
            </div>
          )}

          {checkout && !loading && (
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
              <EmbeddedCheckout
                publishableKey={checkout.publishableKey}
                clientSecret={checkout.clientSecret}
                onError={() => setError(a.paymentError)}
              />
            </section>
          )}
        </div>
      </main>

      <ChatWidget variant="plane" />
    </div>
  );
};
