import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Check } from 'lucide-react'

export function SlideInvestment({ proposal }: { proposal: Proposal }) {
  const total =
    proposal.agencyFee + proposal.softwareCost + proposal.mediaBudget

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Proposta Comercial
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Investimento Total e Pacotes
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Composition Left */}
        <div className="col-span-4 bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            Composição do Investimento
          </h3>

          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-700">Serviços (Fee)</span>
                <span className="font-bold text-sky-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.agencyFee)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Estratégia, Consultoria Técnica, Gestão
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-700">Ferramentas</span>
                <span className="font-bold text-sky-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.softwareCost)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Licenças de Softwares e Dashboards
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-700">Verba de Mídia</span>
                <span className="font-bold text-sky-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(proposal.mediaBudget)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pago diretamente às plataformas
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">
              Total Mensal Estimado
            </p>
            <p className="text-4xl font-bold text-slate-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}
            </p>
          </div>
        </div>

        {/* Plan Cards Right */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-2xl p-8 opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
            <h4 className="text-center font-bold text-slate-700 mb-2">
              ESSENCIAL
            </h4>
            <div className="text-center text-2xl font-bold text-slate-900 mb-6">
              {' '}
              -15% desc.
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <Check className="w-4 h-4" /> Consultoria Básica
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4" /> Acesso às Ferramentas
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4" /> Estratégia Local
              </li>
            </ul>
          </div>

          <div className="border-2 border-sky-500 bg-sky-50/10 rounded-2xl p-8 relative transform scale-105 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Recomendado
            </div>
            <h4 className="text-center font-bold text-sky-600 mb-2">
              COMPLETO (Growth)
            </h4>
            <div className="text-center text-3xl font-bold text-slate-900 mb-6">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(proposal.agencyFee)}
              <span className="text-sm text-slate-500 font-normal">/mês</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2 font-medium">
                <Check className="w-4 h-4 text-sky-500" /> Tudo do Essencial
              </li>
              <li className="flex gap-2 font-medium">
                <Check className="w-4 h-4 text-sky-500" /> Gestão Multi-canal
              </li>
              <li className="flex gap-2 font-medium">
                <Check className="w-4 h-4 text-sky-500" /> Dashboard em Tempo
                Real
              </li>
              <li className="flex gap-2 font-medium">
                <Check className="w-4 h-4 text-sky-500" /> Reuniões Quinzenais
              </li>
              {proposal.addons.slice(0, 3).map((addon, i) => (
                <li key={i} className="flex gap-2 font-medium">
                  <Check className="w-4 h-4 text-sky-500" /> {addon}
                </li>
              ))}
            </ul>
            <div className="mt-8 bg-sky-100 text-sky-700 text-center py-2 rounded-lg text-sm font-bold">
              Melhor Custo-Benefício
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
