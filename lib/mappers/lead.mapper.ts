import type { LeadRow, LeadUpdate } from '@/lib/dto/lead.dto';
import type { Lead, LeadSource, PipelineStage } from '@/lib/types/admin';

/** Map a Supabase row to the domain Lead model. */
export function mapLeadRowToDomain(row: LeadRow): Lead {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    dealValue: row.deal_value,
    notes: row.notes,
    stage: row.stage as PipelineStage,
    source: row.source as LeadSource,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Map a domain Lead to a Supabase update payload. */
export function mapLeadToUpdate(lead: Lead): LeadUpdate {
  return {
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    deal_value: lead.dealValue,
    notes: lead.notes,
    stage: lead.stage,
    updated_at: new Date().toISOString(),
  };
}
