'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  BarChart3,
} from 'lucide-react';
import {
  computeKPIs,
  computePipelineDistribution,
  computeLeadSources,
} from '@/lib/mock-data';
import type { Lead, MonthlyRevenue } from '@/lib/types/admin';

const revenueChartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

const pipelineChartConfig = {
  count: { label: 'Leads', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const PIE_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const sourceChartConfig = {
  count: { label: 'Leads', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

interface DashboardTabProps {
  leads: Lead[];
  monthlyRevenue: MonthlyRevenue[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardTab({ leads, monthlyRevenue }: DashboardTabProps) {
  const kpis = computeKPIs(leads);
  const pipelineDistribution = computePipelineDistribution(leads);
  const leadSources = computeLeadSources(leads);

  const kpiCards = [
    {
      title: 'Pipeline Revenue',
      value: formatCurrency(kpis.totalPipelineRevenue),
      icon: DollarSign,
      description: 'Total value across all stages',
    },
    {
      title: 'Qualification Rate',
      value: `${kpis.leadQualificationRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: 'Leads past initial stage',
    },
    {
      title: 'Close Rate',
      value: `${kpis.leadCloseRate.toFixed(1)}%`,
      icon: Target,
      description: 'Leads converted to customers',
    },
    {
      title: 'Total Leads',
      value: kpis.totalLeads.toString(),
      icon: Users,
      description: 'All leads in pipeline',
    },
    {
      title: 'Closed Deals',
      value: kpis.totalClosedDeals.toString(),
      icon: CheckCircle,
      description: 'Successfully converted',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(kpis.totalRevenue),
      icon: BarChart3,
      description: 'From converted customers',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
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

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-base font-semibold">
            Pipeline Revenue Trend
          </CardTitle>
          <CardDescription>Monthly revenue over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
            <LineChart data={monthlyRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(value as number)}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pipeline Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-base font-semibold">
              Pipeline Distribution
            </CardTitle>
            <CardDescription>Leads per pipeline stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pipelineChartConfig} className="h-[300px] w-full">
              <BarChart
                data={pipelineDistribution}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-base font-semibold">
              Lead Sources
            </CardTitle>
            <CardDescription>Where your leads come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sourceChartConfig} className="h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="source" />} />
                <Pie
                  data={leadSources}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  label={({ source, count }) => `${source}: ${count}`}
                >
                  {leadSources.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
