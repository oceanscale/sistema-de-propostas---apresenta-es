import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepFinancials() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label>Agency Fee (Mensal)</Label>
          <Input
            type="number"
            value={proposal.agencyFee}
            onChange={(e) =>
              updateProposal({ agencyFee: Number(e.target.value) })
            }
          />
          <p className="text-xs text-slate-500 mt-1">
            Valor dos serviços da agência
          </p>
        </div>

        <div>
          <Label>Verba de Mídia Sugerida</Label>
          <Input
            type="number"
            value={proposal.mediaBudget}
            onChange={(e) =>
              updateProposal({ mediaBudget: Number(e.target.value) })
            }
          />
          <p className="text-xs text-slate-500 mt-1">
            Pago diretamente ao Google/Meta
          </p>
        </div>

        <div>
          <Label>Custos de Software/Tech</Label>
          <Input
            type="number"
            value={proposal.softwareCost}
            onChange={(e) =>
              updateProposal({ softwareCost: Number(e.target.value) })
            }
          />
          <p className="text-xs text-slate-500 mt-1">Ferramentas, CRM, etc.</p>
        </div>
      </div>

      <div className="bg-slate-100 p-4 rounded-lg mt-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-700">Total Mensal</span>
          <span className="font-bold text-xl text-slate-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(
              proposal.agencyFee + proposal.mediaBudget + proposal.softwareCost,
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
