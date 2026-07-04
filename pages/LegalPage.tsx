import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { StickyNav } from '../components/StickyNav';
import { legalPages, type LegalPageKind } from '../data/legalContent';
import { buildPath } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  kind: LegalPageKind;
}

export const LegalPage: React.FC<LegalPageProps> = ({ kind }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const page = legalPages[kind];

  return (
    <div className="min-h-screen bg-white">
      <StickyNav onApply={() => navigate(`${buildPath(lang)}#destinations`)} hubMode />
      <main className="container mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Link
          to={buildPath(lang)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="size-4" />
          {t.nav.backHome}
        </Link>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{page.title[lang]}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
          {page.paragraphs[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
