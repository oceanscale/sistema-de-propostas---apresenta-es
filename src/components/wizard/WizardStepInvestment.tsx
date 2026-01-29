import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepInvestment() {
  const { proposal, updateProposal } = useProposal()
  const [activeTierIndex, setActiveTierIndex] = useState(0)

  // Ensure operationalCosts exists
  const costs = proposal.operationalCosts || [
    { id: '1', name: 'Verba Mídia', value: proposal.mediaBudget },
    { id: '2', name: 'Software/Tech', value: proposal.softwareCost },
  ]

  const updateCost = (index: number, field: string, value: any) => {
    const newCosts = [...costs]
    newCosts[index] = { ...newCosts[index], [field]: value }
    updateProposal({ operationalCosts: newCosts })
  }

  const addCost = () => {
    const newCosts = [
      ...costs,
      { id: Date.now().toString(), name: 'Novo Custo', value: 0 },
    ]
    updateProposal({ operationalCosts: newCosts })
  }

  const removeCost = (index: number) => {
    const newCosts = [...costs]
    newCosts.splice(index, 1)
    updateProposal({ operationalCosts: newCosts })
  }

  const updateTier = (field: string, value: any) => {
    const newTiers = [...proposal.investmentTiers]
    newTiers[activeTierIndex] = { ...newTiers[activeTierIndex], [field]: value }
    updateProposal({ investmentTiers: newTiers })
  }

  const updateFeature = (index: number, value: string) => {
    const newTiers = [...proposal.investmentTiers]
    newTiers[activeTierIndex].features[index] = value
    updateProposal({ investmentTiers: newTiers })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.investmentTitle}
            onChange={(e) =>
              updateProposal({ investmentTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.investmentSubtitle}
            onChange={(e) =>
              updateProposal({ investmentSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <Label>Custos Operacionais (Terceiros)</Label>
          <Button size="sm" variant="ghost" onClick={addCost}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar Custo
          </Button>
        </div>
        <div className="space-y-3">
          {costs.map((cost, i) => (
            <div
              key={i}
              className="flex gap-2 items-end bg-slate-50 p-3 rounded border border-slate-100"
            >
              <div className="flex-1">
                <Label className="text-xs">Nome</Label>
                <Input
                  value={cost.name}
                  onChange={(e) => updateCost(i, 'name', e.target.value)}
                />
              </div>
              <div className="w-32">
                <Label className="text-xs">Valor (R$)</Label>
                <Input
                  type="number"
                  value={cost.value}
                  onChange={(e) =>
                    updateCost(i, 'value', Number(e.target.value))
                  }
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-red-500"
                onClick={() => removeCost(i)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <Label className="mb-4 block">Planos de Serviço</Label>
        <div className="flex space-x-2 border-b border-slate-200 pb-2 mb-4">
          {proposal.investmentTiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => setActiveTierIndex(i)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                activeTierIndex === i
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <Label>Nome do Plano</Label>
            <Input
              value={proposal.investmentTiers[activeTierIndex].name}
              onChange={(e) => updateTier('name', e.target.value)}
            />
          </div>
          <div>
            <Label>Valor do Fee (R$)</Label>
            <Input
              type="number"
              value={proposal.investmentTiers[activeTierIndex].fee}
              onChange={(e) => updateTier('fee', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Descrição Curta</Label>
            <Textarea
              value={proposal.investmentTiers[activeTierIndex].description}
              onChange={(e) => updateTier('description', e.target.value)}
              className="h-20"
            />
          </div>
          <div>
            <Label>Features (Uma por linha)</Label>
            <div className="space-y-2">
              {proposal.investmentTiers[activeTierIndex].features.map(
                (feat, idx) => (
                  <Input
                    key={idx}
                    value={feat}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
