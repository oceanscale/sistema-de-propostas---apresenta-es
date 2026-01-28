import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Check, Info } from 'lucide-react'

export function SlideInvestment({ proposal }: { proposal: Proposal }) {
  const monthlyTotal =
    proposal.agencyFee + proposal.softwareCost + proposal.mediaBudget
  const quarterlyTotal = monthlyTotal * 3

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Proposta Comercial
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Investimento e Condições
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10 items-start">
        {/* Composition Left - Table Style */}
        <div className="col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">
                Discriminação de Investimento
              </h3>
              <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                Valores Mensais
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Agency Fee */}
              <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    Serviços (Agency Fee)
                  </div>
                  <div className="text-xs text-slate-500 mt-1 max-w-[250px]">
                    Gestão Estratégica, Criação, Otimização e Atendimento
                  </div>
                </div>
                <div className="font-bold text-slate-900 text-xl">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.agencyFee)}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    Ferramentas (Tech)
                  </div>
                  <div className="text-xs text-slate-500 mt-1 max-w-[250px]">
                    CRM, Dashboard BI, Ferramentas de Automação
                  </div>
                </div>
                <div className="font-bold text-slate-900 text-xl">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.softwareCost)}
                </div>
              </div>

              {/* Media Budget */}
              <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors bg-sky-50/30">
                <div>
                  <div className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    Verba de Mídia <Info className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 max-w-[250px]">
                    Pago diretamente às plataformas (Google/Meta)
                  </div>
                </div>
                <div className="font-bold text-slate-900 text-xl">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.mediaBudget)}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <span className="font-bold uppercase tracking-wider text-sm text-slate-300">
                Total Mensal Estimado
              </span>
              <span className="font-bold text-2xl">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(monthlyTotal)}
              </span>
            </div>
          </div>

          <div className="bg-sky-100 border border-sky-200 p-4 rounded-xl flex justify-between items-center">
            <span className="text-sky-800 font-bold text-sm uppercase tracking-wide">
              Total do Projeto Trimestral (3 meses)
            </span>
            <span className="text-sky-900 font-bold text-2xl">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(quarterlyTotal)}
            </span>
          </div>
        </div>

        {/* Plan Cards Right - Features */}
        <div className="col-span-6 pl-4">
          <div className="border-2 border-sky-500 bg-white rounded-2xl p-8 relative shadow-2xl h-full flex flex-col">
            <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-wider">
              Plano Growth
            </div>

            <h4 className="font-bold text-sky-600 mb-2 text-xl">
              Escopo de Entrega
            </h4>
            <p className="text-slate-500 text-sm mb-8">
              Tudo que está incluso no seu pacote de aceleração.
            </p>

            <ul className="space-y-4 text-sm text-slate-700 flex-1">
              <li className="flex gap-3 font-medium items-start">
                <div className="bg-sky-100 p-1 rounded-full">
                  <Check className="w-3 h-3 text-sky-600" />
                </div>
                <span>
                  Gestão de {proposal.channels.length} Canais de Mídia (
                  {proposal.channels.join(', ')})
                </span>
              </li>
              <li className="flex gap-3 font-medium items-start">
                <div className="bg-sky-100 p-1 rounded-full">
                  <Check className="w-3 h-3 text-sky-600" />
                </div>
                <span>Setup de Tagueamento Avançado (Server-side)</span>
              </li>
              <li className="flex gap-3 font-medium items-start">
                <div className="bg-sky-100 p-1 rounded-full">
                  <Check className="w-3 h-3 text-sky-600" />
                </div>
                <span>Dashboard em Tempo Real 24/7</span>
              </li>
              <li className="flex gap-3 font-medium items-start">
                <div className="bg-sky-100 p-1 rounded-full">
                  <Check className="w-3 h-3 text-sky-600" />
                </div>
                <span>Reuniões Quinzenais de Resultados</span>
              </li>
              <li className="flex gap-3 font-medium items-start">
                <div className="bg-sky-100 p-1 rounded-full">
                  <Check className="w-3 h-3 text-sky-600" />
                </div>
                <span>Criação de Landing Pages de Alta Conversão</span>
              </li>
              {proposal.addons.slice(0, 3).map((addon, i) => (
                <li key={i} className="flex gap-3 font-medium items-start">
                  <div className="bg-emerald-100 p-1 rounded-full">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span>{addon}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
