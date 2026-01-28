import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'

export function SlideCover({ proposal }: { proposal: Proposal }) {
  return (
    <SlideContainer dark className="relative">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={`https://img.usecurling.com/p/1200/800?q=modern%20skyscrapers%20corporate&color=black`}
          alt="Background"
          className="w-full h-full object-cover grayscale mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full pb-8">
        <div className="space-y-6 mt-16">
          <div className="flex items-center space-x-3">
            <div className="h-1 w-12 bg-sky-400 rounded-full"></div>
            <p className="text-sky-400 font-bold tracking-widest text-sm uppercase">
              Growth Marketing Agency
            </p>
          </div>

          <h1 className="text-7xl font-heading font-bold leading-tight text-white max-w-4xl">
            Plano de Aceleração <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              & Performance
            </span>
          </h1>

          <p className="text-3xl text-slate-300 font-light max-w-2xl">
            Estratégia comercial personalizada para{' '}
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
              Objetivo Estratégico
            </p>
            <p className="text-white text-lg">
              Escala de Receita & Otimização de ROI
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
