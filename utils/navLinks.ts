import type { Translations } from '../data/i18n/types';
import type { PageScope } from '../data/destinations';

export function getNavLinks(t: Translations, pageType: PageScope['type'] = 'service') {
  if (pageType === 'hub') {
    return [
      { href: '#destinations', label: t.nav.howToApply },
      { href: '#about-us', label: t.nav.howItWorks },
      { href: '#faq', label: t.nav.faq },
      { href: '#contact', label: t.nav.contact },
    ];
  }
  if (pageType === 'country') {
    return [
      { href: '#services', label: t.nav.travelDocuments ?? t.nav.howToApply },
      { href: '#how-it-works', label: t.nav.howItWorks },
      { href: '#faq', label: t.nav.faq },
      { href: '#contact', label: t.nav.contact },
    ];
  }
  return [
    { href: '#how-to-apply', label: t.nav.howToApply },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];
}
