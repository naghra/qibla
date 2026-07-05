import type { Lang, Translations } from './types';
import type { DestinationDef, PageScope, ServiceDef } from '../destinations';
import { siteDefinition, companyInfo } from './siteDefinition';
import { thailandTdacEn } from './services/thailandTdacEn';
import { thailandTdacAr } from './services/thailandTdacAr';

const sharedFooter = {
  en: {
    description: siteDefinition.en,
    companyInfoTitle: companyInfo.title.en,
    companyName: companyInfo.name,
    companyAddress: companyInfo.address,
    quickLinks: 'Quick links',
    legal: 'Legal',
    legalLinks: [
      { label: 'Privacy Policy', slug: 'privacy' },
      { label: 'Terms of Service', slug: 'terms' },
      { label: 'Refund Policy', slug: 'refund' },
      { label: 'Disclaimer', slug: 'disclaimer' },
    ],
    paymentMethodsTitle: 'PAYMENT METHODS & SECURITY',
    paymentSslNote: '256-bit SSL encrypted',
    paymentPciNote: 'PCI-DSS compliant checkout',
    copyright: 'All rights reserved.',
    contact: 'support@travelsmart.example · Live chat 24/7',
    disclaimer: '',
  },
  ar: {
    description: siteDefinition.ar,
    companyInfoTitle: companyInfo.title.ar,
    companyName: companyInfo.name,
    companyAddress: companyInfo.address,
    quickLinks: 'روابط سريعة',
    legal: 'قانوني',
    legalLinks: [
      { label: 'سياسة الخصوصية', slug: 'privacy' },
      { label: 'شروط الخدمة', slug: 'terms' },
      { label: 'سياسة الاسترداد', slug: 'refund' },
      { label: 'إخلاء المسؤولية', slug: 'disclaimer' },
    ],
    paymentMethodsTitle: 'طرق الدفع والأمان',
    paymentSslNote: 'تشفير SSL 256-bit',
    paymentPciNote: 'دفع متوافق مع PCI-DSS',
    copyright: 'جميع الحقوق محفوظة.',
    contact: 'support@travelsmart.example · دردشة مباشرة 24/7',
    disclaimer: '',
  },
};

