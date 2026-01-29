import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function WizardStepMethodology() {
  const { proposal, updateProposal } = useProposal()

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...proposal.methodologyItems]
    newItems[index] = { ...newItems[index], [field]: value }
    updateProposal({ methodologyItems: newItems })
  }

  return (
    <div className="space-y-6 animate-fade-in">
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
        <Label className="text-base font-bold">Cards de Diferenciais</Label>
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

      <div className="border-t border-slate-200 pt-4">
        <Label>Texto de Rodapé (Garantia)</Label>
        <Textarea
          value={proposal.methodologyText}
          onChange={(e) => updateProposal({ methodologyText: e.target.value })}
          className="h-24"
        />
      </div>
    </div>
  )
}
