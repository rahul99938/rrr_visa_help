import React, { useState } from 'react';
import { BULK_APPLY_PACKAGES, CONTACT_INFO, SCHENGEN_COUNTRIES_PORTALS } from '../data/jobData';
import { BulkApplyPackage, BulkApplyOrder } from '../types/job';
import { Language } from '../types/visa';
import { CheckCircle2, ShieldCheck, Send, MessageSquare, Phone, ArrowRight, FileCheck, Layers, Award, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';

interface BulkApplySectionProps {
  lang: Language;
  preselectedJobTitle?: string;
  onNewOrder: (order: BulkApplyOrder) => void;
  paymentNumber?: string;
  customPrice100?: number;
  customPrice50?: number;
  customPrice30?: number;
  onSelectPackageForDetailApply?: (pkg: BulkApplyPackage, effectivePrice: number) => void;
}

export const BulkApplySection: React.FC<BulkApplySectionProps> = ({
  lang,
  preselectedJobTitle,
  onNewOrder,
  paymentNumber = CONTACT_INFO.paymentNumber,
  customPrice100 = 4500,
  customPrice50 = 2800,
  customPrice30 = 1800,
  onSelectPackageForDetailApply,
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-100');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [targetCountries, setTargetCountries] = useState<string[]>(['Romania', 'Poland', 'Portugal', 'Italy']);
  const [targetTrades, setTargetTrades] = useState<string[]>(['Factory & Packaging']);
  const [hasPassport, setHasPassport] = useState<boolean>(true);
  const [needsCvCreation, setNeedsCvCreation] = useState<boolean>(true);
  const [experience, setExperience] = useState<string>('1-3 years');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [transactionId, setTransactionId] = useState<string>('');
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);

  const [orderConfirmed, setOrderConfirmed] = useState<BulkApplyOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableCountries = [
    'Romania 🇷🇴',
    'Poland 🇵🇱',
    'Italy 🇮🇹',
    'Portugal 🇵🇹',
    'Malta 🇲🇹',
    'Germany 🇩🇪',
    'Lithuania 🇱🇹',
    'Croatia 🇭🇷',
    'Hungary 🇭🇺',
    'Spain 🇪🇸',
    'France 🇫🇷',
    'Czech 🇨🇿',
  ];

  const availableTrades = [
    'ফ্যাক্টরি ও প্যাকেজিং (Factory & Packing)',
    'নির্মাণ ও রাজমিস্ত্রি (Construction & Mason)',
    'ড্রাইভার ও ডেলিভারি (Heavy & Light Drivers)',
    'ওয়েল্ডার ও ইলেকট্রিশিয়ান (Welder & Electrician)',
    'হোটেল, রেস্টুরেন্ট ও কিচেন ক্রু (Hospitality & Crew)',
    'কৃষি, খামার ও ফল সংগ্রহ (Agriculture & Farm)',
    'ক্লিনার ও সিকিউরিটি গার্ড (Cleaner & Security)',
    'নার্সিং ও কেয়ারগিভার (Caregiver & Healthcare)',
    'আইটি, কম্পিউটার ও ডাটা এন্ট্রি (IT & Data Entry)',
  ];

  const currentPkg = BULK_APPLY_PACKAGES.find((p) => p.id === selectedPkgId) || BULK_APPLY_PACKAGES[2];

  const toggleCountry = (country: string) => {
    if (targetCountries.includes(country)) {
      if (targetCountries.length > 1) {
        setTargetCountries(targetCountries.filter((c) => c !== country));
      }
    } else {
      setTargetCountries([...targetCountries, country]);
    }
  };

  const toggleTrade = (trade: string) => {
    if (targetTrades.includes(trade)) {
      if (targetTrades.length > 1) {
        setTargetTrades(targetTrades.filter((t) => t !== trade));
      }
    } else {
      setTargetTrades([...targetTrades, trade]);
    }
  };

  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম এবং মোবাইল / হোয়াটসঅ্যাপ নম্বর প্রদান করুন।'
          : 'Please provide both your full name and phone number.'
      );
      return;
    }

    if (!transactionId.trim() || transactionId.trim().length < 5) {
      setErrorMessage(
        lang === 'bn'
          ? `অনুগ্রহ করে ${paymentNumber} নম্বরে পেমেন্ট করার পর সঠিক ট্রানজেকশন আইডি (TrxID) প্রদান করুন।`
          : `Please enter a valid Payment Transaction Code (TrxID) received after sending payment to ${paymentNumber}.`
      );
      return;
    }

    const effectivePrice =
      selectedPkgId === 'pkg-100'
        ? customPrice100
        : selectedPkgId === 'pkg-50'
        ? customPrice50
        : selectedPkgId === 'pkg-30'
        ? customPrice30
        : currentPkg.priceBDT;

    const orderRef = `RRR-100JOB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: BulkApplyOrder = {
      orderId: orderRef,
      fullName: fullName.trim(),
      phone: phone.trim(),
      telegram: telegram.trim() || undefined,
      selectedPackage: currentPkg.nameEn,
      packagePrice: effectivePrice,
      targetCountries,
      jobCategories: targetTrades,
      experienceYears: experience,
      education: 'Verified Work Experience',
      hasPassport,
      hasEuropassCV: !needsCvCreation,
      paymentMethod,
      paymentNumber: paymentNumber,
      transactionId: transactionId.trim().toUpperCase(),
      paymentStatus: 'pending_verification',
      orderStatus: 'submitted',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onNewOrder(newOrder);
    setOrderConfirmed(newOrder);
    setErrorMessage(null);
  };

  const constructOrderMessage = (order: BulkApplyOrder) => {
    const text = `Hello RRR Visa Help, I submitted payment for 100 Job Application Service!
