import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideClosing({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer dark className="relative flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://img.usecurling.com/p/1200/800?q=handshake%20business%20deal&color=black"
          alt="Background"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
        <h2 className="text-6xl font-heading font-bold text-white leading-tight">
          Vamos acelerar o <br />
          <span className="text-sky-400">crescimento</span> juntos?
        </h2>

        <p className="text-xl text-slate-300">
          "Do tráfego à venda real. Essa é a nossa promessa."
        </p>

        <div className="pt-12">
          <div className="inline-block bg-sky-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg shadow-sky-500/25">
            APROVAR PLANO ESTRATÉGICO
          </div>
        </div>

        <div className="pt-16 grid grid-cols-2 gap-8 text-left border-t border-slate-800 mt-16 max-w-2xl mx-auto">
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold mb-1">
              Preparado para
            </p>
            <p className="text-white text-lg font-medium">
              {proposal.clientName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs uppercase font-bold mb-1">
              Data
            </p>
            <p className="text-white text-lg font-medium">
              {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
