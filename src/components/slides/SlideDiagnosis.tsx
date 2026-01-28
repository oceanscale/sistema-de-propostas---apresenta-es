import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

export function SlideDiagnosis({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Análise de Cenário
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Diagnóstico & Oportunidades
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Gaps (Weaknesses) */}
        <div className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
          <h3 className="flex items-center gap-3 text-red-600 font-bold text-xl mb-6">
            <AlertTriangle className="w-6 h-6" />
            Pontos de Atenção (GAPs)
          </h3>
          <ul className="space-y-4">
            {proposal.gaps.length > 0 ? (
              proposal.gaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                  <span className="text-slate-700 font-medium">{gap}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">
                Nenhum ponto crítico identificado.
              </li>
            )}
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
              <span className="text-slate-700 font-medium">
                Dependência de canais orgânicos sem escala previsível
              </span>
            </li>
          </ul>
        </div>

        {/* Opportunities (Strengths) */}
        <div className="bg-emerald-50/50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="flex items-center gap-3 text-emerald-600 font-bold text-xl mb-6">
            <CheckCircle2 className="w-6 h-6" />
            Alavancas de Crescimento
          </h3>
          <ul className="space-y-4">
            {proposal.channels.map((channel, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></span>
                <span className="text-slate-700 font-medium">
                  Exploração agressiva de {channel}
                </span>
              </li>
            ))}
            {proposal.addons.map((addon, i) => (
              <li key={`add-${i}`} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></span>
                <span className="text-slate-700 font-medium">
                  Implementação de {addon}
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></span>
              <span className="text-slate-700 font-medium">
                Otimização de Taxa de Conversão (CRO)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </SlideContainer>
  )
}
