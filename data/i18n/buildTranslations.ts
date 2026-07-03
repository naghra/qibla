import type { Lang, Translations } from './types';
import type { DestinationDef, PageScope, ServiceDef } from '../destinations';
import { thailandTdacEn } from './services/thailandTdacEn';
import { thailandTdacAr } from './services/thailandTdacAr';

const sharedFooter = {
  en: {
    description: 'An independent private company providing travel document assistance. Not affiliated with any government agency.',
    quickLinks: 'Quick links',
    legal: 'Legal',
    legalLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Refund Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
    copyright: 'All rights reserved.',
    contact: 'support@travelsmart.example · Live chat 24/7',
    disclaimer: 'Disclaimer: Private assistance service — not an official government website.',
  },
  ar: {
    description: 'شركة خاصة مستقلة تقدم مساعدة في طلبات مستندات السفر. غير تابعة لأي جهة حكومية.',
    quickLinks: 'روابط سريعة',
    legal: 'قانوني',
    legalLinks: [
      { label: 'سياسة الخصوصية', href: '#' },
      { label: 'شروط الخدمة', href: '#' },
      { label: 'سياسة الاسترداد', href: '#' },
      { label: 'إخلاء المسؤولية', href: '#' },
    ],
    copyright: 'جميع الحقوق محفوظة.',
    contact: 'support@travelsmart.example · دردشة مباشرة 24/7',
    disclaimer: 'إخلاء مسؤولية: خدمة مساعدة خاصة — ليست الموقع الرسمي للحكومة.',
  },
};

const sharedTestimonials = {
  en: {
    sectionTitle: 'What our travelers are saying',
    sectionSubtitle: 'Real experiences from travelers who trusted us with their travel document applications.',
    footerNote: 'Trusted by travelers worldwide',
    items: [
      { quote: 'Quick and stress-free. Delivered ahead of schedule on a tight deadline.', name: 'Michael R.', role: 'Business Traveler' },
      { quote: 'Applied for my entire family in one session. Saved us hours.', name: 'Sarah K.', role: 'Family Vacation' },
      { quote: 'Step-by-step guidance made everything crystal clear.', name: 'David M.', role: 'First-time Traveler' },
      { quote: 'Smooth process every time. Documents arrived faster than expected.', name: 'Emily W.', role: 'Digital Nomad' },
      { quote: 'Expedited processing was a lifesaver for our honeymoon.', name: 'James T.', role: 'Honeymoon Trip' },
      { quote: 'Got a response within 10 minutes at midnight. Exceptional support!', name: 'Priya S.', role: 'Solo Traveler' },
    ],
  },
  ar: {
    sectionTitle: 'ماذا يقول مسافرونا',
    sectionSubtitle: 'تجارب حقيقية من مسافرين وثقوا بنا في طلبات مستندات السفر.',
    footerNote: 'موثوق من مسافرين حول العالم',
    items: [
      { quote: 'سريع وبدون ضغط. وصل قبل الموعد في وقت ضيق.', name: 'Michael R.', role: 'مسافر أعمال' },
      { quote: 'قدّمت لعائلتي كاملة في جلسة واحدة. وفّر علينا ساعات.', name: 'Sarah K.', role: 'عطلة عائلية' },
      { quote: 'الإرشاد خطوة بخطوة جعل كل شيء واضحاً.', name: 'David M.', role: 'مسافر لأول مرة' },
      { quote: 'عملية سلسة في كل مرة. المستندات وصلت أسرع من المتوقع.', name: 'Emily W.', role: 'رحالة رقمي' },
      { quote: 'المعالجة السريعة أنقذت شهر العسل.', name: 'James T.', role: 'شهر عسل' },
      { quote: 'رد خلال 10 دقائق في منتصف الليل. دعم استثنائي!', name: 'Priya S.', role: 'مسافر منفرد' },
    ],
  },
};

