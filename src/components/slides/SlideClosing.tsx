import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { ArrowRight } from 'lucide-react'

export function SlideClosing({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer dark className="relative flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://img.usecurling.com/p/1200/800?q=handshake%20business%20deal%20close&color=black"
          alt="Background"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-10">
        <h2 className="text-6xl font-heading font-bold text-white leading-tight">
          Vamos acelerar o <br />
          <span className="text-sky-400">crescimento</span> juntos?
        </h2>

        <p className="text-2xl text-slate-300 font-light max-w-2xl mx-auto">
          "Do tráfego à venda real. Essa é a promessa da{' '}
          <span className="font-bold text-white">{proposal.agencyName}</span>."
        </p>

        <div className="pt-8">
          <a
            href={proposal.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xl py-6 px-16 rounded-full shadow-2xl shadow-sky-500/40 transition-all transform hover:scale-105 no-print"
          >
            APROVAR PLANO ESTRATÉGICO <ArrowRight className="w-6 h-6" />
          </a>

          {/* Print Only Version */}
          <div className="hidden print:block border-2 border-white/20 p-6 rounded-xl max-w-lg mx-auto bg-slate-800/50 backdrop-blur-sm">
            <p className="text-slate-400 text-sm uppercase font-bold mb-2">
              Para aprovar este plano, acesse:
            </p>
            <p className="text-sky-400 text-lg font-mono underline">
              {proposal.ctaUrl}
            </p>
          </div>
        </div>

        <div className="pt-16 grid grid-cols-2 gap-8 text-left border-t border-slate-800 mt-16 max-w-3xl mx-auto">
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
