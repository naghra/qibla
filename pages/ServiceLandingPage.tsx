import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero, HeroAbout, StatsBar } from '../components/Hero';
import { Features } from '../components/Features';
import { Steps } from '../components/Steps';
import { Pricing } from '../components/Pricing';
import { Countries } from '../components/Countries';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { StickyNav } from '../components/StickyNav';
import { ChatWidget } from '../components/ChatWidget';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';
import { PlanId } from '../types';

export const ServiceLandingPage: React.FC = () => {
  const { lang, destination, service, t } = useLanguage();
  const navigate = useNavigate();

  if (!destination || !service) return null;

  const openApply = (plan?: PlanId) => {
    navigate(buildPath(lang, destination.slug, service.slug, true), { state: { plan } });
  };

  const showCountries = service.detailed && destination.slug === 'thailand';
  const showGlance = t.glanceItems.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={() => openApply()} />
      <main>
        <Hero onApply={() => openApply()} />
        {showGlance && <HeroAbout onApply={() => openApply()} />}
        <StatsBar />
        <Features onApply={() => openApply()} />
        <Steps onApply={() => openApply()} />
        <Pricing onApply={(plan) => openApply(plan)} />
        {showCountries && <Countries />}
        <Testimonials />
        <FAQ />
        <CTA onApply={() => openApply()} />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
