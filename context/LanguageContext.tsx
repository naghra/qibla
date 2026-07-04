import React, { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lang, Translations } from '../data/i18n/types';
import { buildTranslations, getDir } from '../data/i18n';
import type { DestinationDef, PageScope, ServiceDef } from '../data/destinations';
import { swapLangInPath } from '../data/destinations';
import { SITE_ORIGIN } from '../utils/siteConfig';

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

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
    document.body.style.fontFamily =
      lang === 'en'
        ? "Quicksand, 'IBM Plex Sans', sans-serif"
        : "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif";
    document.title = t.metaTitle;
    setMeta('description', t.metaDescription);
    setOg('og:title', t.metaTitle);
    setOg('og:description', t.metaDescription);
    setOg('og:type', 'website');
    setOg('og:url', `${SITE_ORIGIN}${location.pathname}`);
    setOg('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US');
    setOg('og:image', `${SITE_ORIGIN}/images/hero.webp`);
  }, [lang, dir, t.metaTitle, t.metaDescription, location.pathname]);

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