const sharedTestimonials = {
  en: {
    sectionTitle: 'What our travelers are saying',
    sectionSubtitle: 'Real experiences from travelers who trusted us with their travel document applications.',
    footerNote: 'Trusted by travelers worldwide',
    items: [
      { quote: 'Quick and stress-free. I needed my travel documents processed on a tight deadline, and DacGateway delivered ahead of schedule. Their real-time tracking kept me informed every step of the way.', name: 'Michael R.', role: 'Business Traveler' },
      { quote: 'Applied for my entire family in one session. The group application feature saved us hours compared to doing it individually. Support team answered all our questions within minutes.', name: 'Sarah K.', role: 'Family Vacation' },
      { quote: 'As a first-time international traveler, I was nervous about the paperwork. The step-by-step guidance made everything crystal clear. I had my approved documents within days.', name: 'David M.', role: 'First-time Traveler' },
      { quote: "I've used DacGateway for three different countries now. Each time the process was smooth and the documents arrived faster than expected. It's my go-to service for every trip.", name: 'Emily W.', role: 'Digital Nomad' },
      { quote: 'We needed travel documents for our honeymoon on short notice. The expedited processing was a lifesaver. Everything was approved within 48 hours. Absolutely fantastic service!', name: 'James T.', role: 'Honeymoon Trip' },
      { quote: 'The customer support is exceptional. I had a question about my application at midnight and got a response within 10 minutes. That level of dedication is rare and deeply appreciated.', name: 'Priya S.', role: 'Solo Traveler' },
      { quote: 'From application to approval, everything was transparent and straightforward. No hidden fees, no surprises. Just reliable, efficient service that made my trip planning stress-free.', name: 'Carlos G.', role: 'Adventure Traveler' },
      { quote: 'I was overwhelmed with visa requirements for my study abroad program. DacGateway broke it all down into simple steps. I couldn\'t have done it without them.', name: 'Anna L.', role: 'Study Abroad' },
    ],
  },
  ar: {
    sectionTitle: 'ماذا يقول مسافرونا',
    sectionSubtitle: 'تجارب حقيقية من مسافرين وثقوا بنا في طلبات مستندات السفر.',
    footerNote: 'موثوق من مسافرين حول العالم',
    items: [
      { quote: 'سريع وبدون ضغط. احتجت معالجة مستنداتي في وقت ضيق، وDacGateway سلّمت قبل الموعد. التتبع الفوري أبقاني على اطلاع في كل خطوة.', name: 'Michael R.', role: 'مسافر أعمال' },
      { quote: 'قدّمت لعائلتي كاملة في جلسة واحدة. ميزة الطلب الجماعي وفّرت علينا ساعات. فريق الدعم أجاب خلال دقائق.', name: 'Sarah K.', role: 'عطلة عائلية' },
      { quote: 'كمسافر دولي لأول مرة، كنت قلقاً من الأوراق. الإرشاد خطوة بخطوة جعل كل شيء واضحاً. حصلت على مستنداتي خلال أيام.', name: 'David M.', role: 'مسافر لأول مرة' },
      { quote: 'استخدمت DacGateway لثلاث دول. في كل مرة كانت العملية سلسة والمستندات وصلت أسرع من المتوقع.', name: 'Emily W.', role: 'رحالة رقمي' },
      { quote: 'احتجنا مستندات سفر لشهر العسل في وقت قصير. المعالجة السريعة أنقذتنا. الموافقة خلال 48 ساعة!', name: 'James T.', role: 'شهر عسل' },
      { quote: 'دعم العملاء استثنائي. طرحت سؤالاً في منتصف الليل وحصلت على رد خلال 10 دقائق.', name: 'Priya S.', role: 'مسافر منفرد' },
      { quote: 'من التقديم إلى الموافقة، كل شيء كان شفافاً. لا رسوم مخفية. خدمة موثوقة جعلت تخطيط رحلتي بدون ضغط.', name: 'Carlos G.', role: 'مسافر مغامرات' },
      { quote: 'كنت مرتبكاً بمتطلبات التأشيرة للدراسة بالخارج. DacGateway بسّط كل شيء في خطوات واضحة.', name: 'Anna L.', role: 'دراسة بالخارج' },
    ],
  },
};

