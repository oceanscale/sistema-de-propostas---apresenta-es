import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { TrendingUp, DollarSign } from 'lucide-react'

export function SlideROI({ proposal }: { proposal: Proposal }) {
  const recommendedTier =
    proposal.investmentTiers.find((t) => t.recommended) ||
    proposal.investmentTiers[1]
  const totalInvestment =
    proposal.mediaBudget + proposal.softwareCost + recommendedTier.fee

  const ticketMedio =
    proposal.currentSales && proposal.currentRevenue
      ? proposal.currentRevenue / proposal.currentSales
      : 2500 // Fallback

  const projectedRevenue = proposal.funnelProjected.sales * ticketMedio
  const roi = Math.round(
    ((projectedRevenue - totalInvestment) / totalInvestment) * 100,
  )

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.roiSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.roiTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-[450px]">
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
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <p className="text-xs text-slate-400 uppercase">Receita Est.</p>
              </div>
              <p className="font-bold text-xl text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(projectedRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-sky-500" />
              Crescimento de Receita
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Receita Atual</span>
                  <span className="font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(proposal.currentRevenue)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[30%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-600 font-bold">
                    Receita Projetada
                  </span>
                  <span className="font-bold text-emerald-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(projectedRevenue)}
                  </span>
                </div>
                <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden relative">
                  <div className="bg-emerald-500 h-full w-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-white/50 w-[30%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-100 p-8 rounded-2xl">
            <h4 className="font-bold text-sky-800 mb-2">Payback Acelerado</h4>
            <p className="text-sky-700 text-sm">
              Com a estrutura de campanhas otimizada, o ponto de equilíbrio do
              investimento ocorre entre o <strong>Mês 1 e 2</strong>.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
