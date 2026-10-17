import React from 'react';
import { EMBASSY_NOTICES } from '../data/visaData';
import { Language } from '../types/visa';
import { Bell, ExternalLink, Calendar } from 'lucide-react';

interface EmbassyUpdatesProps {
  lang: Language;
}

export const EmbassyUpdates: React.FC<EmbassyUpdatesProps> = ({ lang }) => {
  return (
    <section id="updates" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'দূতাবাস ও ভিএফএস নোটিশ' : 'Consular Mission Bulletins'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              {lang === 'bn' ? 'সাম্প্রতিক ভিসা ও দূতাবাস আপডেট' : 'Live Embassy News & Slot Alerts'}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl">
              {lang === 'bn'
                ? 'ভিএফএস গ্লোবাল, ইউএস অ্যাম্বাসী ঢাকা ও অন্যান্য কনস্যুলার মিশনের সর্বশেষ নিয়মাবলী ও স্লট পরিবর্তনের খবর।'
                : 'Verified consular circulars on appointment openings, biometric quotas, and immigration policy shifts.'}
            </p>
          </div>

          <div className="text-xs text-neutral-500 flex items-center gap-1.5 shrink-0">
            <Bell className="w-3.5 h-3.5 text-neutral-900" />
            <span>{lang === 'bn' ? 'প্রতিদিন আপডেট করা হয়' : 'Monitored 24/7 by RRR Dispatch'}</span>
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EMBASSY_NOTICES.map((notice) => (
            <div
              key={notice.id}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div>
                {/* Clean unboxed metadata with separators (Strictly Anti-Slop / Zero-Pill) */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <span className="font-semibold text-neutral-800">{notice.country}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{notice.date}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 leading-snug mb-3">
                  {lang === 'bn' ? notice.titleBn : notice.titleEn}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === 'bn' ? notice.summaryBn : notice.summaryEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs font-medium text-neutral-700">
                <span>{lang === 'bn' ? 'আরআরআর ডেস্ক যাচাইকৃত' : 'Verified by RRR Desk'}</span>
                <span className="text-neutral-400 font-mono text-[11px]">Notice #{notice.id.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
