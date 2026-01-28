import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { CompetitorItem } from '@/types/proposal'

export function WizardStepCompetitors() {
  const { proposal, updateProposal } = useProposal()
  const [newComp, setNewComp] = useState<CompetitorItem>({
    name: '',
    strength: '',
    weakness: '',
  })

  const addCompetitor = () => {
    if (newComp.name && newComp.strength) {
      updateProposal({
        competitorsData: [...proposal.competitorsData, newComp],
      })
      setNewComp({ name: '', strength: '', weakness: '' })
    }
  }

  const removeCompetitor = (index: number) => {
    const newData = [...proposal.competitorsData]
    newData.splice(index, 1)
    updateProposal({ competitorsData: newData })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <Label>Análise de Mercado (Benchmarking)</Label>
        <Textarea
          value={proposal.marketBenchmarking}
          onChange={(e) =>
            updateProposal({ marketBenchmarking: e.target.value })
          }
          placeholder="Descreva o cenário atual do mercado..."
          className="h-24"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <Label>Adicionar Concorrente</Label>
        <div className="grid grid-cols-1 gap-3">
          <Input
            value={newComp.name}
            onChange={(e) => setNewComp({ ...newComp, name: e.target.value })}
            placeholder="Nome do Concorrente"
          />
          <Input
            value={newComp.strength}
            onChange={(e) =>
              setNewComp({ ...newComp, strength: e.target.value })
            }
            placeholder="Ponto Forte"
          />
          <Input
            value={newComp.weakness}
            onChange={(e) =>
              setNewComp({ ...newComp, weakness: e.target.value })
            }
            placeholder="Ponto Fraco"
          />
          <Button onClick={addCompetitor} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Adicionar à Lista
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          {proposal.competitorsData.map((comp, i) => (
            <div
              key={i}
              className="bg-slate-50 p-3 rounded-md border border-slate-200 relative"
            >
              <button
                onClick={() => removeCompetitor(i)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-800">{comp.name}</h4>
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-emerald-600">Forte:</span>{' '}
                {comp.strength}
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-red-500">Fraco:</span>{' '}
                {comp.weakness}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
