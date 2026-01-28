import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepAgency() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label>Nome da Agência (White-Label)</Label>
          <Input
            value={proposal.agencyName}
            onChange={(e) => updateProposal({ agencyName: e.target.value })}
            placeholder="Ex: Minha Agência Digital"
          />
          <p className="text-xs text-slate-500 mt-1">
            Substitui "GrowthProposal OS" em todos os slides.
          </p>
        </div>

        <div>
          <Label>CNPJ</Label>
          <Input
            value={proposal.agencyCnpj}
            onChange={(e) => updateProposal({ agencyCnpj: e.target.value })}
            placeholder="00.000.000/0001-00"
          />
        </div>

        <div>
          <Label>Representante Comercial</Label>
          <Input
            value={proposal.agencyRep}
            onChange={(e) => updateProposal({ agencyRep: e.target.value })}
            placeholder="Seu Nome"
          />
        </div>
      </div>
    </div>
  )
}
