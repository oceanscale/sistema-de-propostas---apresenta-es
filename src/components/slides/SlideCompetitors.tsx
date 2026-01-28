import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { ShieldAlert, TrendingUp, XCircle, Trophy } from 'lucide-react'

export function SlideCompetitors({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Inteligência de Mercado
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Análise Competitiva
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-12 mb-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-3">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              Cenário de Mercado
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {proposal.marketBenchmarking}
            </p>
          </div>
        </div>

        {proposal.competitorsData.map((comp, i) => (
          <div
            key={i}
            className="col-span-6 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xl">
                {comp.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{comp.name}</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase text-emerald-700">
                    Ponto Forte
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {comp.strength}
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold uppercase text-red-700">
                    Ponto Fraco (GAP)
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {comp.weakness}
                </p>
              </div>
            </div>
          </div>
        ))}

        {proposal.competitorsData.length === 0 && (
          <div className="col-span-12 text-center text-slate-400 py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            Nenhum concorrente adicionado.
          </div>
        )}
      </div>
    </SlideContainer>
  )
}