*Order Ref:* ${order.orderId}
*Name:* ${order.fullName}
*Phone/WhatsApp:* ${order.phone}
*Package:* ${order.selectedPackage} (৳${order.packagePrice.toLocaleString()})
*Payment Method:* ${order.paymentMethod}
*Sent to:* 01762-626144
*Transaction Code (TrxID):* ${order.transactionId}
*Countries:* ${order.targetCountries.join(', ')}
*Trades:* ${order.jobCategories.join(', ')}
Please verify my TrxID and start Europass CV preparation!`;
    return encodeURIComponent(text);
  };

  return (
    <section id="bulk-apply" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            {lang === 'bn' ? 'আমাদের বিশেষ সার্ভিস' : 'Done-For-You Bulk Job Application Service'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            {lang === 'bn'
              ? 'আমরা আপনার হয়ে ১০০টি ইউরোপিয়ান কোম্পানিতে সরাসরি আবেদন করে দেবো'
              : 'Let Us Apply to 100+ European Sponsor Companies on Your Behalf'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {lang === 'bn'
              ? 'নিজে নিজে ১০০টি কোম্পানিতে আবেদন করা সময়সাপেক্ষ ও জটিল। আমাদের অভিজ্ঞ কনসালট্যান্টরা আন্তর্জাতিক স্ট্যান্ডার্ড Europass সিভি ও কভার লেটার তৈরি করে ইউরোপের ১০০টি বৈধ সরকারি স্পন্সর কোম্পানিতে সরাসরি আবেদন সম্পন্ন করবে।'
              : 'Applying manually across dozens of European portals is tedious. Our certified team builds an ATS-optimized Europass CV and submits 100 verified applications directly on your behalf for a small transparent service fee.'}
          </p>

          {/* Official Payment & Contact Strip */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-medium bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-800 shadow-xs">
            <span className="font-bold text-[#0f3260]">
              {lang === 'bn' ? 'অফিসিয়াল পেমেন্ট নম্বর (বিকাশ/নগদ/রকেট):' : 'Official Payment (bKash/Nagad/Rocket):'}
            </span>
            <span className="font-mono font-extrabold text-base text-emerald-800 bg-white px-2 py-0.5 rounded border border-neutral-200">
              {paymentNumber}
            </span>
            <span>·</span>
            <a href={`https://wa.me/${paymentNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-bold underline text-emerald-700">
              WhatsApp {paymentNumber}
            </a>
            <span>·</span>
            <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-700">
              Telegram @{CONTACT_INFO.telegramUser}
            </a>
          </div>

          {/* 3-Step Reality / Service Workflow Explanation */}
          <div className="mt-8 text-left bg-gradient-to-r from-blue-50/80 via-emerald-50/60 to-amber-50/80 border border-neutral-300 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0f3260] text-white text-[11px] font-bold tracking-wider uppercase">
                {lang === 'bn' ? 'স্বচ্ছ সার্ভিস পলিসি' : '100% Transparent Workflow'}
              </span>
              <span className="text-xs text-neutral-600 font-semibold">
                {lang === 'bn' ? 'আমরা কোনো ভুয়া ফাইল জমা নিই না — আমাদের কাজ ৩টি বাস্তব ধাপে সম্পন্ন হয়:' : 'We do not take fake visa files — strictly 3 genuine steps:'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-1.5">
                  ১
                </div>
                <strong className="block text-neutral-900 font-bold mb-1">
                  {lang === 'bn' ? '১. ইউরোপের কোম্পানিতে চাকরির আবেদন' : '1. Direct Job Application'}
                </strong>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার শিক্ষাগত যোগ্যতা ও ট্রেড অনুযায়ী ইউরোপের অনুমোদিত ১০০টি সরকারি স্পন্সর কোম্পানিতে সরাসরি আবেদনপত্র পৌঁছে দেওয়া।'
                    : 'Submitting ATS-compliant Europass CV & application directly to 100 verified European employers.'}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-1.5">
                  ২
                </div>
                <strong className="block text-neutral-900 font-bold mb-1">
                  {lang === 'bn' ? '২. কোম্পানির সাথে ভিডিও মিটিং/ইন্টারভিউ' : '2. Company Meeting / Interview'}
                </strong>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  {lang === 'bn'
                    ? 'কোম্পানির এইচআর বা নিয়োগকর্তা আপনার প্রোফাইল দেখে পছন্দ করলে সরাসরি তাদের সাথে আপনার অফিসিয়াল অনলাইন মিটিং করিয়ে দেওয়া।'
                    : 'If shortlisted, arranging official online video interview between you and the hiring employer.'}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-1.5">
                  ৩
                </div>
                <strong className="block text-neutral-900 font-bold mb-1">
                  {lang === 'bn' ? '৩. মিটিংয়ে টিকলে এম্বাসি ফেস বুকিং' : '3. Embassy Face Slot Booking'}
                </strong>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  {lang === 'bn'
                    ? 'কোম্পানির মিটিংয়ে উত্তীর্ণ হয়ে জব অফার পেলে দূতাবাসে অ্যাপয়েন্টমেন্ট/ভিএফএস স্লট বুকিং সম্পন্ন করা।'
                    : 'Once you pass the interview and get the job offer, booking official embassy appointment for visa facing.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {BULK_APPLY_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            const effectivePrice =
              pkg.id === 'pkg-100'
                ? customPrice100
                : pkg.id === 'pkg-50'
                ? customPrice50
                : pkg.id === 'pkg-30'
                ? customPrice30
                : pkg.priceBDT;

            const handleCardClick = () => {
              setSelectedPkgId(pkg.id);
              if (onSelectPackageForDetailApply) {
                onSelectPackageForDetailApply(pkg, effectivePrice);
              }
            };

            return (
              <div
                key={pkg.id}
                onClick={handleCardClick}
                className={`relative rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.01] ${
                  pkg.popular
                    ? 'border-[#0f3260] bg-[#0f3260] text-white shadow-xl ring-2 ring-[#0f3260]'
                    : isSelected
                    ? 'border-[#0f3260] bg-neutral-50 text-neutral-900 shadow-md ring-1 ring-[#0f3260]'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d59c19] text-neutral-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-sm">
                    {lang === 'bn' ? 'সবচেয়ে জনপ্রিয় (১০০ চাকরির আবেদন)' : 'Signature Service'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${pkg.popular ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {pkg.applicationsCount} {lang === 'bn' ? 'টি আবেদন' : 'Jobs'}
                    </span>
                    <span className={`text-[11px] font-mono line-through ${pkg.popular ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      ৳{pkg.originalPriceBDT.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-snug mb-3">
                    {lang === 'bn' ? pkg.nameBn : pkg.nameEn}
                  </h3>

                  <div className="mb-4">
                    <span className="text-2xl font-extrabold font-mono tabular-nums">
                      ৳{effectivePrice.toLocaleString()}
                    </span>
                    <span className={`text-xs ml-1 ${pkg.popular ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {lang === 'bn' ? 'সার্ভিস চার্জ' : 'Service Fee'}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs mb-6">
                    {(lang === 'bn' ? pkg.featuresBn : pkg.featuresEn).map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${pkg.popular ? 'text-[#d59c19]' : 'text-emerald-600'}`} />
                        <span className={pkg.popular ? 'text-neutral-200' : 'text-neutral-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  className={`w-full py-2.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center shadow-sm ${
                    pkg.popular
                      ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 font-black'
                      : isSelected
                      ? 'bg-[#0f3260] text-white hover:bg-[#0c274a]'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {lang === 'bn' ? 'এই প্যাক নির্বাচন করুন (বিস্তারিত ফর্ম)' : 'Select Package (Apply Now)'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Order Form with Mandatory TrxID Verification */}
        <div className="max-w-3xl mx-auto bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {orderConfirmed ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900">
                {lang === 'bn' ? 'আবেদন ও TrxID সফলভাবে জমা হয়েছে!' : 'Application & TrxID Submitted!'}
              </h3>

              <p className="text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed">
                {lang === 'bn'
                  ? `ধন্যবাদ ${orderConfirmed.fullName}। আপনার ট্র্যাকিং কোড ${orderConfirmed.orderId} এবং প্রদানকৃত TrxID: ${orderConfirmed.transactionId}। আমাদের অ্যাডমিন প্যানেলে এটি ভেরিফাই করা হচ্ছে। এখনই হোয়াটসঅ্যাপ বা টেলিগ্রামে মেসেজ পাঠিয়ে প্রসেসিং শুরু করুন!`
                  : `Thank you, ${orderConfirmed.fullName}. Your reference is ${orderConfirmed.orderId} with TrxID: ${orderConfirmed.transactionId}. Our admin team is verifying your deposit.`}
              </p>

              {/* Order Receipt Box */}
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-xs font-mono text-left max-w-md mx-auto space-y-2 text-neutral-800 shadow-xs">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-neutral-500">Order ID:</span>
                  <span className="font-bold text-[#0f3260]">{orderConfirmed.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Package:</span>
                  <span className="font-semibold text-neutral-900">{orderConfirmed.selectedPackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service Fee:</span>
                  <span className="font-bold text-emerald-700">৳{orderConfirmed.packagePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Channel:</span>
                  <span className="text-neutral-900">{orderConfirmed.paymentMethod} (01762626144)</span>
                </div>
                <div className="flex justify-between bg-amber-50 p-1.5 rounded border border-amber-200">
                  <span className="text-neutral-600 font-bold">Transaction Code:</span>
                  <span className="font-bold text-amber-900">{orderConfirmed.transactionId}</span>
                </div>
              </div>

              {/* 3D Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${constructOrderMessage(orderConfirmed)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 btn-3d-whatsapp text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে TrxID নিশ্চিত করুন' : 'Confirm on WhatsApp'}</span>
                </a>

                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 btn-3d-telegram text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'টেলিগ্রামে জানান' : 'Send via Telegram'}</span>
                </a>

                <a
                  href={`tel:${paymentNumber.replace(/[^0-9]/g, '')}`}
                  className="px-4 py-3 btn-3d-imo text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'ইমোতে যোগাযোগ' : 'IMO Call'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setOrderConfirmed(null)}
                  className="px-4 py-3 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'নতুন আবেদন করুন' : 'Submit Another Order'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {lang === 'bn' ? 'অর্ডার ও পেমেন্ট ফর্ম' : 'Order & Payment Submission'}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                    {lang === 'bn' ? '১০০ চাকরির আবেদন সার্ভিস নিশ্চিত করুন' : 'Confirm Done-For-You Bulk Job Application'}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-neutral-500 block">{lang === 'bn' ? 'সার্ভিস চার্জ:' : 'Charge:'}</span>
                  <span className="text-xl font-bold font-mono text-[#0f3260]">৳{currentPkg.priceBDT.toLocaleString()}</span>
                </div>
              </div>

              {/* Applicant Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মোঃ আরিফুল ইসলাম' : 'e.g. Md. Ariful Islam'}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0f3260]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 18XX-XXXXXX"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0f3260]"
                  />
                </div>
              </div>

              {/* Telegram & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'টেলিগ্রাম ইউজারনেম (যদি থাকে)' : 'Telegram ID (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="@your_telegram_id"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0f3260]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'কাজের অভিজ্ঞতা' : 'Experience Level'}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0f3260]"
                  >
                    <option value="fresher">{lang === 'bn' ? 'নতুন / ফ্রেশার (কোন অভিজ্ঞতা নেই)' : 'Fresher (No prior experience)'}</option>
                    <option value="1-3 years">{lang === 'bn' ? '১ থেকে ৩ বছরের অভিজ্ঞতা' : '1 - 3 Years'}</option>
                    <option value="3-5 years">{lang === 'bn' ? '৩ থেকে ৫ বছরের অভিজ্ঞতা' : '3 - 5 Years'}</option>
                    <option value="5+ years">{lang === 'bn' ? '৫ বছরের বেশি অভিজ্ঞতা' : '5+ Years Veteran'}</option>
                  </select>
                </div>
              </div>

              {/* Multi-Select Countries */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? 'কোন কোন শেনজেন দেশে আবেদন করাতে চান?' : 'Target Schengen Countries'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableCountries.map((c) => {
                    const isChecked = targetCountries.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCountry(c)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-[#0f3260] text-white border-[#0f3260] font-semibold'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {isChecked ? `✓ ${c}` : c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Select Trades */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? 'আপনার পেশা নির্বাচন করুন (বাংলাদেশীদের জনপ্রিয় পেশা)' : 'Your Trade / Profession Category'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTrades.map((trade) => {
                    const isChecked = targetTrades.includes(trade);
                    return (
                      <button
                        key={trade}
                        type="button"
                        onClick={() => toggleTrade(trade)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-[#0c7c45] text-white border-[#0c7c45] font-semibold'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {isChecked ? `✓ ${trade}` : trade}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PAYMENT SECTION - MANDATORY TRXID */}
              <div className="bg-neutral-100/90 border border-neutral-300 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-sm font-bold text-neutral-900">
                    {lang === 'bn' ? 'পেমেন্ট নির্দেশিকা ও ট্রানজেকশন কোড (TrxID) *' : 'Payment Instructions & TrxID Verification *'}
                  </h4>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
                      {lang === 'bn' ? 'বিকাশ / নগদ / রকেট পার্সোনাল নম্বর:' : 'bKash / Nagad / Rocket Number:'}
                    </span>
                    <span className="text-lg font-black font-mono text-[#0f3260]">
                      {paymentNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPaymentNumber}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg border border-neutral-300 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'কপি হয়েছে' : 'নম্বর কপি করুন'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {lang === 'bn'
                    ? `আপনার বিকাশ, নগদ বা রকেট অ্যাপ থেকে Send Money বা Cash In করে নির্ধারিত সার্ভিস ফি পাঠান। টাকা পাঠানোর পর পাওয়া ট্রানজেকশন আইডি (TrxID) নিচের ঘরে লিখুন:`
                    : `Send required fee to ${paymentNumber}, then enter your TrxID code below:`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-900"
                    >
                      <option value="bKash">বিকাশ (bKash) - {paymentNumber}</option>
                      <option value="Nagad">নগদ (Nagad) - {paymentNumber}</option>
                      <option value="Rocket">রকেট (Rocket) - {paymentNumber}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'ট্রানজেকশন আইডি (TrxID) *' : 'Transaction Code (TrxID) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                      placeholder={lang === 'bn' ? 'যেমন: 8N7X29A10B' : 'e.g. 8N7X29A10B'}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-neutral-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#0f3260]"
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#0f3260] hover:bg-[#0c274a] text-white text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>
                  {lang === 'bn'
                    ? `১০০ চাকরির আবেদন অর্ডার করুন (ফি: ৳${currentPkg.priceBDT.toLocaleString()})`
                    : `Submit Bulk Job Order with TrxID (৳${currentPkg.priceBDT.toLocaleString()})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
