import React, { useState, useEffect } from 'react';
import { MockSMS } from '../services/smsService';
import { MessageSquare, CheckCircle, X, Smartphone, Radio } from 'lucide-react';

export const SmsNotificationToast: React.FC = () => {
  const [currentSMS, setCurrentSMS] = useState<MockSMS | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleSmsDispatched = (e: Event) => {
      const customEvent = e as CustomEvent<MockSMS>;
      if (customEvent.detail) {
        setCurrentSMS(customEvent.detail);
        setVisible(true);
      }
    };

    window.addEventListener('rrr-sms-dispatched', handleSmsDispatched);
    return () => {
      window.removeEventListener('rrr-sms-dispatched', handleSmsDispatched);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || !currentSMS) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 p-4 overflow-hidden relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  বিডি এসএমএস গেটওয়ে সার্ভিস
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  200 OK
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">
                {currentSMS.gateway} · Trx: {currentSMS.gatewayTrxId}
              </span>
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SMS Recipient & Time Info */}
        <div className="pt-2.5 pb-2 text-xs">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] mb-1">
            <span>
              প্রাপক: <strong className="text-white">{currentSMS.recipientName}</strong>
            </span>
            <span className="font-mono text-emerald-400 font-semibold">{currentSMS.recipientPhone}</span>
          </div>

          {/* SMS Body Bubble */}
          <div className="bg-neutral-800/90 rounded-xl p-3 border border-neutral-700/80 text-neutral-200 text-xs leading-relaxed font-sans">
            {currentSMS.message}
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3 h-3" />
              <span>ইউজারের মোবাইলে সফলভাবে পাঠানো হয়েছে</span>
            </span>
            <span className="font-mono">{currentSMS.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
