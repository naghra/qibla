import { MapPin, Star, HelpCircle, Mail, ListOrdered, Info, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Lang, Translations } from '../data/i18n/types';
import type { PageScope } from '../data/destinations';

export interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function getApplyFormNavLinks(
  t: Translations,
  lang: Lang,
  destinationSlug: string,
  serviceSlug: string
): NavLinkItem[] {
  const base = `/${lang}/${destinationSlug}/${serviceSlug}`;
  return [
    { href: `${base}#how-to-apply`, label: t.nav.howToApply, icon: ListOrdered },
    { href: `${base}#how-it-works`, label: t.nav.howItWorks, icon: Info },
    { href: `${base}#faq`, label: t.nav.faq, icon: HelpCircle },
    { href: `${base}#contact`, label: t.nav.contact, icon: Mail },
  ];
}

export function getNavLinks(t: Translations, pageType: PageScope['type'] = 'service'): NavLinkItem[] {
  if (pageType === 'hub') {
    return [
      { href: '#destinations', label: t.nav.howToApply, icon: MapPin },
      { href: '#about-us', label: t.nav.howItWorks, icon: Star },
      { href: '#faq', label: t.nav.faq, icon: HelpCircle },
      { href: '#contact', label: t.nav.contact, icon: Mail },
    ];
  }
  if (pageType === 'country') {
    return [
      { href: '#documents', label: t.nav.travelDocuments ?? t.nav.howToApply, icon: FileText },
      { href: '#contact', label: t.nav.contact, icon: Mail },
      { href: '#faq', label: t.nav.faq, icon: HelpCircle },
    ];
  }
  return [
    { href: '#how-to-apply', label: t.nav.howToApply, icon: ListOrdered },
    { href: '#how-it-works', label: t.nav.howItWorks, icon: Info },
    { href: '#faq', label: t.nav.faq, icon: HelpCircle },
    { href: '#contact', label: t.nav.contact, icon: Mail },
  ];
}
