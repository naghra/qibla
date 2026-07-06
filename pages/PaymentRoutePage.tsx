import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentPage } from '../components/PaymentPage';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';

export const PaymentRoutePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, destination, service } = useLanguage();

  if (!destination || !service) {
    navigate(buildPath(lang), { replace: true });
    return null;
  }

  return <PaymentPage />;
};
