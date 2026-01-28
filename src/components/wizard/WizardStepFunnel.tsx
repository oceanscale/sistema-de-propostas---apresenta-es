import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function WizardStepFunnel() {
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
      <div className="space-y-4">
        <Label className="text-base text-sky-600">Cenário Atual (Mensal)</Label>
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
            <Label className="text-xs text-slate-500">MQL (Qualificados)</Label>
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

      <div className="space-y-4">
        <Label className="text-base text-emerald-600">
          Cenário Projetado (Meta)
        </Label>
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
            <Label className="text-xs text-slate-500">MQL (Qualificados)</Label>
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
