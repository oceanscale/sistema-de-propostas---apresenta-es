import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Target, TrendingUp, Users, Zap } from 'lucide-react'

export function SlideProjection({ proposal }: { proposal: Proposal }) {
  const currentInvestment = proposal.currentInvestment
  const projectedInvestment =
    proposal.mediaBudget +
    proposal.softwareCost +
    (proposal.investmentTiers.find((t) => t.recommended)?.fee || 0)

  return (
    <SlideContainer id="projection">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.projectionSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.projectionTitle}
          </h2>
        </div>
      </div>

      <div className="flex gap-8 h-full">
        {/* Left Side - Context */}
        <div className="w-1/3 bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6">
              Comparativo de
              <br />
              Cenários
            </h3>
            <p className="text-slate-400">
              A projeção baseia-se na otimização de campanhas, melhoria de CRO e
              implementação de inteligência de vendas.
            </p>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="bg-white/10 p-4 rounded-lg border border-white/10">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                Investimento Atual
              </p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(currentInvestment)}
              </p>
            </div>
            <div className="bg-emerald-500/20 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-xs text-emerald-300 uppercase font-bold mb-1">
                Investimento Sugerido
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(projectedInvestment)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Cards Grid */}
        <div className="flex-1 grid grid-cols-2 gap-6 content-start">
          {proposal.projectionCards?.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-50">
                {i === 0 && <Users className="w-6 h-6 text-slate-300" />}
                {i === 1 && <Zap className="w-6 h-6 text-slate-300" />}
                {i === 2 && <Target className="w-6 h-6 text-slate-300" />}
                {i === 3 && <TrendingUp className="w-6 h-6 text-slate-300" />}
              </div>

              <div className="mb-4">
                <span className="bg-sky-50 text-sky-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {card.tag}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">
                {card.title}
              </h3>
              <p className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                {card.metric}
              </p>
              <p className="text-xs text-slate-400">{card.subtext}</p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  )
}
