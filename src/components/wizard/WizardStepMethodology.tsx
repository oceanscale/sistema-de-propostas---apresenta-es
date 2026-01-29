import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepMethodology() {
  const { proposal, updateProposal } = useProposal()
  const [newFeature, setNewFeature] = useState('')

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...proposal.methodologyItems]
    newItems[index] = { ...newItems[index], [field]: value }
    updateProposal({ methodologyItems: newItems })
  }

  const addFeature = () => {
    if (!newFeature) return
    const features = [...(proposal.methodologyFeatures || [])]
    updateProposal({ methodologyFeatures: [...features, newFeature] })
    setNewFeature('')
  }

  const removeFeature = (index: number) => {
    const features = [...(proposal.methodologyFeatures || [])]
    features.splice(index, 1)
    updateProposal({ methodologyFeatures: features })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.methodologyTitle}
            onChange={(e) =>
              updateProposal({ methodologyTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.methodologySubtitle}
            onChange={(e) =>
              updateProposal({ methodologySubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <Label className="text-base font-bold">
          Cards de Diferenciais (Esquerda)
        </Label>
        {proposal.methodologyItems?.map((item, i) => (
          <div
            key={i}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200"
          >
            <div className="mb-2">
              <Label className="text-xs">Título</Label>
              <Input
                value={item.title}
                onChange={(e) => updateItem(i, 'title', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <Label className="text-xs">Descrição</Label>
              <Textarea
                value={item.description}
                onChange={(e) => updateItem(i, 'description', e.target.value)}
                className="h-20"
              />
            </div>
            <div>
              <Label className="text-xs">Ícone (cpu, barChart, search)</Label>
              <Input
                value={item.icon}
                onChange={(e) => updateItem(i, 'icon', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <Label className="text-base font-bold">
          Garantia de Qualidade (Direita)
        </Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Adicionar item..."
            onKeyDown={(e) => e.key === 'Enter' && addFeature()}
          />
          <Button size="icon" onClick={addFeature}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {proposal.methodologyFeatures?.map((feat, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-slate-50 p-2 rounded text-sm border border-slate-100"
            >
              <span>{feat}</span>
              <button
                onClick={() => removeFeature(i)}
                className="text-slate-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <Label>Texto de Citação</Label>
          <Textarea
            value={proposal.methodologyText}
            onChange={(e) =>
              updateProposal({ methodologyText: e.target.value })
            }
            className="h-20"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <Label className="text-base font-bold">Box Extra (Omnichannel)</Label>
        <div>
          <Label className="text-xs">Título</Label>
          <Input
            value={proposal.methodologyExtra?.title || ''}
            onChange={(e) =>
              updateProposal({
                methodologyExtra: {
                  ...proposal.methodologyExtra,
                  title: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <Label className="text-xs">Texto</Label>
          <Textarea
            value={proposal.methodologyExtra?.text || ''}
            onChange={(e) =>
              updateProposal({
                methodologyExtra: {
                  ...proposal.methodologyExtra,
                  text: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
