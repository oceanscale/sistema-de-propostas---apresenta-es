import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Calendar, Rocket, LineChart } from 'lucide-react'

export function SlideTimeline({ proposal }: { proposal: Proposal }) {
  const icons = [Calendar, Rocket, LineChart]
  const colors = [
    {
      border: 'border-slate-200',
      text: 'text-slate-900',
      bg: 'bg-slate-50',
      line: 'bg-slate-400',
    },
    {
      border: 'border-sky-200',
      text: 'text-sky-600',
      bg: 'bg-sky-50',
      line: 'bg-sky-500',
    },
    {
      border: 'border-emerald-200',
      text: 'text-emerald-600',
      bg: 'bg-emerald-50',
      line: 'bg-emerald-500',
    },
  ]

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            Roadmap de Implementação
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            Cronograma - 90 Dias
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {proposal.timelinePhases.map((phase, index) => {
          const Icon = icons[index] || Calendar
          const style = colors[index] || colors[0]

          return (
            <div key={index} className="grid grid-cols-12 gap-6">
              <div
                className={`col-span-3 flex flex-col justify-center items-end pr-6 border-r-2 ${style.border} relative`}
              >
                <div
                  className={`absolute right-[-9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${style.line} border-2 border-white z-10`}
                ></div>
                <h3 className={`text-xl font-bold ${style.text}`}>
                  {phase.month}
                </h3>
              </div>
              <div
                className={`col-span-9 ${style.bg} border ${style.border} p-6 rounded-xl relative overflow-hidden`}
              >
                <div
                  className={`absolute right-0 top-0 bottom-0 w-2 ${style.line}`}
                ></div>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-5 h-5 ${style.text}`} />
                  <h4 className={`font-bold ${style.text}`}>{phase.title}</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {phase.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-slate-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SlideContainer>
  )
}
