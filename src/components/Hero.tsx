import React from 'react';
import { Language } from '../types/visa';
import { ShieldCheck, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onQuickTrack: (trackingId: string) => void;
  brandName?: string;
  hotlinePhone?: string;
  paymentNumber?: string;
  telegramUsername?: string;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onNavigate,
  onQuickTrack,
  brandName = 'RRR Visa Help',
  hotlinePhone = '+880 1845-130981',
  paymentNumber = '01762626144',
  telegramUsername = '@rrrvisahelp',
}) => {
  const cleanPhone = hotlinePhone.replace(/[^0-9]/g, '');

  return (
    <section className="relative overflow-hidden bg-white border-b border-neutral-200 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-20 max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed editorial kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-neutral-600 mb-5 break-words">
          <span className="text-[#0f3260] font-bold">{lang === 'bn' ? `${brandName} ইউরোপ কোম্পানি হাব` : `${brandName} Europe Jobs Hub`}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-bold">{lang === 'bn' ? '২৯টি শেনজেন সরকারি পোর্টাল' : '29 Official Portals'}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
            {lang === 'bn' ? `পেমেন্ট: ${paymentNumber}` : `Payment: ${paymentNumber}`}
          </span>
          <span aria-hidden="true">·</span>
          <span>{lang === 'bn' ? `হটলাইন: ${hotlinePhone}` : `Hotline: ${hotlinePhone}`}</span>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.2] text-balance break-words">
              {lang === 'bn'
                ? 'ইউরোপের সেরা চাকরির সার্কুলার ও ১০০ কোম্পানিতে আবেদন সেবা'
                : 'Direct European Job Circulars & Done-For-You 100 Job Submissions'}
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-neutral-600 leading-relaxed max-w-2xl break-words">
              {lang === 'bn'
                ? 'রোমানিয়া, পোল্যান্ড, ইতালি, পর্তুগালসহ ইউরোপের অনুমোদিত কোম্পানিগুলোর চাকরির সরাসরি সার্কুলার লিংক দেখুন অথবা আমাদের সার্ভিস চার্জের মাধ্যমে আপনার হয়ে ১০০টি কোম্পানিতে আবেদন করিয়ে নিন।'
                : 'Browse verified European job circular links directly from employers, or hire RRR Visa Help to draft an ATS-certified Europass CV and submit 100+ targeted job applications on your behalf.'}
            </p>

            {/* Direct 3D Contact Bar in Hero */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5 text-xs max-w-full">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 btn-3d-whatsapp rounded-xl font-bold text-white shadow-sm cursor-pointer"
              >
                <span>WhatsApp: {hotlinePhone}</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 btn-3d-imo rounded-xl font-bold text-white shadow-sm cursor-pointer"
              >
                <span>IMO / Call: {hotlinePhone}</span>
              </a>
              <a
                href={`https://t.me/${telegramUsername.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 btn-3d-telegram rounded-xl font-bold text-white shadow-sm cursor-pointer"
              >
                <span>Telegram: {telegramUsername}</span>
              </a>
            </div>

            {/* 3-Step Reality Note */}
            <div className="mt-4 p-3 bg-amber-50/90 border border-amber-200/90 rounded-xl text-xs text-amber-950 flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span className="leading-snug">
                {lang === 'bn'
                  ? 'আমরা কোনো ভুয়া ফাইল জমা নিই না — আমাদের ৩-ধাপের বাস্তব সার্ভিস: (১) ১০০ কোম্পানিতে সরাসরি চাকরির আবেদন → (২) কোম্পানি পছন্দ করলে তাদের সাথে অনলাইন ভিডিও মিটিং → (৩) মিটিংয়ে টিকলে এম্বাসি ফেসের বুকিং সহায়তা।'
                  : 'Zero fake file processing — Verified 3-step reality: (1) 100 Job Applications → (2) Direct Employer Video Meeting → (3) Embassy Appointment Booking once selected.'}
              </span>
            </div>

            {/* Primary Action Buttons - 100% Mobile Responsive */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-full">
              <button
                onClick={() => onNavigate('jobs')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer text-center"
              >
                <span>{lang === 'bn' ? 'ইউরোপের চাকরি দেখুন' : 'Browse Europe Jobs'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate('bulk-apply')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-black text-amber-950 bg-amber-300 border-2 border-amber-400 rounded-xl hover:bg-amber-400 transition-all cursor-pointer text-center shadow-md active:translate-y-0.5"
              >
                <span>{lang === 'bn' ? '১০০ চাকরিতে আবেদন করান' : 'Apply to 100 Jobs for Me'}</span>
              </button>
            </div>

            {/* Quick Live Tracking Anchor */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span className="font-medium text-neutral-600">
                {lang === 'bn' ? 'সরাসরি লাইভ ট্র্যাকিং দেখতে ক্লিক করুন:' : 'Sample Active Files:'}
              </span>
              <button
                onClick={() => {
                  onQuickTrack('RRR-8842-BD');
                  onNavigate('tracking');
                }}
                className="underline hover:text-neutral-900 font-mono"
              >
                RRR-8842-BD (Italy)
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  onQuickTrack('RRR-9201-US');
                  onNavigate('tracking');
                }}
                className="underline hover:text-neutral-900 font-mono"
              >
                RRR-9201-US (USA)
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  onQuickTrack('RRR-4318-EU');
                  onNavigate('tracking');
                }}
                className="underline hover:text-neutral-900 font-mono"
              >
                RRR-4318-EU (UK)
              </button>
            </div>

            {/* Trust Assurance Checklist */}
            <div className="mt-7 pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'bn' ? '১০০% স্বচ্ছ ফাইল অডিট' : 'Zero Fake Document Policy'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'bn' ? 'নিবেদিত কনসালট্যান্ট' : 'Dedicated Visa Officer'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'bn' ? 'লাইভ অনলাইন ট্র্যাকিং' : 'Real-time Milestone Tracker'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-lg aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[420px]">
              <img
                src="/src/assets/images/hero_visa_consulting_1792239548058.jpg"
                alt="RRR Visa Help International Passports & Travel Advisory Desk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating verified badge in bottom corner */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-neutral-200/80 rounded-lg p-3 text-xs text-neutral-800 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neutral-900" />
                    <span className="font-semibold text-neutral-900">
                      {lang === 'bn' ? 'অফিসিয়াল ভিসা প্রসেসিং ডেস্ক' : 'Authorized Visa Assistance Desk'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">Dhaka & Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item KPI Proof Strip below the Hero Split */}
        <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              14,200+
            </span>
            <span className="text-xs sm:text-sm text-neutral-600 mt-1">
              {lang === 'bn' ? 'সফল ভিসা প্রসেস সম্পন্ন' : 'Successful Visas Processed'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              45+
            </span>
            <span className="text-xs sm:text-sm text-neutral-600 mt-1">
              {lang === 'bn' ? 'বিশ্বব্যাপী গন্তব্য দেশ' : 'Global Destinations Covered'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              98.4%
            </span>
            <span className="text-xs sm:text-sm text-neutral-600 mt-1">
              {lang === 'bn' ? 'ফাইল অনুমোদন অনুপাত' : 'Document Approval Ratio'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              1-on-1
            </span>
            <span className="text-xs sm:text-sm text-neutral-600 mt-1">
              {lang === 'bn' ? 'ব্যক্তিগত মক ইন্টারভিউ গাইডেন্স' : 'Simulated Embassy Coaching'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
