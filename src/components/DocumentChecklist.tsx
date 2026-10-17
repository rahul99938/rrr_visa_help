import React, { useState } from 'react';
import { COUNTRIES } from '../data/visaData';
import { Language } from '../types/visa';
import { CheckSquare, Square, Printer, Download, Sparkles, HelpCircle, FileCheck } from 'lucide-react';

interface DocumentChecklistProps {
  lang: Language;
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  lang,
  selectedCountryId,
  onSelectCountry,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const currentCountry = COUNTRIES.find((c) => c.id === selectedCountryId) || COUNTRIES[0];

  // Flatten all documents for calculation
  const allDocs = currentCountry.documents.flatMap((group, gIdx) =>
    group.items.map((item, iIdx) => ({
      id: `${currentCountry.id}-${gIdx}-${iIdx}`,
      nameEn: item.nameEn,
      nameBn: item.nameBn,
      required: item.required,
      categoryEn: group.category,
      categoryBn: group.categoryBn,
      note: item.note,
    }))
  );

  const completedCount = allDocs.filter((d) => checkedDocs[d.id]).length;
  const progressPercent = allDocs.length > 0 ? Math.round((completedCount / allDocs.length) * 100) : 0;

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="documents" className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'স্মার্ট চেকলিস্ট টুল' : 'Consular Document Dossier'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {lang === 'bn' ? 'ভিসার প্রয়োজনীয় কাগজপত্রের চেকলিস্ট' : 'Embassy Document Checklist Generator'}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl">
              {lang === 'bn'
                ? 'আপনার পছন্দের দেশ নির্বাচন করুন এবং প্রয়োজনীয় ফাইলগুলো টিক চিহ্ন দিয়ে প্রস্তুতি যাচাই করুন।'
                : 'Select your target destination and tick off the verified requirements as you gather them.'}
            </p>
          </div>

          {/* Country Selector & Print Action */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={currentCountry.id}
              onChange={(e) => onSelectCountry(e.target.value)}
              className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {lang === 'bn' ? c.nameBn : c.nameEn}
                </option>
              ))}
            </select>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Print Checklist"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>
          </div>
        </div>

        {/* Progress Tracker Strip */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentCountry.flag}</span>
              <div>
                <span className="text-sm font-bold text-neutral-900">
                  {lang === 'bn' ? currentCountry.nameBn : currentCountry.nameEn} - {lang === 'bn' ? 'ডকুমেন্ট প্রস্তুতি' : 'File Readiness'}
                </span>
                <span className="text-xs text-neutral-500 block">
                  {lang === 'bn'
                    ? `${allDocs.length} টির মধ্যে ${completedCount} টি কাগজ প্রস্তুত আছে`
                    : `${completedCount} of ${allDocs.length} verified documents checked`}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-bold font-mono text-neutral-900 tabular-nums">
                {progressPercent}%
              </span>
              <span className="text-xs text-neutral-500 block">
                {progressPercent === 100
                  ? (lang === 'bn' ? 'ফাইল সম্পূর্ণ প্রস্তুত!' : 'Ready for Submission!')
                  : (lang === 'bn' ? 'প্রস্তুতি চলমান' : 'In Progress')}
              </span>
            </div>
          </div>

          <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-neutral-900 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Documents Grouped by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCountry.documents.map((group, groupIdx) => (
            <div
              key={`${currentCountry.id}-grp-${groupIdx}`}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                  <h3 className="text-sm font-bold text-neutral-900">
                    {lang === 'bn' ? group.categoryBn : group.category}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {group.items.length} {lang === 'bn' ? 'টি আইটেম' : 'items'}
                  </span>
                </div>

                <div className="space-y-3">
                  {group.items.map((item, itemIdx) => {
                    const docId = `${currentCountry.id}-${groupIdx}-${itemIdx}`;
                    const isChecked = !!checkedDocs[docId];

                    return (
                      <div
                        key={docId}
                        onClick={() => toggleDoc(docId)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-neutral-50 border-neutral-300 text-neutral-900'
                            : 'bg-white border-neutral-100 hover:border-neutral-200 text-neutral-700'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-neutral-700 shrink-0 cursor-pointer"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>

                        <div className="flex-1 text-xs">
                          <div className={`font-medium leading-snug ${isChecked ? 'line-through text-neutral-500' : 'text-neutral-800'}`}>
                            {lang === 'bn' ? item.nameBn : item.nameEn}
                          </div>
                          {item.required && (
                            <span className="text-[10px] text-amber-700 font-semibold mt-0.5 inline-block">
                              {lang === 'bn' ? '* বাধ্যতামূলক' : '* Mandatory'}
                            </span>
                          )}
                          {item.note && (
                            <span className="text-[10px] text-neutral-500 block mt-0.5">
                              {item.note}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 flex items-center justify-between">
                <span>
                  {lang === 'bn' ? 'অনুবাদ ও নোটারি আরআরআর করে দেয়' : 'Translation & notary service available'}
                </span>
                <FileCheck className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Translation & Notary Callout Box */}
        <div className="mt-8 bg-neutral-900 text-white rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold">
              {lang === 'bn' ? 'বাংলা ডকুমেন্টস অনুবাদ ও নোটারি করাতে চান?' : 'Need Bangla Document Translation & Legal Notarization?'}
            </h4>
            <p className="text-xs text-neutral-300 max-w-xl">
              {lang === 'bn'
                ? 'আমাদের সরকার অনুমোদিত নোটারি পাবলিক ও অভিজ্ঞ অনুবাদকরা ১ কার্যদিবসে আপনার জন্মনিবন্ধন, নিকাহনামা, ট্রেড লাইসেন্স ও ট্যাক্স সার্টিফিকেট অনুবাদ সম্পন্ন করে থাকেন।'
                : 'Our licensed legal translators provide fast court-attested and notarized English versions of all Bangla civil documents within 24 hours.'}
            </p>
          </div>

          <a
            href="https://wa.me/8801700000000?text=Hello%20RRR%20Visa%20Help%20I%20need%20document%20translation%20and%20notary%20support"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {lang === 'bn' ? 'অনুবাদ সেবা গ্রহণ করুন' : 'Request Translation Support'}
          </a>
        </div>
      </div>
    </section>
  );
};
