import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLeads,
  updateLead,
  deleteLead,
  updateLeadStage,
} from '@/lib/queries/leads.queries';
import { mapLeadRowToDomain, mapLeadToUpdate } from '@/lib/mappers/lead.mapper';
import type { Lead } from '@/lib/types/admin';

const LEADS_KEY = ['leads'] as const;

export function useLeads() {
  return useQuery({
    queryKey: LEADS_KEY,
    queryFn: async () => {
      const rows = await fetchLeads();
      return rows.map(mapLeadRowToDomain);
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lead: Lead) => {
      const payload = mapLeadToUpdate(lead);
      await updateLead(lead.id, payload);
    },
    onMutate: async (updatedLead) => {
      await queryClient.cancelQueries({ queryKey: LEADS_KEY });
      const previous = queryClient.getQueryData<Lead[]>(LEADS_KEY);
      queryClient.setQueryData<Lead[]>(LEADS_KEY, (old) =>
        old?.map((l) => (l.id === updatedLead.id ? updatedLead : l))
      );
      return { previous };
    },
    onError: (_err, _lead, context) => {
      if (context?.previous) {
        queryClient.setQueryData(LEADS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLead,
    onMutate: async (leadId) => {
      await queryClient.cancelQueries({ queryKey: LEADS_KEY });
      const previous = queryClient.getQueryData<Lead[]>(LEADS_KEY);
      queryClient.setQueryData<Lead[]>(LEADS_KEY, (old) =>
        old?.filter((l) => l.id !== leadId)
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(LEADS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
    },
  });
}

export function useMoveLeadStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: string }) => {
      await updateLeadStage(id, stage);
    },
    onMutate: async ({ id, stage }) => {
      await queryClient.cancelQueries({ queryKey: LEADS_KEY });
      const previous = queryClient.getQueryData<Lead[]>(LEADS_KEY);
      queryClient.setQueryData<Lead[]>(LEADS_KEY, (old) =>
        old?.map((l) =>
          l.id === id
            ? { ...l, stage: stage as Lead['stage'], updatedAt: new Date().toISOString() }
            : l
        )
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(LEADS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
    },
  });
}
