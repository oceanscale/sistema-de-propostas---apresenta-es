import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Target, TrendingUp, Users, Zap, ExternalLink } from 'lucide-react'

export function SlideSummary({ proposal }: { proposal: Proposal }) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'target':
        return Target
      case 'trending':
        return TrendingUp
      case 'users':
        return Users
      default:
        return Target
    }
  }

  return (
    <SlideContainer id="summary">
      {proposal.summaryPageImage && (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img
            src={proposal.summaryPageImage}
            className="w-full h-full object-cover"
            alt="Page Bg"
          />
        </div>
      )}

      <div className="relative z-10 flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.summarySubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.summaryTitle}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm">Plano Estratégico</p>
          <p className="text-slate-900 font-semibold">{proposal.clientName}</p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-12 h-full">
        <div className="col-span-4 bg-slate-50 rounded-2xl p-8 border border-slate-200 h-fit shadow-sm">
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
                Links Importantes
              </p>
              <div className="space-y-1">
                <a
                  href={`https://${proposal.clientUrl}`}
                  target="_blank"
                  className="text-sm font-medium text-sky-600 hover:underline block truncate"
                  rel="noreferrer"
                >
                  Website Oficial
                </a>
                {proposal.summaryLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    className="text-sm font-medium text-slate-600 hover:text-sky-600 hover:underline block truncate flex items-center gap-1"
                    rel="noreferrer"
                  >
                    {link.title} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-8 flex flex-col justify-between">
          <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 flex-grow relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-30">
              <img
                src={proposal.summaryBoxImage || proposal.summaryPageImage}
                className="w-full h-full object-cover mix-blend-overlay"
                alt="Summary Box Bg"
              />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

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
                      Construir uma máquina de vendas previsível e escalável.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {proposal.summaryMetrics?.slice(0, 3).map((metric, i) => {
              const Icon = getIcon(metric.icon)
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-sky-500 mb-3" />
                  <p className="text-3xl font-bold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="text-slate-500 text-sm font-medium">
                    {metric.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
