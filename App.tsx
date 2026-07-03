import React, { useState } from 'react';
import { Hero, HeroAbout, StatsBar } from './components/Hero';
import { Features } from './components/Features';
import { Steps } from './components/Steps';
import { Pricing } from './components/Pricing';
import { Countries } from './components/Countries';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ApplicationForm } from './components/ApplicationForm';
import { PlanId } from './types';

const App: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('standard');

  const openForm = (plan?: PlanId) => {
    if (plan) setSelectedPlan(plan);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero onApply={() => openForm()} />
        <HeroAbout onApply={() => openForm()} />
        <StatsBar />
        <Features onApply={() => openForm()} />
        <Steps onApply={() => openForm()} />
        <Pricing onApply={(plan) => openForm(plan)} />
        <Countries />
        <Testimonials />
        <FAQ />
        <CTA onApply={() => openForm()} />
      </main>
      <Footer />

      <ApplicationForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        initialPlan={selectedPlan}
      />
    </div>
  );
};

export default App;
