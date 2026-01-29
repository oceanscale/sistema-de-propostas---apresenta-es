import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Target, TrendingUp, Users, Zap } from 'lucide-react'

export function SlideProjection({ proposal }: { proposal: Proposal }) {
  // Redesigned based on ANEXO 7 Description (Grid of cards)
  return (
    <SlideContainer id="projection">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.projectionSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.projectionTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 h-full items-start pt-12">
        {proposal.projectionCards?.map((card, i) => (
          <div
            key={i}
            className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group h-[300px]"
          >
            <div className="absolute top-0 right-0 p-3">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {card.tag}
              </span>
            </div>

            <div className="mt-8 mb-auto">
              <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wide mb-2">
                {card.title}
              </h3>
              <p className="text-5xl font-bold text-slate-900 tracking-tight">
                {card.metric}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-4">
              <p className="text-sm text-slate-500 font-medium">
                {card.subtext}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-50 p-6 rounded-xl border border-slate-200 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">
            Cenário Base
          </p>
          <p className="font-medium text-slate-900">
            Média dos últimos 3 meses
          </p>
        </div>
        <div className="h-8 w-[1px] bg-slate-200"></div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">
            Investimento
          </p>
          <p className="font-medium text-slate-900">
            R$ {proposal.currentInvestment}
          </p>
        </div>
        <div className="h-8 w-[1px] bg-slate-200"></div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">Projeção</p>
          <p className="font-medium text-slate-900">90 Dias</p>
        </div>
      </div>
    </SlideContainer>
  )
}
