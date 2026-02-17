import type { PaymentRow } from '@/lib/dto/payment.dto';
import type { Payment } from '@/lib/types/admin';

/** Map a Supabase row to the domain Payment model. */
export function mapPaymentRowToDomain(row: PaymentRow): Payment {
  return {
    id: row.id,
    amount: row.amount,
    date: row.created_at,
    stripePaymentId: row.stripe_payment_id,
    notes: row.notes,
  };
}
