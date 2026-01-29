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

  // Group tasks by pillar
  const groupedTasks: Record<string, typeof page.tasks> = {}
  page.tasks.forEach((task) => {
    const pillar = task.pillar || 'Geral'
    if (!groupedTasks[pillar]) groupedTasks[pillar] = []
    groupedTasks[pillar].push(task)
  })

  const pillars = Object.keys(groupedTasks)

  return (
    <SlideContainer id={page.id}>
      <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sky-500 font-bold text-sm tracking-wider uppercase mb-2">
            {page.subtitle}
          </p>
          <h2 className="text-4xl font-heading font-bold text-slate-900">
            {page.title}
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-400"></div>
            <span className="text-xs font-bold text-slate-500">
              PLANEJAMENTO
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-bold text-slate-500">EXECUÇÃO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs font-bold text-slate-500">REVISÃO</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 h-full items-start">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full max-h-[600px]"
          >
            <div className="bg-slate-900 text-white p-3 text-center font-bold text-sm uppercase tracking-wider">
              {pillar}
            </div>
            <div className="grid grid-cols-4 gap-1 p-2 bg-white border-b border-slate-100">
              {['S1', 'S2', 'S3', 'S4'].map((w) => (
                <div
                  key={w}
                  className="text-center text-[10px] font-bold text-slate-400 bg-slate-50 rounded py-1"
                >
                  {w}
                </div>
              ))}
            </div>
            <div className="p-2 space-y-2 overflow-y-auto flex-1">
              {groupedTasks[pillar].map((task, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white border border-slate-100 rounded-lg p-2 shadow-sm"
                >
                  <p
                    className="text-xs font-bold text-slate-700 mb-2 truncate"
                    title={task.name}
                  >
                    {task.name}
                  </p>
                  <div className="grid grid-cols-4 gap-1 h-2">
                    {[task.s1, task.s2, task.s3, task.s4].map(
                      (active, wIdx) => (
                        <div
                          key={wIdx}
                          className="rounded-full bg-slate-100 relative"
                        >
                          {active && (
                            <div
                              className={cn(
                                'absolute inset-0 rounded-full',
                                getStatusColor(task.type),
                              )}
                            ></div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  )
}
