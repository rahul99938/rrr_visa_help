export type Language = 'en' | 'bn';

export type VisaCategory = 'tourist' | 'student' | 'work' | 'business' | 'family';

export interface CountryVisaInfo {
  id: string;
  nameEn: string;
  nameBn: string;
  region: 'europe' | 'north-america' | 'middle-east' | 'asia-pacific';
  flag: string;
  popularTypes: VisaCategory[];
  processingTime: string;
  processingTimeBn: string;
  embassyFee: string;
  embassyFeeBn: string;
  serviceFeeBDT: number;
  successRate: string;
  interviewRequired: boolean;
  image?: string;
  highlightTextEn: string;
  highlightTextBn: string;
  documents: {
    category: string;
    categoryBn: string;
    items: {
      nameEn: string;
      nameBn: string;
      required: boolean;
      note?: string;
    }[];
  }[];
}

export interface TrackingStep {
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingRecord {
  trackingId: string;
  applicantName: string;
  destinationEn: string;
  destinationBn: string;
  categoryEn: string;
  categoryBn: string;
  submissionDate: string;
  estimatedCompletion: string;
  statusEn: string;
  statusBn: string;
  assignedOfficer: string;
  embassyRefNo: string;
  steps: TrackingStep[];
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameBn: string;
  locationEn: string;
  locationBn: string;
  visaTypeEn: string;
  visaTypeBn: string;
  destinationEn: string;
  destinationBn: string;
  grantedDate: string;
  quoteEn: string;
  quoteBn: string;
  rating: number;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  visaCategory: string;
  meetingType: 'office' | 'online';
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface EmbassyNotice {
  id: string;
  titleEn: string;
  titleBn: string;
  country: string;
  date: string;
  urgency: 'high' | 'normal';
  summaryEn: string;
  summaryBn: string;
}