const sharedFaq = {
  en: {
    sectionTitle: 'Frequently Asked Questions',
    sectionSubtitle: 'Find answers about travel document applications, processing times, costs, and how we keep your information secure throughout the process.',
    contactNote: "Can't find your answer?",
    contactLink: 'Contact our 24/7 support team via chat or email.',
    items: [
      { question: 'Can I apply on the day I travel?', answer: 'Yes. Same-day applications are available and often approved within minutes. To reduce last-minute risk, we recommend applying in advance.' },
      { question: 'What documents do I need to apply for a travel document online?', answer: 'A valid passport and any destination-specific requirements. We guide you step-by-step and flag missing items before you submit.' },
      { question: 'What is the approval rate for online travel document applications?', answer: 'Clients see approval rates up to 99.9% when all requirements are met.* Approval depends on the issuing authority and the accuracy of your information.' },
      { question: 'How long does travel document processing take?', answer: 'Timing varies by country and document. Many are issued the same day, some in as little as 1 hour. We show an ETA before you pay.' },
      { question: 'What are the fees for online travel document application services?', answer: 'Service fees start at $40, plus any applicable government or consular fees.' },
      { question: 'How do I track my application?', answer: 'Use our online portal anytime. Enter your tracking number to see real-time status and expected delivery.' },
      { question: 'How will I receive my travel document?', answer: 'By email. You can download, print, or show it on your phone.' },
      { question: 'Is my personal information secure?', answer: 'Yes. We use advanced encryption and security protocols to protect your personal information throughout the application process.' },
      { question: 'Is there customer support available if I need help?', answer: 'Yes. We offer 24/7 support via chat and email to assist you throughout the application process.' },
      { question: 'Are you affiliated with any government?', answer: 'No. We are a private service provider and are not affiliated with any government. We prepare and submit applications on your behalf where permitted.' },
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
      applyHeaderTitle: doc,
      applyOnlineNow: 'Apply Online Now',
      formTitle: `${doc} Application`,
      stepOf: (step, total, label) => `Step ${step} of ${total} — ${label}`,
      steps: ['Travelers', 'Travel details', 'Review & payment', 'Submitted'],
      formSteps: ['Trip details', 'Your info', 'Resume'],
      arriveQuestion: `When do you arrive in ${country}?`,
      departQuestion: `When do you depart from ${country}?`,
      year: 'Year',
      month: 'Month',
      day: 'Day',
      emailLabel: 'Email address',
      emailPlaceholder: 'johndoe@example.com',
      emailHelper: '* Primary contact method, please verify the email.',
      phoneCountryLabel: 'Country of phone number',
      phoneLabel: 'Phone number',
      phoneSmsNote: '* By continuing, you agree to receive SMS notifications for application tracking.',
      saveAndContinue: 'Save and continue',
      previousStep: 'Previous step',
      travelerYourself: '(Yourself)',
      autofillPassport: 'Click to autofill with passport photo (optional)',
      orFillManually: 'Or fill manually',
      firstMiddleName: 'First and middle name',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Doe',
      passportCountryLabel: 'Country of passport',
      nationalityOnPassport: 'Nationality on passport',
      passportNumberLabel: 'Passport number',
      passportNumberHelper: '* Be careful with the letter "O" and the number "0"; and the letter "I" and the number "1".',
      passportIssueDate: 'Passport issue date',
      passportExpiryDate: 'Passport expiry date',
      genderOther: 'Other',
      removeTraveler: 'Remove traveler',
      resumePlaceholderTitle: 'Coming soon',
      resumePlaceholderSubtitle: 'Review step will be added soon.',
      totalTravelers: (n) => (n === 1 ? "Total 1 traveler's:" : `Total ${n} travelers:`),
      getInTime: (time) => `Get in ${time}`,
      fastest: 'Fastest',
      estimatedProcessingAt: 'Estimated processing at:',
      essentialsFor: (dest) => `Essentials for visiting ${dest}`,
      esimTitle: (dest) => `Stay connected in ${dest} — add an eSIM data plan (optional)`,
      esimDescription: 'Add a travel eSIM for mobile data on arrival.',
      esimComingSoon: 'eSIM plans coming soon.',
      stepPlaceholderTitle: 'Coming soon',
      stepPlaceholderSubtitle: 'Fields for this step will be added soon.',
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
      termsNote: 'By continuing, you agree to our terms. You will be redirected to secure Stripe checkout.',
      successTitle: 'Application submitted successfully!',
      successThanks: (name) => `Thank you ${name}! We will send your document to:`,
      successEmail: '',
      expectedTime: 'Expected processing time:',
      prev: 'Previous',
      next: 'Next',
      submit: 'Pay & submit',
      backToHome: 'Back to home',
      paymentProcessing: 'Redirecting to secure checkout…',
      paymentVerifying: 'Confirming your payment…',
      paymentCancelled: 'Payment was cancelled. You can review your order and try again.',
      paymentError: 'Payment could not be completed. Please try again.',
      paymentPending: 'Payment is still processing. Please wait a moment and refresh, or contact support with your order reference.',
    };
  }
  return {
    pageTitle: `تقديم ${doc}`,
    pageSubtitle: 'أكمل النموذج — التحقق الفوري يكتشف الأخطاء قبل الإرسال',
    applyHeaderTitle: doc,
    applyOnlineNow: 'قدّم عبر الإنترنت الآن',
    formTitle: `طلب ${doc}`,
    stepOf: (step, total, label) => `الخطوة ${step} من ${total} — ${label}`,
    steps: ['المسافرون', 'تفاصيل السفر', 'المراجعة والدفع', 'تم الإرسال'],
    formSteps: ['تفاصيل الرحلة', 'معلوماتك', 'السيرة'],
    arriveQuestion: `متى تصل إلى ${country}؟`,
    departQuestion: `متى تغادر من ${country}؟`,
    year: 'السنة',
    month: 'الشهر',
    day: 'اليوم',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'johndoe@example.com',
    emailHelper: '* وسيلة الاتصال الرئيسية، يرجى التحقق من البريد.',
    phoneCountryLabel: 'دولة رقم الهاتف',
    phoneLabel: 'رقم الهاتف',
    phoneSmsNote: '* بالمتابعة، أنت توافق على تلقي إشعارات SMS لتتبع طلبك.',
    saveAndContinue: 'حفظ ومتابعة',
    previousStep: 'الخطوة السابقة',
    travelerYourself: '(أنت)',
    autofillPassport: 'انقر للملء التلقائي من صورة الجواز (اختياري)',
    orFillManually: 'أو املأ يدوياً',
    firstMiddleName: 'الاسم الأول والأوسط',
    firstNamePlaceholder: 'John',
    lastNameLabel: 'اسم العائلة',
    lastNamePlaceholder: 'Doe',
    passportCountryLabel: 'دولة جواز السفر',
    nationalityOnPassport: 'الجنسية في الجواز',
    passportNumberLabel: 'رقم جواز السفر',
    passportNumberHelper: '* انتبه للحرف "O" والرقم "0"؛ والحرف "I" والرقم "1".',
    passportIssueDate: 'تاريخ إصدار الجواز',
    passportExpiryDate: 'تاريخ انتهاء الجواز',
    genderOther: 'آخر',
    removeTraveler: 'إزالة المسافر',
    resumePlaceholderTitle: 'قريباً',
    resumePlaceholderSubtitle: 'خطوة المراجعة ستُضاف قريباً.',
    totalTravelers: (n) => (n === 1 ? 'إجمالي مسافر واحد:' : `إجمالي ${n} مسافرين:`),
    getInTime: (time) => `استلام خلال ${time}`,
    fastest: 'الأسرع',
    estimatedProcessingAt: 'الوقت المتوقع للمعالجة:',
    essentialsFor: (dest) => `أساسيات زيارة ${dest}`,
    esimTitle: (dest) => `ابقَ متصلاً في ${dest} — أضف eSIM (اختياري)`,
    esimDescription: 'أضف eSIM للبيانات فور الوصول.',
    esimComingSoon: 'خطط eSIM قريباً.',
    stepPlaceholderTitle: 'قريباً',
    stepPlaceholderSubtitle: 'سنضيف حقول هذه الخطوة قريباً.',
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
    termsNote: 'بالمتابعة، أنت توافق على شروط الخدمة. سيتم تحويلك إلى صفحة الدفع الآمنة عبر Stripe.',
    successTitle: 'تم إرسال طلبك بنجاح!',
    successThanks: (name) => `شكراً ${name}! سنرسل مستندك إلى:`,
    successEmail: '',
    expectedTime: 'وقت المعالجة المتوقع:',
    prev: 'السابق',
    next: 'التالي',
    submit: 'ادفع وأرسل',
    backToHome: 'العودة للرئيسية',
    paymentProcessing: 'جاري التحويل إلى الدفع الآمن…',
    paymentVerifying: 'جاري تأكيد الدفع…',
    paymentCancelled: 'تم إلغاء الدفع. يمكنك مراجعة طلبك والمحاولة مرة أخرى.',
    paymentError: 'تعذّر إتمام الدفع. يرجى المحاولة مرة أخرى.',
    paymentPending: 'الدفع قيد المعالجة. انتظر قليلاً ثم حدّث الصفحة، أو تواصل مع الدعم مع رقم الطلب.',
  };
}

