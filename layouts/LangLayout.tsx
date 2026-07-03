import React, { useMemo } from 'react';
import { Outlet, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { detectLang, langFromPath } from '../data/i18n';
import type { Lang } from '../data/i18n/types';
import { getDestination, getService, type PageScope } from '../data/destinations';

function resolveScope(country?: string, service?: string): PageScope | 'invalid' {
  if (!country) return { type: 'hub' };
  const destination = getDestination(country);
  if (!destination) return 'invalid';
  if (!service) return { type: 'country', destination };
  const svc = getService(destination, service);
  if (!svc) return 'invalid';
  return { type: 'service', destination, service: svc };
}

export const LangLayout: React.FC = () => {
  const { lang, country, service } = useParams<{
    lang: string;
    country?: string;
    service?: string;
  }>();

  const validLang: Lang | null =
    lang === 'ar' || lang === 'en' ? lang : langFromPath(`/${lang ?? ''}`);

  const scope = useMemo(
    () => (validLang ? resolveScope(country, service) : 'invalid'),
    [country, service, validLang]
  );

  if (!validLang) {
    return <Navigate to={`/${detectLang()}`} replace />;
  }

  if (scope === 'invalid') {
    return <Navigate to={`/${validLang}`} replace />;
  }

  return (
    <LanguageProvider lang={validLang} pageScope={scope}>
      <Outlet />
    </LanguageProvider>
  );
};
