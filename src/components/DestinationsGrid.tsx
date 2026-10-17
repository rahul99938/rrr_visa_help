import React, { useState } from 'react';
import { COUNTRIES } from '../data/visaData';
import { CountryVisaInfo, Language } from '../types/visa';
import { Clock, Banknote, ShieldAlert, CheckCircle, ArrowRight, FileText } from 'lucide-react';

interface DestinationsGridProps {
  lang: Language;
  onSelectCountryForChecklist: (countryId: string) => void;
  onSelectCountryForEligibility: (countryId: string) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  lang,
  onSelectCountryForChecklist,
  onSelectCountryForEligibility,
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [selectedCountryModal, setSelectedCountryModal] = useState<CountryVisaInfo | null>(null);

  const regionTabs = [
    { id: 'all', labelEn: 'All Destinations', labelBn: 'সকল গন্তব্য' },
    { id: 'europe', labelEn: 'Europe / Schengen', labelBn: 'ইউরোপ ও শেনজেন' },
    { id: 'north-america', labelEn: 'North America', labelBn: 'উত্তর আমেরিকা' },
    { id: 'middle-east', labelEn: 'Middle East & Gulf', labelBn: 'মধ্যপ্রাচ্য ও উপসাগর' },
    { id: 'asia-pacific', labelEn: 'Asia Pacific', labelBn: 'এশিয়া প্যাসিফিক' },
  ];

  const filteredCountries = activeRegion === 'all'
    ? COUNTRIES
    : COUNTRIES.filter((c) => c.region === activeRegion);

  return (
    <section id="destinations" className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'শীর্ষ গন্তব্য ও ভিসা নির্দেশিকা' : 'Global Portfolios & Visa Catalog'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {lang === 'bn' ? 'আপনার কাঙ্ক্ষিত দেশ নির্বাচন করুন' : 'Explore Top Destination Countries'}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl">
              {lang === 'bn'
                ? 'প্রতিটি দেশের নির্ধারিত দূতাবাস ফি, প্রসেসিং সময় ও আবেদনের শর্তাবলী বিস্তারিত জেনে নিন।'
                : 'Accurate consular requirements, processing timelines, and transparent fee schedules.'}
            </p>
          </div>

          {/* Interactive Region Filter (Allowed Segmented Control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 rounded-lg shrink-0">
            {regionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeRegion === tab.id
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                {country.image ? (
                  <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-base">
                      {country.flag}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-mono text-neutral-200">
                        {lang === 'bn' ? country.processingTimeBn : country.processingTime}
                      </div>
                      <div className="text-base font-bold leading-tight drop-shadow-xs">
                        {lang === 'bn' ? country.nameBn : country.nameEn}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 border-b border-neutral-100 bg-neutral-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">
                          {lang === 'bn' ? country.nameBn : country.nameEn}
                        </h3>
                        <div className="text-xs text-neutral-500 font-mono">
                          {country.id.toUpperCase()} · {country.region}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Country Body Info */}
                <div className="p-5">
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                    {lang === 'bn' ? country.highlightTextBn : country.highlightTextEn}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{lang === 'bn' ? 'প্রসেসিং সময়:' : 'Processing:'}</span>
                      </span>
                      <span className="font-semibold text-neutral-800 font-mono">
                        {lang === 'bn' ? country.processingTimeBn : country.processingTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{lang === 'bn' ? 'দূতাবাস ফি:' : 'Embassy Fee:'}</span>
                      </span>
                      <span className="font-semibold text-neutral-800 font-mono">
                        {lang === 'bn' ? country.embassyFeeBn : country.embassyFee}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'bn' ? 'সফলতার হার:' : 'Historical Rate:'}</span>
                      </span>
                      <span className="font-semibold text-emerald-700 font-mono">
                        {country.successRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCountryModal(country)}
                  className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 underline cursor-pointer"
                >
                  {lang === 'bn' ? 'বিস্তারিত তথ্য' : 'Full Details'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCountryForChecklist(country.id)}
                    className="p-1.5 text-xs text-neutral-600 bg-white border border-neutral-200 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                    title={lang === 'bn' ? 'ডকুমেন্ট চেকলিস্ট' : 'Document Checklist'}
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectCountryForEligibility(country.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <span>{lang === 'bn' ? 'আবেদন শুরু' : 'Apply'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Detail Modal */}
      {selectedCountryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-neutral-200">
            <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountryModal.flag}</span>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {lang === 'bn' ? selectedCountryModal.nameBn : selectedCountryModal.nameEn}
                  </h3>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    {lang === 'bn' ? 'আরআরআর ভিসা প্রসেসিং ডেস্ক' : 'Official Visa Dossier'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountryModal(null)}
                className="text-neutral-400 hover:text-neutral-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm text-neutral-700">
              <p className="leading-relaxed">
                {lang === 'bn' ? selectedCountryModal.highlightTextBn : selectedCountryModal.highlightTextEn}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-neutral-50 p-3.5 rounded-lg border border-neutral-200 text-xs">
                <div>
                  <div className="text-neutral-500">{lang === 'bn' ? 'প্রসেসিং সময়' : 'Time'}</div>
                  <div className="font-semibold text-neutral-900 font-mono mt-0.5">
                    {lang === 'bn' ? selectedCountryModal.processingTimeBn : selectedCountryModal.processingTime}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500">{lang === 'bn' ? 'দূতাবাস ফি' : 'Consular Fee'}</div>
                  <div className="font-semibold text-neutral-900 font-mono mt-0.5">
                    {lang === 'bn' ? selectedCountryModal.embassyFeeBn : selectedCountryModal.embassyFee}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500">{lang === 'bn' ? 'সাক্ষাতকার' : 'Interview'}</div>
                  <div className="font-semibold text-neutral-900 mt-0.5">
                    {selectedCountryModal.interviewRequired
                      ? (lang === 'bn' ? 'বাধ্যতামূলক' : 'Mandatory')
                      : (lang === 'bn' ? 'প্রয়োজন নেই' : 'Not Required')}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-2">
                  {lang === 'bn' ? 'প্রয়োজনীয় নথিপত্রের প্রাথমিক সারসংক্ষেপ' : 'Required Key Documents:'}
                </h4>
                <div className="space-y-2">
                  {selectedCountryModal.documents.map((cat, idx) => (
                    <div key={idx} className="bg-neutral-50 p-3 rounded border border-neutral-100 text-xs">
                      <div className="font-semibold text-neutral-800 mb-1">
                        {lang === 'bn' ? cat.categoryBn : cat.category}
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                        {cat.items.map((doc, docIdx) => (
                          <li key={docIdx}>
                            {lang === 'bn' ? doc.nameBn : doc.nameEn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  const cId = selectedCountryModal.id;
                  setSelectedCountryModal(null);
                  onSelectCountryForChecklist(cId);
                }}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
              >
                {lang === 'bn' ? 'সম্পূর্ণ চেকলিস্ট দেখুন' : 'Full Interactive Checklist'}
              </button>
              <button
                onClick={() => {
                  const cId = selectedCountryModal.id;
                  setSelectedCountryModal(null);
                  onSelectCountryForEligibility(cId);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded hover:bg-neutral-800 transition-colors"
              >
                {lang === 'bn' ? 'ফাইল মূল্যায়ন করুন' : 'Start Assessment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
