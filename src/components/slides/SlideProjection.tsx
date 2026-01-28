import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function SlideProjection({ proposal }: { proposal: Proposal }) {
  const currentLeads = proposal.funnelCurrent.leads || 50
  const projectedLeads = proposal.funnelProjected.leads || 100

  // Mock projection logic
  const data = [
    { month: 'Atual', leads: currentLeads, projected: currentLeads },
    {
      month: 'Mês 1',
      leads: Math.round(currentLeads * 1.1),
      projected: Math.round(currentLeads * 1.3),
    },
    {
      month: 'Mês 2',
      leads: Math.round(currentLeads * 1.2),
      projected: Math.round(currentLeads * 1.8),
    },
    {
      month: 'Mês 3',
      leads: Math.round(currentLeads * 1.3),
      projected: projectedLeads,
    },
    {
      month: 'Mês 4',
      leads: Math.round(currentLeads * 1.4),
      projected: Math.round(projectedLeads * 1.2),
    },
    {
      month: 'Mês 5',
      leads: Math.round(currentLeads * 1.5),
      projected: Math.round(projectedLeads * 1.4),
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

  const funnelStages = [
    {
      label: 'CLICKS',
      value: proposal.funnelProjected.clicks,
      color: 'bg-sky-200',
    },
    {
      label: 'LEADS',
      value: proposal.funnelProjected.leads,
      color: 'bg-sky-300',
    },
    {
      label: 'MQL',
      value: proposal.funnelProjected.mql,
      color: 'bg-emerald-400',
    },
    {
      label: 'SQL',
      value: proposal.funnelProjected.sql,
      color: 'bg-emerald-500',
    },
    {
      label: 'VENDAS',
      value: proposal.funnelProjected.sales,
      color: 'bg-emerald-600',
    },
  ]

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Funil de Vendas & Performance
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Projeção de Resultados
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 h-[550px]">
        {/* Left: Growth Chart */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-700 mb-4">
            Curva de Crescimento (Leads)
          </h3>
          <div className="flex-1 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="fillProjected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  tick={{ fill: '#64748b', fontSize: 10 }}
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
                  fill="transparent"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  stackId="b"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        {/* Right: Funnel Visualization */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-700 mb-4">
            Funil de Conversão Projetado (Mensal)
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-2">
            {funnelStages.map((stage, i) => {
              const width = 100 - i * 15 // Visual Funnel width
              return (
                <div
                  key={stage.label}
                  className={`h-16 ${stage.color} rounded-lg flex items-center justify-between px-6 text-slate-900 shadow-sm relative group transition-all hover:scale-105`}
                  style={{ width: `${width}%` }}
                >
                  <span className="font-bold text-xs bg-white/30 px-2 py-1 rounded">
                    {stage.label}
                  </span>
                  <span className="font-bold text-xl">
                    {stage.value.toLocaleString()}
                  </span>
                  {/* Conversion Rate Tooltip Simulation */}
                  {i > 0 && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      {Math.round(
                        (stage.value / funnelStages[i - 1].value) * 100,
                      )}
                      %
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
