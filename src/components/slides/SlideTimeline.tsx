import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Calendar, Rocket, LineChart, Target } from 'lucide-react'

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

      <div className="space-y-6">
        {/* Phase 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 flex flex-col justify-center items-end pr-6 border-r-2 border-slate-200 relative">
            <div className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-300 border-2 border-white z-10"></div>
            <h3 className="text-xl font-bold text-slate-900">Mês 1</h3>
            <p className="text-slate-500 text-sm font-medium">
              Setup & Estruturação
            </p>
          </div>
          <div className="col-span-9 bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-slate-400"></div>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-slate-500" />
              <h4 className="font-bold text-slate-700">Fundação do Projeto</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-slate-100">
                Auditoria de Tagueamento
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-slate-100">
                Criação de Landing Pages
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-slate-100">
                Setup de Campanhas
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 flex flex-col justify-center items-end pr-6 border-r-2 border-sky-200 relative">
            <div className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sky-400 border-2 border-white z-10"></div>
            <h3 className="text-xl font-bold text-sky-600">Mês 2</h3>
            <p className="text-sky-400 text-sm font-medium">
              Validação & Testes
            </p>
          </div>
          <div className="col-span-9 bg-sky-50 border border-sky-100 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-sky-500"></div>
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-5 h-5 text-sky-500" />
              <h4 className="font-bold text-sky-700">Aceleração Inicial</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-sky-100">
                Testes A/B de Criativos
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-sky-100">
                Otimização de Públicos
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-sky-100">
                Refinamento de Keywords
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 flex flex-col justify-center items-end pr-6 border-r-2 border-emerald-200 relative">
            <div className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white z-10"></div>
            <h3 className="text-xl font-bold text-emerald-600">Mês 3</h3>
            <p className="text-emerald-400 text-sm font-medium">
              Escala & Otimização
            </p>
          </div>
          <div className="col-span-9 bg-emerald-50 border border-emerald-100 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="w-5 h-5 text-emerald-500" />
              <h4 className="font-bold text-emerald-700">Maximização de ROI</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-emerald-100">
                Escala de Verba
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-emerald-100">
                Redução de CAC
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-emerald-100">
                Expansão de Canais
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
