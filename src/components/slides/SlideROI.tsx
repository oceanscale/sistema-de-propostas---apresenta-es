import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideROI({ proposal }: { proposal: Proposal }) {
  // Simple mock calculation based on input data
  const investment = proposal.mediaBudget + proposal.agencyFee
  const estimatedRevenue = proposal.currentRevenue * 2.5 // Optimistic projection
  const roi = Math.round(((estimatedRevenue - investment) / investment) * 100)
  const payback = 1.3

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Viabilidade Financeira
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Projeção de ROI e Payback
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-[450px]">
        <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-12 flex flex-col justify-center items-center text-center">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6">
            Payback Estimado (CAC)
          </p>
          <div className="text-9xl font-bold text-slate-900 mb-4 tracking-tighter">
            {payback.toString().replace('.', ',')}{' '}
            <span className="text-3xl font-medium text-slate-400 -ml-4">
              meses
            </span>
          </div>
          <p className="text-slate-500 text-lg">
            O investimento se paga na metade do Mês 2
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-8 overflow-hidden">
            <div className="bg-slate-800 h-full w-[40%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-slate-900 shadow-xl rounded-2xl p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

          <p className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-6 relative z-10">
            ROI Projetado (6 Meses)
          </p>
          <div className="text-9xl font-bold text-white mb-4 relative z-10 tracking-tighter">
            {roi}%
          </div>
          <p className="text-slate-300 text-lg relative z-10">
            Retorno Exponencial sobre Mídia
          </p>

          <div className="mt-8 flex gap-4 relative z-10">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
              <p className="text-xs text-slate-400 uppercase">Investimento</p>
              <p className="font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(investment)}
              </p>
            </div>
            <div className="bg-emerald-500/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-emerald-500/30">
              <p className="text-xs text-emerald-300 uppercase">Retorno Est.</p>
              <p className="font-bold text-emerald-300">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(estimatedRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-2 rounded-full">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <p className="text-emerald-900 font-bold text-lg">
              Potencial de Receita Incremental
            </p>
            <p className="text-emerald-600 text-sm">
              Considerando otimização de funil de 20%
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-emerald-700 font-bold text-3xl">
            +{' '}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            }).format(estimatedRevenue - proposal.currentRevenue)}
            <span className="text-sm font-normal text-emerald-600">/mês</span>
          </p>
        </div>
      </div>
    </SlideContainer>
  )
}
