import React, { useState, useEffect, useCallback } from 'react';
import { Hero, HeroAbout, StatsBar } from './components/Hero';
import { Features } from './components/Features';
import { Steps } from './components/Steps';
import { Pricing } from './components/Pricing';
import { Countries } from './components/Countries';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ApplyPage } from './components/ApplyPage';
import { StickyNav } from './components/StickyNav';
import { ChatWidget } from './components/ChatWidget';
import { PlanId } from './types';

type View = 'home' | 'apply';

const App: React.FC = () => {
  const [view, setView] = useState<View>(() =>
    window.location.hash === '#apply' || window.location.pathname.endsWith('/apply') ? 'apply' : 'home'
  );
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('standard');

  const openApply = useCallback((plan?: PlanId) => {
    if (plan) setSelectedPlan(plan);
    setView('apply');
    window.location.hash = 'apply';
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    setView('home');
    window.location.hash = '';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#apply') setView('apply');
      else if (view === 'apply') setView('home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [view]);

  if (view === 'apply') {
    return <ApplyPage initialPlan={selectedPlan} onBack={goHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={() => openApply()} />
      <main>
        <Hero onApply={() => openApply()} />
        <HeroAbout onApply={() => openApply()} />
        <StatsBar />
        <Features onApply={() => openApply()} />
        <Steps onApply={() => openApply()} />
        <Pricing onApply={(plan) => openApply(plan)} />
        <Countries />
        <Testimonials />
        <FAQ />
        <CTA onApply={() => openApply()} />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
