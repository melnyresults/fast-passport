import { useQuery } from '@tanstack/react-query';
import { fetchPayments } from '@/lib/queries/payments.queries';
import { mapPaymentRowToDomain } from '@/lib/mappers/payment.mapper';

const PAYMENTS_KEY = ['payments'] as const;

export function usePayments() {
  return useQuery({
    queryKey: PAYMENTS_KEY,
    queryFn: async () => {
      const rows = await fetchPayments();
      return rows.map(mapPaymentRowToDomain);
    },
  });
}
