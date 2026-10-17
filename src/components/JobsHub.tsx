import React, { useState } from 'react';
import { JobCircular, JobTradeCategory } from '../types/job';
import { Language } from '../types/visa';
import { CONTACT_INFO, SCHENGEN_COUNTRIES_PORTALS } from '../data/jobData';
import {
  Search,
  ExternalLink,
  MapPin,
  Building2,
  Banknote,
  Briefcase,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles
} from 'lucide-react';

interface JobsHubProps {
  lang: Language;
  jobs: JobCircular[];
  onOpenPostJobModal: () => void;
  onApplyThroughRRR: (job: JobCircular) => void;
  onNavigateToSchengen: () => void;
  paymentNumber?: string;
}

export const JobsHub: React.FC<JobsHubProps> = ({
  lang,
  jobs,
  onOpenPostJobModal,
  onApplyThroughRRR,
  onNavigateToSchengen,
  paymentNumber = CONTACT_INFO.paymentNumber,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // All 29 Schengen countries + Popular
  const popularCountries = [
    { id: 'all', labelEn: 'All Europe', labelBn: 'সকল ইউরোপ' },
    { id: 'Romania', labelEn: 'Romania 🇷🇴', labelBn: 'রোমানিয়া 🇷🇴' },
    { id: 'Poland', labelEn: 'Poland 🇵🇱', labelBn: 'পোল্যান্ড 🇵🇱' },
    { id: 'Italy', labelEn: 'Italy 🇮🇹', labelBn: 'ইতালি 🇮🇹' },
    { id: 'Portugal', labelEn: 'Portugal 🇵🇹', labelBn: 'পর্তুগাল 🇵🇹' },
    { id: 'Germany', labelEn: 'Germany 🇩🇪', labelBn: 'জার্মানি 🇩🇪' },
    { id: 'Malta', labelEn: 'Malta 🇲🇹', labelBn: 'মাল্টা 🇲🇹' },
    { id: 'Croatia', labelEn: 'Croatia 🇭🇷', labelBn: 'ক্রোয়েশিয়া 🇭🇷' },
    { id: 'Lithuania', labelEn: 'Lithuania 🇱🇹', labelBn: 'লিথুয়ানিয়া 🇱🇹' },
    { id: 'Cyprus', labelEn: 'Cyprus 🇨🇾', labelBn: 'সাইপ্রাস 🇨🇾' },
    { id: 'Netherlands', labelEn: 'Netherlands 🇳🇱', labelBn: 'নেদারল্যান্ডস 🇳🇱' },
  ];

  // Specific Bangladeshi migrant job trades
  const tradeCategories = [
    { id: 'all', labelEn: 'All Trades', labelBn: 'সকল পেশা' },
    { id: 'factory', labelEn: 'Factory & Food Packing', labelBn: 'ফ্যাক্টরি ও প্যাকেজিং' },
    { id: 'construction', labelEn: 'Construction & Mason', labelBn: 'নির্মাণ ও রাজমিস্ত্রি' },
    { id: 'driving', labelEn: 'Heavy & Light Drivers', labelBn: 'ড্রাইভার ও ডেলিভারি' },
    { id: 'welding_electric', labelEn: 'Welder & Electrician', labelBn: 'ওয়েল্ডার ও ইলেকট্রিশিয়ান' },
    { id: 'hospitality', labelEn: 'Hotel, Restaurant & Kitchen', labelBn: 'হোটেল ও রেস্টুরেন্ট' },
    { id: 'agriculture', labelEn: 'Agriculture & Farm Picking', labelBn: 'কৃষি ও খামার' },
    { id: 'cleaning_security', labelEn: 'Cleaner & Security Guard', labelBn: 'ক্লিনার ও সিকিউরিটি' },
    { id: 'caregiver', labelEn: 'Caregiver & Healthcare', labelBn: 'কেয়ারগিভার ও নার্সিং' },
    { id: 'it_tech', labelEn: 'IT & Data Entry', labelBn: 'আইটি ও ডাটা এন্ট্রি' },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCountry = selectedCountry === 'all' || job.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      job.titleEn.toLowerCase().includes(query) ||
      job.titleBn.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.country.toLowerCase().includes(query) ||
      job.city.toLowerCase().includes(query);

    return matchesCountry && matchesCategory && matchesQuery;
  });

  const handleCopyLink = (job: JobCircular) => {
    navigator.clipboard.writeText(job.originalLink);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="jobs" className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'bn' ? '১০০% আসল ও অনুমোদিত কোম্পানি সার্কুলার' : '100% Authentic European Employer Registry'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {lang === 'bn' ? 'ইউরোপিয়ান কোম্পানি নিয়োগ বিজ্ঞপ্তি ও লিংক' : 'Verified European Job Openings & Direct Links'}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'রোমানিয়া, পোল্যান্ড, ইতালি, পর্তুগাল, জার্মানি সহ ইউরোপের সরকার অনুমোদিত স্পন্সর কোম্পানিগুলোর আসল নিয়োগ সার্কুলার লিংক। কোনো ভুয়া বা দালাল চক্রের সাইট নেই। আপনি নিজে আবেদন করতে পারেন অথবা আমাদের মাধ্যমে একসাথে ১০০টি কোম্পানিতে আবেদন করাতে পারেন।'
                : 'Direct employer circulars across all European Schengen countries. Filter by your exact profession, inspect original links, or let RRR Visa Help submit 100 applications for you.'}
            </p>
          </div>

          {/* Action to Post New Job Link & View 29 Schengen Portals */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={onNavigateToSchengen}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white border border-neutral-300 hover:border-[#0f3260] text-neutral-800 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs text-center"
            >
              <Globe2 className="w-4 h-4 text-[#0f3260] shrink-0" />
              <span>{lang === 'bn' ? '২৯টি শেনজেন সরকারি পোর্টাল' : '29 Official Govt Portals'}</span>
            </button>

            <button
              onClick={onOpenPostJobModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0f3260] hover:bg-[#0c274a] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer text-center"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>{lang === 'bn' ? 'নতুন চাকরির লিংক পোস্ট করুন' : 'Post / Paste Job Link'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs space-y-4">
          {/* Top Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'চাকরির পদবী (ফ্যাক্টরি, ড্রাইভার, রাজমিস্ত্রি), দেশ, বা কোম্পানির নাম লিখুন...'
                  : 'Search by profession (factory, driver, mason...), country, company name...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0f3260] focus:bg-white"
            />
          </div>

          {/* Trade / Bangladeshi Profession Filter */}
          <div className="pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-800 block mb-2">
              {lang === 'bn' ? 'আপনার পেশা নির্বাচন করুন:' : 'Filter by Trade / Profession:'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {tradeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0f3260] text-white font-bold shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {lang === 'bn' ? cat.labelBn : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Country Filter */}
          <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-neutral-800 mr-2 shrink-0">
              {lang === 'bn' ? 'দেশ:' : 'Country:'}
            </span>
            {popularCountries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCountry === c.id
                    ? 'bg-[#0c7c45] text-white font-bold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {lang === 'bn' ? c.labelBn : c.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-600 mb-6 font-mono gap-1">
          <span>
            {lang === 'bn'
              ? `মোট ${filteredJobs.length} টি ভেরিফাইড চাকরির সার্কুলার প্রদর্শিত হচ্ছে`
              : `Showing ${filteredJobs.length} verified European circulars`}
          </span>
          <span className="text-emerald-700 font-bold">
            {lang === 'bn' ? `পেমেন্ট ও TrxID সাপোর্ট: ${paymentNumber}` : `Verified Payment: ${paymentNumber}`}
          </span>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">
              {lang === 'bn' ? 'এই ফিল্টারে কোনো চাকরির সার্কুলার পাওয়া যায়নি' : 'No Circulars Match Your Filter'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              {lang === 'bn'
                ? 'পেশা বা দেশের ফিল্টার পরিবর্তন করুন অথবা আপনার পছন্দের চাকরির লিংক পোস্ট করুন।'
                : 'Try adjusting your filters or use the Post Job Link button to add a new circular.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs hover:border-[#0f3260] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Flag, Country & Posted Date */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{job.flag}</span>
                      <span className="font-bold text-neutral-900">
                        {lang === 'bn' ? job.countryBn : job.country}
                      </span>
                      <span>·</span>
                      <span>{job.city}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'আসল সার্কুলার' : 'Verified'}</span>
                    </div>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug mb-1.5">
                    {lang === 'bn' ? job.titleBn : job.titleEn}
                  </h3>

                  {/* Employer Name */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-4 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="font-semibold text-neutral-800">{job.company}</span>
                    <span className="text-neutral-400">({job.sourceName})</span>
                  </div>

                  {/* Salary & Benefits Strip */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 mb-4 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-neutral-800 font-medium">
                      <span className="flex items-center gap-1.5 text-neutral-600">
                        <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'bn' ? 'মাসিক বেতন:' : 'Monthly Salary:'}</span>
                      </span>
                      <span className="font-bold font-mono text-emerald-800 text-sm">
                        {job.salaryEur}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-500 font-mono text-right">
                      {job.salaryBDT}
                    </div>

                    {/* Unboxed benefits text with separators */}
                    <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center gap-2 text-[11px] text-neutral-700">
                      {job.visaSponsorship && (
                        <span className="font-semibold text-emerald-800">
                          {lang === 'bn' ? '✓ ভিসা স্পন্সরশিপ' : '✓ Visa Sponsorship'}
                        </span>
                      )}
                      {job.accommodationProvided && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-blue-800 font-semibold">
                            {lang === 'bn' ? '✓ ফ্রি থাকা' : '✓ Accommodation Provided'}
                          </span>
                        </>
                      )}
                      {job.foodProvided && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-semibold">
                            {lang === 'bn' ? '✓ ফ্রি খাওয়া' : '✓ Meal Provided'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Requirements List */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-neutral-800 block mb-1.5">
                      {lang === 'bn' ? 'প্রধান যোগ্যতাসমূহ:' : 'Requirements:'}
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-600 pl-4 list-disc">
                      {(lang === 'bn' ? job.requirementsBn : job.requirementsEn).slice(0, 3).map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions Footer */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  {/* Direct Link to Original Circular */}
                  <div className="flex items-center gap-2">
                    <a
                      href={job.originalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0f3260]/10 hover:bg-[#0f3260]/20 text-[#0f3260] text-xs font-bold rounded-lg transition-colors"
                      title="Visit Original Circular"
                    >
                      <span>{lang === 'bn' ? 'আসল সার্কুলার লিংক' : 'Original Circular'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleCopyLink(job)}
                      className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg text-xs transition-colors cursor-pointer"
                      title={lang === 'bn' ? 'লিংক কপি করুন' : 'Copy Link'}
                    >
                      {copiedId === job.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Signature Paid Application Service button */}
                  <button
                    onClick={() => onApplyThroughRRR(job)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0f3260] hover:bg-[#0c274a] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{lang === 'bn' ? '১০০ চাকরির আবেদন করান' : 'Apply via RRR'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