const sharedFaq = {
  en: {
    sectionTitle: 'Frequently Asked Questions',
    sectionSubtitle: 'Find answers about travel document applications, processing times, costs, and security.',
    contactNote: "Can't find your answer?",
    contactLink: 'Contact our 24/7 support team',
    items: [
      { question: 'Can I apply on the day I travel?', answer: 'Yes. Same-day applications are often approved within minutes. We recommend applying in advance.' },
      { question: 'What documents do I need?', answer: 'Passport details, flight info, accommodation address, purpose of travel, and a valid email.' },
      { question: 'What is your approval rate?', answer: 'Up to 99.9% when information is accurate and complete.' },
      { question: 'How long does processing take?', answer: 'Standard (~8 hours), Fast (2 hours), Ultra Fast (15 minutes) depending on your plan.' },
      { question: 'What are the fees?', answer: 'From $40–$65 per traveler plus optional priority fees.' },
      { question: 'How do I track my application?', answer: 'You will receive email updates. Contact support anytime.' },
      { question: 'How will I receive my document?', answer: 'Approved documents are sent to your email.' },
      { question: 'Is my personal information secure?', answer: 'Yes. 256-bit encryption and strict privacy controls.' },
      { question: 'Are you affiliated with any government?', answer: 'No. We are an independent private company.' },
    ],
  },
  ar: {
    sectionTitle: 'الأسئلة الشائعة',
    sectionSubtitle: 'إجابات عن طلبات مستندات السفر وأوقات المعالجة والرسوم والأمان.',
    contactNote: 'لم تجد إجابتك؟',
    contactLink: 'تواصل مع فريق الدعم 24/7',
    items: [
      { question: 'هل يمكنني التقديم في يوم السفر؟', answer: 'نعم. طلبات نفس اليوم تُوافق غالباً خلال دقائق. ننصح بالتقديم مسبقاً.' },
      { question: 'ما المستندات المطلوبة؟', answer: 'تفاصيل جواز السفر، معلومات الرحلة، عنوان الإقامة، غرض السفر، وبريد إلكتروني صالح.' },
      { question: 'ما معدل الموافقة؟', answer: 'يصل إلى 99.9% عند دقة واكتمال المعلومات.' },
      { question: 'كم تستغرق المعالجة؟', answer: 'قياسي (~8 ساعات)، سريع (2 ساعة)، فائق السرعة (15 دقيقة) حسب خطتك.' },
      { question: 'ما الرسوم؟', answer: 'من 40$ إلى 65$ للمسافر بالإضافة لرسوم أولوية اختيارية.' },
      { question: 'كيف أتابع طلبي؟', answer: 'ستتلقى تحديثات عبر البريد. تواصل مع الدعم في أي وقت.' },
      { question: 'كيف أستلم مستندي؟', answer: 'المستندات المعتمدة تُرسل إلى بريدك الإلكتروني.' },
      { question: 'هل معلوماتي آمنة؟', answer: 'نعم. تشفير 256-bit وضوابط خصوصية صارمة.' },
      { question: 'هل أنتم تابعون لحكومة؟', answer: 'لا. نحن شركة خاصة مستقلة.' },
    ],
  },
};

function genericApply(lang: Lang, dest: DestinationDef, service: ServiceDef): Translations['apply'] {
  const country = dest.name[lang];
  const doc = service.shortName[lang];
  if (lang === 'en') {
    return {
      pageTitle: `Apply for ${doc}`,
      pageSubtitle: 'Complete the form below — real-time validation catches errors before submission',
      formTitle: `${doc} Application`,
      stepOf: (step, total, label) => `Step ${step} of ${total} — ${label}`,
      steps: ['Travelers', 'Travel details', 'Review & payment', 'Submitted'],
      traveler: (n) => `Traveler ${n}`,
      primary: '(primary)',
      addTraveler: 'Add traveler',
      firstName: 'First name *',
      lastName: 'Last name *',
      passport: 'Passport number *',
      nationality: 'Nationality *',
      selectNationality: 'Select nationality',
      dateOfBirth: 'Date of birth',
      gender: 'Gender',
      selectGender: 'Select',
      male: 'Male',
      female: 'Female',
      email: 'Email *',
      phone: 'Phone number',
      travelDetails: 'Travel details',
      arrivalDate: 'Arrival date *',
      departureDate: 'Departure date',
      flightNumber: 'Arrival flight number *',
      purpose: 'Purpose of visit',
      selectPurpose: 'Select purpose',
      tourism: 'Tourism',
      business: 'Business',
      transit: 'Transit',
      other: 'Other',
      accommodation: `Accommodation in ${country}`,
      address: 'Accommodation address *',
      city: 'City',
      selectPlan: 'Select processing plan',
      orderSummary: 'Order summary',
      travelersCount: 'Number of travelers',
      plan: 'Plan',
      feePerTraveler: 'Fee per traveler',
      total: 'Total',
      termsNote: 'By continuing, you agree to our terms. Demo form — no real payment processed.',
      successTitle: 'Application submitted successfully!',
      successThanks: (name) => `Thank you ${name}! We will send your document to:`,
      successEmail: '',
      expectedTime: 'Expected processing time:',
      prev: 'Previous',
      next: 'Next',
      submit: 'Submit application',
      backToHome: 'Back to home',
    };
  }
  return {
    pageTitle: `تقديم ${doc}`,
    pageSubtitle: 'أكمل النموذج — التحقق الفوري يكتشف الأخطاء قبل الإرسال',
    formTitle: `طلب ${doc}`,
    stepOf: (step, total, label) => `الخطوة ${step} من ${total} — ${label}`,
    steps: ['المسافرون', 'تفاصيل السفر', 'المراجعة والدفع', 'تم الإرسال'],
    traveler: (n) => `مسافر ${n}`,
    primary: '(رئيسي)',
    addTraveler: 'إضافة مسافر',
    firstName: 'الاسم الأول *',
    lastName: 'اسم العائلة *',
    passport: 'رقم جواز السفر *',
    nationality: 'الجنسية *',
    selectNationality: 'اختر الجنسية',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    selectGender: 'اختر',
    male: 'ذكر',
    female: 'أنثى',
    email: 'البريد الإلكتروني *',
    phone: 'رقم الهاتف',
    travelDetails: 'تفاصيل الرحلة',
    arrivalDate: 'تاريخ الوصول *',
    departureDate: 'تاريخ المغادرة',
    flightNumber: 'رقم رحلة الوصول *',
    purpose: 'غرض الزيارة',
    selectPurpose: 'اختر الغرض',
    tourism: 'سياحة',
    business: 'أعمال',
    transit: 'عبور',
    other: 'أخرى',
    accommodation: `الإقامة في ${country}`,
    address: 'عنوان الإقامة *',
    city: 'المدينة',
    selectPlan: 'اختر خطة المعالجة',
    orderSummary: 'ملخص الطلب',
    travelersCount: 'عدد المسافرين',
    plan: 'الخطة',
    feePerTraveler: 'رسوم لكل مسافر',
    total: 'الإجمالي',
    termsNote: 'بالمتابعة، أنت توافق على شروط الخدمة. نموذج تجريبي — لا دفع حقيقي.',
    successTitle: 'تم إرسال طلبك بنجاح!',
    successThanks: (name) => `شكراً ${name}! سنرسل مستندك إلى:`,
    successEmail: '',
    expectedTime: 'وقت المعالجة المتوقع:',
    prev: 'السابق',
    next: 'التالي',
    submit: 'إرسال الطلب',
    backToHome: 'العودة للرئيسية',
  };
}

