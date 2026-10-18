import React, { useState } from 'react';
import { BulkApplyPackage, BulkApplyOrder } from '../types/job';
import { Language } from '../types/visa';
import { CONTACT_INFO } from '../data/jobData';
import { simulateSendSMS } from '../services/smsService';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Video,
  FileCheck,
  Copy,
  Check,
  MessageSquare,
  Send,
  Phone,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface PackageApplicationPageProps {
  lang: Language;
  selectedPackage: BulkApplyPackage;
  effectivePrice: number;
  paymentNumber: string;
  onBack: () => void;
  onSubmitOrder: (order: BulkApplyOrder) => void;
}

export const PackageApplicationPage: React.FC<PackageApplicationPageProps> = ({
  lang,
  selectedPackage,
  effectivePrice,
  paymentNumber = CONTACT_INFO.paymentNumber,
  onBack,
  onSubmitOrder,
}) => {
  // Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  
  const [hasPassport, setHasPassport] = useState(true);
  const [passportNumber, setPassportNumber] = useState('');
  const [primaryTrade, setPrimaryTrade] = useState('ফ্যাক্টরি ও প্যাকেজিং (Factory & Packing)');
  const [experienceYears, setExperienceYears] = useState('১-৩ বছর (1-3 Years)');
  const [education, setEducation] = useState('এইচএসসি পাস (HSC / 12th)');
  const [englishSkill, setEnglishSkill] = useState('সাধারণ কাজের উপযোগী (Functional)');
  const [needsCvCreation, setNeedsCvCreation] = useState(true);

  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    'Romania 🇷🇴',
    'Poland 🇵🇱',
    'Italy 🇮🇹',
    'Portugal 🇵🇹'
  ]);

  const [serviceAgreed, setServiceAgreed] = useState(true);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<BulkApplyOrder | null>(null);

  const countryOptions = [
    'Romania 🇷🇴',
    'Poland 🇵🇱',
    'Italy 🇮🇹',
    'Portugal 🇵🇹',
    'Malta 🇲🇹',
    'Germany 🇩🇪',
    'Lithuania 🇱🇹',
    'Croatia 🇭🇷',
    'Hungary 🇭🇺',
    'Czech 🇨🇿',
    'Spain 🇪🇸',
    'Slovakia 🇸🇰',
  ];

  const tradeOptions = [
    'ফ্যাক্টরি ও প্যাকেজিং (Factory & Packing)',
    'ফুড প্রসেসিং ও বেকারি (Food Processing & Bakery)',
    'নির্মাণ ও রাজমিস্ত্রি (Construction & Mason)',
    'ড্রাইভার ও ডেলিভারি (Heavy & Light Drivers)',
    'ওয়েল্ডার ও ইলেকট্রিশিয়ান (Welder & Electrician)',
    'হোটেল, রেস্টুরেন্ট ও কিচেন ক্রু (Hospitality & Kitchen)',
    'কৃষি, খামার ও ফল সংগ্রহ (Agriculture & Farm)',
    'ক্লিনার ও সিকিউরিটি গার্ড (Cleaner & Security)',
    'নার্সিং ও কেয়ারগিভার (Caregiver & Healthcare)',
    'কম্পিউটার অপারেটর ও ডাটা এন্ট্রি (IT & Data Entry)',
  ];

  const handleToggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter((c) => c !== country));
      }
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার পুরো নাম এবং সচল মোবাইল / হোয়াটসঅ্যাপ নম্বর প্রদান করুন।'
          : 'Please enter your full name and active phone/WhatsApp number.'
      );
      return;
    }

    if (!transactionId.trim() || transactionId.trim().length < 5) {
      setErrorMessage(
        lang === 'bn'
          ? `অনুগ্রহ করে ${paymentNumber} নম্বরে ৳${effectivePrice.toLocaleString()} টাকা পাঠানোর পর ট্রানজেকশন কোড (TrxID) সঠিকভাবে লিখুন।`
          : `Please enter the transaction ID received after sending payment to ${paymentNumber}.`
      );
      return;
    }

    if (!serviceAgreed) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে আমাদের ৩-ধাপের বাস্তব সার্ভিস পলিসির শর্তাবলি নিশ্চিত করুন।'
          : 'Please acknowledge our 3-step reality service policy.'
      );
      return;
    }

    const orderRef = `RRR-${selectedPackage.applicationsCount}JOB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: BulkApplyOrder = {
      orderId: orderRef,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      telegram: telegram.trim() || undefined,
      age: age.trim() || undefined,
      districtAddress: district,
      hasPassport,
      passportNumber: passportNumber.trim() || undefined,
      selectedPackage: selectedPackage.nameEn,
      packagePrice: effectivePrice,
      targetCountries: selectedCountries,
      jobCategories: [primaryTrade],
      experienceYears,
      education,
      englishSkill,
      hasEuropassCV: !needsCvCreation,
      paymentMethod,
      paymentNumber,
      senderPhone: senderPhone.trim() || undefined,
      transactionId: transactionId.trim().toUpperCase(),
      paymentStatus: 'pending_verification',
      orderStatus: 'submitted',
      serviceAcknowledged: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitOrder(newOrder);
    setSubmittedOrder(newOrder);
    setErrorMessage(null);

    // Simulate SMS notification
    simulateSendSMS({
      recipientPhone: phone.trim(),
      recipientName: fullName.trim(),
      orderId: orderRef,
      orderStatusTitle: 'আবেদনপত্র ও TrxID গৃহীত হয়েছে (যাচাই চলছে)',
      siteName: 'RRR Visa Help',
      sitePhone: paymentNumber,
    });
  };

  const cleanHotline = paymentNumber.replace(/[^0-9]/g, '');

  const constructWhatsAppMessage = (order: BulkApplyOrder) => {
    const text = `আসসালামু আলাইকুম RRR Visa Help,
