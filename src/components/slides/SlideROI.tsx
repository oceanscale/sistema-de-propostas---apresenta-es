import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { TrendingUp, DollarSign } from 'lucide-react'

export function SlideROI({ proposal }: { proposal: Proposal }) {
  const recommendedTier =
    proposal.investmentTiers.find((t) => t.recommended) ||
    proposal.investmentTiers[1]

  // Calculate total investment using operational costs
  const costs = proposal.operationalCosts || []
  const operationalTotal = costs.reduce((acc, curr) => acc + curr.value, 0)
  const totalInvestment = operationalTotal + recommendedTier.fee

  const ticketMedio =
    proposal.currentSales && proposal.currentRevenue
      ? proposal.currentRevenue / proposal.currentSales
      : 2500

  const projectedRevenue = proposal.funnelProjected.sales * ticketMedio
  const currentRevenue = proposal.currentRevenue

  const roi = Math.round(
    ((projectedRevenue - totalInvestment) / totalInvestment) * 100,
  )

  // Max value for scaling bars
  const maxValue = Math.max(currentRevenue, projectedRevenue) * 1.1

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.roiSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.roiTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-[450px]">
        {/* ROI Highlight */}
        <div className="bg-slate-900 shadow-xl rounded-2xl p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <p className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-6 relative z-10">
            ROI Projetado
          </p>
          <div className="text-9xl font-bold text-white mb-4 relative z-10 tracking-tighter">
            {roi}%
          </div>
          <p className="text-slate-300 text-lg relative z-10 max-w-xs">
            Sobre o investimento total (Fee + Mídia + Tech)
          </p>

          <div className="mt-8 flex gap-4 relative z-10">
            <div className="bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 text-left">
              <p className="text-xs text-slate-400 uppercase font-bold">
                Investimento Total
              </p>
              <p className="font-bold text-lg text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(totalInvestment)}
              </p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-sky-500" />
            Crescimento de Receita
          </h3>

          <div className="space-y-8">
            {/* Current */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-600">Atual</span>
                <span className="font-bold text-slate-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(currentRevenue)}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full"
                  style={{ width: `${(currentRevenue / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Projected */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-emerald-600">
                  Projetado (90 Dias)
                </span>
                <span className="font-bold text-emerald-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(projectedRevenue)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-8 overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(projectedRevenue / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-sky-50 border border-sky-100 p-6 rounded-xl">
            <p className="text-sky-800 text-sm leading-relaxed">
              <span className="font-bold">Payback Acelerado:</span> Com a
              estrutura otimizada, o ponto de equilíbrio ocorre entre o Mês 1 e
              2, maximizando a margem de contribuição.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
