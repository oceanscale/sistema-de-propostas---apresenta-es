import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { GanttPage, GanttTask } from '@/types/proposal'

export function WizardStepGantt({ pageId }: { pageId: string }) {
  const { proposal, updateProposal } = useProposal()

  const pageIndex = proposal.ganttPages.findIndex((p) => p.id === pageId)
  const page = proposal.ganttPages[pageIndex]

  if (!page) return <div>Página não encontrada</div>

  const updatePage = (data: Partial<GanttPage>) => {
    const newPages = [...proposal.ganttPages]
    newPages[pageIndex] = { ...newPages[pageIndex], ...data }
    updateProposal({ ganttPages: newPages })
  }

  const addTask = () => {
    if (page.tasks.length >= 12) return // Increased limit slightly for 3 pillars
    const newTask: GanttTask = {
      name: 'Nova Ação',
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      type: 'planning',
      pillar: 'Geral',
    }
    updatePage({ tasks: [...page.tasks, newTask] })
  }

  const removeTask = (index: number) => {
    const newTasks = [...page.tasks]
    newTasks.splice(index, 1)
    updatePage({ tasks: newTasks })
  }

  const updateTask = (index: number, field: string, value: any) => {
    const newTasks = [...page.tasks]
    newTasks[index] = { ...newTasks[index], [field]: value }
    updatePage({ tasks: newTasks })
  }

  // Get unique pillars for suggestion, max 3 logically but flexible here
  const pillars = Array.from(
    new Set(page.tasks.map((t) => t.pillar || 'Geral')),
  )

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título</Label>
          <Input
            value={page.title}
            onChange={(e) => updatePage({ title: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={page.subtitle}
            onChange={(e) => updatePage({ subtitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Mês</Label>
          <Input
            value={page.month}
            onChange={(e) => updatePage({ month: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800">
            Cronograma (Agrupado por Pilar)
          </h3>
          <Button
            size="sm"
            onClick={addTask}
            disabled={page.tasks.length >= 12}
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </div>

        <div className="space-y-3">
          {page.tasks.map((task, i) => (
            <div
              key={i}
              className="bg-slate-50 p-3 rounded border border-slate-200"
            >
              <div className="flex gap-2 mb-2">
                <div className="w-1/3">
                  <Label className="text-[10px]">Pilar</Label>
                  <Input
                    value={task.pillar}
                    onChange={(e) => updateTask(i, 'pillar', e.target.value)}
                    className="h-8"
                    placeholder="Ex: Setup"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-[10px]">Ação</Label>
                  <Input
                    value={task.name}
                    onChange={(e) => updateTask(i, 'name', e.target.value)}
                    className="h-8"
                    placeholder="Nome da Ação"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-[10px]">Tipo</Label>
                  <Select
                    value={task.type}
                    onValueChange={(val) => updateTask(i, 'type', val)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Plan</SelectItem>
                      <SelectItem value="execution">Exec</SelectItem>
                      <SelectItem value="review">Rev</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 mt-4 text-red-500"
                  onClick={() => removeTask(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-between px-2 bg-white rounded border border-slate-100 py-1">
                {['s1', 's2', 's3', 's4'].map((week) => (
                  <div key={week} className="flex items-center gap-2">
                    <Checkbox
                      checked={(task as any)[week]}
                      onCheckedChange={(checked) =>
                        updateTask(i, week, checked)
                      }
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {week.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