function genericPricing(lang: Lang, dest: DestinationDef, service: ServiceDef): Translations['pricing'] {
  const country = dest.name[lang];
  const doc = service.shortName[lang];
  const price = service.priceFrom;
  const plans = [
    { id: 'standard' as const, name: lang === 'en' ? 'Standard' : 'قياسي', time: lang === 'en' ? '~8 hours' : '~8 ساعات', price, priorityFee: 0, description: lang === 'en' ? `Apply online for your ${doc} with standard processing. Includes expert document review, real-time validation, and full support throughout your application.` : `قدّم ${doc} عبر الإنترنت بمعالجة قياسية. تشمل مراجعة خبيرة وتحقق فوري ودعم كامل.`, features: lang === 'en' ? ['Expert review', '24/7 Support', 'Partial refund before processing'] : ['مراجعة خبيرة', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: false },
    { id: 'fast' as const, name: lang === 'en' ? 'Fast' : 'سريع', time: lang === 'en' ? '2 hours' : '2 ساعة', price, priorityFee: 20, description: lang === 'en' ? `Get your ${doc} approved faster with priority processing. Expedited expert review so your travel documents are ready in just 2 hours.` : `احصل على ${doc} أسرع بمعالجة أولوية. مراجعة خبيرة مستعجلة خلال ساعتين.`, features: lang === 'en' ? ['Priority processing', '24/7 Support', 'Partial refund before processing'] : ['معالجة أولوية', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: true },
    { id: 'ultra' as const, name: lang === 'en' ? 'Ultra Fast' : 'فائق السرعة', time: lang === 'en' ? '15 minutes' : '15 دقيقة', price, priorityFee: 25, description: lang === 'en' ? `Urgent ${doc} processing for last-minute travelers. Our fastest tier gets your travel documents reviewed and ready in just 15 minutes.` : `معالجة عاجلة لـ${doc} للمسافرين في اللحظة الأخيرة. أسرع مستوى — جاهز خلال 15 دقيقة.`, features: lang === 'en' ? ['Ultra-fast processing', '24/7 Support', 'Partial refund before processing'] : ['معالجة فائقة السرعة', 'دعم 24/7', 'استرداد جزئي قبل المعالجة'], popular: false },
  ];
  if (lang === 'en') {
    return {
      sectionTitle: `${doc} pricing plans`,
      sectionSubtitle: `Choose the processing speed that best fits your travel schedule. Apply online for your ${doc} from $${price.toFixed(2)} service fee per traveler.`,
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
    sectionSubtitle: `اختر سرعة المعالجة المناسبة. قدّم ${doc} عبر الإنترنت برسوم خدمة تبدأ من ${price}$ للمسافر.`,
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
  const siteName = lang === 'en' ? 'DacGateway' : 'DacGateway';
  return {
    siteName,
    metaTitle: lang === 'en' ? 'Stress-free travel documents — DacGateway' : 'مستندات سفر بدون تعقيد — DacGateway',
    metaDescription: lang === 'en'
      ? 'Apply online for arrival cards, eVisas and travel documents with expert document review, real-time validation and 24/7 support.'
      : 'قدّم طلبات بطاقات الوصول والتأشيرات ومستندات السفر عبر الإنترنت مع مراجعة خبيرة وتحقق فوري ودعم 24/7.',
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
      titleLine1: lang === 'en' ? 'Stress-free' : 'بدون تعقيد',
      titleLine2: lang === 'en' ? 'Travel Documents' : 'مستندات السفر',
      subtitle: lang === 'en'
        ? 'Online application assistance for travel documents worldwide.'
        : 'مساعدة في تقديم مستندات السفر عبر الإنترنت حول العالم.',
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
      cardSubtitle: lang === 'en'
        ? 'Skip confusing government portals. Apply online with guided forms, real-time validation, and expert review—all in one place.'
        : 'تجاوز المواقع الحكومية المعقدة. قدّم عبر الإنترنت مع نماذج إرشادية وتحقق فوري ومراجعة خبيرة — في مكان واحد.',
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
      subtitle: lang === 'en'
        ? 'Skip confusing government portals. Apply online with expert guidance, real-time validation, and fast processing.'
        : 'تجاوز المواقع الحكومية. قدّم عبر الإنترنت مع إرشاد خبير وتحقق فوري ومعالجة سريعة.',
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
  const primaryDoc = dest.services[0]?.name[lang] ?? label;
  const docStatValue = lang === 'en' ? `${Math.max(docCount, 2)}+` : `${docCount}+`;
  return {
    ...hub,
    metaTitle: lang === 'en' ? `Stress-free ${label} travel documents — DacGateway` : `مستندات سفر ${label} — DacGateway`,
    metaDescription: lang === 'en'
      ? `Apply online for ${label} travel documents (${primaryDoc}) with expert review, real-time validation and 24/7 support.`
      : `قدّم مستندات سفر ${label} (${primaryDoc}) — مراجعة خبيرة وتحقق فوري ودعم 24/7.`,
    nav: {
      ...hub.nav,
      howToApply: lang === 'en' ? 'Travel documents' : 'مستندات السفر',
      howItWorks: lang === 'en' ? 'About us' : 'من نحن',
    },
    hero: {
      title: lang === 'en' ? `Travel documents for ${label}` : `مستندات السفر إلى ${label}`,
      badgeLine1: label,
      badgeLine2: lang === 'en' ? 'Travel Documents' : 'مستندات السفر',
      subtitle: lang === 'en'
        ? `Apply for ${label} travel documents — ${primaryDoc}. Smart, fast and reliable.`
        : `قدّم مستندات سفر ${label} — ${primaryDoc}. ذكي وسريع وموثوق.`,
      trustItems: hub.hero.trustItems,
      cta: lang === 'en' ? 'Apply now' : 'قدّم الآن',
      disclaimer: hub.hero.disclaimer,
      officialSite: hub.hero.officialSite,
    },
    about: {
      title: lang === 'en' ? `Travel documents for ${label}` : `مستندات السفر إلى ${label}`,
      subtitle: lang === 'en'
        ? `We provide all the essential travel documents for ${label}, ensuring a seamless and stress-free travel experience.`
        : `نوفر جميع مستندات السفر الأساسية إلى ${label} لتجربة سفر سلسة وبدون تعقيد.`,
      glanceTitle: '',
      glanceSubtitle: '',
      requirementsTitle: '',
      requirementsDisclaimer: '',
      applyCta: lang === 'en' ? 'Apply now' : 'قدّم الآن',
    },
    stats: lang === 'en'
      ? [
          { value: '2+', label: 'Years of Experience' },
          { value: 'Up to 99.9%', label: 'Approval rate*' },
          { value: docStatValue, label: `${label} Documents` },
          { value: '24/7', label: 'Assistance' },
        ]
      : [
          { value: '+2', label: 'سنوات خبرة' },
          { value: 'حتى 99.9%', label: 'معدل الموافقة*' },
          { value: `${docCount}+`, label: `مستندات ${label}` },
          { value: '24/7', label: 'دعم متواصل' },
        ],
    features: {
      ...sections.features,
      sectionSubtitle: lang === 'en'
        ? `We simplify ${label} travel document applications with expert guidance, real-time validation, and 24/7 human support—so you can focus on planning your trip, not paperwork.`
        : `نبسّط طلبات مستندات سفر ${label} بإرشاد خبير وتحقق فوري ودعم بشري 24/7 — لتتفرغ لتخطيط رحلتك.`,
      cardTitle: lang === 'en' ? `The smart way to apply for your ${label} travel documents` : `الطريقة الذكية لتقديم مستندات ${label}`,
      cardSubtitle: lang === 'en'
        ? 'Skip confusing government portals. Apply online with guided forms, real-time validation, and expert review—all in one place.'
        : 'تجاوز المواقع الحكومية المعقدة. قدّم عبر الإنترنت مع نماذج إرشادية وتحقق فوري ومراجعة خبيرة — في مكان واحد.',
      items: lang === 'en'
        ? [
            { icon: 'list', title: 'Step-by-step guided process', description: `Clear instructions tailored to your ${label} travel document requirements, visa type, and destination.` },
            { icon: 'headphones', title: '24/7 expert human support', description: 'Real agents available via live chat and email—around the clock, every day of the year.' },
            { icon: 'shield', title: 'Bank-level data encryption', description: '256-bit encryption and strict privacy controls safeguard every piece of your information.' },
            { icon: 'users', title: 'Effortless group applications', description: 'Add travel companions in one streamlined flow with automatic detail prefilling.' },
            { icon: 'check', title: 'Live validation and review', description: `Instant error detection and a pre-submission review catch mistakes before they delay your ${label} application.` },
          ]
        : sections.features.items,
    },
    steps: {
      ...sections.steps,
      sectionSubtitle: lang === 'en'
        ? `Our streamlined process takes you from choosing your ${label} document to receiving approved travel documents—all online, in just minutes.`
        : `عملية مبسّطة من اختيار مستند ${label} إلى استلام المستندات المعتمدة — عبر الإنترنت في دقائق.`,
      items: lang === 'en'
        ? [
            { number: '01', title: 'Select your travel document', description: `Pick the ${label} travel document you need—we show you requirements, fees, and estimated processing time right away.` },
            { number: '02', title: 'Complete your application online', description: `Fill in the guided form in minutes. Real-time validation catches errors instantly, so nothing holds up your ${label} application.` },
            { number: '03', title: `Get approved and travel to ${label}`, description: `Our experts review and process everything. Your approved ${label} documents land in your inbox—ready for your trip.` },
          ]
        : sections.steps.items,
      ctaTitle: lang === 'en' ? `Start your stress-free ${label} application today` : `ابدأ طلب ${label} بدون تعقيد اليوم`,
      ctaSubtitle: lang === 'en'
        ? `Join travelers worldwide who simplified their ${label} travel document applications with our expert-guided process.`
        : `انضم للمسافرين الذين بسّطوا طلبات مستندات ${label}.`,
      ctaButton: lang === 'en' ? `Get your ${label} travel documents` : `احصل على مستندات ${label}`,
    },
    cta: {
      ...sections.cta,
      title: lang === 'en' ? `Your ${label} travel documents, just a few clicks away` : `مستندات ${label} — بضغطات قليلة`,
      subtitle: lang === 'en'
        ? 'Skip confusing government portals. Apply online with expert guidance, real-time validation, and fast processing.'
        : 'تجاوز المواقع الحكومية. قدّم عبر الإنترنت مع إرشاد خبير وتحقق فوري ومعالجة سريعة.',
      button: lang === 'en' ? 'Start your application' : 'ابدأ طلبك',
    },
    chat: {
      ...sections.chat,
      greeting: lang === 'en'
        ? `Hello! How can we help with your ${label} travel document application?`
        : `مرحباً! كيف نساعدك في طلب مستندات ${label}؟`,
    },
    pricing: genericPricing(lang, dest, dest.services[0]),
    testimonials: {
      ...sharedTestimonials[lang],
      sectionSubtitle: lang === 'en' ? `Real experiences from travelers who trusted us with their ${label} travel document applications.` : `تجارب حقيقية من مسافرين وثقوا بنا في طلبات مستندات ${label}.`,
    },
    faq: {
      ...sharedFaq[lang],
      sectionSubtitle: lang === 'en'
        ? `Find answers about ${label} travel document applications, processing times, costs, and how we keep your information secure throughout the process.`
        : `إجابات عن طلبات مستندات ${label} وأوقات المعالجة والرسوم وكيفية حماية معلوماتك.`,
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
    metaTitle: lang === 'en' ? `Stress-free ${doc} application — DacGateway` : `تقديم ${doc} — DacGateway`,
    metaDescription: service.description[lang],
    nav: {
      ...country.nav,
      howToApply: lang === 'en' ? 'How to apply' : 'كيفية التقديم',
      howItWorks: lang === 'en' ? 'How it works' : 'كيف يعمل',
    },
    hero: {
      title: lang === 'en' ? `Stress-free ${doc} application` : `تقديم ${doc} بدون تعقيد`,
      badgeLine1: label,
      badgeLine2: doc,
      subtitle: lang === 'en'
        ? `Smart, fast, and reliable ${doc} application service.`
        : `خدمة تقديم ${doc} ذكية وسريعة وموثوقة.`,
      trustItems: lang === 'en'
        ? ['Expert Review', '24/7 Support', 'Rated on Trustpilot', 'Secure Process']
        : ['مراجعة خبيرة', 'دعم 24/7', 'تقييم على Trustpilot', 'معالجة آمنة'],
      cta: lang === 'en' ? `Apply for your ${doc}` : `قدّم ${doc}`,
      disclaimer: country.hero.disclaimer,
      officialSite: country.hero.officialSite,
    },
    about: {
      title: lang === 'en' ? `About the ${doc}` : `عن ${doc}`,
      subtitle: service.description[lang],
      glanceTitle: lang === 'en' ? `${doc} at a glance` : `نظرة سريعة على ${doc}`,
      glanceSubtitle: lang === 'en' ? 'Everything you need to know before applying' : 'كل ما تحتاج معرفته قبل التقديم',
      requirementsTitle: lang === 'en' ? "What you'll need to apply" : 'ما ستحتاجه للتقديم',
      requirementsDisclaimer: lang === 'en' ? 'Private company — not affiliated with any government agency.' : 'شركة خاصة — غير تابعة لأي جهة حكومية.',
      applyCta: lang === 'en' ? 'Apply now online' : 'قدّم الآن عبر الإنترنت',
    },
    stats: lang === 'en'
      ? [
          { value: 'Instant', label: 'Processing Time' },
          { value: 'Up to 99.9%', label: 'Approval rate*' },
          { value: '30d', label: 'Valid for' },
          { value: '24/7', label: 'Assistance' },
        ]
      : [
          { value: 'فوري', label: 'وقت المعالجة' },
          { value: 'حتى 99.9%', label: 'معدل الموافقة*' },
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
          { icon: 'clock', title: 'Processing time', highlight: 'Instant', text: `Your ${doc} confirmation and QR code are generated immediately after submission.` },
          { icon: 'calendar', title: 'Validity', highlight: 'Until arrival', text: `Valid until you arrive in ${label} for the date on your document.` },
          { icon: 'hourglass', title: 'Stay duration', highlight: 'Visa dependent', text: 'Determined by your visa status and immigration officer.' },
          { icon: 'refresh', title: 'Entries', highlight: 'Single entry', text: `One ${doc} per trip. A new submission is required for each visit to ${label}.` },
          { icon: 'globe', title: 'How to apply', highlight: '100% online', text: `Complete the form from any device before your flight to ${label}.` },
          { icon: 'qr', title: 'On arrival', highlight: 'Show QR code', text: 'Present from your device or email at immigration. Printing optional as backup.' },
        ]
      : [
          { icon: 'clock', title: 'وقت المعالجة', highlight: 'فوري', text: `تأكيد ${doc} ورمز QR يُنشآن مباشرة بعد الإرسال.` },
          { icon: 'calendar', title: 'الصلاحية', highlight: 'حتى الوصول', text: `صالح حتى وصولك إلى ${label} في التاريخ المحدد.` },
          { icon: 'hourglass', title: 'مدة الإقامة', highlight: 'حسب التأشيرة', text: 'تُحدد حسب حالة التأشيرة وقرار الهجرة.' },
          { icon: 'refresh', title: 'الدخول', highlight: 'دخول واحد', text: `${doc} واحد لكل رحلة. طلب جديد مطلوب لكل زيارة إلى ${label}.` },
          { icon: 'globe', title: 'كيفية التقديم', highlight: '100% عبر الإنترنت', text: `أكمل النموذج من أي جهاز قبل رحلتك إلى ${label}.` },
          { icon: 'qr', title: 'عند الوصول', highlight: 'اعرض رمز QR', text: 'من هاتفك أو بريدك عند الهجرة. الطباعة اختيارية.' },
        ],
    requirements: lang === 'en'
      ? ['Passport details', 'Travel details including arrival flight and date', `Accommodation address in ${label}`, 'Purpose of travel', `Valid email address to receive your ${doc}`]
      : ['تفاصيل جواز السفر', 'تفاصيل السفر بما فيها رحلة الوصول', `عنوان الإقامة في ${label}`, 'غرض السفر', `بريد إلكتروني صالح لاستلام ${doc}`],
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
