import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import {
  Target,
  Users,
  Zap,
  ExternalLink,
  Brain,
  Briefcase,
} from 'lucide-react'

export function SlideSummary({ proposal }: { proposal: Proposal }) {
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
        <div className="col-span-12 mb-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
          <div className="space-y-4 flex-1 mr-8">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">
                Objetivo Principal
              </p>
              <p className="text-lg font-medium text-slate-900 leading-snug">
                {proposal.clientObjective || 'Definir objetivo no editor.'}
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Site
                </p>
                <a
                  href={`https://${proposal.clientUrl}`}
                  target="_blank"
                  className="text-sky-600 hover:underline font-medium"
                >
                  {proposal.clientUrl}
                </a>
              </div>
              {proposal.summaryLinks?.map((link, i) => (
                <div key={i}>
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    {link.title}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    className="text-slate-600 hover:underline flex items-center gap-1"
                  >
                    {link.url.replace(/^https?:\/\//, '')}{' '}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="w-48 text-right">
            <div className="bg-sky-50 p-4 rounded-xl inline-block text-center">
              <p className="text-3xl font-bold text-sky-600">
                {proposal.summaryMetrics?.[0]?.value}
              </p>
              <p className="text-xs text-slate-500 uppercase font-bold">
                {proposal.summaryMetrics?.[0]?.label}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 bg-slate-900 text-white p-8 rounded-2xl flex-grow relative overflow-hidden shadow-xl min-h-[400px]">
          <div
            className="absolute inset-0 transition-all z-0"
            style={{ opacity: (proposal.summaryOverlayOpacity ?? 30) / 100 }}
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
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Tríade de Performance
            </h3>

            <div className="grid grid-cols-3 gap-8 flex-1">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="bg-sky-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-sky-400" />
                </div>
                <h4 className="font-bold text-xl text-sky-200 mb-3">
                  Marketing
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {triad.marketing}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-bold text-xl text-purple-200 mb-3">
                  Inteligência (IA)
                </h4>
                <p className="text-slate-300 leading-relaxed">{triad.ai}</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-xl text-emerald-200 mb-3">
                  Comercial
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {triad.commercial}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
