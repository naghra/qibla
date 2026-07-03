import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { ServiceCards } from '../components/ServiceCards';
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

export const CountryPage: React.FC = () => {
  const { lang, destination, t } = useLanguage();
  const navigate = useNavigate();

  if (!destination) return null;

  const primaryService = destination.services[0];
  const goApply = () => {
    navigate(buildPath(lang, destination.slug, primaryService.slug, true));
  };
  const goService = () => {
    navigate(buildPath(lang, destination.slug, primaryService.slug));
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={goApply} />
      <SiteHeader />
      <main>
        <section className="container mx-auto space-y-4 px-4 pb-4 pt-4 text-center">
          <p className="mx-auto max-w-3xl text-pretty text-sm text-gray-400">
            {t.siteName} {t.hero.disclaimer}{' '}
            <a href="#" className="underline hover:text-gray-600">
              {t.hero.officialSite}
            </a>
            .
          </p>
        </section>
        <ServiceCards />
        <StatsBar />
        <Features onApply={goService} />
        <Steps onApply={goApply} />
        <Testimonials />
        <FAQ />
        <CTA onApply={goApply} />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
