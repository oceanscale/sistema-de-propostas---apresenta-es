import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepTimeline() {
  const { proposal, updateProposal } = useProposal()
  const [newItemText, setNewItemText] = useState('')
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  const updatePhaseTitle = (index: number, title: string) => {
    const newPhases = [...proposal.timelinePhases]
    newPhases[index].title = title
    updateProposal({ timelinePhases: newPhases })
  }

  const addItem = (phaseIndex: number) => {
    if (newItemText) {
      const newPhases = [...proposal.timelinePhases]
      newPhases[phaseIndex].items.push(newItemText)
      updateProposal({ timelinePhases: newPhases })
      setNewItemText('')
    }
  }

  const removeItem = (phaseIndex: number, itemIndex: number) => {
    const newPhases = [...proposal.timelinePhases]
    newPhases[phaseIndex].items.splice(itemIndex, 1)
    updateProposal({ timelinePhases: newPhases })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {proposal.timelinePhases.map((phase, i) => (
          <button
            key={i}
            onClick={() => setActivePhaseIndex(i)}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
              activePhaseIndex === i
                ? 'bg-sky-100 text-sky-700'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {phase.month}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Título da Fase</Label>
          <Input
            value={proposal.timelinePhases[activePhaseIndex].title}
            onChange={(e) => updatePhaseTitle(activePhaseIndex, e.target.value)}
          />
        </div>

        <div>
          <Label>Ações / Entregáveis</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Nova ação..."
              onKeyDown={(e) => e.key === 'Enter' && addItem(activePhaseIndex)}
            />
            <Button
              onClick={() => addItem(activePhaseIndex)}
              size="icon"
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {proposal.timelinePhases[activePhaseIndex].items.map(
              (item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100 text-sm"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeItem(activePhaseIndex, idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
