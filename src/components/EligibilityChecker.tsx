import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../data/visaData';
import { Language, VisaCategory } from '../types/visa';
import { CheckCircle2, AlertCircle, ArrowRight, Calculator, FileCheck2, Sparkles, RefreshCcw } from 'lucide-react';

interface EligibilityCheckerProps {
  lang: Language;
  preselectedCountry?: string;
  onBookWithProfile: (details: { country: string; visaType: string; score: number }) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  lang,
  preselectedCountry = 'schengen',
  onBookWithProfile,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(preselectedCountry);

  useEffect(() => {
    if (preselectedCountry) {
      setSelectedCountryId(preselectedCountry);
    }
  }, [preselectedCountry]);

  const [visaCategory, setVisaCategory] = useState<VisaCategory>('tourist');
  const [profession, setProfession] = useState<string>('corporate');
  const [bankBalance, setBankBalance] = useState<string>('mid');
  const [travelHistory, setTravelHistory] = useState<string>('sea');
  const [taxStatus, setTaxStatus] = useState<string>('regular');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  const selectedCountry = COUNTRIES.find((c) => c.id === selectedCountryId) || COUNTRIES[0];

  // Calculate scoring algorithm
  const computeScore = () => {
    let score = 50;

    // Profession
    if (profession === 'corporate' || profession === 'professional') score += 18;
    else if (profession === 'business') score += 16;
    else if (profession === 'student') score += 12;
    else score += 8;

    // Bank Balance
    if (bankBalance === 'high') score += 20;
    else if (bankBalance === 'mid') score += 15;
    else if (bankBalance === 'low') score += 8;
    else score += 2;

    // Travel History
    if (travelHistory === 'tier1') score += 16;
    else if (travelHistory === 'sea') score += 10;
    else if (travelHistory === 'regional') score += 5;
    else score += 1;

    // Tax status
    if (taxStatus === 'regular') score += 10;
    else if (taxStatus === 'tin_only') score += 4;
    else score += 0;

    // Destination specifics
    if (selectedCountry.id === 'uae' || selectedCountry.id === 'saudi' || selectedCountry.id === 'malaysia') {
      score = Math.min(99, score + 12);
    }

    return Math.min(98, Math.max(38, score));
  };

  const calculatedScore = computeScore();

  const getLikelihood = (score: number) => {
    if (score >= 85) {
      return {
        labelEn: 'Very High Approval Likelihood',
        labelBn: 'ভিসা অনুমোদনের অত্যন্ত উচ্চ সম্ভাবনা',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'text-emerald-700'
      };
    } else if (score >= 70) {
      return {
        labelEn: 'Strong Profile with Minor Refinements Needed',
        labelBn: 'ভালো প্রোফাইল - সামান্য ডকুমেন্টস সংযোজন প্রয়োজন',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        badge: 'text-blue-700'
      };
    } else {
      return {
        labelEn: 'Moderate Profile - Professional File Structuring Advised',
        labelBn: 'মধ্যম মানের প্রোফাইল - বিশেষজ্ঞ ফাইল অডিট জরুরি',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        badge: 'text-amber-700'
      };
    }
  };

  const likelihood = getLikelihood(calculatedScore);

