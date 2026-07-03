import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { detectLang } from '../data/i18n';

export const RootRedirect: React.FC = () => {
  const location = useLocation();
  const lang = detectLang(location.pathname, location.search);
  return <Navigate to={`/${lang}`} replace />;
};

export const LegacyApplyRedirect: React.FC = () => {
  const lang = detectLang();
  return <Navigate to={`/${lang}/thailand/tdac/apply`} replace />;
};

/** Redirect old ?lang= query URLs to path-based routes */
export const LegacyLangRedirect: React.FC = () => {
  const location = useLocation();
  const lang = detectLang(location.pathname, location.search);
  const stripped = location.pathname.replace(/^\/(ar|en)/, '') || '/';
  const target = stripped === '/' ? `/${lang}` : `/${lang}${stripped}`;
  return <Navigate to={target + location.hash} replace />;
};
