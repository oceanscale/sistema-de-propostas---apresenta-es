import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function WizardStepMethodology() {
  const { proposal, updateProposal } = useProposal()

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

      <div>
        <Label>Texto de Metodologia (Opcional)</Label>
        <Textarea
          value={proposal.methodologyText}
          onChange={(e) => updateProposal({ methodologyText: e.target.value })}
          className="h-32"
        />
      </div>
    </div>
  )
}
