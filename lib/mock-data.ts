import {
  type Lead,
  type Payment,
  type DashboardKPIs,
  type MonthlyRevenue,
  type PipelineDistribution,
  type LeadSourceData,
  PIPELINE_STAGES,
} from '@/lib/types/admin';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    fullName: 'Ahmed Al-Rashid',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    dealValue: 75000,
    notes: 'Interested in Canadian citizenship via investment. Has family in Toronto.',
    stage: 'New Lead / Guide Request',
    source: 'guide-download',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '2',
    fullName: 'Fatima Hassan',
    email: 'fatima.h@example.com',
    phone: '+971509876543',
    dealValue: 50000,
    notes: 'Looking for business immigration pathway.',
    stage: 'Called & Guide Sent',
    source: 'consultation',
    createdAt: '2026-01-28T14:30:00Z',
    updatedAt: '2026-02-02T09:00:00Z',
  },
  {
    id: '3',
    fullName: 'Omar Khalil',
    email: 'omar.k@example.com',
    phone: '+966551234567',
    dealValue: 100000,
    notes: 'High net worth individual. Wants express entry.',
    stage: 'Qualified Lead',
    source: 'referral',
    createdAt: '2026-01-25T08:00:00Z',
    updatedAt: '2026-02-03T11:00:00Z',
  },
  {
    id: '4',
    fullName: 'Sara Mansour',
    email: 'sara.m@example.com',
    phone: '+971504567890',
    dealValue: 60000,
    notes: 'Consulted last week. Wants to proceed.',
    stage: 'Day 3 Follow Up',
    source: 'website',
    createdAt: '2026-01-20T16:00:00Z',
    updatedAt: '2026-02-04T10:00:00Z',
  },
  {
    id: '5',
    fullName: 'Khalid Al-Farsi',
    email: null,
    phone: '+968901234567',
    dealValue: 45000,
    notes: 'Downloaded guide but did not respond to first call.',
    stage: 'Day 4 Follow Up',
    source: 'guide-download',
    createdAt: '2026-01-18T12:00:00Z',
    updatedAt: '2026-02-05T14:00:00Z',
  },
  {
    id: '6',
    fullName: 'Layla Ibrahim',
    email: 'layla.i@example.com',
    phone: '+971507654321',
    dealValue: 80000,
    notes: 'Very interested. Needs to discuss with spouse.',
    stage: 'Day 5 Follow Up',
    source: 'social-media',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-06T08:00:00Z',
  },
  {
    id: '7',
    fullName: 'Nasser Al-Thani',
    email: null,
    phone: '+974551234567',
    dealValue: null,
    notes: 'No response after 3 attempts.',
    stage: 'Bot / No Response',
    source: 'guide-download',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-07T10:00:00Z',
  },
  {
    id: '8',
    fullName: 'Mariam Al-Sayed',
    email: 'mariam@example.com',
    phone: '+971508765432',
    dealValue: 90000,
    notes: 'Had a great call. Need to follow up with documents.',
    stage: 'Call Done & Needs Follow Ups',
    source: 'consultation',
    createdAt: '2026-01-08T11:00:00Z',
    updatedAt: '2026-02-08T15:00:00Z',
  },
  {
    id: '9',
    fullName: 'Youssef Bakri',
    email: 'youssef.b@example.com',
    phone: '+971502345678',
    dealValue: 120000,
    notes: 'Consultation booked for next Monday. Very motivated.',
    stage: 'Booked & Confirmed',
    source: 'referral',
    createdAt: '2026-01-05T13:00:00Z',
    updatedAt: '2026-02-10T09:00:00Z',
  },
  {
    id: '10',
    fullName: 'Aisha Rahman',
    email: 'aisha.r@example.com',
    phone: '+971506789012',
    dealValue: 95000,
    notes: 'Signed contract. Payment processed.',
    stage: 'Converted Customer',
    source: 'consultation',
    createdAt: '2025-12-20T10:00:00Z',
    updatedAt: '2026-02-12T16:00:00Z',
  },
  {
    id: '11',
    fullName: 'Mohammed Tariq',
    email: 'mo.tariq@example.com',
    phone: '+966559876543',
    dealValue: 110000,
    notes: 'Converted via referral from Youssef.',
    stage: 'Converted Customer',
    source: 'referral',
    createdAt: '2025-12-15T14:00:00Z',
    updatedAt: '2026-02-14T10:00:00Z',
  },
  {
    id: '12',
    fullName: 'Rania Haddad',
    email: 'rania@example.com',
    phone: '+961701234567',
    dealValue: 55000,
    notes: 'New lead from Facebook ad campaign.',
    stage: 'New Lead / Guide Request',
    source: 'social-media',
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-02-15T08:00:00Z',
  },
  {
    id: '13',
    fullName: 'Hassan Jaber',
    email: 'hassan.j@example.com',
    phone: '+971503456789',
    dealValue: 70000,
    notes: 'Called and sent guide. Seemed interested.',
    stage: 'Called & Guide Sent',
    source: 'guide-download',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-02-12T09:00:00Z',
  },
  {
    id: '14',
    fullName: 'Dina Khoury',
    email: 'dina.k@example.com',
    phone: '+961709876543',
    dealValue: 85000,
    notes: 'Booked for Thursday. Wants PR pathway info.',
    stage: 'Booked & Confirmed',
    source: 'website',
    createdAt: '2026-02-08T09:00:00Z',
    updatedAt: '2026-02-13T14:00:00Z',
  },
  {
    id: '15',
    fullName: 'Ali Nouri',
    email: null,
    phone: '+971501112233',
    dealValue: null,
    notes: 'Bot detected. Automated responses.',
    stage: 'Bot / No Response',
    source: 'guide-download',
    createdAt: '2026-02-05T15:00:00Z',
    updatedAt: '2026-02-07T15:00:00Z',
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    amount: 4750,
    date: '2026-01-15T10:00:00Z',
    stripePaymentId: 'pi_3OxYz1234567890',
    notes: 'January payout',
  },
  {
    id: '2',
    amount: 5250,
    date: '2025-12-15T10:00:00Z',
    stripePaymentId: 'pi_3OwAb9876543210',
    notes: 'December payout',
  },
  {
    id: '3',
    amount: 3500,
    date: '2025-11-15T10:00:00Z',
    stripePaymentId: 'pi_3OvCd1357924680',
    notes: 'November payout',
  },
];

