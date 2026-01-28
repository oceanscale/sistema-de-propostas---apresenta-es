import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Cpu, BarChart3, Search, Share2 } from 'lucide-react'

export function SlideMethodology({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Como Trabalhamos
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Metodologia e Tecnologia
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
            <div className="bg-sky-100 p-3 rounded-xl">
              <Cpu className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Growth AI Screening
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nossa tecnologia proprietária que analisa os leads em tempo
                real, pontuando intenção de compra antes mesmo do contato
                comercial.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Dashboard Ao Vivo
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparência total. Você terá acesso a um painel financeiro
                para acompanhar cada centavo investido e o retorno gerado.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Auditoria Semanal
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rotina de otimização de termos de pesquisa negativa para
                garantir que sua verba não seja desperdiçada com cliques ruins.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Share2 className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Omnichannel Nativo
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Integração total entre Google, Meta e CRM. O dado que entra em
                um canal alimenta a inteligência do outro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
