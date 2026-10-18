import React, { useState } from 'react';
import { Language } from '../types/visa';
import { BrandLogo } from './BrandLogo';
import { Globe2, PhoneCall, Menu, X, Lock, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  hotlinePhone?: string;
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onNavigate,
  onOpenAdmin,
  hotlinePhone = '+880 1845-130981',
  brandName = 'RRR Visa Help',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'jobs', labelEn: 'Europe Jobs', labelBn: 'ইউরোপের চাকরি' },
    { id: 'bulk-apply', labelEn: '100 Job Apply Service', labelBn: '১০০ চাকরির আবেদন' },
    { id: 'schengen-portals', labelEn: '29 Schengen Portals', labelBn: '২৯টি শেনজেন পোর্টাল' },
    { id: 'destinations', labelEn: 'Visa Catalog', labelBn: 'ভিসা ও গন্তব্য' },
    { id: 'tracking', labelEn: 'Track File', labelBn: 'ফাইল ট্র্যাকিং' },
  ];

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  const cleanPhone = hotlinePhone.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Bar: Zone 1 (Logo) - Zone 2 (Nav Links) - Zone 3 (Language & 3-Line Menu) */}
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-18 sm:h-20 max-w-full">
          {/* Zone 1: Logo element, responsive scaling so it never pushes out buttons on mobile */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group shrink min-w-0"
          >
            <BrandLogo size="md" showSubtitle={true} className="max-w-[210px] sm:max-w-none" />
          </a>

          {/* Zone 2: Navigation Links for wide screens */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-neutral-700">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="hover:text-[#0f3260] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
              >
                {lang === 'bn' ? item.labelBn : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Zone 3: Language Switcher and 3-lines menu (৩ টা দাগ) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              title="Toggle English / Bengali"
            >
              <Globe2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Direct 3D WhatsApp / IMO hotline on medium+ screens */}
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white btn-3d-whatsapp rounded-xl shrink-0 cursor-pointer shadow-sm"
              title={`WhatsApp / IMO: ${hotlinePhone}`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="font-mono">{hotlinePhone}</span>
            </a>

            {/* 3 LINES MENU BUTTON (৩ টা দাগ) - Admin Login is strictly placed inside this menu! */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-neutral-800 hover:text-[#0f3260] rounded-xl hover:bg-neutral-100 focus:outline-none cursor-pointer flex items-center gap-1.5 border border-neutral-200 shadow-xs"
              aria-label="Toggle Menu"
              title={lang === 'bn' ? 'মেনু ও অ্যাডমিন (৩ টা দাগ)' : 'Menu & Admin (3 Lines)'}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-neutral-900" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3 LINES DRAWER / MODAL MENU (৩ টা দাগের ভেতরের মেনু) */}
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs text-neutral-500">
              <span className="font-bold text-neutral-800 uppercase tracking-wider">
                {lang === 'bn' ? 'মেনু ও নেভিগেশন' : 'Navigation & Tools'}
              </span>
              <span className="font-mono text-emerald-700 font-semibold">{hotlinePhone}</span>
            </div>

            {/* Navigation links inside 3-lines menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className="text-left text-xs sm:text-sm font-semibold text-neutral-800 p-2.5 rounded-lg border border-neutral-100 bg-neutral-50 hover:bg-blue-50/50 hover:border-blue-200 hover:text-[#0f3260] cursor-pointer transition-colors"
                >
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </button>
              ))}
            </div>

            {/* Admin Login button INSIDE the 3 lines menu */}
            <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full sm:w-auto flex-1 py-3 px-4 text-center text-xs sm:text-sm font-bold text-[#0f3260] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Lock className="w-4 h-4 text-[#0f3260]" />
                <span>{lang === 'bn' ? 'এডমিন লগইন' : 'Admin Login'}</span>
              </button>

              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 text-center text-xs sm:text-sm font-bold text-white btn-3d-whatsapp rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'bn' ? 'WhatsApp সাপোর্ট' : 'WhatsApp'}</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-auto flex-1 py-3 px-4 text-center text-xs sm:text-sm font-bold text-white btn-3d-imo rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'bn' ? 'IMO সাপোর্ট' : 'IMO Support'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
