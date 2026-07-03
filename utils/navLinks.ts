import type { Translations } from '../data/i18n/types';

export function getNavLinks(t: Translations) {
  return [
    { href: '#how-to-apply', label: t.nav.howToApply },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];
}
