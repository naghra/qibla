import React, { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lang, Translations } from '../data/i18n/types';
import { buildTranslations, getDir } from '../data/i18n';
import type { DestinationDef, PageScope, ServiceDef } from '../data/destinations';
import { swapLangInPath } from '../data/destinations';

interface LanguageContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Translations;
  pageScope: PageScope;
  destination?: DestinationDef;
  service?: ServiceDef;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
  lang: Lang;
  pageScope: PageScope;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  lang,
  pageScope,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const t = useMemo(() => buildTranslations(lang, pageScope), [lang, pageScope]);
  const dir = getDir(lang);

  const destination = pageScope.type !== 'hub' ? pageScope.destination : undefined;
  const service = pageScope.type === 'service' ? pageScope.service : undefined;

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      localStorage.setItem('lang', next);
      const newPath = swapLangInPath(location.pathname, next);
      navigate(newPath + location.search + location.hash, { replace: true });
    },
    [lang, location.pathname, location.search, location.hash, navigate]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = t.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.metaDescription);
  }, [lang, dir, t.metaTitle, t.metaDescription]);

  return (
    <LanguageContext.Provider
      value={{ lang, dir, t, pageScope, destination, service, setLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
