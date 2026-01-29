import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepProjection() {
  const { proposal, updateProposal } = useProposal()

  const updateFunnel = (
    type: 'funnelCurrent' | 'funnelProjected',
    field: string,
    value: number,
  ) => {
    updateProposal({
      [type]: {
        ...proposal[type],
        [field]: value,
      },
    })
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
        <h3 className="font-bold text-slate-800">Dados Atuais</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-xs">Inv. Atual (R$)</Label>
            <Input
              type="number"
              value={proposal.currentInvestment}
              onChange={(e) =>
                updateProposal({ currentInvestment: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label className="text-xs">CPA Atual (R$)</Label>
            <Input
              type="number"
              value={proposal.currentCPA}
              onChange={(e) =>
                updateProposal({ currentCPA: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label className="text-xs">Leads/Mês</Label>
            <Input
              type="number"
              value={proposal.currentLeads}
              onChange={(e) =>
                updateProposal({ currentLeads: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-200 pt-4">
        <h3 className="font-bold text-sky-600">Funil Atual</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-slate-500">Clicks</Label>
            <Input
              type="number"
              value={proposal.funnelCurrent.clicks}
              onChange={(e) =>
                updateFunnel('funnelCurrent', 'clicks', Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Leads</Label>
            <Input
              type="number"
              value={proposal.funnelCurrent.leads}
              onChange={(e) =>
                updateFunnel('funnelCurrent', 'leads', Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">MQL</Label>
            <Input
              type="number"
              value={proposal.funnelCurrent.mql}
              onChange={(e) =>
                updateFunnel('funnelCurrent', 'mql', Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Vendas</Label>
            <Input
              type="number"
              value={proposal.funnelCurrent.sales}
              onChange={(e) =>
                updateFunnel('funnelCurrent', 'sales', Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-200 pt-4">
        <h3 className="font-bold text-emerald-600">Funil Projetado (Meta)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-slate-500">Clicks</Label>
            <Input
              type="number"
              value={proposal.funnelProjected.clicks}
              onChange={(e) =>
                updateFunnel(
                  'funnelProjected',
                  'clicks',
                  Number(e.target.value),
                )
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Leads</Label>
            <Input
              type="number"
              value={proposal.funnelProjected.leads}
              onChange={(e) =>
                updateFunnel('funnelProjected', 'leads', Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">MQL</Label>
            <Input
              type="number"
              value={proposal.funnelProjected.mql}
              onChange={(e) =>
                updateFunnel('funnelProjected', 'mql', Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Vendas</Label>
            <Input
              type="number"
              value={proposal.funnelProjected.sales}
              onChange={(e) =>
                updateFunnel('funnelProjected', 'sales', Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
