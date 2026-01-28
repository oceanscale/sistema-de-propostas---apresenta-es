import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export function WizardStepInvestment() {
  const { proposal, updateProposal } = useProposal()
  const [activeTierIndex, setActiveTierIndex] = useState(0)

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
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label>Custos Operacionais</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">Verba Mídia (Sugerida)</Label>
            <Input
              type="number"
              value={proposal.mediaBudget}
              onChange={(e) =>
                updateProposal({ mediaBudget: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label className="text-xs">Custo Software</Label>
            <Input
              type="number"
              value={proposal.softwareCost}
              onChange={(e) =>
                updateProposal({ softwareCost: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <Label className="mb-4 block">Configuração dos Planos</Label>
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
