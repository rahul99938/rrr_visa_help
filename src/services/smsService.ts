export interface MockSMS {
  id: string;
  recipientPhone: string;
  recipientName: string;
  orderId: string;
  message: string;
  timestamp: string;
  status: 'delivered' | 'sent' | 'pending';
  gateway: string;
  gatewayTrxId: string;
}

// In-memory & localStorage SMS history
const SMS_STORAGE_KEY = 'rrr_mock_sms_history_v2';

export const getStoredSMSHistory = (): MockSMS[] => {
  try {
    const raw = localStorage.getItem(SMS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read SMS history', e);
  }
  return [
    {
      id: 'sms-init-1',
      recipientPhone: '+8801712345678',
      recipientName: 'মোঃ জাহিদ হাসান',
      orderId: 'RRR-100JOB-8842',
      message: 'RRR Visa Help: প্রিয় জাহিদ হাসান, আপনার অর্ডার RRR-100JOB-8842-এর পেমেন্ট ভেরিফাই হয়েছে এবং ১০০টি ইউরোপিয়ান কোম্পানিতে আবেদন সম্পন্ন হয়েছে।',
      timestamp: '2026-10-15 14:30',
      status: 'delivered',
      gateway: 'Greenweb BD Telecom Gateway',
      gatewayTrxId: 'GW-BD-992140',
    },
    {
      id: 'sms-init-2',
      recipientPhone: '+8801819876543',
      recipientName: 'কামরুল আহসান',
      orderId: 'RRR-100JOB-5190',
      message: 'RRR Visa Help: প্রিয় কামরুল আহসান, আপনার TrxID (9K4M82P15C) গৃহীত হয়েছে। আমাদের টিম ইউরোপাস সিভি ও মোটিভেশন লেটার প্রস্তুত করছে।',
      timestamp: '2026-10-17 09:15',
      status: 'delivered',
      gateway: 'Teletalk Bulk SMS API (Simulated)',
      gatewayTrxId: 'TT-SMS-448102',
    }
  ];
};

export const saveSMSHistory = (history: MockSMS[]) => {
  try {
    localStorage.setItem(SMS_STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save SMS history', e);
  }
};

/**
 * Mock function to simulate sending SMS notifications to users
 * when their order status is updated by the admin.
 */
export const simulateSendSMS = (params: {
  recipientPhone: string;
  recipientName: string;
  orderId: string;
  orderStatusTitle: string;
  paymentStatusTitle?: string;
  customNote?: string;
  siteName?: string;
  sitePhone?: string;
  onNotificationTriggered?: (sms: MockSMS) => void;
}): MockSMS => {
  const {
    recipientPhone,
    recipientName,
    orderId,
    orderStatusTitle,
    paymentStatusTitle,
    customNote,
    siteName = 'RRR Visa Help',
    sitePhone = '01762-626144',
    onNotificationTriggered
  } = params;

  let message = `${siteName}: প্রিয় ${recipientName}, আপনার অর্ডার (${orderId})-এর স্ট্যাটাস আপডেট হয়েছে: "${orderStatusTitle}".`;
  if (paymentStatusTitle) {
    message += ` পেমেন্ট: ${paymentStatusTitle}.`;
  }
  if (customNote) {
    message += ` নোট: ${customNote}`;
  }
  message += ` সাপোর্ট: ${sitePhone} | www.rrrvisahelp.com`;

  const newSms: MockSMS = {
    id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientPhone,
    recipientName,
    orderId,
    message,
    timestamp: new Date().toLocaleString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: 'delivered',
    gateway: 'Greenweb / BD Telecom Gateway (Simulated)',
    gatewayTrxId: `GW-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  // Update storage
  const existing = getStoredSMSHistory();
  const updated = [newSms, ...existing];
  saveSMSHistory(updated);

  // Trigger UI callback
  if (onNotificationTriggered) {
    onNotificationTriggered(newSms);
  }

  // Also dispatch browser custom event so floating toast can display it immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('rrr-sms-dispatched', {
        detail: newSms,
      })
    );
  }

  return newSms;
};

/**
 * Send custom mock SMS (direct test from Admin Console)
 */
export const simulateDirectCustomSMS = (params: {
  recipientPhone: string;
  recipientName: string;
  messageText: string;
  orderId?: string;
}): MockSMS => {
  const newSms: MockSMS = {
    id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientPhone: params.recipientPhone,
    recipientName: params.recipientName,
    orderId: params.orderId || 'DIRECT-SMS',
    message: params.messageText,
    timestamp: new Date().toLocaleString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: 'delivered',
    gateway: 'Greenweb BD Gateway (Simulated 200 OK)',
    gatewayTrxId: `GW-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  const existing = getStoredSMSHistory();
  saveSMSHistory([newSms, ...existing]);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('rrr-sms-dispatched', {
        detail: newSms,
      })
    );
  }

  return newSms;
};
