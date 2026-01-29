import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Check, Star } from 'lucide-react'

export function SlideInvestment({ proposal }: { proposal: Proposal }) {
  // Backwards compatibility if operationalCosts is missing
  const costs = proposal.operationalCosts || [
    { id: '1', name: 'Verba Mídia', value: proposal.mediaBudget },
    { id: '2', name: 'Software/Tech', value: proposal.softwareCost },
  ]

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.investmentSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.investmentTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full items-stretch">
        {/* Left Sidebar - Costs Context */}
        <div className="col-span-3 bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center space-y-8">
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-4">
              Custos Operacionais
            </h4>
            <div className="space-y-4">
              {costs.map((cost, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
                >
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    {cost.name}
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(cost.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-400 italic">
            * Valores pagos diretamente às plataformas ou fornecedores.
          </div>
        </div>

        {/* 3 Tiers Columns */}
        {proposal.investmentTiers.map((tier, i) => (
          <div
            key={i}
            className={`col-span-3 rounded-2xl p-6 flex flex-col relative transition-transform hover:-translate-y-2 duration-300 ${
              tier.recommended
                ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 border-2 border-sky-500'
                : 'bg-white border border-slate-200 shadow-lg text-slate-900'
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-white" /> Recomendado
              </div>
            )}

            <div className="mb-6 text-center">
              <h3
                className={`text-xl font-bold mb-2 ${tier.recommended ? 'text-white' : 'text-slate-800'}`}
              >
                {tier.name}
              </h3>
              <p
                className={`text-xs ${tier.recommended ? 'text-slate-300' : 'text-slate-500'} h-8`}
              >
                {tier.description}
              </p>
            </div>

            <div className="mb-8 text-center">
              <span className="text-3xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(tier.fee)}
              </span>
              <span
                className={`text-sm ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}
              >
                /mês
              </span>
            </div>

            <ul className="space-y-4 flex-1">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div
                    className={`mt-0.5 p-0.5 rounded-full ${tier.recommended ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <span
                    className={
                      tier.recommended ? 'text-slate-200' : 'text-slate-600'
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${
                  tier.recommended
                    ? 'bg-sky-500 hover:bg-sky-400 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Selecionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  )
}
