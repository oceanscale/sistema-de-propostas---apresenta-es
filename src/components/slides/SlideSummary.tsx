import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Target, TrendingUp, Users, Zap } from 'lucide-react'

export function SlideSummary({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Visão Geral do Projeto
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Sumário Executivo
          </h2>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm">Plano Estratégico</p>
          <p className="text-slate-900 font-semibold">{proposal.clientName}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12 h-full">
        <div className="col-span-4 bg-slate-50 rounded-2xl p-8 border border-slate-200 h-fit">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" /> Perfil do Cliente
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">
                Empresa
              </p>
              <p className="text-lg font-medium text-slate-900">
                {proposal.clientName}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">
                Localização
              </p>
              <p className="text-lg font-medium text-slate-900">
                {proposal.location || 'Nacional'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">
                Setor
              </p>
              <p className="text-lg font-medium text-slate-900">
                {proposal.sector}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">
                Website
              </p>
              <p className="text-sm font-medium text-sky-600 break-words">
                {proposal.clientUrl}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-8 flex flex-col justify-between">
          <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 flex-grow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Estratégia e Foco
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed relative z-10">
              {proposal.executiveSummary}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 relative z-10">
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-400 text-lg">
                      Objetivo Principal
                    </h4>
                    <p className="text-slate-300 text-sm mt-1">
                      Dominar a presença digital através de canais pagos e
                      orgânicos, gerando um fluxo previsível de oportunidades
                      comerciais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Target className="w-8 h-8 text-sky-500 mb-3" />
              <p className="text-3xl font-bold text-slate-900">+100%</p>
              <p className="text-slate-500 text-sm font-medium">
                Leads Qualificados
              </p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" />
              <p className="text-3xl font-bold text-slate-900">ROI 5x</p>
              <p className="text-slate-500 text-sm font-medium">
                Meta de Retorno
              </p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-purple-500 mb-3" />
              <p className="text-3xl font-bold text-slate-900">Top 1</p>
              <p className="text-slate-500 text-sm font-medium">
                Share of Voice
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
