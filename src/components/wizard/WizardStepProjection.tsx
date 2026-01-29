import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

export function WizardStepProjection() {
  const { proposal, updateProposal } = useProposal()

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...proposal.projectionCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateProposal({ projectionCards: newCards })
  }

  const addCard = () => {
    if (proposal.projectionCards.length >= 3) return
    updateProposal({
      projectionCards: [
        ...proposal.projectionCards,
        { title: 'Novo Card', metric: '0', subtext: 'Desc', tag: 'Tag' },
      ],
    })
  }

  const removeCard = (index: number) => {
    const newCards = [...proposal.projectionCards]
    newCards.splice(index, 1)
    updateProposal({ projectionCards: newCards })
  }

  const updateFunnel = (index: number, field: string, value: string) => {
    const newSteps = [...(proposal.funnelSteps || [])]
    newSteps[index] = { ...newSteps[index], [field]: value }
    updateProposal({ funnelSteps: newSteps })
  }

  // Ensure funnelSteps exist (migration fallback)
  const funnelSteps = proposal.funnelSteps || [
    { label: 'Impressões', value: '0', color: '#38bdf8' },
    { label: 'Cliques', value: '0', color: '#0ea5e9' },
    { label: 'Leads', value: '0', color: '#0284c7' },
    { label: 'Vendas', value: '0', color: '#0369a1' },
  ]

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título</Label>
          <Input
            value={proposal.projectionTitle}
            onChange={(e) =>
              updateProposal({ projectionTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={proposal.projectionSubtitle}
            onChange={(e) =>
              updateProposal({ projectionSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-800">Investimento</h3>
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
            <Label>Investimento Sugerido (R$)</Label>
            <Input
              type="number"
              value={proposal.suggestedInvestment}
              onChange={(e) =>
                updateProposal({ suggestedInvestment: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-800">
            Cards de Projeção (Max 3)
          </h3>
          <Button
            size="sm"
            onClick={addCard}
            disabled={proposal.projectionCards.length >= 3}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {proposal.projectionCards?.map((card, i) => (
          <div
            key={i}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 relative"
          >
            <button
              onClick={() => removeCard(i)}
              className="absolute top-2 right-2 text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Título</Label>
                <Input
                  value={card.title}
                  onChange={(e) => updateCard(i, 'title', e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Tag</Label>
                <Input
                  value={card.tag}
                  onChange={(e) => updateCard(i, 'tag', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Métrica</Label>
                <Input
                  value={card.metric}
                  onChange={(e) => updateCard(i, 'metric', e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Subtexto</Label>
                <Input
                  value={card.subtext}
                  onChange={(e) => updateCard(i, 'subtext', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Tooltip (Hover)</Label>
              <Input
                value={card.tooltip}
                onChange={(e) => updateCard(i, 'tooltip', e.target.value)}
                placeholder="Texto explicativo..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-800">Funil de Vendas (4 Etapas)</h3>
        <div className="grid grid-cols-1 gap-2">
          {funnelSteps.map((step, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label className="text-xs">Etapa {i + 1}</Label>
                <Input
                  value={step.label}
                  onChange={(e) => updateFunnel(i, 'label', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs">Valor</Label>
                <Input
                  value={step.value}
                  onChange={(e) => updateFunnel(i, 'value', e.target.value)}
                />
              </div>
              <div className="w-16">
                <Label className="text-xs">Cor</Label>
                <div className="h-10 border rounded flex items-center justify-center">
                  <input
                    type="color"
                    value={step.color}
                    onChange={(e) => updateFunnel(i, 'color', e.target.value)}
                    className="w-full h-full opacity-0 cursor-pointer absolute"
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: step.color }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
