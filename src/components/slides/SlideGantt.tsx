import { SlideContainer } from '@/components/SlideContainer'
import { GanttPage } from '@/types/proposal'
import { cn } from '@/lib/utils'

export function SlideGantt({ page }: { page: GanttPage }) {
  const getStatusColor = (type: string) => {
    switch (type) {
      case 'planning':
        return 'bg-sky-400'
      case 'execution':
        return 'bg-emerald-500'
      case 'review':
        return 'bg-purple-500'
      default:
        return 'bg-slate-300'
    }
  }

  const getStatusLabel = (type: string) => {
    switch (type) {
      case 'planning':
        return 'Planejamento'
      case 'execution':
        return 'Execução'
      case 'review':
        return 'Revisão / Otimização'
      default:
        return 'Geral'
    }
  }

  return (
    <SlideContainer id={page.id}>
      <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {page.subtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {page.title}
          </h2>
        </div>

        {/* Legend */}
        <div className="flex gap-4">
          {['planning', 'execution', 'review'].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(type)}`}
              ></div>
              <span className="text-xs text-slate-500 uppercase font-bold">
                {getStatusLabel(type)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-12 gap-1 mb-2">
          <div className="col-span-6"></div>
          <div className="col-span-6 bg-slate-900 text-white text-center py-2 rounded-t-lg font-bold text-sm tracking-wider">
            {page.month}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-1 mb-4">
          <div className="col-span-6 font-bold text-slate-700 text-xs uppercase px-4 flex items-end pb-2 border-b border-slate-200">
            Ação / Entregável
          </div>
          <div className="col-span-6 grid grid-cols-4 gap-1">
            {['SEMANA 1', 'SEMANA 2', 'SEMANA 3', 'SEMANA 4'].map((w, i) => (
              <div
                key={i}
                className="bg-slate-100 text-slate-500 text-[10px] font-bold py-1 text-center rounded"
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {page.tasks?.slice(0, 6).map((task, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-1 items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm min-h-[60px]"
            >
              <div className="col-span-6 px-4 font-medium text-slate-800">
                {task.name}
              </div>
              <div className="col-span-6 grid grid-cols-4 gap-1 h-8">
                {[task.s1, task.s2, task.s3, task.s4].map((active, idx) => (
                  <div key={idx} className="relative h-full">
                    {active && (
                      <div
                        className={cn(
                          'absolute inset-0 rounded-md opacity-90 transition-all',
                          getStatusColor(task.type),
                        )}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Array.from({
            length: Math.max(0, 6 - (page.tasks?.length || 0)),
          }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="grid grid-cols-12 gap-1 items-center bg-slate-50/50 p-2 rounded-lg border border-dashed border-slate-200 min-h-[60px]"
            ></div>
          ))}
        </div>
      </div>
    </SlideContainer>
  )
}
