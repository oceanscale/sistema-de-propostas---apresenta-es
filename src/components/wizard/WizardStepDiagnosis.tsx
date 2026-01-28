import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepDiagnosis() {
  const { proposal, updateProposal } = useProposal()
  const [newGap, setNewGap] = useState('')

  const addGap = () => {
    if (newGap) {
      updateProposal({ gaps: [...proposal.gaps, newGap] })
      setNewGap('')
    }
  }

  const removeGap = (index: number) => {
    const newGaps = [...proposal.gaps]
    newGaps.splice(index, 1)
    updateProposal({ gaps: newGaps })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Investimento Atual (R$)</Label>
          <Input
            type="number"
            value={proposal.currentInvestment}
            onChange={(e) =>
              updateProposal({ currentInvestment: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <Label>CPA Atual (R$)</Label>
          <Input
            type="number"
            value={proposal.currentCPA}
            onChange={(e) =>
              updateProposal({ currentCPA: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <Label>Leads Atuais (Mensal)</Label>
          <Input
            type="number"
            value={proposal.currentLeads}
            onChange={(e) =>
              updateProposal({ currentLeads: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>GAPs Identificados (Diagnóstico)</Label>
        <div className="flex gap-2">
          <Input
            value={newGap}
            onChange={(e) => setNewGap(e.target.value)}
            placeholder="Ex: Site lento no mobile"
            onKeyDown={(e) => e.key === 'Enter' && addGap()}
          />
          <Button onClick={addGap} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 mt-2">
          {proposal.gaps.map((gap, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-slate-100 p-2 rounded text-sm"
            >
              <span>{gap}</span>
              <button
                onClick={() => removeGap(i)}
                className="text-slate-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
