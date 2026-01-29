import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepROI() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.roiTitle}
            onChange={(e) => updateProposal({ roiTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.roiSubtitle}
            onChange={(e) => updateProposal({ roiSubtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <h3 className="font-bold text-slate-800 mb-2">Base de Cálculo</h3>
        <div className="space-y-4">
          <div>
            <Label>Receita Atual do Cliente (R$)</Label>
            <Input
              type="number"
              value={proposal.currentRevenue}
              onChange={(e) =>
                updateProposal({ currentRevenue: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label>Vendas Mensais Atuais (Qtd)</Label>
            <Input
              type="number"
              value={proposal.currentSales}
              onChange={(e) =>
                updateProposal({ currentSales: Number(e.target.value) })
              }
            />
          </div>
          <p className="text-xs text-slate-500">
            * O cálculo de ROI usa a Receita e Vendas atuais para estimar o
            Ticket Médio.
          </p>
        </div>
      </div>
    </div>
  )
}
