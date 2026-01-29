import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepClosing() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.closingTitle}
            onChange={(e) => updateProposal({ closingTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.closingSubtitle}
            onChange={(e) =>
              updateProposal({ closingSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <Label>Link do CTA (Botão de Aprovação)</Label>
        <Input
          value={proposal.ctaUrl}
          onChange={(e) => updateProposal({ ctaUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </div>
  )
}
