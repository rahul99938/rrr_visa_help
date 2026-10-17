import { CountryVisaInfo, TrackingRecord, Testimonial, EmbassyNotice } from '../types/visa';

export const COUNTRIES: CountryVisaInfo[] = [
  {
    id: 'schengen',
    nameEn: 'Schengen / Europe (France, Italy, Germany, etc.)',
    nameBn: 'শেনজেন / ইউরোপ (ফ্রান্স, ইতালি, জার্মানি ইত্যাদি)',
    region: 'europe',
    flag: '🇪🇺',
    popularTypes: ['tourist', 'business', 'student'],
    processingTime: '15 - 30 working days',
    processingTimeBn: '১৫ - ৩০ কার্যদিবস',
    embassyFee: '€90 (~৳11,800)',
    embassyFeeBn: '€৯০ (~১১,৮০০ টাকা)',
    serviceFeeBDT: 15000,
    successRate: '96.2%',
    interviewRequired: true,
    image: '/src/assets/images/destination_schengen_europe_1792239547765.jpg',
    highlightTextEn: 'Access 29 European countries with a single visa. Complete VFS appointment slot tracking and file audit.',
    highlightTextBn: 'একটি ভিসায় ২৯টি ইউরোপীয় দেশে প্রবেশ। ভিএফএস স্লট বুকিং ও নিখুঁত ফাইল প্রসেসিং।',
    documents: [
      {
        category: 'Personal Identification',
        categoryBn: 'ব্যক্তিগত পরিচিতি নথি',
        items: [
          { nameEn: 'Valid Machine Readable / e-Passport (min. 6 months validity)', nameBn: 'কমপক্ষে ৬ মাস মেয়াদী বৈধ পাসপোর্ট', required: true },
          { nameEn: 'Recent 35x45mm white background photos (80% face view)', nameBn: 'সাম্প্রতিক ৩৫x৪৫ মিমি সাদা ব্যাকগ্রাউন্ড ছবি', required: true },
          { nameEn: 'National ID card (NID) & Birth Certificate in English translation', nameBn: 'জাতীয় পরিচয়পত্র ও ইংরেজি জন্মনিবন্ধন', required: true }
        ]
      },
      {
        category: 'Financial Capability',
        categoryBn: 'আর্থিক সক্ষমতার প্রমাণ',
        items: [
          { nameEn: 'Last 6 months updated personal bank statement with stamp', nameBn: 'বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট (সিল ও সই সহ)', required: true },
          { nameEn: 'Bank Solvency Certificate from bank branch manager', nameBn: 'ব্যাংক সলভেন্সি সার্টিফিকেট', required: true },
          { nameEn: 'E-TIN certificate & last 3 years income tax return acknowledgment', nameBn: 'ই-টিন সার্টিফিকেট ও বিগত ৩ বছরের ট্যাক্স রিটার্ন', required: true }
        ]
      },
      {
        category: 'Occupation & Ties to Bangladesh',
        categoryBn: 'পেশাগত তথ্য ও দেশে ফেরার নিশ্চয়তা',
        items: [
          { nameEn: 'No Objection Certificate (NOC) from employer or Trade License if business', nameBn: 'চাকুরির এনওসি (NOC) অথবা ব্যবসার ক্ষেত্রে ট্রেড লাইসেন্স', required: true },
          { nameEn: 'Salary slips (last 3 months) or Memorandum & MOA', nameBn: 'বেতনের পে-স্লিপ বা কোম্পানির কাগজপত্র', required: true },
          { nameEn: 'Property valuation & asset valuation report (optional but recommended)', nameBn: 'সম্পত্তি মূল্যায়ন রিপোর্ট (ভিসা নিশ্চিত করতে সহায়ক)', required: false }
        ]
      },
      {
        category: 'Travel & Accommodation Logistics',
        categoryBn: 'ভ্রমণ ও থাকার ব্যবস্থা',
        items: [
          { nameEn: 'Confirmed flight itinerary & verified hotel reservation', nameBn: 'কনফার্মড ফ্লাইট রুট ও হোটেল রিজার্ভেশন', required: true },
          { nameEn: 'Schengen travel medical insurance (coverage min €30,000)', nameBn: 'শেনজেন মেডিকেল ইন্স্যুরেন্স (€৩০,০০০ কভারেজ)', required: true },
          { nameEn: 'Detailed day-by-day travel plan / Cover letter', nameBn: 'কভার লেটার ও বিস্তারিত ভ্রমণ পরিকল্পনা', required: true }
        ]
      }
    ]
  },
  {
    id: 'usa',
    nameEn: 'United States of America (USA)',
    nameBn: 'যুক্তরাষ্ট্র (আমেরিকা)',
    region: 'north-america',
    flag: '🇺🇸',
    popularTypes: ['tourist', 'student', 'business'],
    processingTime: 'Varies by embassy slot (File ready in 5 days)',
    processingTimeBn: 'এমব্যাসি স্লট অনুযায়ী (ফাইল প্রস্তুত ৫ দিনে)',
    embassyFee: '$185 (~৳22,500 MRV Fee)',
    embassyFeeBn: '$১৮৫ (~২২,৫০০ টাকা MRV ফি)',
    serviceFeeBDT: 18000,
    successRate: '94.8%',
    interviewRequired: true,
    image: '/src/assets/images/destination_usa_travel_1792239547156.jpg',
    highlightTextEn: 'B1/B2 Visitor & F-1 Student visas with personalized DS-160 filling, expedited CGI appointment booking, and mock interview coaching.',
    highlightTextBn: 'বি১/বি২ ট্যুরিস্ট ও এফ-১ স্টুডেন্ট ভিসা: নিখুঁত ডিএস-১৬০ পূরণ, ইন্টারভিউ স্লট ও মক ইন্টারভিউ প্রস্তুতি।',
    documents: [
      {
        category: 'Mandatory Visa Application Documents',
        categoryBn: 'বাধ্যতামূলক ভিসার কাগজপত্র',
        items: [
          { nameEn: 'Passport with at least 6 months validity past intended stay', nameBn: 'কমপক্ষে ৬ মাসের মেয়াদ সহ বৈধ পাসপোর্ট', required: true },
          { nameEn: 'DS-160 online confirmation page with barcode', nameBn: 'ডিএস-১৬০ কনফার্মেশন পেইজ বারকোড সহ', required: true },
          { nameEn: 'MRV fee payment receipt copy', nameBn: 'ইউএস এমব্যাসি ফি জমার রশিদ', required: true },
          { nameEn: 'Interview appointment confirmation letter', nameBn: 'ইন্টারভিউ অ্যাপয়েন্টমেন্ট লেটার', required: true }
        ]
      },
      {
        category: 'Financial & Social Ties',
        categoryBn: 'আর্থিক ও সামাজিক সক্ষমতা',
        items: [
          { nameEn: 'Bank statements of past 6 months and proof of assets', nameBn: 'বিগত ৬ মাসের ব্যাংক হিসাব ও সম্পদের দলিল', required: true },
          { nameEn: 'Proof of employment / active business registration in Bangladesh', nameBn: 'চাকরি বা ব্যবসায়ের সরকারি প্রমাণপত্র', required: true },
          { nameEn: 'Income Tax Return certificates', nameBn: 'আয়কর রিটার্ন দাখিলের কপি', required: true }
        ]
      },
      {
        category: 'Category Specific Documents',
        categoryBn: 'ভিসা ক্যাটাগরি ভিত্তিক কাগজপত্র',
        items: [
          { nameEn: 'For Students: Form I-20 and SEVIS fee receipt ($350)', nameBn: 'ছাত্রদের জন্য: আই-২০ ও সেভিস ফি রিসিট', required: false, note: 'Only for F1 students' },
          { nameEn: 'For Tourists: Purpose of visit letter, host invitation letter (if any)', nameBn: 'ভ্রমণকারীদের জন্য: ভ্রমণের উদ্দেশ্য পত্র ও ইনভাইটেশন', required: false }
        ]
      }
    ]
  },
  {
    id: 'uae',
    nameEn: 'United Arab Emirates / Dubai',
    nameBn: 'সংযুক্ত আরব আমিরাত (দুবাই)',
    region: 'middle-east',
    flag: '🇦🇪',
    popularTypes: ['tourist', 'business', 'work'],
    processingTime: '2 - 4 working days (Express 24h available)',
    processingTimeBn: '২ - ৪ কার্যদিবস (২৪ ঘণ্টার এক্সপ্রেস সুবিধা)',
    embassyFee: '30-day: ৳10,500 | 60-day: ৳16,500',
    embassyFeeBn: '৩০ দিন: ১০,৫০০ টাকা | ৬০ দিন: ১৬,৫০০ টাকা',
    serviceFeeBDT: 4000,
    successRate: '99.1%',
    interviewRequired: false,
    image: '/src/assets/images/destination_dubai_uae_1792239547632.jpg',
    highlightTextEn: '100% online eVisa processing for 30 & 60 days tourist, freelance residence permit, and VIP express stamping.',
    highlightTextBn: '৩০ ও ৬০ দিনের দুবাই ট্যুরিস্ট ই-ভিসা, ফ্রিল্যান্স ও বিজনেস ভিসা প্রসেসিং। কোনো ইন্টারভিউ নেই।',
    documents: [
      {
        category: 'Required Documents',
        categoryBn: 'প্রয়োজনীয় কাগজপত্র',
        items: [
          { nameEn: 'Clear passport color scan copy (first 2 bio-data pages)', nameBn: 'পাসপোর্টের পরিষ্কার রঙিন স্ক্যান কপি', required: true },
          { nameEn: 'Studio passport size photograph (white background)', nameBn: 'সাদা ব্যাকগ্রাউন্ডের পাসপোর্ট সাইজ ছবি', required: true },
          { nameEn: 'National ID / Birth certificate scan copy', nameBn: 'জাতীয় পরিচয়পত্র অথবা জন্মনিবন্ধন স্ক্যান', required: true },
          { nameEn: 'Return air ticket reservation and hotel stay voucher', nameBn: 'রিটার্ন এয়ার টিকেট ও হোটেল ভাউচার', required: true }
        ]
      }
    ]
  },
  {
    id: 'uk',
    nameEn: 'United Kingdom (UK)',
    nameBn: 'যুক্তরাজ্য (ইউকে)',
    region: 'europe',
    flag: '🇬🇧',
    popularTypes: ['tourist', 'student', 'work'],
    processingTime: '15 working days (Priority 5 days available)',
    processingTimeBn: '১৫ কার্যদিবস (প্রায়োরিটি ৫ দিনে সম্ভব)',
    embassyFee: 'Standard Visitor: £115 (~৳17,800)',
    embassyFeeBn: 'স্ট্যান্ডার্ড ভিজিটর: £১১৫ (~১৭,৮০০ টাকা)',
    serviceFeeBDT: 15000,
    successRate: '95.6%',
    interviewRequired: false,
    highlightTextEn: 'Standard Visitor, Tier 4 / Student Route, and Skilled Worker processing with comprehensive financial justification.',
    highlightTextBn: 'যুক্তরাজ্যের ভিজিটর ও স্টুডেন্ট ভিসা। নিখুঁত অর্থনৈতিক ব্যাখ্যা ও ভিএফএস প্রসেসিং।',
    documents: [
      {
        category: 'Essential Documentation',
        categoryBn: 'মূল কাগজপত্র',
        items: [
          { nameEn: 'Valid passport with at least 1 blank page on both sides', nameBn: 'উভয় পাতায় ফাঁকা পেজ সহ বৈধ পাসপোর্ট', required: true },
          { nameEn: 'Online UK Visa application form & VFS receipt', nameBn: 'ইউকে ভিসা অনলাইন আবেদনপত্র ও ভিএফএস রশিদ', required: true },
          { nameEn: '6-month bank statement proving legitimate funds', nameBn: 'বিগত ৬ মাসের ভেরিফাইড ব্যাংক স্টেটমেন্ট', required: true },
          { nameEn: 'Employment letter, pay slips, and approved leave statement', nameBn: 'চাকুরির প্রমাণপত্র, পে-স্লিপ ও অনুমোদিত ছুটির পত্র', required: true }
        ]
      }
    ]
  },
  {
    id: 'canada',
    nameEn: 'Canada',
    nameBn: 'কানাডা',
    region: 'north-america',
    flag: '🇨🇦',
    popularTypes: ['tourist', 'student', 'work'],
    processingTime: '30 - 60 working days',
    processingTimeBn: '৩০ - ৬০ কার্যদিবস',
    embassyFee: 'CAD $100 + $85 Biometrics (~৳16,500)',
    embassyFeeBn: 'CAD $১৮৫ বায়োমেট্রিক সহ (~১৬,৫০০ টাকা)',
    serviceFeeBDT: 16000,
    successRate: '93.5%',
    interviewRequired: false,
    highlightTextEn: 'Visitor Visas (V-1), Study Permits, and Super Visas for parents with strong home ties documentation and custom SOP.',
    highlightTextBn: 'কানাডা ভিজিটর ও স্টাডি পারমিট ভিসা। শক্তিশালী এসওপি (SOP) ও পারিবারিক সম্পর্কের নিখুঁত উপস্থাপন।',
    documents: [
      {
        category: 'Mandatory Requirements',
        categoryBn: 'বাধ্যতামূলক কাগজপত্র',
        items: [
          { nameEn: 'Valid Passport & all previous travel visas', nameBn: 'বৈধ পাসপোর্ট ও পূর্বের ভ্রমণ ভিসার কপি', required: true },
          { nameEn: 'Family Information Form (IMM 5645)', nameBn: 'পারিবারিক তথ্যাদি ফরম (IMM 5645)', required: true },
          { nameEn: 'Bank statement of past 6 months showing sufficient liquid funds', nameBn: 'পর্যাপ্ত তহবিল প্রদর্শনকারী ৬ মাসের ব্যাংক হিসাব', required: true },
          { nameEn: 'Statement of Purpose (SOP) explaining purpose of travel & return ties', nameBn: 'দেশে ফেরার সুনির্দিষ্ট কারণ সম্বলিত এসওপি (SOP)', required: true }
        ]
      }
    ]
  },
  {
    id: 'saudi',
    nameEn: 'Saudi Arabia (KSA)',
    nameBn: 'সৌদি আরব',
    region: 'middle-east',
    flag: '🇸🇦',
    popularTypes: ['tourist', 'work', 'family'],
    processingTime: '1 - 3 working days',
    processingTimeBn: '১ - ৩ কার্যদিবস',
    embassyFee: 'Tourist eVisa / Umrah: ~৳14,500 with insurance',
    embassyFeeBn: 'ট্যুরিস্ট ই-ভিসা / ওমরাহ: ~১৪,৫০০ টাকা (বীমা সহ)',
    serviceFeeBDT: 3500,
    successRate: '99.5%',
    interviewRequired: false,
    highlightTextEn: 'Instant Tourist eVisa, Umrah pilgrimage package visa, and Tasheer biometric assistance.',
    highlightTextBn: 'সৌদি ট্যুরিস্ট ই-ভিসা ও ওমরাহ ভিসা। তাশীর বায়োমেট্রিক অ্যাপয়েন্টমেন্ট ও দ্রুত প্রসেসিং।',
    documents: [
      {
        category: 'Application File',
        categoryBn: 'প্রয়োজনীয় কাগজপত্র',
        items: [
          { nameEn: 'Original Passport (valid min 6 months)', nameBn: 'মূল পাসপোর্ট (মেয়াদ কমপক্ষে ৬ মাস)', required: true },
          { nameEn: 'Passport size photo with white background', nameBn: 'সাদা ব্যাকগ্রাউন্ড ছবি', required: true },
          { nameEn: 'National ID card copy', nameBn: 'জাতীয় পরিচয়পত্র কপি', required: true }
        ]
      }
    ]
  },
  {
    id: 'malaysia',
    nameEn: 'Malaysia',
    nameBn: 'মালয়েশিয়া',
    region: 'asia-pacific',
    flag: '🇲🇾',
    popularTypes: ['tourist', 'student', 'business'],
    processingTime: '3 - 5 working days',
    processingTimeBn: '৩ - ৫ কার্যদিবস',
    embassyFee: 'eVisa: ~৳5,800',
    embassyFeeBn: 'ই-ভিসা: ~৫,৮০০ টাকা',
    serviceFeeBDT: 3000,
    successRate: '98.7%',
    interviewRequired: false,
    highlightTextEn: 'Direct single & multiple entry eVisa, EMGS student pass processing, and family holiday packages.',
    highlightTextBn: 'সিঙ্গেল ও মাল্টিপল এন্ট্রি ই-ভিসা এবং ইএমজিএস স্টুডেন্ট ভিসা দ্রুত প্রসেসিং।',
    documents: [
      {
        category: 'Submission Requirements',
        categoryBn: 'জমা দেওয়ার কাগজপত্র',
        items: [
          { nameEn: 'Passport color scan copy', nameBn: 'পাসপোর্টের রঙিন স্ক্যান কপি', required: true },
          { nameEn: 'White background 35x50mm photo', nameBn: 'সাদা ব্যাকগ্রাউন্ড ছবি ৩৫x৫০ মিমি', required: true },
          { nameEn: 'Bank statement of past 6 months (min. ৳1,00,000 balance)', nameBn: '৬ মাসের ব্যাংক স্টেটমেন্ট (ন্যূনতম ১ লাখ টাকা ব্যালেন্স)', required: true }
        ]
      }
    ]
  },
  {
    id: 'japan',
    nameEn: 'Japan',
    nameBn: 'জাপান',
    region: 'asia-pacific',
    flag: '🇯🇵',
    popularTypes: ['tourist', 'student', 'business'],
    processingTime: '7 - 10 working days',
    processingTimeBn: '৭ - ১০ কার্যদিবস',
    embassyFee: 'Single Entry: ৳2,700 (Free if exempt)',
    embassyFeeBn: 'সিঙ্গেল এন্ট্রি: ২,৭০০ টাকা',
    serviceFeeBDT: 8000,
    successRate: '95.1%',
    interviewRequired: false,
    highlightTextEn: 'Official Embassy of Japan Dhaka checklist verification, detailed daily itinerary, and guarantee document assessment.',
    highlightTextBn: 'জাপান দূতাবাসের নির্ধারিত ফরম, দৈনিক ভ্রমণ রুট এবং গ্যারান্টার ডকুমেন্ট যাচাই।',
    documents: [
      {
        category: 'Japan Embassy Guidelines',
        categoryBn: 'জাপান দূতাবাসের নিয়মাবলী',
        items: [
          { nameEn: 'Passport valid for minimum 6 months', nameBn: 'কমপক্ষে ৬ মাসের মেয়াদ সহ পাসপোর্ট', required: true },
          { nameEn: 'Visa application form with 45x45mm photo taken within 6 months', nameBn: '৪৫x৪৫ মিমি ছবি সহ জাপান ভিসা ফরম', required: true },
          { nameEn: 'Daily Schedule / Itinerary in Japan Form', nameBn: 'জাপানে প্রতিদিনের ভ্রমণ পরিকল্পনা ফরম', required: true },
          { nameEn: 'Bank statement & Income Tax certificate', nameBn: 'ব্যাংক হিসাব ও আয়কর সনদ', required: true }
        ]
      }
    ]
  }
];

