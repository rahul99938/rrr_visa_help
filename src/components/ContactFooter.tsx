import React, { useState } from 'react';
import { Language } from '../types/visa';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Lock, ShieldCheck, MessageSquare } from 'lucide-react';

interface ContactFooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  hotlinePhone?: string;
  officialEmail?: string;
  officeAddress?: string;
  paymentNumber?: string;
  telegramUsername?: string;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  lang,
  onNavigate,
  onOpenAdmin,
  hotlinePhone = '+880 1845-130981',
  officialEmail = 'mdrahul200900800@gmail.com',
  officeAddress = 'লেভেল ৬, কনকর্ড টাওয়ার, রোড ১১, গুলশান-২, ঢাকা-১২১২, বাংলাদেশ',
  paymentNumber = '01762626144',
  telegramUsername = '@rrrvisahelp',
}) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;
    setIsSent(true);
  };

  return (
    <footer id="contact" className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Information & Quick Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-neutral-800">
          {/* Brand & Office Details */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" theme="dark" showSubtitle={true} />

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'আরআরআর ভিসা হেল্প বাংলাদেশের বিশ্বস্ত ভিসা ও অভিবাসন পরামর্শক প্রতিষ্ঠান। আমরা ইউরোপ শেনজেন, আমেরিকা, ইউকে, কানাডা ও মধ্যপ্রাচ্যের দেশসমূহে নির্ভুল ভিসা প্রসেসিং সেবা প্রদান করে থাকি।'
                : 'Premier consular and travel document consultancy based in Dhaka. Offering certified document audits, expedited embassy appointment scheduling, and personal mock interview coaching.'}
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>{officeAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-mono font-bold text-white">{hotlinePhone}</span>
                  <span className="text-[11px] text-neutral-400 block">
                    {lang === 'bn' ? '(হোয়াটসঅ্যাপ ও ইমোতে সরাসরি সংযোগ)' : '(Direct on WhatsApp & IMO)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 text-blue-400 shrink-0 font-bold text-xs flex items-center justify-center">✈</span>
                <div>
                  <a
                    href={`https://t.me/${telegramUsername.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold text-blue-300 hover:text-white underline"
                  >
                    Telegram: {telegramUsername}
                  </a>
                  <span className="text-[11px] text-neutral-400 block">
                    {lang === 'bn' ? 'টেলিগ্রামে ১০০ চাকরির আবেদন সাপোর্ট' : 'Bulk Job Application Support'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-mono">{officialEmail}</span>
              </div>

              {/* 3D Contact Buttons in Footer */}
              <div className="pt-3 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${hotlinePhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 btn-3d-whatsapp rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${hotlinePhone.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-2 btn-3d-imo rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>IMO Call</span>
                </a>

                <a
                  href={`https://t.me/${telegramUsername.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 btn-3d-telegram rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>

              {/* 3-Step Reality Footer Disclaimer */}
              <div className="pt-2 text-[11px] text-neutral-400 border-t border-neutral-800 leading-relaxed">
                {lang === 'bn'
                  ? 'স্বচ্ছতা ঘোষণা: আমরা কোনো ভিত্তিহীন ভিসা ফাইল জমা নিই না। আমাদের কাজ ইউরোপীয় ১০০ কোম্পানিতে আবেদন করা, কোম্পানি পছন্দ করলে সরাসরি অনলাইন মিটিং করানো এবং টিকে গেলে এম্বাসি ফেসের স্লট বুকিং দেওয়া।'
                  : 'Notice: We do not accept fake visa files. We facilitate direct job applications, employer video interviews, and verified embassy slot booking.'}
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'গন্তব্য দেশ ও ফি তালিকা' : 'Country Catalog & Fees'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('eligibility')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'অনলাইন ভিসা স্কোর ক্যালকুলেটর' : 'Eligibility Calculator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('documents')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'প্রয়োজনীয় নথিপত্রের চেকলিস্ট' : 'Document Checklist Tool'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'অনলাইন ফাইল ট্র্যাকিং' : 'Track Application File'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('updates')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'দূতাবাস ও ভিএফএস নোটিশ' : 'Embassy Slot Updates'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('consultation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুকিং' : 'Schedule Consultation'}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Callback Message Form */}
          <div className="lg:col-span-4 bg-neutral-800/80 p-5 rounded-xl border border-neutral-700/60">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'দ্রুত যোগাযোগ বার্তা' : 'Request Instant Callback'}
            </h4>
            <p className="text-[11px] text-neutral-400 mb-3">
              {lang === 'bn'
                ? 'আপনার নম্বর দিন, আমাদের পরামর্শক ১০ মিনিটে যোগাযোগ করবেন।'
                : 'Leave your contact number; our senior officer will call you back within minutes.'}
            </p>

            {isSent ? (
              <div className="py-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-medium text-white">
                  {lang === 'bn'
                    ? 'আপনার অনুরোধ জমা হয়েছে! শীঘ্রই কল করা হবে।'
                    : 'Callback requested! Our officer will dial you shortly.'}
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-[11px] text-neutral-400 underline"
                >
                  {lang === 'bn' ? 'অন্য কোনো বার্তা পাঠান' : 'Send another note'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <input
                  type="tel"
                  required
                  placeholder={lang === 'bn' ? 'মোবাইল নম্বর (+৮৮০...)' : 'Phone Number (+880...)'}
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <textarea
                  rows={2}
                  placeholder={lang === 'bn' ? 'কোন দেশের ভিসার জন্য আগ্রহী?' : 'Which country are you applying for?'}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>{lang === 'bn' ? 'কলব্যাক অনুরোধ পাঠান' : 'Submit Callback Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} RRR Visa Help. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</span>
            <span>·</span>
            <span className="text-emerald-400 font-bold font-mono">
              পেমেন্ট নম্বর: {paymentNumber} (bKash/Nagad/Rocket)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>{lang === 'bn' ? 'ট্রেড লাইসেন্স নং: TR-2024-884' : 'Trade License: TR-2024-884'}</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{lang === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Access'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
