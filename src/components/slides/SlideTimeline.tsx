import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideTimeline({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Roadmap de Implementação
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Cronograma - 90 Dias
          </h2>
        </div>
      </div>

      <div className="space-y-8">
        {/* Phase 1 */}
        <div className="relative pl-8 border-l-2 border-slate-200">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Mês 1: Setup & Estruturação
          </h3>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Auditoria de Tagueamento
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Criação de Landing Pages
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Configuração de Campanhas
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="relative pl-8 border-l-2 border-sky-200">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-400 border-2 border-white"></div>
          <h3 className="text-xl font-bold text-sky-600 mb-2">
            Mês 2: Validação & Testes A/B
          </h3>
          <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Testes de Criativos
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Otimização de Públicos
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Refinamento de Palavras-Chave
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="relative pl-8 border-l-2 border-emerald-200">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
          <h3 className="text-xl font-bold text-emerald-600 mb-2">
            Mês 3: Escala & Otimização de ROI
          </h3>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Aumento de Verba Gradual
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Foco em Redução de CAC
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium">
              Expansão de Canais
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