export const MOCK_TRACKING_DATA: Record<string, TrackingRecord> = {
  'RRR-8842-BD': {
    trackingId: 'RRR-8842-BD',
    applicantName: 'Md. Zahid Hasan',
    destinationEn: 'Italy / Schengen Area',
    destinationBn: 'ইতালি / শেনজেন এলাকা',
    categoryEn: 'Tourist Visa (Type C)',
    categoryBn: 'ট্যুরিস্ট ভিসা (টাইপ সি)',
    submissionDate: '2026-10-02',
    estimatedCompletion: '2026-10-24',
    statusEn: 'Biometrics Scheduled at VFS Dhaka',
    statusBn: 'ভিএফএস ঢাকায় বায়োমেট্রিক নির্ধারিত',
    assignedOfficer: 'Rezaul Karim (Lead Consultant)',
    embassyRefNo: 'ITA-DHK-2026-90412',
    steps: [
      {
        titleEn: 'File Ingestion & Initial Audit',
        titleBn: 'ফাইল গ্রহণ ও প্রাথমিক যাচাই',
        descriptionEn: 'Passport, bank statements, and tax files audited with zero defects.',
        descriptionBn: 'পাসপোর্ট, ব্যাংক স্টেটমেন্ট ও ট্যাক্স ফাইল সফলভাবে যাচাইকৃত।',
        date: '2026-10-02',
        completed: true
      },
      {
        titleEn: 'Translation & Notarization',
        titleBn: 'অনুবাদ ও নোটারি সম্পন্ন',
        descriptionEn: 'Bangla documents translated to English/Italian and legally attested.',
        descriptionBn: 'কাগজপত্র ইংরেজি ও ইতালীয় ভাষায় অনূদিত ও নোটারি সম্পন্ন।',
        date: '2026-10-06',
        completed: true
      },
      {
        titleEn: 'VFS Appointment Slot Secured',
        titleBn: 'ভিএফএস অ্যাপয়েন্টমেন্ট বুকিং',
        descriptionEn: 'Slot booked for Italian Embassy Visa Application Centre, Gulshan-1.',
        descriptionBn: 'গুলশান ভিএফএস সেন্টারে বায়োমেট্রিক স্লট কনফার্ম করা হয়েছে।',
        date: '2026-10-12',
        completed: true,
        current: true
      },
      {
        titleEn: 'Biometric & Document Submission',
        titleBn: 'বায়োমেট্রিক ও ফাইল জমাদান',
        descriptionEn: 'Scheduled attendance with dedicated RRR Visa Help field officer escort.',
        descriptionBn: 'আরআরআর ভিসা হেল্প প্রতিনিধির উপস্থিতিতে ফাইল জমা প্রদান।',
        date: '2026-10-20',
        completed: false
      },
      {
        titleEn: 'Passport Ready for Collection',
        titleBn: 'পাসপোর্ট ও ভিসা সংগ্রহের জন্য প্রস্তুত',
        descriptionEn: 'Passport stamped and dispatched for secure hand-to-hand delivery.',
        descriptionBn: 'ভিসা স্ট্যাম্পিং শেষে নিরাপদ ডেলিভারির জন্য প্রস্তুত।',
        date: 'Pending',
        completed: false
      }
    ]
  },
  'RRR-9201-US': {
    trackingId: 'RRR-9201-US',
    applicantName: 'Fatima Tuz Zohra',
    destinationEn: 'United States of America',
    destinationBn: 'যুক্তরাষ্ট্র (আমেরিকা)',
    categoryEn: 'F-1 Academic Student Visa',
    categoryBn: 'এফ-১ উচ্চশিক্ষা স্টুডেন্ট ভিসা',
    submissionDate: '2026-09-18',
    estimatedCompletion: '2026-10-22',
    statusEn: 'Interview Cleared - Visa Under Stamping',
    statusBn: 'ইন্টারভিউ সফল - ভিসা স্ট্যাম্পিং প্রক্রিয়ায়',
    assignedOfficer: 'Sarah Chowdhury (US Specialist)',
    embassyRefNo: 'USA-DHK-F1-0819',
    steps: [
      {
        titleEn: 'I-20 Review & SEVIS Payment',
        titleBn: 'আই-২০ যাচাই ও সেভিস ফি পরিশোধ',
        descriptionEn: 'University offer accepted, I-20 verified, SEVIS I-901 fee processed.',
        descriptionBn: 'বিশ্ববিদ্যালয় অফার ও আই-২০ ভেরিফাই করে সেভিস ফি পরিশোধ।',
        date: '2026-09-18',
        completed: true
      },
      {
        titleEn: 'DS-160 Application Finalized',
        titleBn: 'ডিএস-১৬০ আবেদন সম্পন্ন',
        descriptionEn: 'Consular file submitted with accurate academic and sponsor details.',
        descriptionBn: 'সম্পূর্ণ একাডেমিক ও স্পন্সর তথ্যাদি সহ ডিএস-১৬০ সাবমিট।',
        date: '2026-09-22',
        completed: true
      },
      {
        titleEn: 'Mock Interview Coaching',
        titleBn: 'মক ইন্টারভিউ প্রস্তুতি সেশন',
        descriptionEn: 'Two full round mock interviews completed with former visa advisor.',
        descriptionBn: 'বিশেষজ্ঞ ট্রেইনারের সাথে দুই পর্বের সফল মক ইন্টারভিউ।',
        date: '2026-10-04',
        completed: true
      },
      {
        titleEn: 'Embassy Interview Cleared',
        titleBn: 'দূতাবাসে ইন্টারভিউ সফল',
        descriptionEn: 'Consular officer approved visa at Madani Avenue Embassy.',
        descriptionBn: 'মাদানী এভিনিউস্থ মার্কিন দূতাবাসে সফল ইন্টারভিউ ও ভিসা অনুমোদন।',
        date: '2026-10-15',
        completed: true,
        current: true
      },
      {
        titleEn: 'Passport Stamped & Dispatch',
        titleBn: 'ভিসা সিল ও পাসপোর্ট ডেলিভারি',
        descriptionEn: 'Ready for collection at RRR Visa Help office.',
        descriptionBn: 'আরআরআর ভিসা হেল্প হেড অফিসে হস্তান্তরের জন্য প্রস্তুত।',
        date: '2026-10-22',
        completed: false
      }
    ]
  },
  'RRR-4318-EU': {
    trackingId: 'RRR-4318-EU',
    applicantName: 'Tariqul Islam',
    destinationEn: 'United Kingdom',
    destinationBn: 'যুক্তরাজ্য (ইউকে)',
    categoryEn: 'Standard Visitor Visa (Family Visit)',
    categoryBn: 'স্ট্যান্ডার্ড ভিজিটর ভিসা (পারিবারিক)',
    submissionDate: '2026-10-08',
    estimatedCompletion: '2026-10-28',
    statusEn: 'File Under Review by Decision Making Centre',
    statusBn: 'ইউকে ডিসিশন মেকিং সেন্টারে ফাইল বিবেচনাধীন',
    assignedOfficer: 'Monir Hossain (Senior Counselor)',
    embassyRefNo: 'UKVI-DHK-4821',
    steps: [
      {
        titleEn: 'Documentation & Sponsor Vetting',
        titleBn: 'ডকুমেন্ট ও স্পন্সর ভেরিফিকেশন',
        descriptionEn: 'UK sponsor letter and Bangladeshi income ties verified.',
        descriptionBn: 'ইউকে থেকে পাঠানো আমন্ত্রণপত্র ও দেশীয় আয়ের উৎস যাচাই।',
        date: '2026-10-08',
        completed: true
      },
      {
        titleEn: 'Biometric Enrolment at VFS',
        titleBn: 'ভিএফএস-এ বায়োমেট্রিক প্রদান',
        descriptionEn: 'Fingerprints and facial photo recorded at Delta Life Tower, Gulshan.',
        descriptionBn: 'গুলশান ডেল্টা লাইফ টাওয়ারে বায়োমেট্রিক সম্পন্ন।',
        date: '2026-10-14',
        completed: true,
        current: true
      },
      {
        titleEn: 'Consular Review',
        titleBn: 'ভিসা অফিসারের পর্যালোচনা',
        descriptionEn: 'Application currently evaluated by UKVI caseworkers.',
        descriptionBn: 'ইউকেভিআই কেসওয়ার্কারদের দ্বারা ফাইল মূল্যায়ন চলছে।',
        date: 'In Progress',
        completed: false
      },
      {
        titleEn: 'Decision & Collection Notice',
        titleBn: 'সিদ্ধান্ত ও পাসপোর্ট ফেরত',
        descriptionEn: 'Applicant will receive SMS & phone call immediately upon arrival.',
        descriptionBn: 'পাসপোর্ট পৌঁছামাত্র তাৎক্ষণিক এসএমএস ও কল দেওয়া হবে।',
        date: 'Estimated Oct 28',
        completed: false
      }
    ]
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    nameEn: 'Dr. Mahfuzur Rahman',
    nameBn: 'ডা. মাহফুজুর রহমান',
    locationEn: 'Dhanmondi, Dhaka',
    locationBn: 'ধানমন্ডি, ঢাকা',
    visaTypeEn: 'Schengen Business & Conference Visa (Germany)',
    visaTypeBn: 'জার্মানি শেনজেন বিজনেস ভিসা',
    destinationEn: 'Germany',
    destinationBn: 'জার্মানি',
    grantedDate: 'September 2026',
    quoteEn: 'I was rejected once before when applying myself due to minor financial wording. RRR Visa Help completely restructured my cover letter and tax file. Got a 2-year multiple entry Schengen visa in just 18 days!',
    quoteBn: 'আগে নিজে আবেদন করে একবার রিজেকশন পেয়েছিলাম। আরআরআর ভিসা হেল্প আমার ফাইল নতুন করে নির্ভুলভাবে সাজিয়ে দেয়। মাত্র ১৮ দিনেই ২ বছরের মাল্টিপল এন্ট্রি শেনজেন ভিসা পেলাম!',
    rating: 5
  },
  {
    id: '2',
    nameEn: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    locationEn: 'Chittagong',
    locationBn: 'চট্টগ্রাম',
    visaTypeEn: 'USA F-1 Student Visa (University of Texas)',
    visaTypeBn: 'আমেরিকা এফ-১ স্টুডেন্ট ভিসা (ইউটি)',
    destinationEn: 'United States',
    destinationBn: 'যুক্তরাষ্ট্র',
    grantedDate: 'August 2026',
    quoteEn: 'The mock interview coaching given by RRR Visa Help was the turning point. The visa officer at Dhaka embassy asked the exact three questions we practiced. Highly recommend their US desk.',
    quoteBn: 'আরআরআর ভিসা হেল্পের মক ইন্টারভিউ প্রস্তুতি ছিল অসাধারণ। মার্কিন দূতাবাসের ভিসা অফিসার হুবহু আমাদের প্র্যাকটিস করা প্রশ্নগুলোই করেছিলেন। তাদের গাইডেন্স সত্যিই কার্যকর।',
    rating: 5
  },
  {
    id: '3',
    nameEn: 'Kamrul Ahsan & Family',
    nameBn: 'কামরুল আহসান ও পরিবার',
    locationEn: 'Uttara, Dhaka',
    locationBn: 'উত্তরা, ঢাকা',
    visaTypeEn: 'Dubai 60-Day Multiple Entry Tourist Visa',
    visaTypeBn: 'দুবাই ৬০ দিনের ফ্যামিলি ট্যুরিস্ট ভিসা',
    destinationEn: 'UAE / Dubai',
    destinationBn: 'দুবাই, আরব আমিরাত',
    grantedDate: 'October 2026',
    quoteEn: 'Submitted our passports on Sunday afternoon, and all 4 visas arrived by Tuesday morning via WhatsApp and email. Flawless hotel booking and flight assistance as well.',
    quoteBn: 'রবিবার বিকেলে ফাইল দিয়েছিলাম, মঙ্গলবার সকালেই পরিবারের ৪ জনের ভিসা হোয়াটসঅ্যপ ও ইমেইলে চলে এসেছে। দ্রুত ও ঝামেলাহীন সেবা পেয়ে আমরা মুগ্ধ।',
    rating: 5
  }
];

