/** Row shape matching the `leads` Supabase table (snake_case). */
export interface LeadRow {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  additional_info: string | null;
  language: string;
  source: string;
  stage: string;
  deal_value: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/** Payload for inserting a new lead (id & timestamps auto-generated). */
export type LeadInsert = Omit<LeadRow, 'id' | 'created_at' | 'updated_at'>;

/** Payload for updating an existing lead. */
export type LeadUpdate = Partial<Omit<LeadRow, 'id' | 'created_at'>> & {
  updated_at?: string;
};
