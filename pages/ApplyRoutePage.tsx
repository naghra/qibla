import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ApplyPage } from '../components/ApplyPage';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';
import { PlanId } from '../types';

export const ApplyRoutePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, destination, service } = useLanguage();
  const initialPlan = (location.state as { plan?: PlanId } | null)?.plan;

  const onBack = () => {
    if (destination && service) {
      navigate(buildPath(lang, destination.slug, service.slug));
    } else if (destination) {
      navigate(buildPath(lang, destination.slug));
    } else {
      navigate(buildPath(lang));
    }
  };

  return <ApplyPage initialPlan={initialPlan} onBack={onBack} />;
};
