import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { TrendingUp, ArrowRight } from 'lucide-react'

export function SlideROI({ proposal }: { proposal: Proposal }) {
  const roas = proposal.roasProjected || { roi: '0%', label: 'ROI', note: '' }
  const benchmarks = proposal.roiBenchmarks || []

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.roiSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.roiTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-[450px]">
        {/* ROI Highlight */}
        <div className="bg-slate-900 shadow-xl rounded-2xl p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <p className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-6 relative z-10">
            {roas.label}
          </p>
          <div className="text-9xl font-bold text-white mb-4 relative z-10 tracking-tighter">
            {roas.roi}
          </div>
          <p className="text-slate-300 text-lg relative z-10 max-w-xs">
            {roas.note}
          </p>
        </div>

        {/* Comparison Bars */}
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-sky-500" />
            Crescimento Projetado
          </h3>

          {benchmarks.map((bench, i) => {
            const max = Math.max(bench.current, bench.projected) * 1.1
            const currentPercent = (bench.current / max) * 100
            const projectedPercent = (bench.projected / max) * 100
            const format = (val: number) => {
              if (bench.unit === 'R$')
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(val)
              if (bench.unit === 'x') return `${val}x`
              return val
            }

            return (
              <div key={i}>
                <div className="flex justify-between mb-1 text-sm font-bold">
                  <span className="text-slate-700">{bench.label}</span>
                  <div className="flex gap-4">
                    <span className="text-slate-400">
                      {format(bench.current)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <span className="text-emerald-600">
                      {format(bench.projected)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 relative overflow-hidden">
                  {/* Projected Bar (Background) */}
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-100 rounded-full"
                    style={{ width: `${projectedPercent}%` }}
                  ></div>
                  {/* Current Bar (Foreground) */}
                  <div
                    className="absolute top-0 left-0 h-full bg-slate-400 rounded-full z-10"
                    style={{ width: `${currentPercent}%` }}
                  ></div>
                  {/* Projected Fill (Difference) */}
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full z-0"
                    style={{ width: `${projectedPercent}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideContainer>
  )
}