আমি ইউরোপের চাকরির আবেদন ফর্ম জমা দিয়েছি ও ফি পাঠিয়েছি।

*অর্ডার রেফারেন্স:* ${order.orderId}
*প্যাকেজ:* ${selectedPackage.nameBn} (${selectedPackage.applicationsCount}টি কোম্পানিতে আবেদন)
*সার্ভিস ফি:* ৳${order.packagePrice.toLocaleString()}
*নাম:* ${order.fullName}
*মোবাইল/WhatsApp:* ${order.phone}
*পেমেন্ট মাধ্যম:* ${order.paymentMethod}
*অফিসিয়াল নম্বর:* ${paymentNumber}
*ট্রানজেকশন কোড (TrxID):* ${order.transactionId}
*কাঙ্ক্ষিত পেশা:* ${primaryTrade}
*কাঙ্ক্ষিত দেশ:* ${order.targetCountries.join(', ')}

আমি অবগত আছি যে আপনারা ৩টি ধাপে কাজ করেন:
১. ১০০ কোম্পানিতে আবেদন পৌঁছে দেওয়া
২. কোম্পানি পছন্দ করলে তাদের সাথে মিটিং/ইন্টারভিউ করানো
৩. মিটিংয়ে টিকলে এম্বাসি ফেস বুকিং করা।

