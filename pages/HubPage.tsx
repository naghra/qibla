import React from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { DestinationsGrid } from '../components/DestinationsGrid';
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
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={scrollToDestinations} hubMode />
      <SiteHeader />
      <main>
        <section className="container mx-auto space-y-6 px-4 pb-8 pt-4 text-center">
          <h1 className="text-pretty text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <p className="mx-auto max-w-3xl text-pretty text-sm text-gray-400">
            {t.siteName} {t.hero.disclaimer}{' '}
            <a href="#" className="underline hover:text-gray-600">
              {t.hero.officialSite}
            </a>
            .
          </p>
        </section>
        <DestinationsGrid />
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
