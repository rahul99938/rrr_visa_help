import React, { useState } from 'react';
import { JobCircular, JobTradeCategory } from '../types/job';
import { Language } from '../types/visa';
import { X, Link2, Building, MapPin, Banknote, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PostJobModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: (newJob: JobCircular) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  lang,
  isOpen,
  onClose,
  onJobAdded,
}) => {
  const [originalLink, setOriginalLink] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('Romania');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<JobTradeCategory>('factory');
  const [salaryEur, setSalaryEur] = useState('€1,000 / month');
  const [visaSponsorship, setVisaSponsorship] = useState(true);
  const [accommodationProvided, setAccommodationProvided] = useState(true);
  const [foodProvided, setFoodProvided] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const countryFlags: Record<string, { flag: string; bn: string }> = {
    Romania: { flag: '🇷🇴', bn: 'রোমানিয়া' },
    Poland: { flag: '🇵🇱', bn: 'পোল্যান্ড' },
    Italy: { flag: '🇮🇹', bn: 'ইতালি' },
    Portugal: { flag: '🇵🇹', bn: 'পর্তুগাল' },
    Malta: { flag: '🇲🇹', bn: 'মাল্টা' },
    Germany: { flag: '🇩🇪', bn: 'জার্মানি' },
    Lithuania: { flag: '🇱🇹', bn: 'লিথুয়ানিয়া' },
    Croatia: { flag: '🇭🇷', bn: 'ক্রোয়েশিয়া' },
    Other: { flag: '🇪🇺', bn: 'অন্যান্য ইউরোপ' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalLink.trim() || !title.trim() || !company.trim()) {
      setErrorMsg(
        lang === 'bn'
          ? 'দয়া করে সার্কুলার লিংক, চাকরির নাম ও কোম্পানির নাম লিখুন।'
          : 'Please provide the circular link, job title, and company name.'
      );
      return;
    }

    const flagInfo = countryFlags[country] || { flag: '🇪🇺', bn: country };

    // Calculate approximate BDT equivalent
    const eurNum = parseInt(salaryEur.replace(/[^0-9]/g, '')) || 1000;
    const bdtApprox = `~৳${(eurNum * 132).toLocaleString()} / মাস`;

    const parsedRequirements = requirements.trim()
      ? requirements.split('\n').filter((r) => r.trim().length > 0)
      : [
          'Valid passport with at least 18 months validity',
          'Medical fitness certificate',
          'Basic English communication skill'
        ];

    const newJob: JobCircular = {
      id: `job-user-${Date.now()}`,
      titleEn: title,
      titleBn: title,
      company: company,
      country: country,
      countryBn: flagInfo.bn,
      flag: flagInfo.flag,
      city: city.trim() || 'Capital City',
      category: category,
      salaryEur: salaryEur.includes('€') ? salaryEur : `€${salaryEur} / month`,
      salaryBDT: bdtApprox,
      contractType: 'Official Work Permit Contract',
      visaSponsorship,
      accommodationProvided,
      foodProvided,
      originalLink: originalLink.startsWith('http') ? originalLink : `https://${originalLink}`,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: 'Open / Ongoing Hiring',
      sourceName: 'Employer Direct Registry',
      requirementsEn: parsedRequirements,
      requirementsBn: parsedRequirements,
    };

    onJobAdded(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl border border-neutral-200">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              {lang === 'bn' ? 'ইউরোপের চাকরির সার্কুলার লিংক যুক্ত করুন' : 'Post European Company Job Link'}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              {lang === 'bn'
                ? 'যেকোনো কোম্পানি বা ইউরোপিয়ান দেশের চাকরির সার্কুলার লিংক এখানে শেয়ার করুন।'
                : 'Paste any European employer vacancy link to showcase it on our live hub.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Circular Original URL */}
          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              {lang === 'bn' ? 'চাকরির মূল সার্কুলার / কোম্পানি ওয়েবসাইট লিংক *' : 'Job Circular / Company Source URL *'}
            </label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                value={originalLink}
                onChange={(e) => setOriginalLink(e.target.value)}
                placeholder="https://company.com/careers/job-vacancy-102"
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Job Title & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'পদের নাম (Job Title) *' : 'Job Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: ফ্যাক্টরি কর্মী / ড্রাইভার' : 'e.g. Factory Worker / Driver'}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'কোম্পানির নাম (Company Name) *' : 'Company Name *'}
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. DHL Logistics / Euro Foods"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'দেশ (Country)' : 'Country'}
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                {Object.keys(countryFlags).map((cName) => (
                  <option key={cName} value={cName}>
                    {countryFlags[cName].flag} {countryFlags[cName].bn} ({cName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'শহর / অঞ্চল (City)' : 'City / Location'}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bucharest, Warsaw, Lisbon"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Category & Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'কাজের খাত (Trade / Sector)' : 'Sector'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              >
                <option value="factory">{lang === 'bn' ? 'ফ্যাক্টরি ও প্যাকেজিং' : 'Factory & Packaging'}</option>
                <option value="construction">{lang === 'bn' ? 'নির্মাণ ও রাজমিস্ত্রি' : 'Construction & Mason'}</option>
                <option value="driving">{lang === 'bn' ? 'ড্রাইভার (হেভি/লাইট)' : 'Drivers & Transport'}</option>
                <option value="welding_electric">{lang === 'bn' ? 'ওয়েল্ডার ও ইলেকট্রিশিয়ান' : 'Welder & Electrician'}</option>
                <option value="hospitality">{lang === 'bn' ? 'হোটেল ও রেস্টুরেন্ট' : 'Hospitality & Crew'}</option>
                <option value="agriculture">{lang === 'bn' ? 'কৃষি ও খামার' : 'Agriculture & Farm'}</option>
                <option value="cleaning_security">{lang === 'bn' ? 'ক্লিনার ও সিকিউরিটি' : 'Cleaner & Security'}</option>
                <option value="caregiver">{lang === 'bn' ? 'কেয়ারগিভার ও নার্সিং' : 'Caregiver & Nursing'}</option>
                <option value="it_tech">{lang === 'bn' ? 'আইটি ও ডাটা এন্ট্রি' : 'IT & Data Entry'}</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                {lang === 'bn' ? 'মাসিক বেতন (Salary in EUR)' : 'Monthly Salary (EUR)'}
              </label>
              <input
                type="text"
                value={salaryEur}
                onChange={(e) => setSalaryEur(e.target.value)}
                placeholder="e.g. €950 - €1,200 / month"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Benefit Toggles */}
          <div className="pt-2 border-t border-neutral-200">
            <span className="block font-semibold text-neutral-800 mb-2">
              {lang === 'bn' ? 'সুবিধাসমূহ:' : 'Employer Facilities:'}
            </span>
            <div className="flex flex-wrap items-center gap-4 text-neutral-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visaSponsorship}
                  onChange={(e) => setVisaSponsorship(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-0"
                />
                <span>{lang === 'bn' ? 'ভিসা স্পন্সরশিপ আছে' : 'Visa Sponsorship'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accommodationProvided}
                  onChange={(e) => setAccommodationProvided(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-0"
                />
                <span>{lang === 'bn' ? 'থাকা ফ্রি' : 'Free Accommodation'}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={foodProvided}
                  onChange={(e) => setFoodProvided(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-0"
                />
                <span>{lang === 'bn' ? 'খাওয়া ফ্রি' : 'Free Meals'}</span>
              </label>
            </div>
          </div>

          {/* Requirements textarea */}
          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              {lang === 'bn' ? 'আবেদনের শর্তাবলী (প্রতি লাইনে একটি করে)' : 'Requirements (One per line)'}
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'কমপক্ষে ২ বছরের পাসপোর্ট মেয়াদ\nবেসিক ইংরেজি দক্ষতা\nশারীরিক সুস্থতা'
                  : 'Valid passport for 2 years\nBasic English communication\nClean police clearance'
              }
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 font-semibold">{errorMsg}</p>
          )}

          <div className="pt-3 border-t border-neutral-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {lang === 'bn' ? 'বিজ্ঞাপন লিংক প্রকাশ করুন' : 'Publish Job Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
