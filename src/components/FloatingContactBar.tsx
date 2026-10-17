import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/jobData';
import { Language } from '../types/visa';
import { MessageSquare, Phone, Send, Copy, Check, ExternalLink } from 'lucide-react';

interface FloatingContactBarProps {
  lang: Language;
  hotlinePhone?: string;
  telegramUsername?: string;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  lang,
  hotlinePhone = '+880 1845-130981',
  telegramUsername = '@rrrvisahelp',
}) => {
  const [copied, setCopied] = useState(false);
  const [showImoModal, setShowImoModal] = useState(false);
  const cleanPhone = hotlinePhone.replace(/[^0-9]/g, '');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(hotlinePhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating contact pill in bottom-right corner with 3D tactile buttons */}
      <div className="fixed bottom-3 right-2 sm:bottom-4 sm:right-4 z-40 flex items-center gap-1.5 sm:gap-2.5 bg-neutral-950/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-neutral-700 max-w-[calc(100vw-1rem)]">
        {/* WhatsApp 3D direct */}
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 btn-3d-whatsapp rounded-xl text-xs font-bold text-white shadow-md cursor-pointer shrink-0"
          title={`WhatsApp: ${hotlinePhone}`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* IMO 3D Quick Button */}
        <button
          type="button"
          onClick={() => setShowImoModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 btn-3d-imo rounded-xl text-xs font-bold text-white shadow-md cursor-pointer shrink-0"
          title={`IMO: ${hotlinePhone}`}
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>IMO</span>
        </button>

        {/* Telegram 3D Direct */}
        <a
          href={`https://t.me/${telegramUsername.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 btn-3d-telegram rounded-xl text-xs font-bold text-white shadow-md cursor-pointer shrink-0"
          title={`Telegram: ${telegramUsername}`}
        >
          <Send className="w-4 h-4 shrink-0" />
          <span className="hidden xs:inline">Telegram</span>
        </a>

        {/* Direct number copy button */}
        <button
          type="button"
          onClick={handleCopyPhone}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer border-l border-neutral-700 pl-2.5"
          title="Copy Phone Number"
        >
          <span>{hotlinePhone}</span>
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
        </button>
      </div>

      {/* IMO Information Dialog */}
      {showImoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-neutral-900 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  IMO
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  {lang === 'bn' ? 'ইমোতে (IMO) সরাসরি যোগাযোগ' : 'Connect via IMO'}
                </h3>
              </div>
              <button
                onClick={() => setShowImoModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-xs text-neutral-600 leading-relaxed">
              {lang === 'bn'
                ? 'আমাদের হটলাইন নম্বরটি আপনার ইমো অ্যাপে সেভ করুন অথবা সরাসরি অডিও/ভিডিও কলে কথা বলুন।'
                : 'Save our direct hotline in your IMO contacts to message or call our visa & job officers.'}
            </p>

            <div className="mt-4 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase font-mono">
                  {lang === 'bn' ? 'অফিসিয়াল ইমো নম্বর' : 'Official IMO Contact'}
                </span>
                <span className="text-base font-bold font-mono text-neutral-900">
                  +880 1845-130981
                </span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="px-2.5 py-1.5 bg-white border border-neutral-300 rounded text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href="tel:+8801845130981"
                className="flex-1 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold text-center hover:bg-neutral-800 transition-colors"
              >
                {lang === 'bn' ? 'সরাসরি কল দিন' : 'Call Number'}
              </a>
              <button
                onClick={() => setShowImoModal(false)}
                className="px-4 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
