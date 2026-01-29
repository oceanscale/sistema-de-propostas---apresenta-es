import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideCover({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer dark className="relative">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={proposal.coverImage}
          alt="Background"
          className="w-full h-full object-cover grayscale mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full pb-8">
        <div className="space-y-6 mt-16">
          <div className="flex items-center space-x-3">
            <div className="h-1 w-12 bg-sky-400 rounded-full"></div>
            <p className="text-sky-400 font-bold tracking-widest text-sm uppercase">
              {proposal.agencyName}
            </p>
          </div>

          <h1 className="text-7xl font-heading font-bold leading-tight text-white max-w-4xl">
            {proposal.coverTitle}
          </h1>

          <p className="text-3xl text-slate-300 font-light max-w-2xl">
            {proposal.coverSubtitle}{' '}
            <span className="font-semibold text-white">
              {proposal.clientName}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 border-t border-slate-700/50 pt-8 mb-4">
          <div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
              Período do Plano
            </p>
            <p className="text-white text-lg">Próximos 90 dias</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
              Desenvolvido por
            </p>
            <p className="text-white text-lg">{proposal.agencyRep}</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
