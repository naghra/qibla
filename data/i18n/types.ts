export type Lang = 'ar' | 'en';

export interface GlanceItem {
  icon: string;
  title: string;
  highlight: string;
  text: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface PricingPlanItem {
  id: 'standard' | 'fast' | 'ultra';
  name: string;
  time: string;
  price: number;
  priorityFee: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Translations {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  nav: {
    howToApply: string;
    howItWorks: string;
    contact: string;
    faq: string;
    applyNow: string;
    menu: string;
    backHome: string;
  };
  hero: {
    title: string;
    subtitle: string;
    trustItems: string[];
    cta: string;
    disclaimer: string;
    officialSite: string;
  };
  about: {
    title: string;
    subtitle: string;
    glanceTitle: string;
    glanceSubtitle: string;
    requirementsTitle: string;
    requirementsDisclaimer: string;
    applyCta: string;
  };
  stats: { value: string; label: string }[];
  statsNote: string;
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    cardTitle: string;
    cardSubtitle: string;
    trusted: string;
    cta: string;
    footerNote: string;
    items: FeatureItem[];
  };
  steps: {
    sectionTitle: string;
    sectionSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBullets: string[];
    ctaButton: string;
    ctaNote: string;
    items: StepItem[];
  };
  pricing: {
    sectionTitle: string;
    sectionSubtitle: string;
    serviceFee: string;
    perTraveler: string;
    oneTimePriority: string;
    feePlusPriority: (base: number, priority: number) => string;
    applyNow: string;
    plans: PricingPlanItem[];
  };
  countries: {
    sectionTitle: string;
    sectionSubtitle: string;
    searchPlaceholder: string;
    required: string;
    showAll: (n: number) => string;
    showLess: string;
    footerNote: string;
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    footerNote: string;
    items: TestimonialItem[];
  };
  faq: {
    sectionTitle: string;
    sectionSubtitle: string;
    contactNote: string;
    contactLink: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    bullets: string[];
    button: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    legal: string;
    legalLinks: { label: string; href: string }[];
    copyright: string;
    contact: string;
    disclaimer: string;
  };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    emailButton: string;
    available: string;
  };
  apply: {
    pageTitle: string;
    pageSubtitle: string;
    formTitle: string;
    stepOf: (step: number, total: number, label: string) => string;
    steps: string[];
    traveler: (n: number) => string;
    primary: string;
    addTraveler: string;
    firstName: string;
    lastName: string;
    passport: string;
    nationality: string;
    selectNationality: string;
    dateOfBirth: string;
    gender: string;
    selectGender: string;
    male: string;
    female: string;
    email: string;
    phone: string;
    travelDetails: string;
    arrivalDate: string;
    departureDate: string;
    flightNumber: string;
    purpose: string;
    selectPurpose: string;
    tourism: string;
    business: string;
    transit: string;
    other: string;
    accommodation: string;
    address: string;
    city: string;
    selectPlan: string;
    orderSummary: string;
    travelersCount: string;
    plan: string;
    feePerTraveler: string;
    total: string;
    termsNote: string;
    successTitle: string;
    successThanks: (name: string) => string;
    successEmail: string;
    expectedTime: string;
    prev: string;
    next: string;
    submit: string;
    backToHome: string;
  };
  glanceItems: GlanceItem[];
  requirements: string[];
}
