import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import {
  getLegalPage,
  legalNavLabels,
  legalPath,
  type LegalSlug,
} from '../data/i18n/legalPages';
import { buildPath } from '../data/destinations';

interface LegalPageProps {
  slug: LegalSlug;
}

export const LegalPage: React.FC<LegalPageProps> = ({ slug }) => {
  const { lang } = useLanguage();
  const page = getLegalPage(lang, slug);
  const backLabel = lang === 'ar' ? 'العودة للرئيسية' : 'Back to home';
  const updatedLabel = lang === 'ar' ? 'آخر تحديث' : 'Last updated';
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link to={buildPath(lang)} className="inline-flex shrink-0">
            <Logo className="h-8" showText={false} />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 md:py-14">
        <Link
          to={buildPath(lang)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <BackIcon className="size-4" />
          {backLabel}
        </Link>

        <div className="mx-auto max-w-3xl">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gradient-to-br from-slate-50 to-blue-50/40 px-6 py-8 md:px-10">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{page.title}</h1>
              <p className="mt-2 text-sm text-gray-500">
                {updatedLabel}: {page.lastUpdated}
              </p>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              {page.intro && (
                <p className="mb-8 text-base leading-relaxed text-gray-700">{page.intro}</p>
              )}

              <div className="space-y-8">
                {page.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="mb-3 text-lg font-bold text-gray-900">{section.title}</h2>
                    <div className="space-y-3">
                      {section.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-gray-600"
                          dir={p.includes('@') || p.includes('Arcadia') ? 'ltr' : undefined}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </article>

          <nav
            className="mt-8 flex flex-wrap gap-2"
            aria-label={lang === 'ar' ? 'صفحات قانونية' : 'Legal pages'}
          >
            {(Object.keys(legalNavLabels[lang]) as LegalSlug[]).map((s) => (
              <Link
                key={s}
                to={legalPath(lang, s)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  s === slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {legalNavLabels[lang][s]}
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
};