function genericPricing(lang: Lang, dest: DestinationDef, service: ServiceDef): Translations['pricing'] {
  const country = dest.name[lang];
  const doc = service.shortName[lang];
  const price = service.priceFrom;
  const plans = [
    { id: 'standard' as const, name: lang === 'en' ? 'Standard' : 'قياسي', time: lang === 'en' ? '~8 hours' : '~8 ساعات', price, priorityFee: 0, description: lang === 'en' ? 'Standard processing with expert review and full support.' : 'معالجة قياسية مع مراجعة خبيرة ودعم كامل.', features: lang === 'en' ? ['Expert review', '24/7 Support', 'Partial refund before processing'] : ['مراجعة خبيرة', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: false },
    { id: 'fast' as const, name: lang === 'en' ? 'Fast' : 'سريع', time: lang === 'en' ? '2 hours' : '2 ساعة', price, priorityFee: 20, description: lang === 'en' ? 'Priority processing in 2 hours.' : 'معالجة أولوية خلال ساعتين.', features: lang === 'en' ? ['Priority processing', '24/7 Support', 'Partial refund before processing'] : ['معالجة أولوية', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: true },
    { id: 'ultra' as const, name: lang === 'en' ? 'Ultra Fast' : 'فائق السرعة', time: lang === 'en' ? '15 minutes' : '15 دقيقة', price, priorityFee: 25, description: lang === 'en' ? 'Urgent processing for last-minute travelers.' : 'معالجة عاجلة للمسافرين في اللحظة الأخيرة.', features: lang === 'en' ? ['Ultra-fast processing', '24/7 Support', 'Partial refund before processing'] : ['معالجة فائقة السرعة', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: false },
  ];
  if (lang === 'en') {
    return {
      sectionTitle: `${doc} pricing plans`,
      sectionSubtitle: `Choose the processing speed that fits your schedule. Service fee from $${price.toFixed(2)} per traveler.`,
      serviceFee: 'service fee',
      perTraveler: 'service fee / traveler',
      oneTimePriority: 'one-time priority fee',
      feePlusPriority: (base, priority) => `$${base}/traveler + $${priority} one-time priority fee`,
      applyNow: 'Apply now',
      plans,
    };
  }
  return {
    sectionTitle: `خطط أسعار ${doc}`,
    sectionSubtitle: `اختر سرعة المعالجة. تبدأ رسوم الخدمة من ${price}$ للمسافر.`,
    serviceFee: 'رسوم خدمة',
    perTraveler: 'رسوم خدمة / مسافر',
    oneTimePriority: 'رسوم أولوية لمرة واحدة',
    feePlusPriority: (base, priority) => `$${base}/مسافر + $${priority} رسوم أولوية لمرة واحدة`,
    applyNow: 'قدّم الآن',
    plans,
  };
}

function buildGenericSections(lang: Lang, label: string, docLabel: string): Pick<Translations, 'features' | 'steps' | 'cta' | 'chat'> {
  if (lang === 'en') {
    return {
      features: {
        sectionTitle: 'Why travelers choose us',
        sectionSubtitle: `We simplify ${label} travel document applications with expert guidance, real-time validation, and 24/7 human support.`,
        cardTitle: `The smart way to apply for your ${label} travel documents`,
        cardSubtitle: 'Skip confusing government portals. Apply online with guided forms, real-time validation, and expert review.',
        trusted: 'Trusted by travelers worldwide',
        cta: 'Start your application now',
        footerNote: 'Up to 99.9% approval rate · 24/7 expert support · Partial refund before processing',
        items: [
          { icon: 'list', title: 'Step-by-step guided process', description: `Clear instructions tailored to ${label} travel document requirements.` },
          { icon: 'headphones', title: '24/7 expert human support', description: 'Real agents available via live chat and email — around the clock.' },
          { icon: 'shield', title: 'Bank-level data encryption', description: '256-bit encryption and strict privacy controls.' },
          { icon: 'users', title: 'Effortless group applications', description: 'Add travel companions in one flow with automatic prefilling.' },
          { icon: 'check', title: 'Live validation and review', description: `Instant error detection before your ${label} application is submitted.` },
        ],
      },
      steps: {
        sectionTitle: 'Apply in 3 easy steps',
        sectionSubtitle: `Our streamlined process takes you from choosing your ${label} document to receiving approved travel documents.`,
        ctaTitle: `Start your stress-free ${label} application today`,
        ctaSubtitle: `Join travelers worldwide who simplified their ${label} travel document applications.`,
        ctaBullets: ['Fast processing', 'Refund before processing', '24/7 expert support'],
        ctaButton: `Get your ${label} travel documents`,
        ctaNote: 'Up to 99.9% approval rate · Average processing in under 24 hours · Secure and encrypted',
        items: [
          { number: '01', title: 'Select your travel document', description: `Pick the ${label} travel document you need — we show requirements, fees, and processing time.` },
          { number: '02', title: 'Complete your application online', description: 'Fill in the guided form in minutes. Real-time validation catches errors instantly.' },
          { number: '03', title: `Get approved and travel to ${label}`, description: `Your approved ${label} documents land in your inbox — ready for your trip.` },
        ],
      },
      cta: {
        title: `Your ${label} travel documents, just a few clicks away`,
        subtitle: 'Skip confusing government portals. Apply online with expert guidance and fast processing.',
        bullets: ['Up to 99.9% approval rate', '5-minute application', '24/7 expert support'],
        button: `Get your ${label} travel documents`,
      },
      chat: {
        title: '24/7 Support',
        subtitle: 'We usually reply within minutes',
        greeting: `Hello! How can we help with your ${docLabel} application?`,
        emailButton: 'Email us',
        available: 'Available around the clock',
      },
    };
  }
  return {
    features: {
      sectionTitle: 'لماذا يختارنا المسافرون',
      sectionSubtitle: `نبسّط طلبات مستندات السفر إلى ${label} بإرشاد خبير وتحقق فوري ودعم بشري 24/7.`,
      cardTitle: `الطريقة الذكية لتقديم مستندات سفر ${label}`,
      cardSubtitle: 'تجاوز المواقع الحكومية المعقدة. قدّم عبر الإنترنت مع نماذج إرشادية وتحقق فوري.',
      trusted: 'موثوق من مسافرين حول العالم',
      cta: 'ابدأ طلبك الآن',
      footerNote: 'معدل موافقة يصل إلى 99.9% · دعم خبير 24/7 · استرداد جزئي قبل المعالجة',
      items: [
        { icon: 'list', title: 'عملية إرشادية خطوة بخطوة', description: `تعليمات واضحة مخصصة لمتطلبات مستندات ${label}.` },
        { icon: 'headphones', title: 'دعم بشري خبير 24/7', description: 'وكلاء حقيقيون متاحون عبر الدردشة والبريد — طوال العام.' },
        { icon: 'shield', title: 'تشفير بمستوى مصرفي', description: 'تشفير 256-bit وضوابط خصوصية صارمة.' },
        { icon: 'users', title: 'طلبات جماعية سهلة', description: 'أضف مرافقيك في تدفق واحد مع تعبئة تلقائية.' },
        { icon: 'check', title: 'تحقق ومراجعة فورية', description: `اكتشاف الأخطاء قبل إرسال طلب ${label}.` },
      ],
    },
    steps: {
      sectionTitle: 'قدّم في 3 خطوات سهلة',
      sectionSubtitle: `عملية مبسّطة من اختيار مستند ${label} إلى استلام المستندات المعتمدة.`,
      ctaTitle: `ابدأ طلب ${label} بدون تعقيد اليوم`,
      ctaSubtitle: `انضم للمسافرين الذين بسّطوا طلبات مستندات ${label}.`,
      ctaBullets: ['معالجة سريعة', 'استرداد قبل المعالجة', 'دعم خبير 24/7'],
      ctaButton: `احصل على مستندات سفر ${label}`,
      ctaNote: 'معدل موافقة يصل إلى 99.9% · متوسط المعالجة أقل من 24 ساعة · آمن ومشفّر',
      items: [
        { number: '01', title: 'اختر مستند السفر', description: `اختر مستند ${label} المطلوب — نعرض المتطلبات والرسوم ووقت المعالجة.` },
        { number: '02', title: 'أكمل طلبك عبر الإنترنت', description: 'املأ النموذج الإرشادي في دقائق. التحقق الفوري يكتشف الأخطاء.' },
        { number: '03', title: `احصل على الموافقة وسافر إلى ${label}`, description: `مستندات ${label} المعتمدة تصل إلى بريدك — جاهزة للرحلة.` },
      ],
    },
    cta: {
      title: `مستندات سفر ${label} — بضغطات قليلة`,
      subtitle: 'تجاوز المواقع الحكومية. قدّم عبر الإنترنت مع إرشاد خبير ومعالجة سريعة.',
      bullets: ['معدل موافقة 99.9%', 'تقديم في 5 دقائق', 'دعم خبير 24/7'],
      button: `احصل على مستندات ${label}`,
    },
    chat: {
      title: 'دعم 24/7',
      subtitle: 'نرد عادةً خلال دقائق',
      greeting: `مرحباً! كيف نساعدك في طلب ${docLabel}؟`,
      emailButton: 'راسلنا عبر البريد',
      available: 'متاح على مدار الساعة',
    },
  };
}

function buildHub(lang: Lang): Translations {
  const sections = buildGenericSections(lang, lang === 'en' ? 'travel' : 'السفر', lang === 'en' ? 'travel document' : 'مستند السفر');
  const siteName = lang === 'en' ? 'Travel Smart Travel Fast' : 'سفر ذكي سفر سريع';
  return {
    siteName,
    metaTitle: lang === 'en' ? 'Stress-free travel documents — Travel Smart Travel Fast' : 'مستندات سفر بدون تعقيد — سفر ذكي سفر سريع',
    metaDescription: lang === 'en' ? 'Apply online for travel documents worldwide — fast processing and 24/7 expert support' : 'قدّم طلبات مستندات السفر عالمياً — معالجة سريعة ودعم خبير 24/7',
    nav: {
      howToApply: lang === 'en' ? 'Destinations' : 'الوجهات',
      howItWorks: lang === 'en' ? 'About us' : 'من نحن',
      contact: lang === 'en' ? 'Contact us' : 'تواصل معنا',
      faq: lang === 'en' ? 'FAQs' : 'الأسئلة الشائعة',
      applyNow: lang === 'en' ? 'Apply now' : 'قدّم الآن',
      menu: lang === 'en' ? 'Menu' : 'القائمة',
      backHome: lang === 'en' ? 'Back to home' : 'العودة للرئيسية',
      travelDocuments: lang === 'en' ? 'Travel documents' : 'مستندات السفر',
    },
    hero: {
      title: lang === 'en' ? 'Stress-free travel documents' : 'مستندات سفر بدون تعقيد',
      subtitle: '',
      trustItems: lang === 'en' ? ['Rated on Trustpilot', 'Secure Process', '24/7 Support', 'Real-time validation'] : ['تقييم على Trustpilot', 'معالجة آمنة', 'دعم 24/7', 'تحقق فوري'],
      cta: lang === 'en' ? 'Start your application' : 'ابدأ طلبك',
      disclaimer: lang === 'en' ? 'is an independent private company — not affiliated with, or operated by any government. You can also apply directly on the' : 'شركة خاصة مستقلة — غير تابعة أو مُشغّلة من أي جهة حكومية. يمكنك أيضاً التقديم مباشرة عبر',
      officialSite: lang === 'en' ? 'official government website' : 'الموقع الرسمي للحكومة',
    },
    about: {
      title: lang === 'en' ? 'Where are you traveling?' : 'إلى أين تسافر؟',
      subtitle: lang === 'en' ? 'Discover breathtaking destinations handpicked by travel experts. From pristine beaches to vibrant cultures, find your next adventure.' : 'اكتشف وجهات مختارة بعناية. من الشواطئ الخلابة إلى الثقافات النابضة — اعثر على مغامرتك القادمة.',
      glanceTitle: '',
      glanceSubtitle: '',
      requirementsTitle: '',
      requirementsDisclaimer: '',
      applyCta: lang === 'en' ? 'Apply now online' : 'قدّم الآن عبر الإنترنت',
    },
    stats: lang === 'en'
      ? [
          { value: '2+', label: 'Years of Experience' },
          { value: 'Up to 99.9%', label: 'Approval rate*' },
          { value: '15+', label: 'Destinations' },
          { value: '24/7', label: 'Assistance' },
        ]
      : [
          { value: '+2', label: 'سنوات خبرة' },
          { value: 'حتى 99.9%', label: 'معدل الموافقة*' },
          { value: '+15', label: 'وجهة' },
          { value: '24/7', label: 'دعم متواصل' },
        ],
    statsNote: lang === 'en' ? '*Approval depends on the issuing authority and the accuracy of your information.' : '*تعتمد الموافقة على الجهة المختصة ودقة المعلومات المقدمة.',
    features: {
      ...sections.features,
      sectionSubtitle: lang === 'en'
        ? 'We simplify travel document applications with expert guidance, real-time validation, and 24/7 human support—so you can focus on planning your trip, not paperwork.'
        : 'نبسّط طلبات مستندات السفر بإرشاد خبير وتحقق فوري ودعم بشري 24/7 — لتتفرغ لتخطيط رحلتك.',
    },
    steps: {
      ...sections.steps,
      sectionSubtitle: lang === 'en'
        ? 'Our streamlined process takes you from choosing your destination to receiving approved travel documents—all online, in just minutes.'
        : 'عملية مبسّطة من اختيار وجهتك إلى استلام مستندات السفر المعتمدة — كلها عبر الإنترنت في دقائق.',
      items: lang === 'en'
        ? [
            { number: '01', title: 'Choose your destination and document', description: 'Select your country and document type—we instantly match you with the right options, requirements, and estimated processing times.' },
            { number: '02', title: 'Complete your application online', description: 'Complete our guided form in minutes. Real-time validation catches errors before you submit, so nothing delays your approval.' },
            { number: '03', title: 'Receive your documents and travel', description: 'Relax while our experts review and process everything. Your approved documents arrive straight to your inbox—ready to go.' },
          ]
        : [
            { number: '01', title: 'اختر وجهتك ومستندك', description: 'اختر الدولة ونوع المستند — نعرض الخيارات والمتطلبات وأوقات المعالجة فوراً.' },
            { number: '02', title: 'أكمل طلبك عبر الإنترنت', description: 'املأ النموذج الإرشادي في دقائق. التحقق الفوري يكتشف الأخطاء قبل الإرسال.' },
            { number: '03', title: 'استلم مستنداتك وسافر', description: 'نراجع ونعالج طلبك. المستندات المعتمدة تصل إلى بريدك — جاهزة للسفر.' },
          ],
      ctaButton: lang === 'en' ? 'Get your travel documents' : 'احصل على مستندات السفر',
    },
    cta: {
      ...sections.cta,
      button: lang === 'en' ? 'Start your application' : 'ابدأ طلبك',
    },
    chat: sections.chat,
    pricing: genericPricing(lang, { name: { en: 'Travel', ar: 'السفر' }, priceFrom: 65, slug: '', countryCode: '', services: [] }, { slug: '', name: { en: 'Document', ar: 'مستند' }, shortName: { en: 'Travel Document', ar: 'مستند سفر' }, description: { en: '', ar: '' }, priceFrom: 65, detailed: false }),
    countries: {
      sectionTitle: '',
      sectionSubtitle: '',
      searchPlaceholder: '',
      required: '',
      showAll: () => '',
      showLess: '',
      footerNote: '',
    },
    testimonials: sharedTestimonials[lang],
    faq: sharedFaq[lang],
    footer: sharedFooter[lang],
    apply: genericApply(lang, { name: { en: 'Travel', ar: 'السفر' }, priceFrom: 65, slug: '', countryCode: '', services: [] }, { slug: '', name: { en: 'Document', ar: 'مستند' }, shortName: { en: 'Travel Document', ar: 'مستند سفر' }, description: { en: '', ar: '' }, priceFrom: 65, detailed: false }),
    glanceItems: [],
    requirements: [],
  };
}

function buildCountry(lang: Lang, dest: DestinationDef): Translations {
  const label = dest.name[lang];
  const hub = buildHub(lang);
  const sections = buildGenericSections(lang, label, dest.services[0]?.shortName[lang] ?? label);
  const docCount = dest.services.length;
  return {
    ...hub,
    metaTitle: lang === 'en' ? `Stress-free ${label} travel documents — Travel Smart Travel Fast` : `مستندات سفر ${label} — سفر ذكي سفر سريع`,
    metaDescription: lang === 'en' ? `Apply online for ${label} travel documents — fast processing and 24/7 support` : `قدّم طلبات مستندات سفر ${label} — معالجة سريعة ودعم 24/7`,
    nav: {
      ...hub.nav,
      howToApply: lang === 'en' ? 'Travel documents' : 'مستندات السفر',
    },
    hero: {
      title: lang === 'en' ? `Travel documents for ${label}` : `مستندات السفر إلى ${label}`,
      subtitle: lang === 'en' ? `We provide all essential travel documents for ${label}, ensuring a seamless travel experience.` : `نوفر جميع مستندات السفر الأساسية إلى ${label} لتجربة سفر سلسة.`,
      trustItems: hub.hero.trustItems,
      cta: lang === 'en' ? 'Apply now' : 'قدّم الآن',
      disclaimer: hub.hero.disclaimer,
      officialSite: hub.hero.officialSite,
    },
    about: {
      title: lang === 'en' ? `Travel documents for ${label}` : `مستندات السفر إلى ${label}`,
      subtitle: lang === 'en' ? `Select the ${label} travel document you need and apply online today.` : `اختر مستند السفر المطلوب إلى ${label} وقدّم عبر الإنترنت اليوم.`,
      glanceTitle: '',
      glanceSubtitle: '',
      requirementsTitle: '',
      requirementsDisclaimer: '',
      applyCta: lang === 'en' ? 'Apply now' : 'قدّم الآن',
    },
    stats: lang === 'en'
      ? [
          { value: '2+', label: 'Years of Experience' },
          { value: '99.9%', label: 'Approval rate*' },
          { value: `${docCount}+`, label: `${label} Documents` },
          { value: '24/7', label: 'Assistance' },
        ]
      : [
          { value: '+2', label: 'سنوات خبرة' },
          { value: '99.9%', label: 'معدل الموافقة*' },
          { value: `${docCount}+`, label: `مستندات ${label}` },
          { value: '24/7', label: 'دعم متواصل' },
        ],
    ...sections,
    pricing: genericPricing(lang, dest, dest.services[0]),
    testimonials: {
      ...sharedTestimonials[lang],
      sectionSubtitle: lang === 'en' ? `Real experiences from travelers who trusted us with their ${label} travel document applications.` : `تجارب حقيقية من مسافرين وثقوا بنا في طلبات مستندات ${label}.`,
    },
    faq: {
      ...sharedFaq[lang],
      sectionSubtitle: lang === 'en' ? `Find answers about ${label} travel document applications, processing times, and security.` : `إجابات عن طلبات مستندات ${label} وأوقات المعالجة والأمان.`,
    },
    apply: genericApply(lang, dest, dest.services[0]),
    glanceItems: [],
    requirements: [],
  };
}

function buildService(lang: Lang, dest: DestinationDef, service: ServiceDef): Translations {
  if (dest.slug === 'thailand' && service.slug === 'tdac') {
    return lang === 'en' ? thailandTdacEn : thailandTdacAr;
  }
  const label = dest.name[lang];
  const doc = service.shortName[lang];
  const country = buildCountry(lang, dest);
  const sections = buildGenericSections(lang, label, doc);
  return {
    ...country,
    metaTitle: lang === 'en' ? `Stress-free ${doc} application — Travel Smart Travel Fast` : `تقديم ${doc} — سفر ذكي سفر سريع`,
    metaDescription: service.description[lang],
    nav: {
      ...country.nav,
      howToApply: lang === 'en' ? 'How to apply' : 'كيفية التقديم',
      howItWorks: lang === 'en' ? 'How it works' : 'كيف يعمل',
    },
    hero: {
      title: lang === 'en' ? `Stress-free ${doc} application` : `تقديم ${doc} بدون تعقيد`,
      subtitle: service.description[lang],
      trustItems: country.hero.trustItems,
      cta: lang === 'en' ? 'Apply now online' : 'قدّم الآن عبر الإنترنت',
      disclaimer: country.hero.disclaimer,
      officialSite: country.hero.officialSite,
    },
    about: {
      title: lang === 'en' ? `About ${doc}` : `عن ${doc}`,
      subtitle: service.description[lang],
      glanceTitle: lang === 'en' ? `${doc} at a glance` : `نظرة سريعة على ${doc}`,
      glanceSubtitle: lang === 'en' ? 'Everything you need to know before applying' : 'كل ما تحتاج معرفته قبل التقديم',
      requirementsTitle: lang === 'en' ? "What you'll need to apply" : 'ما ستحتاجه للتقديم',
      requirementsDisclaimer: lang === 'en' ? 'Private company — not affiliated with any government agency.' : 'شركة خاصة — غير تابعة لأي جهة حكومية.',
      applyCta: lang === 'en' ? 'Apply now online' : 'قدّم الآن عبر الإنترنت',
    },
    stats: lang === 'en'
      ? [
          { value: '~5m', label: 'Processing Time' },
          { value: '99.9%', label: 'Approval rate*' },
          { value: '30d', label: 'Valid for' },
          { value: '24/7', label: 'Assistance' },
        ]
      : [
          { value: '~5 د', label: 'وقت المعالجة' },
          { value: '99.9%', label: 'معدل الموافقة*' },
          { value: '30 يوم', label: 'الصلاحية' },
          { value: '24/7', label: 'دعم متواصل' },
        ],
    ...sections,
    features: {
      ...sections.features,
      sectionSubtitle: lang === 'en' ? `We simplify the ${doc} application with expert guidance and 24/7 support.` : `نبسّط تقديم ${doc} بإرشاد خبير ودعم 24/7.`,
      cardTitle: lang === 'en' ? `The smart way to apply for your ${doc}` : `الطريقة الذكية لتقديم ${doc}`,
    },
    steps: {
      ...sections.steps,
      sectionSubtitle: lang === 'en' ? `Getting your ${doc} has never been easier!` : `الحصول على ${doc} لم يكن أسهل!`,
      ctaButton: lang === 'en' ? `Get your ${doc}` : `احصل على ${doc}`,
    },
    pricing: genericPricing(lang, dest, service),
    countries: {
      sectionTitle: '',
      sectionSubtitle: '',
      searchPlaceholder: '',
      required: '',
      showAll: () => '',
      showLess: '',
      footerNote: '',
    },
    cta: {
      title: lang === 'en' ? `Your ${doc}, just a few clicks away` : `${doc} — بضغطات قليلة`,
      subtitle: sections.cta.subtitle,
      bullets: sections.cta.bullets,
      button: lang === 'en' ? `Get your ${doc}` : `احصل على ${doc}`,
    },
    apply: genericApply(lang, dest, service),
    glanceItems: lang === 'en'
      ? [
          { icon: 'clock', title: 'Processing time', highlight: 'Fast', text: 'Your document is processed quickly after submission.' },
          { icon: 'calendar', title: 'Validity', highlight: 'Until arrival', text: 'Valid for your planned travel dates.' },
          { icon: 'globe', title: 'How to apply', highlight: '100% online', text: `Apply from any device before your ${label} trip.` },
          { icon: 'qr', title: 'On arrival', highlight: 'Show document', text: 'Present from your device or email at immigration.' },
        ]
      : [
          { icon: 'clock', title: 'وقت المعالجة', highlight: 'سريع', text: 'يُعالج مستندك بسرعة بعد الإرسال.' },
          { icon: 'calendar', title: 'الصلاحية', highlight: 'حتى الوصول', text: 'صالح لتواريخ سفرك المحددة.' },
          { icon: 'globe', title: 'كيفية التقديم', highlight: '100% عبر الإنترنت', text: `قدّم من أي جهاز قبل رحلتك إلى ${label}.` },
          { icon: 'qr', title: 'عند الوصول', highlight: 'اعرض المستند', text: 'من هاتفك أو بريدك عند الهجرة.' },
        ],
    requirements: lang === 'en'
      ? ['Passport details', 'Travel details including arrival flight and date', `Accommodation address in ${label}`, 'Purpose of travel', 'Valid email address']
      : ['تفاصيل جواز السفر', 'تفاصيل السفر بما فيها رحلة الوصول', `عنوان الإقامة في ${label}`, 'غرض السفر', 'بريد إلكتروني صالح'],
  };
}

export function buildTranslations(lang: Lang, scope: PageScope): Translations {
  if (scope.type === 'hub') return buildHub(lang);
  if (scope.type === 'country') return buildCountry(lang, scope.destination);
  return buildService(lang, scope.destination, scope.service);
}

// Default for backward compat
export function getTranslations(lang: Lang): Translations {
  return buildHub(lang);
}