export const EMBASSY_NOTICES: EmbassyNotice[] = [
  {
    id: 'n1',
    country: 'Schengen / Italy & France',
    urgency: 'high',
    date: 'October 15, 2026',
    titleEn: 'VFS Dhaka Schengen Appointment Slots Update',
    titleBn: 'ভিএফএস ঢাকা শেনজেন অ্যাপয়েন্টমেন্ট স্লট সংক্রান্ত আপডেট',
    summaryEn: 'New biometric appointment slots for November and December have been released. Clients are advised to complete document vetting immediately.',
    summaryBn: 'নভেম্বর ও ডিসেম্বর মাসের নতুন বায়োমেট্রিক স্লট চালু হয়েছে। দ্রুত ফাইল অডিট সম্পন্ন করে স্লট নিশ্চিত করার অনুরোধ করা হচ্ছে।'
  },
  {
    id: 'n2',
    country: 'United States',
    urgency: 'normal',
    date: 'October 10, 2026',
    titleEn: 'US Embassy Dhaka B1/B2 Interview Wait Times Reduced',
    titleBn: 'ইউএস দূতাবাস ঢাকা: বি১/বি২ ইন্টারভিউ অপেক্ষার সময় হ্রাস',
    summaryEn: 'Expedited interview booking is available for legitimate business travelers, medical emergency cases, and previous US visa holders eligible for interview waiver.',
    summaryBn: 'ব্যবসায়িক ভ্রমণকারী, মেডিকেল ইমার্জেন্সি ও ড্রপবক্স ক্যাটাগরির জন্য অপেক্ষার সময় কমেছে এবং দ্রুত সাক্ষাতকার পাওয়া যাচ্ছে।'
  },
  {
    id: 'n3',
    country: 'Canada',
    urgency: 'normal',
    date: 'October 04, 2026',
    titleEn: 'Canada SDS & Non-SDS Study Permit Guidelines',
    titleBn: 'কানাডা স্টাডি পারমিট নতুন নির্দেশিকা',
    summaryEn: 'Guaranteed Investment Certificate (GIC) verification and PAL provincial attestation letters are now mandatory for all Bangladeshi higher education applicants.',
    summaryBn: 'বাংলাদেশী শিক্ষার্থীদের জন্য জিআইসি ভেরিফিকেশন ও পিএএল প্রোভিন্সিয়াল লেটার বাধ্যতামূলক করা হয়েছে।'
  }
];

