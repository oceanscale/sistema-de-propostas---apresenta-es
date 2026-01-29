import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export function SlideProjection({ proposal }: { proposal: Proposal }) {
  const currentInvestment = proposal.currentInvestment
  const suggestedInvestment = proposal.suggestedInvestment || 0
  const funnelSteps = proposal.funnelSteps || []

  return (
    <SlideContainer id="projection">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.projectionSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.projectionTitle}
          </h2>
        </div>
      </div>

      <div className="flex gap-8 h-full">
        {/* Left Side - Cards */}
        <div className="w-1/3 flex flex-col gap-4">
          {proposal.projectionCards?.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-sky-50 text-sky-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {card.tag}
                </span>
                {card.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-slate-300 hover:text-sky-500 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{card.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">
                {card.title}
              </h3>
              <p className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                {card.metric}
              </p>
              <p className="text-xs text-slate-400">{card.subtext}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>

        {/* Middle - Funnel */}
        <div className="w-1/3 flex flex-col justify-center items-center">
          <div className="w-full space-y-2">
            {funnelSteps.map((step, i) => (
              <div key={i} className="relative group">
                <div
                  className="h-16 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: step.color,
                    width: `${100 - i * 15}%`,
                    margin: '0 auto',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)', // Funnel shape approx
                    borderRadius: '4px',
                  }}
                >
                  {step.value}
                </div>
                <p className="text-center text-xs font-bold text-slate-500 uppercase mt-1">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Investment Context */}
        <div className="w-1/3 bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h3 className="text-xl font-bold mb-8 relative z-10">
            Cenário de
            <br />
            Investimento
          </h3>

          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                Atual
              </p>
              <p className="text-3xl font-bold text-slate-200">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(currentInvestment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-400 uppercase font-bold mb-1">
                Sugerido
              </p>
              <p className="text-4xl font-bold text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(suggestedInvestment)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
