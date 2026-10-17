import React from 'react';
import { TESTIMONIALS } from '../data/visaData';
import { Language } from '../types/visa';
import { Star, CheckCircle } from 'lucide-react';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {lang === 'bn' ? 'সফলতার গল্প ও পর্যালোচনা' : 'Real Applicant Outcomes'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {lang === 'bn' ? 'আমাদের ক্লায়েন্টদের বাস্তব অভিজ্ঞতা' : 'Verified Client Success Stories'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {lang === 'bn'
              ? 'রিজেকশন কাটিয়ে ভিসা প্রাপ্তি থেকে শুরু করে জরুরি ভ্রমণ—আমাদের সহায়তা পাওয়া আবেদনকারীদের কথা শুনুন।'
              : 'Concrete outcomes achieved across tourist, student, and business visa categories.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <div className="flex items-center gap-1.5 text-neutral-800 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'bn' ? t.destinationBn : t.destinationEn}</span>
                  </div>
                  <span className="font-mono text-[11px]">{t.grantedDate}</span>
                </div>

                <p className="text-sm text-neutral-700 italic leading-relaxed mb-6">
                  "{lang === 'bn' ? t.quoteBn : t.quoteEn}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {lang === 'bn' ? t.nameBn : t.nameEn}
                  </h4>
                  <div className="text-xs text-neutral-500">
                    {lang === 'bn' ? t.locationBn : t.locationEn} · {lang === 'bn' ? t.visaTypeBn : t.visaTypeEn}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
