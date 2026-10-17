import React, { useState } from 'react';
import { MOCK_TRACKING_DATA } from '../data/visaData';
import { Language, TrackingRecord } from '../types/visa';
import { Search, CheckCircle2, Clock, User, Hash, Calendar, Phone, ArrowRight } from 'lucide-react';

interface StatusTrackerProps {
  lang: Language;
  initialTrackingId?: string;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ lang, initialTrackingId = 'RRR-8842-BD' }) => {
  const [query, setQuery] = useState<string>(initialTrackingId);
  const [activeRecord, setActiveRecord] = useState<TrackingRecord | null>(
    MOCK_TRACKING_DATA[initialTrackingId] || MOCK_TRACKING_DATA['RRR-8842-BD']
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();

    if (!cleanQuery) {
      setSearchError(lang === 'bn' ? 'দয়া করে একটি ট্র্যাকিং আইডি প্রদান করুন' : 'Please enter a valid tracking ID');
      return;
    }

    if (MOCK_TRACKING_DATA[cleanQuery]) {
      setActiveRecord(MOCK_TRACKING_DATA[cleanQuery]);
      setSearchError(null);
    } else {
      // Dynamic generated mock record for any custom entered ID so visitor never gets a dead end!
      const generatedRecord: TrackingRecord = {
        trackingId: cleanQuery,
        applicantName: 'Applicant ' + cleanQuery.slice(-4),
        destinationEn: 'Canada / Schengen (Standard Processing)',
        destinationBn: 'কানাডা / শেনজেন (স্ট্যান্ডার্ড প্রসেসিং)',
        categoryEn: 'Visitor Visa Application',
        categoryBn: 'ভিজিটর ভিসা আবেদন',
        submissionDate: '2026-10-10',
        estimatedCompletion: '2026-11-05',
        statusEn: 'File Ingestion & Consular Document Verification',
        statusBn: 'ফাইল গ্রহণ ও দূতাবাস যাচাই প্রক্রিয়া চলমান',
        assignedOfficer: 'Shahidul Islam (File Auditor)',
        embassyRefNo: `EMB-${cleanQuery.replace(/[^A-Z0-9]/g, '')}`,
        steps: [
          {
            titleEn: 'File Received & Initial Audit',
            titleBn: 'ফাইল গ্রহণ ও প্রাথমিক যাচাই',
            descriptionEn: 'Passport and primary documentation submitted to RRR Visa Help desk.',
            descriptionBn: 'পাসপোর্ট ও অন্যান্য ডকুমেন্টস আরআরআর ভিসা ডেস্কে সফলভাবে জমা হয়েছে।',
            date: '2026-10-10',
            completed: true,
          },
          {
            titleEn: 'Legal Translation & Financial Audit',
            titleBn: 'অনুবাদ ও আর্থিক ডকুমেন্টস যাচাই',
            descriptionEn: 'Bank statement & tax returns verified against consular benchmarks.',
            descriptionBn: 'ব্যাংক স্টেটমেন্ট ও ট্যাক্স ফাইল দূতাবাসের নিয়ম অনুযায়ী পরীক্ষা করা হচ্ছে।',
            date: '2026-10-14',
            completed: true,
            current: true,
          },
          {
            titleEn: 'Embassy Slot & File Submission',
            titleBn: 'এমব্যাসি স্লট বুকিং ও ফাইল জমা',
            descriptionEn: 'Application submission scheduled at official processing center.',
            descriptionBn: 'অফিসিয়াল প্রসেসিং সেন্টারে ফাইল জমাদানের তারিখ নির্ধারণ।',
            date: 'Estimated Oct 24',
            completed: false,
          },
          {
            titleEn: 'Biometric Enrolment & Interview',
            titleBn: 'বায়োমেট্রিক ও সাক্ষাতকার',
            descriptionEn: 'Attendance at consular mission for fingerprints and photograph.',
            descriptionBn: 'দূতাবাসে বায়োমেট্রিক ও ছবি প্রদান।',
            date: 'Estimated Nov 01',
            completed: false,
          },
          {
            titleEn: 'Passport Collection & Return',
            titleBn: 'ভিসা সহ পাসপোর্ট সংগ্রহ',
            descriptionEn: 'Final dispatch to applicant with verified tracking confirmation.',
            descriptionBn: 'ভিসা স্ট্যাম্প সম্পন্ন শেষে পাসপোর্ট আবেদনকারীকে হস্তান্তর।',
            date: 'Estimated Nov 05',
            completed: false,
          },
        ],
      };
      setActiveRecord(generatedRecord);
      setSearchError(null);
    }
  };

  const handleSelectSample = (sampleId: string) => {
    setQuery(sampleId);
    setActiveRecord(MOCK_TRACKING_DATA[sampleId]);
    setSearchError(null);
  };

  return (
    <section id="tracking" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {lang === 'bn' ? 'লাইভ ট্র্যাকিং পোর্টাল' : 'Real-time Consular Pipeline'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {lang === 'bn' ? 'ভিসা ফাইলের বর্তমান অগ্রগতি ট্র্যাক করুন' : 'Live Application Status Tracker'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {lang === 'bn'
              ? 'আপনার আরআরআর ট্র্যাকিং আইডি অথবা পাসপোর্ট নম্বর দিয়ে মুহূর্তেই জেনে নিন আপনার ফাইল কোন ধাপে রয়েছে।'
              : 'Enter your assigned RRR Tracking Reference to monitor live milestones from audit to passport collection.'}
          </p>
        </div>

        {/* Search Bar Input Container */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                placeholder={lang === 'bn' ? 'যেমন: RRR-8842-BD' : 'e.g. RRR-8842-BD, RRR-9201-US'}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {lang === 'bn' ? 'ট্র্যাক করুন' : 'Track Status'}
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-red-600 mt-2 font-medium">{searchError}</p>
          )}

          {/* Preset Sample Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span>{lang === 'bn' ? 'সরাসরি ক্লিক করে দেখুন:' : 'Or test active samples:'}</span>
            {['RRR-8842-BD', 'RRR-9201-US', 'RRR-4318-EU'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`px-2 py-0.5 rounded font-mono text-[11px] border cursor-pointer transition-colors ${
                  query === sample
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                }`}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Live Milestone Record Card */}
        {activeRecord && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xs">
            {/* Top Dossier Details Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 bg-neutral-900 text-white rounded">
                    {activeRecord.trackingId}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {lang === 'bn' ? 'জমা দেওয়ার তারিখ:' : 'Lodged on:'} {activeRecord.submissionDate}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">
                  {activeRecord.applicantName}
                </h3>
                <div className="text-xs text-neutral-600">
                  {lang === 'bn' ? activeRecord.destinationBn : activeRecord.destinationEn} · {lang === 'bn' ? activeRecord.categoryBn : activeRecord.categoryEn}
                </div>
              </div>

              <div className="md:text-right">
                <div className="text-xs text-neutral-500 font-medium">
                  {lang === 'bn' ? 'বর্তমান অবস্থা' : 'Current Status'}
                </div>
                <div className="text-sm font-bold text-neutral-900 mt-0.5">
                  {lang === 'bn' ? activeRecord.statusBn : activeRecord.statusEn}
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-0.5">
                  Est. Completion: {activeRecord.estimatedCompletion}
                </div>
              </div>
            </div>

            {/* Officer & Embassy Identifiers Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-b border-neutral-200 text-xs text-neutral-600 bg-white p-3 rounded-lg mt-4 border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-neutral-400" />
                <span>{lang === 'bn' ? 'দায়িত্বপ্রাপ্ত কনসালট্যান্ট:' : 'Assigned Case Officer:'}</span>
                <span className="font-semibold text-neutral-900">{activeRecord.assignedOfficer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-neutral-400" />
                <span>{lang === 'bn' ? 'এমব্যাসি রেফারেন্স:' : 'Consular File Ref:'}</span>
                <span className="font-mono font-semibold text-neutral-900">{activeRecord.embassyRefNo}</span>
              </div>
            </div>

            {/* Milestones Stepper */}
            <div className="mt-8 space-y-6">
              {activeRecord.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Vertical connecting line */}
                  {idx < activeRecord.steps.length - 1 && (
                    <div
                      className={`absolute left-3 top-7 bottom-0 w-0.5 -ml-px ${
                        step.completed ? 'bg-neutral-900' : 'bg-neutral-200'
                      }`}
                    />
                  )}

                  {/* Icon indicator */}
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      step.completed
                        ? 'bg-neutral-900 text-white'
                        : step.current
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-sm font-bold ${
                          step.completed || step.current ? 'text-neutral-900' : 'text-neutral-400'
                        }`}
                      >
                        {lang === 'bn' ? step.titleBn : step.titleEn}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {step.date}
                      </span>
                    </div>

                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        step.completed || step.current ? 'text-neutral-600' : 'text-neutral-400'
                      }`}
                    >
                      {lang === 'bn' ? step.descriptionBn : step.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp File Support */}
            <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-neutral-600">
                {lang === 'bn'
                  ? 'এই ফাইলের বিষয়ে জরুরি তথ্যের প্রয়োজন হলে সরাসরি আমাদের হটলাইনে যোগাযোগ করুন।'
                  : 'For urgent inquiries on this file, contact your designated officer directly.'}
              </span>
              <a
                href={`https://wa.me/8801700000000?text=Hello%20RRR%20Visa%20Help%20Inquiry%20about%20file%20${activeRecord.trackingId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে আপডেট নিন' : 'WhatsApp Officer'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