export const FAQ_DATA = [
  {
    qEn: 'Do you take full visa file processing or fake file submission?',
    qBn: 'আপনারা কি পুরো ফাইল জমা নেওয়ার কোনো চুক্তি করেন?',
    aEn: 'No! We strictly do not take fake visa files. Our legitimate service operates in 3 transparent steps: (1) Applying directly to 100 verified European sponsor companies on your behalf, (2) If shortlisted by employers, arranging official online video meetings/interviews between you and the hiring company, (3) Booking official embassy appointment slots once you pass the interview and secure the verified job offer.',
    aBn: 'না! আমরা কোনো অবাস্তব বা ভুয়া "ফাইল জমা" নিই না। আমাদের কাজ সম্পূর্ণ স্বচ্ছ ৩টি ধাপে পরিচালিত হয়: (১) আপনার হয়ে ইউরোপের ১০০টি অনুমোদিত কোম্পানিতে সরাসরি চাকরির আবেদন পৌঁছে দেওয়া, (২) কোম্পানি আপনার যোগ্যতা দেখে পছন্দ করলে কোম্পানির সাথে সরাসরি অনলাইন ভিডিও মিটিং/ইন্টারভিউ করিয়ে দেওয়া, এবং (৩) মিটিংয়ে উত্তীর্ণ হয়ে জব অফার লেটার পেলে এম্বাসি ফেস করার জন্য অ্যাপয়েন্টমেন্ট স্লট বুকিং করে দেওয়া।'
  },
  {
    qEn: 'What makes RRR Visa Help different from other agencies?',
    qBn: 'অন্যান্য এজেন্সির তুলনায় আরআরআর ভিসা হেল্প কেন নির্ভরযোগ্য?',
    aEn: 'We do not sell fake documents or make false promises. Every file undergoes a triple-layer audit by senior immigration consultants, verified financial alignment, and tailored SOP drafting that addresses specific embassy guidelines.',
    aBn: 'আমরা কোনো ভুয়া কাগজপত্র তৈরি করি না এবং শতভাগ স্বচ্ছতা বজায় রাখি। প্রতিটি ফাইল জমার পূর্বে ৩ স্তরের অডিট সম্পন্ন হয়, যাতে দূতাবাসের নিয়ম অনুযায়ী আপনার ফাইল সম্পূর্ণ নিখুঁত থাকে।'
  },
  {
    qEn: 'Can I check my visa application status anytime?',
    qBn: 'আমি কি যেকোনো সময় আমার ভিসা ফাইলের অগ্রগতি ট্র্যাক করতে পারব?',
    aEn: 'Yes! Simply use your unique RRR Tracking ID (e.g. RRR-8842-BD) on our website to see real-time updates from document translation to embassy submission and passport collection.',
    aBn: 'হ্যাঁ! আমাদের ওয়েবসাইটের ট্র্যাকিং বক্সে আপনার আরআরআর ট্র্যাকিং আইডি লিখলেই ফাইল গ্রহণ থেকে শুরু করে পাসপোর্ট ফেরত পর্যন্ত সব ধাপ লাইভ দেখতে পাবেন।'
  },
  {
    qEn: 'What is the minimum bank balance required for Europe or USA visa?',
    qBn: 'ইউরোপ বা আমেরিকা ভিসার জন্য ন্যূনতম কত টাকা ব্যাংক ব্যালেন্স প্রয়োজন?',
    aEn: 'For Europe/Schengen tourist visas, an active balance showing ৳6,00,000 to ৳10,00,000 per person with consistent transaction history is generally recommended. For USA, consistency and legitimate source of funds matter more than a sudden large deposit.',
    aBn: 'ইউরোপ শেনজেন ভিসার জন্য জনপ্রতি সাধারণত ৬ থেকে ১০ লাখ টাকা নিয়মিত লেনদেনসহ স্থিতি থাকা ভালো। আমেরিকার ক্ষেত্রে হঠাৎ জমা টাকার চেয়ে নিয়মিত ও বৈধ আয়ের উৎস প্রদর্শন বেশি গুরুত্বপূর্ণ।'
  },
  {
    qEn: 'Do you provide mock interview coaching for US Embassy Dhaka?',
    qBn: 'আপনারা কি ইউএস অ্যাম্বাসী ঢাকার জন্য মক ইন্টারভিউ প্রস্তুতি করান?',
    aEn: 'Yes! We run comprehensive 1-on-1 simulated mock interview sessions focusing on eye contact, concise answers, DS-160 harmony, and overcoming tricky officer inquiries.',
    aBn: 'অবশ্যই! আমাদের অভিজ্ঞ কনসালট্যান্টরা দূতাবাসের মতো বাস্তব পরিবেশে ওয়ান-অন-ওয়ান মক ইন্টারভিউ নেন এবং সঠিক উত্তর দেওয়ার কৌশল প্রশিক্ষণ দেন।'
  }
];
