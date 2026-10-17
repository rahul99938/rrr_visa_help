import React, { useState } from 'react';
import { COUNTRIES } from '../data/visaData';
import { Language } from '../types/visa';
import { Calendar, Clock, MapPin, Video, CheckCircle2, Phone, Mail, User, ShieldCheck } from 'lucide-react';

interface ConsultationBookingProps {
  lang: Language;
  initialDestination?: string;
  initialCategory?: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  lang,
  initialDestination = 'Schengen / Europe (France, Italy, Germany, etc.)',
  initialCategory = 'tourist',
}) => {
  const [meetingType, setMeetingType] = useState<'office' | 'online'>('office');
  const [destination, setDestination] = useState<string>(initialDestination);
  const [visaCategory, setVisaCategory] = useState<string>(initialCategory);
  const [preferredDate, setPreferredDate] = useState<string>('2026-10-22');
  const [preferredTime, setPreferredTime] = useState<string>('11:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [bookingSuccess, setBookingSuccess] = useState<{
    referenceId: string;
    fullName: string;
    phone: string;
    meetingType: 'office' | 'online';
    destination: string;
    date: string;
    time: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const timeSlots = ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম ও ফোন নম্বর প্রদান করুন।'
          : 'Please provide both your full name and contact phone number.'
      );
      return;
    }

    const ref = `RRR-APPT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingSuccess({
      referenceId: ref,
      fullName,
      phone,
      meetingType,
      destination,
      date: preferredDate,
      time: preferredTime,
    });
    setErrorMsg(null);
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <section id="consultation" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {lang === 'bn' ? 'ফ্রি ওয়ান-অন-ওয়ান কাউন্সেলিং' : 'Direct Consular Advisory'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {lang === 'bn' ? 'অভিজ্ঞ ভিসা কনসালট্যান্টের সাথে অ্যাপয়েন্টমেন্ট বুক করুন' : 'Schedule a 1-on-1 Visa Consultation'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {lang === 'bn'
              ? 'আমাদের গুলশান-২ অফিসে সরাসরি এসে অথবা ঘরে বসে অনলাইন ভিডিও কলে ফাইল পর্যালোচনা করুন।'
              : 'Book an in-person session at our Dhaka headquarters or join an online consultation via WhatsApp / Zoom.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-50 border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
          {bookingSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900">
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!' : 'Consultation Confirmed!'}
              </h3>

              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                {lang === 'bn'
                  ? `ধন্যবাদ ${bookingSuccess.fullName}। আপনার অ্যাপয়েন্টমেন্ট রেফারেন্স কোড ${bookingSuccess.referenceId}। আমাদের একজন ভিসা বিশেষজ্ঞ শীঘ্রই ফোনে আপনার সাথে যোগাযোগ করবেন।`
                  : `Thank you, ${bookingSuccess.fullName}. Your consultation reference is ${bookingSuccess.referenceId}. Our case officer will call you to confirm file specifics.`}
              </p>

              <div className="bg-white border border-neutral-200 rounded-lg p-4 text-xs font-mono text-left max-w-md mx-auto space-y-1.5 text-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Booking Ref:</span>
                  <span className="font-bold text-neutral-900">{bookingSuccess.referenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="text-neutral-900">{bookingSuccess.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Mode:</span>
                  <span className="text-neutral-900">
                    {bookingSuccess.meetingType === 'office'
                      ? 'In-Person (Gulshan-2 Office)'
                      : 'Online (WhatsApp / Zoom)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Date & Time:</span>
                  <span className="text-neutral-900">{bookingSuccess.date} at {bookingSuccess.time}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/8801700000000?text=Hello%20RRR%20Visa%20Help%20I%20have%20booked%20an%20appointment%20ref%20${bookingSuccess.referenceId}%20for%20${bookingSuccess.destination}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে নিশ্চয়তা পাঠান' : 'Send to WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold rounded-lg transition-colors"
                >
                  {lang === 'bn' ? 'আরেকটি বুকিং করুন' : 'Book Another Session'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meeting Mode Toggle */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  {lang === 'bn' ? 'পরামর্শের মাধ্যম নির্বাচন করুন' : 'Select Meeting Mode'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMeetingType('office')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      meetingType === 'office'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'অফিস মিটিং (গুলশান-২)' : 'In-Office (Gulshan-2)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMeetingType('online')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      meetingType === 'online'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'অনলাইন কল (WhatsApp/Zoom)' : 'Online (WhatsApp / Zoom)'}</span>
                  </button>
                </div>
              </div>

              {/* Destination & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'কাঙ্ক্ষিত গন্তব্য' : 'Target Destination'}
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.id} value={c.nameEn}>
                        {c.flag} {lang === 'bn' ? c.nameBn : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'ভিসার ধরন' : 'Visa Category'}
                  </label>
                  <select
                    value={visaCategory}
                    onChange={(e) => setVisaCategory(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="tourist">{lang === 'bn' ? 'ট্যুরিস্ট / ভিজিট ভিসা' : 'Tourist / Visitor'}</option>
                    <option value="student">{lang === 'bn' ? 'স্টুডেন্ট / উচ্চশিক্ষা' : 'Student / Higher Studies'}</option>
                    <option value="business">{lang === 'bn' ? 'বিজনেস / কনফারেন্স' : 'Business / Corporate'}</option>
                    <option value="work">{lang === 'bn' ? 'ওয়ার্ক পারমিট / চাকরি' : 'Work Permit / Employment'}</option>
                    <option value="family">{lang === 'bn' ? 'ফ্যামিলি রিইউনিয়ন / স্পন্সর' : 'Family Sponsorship'}</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'পছন্দের তারিখ' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min="2026-10-18"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'পছন্দের সময়' : 'Time Slot'}
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ শফিকুল ইসলাম' : 'e.g. Md. Shafiqul Islam'}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {lang === 'bn' ? 'ইমেইল অ্যাড্রেস (ঐচ্ছিক)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Free Appointment'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>
                  {lang === 'bn'
                    ? 'আপনার ব্যক্তিগত তথ্যের ১০০% গোপনীয়তা রক্ষা করা হয়।'
                    : 'Your personal and passport details remain confidential.'}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
