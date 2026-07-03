import React from 'react';
import { Navigate } from 'react-router-dom';
import { detectLang } from '../data/i18n';

export const RootRedirect: React.FC = () => {
  return <Navigate to={`/${detectLang()}`} replace />;
};

export const LegacyApplyRedirect: React.FC = () => {
  const lang = detectLang();
  return <Navigate to={`/${lang}/thailand/tdac/apply`} replace />;
};
