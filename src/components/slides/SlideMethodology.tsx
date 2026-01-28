import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Cpu, BarChart3, Search, Share2, ShieldCheck, Zap } from 'lucide-react'

export function SlideMethodology({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Diferenciais Competitivos
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Metodologia e Tecnologia
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          {/* Tech Card 1 */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex gap-4 items-start shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-opacity opacity-50 group-hover:opacity-100"></div>
            <div className="bg-sky-500/20 p-3 rounded-xl">
              <Cpu className="w-8 h-8 text-sky-400" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-lg text-white mb-2">
                Growth AI Screening
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nossa tecnologia proprietária analisa leads em tempo real,
                pontuando a intenção de compra antes mesmo do contato comercial,
                priorizando o que realmente converte.
              </p>
            </div>
          </div>

          {/* Tech Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4 items-start shadow-sm">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Dashboard Ao Vivo
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparência radical. Acesso 24/7 a um painel financeiro para
                acompanhar cada centavo investido e o retorno gerado (ROAS).
              </p>
            </div>
          </div>

          {/* Tech Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4 items-start shadow-sm">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Auditoria Semanal (Human + AI)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rotina dupla de otimização: algoritmos preditivos para lances e
                curadoria humana sênior para criativos e estratégia.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-slate-700" />
                Garantia de Qualidade
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    1
                  </div>
                  <span className="text-slate-700 font-medium">
                    Time Sênior Dedicado (Sem Juniors)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    2
                  </div>
                  <span className="text-slate-700 font-medium">
                    Acesso a APIs Oficiais (Meta/Google)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    3
                  </div>
                  <span className="text-slate-700 font-medium">
                    Transparência Total de Dados
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    4
                  </div>
                  <span className="text-slate-700 font-medium">
                    Implementação de CRM Proprietário
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <p className="font-bold text-slate-900 text-sm">
                  Omnichannel Nativo
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Integração total entre{' '}
                {proposal.channels.slice(0, 2).join(', ')} e CRM. O dado que
                entra em um canal alimenta a inteligência do outro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
