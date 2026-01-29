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
  const [newDisclaimer, setNewDisclaimer] = useState('')

  const costs = proposal.operationalCosts || []

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

  const addDisclaimer = () => {
    if (newDisclaimer) {
      updateProposal({
        costDisclaimers: [...(proposal.costDisclaimers || []), newDisclaimer],
      })
      setNewDisclaimer('')
    }
  }

  const removeDisclaimer = (index: number) => {
    const newDisclaimers = [...(proposal.costDisclaimers || [])]
    newDisclaimers.splice(index, 1)
    updateProposal({ costDisclaimers: newDisclaimers })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título</Label>
          <Input
            value={proposal.investmentTitle}
            onChange={(e) =>
              updateProposal({ investmentTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={proposal.investmentSubtitle}
            onChange={(e) =>
              updateProposal({ investmentSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-800">Custos de Terceiros</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Título da Seção</Label>
            <Input
              value={proposal.costsTitle}
              onChange={(e) => updateProposal({ costsTitle: e.target.value })}
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Input
              value={proposal.costsSubtitle}
              onChange={(e) =>
                updateProposal({ costsSubtitle: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          {costs.map((cost, i) => (
            <div
              key={i}
              className="flex gap-2 items-center bg-slate-50 p-2 rounded"
            >
              <Input
                value={cost.name}
                onChange={(e) => updateCost(i, 'name', e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                value={cost.value}
                onChange={(e) => updateCost(i, 'value', Number(e.target.value))}
                className="w-24"
              />
              <Button size="icon" variant="ghost" onClick={() => removeCost(i)}>
                <X className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={addCost}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar Custo
          </Button>
        </div>

        <div>
          <Label className="mb-2 block">Disclaimers / Notas</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newDisclaimer}
              onChange={(e) => setNewDisclaimer(e.target.value)}
              placeholder="Nota..."
              onKeyDown={(e) => e.key === 'Enter' && addDisclaimer()}
            />
            <Button size="icon" onClick={addDisclaimer}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {proposal.costDisclaimers?.map((disc, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded"
              >
                <span>{disc}</span>
                <button
                  onClick={() => removeDisclaimer(i)}
                  className="text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <Label className="mb-4 block text-base font-bold">
          Planos de Serviço (Fee)
        </Label>
        <div className="flex space-x-2 border-b border-slate-200 pb-2 mb-4">
          {proposal.investmentTiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => setActiveTierIndex(i)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeTierIndex === i ? 'bg-sky-100 text-sky-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {tier.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={proposal.investmentTiers[activeTierIndex].name}
                onChange={(e) => updateTier('name', e.target.value)}
              />
            </div>
            <div>
              <Label>Fee (R$)</Label>
              <Input
                type="number"
                value={proposal.investmentTiers[activeTierIndex].fee}
                onChange={(e) => updateTier('fee', Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              value={proposal.investmentTiers[activeTierIndex].description}
              onChange={(e) => updateTier('description', e.target.value)}
            />
          </div>

          <div className="bg-slate-50 p-4 rounded border">
            <Label className="mb-2 block font-bold text-xs uppercase">
              Botão de Ação (CTA)
            </Label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input
                placeholder="Texto"
                value={proposal.investmentTiers[activeTierIndex].buttonText}
                onChange={(e) => updateTier('buttonText', e.target.value)}
              />
              <Input
                placeholder="URL"
                value={proposal.investmentTiers[activeTierIndex].buttonUrl}
                onChange={(e) => updateTier('buttonUrl', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Label className="text-[10px]">Fundo</Label>
                <input
                  type="color"
                  value={
                    proposal.investmentTiers[activeTierIndex].buttonColor ||
                    '#000000'
                  }
                  onChange={(e) => updateTier('buttonColor', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-[10px]">Texto</Label>
                <input
                  type="color"
                  value={
                    proposal.investmentTiers[activeTierIndex].buttonTextColor ||
                    '#ffffff'
                  }
                  onChange={(e) =>
                    updateTier('buttonTextColor', e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Features</Label>
            <div className="space-y-2 mt-2">
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
