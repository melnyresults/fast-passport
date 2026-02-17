export const PIPELINE_STAGES = [
  'New Lead / Guide Request',
  'Called & Guide Sent',
  'Day 2 Follow Up',
  'Day 3 Follow Up',
  'Day 4 Follow Up',
  'Day 5 Follow Up',
  'Bot / No Response',
  'Call Done & Needs Follow Ups',
  'Booked & Confirmed',
  'Converted Customer',
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export type LeadSource = 'guide-download' | 'consultation' | 'referral' | 'website' | 'social-media';

export interface Lead {
  id: string;
  fullName: string;
  email: string | null;
  phone: string;
  dealValue: number | null;
  notes: string | null;
  stage: PipelineStage;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  stripePaymentId: string | null;
  notes: string | null;
}

export interface DashboardKPIs {
  totalPipelineRevenue: number;
  leadQualificationRate: number;
  leadCloseRate: number;
  totalLeads: number;
  totalClosedDeals: number;
  totalRevenue: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface PipelineDistribution {
  stage: string;
  count: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
}
