import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepProjection() {
  const { proposal, updateProposal } = useProposal()

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...proposal.projectionCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateProposal({ projectionCards: newCards })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.projectionTitle}
            onChange={(e) =>
              updateProposal({ projectionTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.projectionSubtitle}
            onChange={(e) =>
              updateProposal({ projectionSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-800">
          Cards de Projeção (Anexo 7)
        </h3>
        {proposal.projectionCards?.map((card, i) => (
          <div
            key={i}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3"
          >
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
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-800">Rodapé de Comparação</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Investimento Atual</Label>
            <Input
              type="number"
              value={proposal.currentInvestment}
              onChange={(e) =>
                updateProposal({ currentInvestment: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