  return (
    <section id="eligibility" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {lang === 'bn' ? 'স্মার্ট মূল্যায়ন টুল' : 'Automated Evaluation Engine'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {lang === 'bn' ? 'অনলাইন ভিসা যোগ্যতা ও ফি ক্যালকুলেটর' : 'Visa Eligibility & File Strength Assessment'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {lang === 'bn'
              ? 'আপনার পেশা, আর্থিক সক্ষমতা ও ভ্রমণের ইতিহাস নির্বাচন করে তাৎক্ষণিক ফাইল স্কোর ও প্রয়োজনীয় পরামর্শ জেনে নিন।'
              : 'Calculate your visa approval likelihood based on embassy benchmarks, financial solvency, and travel record.'}
          </p>
        </div>

        {/* 2-Column Split: Controls on Left, Live Scoreboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 rounded-xl p-6 sm:p-7 space-y-6">
            {/* Step 1: Destination & Visa Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? '১. গন্তব্য দেশ' : '1. Target Destination'}
                </label>
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {lang === 'bn' ? c.nameBn : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? '২. ভিসার ধরন' : '2. Visa Category'}
                </label>
                <select
                  value={visaCategory}
                  onChange={(e) => setVisaCategory(e.target.value as VisaCategory)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="tourist">{lang === 'bn' ? 'ট্যুরিস্ট / ভিজিট ভিসা' : 'Tourist / Visitor Visa'}</option>
                  <option value="student">{lang === 'bn' ? 'স্টুডেন্ট / উচ্চশিক্ষা ভিসা' : 'Student / Higher Education'}</option>
                  <option value="business">{lang === 'bn' ? 'বিজনেস / কনফারেন্স ভিসা' : 'Business / Conference Visa'}</option>
                  <option value="work">{lang === 'bn' ? 'ওয়ার্ক / কর্মসংস্থান ভিসা' : 'Work / Employment'}</option>
                </select>
              </div>
            </div>

            {/* Step 2: Profession & Employment */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                {lang === 'bn' ? '৩. পেশাগত বিবরণ' : '3. Primary Profession / Occupation'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'corporate', labelEn: 'Corporate Service', labelBn: 'চাকুরিজীবী (প্রাইভেট)' },
                  { id: 'business', labelEn: 'Business Owner', labelBn: 'ব্যবসায়ী / স্বত্বাধিকারী' },
                  { id: 'professional', labelEn: 'Doctor / Engineer', labelBn: 'ডাক্তার / প্রকৌশলী' },
                  { id: 'student', labelEn: 'Student / Graduate', labelBn: 'শিক্ষার্থী / গ্র্যাজুয়েট' },
                  { id: 'govt', labelEn: 'Govt / Semi-Govt', labelBn: 'সরকারি কর্মকর্তা' },
                  { id: 'other', labelEn: 'Other / Dependent', labelBn: 'অন্যান্য / নির্ভরশীল' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProfession(item.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border text-left transition-colors cursor-pointer ${
                      profession === item.id
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {lang === 'bn' ? item.labelBn : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Bank Balance Range */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                {lang === 'bn' ? '৪. ৬ মাসের ব্যাংক স্থিতি (ব্যাংক ব্যালেন্স)' : '4. Six-Month Bank Statement Balance'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'low', labelEn: 'Under ৳3 Lakh', labelBn: '৩ লাখের নিচে' },
                  { id: 'mid', labelEn: '৳4 - ৳8 Lakh', labelBn: '৪ থেকে ৮ লাখ টাকা' },
                  { id: 'high', labelEn: '৳9 - ৳15 Lakh', labelBn: '৯ থেকে ১৫ লাখ টাকা' },
                  { id: 'ultra', labelEn: '৳15 Lakh+', labelBn: '১৫ লাখ টাকার উপরে' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBankBalance(item.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border text-center transition-colors cursor-pointer ${
                      bankBalance === item.id
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {lang === 'bn' ? item.labelBn : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Travel History & Tax Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? '৫. পূর্বের ভ্রমণ অভিজ্ঞতা' : '5. Previous Travel History'}
                </label>
                <select
                  value={travelHistory}
                  onChange={(e) => setTravelHistory(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="none">{lang === 'bn' ? 'নতুন পাসপোর্ট (কোনো ভ্রমণ নেই)' : 'Fresh Passport (No travel history)'}</option>
                  <option value="regional">{lang === 'bn' ? 'ভারত / নেপাল / ভুটান ভ্রমণ' : 'India / Nepal / SAARC travel'}</option>
                  <option value="sea">{lang === 'bn' ? 'থাইল্যান্ড / মালয়েশিয়া / সিঙ্গাপুর' : 'Thailand / Malaysia / Singapore'}</option>
                  <option value="tier1">{lang === 'bn' ? 'ইউরোপ / ইউকে / আমেরিকা / জাপান' : 'Schengen / UK / USA / Japan visa'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? '৬. ই-টিন ও ট্যাক্স রিটার্ন' : '6. Tax & E-TIN Filing'}
                </label>
                <select
                  value={taxStatus}
                  onChange={(e) => setTaxStatus(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="regular">{lang === 'bn' ? 'নিয়মিত ট্যাক্স রিটার্ন জমা দেওয়া হয়' : 'Regular 2-3 years Tax Return filed'}</option>
                  <option value="tin_only">{lang === 'bn' ? 'শুধু ই-টিন আছে, রিটার্ন নেই' : 'E-TIN Certificate only, no return'}</option>
                  <option value="none">{lang === 'bn' ? 'টিন বা ট্যাক্স ফাইল নেই' : 'No TIN or Tax file'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Scoreboard */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {lang === 'bn' ? 'আপনার ফাইল মূল্যায়ন' : 'File Assessment Result'}
                  </div>
                  <div className="text-lg font-bold text-neutral-900 mt-0.5">
                    {selectedCountry.flag} {lang === 'bn' ? selectedCountry.nameBn : selectedCountry.nameEn}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
                    {calculatedScore}%
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">
                    {lang === 'bn' ? 'অনুমোদন স্কোর' : 'Calculated Index'}
                  </div>
                </div>
              </div>

              {/* Likelihood banner */}
              <div className={`mt-4 p-3 rounded-lg border text-xs font-medium ${likelihood.color}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{lang === 'bn' ? likelihood.labelBn : likelihood.labelEn}</span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-neutral-500 mb-1 font-mono">
                  <span>Audit Threshold</span>
                  <span>{calculatedScore}/100</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      calculatedScore >= 80 ? 'bg-emerald-600' : calculatedScore >= 65 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${calculatedScore}%` }}
                  />
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="mt-5 space-y-2.5 text-xs text-neutral-600">
                <div className="font-semibold text-neutral-800">
                  {lang === 'bn' ? 'আরআরআর কনসালট্যান্টদের পরামর্শ:' : 'Consultant Recommendations:'}
                </div>

                {calculatedScore >= 80 ? (
                  <p className="bg-neutral-50 p-2.5 rounded border border-neutral-100">
                    {lang === 'bn'
                      ? 'আপনার প্রোফাইল অত্যন্ত শক্তিশালী। কোনো ভুল তথ্য না দিয়ে সময়মতো সঠিক ফরমেটে ফাইল সাজিয়ে জমা দিলে ভিসার নিশ্চয়তা থাকবে।'
                      : 'Your profile satisfies core consular criteria. Ensure bank statements reflect verifiable legitimate origins.'}
                  </p>
                ) : (
                  <p className="bg-neutral-50 p-2.5 rounded border border-neutral-100">
                    {lang === 'bn'
                      ? 'ভিসা শতভাগ নিশ্চিত করতে আপনার ফাইলের সাথে একটি সুনির্দিষ্ট কভার লেটার (SOP) এবং সম্পদ মূল্যায়ন রিপোর্ট সংযোজন করতে হবে।'
                      : 'We recommend complementing your file with an asset valuation report and detailed employment NOC to eliminate home ties concerns.'}
                  </p>
                )}

                <div className="pt-3 border-t border-neutral-100 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-neutral-600">
                    <span>{lang === 'bn' ? 'সরকারি দূতাবাস ফি:' : 'Official Consular Fee:'}</span>
                    <span className="font-bold text-neutral-900">{selectedCountry.embassyFee}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>{lang === 'bn' ? 'আরআরআর ফাইল অডিট ফি:' : 'RRR Processing Fee:'}</span>
                    <span className="font-bold text-neutral-900">৳{selectedCountry.serviceFeeBDT.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>{lang === 'bn' ? 'আনুমানিক প্রসেসিং সময়:' : 'Turnaround:'}</span>
                    <span className="text-neutral-900">{lang === 'bn' ? selectedCountry.processingTimeBn : selectedCountry.processingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <button
                onClick={() =>
                  onBookWithProfile({
                    country: selectedCountry.nameEn,
                    visaType: visaCategory,
                    score: calculatedScore,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
              >
                <span>
                  {lang === 'bn' ? 'এই ফাইলের জন্য কনসালটেন্সি বুক করুন' : 'Proceed with This File Profile'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
