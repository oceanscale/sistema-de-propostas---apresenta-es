import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { ArrowRight } from 'lucide-react'

export function SlideClosing({ proposal }: { proposal: Proposal }) {
  const bgImage =
    proposal.closingImage ||
    'https://img.usecurling.com/p/1200/800?q=handshake%20business%20deal%20close&color=black'

  const buttonText = proposal.closingButtonText || 'APROVAR PLANO ESTRATÉGICO'

  return (
    <SlideContainer dark className="relative flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover grayscale"
        />
        <div
          className="absolute inset-0 transition-all"
          style={{
            backgroundColor: proposal.closingOverlayColor || '#000000',
            opacity: (proposal.closingOverlayOpacity ?? 20) / 100,
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-full space-y-12">
        <div className="space-y-6">
          <h2 className="text-6xl font-heading font-bold text-white leading-tight">
            {proposal.closingTitle}
          </h2>

          <p className="text-2xl text-slate-300 font-light max-w-2xl mx-auto">
            "{proposal.closingSubtitle}"
          </p>
        </div>

        <div>
          <a
            href={proposal.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xl py-6 px-16 rounded-full shadow-2xl shadow-sky-500/40 transition-all transform hover:scale-105 no-print"
          >
            {buttonText} <ArrowRight className="w-6 h-6" />
          </a>

          <div className="hidden print:block border-2 border-white/20 p-6 rounded-xl max-w-lg mx-auto bg-slate-800/50 backdrop-blur-sm mt-8">
            <p className="text-slate-400 text-sm uppercase font-bold mb-2">
              Para aprovar este plano, acesse:
            </p>
            <p className="text-sky-400 text-lg font-mono underline break-all">
              {proposal.ctaUrl}
            </p>
          </div>
        </div>

        <div className="w-full border-t border-slate-800/50 pt-10 grid grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold mb-1">
              Preparado para
            </p>
            <p className="text-white text-xl font-medium">
              {proposal.clientName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs uppercase font-bold mb-1">
              Agência
            </p>
            <p className="text-white text-xl font-medium">
              {proposal.agencyName}
            </p>
            <p className="text-slate-500 text-xs">{proposal.agencyCnpj}</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
