/** Row shape matching the `payments` Supabase table (snake_case). */
export interface PaymentRow {
  id: string;
  amount: number;
  stripe_payment_id: string | null;
  notes: string | null;
  created_at: string;
}

/** Payload for inserting a new payment. */
export type PaymentInsert = Omit<PaymentRow, 'id' | 'created_at'>;
