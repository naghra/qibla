import React, { useState } from 'react';
import { ApplicationWizard } from './ApplicationWizard';
import { ApplyApplicationWizard } from './apply/ApplyApplicationWizard';
import { ApplyFormHeader } from './apply/ApplyFormHeader';
import { ChatWidget } from './ChatWidget';
import { PlanId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ApplyPageProps {
  initialPlan?: PlanId;
  onBack: () => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ initialPlan, onBack }) => {
  const { t, lang, destination, service } = useLanguage();
  const { apply: a } = t;
  const [submitted, setSubmitted] = useState(false);

  if (destination && service) {
    return (
      <div
        data-apply-form
        className={`min-h-svh bg-white text-gray-950 ${lang === 'en' ? 'font-quicksand' : ''}`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <ApplyFormHeader />

        <main className="w-full">
          <div className="container mx-auto flex-1 space-y-8 px-4 pb-24 pt-4">
            {!submitted && (
              <h1 className="text-2xl font-bold sm:text-4xl">
                <strong className="block font-bold text-blue-500">{a.applyHeaderTitle}</strong>
                {a.applyOnlineNow}
              </h1>
            )}

            <ApplyApplicationWizard
              initialPlan={initialPlan}
              onComplete={onBack}
              onSubmitted={setSubmitted}
            />
          </div>
        </main>

        <ChatWidget variant="plane" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{a.pageTitle}</h1>
          <p className="text-sm text-gray-600">{a.pageSubtitle}</p>
        </div>
        <div className="rounded-4xl border border-gray-100 bg-white p-4 shadow-sm sm:p-8">
          <ApplicationWizard initialPlan={initialPlan} onComplete={onBack} variant="page" />
        </div>
      </main>
    </div>
  );
};
