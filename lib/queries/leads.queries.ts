import { supabase } from '@/lib/supabase';
import type { LeadRow, LeadUpdate } from '@/lib/dto/lead.dto';

export async function fetchLeads(): Promise<LeadRow[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateLead(
  id: string,
  payload: LeadUpdate
): Promise<LeadRow> {
  const { data, error } = await supabase
    .from('leads')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

export async function updateLeadStage(
  id: string,
  stage: string
): Promise<LeadRow> {
  return updateLead(id, { stage, updated_at: new Date().toISOString() });
}
