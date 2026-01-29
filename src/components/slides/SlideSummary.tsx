import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  ExternalLink,
  Brain,
  Briefcase,
} from 'lucide-react'

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

  const triad = proposal.summaryTriad || {
    marketing: '',
    ai: '',
    commercial: '',
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

      <div className="relative z-10 flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
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

      <div className="relative z-10 grid grid-cols-12 gap-8 h-full">
        <div className="col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 h-fit shadow-sm">
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
          <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 flex-grow relative overflow-hidden shadow-xl">
            <div
              className="absolute inset-0 transition-all z-0"
              style={{
                opacity: (proposal.summaryOverlayOpacity ?? 30) / 100,
              }}
            >
              <img
                src={proposal.summaryBoxImage || proposal.summaryPageImage}
                className="w-full h-full object-cover mix-blend-overlay"
                alt="Summary Box Bg"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: proposal.summaryOverlayColor || '#000000',
                  opacity: 0.5,
                }}
              ></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Estratégia e Foco
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-sky-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-sky-400" />
                  </div>
                  <h4 className="font-bold text-sky-200 mb-2">Marketing</h4>
                  <p className="text-sm text-slate-300 leading-snug">
                    {triad.marketing}
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-purple-200 mb-2">
                    Inteligência (IA)
                  </h4>
                  <p className="text-sm text-slate-300 leading-snug">
                    {triad.ai}
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-emerald-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-emerald-200 mb-2">Comercial</h4>
                  <p className="text-sm text-slate-300 leading-snug">
                    {triad.commercial}
                  </p>
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
