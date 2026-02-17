'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DollarSign, ExternalLink, Percent, Wallet } from 'lucide-react';
import type { Lead, Payment } from '@/lib/types/admin';

interface PayoutsTabProps {
  leads: Lead[];
  payments: Payment[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function PayoutsTab({ leads, payments }: PayoutsTabProps) {
  const totalClosedRevenue = leads
    .filter((l) => l.stage === 'Converted Customer')
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const revenueShareOwed = totalClosedRevenue * 0.05;
  const amountAlreadyPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstandingBalance = revenueShareOwed - amountAlreadyPaid;

  const kpiCards = [
    {
      title: 'Total Closed Revenue',
      value: formatCurrency(totalClosedRevenue),
      icon: DollarSign,
      description: 'From converted customers',
    },
    {
      title: '5% Revenue Share Owed',
      value: formatCurrency(revenueShareOwed),
      icon: Percent,
      description: 'Commission on closed deals',
    },
    {
      title: 'Amount Already Paid',
      value: formatCurrency(amountAlreadyPaid),
      icon: Wallet,
      description: `${payments.length} payment${payments.length !== 1 ? 's' : ''} made`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
              <CardTitle className="text-xs font-medium font-sans text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-lg font-bold font-sans">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outstanding Balance + Pay Button */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base font-semibold">
            Outstanding Balance
          </CardTitle>
          <CardDescription>
            Amount remaining to be paid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-3xl font-bold font-sans">
                {formatCurrency(outstandingBalance)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {outstandingBalance > 0
                  ? 'Payment due'
                  : outstandingBalance === 0
                    ? 'All caught up!'
                    : 'Overpaid'}
              </p>
            </div>
            {outstandingBalance > 0 && (
              <Button className="gap-2" asChild>
                <a
                  href={`https://buy.stripe.com/test_placeholder?amount=${Math.round(outstandingBalance * 100)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Pay via Stripe
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base font-semibold">
            Payment History
          </CardTitle>
          <CardDescription>Record of all payments made</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No payments recorded yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Stripe Payment ID</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(payment.date)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>
                        {payment.stripePaymentId ? (
                          <Badge variant="outline" className="font-mono text-xs">
                            {payment.stripePaymentId}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {payment.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
