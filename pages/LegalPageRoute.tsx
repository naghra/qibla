import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { DEFAULT_LANG, langFromPath } from '../data/i18n';
import type { Lang } from '../data/i18n/types';
import { isLegalSlug } from '../data/i18n/legalPages';
import { LegalPage } from './LegalPage';

export const LegalPageRoute: React.FC = () => {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();

  const validLang: Lang | null =
    lang === 'ar' || lang === 'en' ? lang : langFromPath(`/${lang ?? ''}`);

  if (!validLang) {
    return <Navigate to={`/${DEFAULT_LANG}/legal/privacy`} replace />;
  }

  if (!slug || !isLegalSlug(slug)) {
    return <Navigate to={`/${validLang}/legal/privacy`} replace />;
  }

  return (
    <LanguageProvider lang={validLang} pageScope={{ type: 'hub' }}>
      <LegalPage slug={slug} />
    </LanguageProvider>
  );
};
