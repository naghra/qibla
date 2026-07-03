import React from 'react';
import { HubHero } from '../components/HubHero';
import { StatsBar } from '../components/Hero';
import { Features } from '../components/Features';
import { Steps } from '../components/Steps';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { StickyNav } from '../components/StickyNav';
import { ChatWidget } from '../components/ChatWidget';
import { useLanguage } from '../context/LanguageContext';
import { buildPath } from '../data/destinations';
import { useNavigate } from 'react-router-dom';

export const HubPage: React.FC = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={scrollToDestinations} hubMode />
      <main>
        <HubHero onBrowse={scrollToDestinations} />
        <StatsBar />
        <Features onApply={scrollToDestinations} />
        <Steps onApply={() => navigate(buildPath(lang, 'thailand', 'tdac'))} />
        <Testimonials />
        <FAQ />
        <CTA onApply={scrollToDestinations} />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
