import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ApplySuccessScreen } from '../components/apply/ApplySuccessScreen';
import { LanguageProvider } from '../context/LanguageContext';
import { DEFAULT_LANG, langFromPath } from '../data/i18n';
import type { Lang } from '../data/i18n/types';

/** Static preview route for QA / marketing screenshots. */
export const SuccessPreviewPage: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const validLang: Lang | null =
    lang === 'ar' || lang === 'en' ? lang : langFromPath(`/${lang ?? ''}`);

  if (!validLang) {
    return <Navigate to={`/${DEFAULT_LANG}/success-preview`} replace />;
  }

  return (
    <LanguageProvider lang={validLang} pageScope={{ type: 'hub' }}>
      <div className="min-h-svh bg-gray-50 px-4 py-8">
        <ApplySuccessScreen
          submittedId="APP-MR7XWJ5E-QEPN"
          applicantName="Ahmed Hassan"
          email="ahmed.hassan@example.com"
          destinationName={validLang === 'ar' ? 'تايلاند' : 'Thailand'}
          serviceName={validLang === 'ar' ? 'بطاقة TDAC' : 'Thailand TDAC'}
          planName={validLang === 'ar' ? 'سريع' : 'Fast Track'}
          travelerCount={1}
          total={89}
          estimatedAt={validLang === 'ar' ? '05/07/2026 18:30' : '05/07/2026 6:30 PM'}
          onDone={() => undefined}
        />
      </div>
    </LanguageProvider>
  );
};
