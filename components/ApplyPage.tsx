import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { ApplicationWizard } from './ApplicationWizard';
import { PlanId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface ApplyPageProps {
  initialPlan?: PlanId;
  onBack: () => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ initialPlan, onBack }) => {
  const { t, dir } = useLanguage();
  const { apply: a } = t;
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex items-center justify-between gap-4 p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500"
          >
            <BackIcon className="size-4" />
            {t.nav.backHome}
          </button>
          <Logo showText={false} />
          <LanguageSwitcher variant="light" />
        </div>
      </header>

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
