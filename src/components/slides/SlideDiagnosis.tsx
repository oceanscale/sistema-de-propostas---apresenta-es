import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { AlertTriangle, CheckCircle2, Search, XCircle } from 'lucide-react'

export function SlideDiagnosis({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.diagnosisSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.diagnosisTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-full">
        {/* Gaps (Weaknesses) */}
        <div className="bg-red-50/30 rounded-2xl p-8 border border-red-100 h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-700 font-bold text-xl">
                Pontos de Atenção
              </h3>
              <p className="text-red-400 text-sm">
                Lacunas identificadas no processo atual
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            {proposal.gaps?.length > 0 ? (
              proposal.gaps.slice(0, 7).map((gap, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm"
                >
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 font-medium">{gap}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic p-4">
                Nenhum ponto crítico listado.
              </li>
            )}
          </ul>
        </div>

        {/* Opportunities (Strengths) */}
        <div className="bg-emerald-50/30 rounded-2xl p-8 border border-emerald-100 h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Search className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-emerald-700 font-bold text-xl">
                Alavancas de Crescimento
              </h3>
              <p className="text-emerald-500 text-sm">
                Oportunidades de escala imediata
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            {proposal.growthLevers?.length > 0 ? (
              proposal.growthLevers.slice(0, 7).map((lever, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 font-medium">{lever}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic p-4">
                Nenhuma alavanca listada.
              </li>
            )}
          </ul>
        </div>
      </div>
    </SlideContainer>
  )
}
