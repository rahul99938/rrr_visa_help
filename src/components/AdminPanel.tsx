import React, { useState } from 'react';
import { JobCircular, BulkApplyOrder, JobTradeCategory, SiteSettings } from '../types/job';
import { Language } from '../types/visa';
import { SCHENGEN_COUNTRIES_PORTALS } from '../data/jobData';
import { BrandLogo } from './BrandLogo';
import { simulateSendSMS, simulateDirectCustomSMS, getStoredSMSHistory, MockSMS } from '../services/smsService';
import {
  Lock,
  Unlock,
  Key,
  Shield,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Search,
  Settings,
  Phone,
  Mail,
  Send,
  MessageSquare,
  LogOut,
  AlertCircle,
  Smartphone,
  Save,
  Check,
  RefreshCw,
  Edit3
} from 'lucide-react';

interface AdminPanelProps {
  lang: Language;
  jobs: JobCircular[];
  orders: BulkApplyOrder[];
  siteSettings: SiteSettings;
  onAddJob: (job: JobCircular) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: BulkApplyOrder['orderStatus']) => void;
  onUpdatePaymentStatus: (orderId: string, status: BulkApplyOrder['paymentStatus']) => void;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lang,
  jobs,
  orders,
  siteSettings,
  onAddJob,
  onDeleteJob,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onUpdateSiteSettings,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>(''); // Completely empty, no default code prefilled
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'orders' | 'settings' | 'sms_logs' | 'jobs' | 'add_job' | 'schengen'>('orders');

  // Settings state (name, number, gmail, payment system, packages, admin code)
  const [formSettings, setFormSettings] = useState<SiteSettings>({ ...siteSettings });
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCountry, setNewCountry] = useState('Romania');
  const [newCity, setNewCity] = useState('');
  const [newCategory, setNewCategory] = useState<JobTradeCategory>('factory');
  const [newSalaryEur, setNewSalaryEur] = useState('€1,000 / month');
  const [newLink, setNewLink] = useState('');
  const [newVisaSponsor, setNewVisaSponsor] = useState(true);
  const [newAccommodation, setNewAccommodation] = useState(true);
  const [newFood, setNewFood] = useState(false);
  const [newRequirements, setNewRequirements] = useState('');

  // Orders Search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // SMS Logs & Quick Trigger State
  const [smsLogs, setSmsLogs] = useState<MockSMS[]>(() => getStoredSMSHistory());
  const [testSmsPhone, setTestSmsPhone] = useState('+8801');
  const [testSmsName, setTestSmsName] = useState('গ্রাহক');
  const [testSmsMessage, setTestSmsMessage] = useState('RRR Visa Help: আপনার আবেদনের অগ্রগতি সম্পন্ন হয়েছে।');
  const [smsSentToast, setSmsSentToast] = useState<string | null>(null);

  // Quick SMS Modal for specific order
  const [selectedOrderForSms, setSelectedOrderForSms] = useState<BulkApplyOrder | null>(null);
  const [customSmsNote, setCustomSmsNote] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctCode = siteSettings.adminSecretCode || '12526';
    if (secretCode.trim() === correctCode.trim()) {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError(
        lang === 'bn'
          ? 'ভুল অ্যাডমিন কোড! আপনার সঠিক গোপন কোড দিয়ে পুনরায় চেষ্টা করুন।'
          : 'Invalid access code! Please enter your authorized security code.'
      );
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(formSettings);
    setSettingsSavedSuccess(true);
    setTimeout(() => setSettingsSavedSuccess(false), 3000);
  };

  const handleStatusChangeWithSMS = (order: BulkApplyOrder, newStatus: BulkApplyOrder['orderStatus']) => {
    onUpdateOrderStatus(order.orderId, newStatus);

    const statusTitlesBn: Record<string, string> = {
      submitted: 'নতুন আবেদন গৃহীত',
      processing: 'ইউরোপাস সিভি ও কভার লেটার প্রস্তুত চলছে',
      applied_100: '১০০টি ইউরোপিয়ান কোম্পানিতে আবেদন সম্পন্ন',
      completed: 'পিডিএফ ও ট্র্যাকিং রিপোর্ট প্রেরণ সম্পন্ন',
    };

    const statusTitlesEn: Record<string, string> = {
      submitted: 'Application Submitted',
      processing: 'CV & Cover Letter Drafting',
      applied_100: '100 European Jobs Applied',
      completed: 'Final Report Dispatched',
    };

    // Trigger mock SMS function
    const sent = simulateSendSMS({
      recipientPhone: order.phone,
      recipientName: order.fullName,
      orderId: order.orderId,
      orderStatusTitle: lang === 'bn' ? statusTitlesBn[newStatus] : statusTitlesEn[newStatus],
      paymentStatusTitle: order.paymentStatus === 'verified' ? 'পেমেন্ট নিশ্চিত' : 'যাচাই চলছে',
      siteName: formSettings.brandName,
      sitePhone: formSettings.paymentNumber,
    });

    setSmsLogs(getStoredSMSHistory());
    setSmsSentToast(`✓ ব্যবহারকারী ${order.fullName} (${order.phone})-এর মোবাইলে সফলভাবে এসএমএস নোটিফিকেশন পাঠানো হয়েছে!`);
    setTimeout(() => setSmsSentToast(null), 4000);
  };

  const handlePaymentChangeWithSMS = (order: BulkApplyOrder, newPaymentStatus: BulkApplyOrder['paymentStatus']) => {
    onUpdatePaymentStatus(order.orderId, newPaymentStatus);

    const paymentTitlesBn: Record<string, string> = {
      pending_verification: 'TrxID যাচাই চলছে',
      verified: 'TrxID পেমেন্ট ভেরিফাইড ও নিশ্চিত',
      rejected: 'পেমেন্ট বাতিল / ভুল TrxID',
    };

    // Trigger mock SMS
    simulateSendSMS({
      recipientPhone: order.phone,
      recipientName: order.fullName,
      orderId: order.orderId,
      orderStatusTitle: 'পেমেন্ট তথ্য আপডেট',
      paymentStatusTitle: paymentTitlesBn[newPaymentStatus],
      siteName: formSettings.brandName,
      sitePhone: formSettings.paymentNumber,
    });

    setSmsLogs(getStoredSMSHistory());
    setSmsSentToast(`✓ পেমেন্ট স্ট্যাটাস পরিবর্তনের এসএমএস পাঠানো হয়েছে (${order.phone})!`);
    setTimeout(() => setSmsSentToast(null), 4000);
  };

  const handleSendDirectTestSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testSmsPhone.trim() || !testSmsMessage.trim()) return;

    simulateDirectCustomSMS({
      recipientPhone: testSmsPhone.trim(),
      recipientName: testSmsName.trim() || 'গ্রাহক',
      messageText: testSmsMessage.trim(),
    });

    setSmsLogs(getStoredSMSHistory());
    setSmsSentToast(`✓ টেস্ট এসএমএস সফলভাবে পাঠানো হয়েছে (${testSmsPhone})!`);
    setTimeout(() => setSmsSentToast(null), 3500);
  };

  const handleSendCustomOrderSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForSms) return;

    simulateSendSMS({
      recipientPhone: selectedOrderForSms.phone,
      recipientName: selectedOrderForSms.fullName,
      orderId: selectedOrderForSms.orderId,
      orderStatusTitle: 'স্পেশাল নোটিশ',
      customNote: customSmsNote.trim(),
      siteName: formSettings.brandName,
      sitePhone: formSettings.paymentNumber,
    });

    setSmsLogs(getStoredSMSHistory());
    setSmsSentToast(`✓ কাস্টম এসএমএস সফলভাবে পাঠানো হয়েছে: ${selectedOrderForSms.phone}`);
    setSelectedOrderForSms(null);
    setCustomSmsNote('');
    setTimeout(() => setSmsSentToast(null), 3500);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim() || !newLink.trim()) {
      alert(lang === 'bn' ? 'সবগুলো বাধ্যতামূলক ঘর পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    const eurNum = parseInt(newSalaryEur.replace(/[^0-9]/g, '')) || 1000;
    const bdtApprox = `~৳${(eurNum * 132).toLocaleString()} / মাস`;

    const countryObj = SCHENGEN_COUNTRIES_PORTALS.find((s) => s.countryEn.toLowerCase() === newCountry.toLowerCase()) || {
      countryEn: newCountry,
      countryBn: newCountry,
      flag: '🇪🇺',
    };

    const parsedReqs = newRequirements.trim()
      ? newRequirements.split('\n').filter((r) => r.trim().length > 0)
      : ['Valid passport', 'Clean police clearance', 'Trade experience'];

    const createdJob: JobCircular = {
      id: `job-admin-${Date.now()}`,
      titleEn: newTitle,
      titleBn: newTitle,
      company: newCompany,
      country: countryObj.countryEn,
      countryBn: countryObj.countryBn,
      flag: countryObj.flag,
      city: newCity || 'City Center',
      category: newCategory,
      salaryEur: newSalaryEur.includes('€') ? newSalaryEur : `€${newSalaryEur} / month`,
      salaryBDT: bdtApprox,
      contractType: 'Official Schengen Work Permit',
      visaSponsorship: newVisaSponsor,
      accommodationProvided: newAccommodation,
      foodProvided: newFood,
      originalLink: newLink.startsWith('http') ? newLink : `https://${newLink}`,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: 'Open / Ongoing Hiring',
      sourceName: 'Official Registered Sponsor',
      isVerifiedSponsor: true,
      requirementsEn: parsedReqs,
      requirementsBn: parsedReqs,
    };

    onAddJob(createdJob);
    alert(lang === 'bn' ? 'চাকরির সার্কুলার সফলভাবে যুক্ত হয়েছে!' : 'Job circular successfully created!');
    setActiveTab('jobs');
    setNewTitle('');
    setNewCompany('');
    setNewLink('');
    setNewRequirements('');
  };

  const filteredOrders = orders.filter((o) => {
    const q = orderSearchQuery.toLowerCase();
    return (
      !q ||
      o.fullName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.orderId.toLowerCase().includes(q) ||
      o.transactionId.toLowerCase().includes(q)
    );
  });

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'verified')
    .reduce((acc, curr) => acc + (curr.packagePrice || 4500), 0);

  const pendingVerificationCount = orders.filter((o) => o.paymentStatus === 'pending_verification').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl border border-neutral-300 overflow-hidden relative">
        {/* Top Header - NO PASSWORD OR PIN DISPLAYED! */}
        <div className="bg-[#0f3260] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogo size="sm" showSubtitle={false} theme="dark" />
            <div className="border-l border-white/20 pl-3 min-w-0">
              <h2 className="text-xs sm:text-base font-bold leading-none truncate">
                {lang === 'bn' ? 'এডমিন কন্ট্রোল প্যানেল' : 'Admin Management Console'}
              </h2>
              <span className="text-[10px] text-neutral-300 font-sans block mt-0.5">
                {lang === 'bn' ? 'অনুমোদিত কর্মকর্তাদের জন্য নিরাপদ কনসোল' : 'Authorized Personnel Only'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-2.5 sm:px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 text-base font-bold cursor-pointer"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {smsSentToast && (
          <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center animate-in fade-in duration-200 flex items-center justify-center gap-2 shrink-0">
            <Smartphone className="w-4 h-4" />
            <span>{smsSentToast}</span>
          </div>
        )}

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Secret Pin Login View - COMPLETELY BLANK, NO PIN WRITTEN ON SCREEN */
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              {lang === 'bn' ? 'এডমিন অ্যাক্সেস কোড দিন' : 'Enter Admin Security PIN'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mt-1 mb-6">
              {lang === 'bn'
                ? 'সাইটের সকল চাকরি, ওয়েবসাইট সেটিংস, TrxID পেমেন্ট এবং এসএমএস সিস্টেম কন্ট্রোল করার জন্য আপনার গোপন কোডটি দিন।'
                : 'Enter your authorized security code to access management and SMS simulation tools.'}
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  autoFocus
                  required
                  maxLength={12}
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-center font-mono text-lg font-bold tracking-widest text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0f3260] focus:bg-white"
                />
              </div>

              {authError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#0f3260] hover:bg-[#0c274a] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লগইন করুন' : 'Unlock Admin Panel'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Metrics Strip */}
            <div className="bg-neutral-50 border-b border-neutral-200 px-4 sm:px-6 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500">{lang === 'bn' ? 'চাকরি সার্কুলার' : 'Jobs'}</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-neutral-900">{jobs.length}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500">{lang === 'bn' ? '১০০ চাকরির অর্ডার' : 'Orders'}</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-neutral-900">{orders.length}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500">{lang === 'bn' ? 'যাচাইযোগ্য TrxID' : 'Pending TrxID'}</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-700">{pendingVerificationCount}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-500">{lang === 'bn' ? 'ভেরিফাইড আয়' : 'Revenue'}</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-emerald-700">৳{totalRevenue.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs - Horizontal scrolling with no overflow */}
            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-2 border-b border-neutral-200 bg-white overflow-x-auto shrink-0 whitespace-nowrap">
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'orders'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {lang === 'bn' ? `অর্ডার ও TrxID (${orders.length})` : `Orders (${orders.length})`}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-1 ${
                  activeTab === 'settings'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'নাম, নাম্বার, জিমেইল ও পেমেন্ট সেটিংস' : 'Site & Payment Settings'}</span>
              </button>

              <button
                onClick={() => setActiveTab('sms_logs')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-1 ${
                  activeTab === 'sms_logs'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? `এসএমএস লগ (${smsLogs.length})` : `SMS Logs (${smsLogs.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'jobs'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {lang === 'bn' ? `চাকরির তালিকা (${jobs.length})` : `Jobs (${jobs.length})`}
              </button>

              <button
                onClick={() => setActiveTab('add_job')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-1 ${
                  activeTab === 'add_job'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'নতুন চাকরি যুক্ত' : 'Add Job'}</span>
              </button>

              <button
                onClick={() => setActiveTab('schengen')}
                className={`pb-2 px-2.5 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'schengen'
                    ? 'border-[#0f3260] text-[#0f3260]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {lang === 'bn' ? '২৯টি সরকারি পোর্টাল' : '29 Portals'}
              </button>
            </div>

            {/* TAB 1: ORDERS & TrxID WITH INSTANT SMS SIMULATION */}
            {activeTab === 'orders' && (
              <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder={lang === 'bn' ? 'নাম, ফোন বা TrxID দিয়ে খুঁজুন...' : 'Search by name, phone, TrxID...'}
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="text-xs text-neutral-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                    {lang === 'bn' ? 'সক্রিয় পেমেন্ট নম্বর:' : 'Payment Receiver:'}{' '}
                    <span className="font-bold font-mono text-[#0f3260]">{formSettings.paymentNumber}</span>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 text-center text-xs text-neutral-500">
                    {lang === 'bn' ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি।' : 'No application orders match.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.orderId}
                        className="bg-white border border-neutral-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded">
                              {order.orderId}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-mono">{order.createdAt}</span>
                            <span className="text-xs font-semibold text-neutral-800">
                              {order.selectedPackage} (৳{(order.packagePrice || 4500).toLocaleString()})
                            </span>
                          </div>

                          <div className="text-sm font-bold text-neutral-900">
                            {order.fullName} · <span className="font-mono font-normal text-neutral-600">{order.phone}</span>
                          </div>

                          <div className="text-xs text-neutral-600">
                            <span>দেশ: {order.targetCountries?.join(', ')}</span> · <span>পেশা: {order.jobCategories?.join(', ')}</span>
                          </div>

                          {/* Transaction Code Box Highlight */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                            <span className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded font-bold">
                              TrxID: {order.transactionId || 'NOT_SUBMITTED'}
                            </span>
                            <span className="text-neutral-500">via {order.paymentMethod || 'bKash'} ({formSettings.paymentNumber})</span>
                          </div>
                        </div>

                        {/* Controls & SMS notification action */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto">
                          {/* Payment status dropdown with auto-SMS trigger */}
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => handlePaymentChangeWithSMS(order, e.target.value as any)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border cursor-pointer ${
                              order.paymentStatus === 'verified'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : order.paymentStatus === 'rejected'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                            title="পেমেন্ট স্ট্যাটাস (পরিবর্তন করলে স্বয়ংক্রিয় এসএমএস যাবে)"
                          >
                            <option value="pending_verification">⏳ TrxID যাচাই চলছে</option>
                            <option value="verified">✓ পেমেন্ট নিশ্চিত (Verified)</option>
                            <option value="rejected">✕ পেমেন্ট বাতিল (Rejected)</option>
                          </select>

                          {/* Order progress dropdown with auto-SMS trigger */}
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChangeWithSMS(order, e.target.value as any)}
                            className="text-xs bg-neutral-100 border border-neutral-300 rounded-lg px-2.5 py-1.5 font-medium cursor-pointer"
                            title="অর্ডার স্ট্যাটাস (পরিবর্তন করলে স্বয়ংক্রিয় এসএমএস যাবে)"
                          >
                            <option value="submitted">নতুন আবেদন</option>
                            <option value="processing">সিভি প্রস্তুত চলছে</option>
                            <option value="applied_100">১০০ কোম্পানিতে আবেদন সম্পন্ন</option>
                            <option value="completed">রিপোর্ট প্রদান সম্পন্ন</option>
                          </select>

                          {/* Send Custom SMS Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForSms(order)}
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg flex items-center gap-1 text-xs font-medium cursor-pointer"
                            title="কাস্টম এসএমএস পাঠান"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">এসএমএস</span>
                          </button>

                          {/* WhatsApp client action */}
                          <a
                            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.fullName)},%20${encodeURIComponent(formSettings.brandName)}%20has%20updated%20your%20order%20${order.orderId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT SITE NAME, NUMBER, GMAIL & PAYMENT SYSTEM */}
            {activeTab === 'settings' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <form onSubmit={handleSaveSettings} className="max-w-3xl mx-auto space-y-5 bg-neutral-50 p-4 sm:p-6 rounded-2xl border border-neutral-200 text-xs">
                  <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">
                        {lang === 'bn' ? 'ওয়েবসাইট, যোগাযোগ ও পেমেন্ট সিস্টেম কনফিগারেশন' : 'Site & Payment Configuration'}
                      </h3>
                      <p className="text-neutral-500 mt-0.5">
                        {lang === 'bn'
                          ? 'এখানে তথ্য পরিবর্তন করলে সম্পূর্ণ ওয়েবসাইটের নাম, ফোন, জিমেইল ও পেমেন্ট নম্বর সাথে সাথে আপডেট হয়ে যাবে।'
                          : 'Updating these settings will instantly reflect across the entire website and SMS gateways.'}
                      </p>
                    </div>

                    {settingsSavedSuccess && (
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold flex items-center gap-1 text-xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>সংরক্ষিত হয়েছে!</span>
                      </div>
                    )}
                  </div>

                  {/* Section 1: Brand & Contact Info */}
                  <div className="space-y-3">
                    <span className="font-bold text-sm text-[#0f3260] block uppercase tracking-wider">
                      ১. প্রতিষ্ঠান ও যোগাযোগের তথ্য (নাম, নাম্বার, জিমেইল)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          ওয়েবসাইট / প্রতিষ্ঠানের নাম (Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formSettings.brandName}
                          onChange={(e) => setFormSettings({ ...formSettings, brandName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          ট্যাগলাইন (Tagline / Subtitle)
                        </label>
                        <input
                          type="text"
                          value={formSettings.brandTagline}
                          onChange={(e) => setFormSettings({ ...formSettings, brandTagline: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          যোগাযোগের নম্বর (হোয়াটসঅ্যাপ ও ইমো নম্বর) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formSettings.hotlinePhone}
                          onChange={(e) => setFormSettings({ ...formSettings, hotlinePhone: e.target.value })}
                          placeholder="+880 1845-130981"
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          অফিসিয়াল জিমেইল / ইমেইল (Gmail / Email) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formSettings.officialEmail}
                          onChange={(e) => setFormSettings({ ...formSettings, officialEmail: e.target.value })}
                          placeholder="mdrahul200900800@gmail.com"
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          টেলিগ্রাম ইউজারনেম (Telegram)
                        </label>
                        <input
                          type="text"
                          value={formSettings.telegramUsername}
                          onChange={(e) => setFormSettings({ ...formSettings, telegramUsername: e.target.value })}
                          placeholder="@rrrvisahelp"
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          অফিস ঠিকানা (Dhaka Office Address)
                        </label>
                        <input
                          type="text"
                          value={formSettings.officeAddress}
                          onChange={(e) => setFormSettings({ ...formSettings, officeAddress: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Payment System Configuration */}
                  <div className="space-y-3 pt-3 border-t border-neutral-200">
                    <span className="font-bold text-sm text-[#0c7c45] block uppercase tracking-wider">
                      ২. পেমেন্ট সিস্টেম কনফিগারেশন (বিকাশ / নগদ / রকেট ও প্যাকেজ ফি)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          পেমেন্ট গ্রহণের নম্বর (বিকাশ/নগদ/রকেট নম্বর) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formSettings.paymentNumber}
                          onChange={(e) => setFormSettings({ ...formSettings, paymentNumber: e.target.value })}
                          placeholder="01762626144"
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono font-bold"
                        />
                        <span className="text-[10px] text-neutral-500 mt-0.5 block">
                          ব্যবহারকারীরা এই নম্বরে টাকা পাঠাবে এবং TrxID জমা দিবে।
                        </span>
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          ১০০ চাকরির আবেদন সার্ভিস ফি (BDT) *
                        </label>
                        <input
                          type="number"
                          required
                          value={formSettings.packages.pkg100}
                          onChange={(e) =>
                            setFormSettings({
                              ...formSettings,
                              packages: { ...formSettings.packages, pkg100: Number(e.target.value) },
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          ৫০ চাকরির আবেদন প্যাকেজ ফি (BDT)
                        </label>
                        <input
                          type="number"
                          value={formSettings.packages.pkg50}
                          onChange={(e) =>
                            setFormSettings({
                              ...formSettings,
                              packages: { ...formSettings.packages, pkg50: Number(e.target.value) },
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-800 mb-1">
                          ৩০ চাকরির আবেদন প্যাকেজ ফি (BDT)
                        </label>
                        <input
                          type="number"
                          value={formSettings.packages.pkg30}
                          onChange={(e) =>
                            setFormSettings({
                              ...formSettings,
                              packages: { ...formSettings.packages, pkg30: Number(e.target.value) },
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Admin Passcode Management */}
                  <div className="space-y-3 pt-3 border-t border-neutral-200">
                    <span className="font-bold text-sm text-neutral-800 block uppercase tracking-wider">
                      ৩. এডমিন লগইন সিকিউরিটি পিন কোড পরিবর্তন
                    </span>

                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">
                        এডমিন পাসকোড (বর্তমান বা নতুন কোড দিন)
                      </label>
                      <input
                        type="text"
                        required
                        value={formSettings.adminSecretCode}
                        onChange={(e) => setFormSettings({ ...formSettings, adminSecretCode: e.target.value })}
                        className="w-full max-w-xs px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono font-bold"
                      />
                      <span className="text-[10px] text-neutral-500 mt-0.5 block">
                        এডমিন লগইন করার সময় এই পিনটি দিতে হবে।
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0f3260] hover:bg-[#0c274a] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: SMS NOTIFICATION LOGS & TEST SIMULATOR */}
            {activeTab === 'sms_logs' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
                {/* Simulator Direct SMS Sender */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">
                        {lang === 'bn' ? 'সরাসরি টেস্ট এসএমএস পাঠান (SMS Gateway Simulator)' : 'Simulate SMS to Any Number'}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        যেকোনো বাংলাদেশী নম্বরে সরাসরি এসএমএস প্রেরণের সিমুলেশন টেস্ট করুন।
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSendDirectTestSMS} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                    <div className="sm:col-span-4">
                      <label className="block font-semibold text-neutral-700 mb-1">প্রাপক মোবাইল নম্বর</label>
                      <input
                        type="tel"
                        required
                        value={testSmsPhone}
                        onChange={(e) => setTestSmsPhone(e.target.value)}
                        placeholder="+88018XXXXXXXX"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg font-mono"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block font-semibold text-neutral-700 mb-1">প্রাপকের নাম</label>
                      <input
                        type="text"
                        value={testSmsName}
                        onChange={(e) => setTestSmsName(e.target.value)}
                        placeholder="গ্রাহকের নাম"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label className="block font-semibold text-neutral-700 mb-1">এসএমএস বার্তা</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={testSmsMessage}
                          onChange={(e) => setTestSmsMessage(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shrink-0 cursor-pointer"
                        >
                          পাঠান
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* SMS Dispatch History */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                      {lang === 'bn' ? `প্রেরিত এসএমএস লগ তালিকা (${smsLogs.length})` : `Sent SMS History (${smsLogs.length})`}
                    </span>
                    <button
                      onClick={() => setSmsLogs(getStoredSMSHistory())}
                      className="text-xs text-[#0f3260] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>রিফ্রেশ</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {smsLogs.map((sms) => (
                      <div
                        key={sms.id}
                        className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-900">{sms.recipientName}</span>
                            <span className="font-mono text-emerald-700 font-semibold">{sms.recipientPhone}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600">
                              Ref: {sms.orderId}
                            </span>
                          </div>
                          <div className="text-neutral-700 bg-neutral-50 p-2 rounded-lg border border-neutral-100 font-sans">
                            {sms.message}
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle className="w-3 h-3" />
                            <span>ডেলিভার্ড (200 OK)</span>
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">{sms.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MANAGE EXISTING JOBS */}
            {activeTab === 'jobs' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-neutral-600">
                    {lang === 'bn' ? `মোট প্রকাশিত চাকরির সার্কুলার: ${jobs.length}` : `Published Circulars: ${jobs.length}`}
                  </span>
                  <button
                    onClick={() => setActiveTab('add_job')}
                    className="px-3 py-1.5 bg-[#0f3260] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'নতুন সার্কুলার দিন' : 'Create Circular'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-300 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                          <span className="font-bold text-neutral-800">
                            {job.flag} {job.country} · {job.city}
                          </span>
                          <span className="font-mono text-emerald-700 font-bold">{job.salaryEur}</span>
                        </div>

                        <h4 className="text-sm font-bold text-neutral-900 leading-snug">{job.titleEn}</h4>
                        <div className="text-xs text-neutral-600 mt-0.5">{job.company}</div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between">
                        <a
                          href={job.originalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#0f3260] hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>মূল লিংক দেখুন</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => {
                            if (confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই সার্কুলার মুছে ফেলবেন?' : 'Are you sure to delete this job?')) {
                              onDeleteJob(job.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: ADD NEW JOB CIRCULAR */}
            {activeTab === 'add_job' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <form onSubmit={handleCreateJob} className="max-w-3xl mx-auto space-y-4 bg-neutral-50 p-4 sm:p-6 rounded-xl border border-neutral-200 text-xs">
                  <div className="border-b border-neutral-200 pb-3">
                    <h3 className="text-base font-bold text-neutral-900">
                      {lang === 'bn' ? 'ইউরোপিয়ান চাকরির সার্কুলার যুক্ত করুন' : 'Add European Job Circular'}
                    </h3>
                    <p className="text-neutral-500 mt-0.5">
                      {lang === 'bn' ? 'আসল কোম্পানি ওয়েবসাইট বা সরকারি নিয়োগ পোর্টালের লিংক প্রদান করুন।' : 'Add authentic company or government job link.'}
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-800 mb-1">
                      {lang === 'bn' ? 'চাকরির মূল সার্কুলার লিংক *' : 'Official Circular URL *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://company.com/career/job-link"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">
                        {lang === 'bn' ? 'পদের নাম (Job Title) *' : 'Job Title *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Warehouse Logistics / Forklift Driver"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">
                        {lang === 'bn' ? 'কোম্পানির নাম (Company Name) *' : 'Company Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DHL Romania / Amazon Poland"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">দেশ (Schengen Country)</label>
                      <select
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                      >
                        {SCHENGEN_COUNTRIES_PORTALS.map((s) => (
                          <option key={s.id} value={s.countryEn}>
                            {s.flag} {s.countryBn} ({s.countryEn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">পেশা (Bangladeshi Trade)</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                      >
                        <option value="factory">ফ্যাক্টরি ও প্যাকেজিং</option>
                        <option value="construction">নির্মাণ ও রাজমিস্ত্রি</option>
                        <option value="driving">ড্রাইভার (হেভি/লাইট)</option>
                        <option value="welding_electric">ওয়েল্ডার ও ইলেকট্রিশিয়ান</option>
                        <option value="hospitality">হোটেল ও রেস্টুরেন্ট</option>
                        <option value="agriculture">কৃষি ও খামার</option>
                        <option value="cleaning_security">ক্লিনার ও সিকিউরিটি</option>
                        <option value="caregiver">কেয়ারগিভার ও নার্সিং</option>
                        <option value="it_tech">আইটি ও ডাটা এন্ট্রি</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-800 mb-1">মাসিক বেতন (EUR)</label>
                      <input
                        type="text"
                        placeholder="€1,100 / month"
                        value={newSalaryEur}
                        onChange={(e) => setNewSalaryEur(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newVisaSponsor}
                        onChange={(e) => setNewVisaSponsor(e.target.checked)}
                      />
                      <span>ভিসা স্পন্সরশিপ</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAccommodation}
                        onChange={(e) => setNewAccommodation(e.target.checked)}
                      />
                      <span>থাকা ফ্রি</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newFood}
                        onChange={(e) => setNewFood(e.target.checked)}
                      />
                      <span>খাওয়া ফ্রি</span>
                    </label>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-800 mb-1">
                      শর্তাবলী (প্রতি লাইনে একটি করে)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="পাসপোর্টের মেয়াদ ২ বছর&#10;মেডিকেল ফিটনেস&#10;পুলিশ ক্লিয়ারেন্স"
                      value={newRequirements}
                      onChange={(e) => setNewRequirements(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0f3260] text-white font-bold rounded-lg hover:bg-[#0c274a] transition-colors cursor-pointer"
                  >
                    সার্কুলার প্রকাশ করুন
                  </button>
                </form>
              </div>
            )}

            {/* TAB 6: ALL 29 SCHENGEN OFFICIAL PORTALS */}
            {activeTab === 'schengen' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3">
                <div className="text-xs text-neutral-600 mb-2">
                  ইউরোপের ২৯টি শেনজেন দেশের সরকারি ও বৈধ নিয়োগ পোর্টাল তালিকা (কোনো ভুয়া সাইট নেই):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SCHENGEN_COUNTRIES_PORTALS.map((portal) => (
                    <div
                      key={portal.id}
                      className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-neutral-900">
                            {portal.flag} {portal.countryBn} ({portal.countryEn})
                          </span>
                          <span className="font-mono text-emerald-700 font-bold">{portal.averageMonthlySalaryEur}</span>
                        </div>
                        <div className="text-neutral-700 font-medium">{portal.officialAgencyName}</div>
                        <div className="text-neutral-500 text-[11px] mt-1">{portal.workPermitNameBn}</div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-neutral-200 flex items-center justify-between">
                        <a
                          href={portal.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0f3260] hover:underline font-bold flex items-center gap-1"
                        >
                          <span>সরকারি পোর্টাল</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <a
                          href={portal.euresUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <span>EURES লিংক</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Order SMS Modal */}
        {selectedOrderForSms && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 text-xs text-neutral-900 shadow-2xl border border-neutral-300">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#0f3260]" />
                  <h4 className="font-bold text-sm">এসএমএস নোটিফিকেশন পাঠান</h4>
                </div>
                <button
                  onClick={() => setSelectedOrderForSms(null)}
                  className="text-neutral-400 hover:text-neutral-700 text-base font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSendCustomOrderSMS} className="mt-4 space-y-3">
                <div>
                  <span className="text-neutral-500 block mb-0.5">গ্রাহক:</span>
                  <div className="font-bold text-sm text-neutral-900">
                    {selectedOrderForSms.fullName} ({selectedOrderForSms.phone})
                  </div>
                  <div className="text-neutral-500 font-mono text-[11px]">
                    অর্ডার আইডি: {selectedOrderForSms.orderId} · TrxID: {selectedOrderForSms.transactionId}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    কাস্টম মেসেজ নোট (ঐচ্ছিক)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="যেমন: আপনার ফাইলটি রোমানিয়ার শীর্ষ ৩টি কোম্পানিতে পাঠানো হয়েছে।"
                    value={customSmsNote}
                    onChange={(e) => setCustomSmsNote(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div className="bg-neutral-100 p-2.5 rounded-lg text-[11px] text-neutral-600 leading-relaxed font-sans">
                  <strong>মেসেজ প্রিভিউ:</strong> {formSettings.brandName}: প্রিয় {selectedOrderForSms.fullName}, আপনার অর্ডার ({selectedOrderForSms.orderId})-এর স্ট্যাটাস আপডেট হয়েছে। {customSmsNote ? `নোট: ${customSmsNote}` : ''} যোগাযোগ: {formSettings.paymentNumber}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#0f3260] hover:bg-[#0c274a] text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    এসএমএস প্রেরণ নিশ্চিত করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForSms(null)}
                    className="px-4 py-2.5 bg-neutral-200 text-neutral-700 font-bold rounded-lg hover:bg-neutral-300 cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
