import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepDiagnosis() {
  const { proposal, updateProposal } = useProposal()
  const [newGap, setNewGap] = useState('')
  const [newLever, setNewLever] = useState('')

  const addItem = (type: 'gaps' | 'growthLevers', value: string) => {
    if (!value) return
    const current = proposal[type] || []
    if (current.length >= 7) return
    updateProposal({ [type]: [...current, value] })
  }

  const removeItem = (type: 'gaps' | 'growthLevers', index: number) => {
    const current = [...(proposal[type] || [])]
    current.splice(index, 1)
    updateProposal({ [type]: current })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título</Label>
          <Input
            value={proposal.diagnosisTitle}
            onChange={(e) => updateProposal({ diagnosisTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={proposal.diagnosisSubtitle}
            onChange={(e) =>
              updateProposal({ diagnosisSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-200 pt-4">
        <div className="space-y-2">
          <Label className="text-red-600 font-semibold">
            Pontos de Atenção (Max 7)
          </Label>
          <div className="flex gap-2">
            <Input
              value={newGap}
              onChange={(e) => setNewGap(e.target.value)}
              placeholder="Novo ponto..."
              onKeyDown={(e) =>
                e.key === 'Enter' && (addItem('gaps', newGap), setNewGap(''))
              }
            />
            <Button
              onClick={() => {
                addItem('gaps', newGap)
                setNewGap('')
              }}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {proposal.gaps.map((gap, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-red-50 p-2 rounded text-sm text-red-800"
              >
                <span>{gap}</span>
                <button onClick={() => removeItem('gaps', i)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-emerald-600 font-semibold">
            Alavancas de Crescimento (Max 7)
          </Label>
          <div className="flex gap-2">
            <Input
              value={newLever}
              onChange={(e) => setNewLever(e.target.value)}
              placeholder="Nova alavanca..."
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                (addItem('growthLevers', newLever), setNewLever(''))
              }
            />
            <Button
              onClick={() => {
                addItem('growthLevers', newLever)
                setNewLever('')
              }}
              size="icon"
              className="bg-emerald-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {proposal.growthLevers?.map((lever, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-emerald-50 p-2 rounded text-sm text-emerald-800"
              >
                <span>{lever}</span>
                <button onClick={() => removeItem('growthLevers', i)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
