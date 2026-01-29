import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepCover() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label>Título da Página (Capa)</Label>
          <Input
            value={proposal.coverTitle}
            onChange={(e) => updateProposal({ coverTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.coverSubtitle}
            onChange={(e) => updateProposal({ coverSubtitle: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
