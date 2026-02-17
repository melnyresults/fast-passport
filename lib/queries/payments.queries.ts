import { supabase } from '@/lib/supabase';
import type { PaymentRow, PaymentInsert } from '@/lib/dto/payment.dto';

export async function fetchPayments(): Promise<PaymentRow[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function insertPayment(
  payload: PaymentInsert
): Promise<PaymentRow> {
  const { data, error } = await supabase
    .from('payments')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}
