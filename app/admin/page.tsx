'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Kanban, CreditCard } from 'lucide-react';
import { DashboardTab } from '@/components/admin/dashboard-tab';
import { PipelineTab } from '@/components/admin/pipeline-tab';
import { PayoutsTab } from '@/components/admin/payouts-tab';
import { MOCK_LEADS, MOCK_PAYMENTS, MOCK_MONTHLY_REVENUE } from '@/lib/mock-data';
import type { Lead } from '@/lib/types/admin';

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
        <TabsTrigger value="dashboard" className="gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="pipeline" className="gap-2">
          <Kanban className="h-4 w-4" />
          <span className="hidden sm:inline">Pipeline</span>
        </TabsTrigger>
        <TabsTrigger value="payouts" className="gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Payouts</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <DashboardTab leads={leads} monthlyRevenue={MOCK_MONTHLY_REVENUE} />
      </TabsContent>

      <TabsContent value="pipeline">
        <PipelineTab leads={leads} onLeadsChange={setLeads} />
      </TabsContent>

      <TabsContent value="payouts">
        <PayoutsTab leads={leads} payments={MOCK_PAYMENTS} />
      </TabsContent>
    </Tabs>
  );
}
