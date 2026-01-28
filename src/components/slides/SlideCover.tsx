import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { cn } from '@/lib/utils'

export function SlideCover({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer dark className="relative">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={`https://img.usecurling.com/p/1200/800?q=modern%20architecture%20luxury%20building&color=black`}
          alt="Background"
          className="w-full h-full object-cover grayscale mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="space-y-6 mt-16">
          <div className="flex items-center space-x-3">
            <div className="h-1 w-12 bg-sky-400 rounded-full"></div>
            <p className="text-sky-400 font-bold tracking-widest text-sm uppercase">
              Marketing Digital & Performance
            </p>
          </div>

          <h1 className="text-7xl font-heading font-bold leading-tight text-white max-w-4xl">
            Plano Estratégico <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              de Performance
            </span>
          </h1>

          <p className="text-3xl text-slate-300 font-light">
            {proposal.clientName}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 border-t border-slate-700/50 pt-8 mb-4">
          <div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
              Período
            </p>
            <p className="text-white text-lg">Próximos 90 dias</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
              Objetivo Principal
            </p>
            <p className="text-white text-lg">Aceleração de Vendas & ROI</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
