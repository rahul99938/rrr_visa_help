import React, { useState } from 'react';
import { SCHENGEN_COUNTRIES_PORTALS } from '../data/jobData';
import { Language } from '../types/visa';
import { SchengenPortalInfo } from '../types/job';
import { Search, ExternalLink, ShieldCheck, CheckCircle2, Globe2, Building2 } from 'lucide-react';

interface SchengenPortalsDirectoryProps {
  lang: Language;
}

export const SchengenPortalsDirectory: React.FC<SchengenPortalsDirectoryProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortals = SCHENGEN_COUNTRIES_PORTALS.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      p.countryEn.toLowerCase().includes(q) ||
      p.countryBn.toLowerCase().includes(q) ||
      p.officialAgencyName.toLowerCase().includes(q) ||
      p.workPermitNameEn.toLowerCase().includes(q)
    );
  });

  return (
    <section id="schengen-portals" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'bn' ? '১০০% আসল ও অনুমোদিত সরকারি লিংক (নো বাটপারি)' : '100% Verified European Official Government Portals'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {lang === 'bn' ? 'ইউরোপের ২৯টি শেনজেন দেশের অফিশিয়াল চাকরির সাইট' : 'All 29 Schengen Countries Official Job Portals'}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'দালাল বা প্রতারক চক্রের হাত থেকে বাঁচতে সরাসরি ইউরোপের প্রতিটি দেশের সরকারি শ্রম অধিদপ্তর ও EURES ইউরোপিয়ান জব পোর্টালে চাকরির নিয়োগ যাচাই করুন।'
                : 'Direct access to certified government employment agencies and EURES European registries across all 29 Schengen member states.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'শেনজেন দেশ খুঁজুন (যেমন: ইতালি, জার্মানি...)' : 'Search country (e.g. Italy, Germany...)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#0f3260] focus:bg-white"
            />
          </div>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortals.map((portal) => (
            <div
              key={portal.id}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 shadow-xs hover:border-[#0f3260] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Flag & Country */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{portal.flag}</span>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 leading-none">
                        {lang === 'bn' ? portal.countryBn : portal.countryEn}
                      </h3>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Schengen Zone Member
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {portal.averageMonthlySalaryEur}
                  </span>
                </div>

                {/* Agency Name */}
                <div className="mb-2">
                  <span className="text-[11px] text-neutral-500 block uppercase font-medium">
                    {lang === 'bn' ? 'অফিশিয়াল শ্রম অধিদপ্তর:' : 'Official Employment Agency:'}
                  </span>
                  <span className="text-xs font-bold text-[#0f3260]">
                    {portal.officialAgencyName}
                  </span>
                </div>

                {/* Work Permit Name */}
                <div className="mb-3 text-xs text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200/80">
                  <span className="text-[10px] text-neutral-500 block font-semibold">
                    {lang === 'bn' ? 'ভিসা ও ওয়ার্ক পারমিটের ধরন:' : 'Work Permit Pathway:'}
                  </span>
                  <span className="font-medium text-neutral-900 mt-0.5 block">
                    {lang === 'bn' ? portal.workPermitNameBn : portal.workPermitNameEn}
                  </span>
                </div>

                {/* Top Bangladeshi in-demand trades */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    {lang === 'bn' ? 'বেশি চাহিদাসম্পন্ন পেশা:' : 'High Demand Trades:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(lang === 'bn' ? portal.topInDemandTradesBn : portal.topInDemandTradesEn).map((trade, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium bg-white text-neutral-700 border border-neutral-200 rounded px-1.5 py-0.5"
                      >
                        {trade}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                <a
                  href={portal.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0f3260] hover:bg-[#0c274a] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <span>{lang === 'bn' ? 'সরকারি চাকরির সাইট' : 'Govt Job Portal'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={portal.euresUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 py-2 px-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg transition-colors"
                  title="EURES European Union Central Job Board"
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>EURES</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
