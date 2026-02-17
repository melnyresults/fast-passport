'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Kanban, CreditCard, LogOut } from 'lucide-react';
import { DashboardTab } from '@/components/admin/dashboard-tab';
import { PipelineTab } from '@/components/admin/pipeline-tab';
import { PayoutsTab } from '@/components/admin/payouts-tab';
import { LoginForm } from '@/components/admin/login-form';
import { useAuth } from '@/hooks/admin/use-auth';
import { useLeads } from '@/hooks/admin/use-leads';
import { usePayments } from '@/hooks/admin/use-payments';
import { MOCK_MONTHLY_REVENUE } from '@/lib/mock-data';

function AdminCRM({ onSignOut }: { onSignOut: () => void }) {
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: payments = [], isLoading: paymentsLoading } = usePayments();

  if (leadsLoading || paymentsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading CRM data...</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
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
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 shrink-0"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>

      <TabsContent value="dashboard">
        <DashboardTab leads={leads} monthlyRevenue={MOCK_MONTHLY_REVENUE} />
      </TabsContent>

      <TabsContent value="pipeline">
        <PipelineTab leads={leads} />
      </TabsContent>

      <TabsContent value="payouts">
        <PayoutsTab leads={leads} payments={payments} />
      </TabsContent>
    </Tabs>
  );
}

export default function AdminPage() {
  const { session, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <LoginForm onSignIn={signIn} />;
  }

  return <AdminCRM onSignOut={signOut} />;
}