দয়া করে আমার ট্রানজেকশন যাচাই করে ইউরোপাস সিভি তৈরি ও আবেদন প্রক্রিয়া শুরু করুন।`;
    return encodeURIComponent(text);
  };

  // If already submitted, show confirmation view
  if (submittedOrder) {
    return (
      <div className="min-h-screen bg-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f3260] to-[#1e40af] p-6 text-white text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-emerald-400">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {lang === 'bn' ? 'আবেদন ও TrxID সফলভাবে গ্রহণ করা হয়েছে!' : 'Application & TrxID Received!'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-200">
              {lang === 'bn'
                ? `ট্র্যাকিং কোড: ${submittedOrder.orderId}`
                : `Reference Code: ${submittedOrder.orderId}`}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Service Reality Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>
                  {lang === 'bn'
                    ? 'আমাদের পরবর্তী ৩-ধাপের কার্যক্রম শুরু হচ্ছে:'
                    : 'Next 3 Steps in Progress:'}
                </span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-neutral-700 pl-1">
                <li>
                  <strong>ধাপ ১ (আবেদন):</strong> আপনার তথ্যের ওপর ভিত্তি করে অনুমোদিত{' '}
                  {selectedPackage.applicationsCount}টি ইউরোপীয় কোম্পানিতে সরাসরি সিভি ও আবেদন জমা দেওয়া হবে।
                </li>
                <li>
                  <strong>ধাপ ২ (কোম্পানি মিটিং):</strong> কোম্পানি আপনার অভিজ্ঞতা ও ফাইল পছন্দ করলে তাদের সাথে অনলাইন ইন্টারভিউ/ভিডিও মিটিং আয়োজন করে দেওয়া হবে।
                </li>
                <li>
                  <strong>ধাপ ৩ (এম্বাসি বুকিং):</strong> ইন্টারভিউতে সিলেক্ট হলে জব অফার আসার পর আপনার এম্বাসি ফেস বুকিং সম্পন্ন করা হবে।
                </li>
              </ol>
            </div>

            {/* Official Slip */}
            <div className="bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-xs font-mono space-y-2.5">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Order ID:</span>
                <span className="font-bold text-[#0f3260]">{submittedOrder.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Applicant:</span>
                <span className="font-semibold text-neutral-900">{submittedOrder.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Phone / WhatsApp:</span>
                <span className="font-semibold text-neutral-900">{submittedOrder.phone}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Package:</span>
                <span className="font-semibold text-neutral-900">{selectedPackage.nameBn}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Service Fee:</span>
                <span className="font-bold text-emerald-700">৳{submittedOrder.packagePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Payment Channel:</span>
                <span className="font-semibold text-neutral-900">
                  {submittedOrder.paymentMethod} ({paymentNumber})
                </span>
              </div>
              <div className="flex justify-between bg-emerald-50 p-2 rounded border border-emerald-300">
                <span className="text-neutral-700 font-bold">Transaction ID (TrxID):</span>
                <span className="font-black text-emerald-900 text-sm tracking-wider">
                  {submittedOrder.transactionId}
                </span>
              </div>
            </div>

            {/* 3D Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${cleanHotline}?text=${constructWhatsAppMessage(submittedOrder)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 btn-3d-whatsapp rounded-xl flex items-center justify-center gap-2 text-sm font-black shadow-md cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে TrxID ও আবেদন নিশ্চিত করুন' : 'Confirm via WhatsApp'}</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 btn-3d-telegram rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shadow-md cursor-pointer text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'টেলিগ্রামে জানান' : 'Telegram'}</span>
                </a>

                <a
                  href={`tel:${paymentNumber.replace(/[^0-9]/g, '')}`}
                  className="py-3 px-3 btn-3d-imo rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shadow-md cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'হটলাইনে কল দিন' : 'Call Office'}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center mt-2"
              >
                {lang === 'bn' ? 'হোম পেইজে ফিরে যান' : 'Return to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-gradient-to-r from-[#0f3260] to-[#1e40af] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্যাকেজে ফিরে যান' : 'Back to Packages'}</span>
          </button>

          <div className="text-right">
            <span className="text-[11px] text-neutral-300 block">
              {lang === 'bn' ? 'নির্বাচিত প্যাক' : 'Selected Package'}
            </span>
            <span className="text-sm sm:text-base font-black text-amber-300">
              {lang === 'bn' ? selectedPackage.nameBn : selectedPackage.nameEn} (৳{effectivePrice.toLocaleString()})
            </span>
          </div>
        </div>

        {/* 3-Step Reality / Service Explanation Banner */}
        <div className="bg-amber-50 border-b border-amber-200 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-extrabold text-neutral-900">
                {lang === 'bn'
                  ? 'আমরা ফাইল প্রসেসিং করি না — আমাদের ৩-ধাপের বাস্তব সার্ভিস পলিসি:'
                  : 'Zero False Promises — Our 3-Step Practical Service Reality:'}
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {lang === 'bn'
                  ? 'আমরা কোনো ভুয়া ফাইল জমা বা অবাস্তব চুক্তির কাজ করি না। আমাদের দায়িত্ব নির্দিষ্ট ৩টি ধাপে সীমাবদ্ধ:'
                  : 'We do not collect fake visa files. Our verified workflow operates strictly across 3 genuine steps:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-xs flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-bold">১০০ কোম্পানিতে আবেদন:</strong>
                    <span className="text-neutral-600 text-[11px]">
                      আন্তর্জাতিক ইউরোপাস ফরম্যাটে অনুমোদিত ইউরোপীয় কোম্পানিতে আপনার আবেদন পাঠানো।
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-xs flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-bold">কোম্পানি মিটিং আয়োজন:</strong>
                    <span className="text-neutral-600 text-[11px]">
                      কোম্পানি আপনাকে পছন্দ করলে তাদের সাথে সরাসরি অনলাইন ভিডিও ইন্টারভিউ করিয়ে দেওয়া।
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-xs flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <div>
                    <strong className="block text-neutral-900 font-bold">এম্বাসি ফেস স্লট বুকিং:</strong>
                    <span className="text-neutral-600 text-[11px]">
                      ইন্টারভিউতে টিকলে ও জব অফার পেলে দূতাবাসে অ্যাপয়েন্টমেন্ট বুকিং সম্পন্ন করা।
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Application Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-8">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-xs sm:text-sm text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Step 1: Personal & Contact Information */}
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0f3260] text-white text-xs font-bold flex items-center justify-center">
                ১
              </span>
              <h4 className="text-base font-bold text-neutral-900">
                {lang === 'bn' ? 'ব্যক্তিগত ও যোগাযোগ তথ্য' : 'Personal & Contact Details'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'আপনার পুরো নাম (পাসপোর্ট অনুযায়ী ইংরেজি বড় অক্ষরে) *' : 'Full Name (as on Passport) *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. MOHAMMED RAHMAN"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'সচল মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Active Mobile / WhatsApp *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX বা +88018XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'ইমেইল অ্যাড্রেস (কোম্পানির মেইল আসার জন্য)' : 'Email Address (for Company responses)'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'টেলিগ্রাম ইউজারনেম (যদি থাকে)' : 'Telegram Username (Optional)'}
                </label>
                <div className="relative">
                  <Send className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="@your_telegram_id"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'আপনার বয়স (বছর)' : 'Applicant Age'}
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="যেমন: 26"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'বর্তমান জেলা / বিভাগ' : 'District / City'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="যেমন: ঢাকা / চট্টগ্রাম / সিলেট / কুমিল্লা"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Passport & Professional Trade Details */}
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0f3260] text-white text-xs font-bold flex items-center justify-center">
                ২
              </span>
              <h4 className="text-base font-bold text-neutral-900">
                {lang === 'bn' ? 'পাসপোর্ট ও কাজের অভিজ্ঞতার বিবরণ' : 'Passport, Trade & Skills'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'আপনার কি বৈধ পাসপোর্ট আছে?' : 'Do you hold a valid Passport?'}
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="passportOption"
                      checked={hasPassport}
                      onChange={() => setHasPassport(true)}
                      className="text-[#0f3260] focus:ring-[#0f3260]"
                    />
                    <span>{lang === 'bn' ? 'হ্যাঁ, পাসপোর্ট আছে' : 'Yes, have Passport'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="passportOption"
                      checked={!hasPassport}
                      onChange={() => setHasPassport(false)}
                      className="text-[#0f3260] focus:ring-[#0f3260]"
                    />
                    <span>{lang === 'bn' ? 'নতুন করব / জমা দিয়েছি' : 'Under Process / New'}</span>
                  </label>
                </div>
              </div>

              {hasPassport && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {lang === 'bn' ? 'পাসপোর্ট নম্বর (ঐচ্ছিক)' : 'Passport Number (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                    placeholder="যেমন: A01234567"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] uppercase"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'আপনি কোন পেশা বা ট্রেডে আবেদন করতে চান? *' : 'Target Trade / Job Role *'}
                </label>
                <select
                  value={primaryTrade}
                  onChange={(e) => setPrimaryTrade(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] bg-white"
                >
                  {tradeOptions.map((trade, idx) => (
                    <option key={idx} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'কাজের অভিজ্ঞতা' : 'Years of Work Experience'}
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] bg-white"
                >
                  <option value="নতুন / ফ্রেশার (Fresh/0 Years)">নতুন / ফ্রেশার (Fresh/0 Years)</option>
                  <option value="১-৩ বছর (1-3 Years)">১-৩ বছর (1-3 Years)</option>
                  <option value="৩-৫ বছর (3-5 Years)">৩-৫ বছর (3-5 Years)</option>
                  <option value="৫+ বছর (5+ Years)">৫+ বছর (5+ Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'সর্বোচ্চ শিক্ষাগত যোগ্যতা' : 'Highest Education'}
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] bg-white"
                >
                  <option value="৮ম শ্রেণি / প্রাথমিক (Primary / 8th)">৮ম শ্রেণি / প্রাথমিক (Primary / 8th)</option>
                  <option value="এসএসসি পাস (SSC / 10th)">এসএসসি পাস (SSC / 10th)</option>
                  <option value="এইচএসসি পাস (HSC / 12th)">এইচএসসি পাস (HSC / 12th)</option>
                  <option value="ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (Diploma)">ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (Diploma)</option>
                  <option value="স্নাতক / ডিগ্রি (Graduate)">স্নাতক / ডিগ্রি (Graduate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'ইংরেজি ভাষার দক্ষতা' : 'English Communication Skill'}
                </label>
                <select
                  value={englishSkill}
                  onChange={(e) => setEnglishSkill(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] focus:border-[#0f3260] bg-white"
                >
                  <option value="প্রাথমিক কথা বলতে পারি (Basic)">প্রাথমিক কথা বলতে পারি (Basic)</option>
                  <option value="সাধারণ কাজের উপযোগী (Functional)">সাধারণ কাজের উপযোগী (Functional)</option>
                  <option value="ভালো ও সাবলীল (Fluent)">ভালো ও সাবলীল (Fluent)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'ইউরোপাস (Europass) সিভি আছে কি?' : 'Do you have Europass CV?'}
                </label>
                <div className="flex gap-3 pt-1">
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="cvOption"
                      checked={needsCvCreation}
                      onChange={() => setNeedsCvCreation(true)}
                    />
                    <span>{lang === 'bn' ? 'না, আপনারা বানিয়ে দিন' : 'No, please draft for me'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="cvOption"
                      checked={!needsCvCreation}
                      onChange={() => setNeedsCvCreation(false)}
                    />
                    <span>{lang === 'bn' ? 'হ্যাঁ, আমার তৈরি আছে' : 'Yes, I have it ready'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Target European Countries */}
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0f3260] text-white text-xs font-bold flex items-center justify-center">
                  ৩
                </span>
                <h4 className="text-base font-bold text-neutral-900">
                  {lang === 'bn' ? 'কাঙ্ক্ষিত ইউরোপীয় দেশসমূহ নির্বাচন করুন' : 'Target European Countries'}
                </h4>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {selectedCountries.length} {lang === 'bn' ? 'টি দেশ নির্বাচিত' : 'Selected'}
              </span>
            </div>

            <p className="text-xs text-neutral-600">
              {lang === 'bn'
                ? 'আপনার ট্রেড অনুযায়ী নিচের দেশগুলোর সরকারি স্পনসর কোম্পানিতে অগ্রাধিকার ভিত্তিতে আবেদন পাঠানো হবে:'
                : 'Applications will be prioritized across verified sponsor companies in these selected countries:'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {countryOptions.map((country, idx) => {
                const isSelected = selectedCountries.includes(country);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleCountry(country)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0f3260] bg-blue-50 text-[#0f3260] shadow-xs ring-1 ring-[#0f3260]'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <span>{country}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0f3260]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: 3-Step Service Agreement (The user's required reality acknowledgment) */}
          <div className="space-y-3 bg-neutral-50 border border-neutral-300 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                ৪
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-neutral-900">
                {lang === 'bn'
                  ? 'স্বচ্ছ সার্ভিস প্রক্রিয়া ও সত্যতা স্বীকারোক্তি'
                  : '3-Step Service Reality Agreement'}
              </h4>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {lang === 'bn'
                ? 'RRR Visa Help কোনো প্রতারক ভিসা চক্র বা অবৈধ ফাইল জমা নেওয়া প্রতিষ্ঠান নয়। আমাদের চুক্তি সম্পূর্ণ স্পষ্ট:'
                : 'RRR Visa Help guarantees genuine job applications and company interview arrangements:'}
            </p>

            <label className="flex items-start gap-2.5 text-xs text-neutral-800 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={serviceAgreed}
                onChange={(e) => setServiceAgreed(e.target.checked)}
                className="mt-0.5 rounded text-[#0f3260] focus:ring-[#0f3260] w-4 h-4 shrink-0"
              />
              <span className="leading-relaxed">
                {lang === 'bn'
                  ? 'আমি স্বীকার করছি যে: (১) RRR আমার হয়ে ইউরোপের কোম্পানিগুলোতে চাকরির আবেদন জমা দেবে, (২) কোম্পানি পছন্দ করলে তাদের সাথে আমার অনলাইন ভিডিও মিটিং/ইন্টারভিউ করাবে, (৩) মিটিংয়ে উত্তীর্ণ হলে জব অফার আসার পর আমার এম্বাসি ফেসের অ্যাপয়েন্টমেন্ট বুকিং করে দেবে। এর বাইরে কোনো অবাস্তব ফাইল জমার ভিত্তিহীন দাবি থাকবে না।'
                  : 'I acknowledge that RRR submits genuine job applications, coordinates direct video meetings if selected by employers, and books embassy appointments once an offer is secured.'}
              </span>
            </label>
          </div>

          {/* Step 5: Official Payment & Mandatory TrxID */}
          <div className="space-y-4 bg-emerald-50/50 border border-emerald-300 rounded-xl p-5 sm:p-6">
            <div className="border-b border-emerald-200 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                  ৫
                </span>
                <h4 className="text-base font-bold text-neutral-900">
                  {lang === 'bn' ? 'অফিসিয়াল পেমেন্ট ও ট্রানজেকশন কোড (TrxID)' : 'Payment & Transaction Code'}
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-800 font-mono">
                সার্ভিস ফি: ৳{effectivePrice.toLocaleString()}
              </span>
            </div>

            <div className="bg-white border border-emerald-300 rounded-xl p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
                    {lang === 'bn' ? 'বিকাশ / নগদ / রকেট পার্সোনাল নম্বর:' : 'bKash / Nagad / Rocket Personal:'}
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-900 tracking-wider">
                    {paymentNumber}
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {lang === 'bn' ? 'Send Money / সেন্ড মানি করুন' : 'Send Money to this personal number'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPaymentNumber}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedNumber ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedNumber ? 'নম্বর কপি হয়েছে' : 'পেমেন্ট নম্বর কপি করুন'}</span>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                {lang === 'bn' ? 'আপনি কোন মাধ্যমে পেমেন্ট করেছেন?' : 'Selected Payment Method:'}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['bKash', 'Nagad', 'Rocket'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === method
                        ? 'bg-[#0f3260] text-white border-[#0f3260] shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {lang === 'bn' ? 'যে নম্বর থেকে টাকা পাঠিয়েছেন' : 'Sender Phone Number'}
                </label>
                <input
                  type="tel"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#0f3260] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-900 mb-1">
                  {lang === 'bn' ? 'পেমেন্ট ট্রানজেকশন কোড (TrxID) *' : 'Payment Transaction ID (TrxID) *'}
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                  placeholder="যেমন: 8N7X29A10B"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase border-2 border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-700 bg-white"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  {lang === 'bn'
                    ? `টাকা পাঠানোর পর প্রাপ্ত মেসেজ থেকে ট্রানজেকশন কোডটি হুবহু লিখুন`
                    : 'Mandatory transaction code received in confirmation SMS'}
                </span>
              </div>
            </div>
          </div>

          {/* Submission and 3D Buttons */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="w-full py-4 px-6 btn-3d-navy rounded-xl text-sm sm:text-base font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 text-white"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {lang === 'bn'
                  ? `আবেদনপত্র ও TrxID জমা দিন (৳${effectivePrice.toLocaleString()})`
                  : `Submit Full Application & TrxID (৳${effectivePrice.toLocaleString()})`}
              </span>
            </button>

            <div className="text-center">
              <span className="text-xs text-neutral-500">
                {lang === 'bn'
                  ? 'কোনো জটিলতা থাকলে সরাসরি আমাদের ৩D হেল্পলাইনে যুক্ত হন:'
                  : 'Need immediate help? Reach our official channels:'}
              </span>
            </div>

            {/* 3D Contact Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${cleanHotline}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 btn-3d-whatsapp rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {paymentNumber}</span>
              </a>

              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 btn-3d-telegram rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Telegram @{CONTACT_INFO.telegramUser}</span>
              </a>

              <a
                href={`tel:${paymentNumber.replace(/[^0-9]/g, '')}`}
                className="px-4 py-2.5 btn-3d-imo rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>IMO / কল: +880 1845-130981</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