export function computeKPIs(leads: Lead[]): DashboardKPIs {
  const totalLeads = leads.length;
  const closedLeads = leads.filter((l) => l.stage === 'Converted Customer');
  const qualifiedLeads = leads.filter(
    (l) =>
      l.stage !== 'New Lead / Guide Request' &&
      l.stage !== 'Bot / No Response'
  );

  const totalPipelineRevenue = leads.reduce(
    (sum, l) => sum + (l.dealValue || 0),
    0
  );
  const totalRevenue = closedLeads.reduce(
    (sum, l) => sum + (l.dealValue || 0),
    0
  );

  return {
    totalPipelineRevenue,
    leadQualificationRate:
      totalLeads > 0 ? (qualifiedLeads.length / totalLeads) * 100 : 0,
    leadCloseRate:
      totalLeads > 0 ? (closedLeads.length / totalLeads) * 100 : 0,
    totalLeads,
    totalClosedDeals: closedLeads.length,
    totalRevenue,
  };
}

export function computePipelineDistribution(
  leads: Lead[]
): PipelineDistribution[] {
  return PIPELINE_STAGES.map((stage) => ({
    stage: stage.length > 20 ? stage.substring(0, 18) + '...' : stage,
    count: leads.filter((l) => l.stage === stage).length,
  }));
}

export function computeLeadSources(leads: Lead[]): LeadSourceData[] {
  const sources: Record<string, number> = {};
  leads.forEach((lead) => {
    const label = lead.source.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    sources[label] = (sources[label] || 0) + 1;
  });
  return Object.entries(sources).map(([source, count]) => ({ source, count }));
}

export const MOCK_MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: 'Sep', revenue: 45000 },
  { month: 'Oct', revenue: 62000 },
  { month: 'Nov', revenue: 58000 },
  { month: 'Dec', revenue: 95000 },
  { month: 'Jan', revenue: 110000 },
  { month: 'Feb', revenue: 75000 },
];
