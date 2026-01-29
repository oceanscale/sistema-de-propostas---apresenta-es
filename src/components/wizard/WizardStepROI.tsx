import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepROI() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in pb-10">
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
        <h3 className="font-bold text-slate-800 mb-2">
          Base de Cálculo (Receita)
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Receita Mensal Atual (R$)</Label>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Vendas Projetadas (Funil)</Label>
              <Input
                disabled
                value={proposal.funnelProjected.sales}
                className="bg-slate-100"
              />
              <span className="text-xs text-slate-500">
                Editável na etapa de Funil
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
