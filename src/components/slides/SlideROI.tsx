import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideROI({ proposal }: { proposal: Proposal }) {
  const roi = 374 // Mocked
  const payback = 1.3 // Mocked

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

      <div className="grid grid-cols-2 gap-12 h-[400px]">
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-12 flex flex-col justify-center items-center text-center">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">
            Tempo de Payback Estimado
          </p>
          <div className="text-8xl font-bold text-slate-900 mb-2">
            {payback.toString().replace('.', ',')}{' '}
            <span className="text-2xl font-medium text-slate-400">meses</span>
          </div>
          <p className="text-slate-500">
            O investimento se paga na metade do Mês 2
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl rounded-2xl p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-4 relative z-10">
            ROI Projetado (6 Meses)
          </p>
          <div className="text-8xl font-bold text-white mb-2 relative z-10">
            {roi}%
          </div>
          <p className="text-indigo-100 relative z-10">
            Retorno Exponencial sobre Mídia
          </p>
        </div>
      </div>

      <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-100 flex justify-between items-center">
        <div>
          <p className="text-slate-900 font-bold text-lg">
            Cenário Conservador
          </p>
          <p className="text-slate-500 text-sm">
            Considerando taxa de conversão atual
          </p>
        </div>
        <div className="text-right">
          <p className="text-emerald-600 font-bold text-xl">+ R$ 45.000/mês</p>
          <p className="text-slate-500 text-sm">
            Incremento de Receita Estimado
          </p>
        </div>
      </div>
    </SlideContainer>
  )
}
