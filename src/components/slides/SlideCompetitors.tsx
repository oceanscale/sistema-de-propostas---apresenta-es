import { SlideContainer } from '@/components/SlideContainer'
import { Proposal } from '@/types/proposal'
import {
  Globe,
  Search,
  CheckCircle2,
  Trophy,
  Target,
  ExternalLink,
  XCircle,
} from 'lucide-react'

export function SlideCompetitors({ proposal }: { proposal: Proposal }) {
  const formatUrl = (url: string) => {
    if (!url) return '#'
    return url.startsWith('http') ? url : `https://${url}`
  }

  const displayUrl = (url: string) => {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  }

  return (
    <SlideContainer>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {proposal.competitorsSubtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {proposal.competitorsTitle}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {proposal.marketBenchmarking && (
          <div className="bg-slate-50 border-l-4 border-sky-500 p-4 rounded-r-lg">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1 uppercase tracking-wide">
              <Target className="w-4 h-4 text-sky-600" />
              Cenário de Mercado
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {proposal.marketBenchmarking}
            </p>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 w-[15%] font-bold text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-yellow-400" />
                    Concorrente
                  </div>
                </th>
                <th className="p-3 w-[15%] font-bold text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-blue-400" />
                    Website
                  </div>
                </th>
                <th className="p-3 w-[25%] font-bold text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Search className="w-3 h-3 text-purple-400" />
                    Presença
                  </div>
                </th>
                <th className="p-3 w-[22.5%] font-bold text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Fortes
                  </div>
                </th>
                <th className="p-3 w-[22.5%] font-bold text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-3 h-3 text-red-400" />
                    Fracos
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {proposal.competitorsData.length > 0 ? (
                proposal.competitorsData.slice(0, 5).map((comp, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-3 align-top">
                      <div className="font-bold text-slate-900 text-sm">
                        {comp.name}
                      </div>
                    </td>
                    <td className="p-3 align-top">
                      <a
                        href={formatUrl(comp.website)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-600 hover:text-sky-800 hover:underline flex items-center gap-1 text-xs font-medium group truncate"
                      >
                        {displayUrl(comp.website)}
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </td>
                    <td className="p-3 align-top">
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {comp.presence}
                      </p>
                    </td>
                    <td className="p-3 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {comp.strengths?.map((strength, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {comp.weaknesses?.map((weakness, wIdx) => (
                          <span
                            key={wIdx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-200"
                          >
                            {weakness}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-12 text-center text-slate-400 text-sm italic"
                  >
                    Nenhum concorrente cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SlideContainer>
  )
}
