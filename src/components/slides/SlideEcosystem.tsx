import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { ArrowRight, Globe, Smartphone, Database } from 'lucide-react'

export function SlideEcosystem({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Engenharia de Tráfego
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            O Ecossistema de Performance
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-[500px] w-full relative">
        {/* Flow Chart Visualization */}
        <div className="grid grid-cols-3 gap-16 w-full items-center">
          {/* Source */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-900 mb-4">Fontes de Tráfego</p>
              <div className="space-y-2">
                {proposal.channels.map((channel, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-100 py-2 px-4 rounded-lg text-sm font-medium text-slate-600 shadow-sm"
                  >
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-4">
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm text-center relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-8 h-8" />
              </div>
              <div className="bg-sky-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Globe className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-900 mb-2">Zona de Conversão</p>
              <div className="text-sm text-slate-600 space-y-2">
                <p>Landing Pages de Alta Conversão</p>
                <p>Website Institucional</p>
                <p>Pre-sell Pages</p>
              </div>
            </div>
          </div>

          {/* Intelligence */}
          <div className="space-y-4">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Database className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-900 mb-2">
                Inteligência & Vendas
              </p>
              <div className="text-sm text-slate-600 space-y-2">
                <p>CRM & Pipeline de Vendas</p>
                <p>Dashboard de BI</p>
                <p>Automação de E-mail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
