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
    <SlideContainer id="timeline">
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-1">
            {proposal.timelineSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.timelineTitle}
          </h2>
        </div>
      </div>

      <div className="space-y-6 pt-2">
        {proposal.timelinePhases.map((phase, index) => {
          const Icon = icons[index] || Calendar
          const style = colors[index] || colors[0]

          return (
            <div key={index} className="flex gap-4 items-start">
              {/* Month Column */}
              <div className={`w-24 shrink-0 pt-2`}>
                <div
                  className={`px-3 py-1 rounded-full text-center text-sm font-bold border-2 ${style.border} ${style.bg} ${style.text}`}
                >
                  {phase.month}
                </div>
              </div>

              {/* Content Box */}
              <div
                className={`flex-1 ${style.bg} border ${style.border} p-6 rounded-xl relative overflow-hidden`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`w-5 h-5 ${style.text}`} />
                  <h4 className={`font-bold text-lg ${style.text}`}>
                    {phase.title}
                  </h4>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {phase.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-600 font-medium border border-slate-100 flex items-center justify-center text-center h-full min-h-[50px]"
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
