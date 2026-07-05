import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { detectLang, DEFAULT_LANG } from '../data/i18n';

export const RootRedirect: React.FC = () => {
  return <Navigate to={`/${DEFAULT_LANG}`} replace />;
};

export const LegacyApplyRedirect: React.FC = () => {
  return <Navigate to={`/${DEFAULT_LANG}/thailand/tdac/apply`} replace />;
};

/** Redirect old ?lang= query URLs to path-based routes */
export const LegacyLangRedirect: React.FC = () => {
  const location = useLocation();
  const lang = detectLang(location.pathname, location.search);
  const stripped = location.pathname.replace(/^\/(ar|en)/, '') || '/';
  const target = stripped === '/' ? `/${lang}` : `/${lang}${stripped}`;
  return <Navigate to={target + location.hash} replace />;
};
