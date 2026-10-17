export type JobTradeCategory =
  | 'factory'
  | 'construction'
  | 'driving'
  | 'welding_electric'
  | 'hospitality'
  | 'agriculture'
  | 'cleaning_security'
  | 'caregiver'
  | 'it_tech';

export interface JobCircular {
  id: string;
  titleEn: string;
  titleBn: string;
  company: string;
  country: string;
  countryBn: string;
  flag: string;
  city: string;
  category: JobTradeCategory;
  salaryEur: string;
  salaryBDT: string;
  contractType: string;
  visaSponsorship: boolean;
  accommodationProvided: boolean;
  foodProvided: boolean;
  originalLink: string;
  postedDate: string;
  deadline: string;
  requirementsEn: string[];
  requirementsBn: string[];
  sourceName: string;
  isVerifiedSponsor?: boolean;
}

export interface BulkApplyPackage {
  id: string;
  nameEn: string;
  nameBn: string;
  applicationsCount: number;
  priceBDT: number;
  originalPriceBDT: number;
  popular?: boolean;
  featuresEn: string[];
  featuresBn: string[];
}

export interface BulkApplyOrder {
  orderId: string;
  fullName: string;
  phone: string;
  email?: string;
  telegram?: string;
  passportNumber?: string;
  districtAddress?: string;
  age?: string;
  englishSkill?: string;
  selectedPackage: string;
  packagePrice: number;
  targetCountries: string[];
  jobCategories: string[];
  experienceYears: string;
  education: string;
  hasPassport: boolean;
  hasEuropassCV: boolean;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank';
  paymentNumber: string;
  senderPhone?: string;
  transactionId: string; // Mandatory TrxID provided by user
  paymentStatus: 'pending_verification' | 'verified' | 'rejected';
  orderStatus: 'submitted' | 'processing' | 'applied_100' | 'completed';
  serviceAcknowledged?: boolean;
  notes?: string;
  createdAt: string;
}

export interface SchengenPortalInfo {
  id: string;
  countryEn: string;
  countryBn: string;
  flag: string;
  officialAgencyName: string;
  officialPortalUrl: string;
  euresUrl: string;
  workPermitNameEn: string;
  workPermitNameBn: string;
  averageMonthlySalaryEur: string;
  topInDemandTradesEn: string[];
  topInDemandTradesBn: string[];
  isSchengenMember: boolean;
  descriptionEn: string;
  descriptionBn: string;
}

export interface SiteSettings {
  brandName: string;
  brandTagline: string;
  hotlinePhone: string;
  officialEmail: string;
  paymentNumber: string;
  telegramUsername: string;
  telegramUrl: string;
  officeAddress: string;
  adminSecretCode: string;
  packages: {
    pkg30: number;
    pkg50: number;
    pkg100: number;
    pkg200: number;
  };
}
