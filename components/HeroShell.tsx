import React from 'react';
import { IMAGES } from '../data/assets';

interface HeroShellProps {
  children: React.ReactNode;
}

/** Full-width hero wrapper matching reference site (no border-8, no max-w constraint). */
export const HeroShell: React.FC<HeroShellProps> = ({ children }) => (
  <section className="p-4">
    <div className="relative flex min-h-[80svh] w-full flex-col overflow-hidden rounded-4xl">
      <div className="hero-fallback absolute inset-0 overflow-hidden rounded-4xl">
        <img
          src={IMAGES.hero}
          alt=""
          className="absolute inset-0 h-full w-full rounded-4xl object-cover object-center"
          loading="eager"
          fetchPriority="high"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="hero-overlay absolute inset-0 rounded-4xl" aria-hidden />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  </section>
);
