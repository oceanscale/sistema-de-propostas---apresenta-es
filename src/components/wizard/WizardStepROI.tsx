import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

export function WizardStepROI() {
  const { proposal, updateProposal } = useProposal()

  const updateBenchmark = (index: number, field: string, value: any) => {
    const newBench = [...(proposal.roiBenchmarks || [])]
    newBench[index] = { ...newBench[index], [field]: value }
    updateProposal({ roiBenchmarks: newBench })
  }

  const addBenchmark = () => {
    if ((proposal.roiBenchmarks || []).length >= 4) return
    updateProposal({
      roiBenchmarks: [
        ...(proposal.roiBenchmarks || []),
        { label: 'Nova Métrica', current: 0, projected: 0, unit: '' },
      ],
    })
  }

  const removeBenchmark = (index: number) => {
    const newBench = [...(proposal.roiBenchmarks || [])]
    newBench.splice(index, 1)
    updateProposal({ roiBenchmarks: newBench })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título</Label>
          <Input
            value={proposal.roiTitle}
            onChange={(e) => updateProposal({ roiTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={proposal.roiSubtitle}
            onChange={(e) => updateProposal({ roiSubtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <h3 className="font-bold text-slate-800 mb-4">
          ROAS Projetado (Destaque)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>ROI/ROAS (%)</Label>
            <Input
              value={proposal.roasProjected?.roi}
              onChange={(e) =>
                updateProposal({
                  roasProjected: {
                    ...proposal.roasProjected,
                    roi: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Label</Label>
            <Input
              value={proposal.roasProjected?.label}
              onChange={(e) =>
                updateProposal({
                  roasProjected: {
                    ...proposal.roasProjected,
                    label: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Nota</Label>
            <Input
              value={proposal.roasProjected?.note}
              onChange={(e) =>
                updateProposal({
                  roasProjected: {
                    ...proposal.roasProjected,
                    note: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">
            Comparativo de Evolução (Max 4)
          </h3>
          <Button
            size="sm"
            onClick={addBenchmark}
            disabled={(proposal.roiBenchmarks?.length || 0) >= 4}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {proposal.roiBenchmarks?.map((bench, i) => (
            <div
              key={i}
              className="bg-slate-50 p-3 rounded border border-slate-200 relative"
            >
              <button
                onClick={() => removeBenchmark(i)}
                className="absolute top-2 right-2 text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2">
                  <Label className="text-xs">Métrica</Label>
                  <Input
                    value={bench.label}
                    onChange={(e) =>
                      updateBenchmark(i, 'label', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Unidade (Ex: R$)</Label>
                  <Input
                    value={bench.unit}
                    onChange={(e) => updateBenchmark(i, 'unit', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="text-xs">Valor Atual</Label>
                  <Input
                    type="number"
                    value={bench.current}
                    onChange={(e) =>
                      updateBenchmark(i, 'current', Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Valor Projetado</Label>
                  <Input
                    type="number"
                    value={bench.projected}
                    onChange={(e) =>
                      updateBenchmark(i, 'projected', Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
