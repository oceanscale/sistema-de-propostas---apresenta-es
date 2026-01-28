import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function SlideProjection({ proposal }: { proposal: Proposal }) {
  // Mock Projection Data
  const currentLeads = proposal.currentLeads || 10
  const growthRate = 1.3 // 30% month over month growth mock

  const data = [
    { month: 'Atual', leads: currentLeads, projected: currentLeads },
    {
      month: 'Mês 1',
      leads: currentLeads * 1.1,
      projected: currentLeads * 1.5,
    },
    {
      month: 'Mês 2',
      leads: currentLeads * 1.2,
      projected: currentLeads * 2.2,
    },
    {
      month: 'Mês 3',
      leads: currentLeads * 1.3,
      projected: currentLeads * 3.5,
    },
    {
      month: 'Mês 4',
      leads: currentLeads * 1.4,
      projected: currentLeads * 5.0,
    },
    {
      month: 'Mês 5',
      leads: currentLeads * 1.5,
      projected: currentLeads * 7.0,
    },
    {
      month: 'Mês 6',
      leads: currentLeads * 1.6,
      projected: currentLeads * 9.5,
    },
  ]

  const chartConfig = {
    leads: {
      label: 'Cenário Orgânico',
      color: 'hsl(var(--muted-foreground))',
    },
    projected: {
      label: 'Cenário Growth',
      color: 'hsl(var(--chart-1))',
    },
  }

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Viabilidade Financeira
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Projeção de Crescimento (Leads/Vendas)
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-[500px] w-full bg-slate-50 rounded-2xl p-8 border border-slate-100">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillProjected" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-projected)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-projected)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="projected"
              type="monotone"
              fill="url(#fillProjected)"
              fillOpacity={0.4}
              stroke="var(--color-projected)"
              strokeWidth={3}
              stackId="a"
            />
            <Area
              dataKey="leads"
              type="monotone"
              fill="gray"
              fillOpacity={0.1}
              stroke="gray"
              strokeDasharray="5 5"
              strokeWidth={2}
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="flex justify-center gap-12 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-sky-500 rounded-full"></div>
          <span className="font-bold text-slate-700">
            Cenário Com GrowthProposal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
          <span className="font-medium text-slate-500">
            Cenário Atual (Tendência)
          </span>
        </div>
      </div>
    </SlideContainer>
  )
}
