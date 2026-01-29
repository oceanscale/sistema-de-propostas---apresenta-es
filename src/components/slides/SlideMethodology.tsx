import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import { Cpu, BarChart3, Search, ShieldCheck, Zap } from 'lucide-react'

export function SlideMethodology({ proposal }: { proposal: Proposal }) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'cpu':
        return Cpu
      case 'barChart':
        return BarChart3
      case 'search':
        return Search
      default:
        return Cpu
    }
  }

  const colors = [
    {
      bg: 'bg-slate-900',
      text: 'text-white',
      iconBg: 'bg-sky-500/20',
      iconColor: 'text-sky-400',
      desc: 'text-slate-400',
    },
    {
      bg: 'bg-white',
      text: 'text-slate-900',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      desc: 'text-slate-600',
    },
    {
      bg: 'bg-white',
      text: 'text-slate-900',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      desc: 'text-slate-600',
    },
  ]

  return (
    <SlideContainer id="methodology">
      <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.methodologySubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.methodologyTitle}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          {proposal.methodologyItems?.map((item, i) => {
            const Icon = getIcon(item.icon)
            const style = colors[i] || colors[1]
            return (
              <div
                key={i}
                className={`${style.bg} p-6 rounded-2xl border ${i === 0 ? 'border-slate-800' : 'border-slate-200'} flex gap-4 items-start shadow-sm relative overflow-hidden group`}
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-opacity opacity-50 group-hover:opacity-100"></div>
                )}
                <div className={`${style.iconBg} p-3 rounded-xl`}>
                  <Icon className={`w-8 h-8 ${style.iconColor}`} />
                </div>
                <div className="relative z-10">
                  <h3 className={`font-bold text-lg ${style.text} mb-2`}>
                    {item.title}
                  </h3>
                  <p className={`${style.desc} text-sm leading-relaxed`}>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-slate-700" />
                Garantia de Qualidade
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    1
                  </div>
                  <span className="text-slate-700 font-medium">
                    Time Sênior Dedicado (Sem Juniors)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    2
                  </div>
                  <span className="text-slate-700 font-medium">
                    Acesso a APIs Oficiais (Meta/Google)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 font-bold text-sm">
                    3
                  </div>
                  <span className="text-slate-700 font-medium">
                    Transparência Total de Dados
                  </span>
                </li>
              </ul>
              {proposal.methodologyText && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-slate-100 text-sm text-slate-600 italic">
                  "{proposal.methodologyText}"
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <p className="font-bold text-slate-900 text-sm">
                  Omnichannel Nativo
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Integração total entre canais e CRM. O dado que entra em um
                canal alimenta a inteligência do outro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}
