import React, { useState, useEffect } from 'react';
import { Language } from './types/visa';
import { JobCircular, BulkApplyOrder, SiteSettings, BulkApplyPackage } from './types/job';
import { INITIAL_JOB_CIRCULARS, DEFAULT_SITE_SETTINGS, BULK_APPLY_PACKAGES } from './data/jobData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JobsHub } from './components/JobsHub';
import { SchengenPortalsDirectory } from './components/SchengenPortalsDirectory';
import { BulkApplySection } from './components/BulkApplySection';
import { PackageApplicationPage } from './components/PackageApplicationPage';
import { AdminPanel } from './components/AdminPanel';
import { PostJobModal } from './components/PostJobModal';
import { FloatingContactBar } from './components/FloatingContactBar';
import { SmsNotificationToast } from './components/SmsNotificationToast';
import { DestinationsGrid } from './components/DestinationsGrid';
import { EligibilityChecker } from './components/EligibilityChecker';
import { DocumentChecklist } from './components/DocumentChecklist';
import { StatusTracker } from './components/StatusTracker';
import { EmbassyUpdates } from './components/EmbassyUpdates';
import { Testimonials } from './components/Testimonials';
import { ConsultationBooking } from './components/ConsultationBooking';
import { FaqSection } from './components/FaqSection';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');

  // Site Settings state with local storage persistence
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('rrr_site_settings_v3');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load site settings', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Job circulars state with local storage persistence
  const [jobs, setJobs] = useState<JobCircular[]>(() => {
    try {
      const saved = localStorage.getItem('rrr_jobs_circulars_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load jobs', e);
    }
    return INITIAL_JOB_CIRCULARS;
  });

  // Orders state with local storage persistence
  const [orders, setOrders] = useState<BulkApplyOrder[]>(() => {
    try {
      const saved = localStorage.getItem('rrr_bulk_orders_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
    return [
      {
        orderId: 'RRR-100JOB-8842',
        fullName: 'মোঃ জাহিদ হাসান',
        phone: '+8801712345678',
        telegram: '@zahid_hasan',
        selectedPackage: 'Signature Service: 100 European Applications',
        packagePrice: 4500,
        targetCountries: ['Romania', 'Poland', 'Italy'],
        jobCategories: ['Factory & Food Packaging'],
        experienceYears: '1-3 years',
        education: 'HSC Passed',
        hasPassport: true,
        hasEuropassCV: false,
        paymentMethod: 'bKash',
        paymentNumber: DEFAULT_SITE_SETTINGS.paymentNumber,
        transactionId: '8N7X29A10B',
        paymentStatus: 'verified',
        orderStatus: 'applied_100',
        createdAt: '2026-10-15',
      },
      {
        orderId: 'RRR-100JOB-5190',
        fullName: 'কামরুল আহসান',
        phone: '+8801819876543',
        telegram: '@kamrul_it',
        selectedPackage: 'Popular Choice: 50 European Applications',
        packagePrice: 2800,
        targetCountries: ['Portugal', 'Germany'],
        jobCategories: ['Construction & Mason', 'Heavy & Light Drivers'],
        experienceYears: '3-5 years',
        education: 'Diploma in Engineering',
        hasPassport: true,
        hasEuropassCV: true,
        paymentMethod: 'Nagad',
        paymentNumber: DEFAULT_SITE_SETTINGS.paymentNumber,
        transactionId: '9K4M82P15C',
        paymentStatus: 'pending_verification',
        orderStatus: 'processing',
        createdAt: '2026-10-17',
      }
    ];
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState<boolean>(false);
  const [preselectedJobForApply, setPreselectedJobForApply] = useState<string | undefined>(undefined);
  const [detailedApplyPackage, setDetailedApplyPackage] = useState<{
    pkg: BulkApplyPackage;
    effectivePrice: number;
  } | null>(null);

  const [selectedCountryForChecklist, setSelectedCountryForChecklist] = useState<string>('schengen');
  const [preselectedCountryForEligibility, setPreselectedCountryForEligibility] = useState<string>('schengen');
  const [trackingSearchQuery, setTrackingSearchQuery] = useState<string>('RRR-8842-BD');
  const [bookingPrefill, setBookingPrefill] = useState<{
    destination: string;
    visaCategory: string;
  }>({
    destination: 'Schengen / Europe (France, Italy, Germany, etc.)',
    visaCategory: 'work',
  });

  useEffect(() => {
    try {
      localStorage.setItem('rrr_site_settings_v3', JSON.stringify(siteSettings));
    } catch (e) {
      console.error('Failed to persist site settings', e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('rrr_jobs_circulars_v2', JSON.stringify(jobs));
    } catch (e) {
      console.error('Failed to persist jobs', e);
    }
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem('rrr_bulk_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }, [orders]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJobAdded = (newJob: JobCircular) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const handleNewOrder = (newOrder: BulkApplyOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: BulkApplyOrder['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const handleUpdatePaymentStatus = (orderId: string, status: BulkApplyOrder['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, paymentStatus: status } : o))
    );
  };

  const handleApplyThroughRRR = (job: JobCircular) => {
    setPreselectedJobForApply(job.titleEn);
    const pkg100 = BULK_APPLY_PACKAGES.find((p) => p.id === 'pkg-100') || BULK_APPLY_PACKAGES[2];
    setDetailedApplyPackage({
      pkg: pkg100,
      effectivePrice: siteSettings.packages.pkg100,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCountryChecklistSelect = (countryId: string) => {
    setSelectedCountryForChecklist(countryId);
    scrollToSection('documents');
  };

  const handleCountryEligibilitySelect = (countryId: string) => {
    setPreselectedCountryForEligibility(countryId);
    scrollToSection('eligibility');
  };

  const handleBookWithProfile = (profile: { country: string; visaType: string; score: number }) => {
    setBookingPrefill({
      destination: profile.country,
      visaCategory: profile.visaType,
    });
    scrollToSection('consultation');
  };

  const handleQuickTrack = (trackingId: string) => {
    setTrackingSearchQuery(trackingId);
    scrollToSection('tracking');
  };

  // If a package was selected for detailed application, render the dedicated Application Page!
  if (detailedApplyPackage) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 font-sans pb-14 sm:pb-0 max-w-full overflow-x-hidden">
        <Navbar
          lang={lang}
          onToggleLang={toggleLanguage}
          onNavigate={(sectionId) => {
            setDetailedApplyPackage(null);
            setTimeout(() => scrollToSection(sectionId), 150);
          }}
          onOpenAdmin={() => setIsAdminOpen(true)}
          hotlinePhone={siteSettings.hotlinePhone}
          brandName={siteSettings.brandName}
        />

        <main className="flex-1 max-w-full overflow-x-hidden">
          <PackageApplicationPage
            lang={lang}
            selectedPackage={detailedApplyPackage.pkg}
            effectivePrice={detailedApplyPackage.effectivePrice}
            paymentNumber={siteSettings.paymentNumber}
            onBack={() => {
              setDetailedApplyPackage(null);
              setTimeout(() => scrollToSection('bulk-apply'), 100);
            }}
            onSubmitOrder={(newOrder) => {
              handleNewOrder(newOrder);
            }}
          />
        </main>

        <ContactFooter
          lang={lang}
          onNavigate={(sectionId) => {
            setDetailedApplyPackage(null);
            setTimeout(() => scrollToSection(sectionId), 150);
          }}
          onOpenAdmin={() => setIsAdminOpen(true)}
          hotlinePhone={siteSettings.hotlinePhone}
          officialEmail={siteSettings.officialEmail}
          officeAddress={siteSettings.officeAddress}
          paymentNumber={siteSettings.paymentNumber}
          telegramUsername={siteSettings.telegramUsername}
        />

        <FloatingContactBar
          lang={lang}
          hotlinePhone={siteSettings.hotlinePhone}
          telegramUsername={siteSettings.telegramUsername}
        />

        <SmsNotificationToast />

        {isAdminOpen && (
          <AdminPanel
            lang={lang}
            jobs={jobs}
            orders={orders}
            siteSettings={siteSettings}
            onAddJob={handleJobAdded}
            onDeleteJob={handleDeleteJob}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onUpdateSiteSettings={(newSettings) => setSiteSettings(newSettings)}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-[#0f3260] selection:text-white font-sans pb-14 sm:pb-0 max-w-full overflow-x-hidden">
      {/* Top Navigation Bar with 3-lines menu (Admin Login strictly inside 3 lines) */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        hotlinePhone={siteSettings.hotlinePhone}
        brandName={siteSettings.brandName}
      />

      <main className="flex-1 max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onNavigate={scrollToSection}
          onQuickTrack={handleQuickTrack}
          brandName={siteSettings.brandName}
          hotlinePhone={siteSettings.hotlinePhone}
          paymentNumber={siteSettings.paymentNumber}
          telegramUsername={siteSettings.telegramUsername}
        />

        {/* European Company Job Circulars Hub with Trade Filters */}
        <JobsHub
          lang={lang}
          jobs={jobs}
          onOpenPostJobModal={() => setIsPostJobModalOpen(true)}
          onApplyThroughRRR={handleApplyThroughRRR}
          onNavigateToSchengen={() => scrollToSection('schengen-portals')}
          paymentNumber={siteSettings.paymentNumber}
        />

        {/* 100 Job Application Service with Mandatory TrxID & Dynamic Payment */}
        <BulkApplySection
          lang={lang}
          preselectedJobTitle={preselectedJobForApply}
          onNewOrder={handleNewOrder}
          paymentNumber={siteSettings.paymentNumber}
          customPrice100={siteSettings.packages.pkg100}
          customPrice50={siteSettings.packages.pkg50}
          customPrice30={siteSettings.packages.pkg30}
          onSelectPackageForDetailApply={(pkg, effectivePrice) => {
            setDetailedApplyPackage({ pkg, effectivePrice });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* All 29 Schengen Countries Official Government Job Portals (No Scams) */}
        <SchengenPortalsDirectory lang={lang} />

        {/* Global Destinations & Consular Fee Matrix */}
        <DestinationsGrid
          lang={lang}
          onSelectCountryForChecklist={handleCountryChecklistSelect}
          onSelectCountryForEligibility={handleCountryEligibilitySelect}
        />

        {/* Interactive Eligibility & Fee Calculator */}
        <EligibilityChecker
          key={`eligibility-${preselectedCountryForEligibility}`}
          lang={lang}
          preselectedCountry={preselectedCountryForEligibility}
          onBookWithProfile={handleBookWithProfile}
        />

        {/* Embassy Document Checklist Generator & Notary Support */}
        <DocumentChecklist
          key={`checklist-${selectedCountryForChecklist}`}
          lang={lang}
          selectedCountryId={selectedCountryForChecklist}
          onSelectCountry={(id) => setSelectedCountryForChecklist(id)}
        />

        {/* Live File Status Tracker */}
        <StatusTracker
          key={`tracker-${trackingSearchQuery}`}
          lang={lang}
          initialTrackingId={trackingSearchQuery}
        />

        {/* Consular Embassy Notices & Slot Alerts */}
        <EmbassyUpdates lang={lang} />

        {/* Real Client Success Proof & Testimonials */}
        <Testimonials lang={lang} />

        {/* Direct Appointment / Consultation Scheduler */}
        <ConsultationBooking
          key={`booking-${bookingPrefill.destination}-${bookingPrefill.visaCategory}`}
          lang={lang}
          initialDestination={bookingPrefill.destination}
          initialCategory={bookingPrefill.visaCategory}
        />

        {/* Frequently Asked Questions */}
        <FaqSection lang={lang} />
      </main>

      {/* Corporate Footer with Office Contacts & Callback Request */}
      <ContactFooter
        lang={lang}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        hotlinePhone={siteSettings.hotlinePhone}
        officialEmail={siteSettings.officialEmail}
        officeAddress={siteSettings.officeAddress}
        paymentNumber={siteSettings.paymentNumber}
        telegramUsername={siteSettings.telegramUsername}
      />

      {/* Floating Action Bar for WhatsApp, IMO, Telegram */}
      <FloatingContactBar
        lang={lang}
        hotlinePhone={siteSettings.hotlinePhone}
        telegramUsername={siteSettings.telegramUsername}
      />

      {/* Real-time Simulated SMS Notification Toast */}
      <SmsNotificationToast />

      {/* Modal to Post / Paste New Job Circular Link */}
      <PostJobModal
        lang={lang}
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobAdded={handleJobAdded}
      />

      {/* Admin Control Panel with Site Settings & SMS Simulator */}
      {isAdminOpen && (
        <AdminPanel
          lang={lang}
          jobs={jobs}
          orders={orders}
          siteSettings={siteSettings}
          onAddJob={handleJobAdded}
          onDeleteJob={handleDeleteJob}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdatePaymentStatus={handleUpdatePaymentStatus}
          onUpdateSiteSettings={(newSettings) => setSiteSettings(newSettings)}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
