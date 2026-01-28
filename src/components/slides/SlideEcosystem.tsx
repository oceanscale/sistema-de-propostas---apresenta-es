import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import {
  ArrowRight,
  Globe,
  Database,
  MousePointerClick,
  BarChart3,
  Users2,
} from 'lucide-react'

export function SlideEcosystem({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Jornada do Cliente
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            O Ecossistema de Performance
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center h-[500px] w-full relative">
        <div className="grid grid-cols-3 gap-12 w-full items-center">
          {/* Source - Tráfego */}
          <div className="space-y-4">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg relative group">
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-slate-100 rounded-full p-1 border border-slate-200">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MousePointerClick className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">
                  Fontes de Tráfego
                </h3>
              </div>

              <div className="space-y-3">
                {proposal.channels.slice(0, 4).map((channel, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {channel}
                  </div>
                ))}
                {proposal.channels.length > 4 && (
                  <div className="text-xs text-center text-slate-400 pt-1">
                    e outros canais...
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-sm font-medium text-slate-500">
              Aquisição & Atração
            </p>
          </div>

          {/* Destination - Conversão */}
          <div className="space-y-4">
            <div className="bg-sky-50 p-8 rounded-2xl border border-sky-100 shadow-lg relative">
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-slate-100 rounded-full p-1 border border-slate-200">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/30">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">
                  Zona de Conversão
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white border border-sky-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  Landing Pages
                </div>
                <div className="bg-white border border-sky-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  Website Oficial
                </div>
                <div className="bg-white border border-sky-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  WhatsApp Comercial
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-medium text-sky-600">
              Persuasão & Captura
            </p>
          </div>

          {/* Intelligence - Retenção/Venda */}
          <div className="space-y-4">
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/30">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">
                  Inteligência de Vendas
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white border border-emerald-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  Dashboard BI
                </div>
                <div className="bg-white border border-emerald-100 py-3 px-4 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-emerald-500" />
                  CRM / Pipeline
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-200">
                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded text-center">
                  FEEDBACK LOOP (IA)
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-medium text-emerald-600">
              Vendas & Otimização
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
