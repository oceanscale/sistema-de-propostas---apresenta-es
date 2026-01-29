import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { SummaryLink } from '@/types/proposal'

export function WizardStepSummary() {
  const { proposal, updateProposal } = useProposal()
  const [newLink, setNewLink] = useState<SummaryLink>({ title: '', url: '' })

  const addLink = () => {
    if (newLink.title && newLink.url) {
      updateProposal({
        summaryLinks: [...(proposal.summaryLinks || []), newLink],
      })
      setNewLink({ title: '', url: '' })
    }
  }

  const removeLink = (index: number) => {
    const newLinks = [...(proposal.summaryLinks || [])]
    newLinks.splice(index, 1)
    updateProposal({ summaryLinks: newLinks })
  }

  const updateMetric = (index: number, field: string, value: string) => {
    const newMetrics = [...proposal.summaryMetrics]
    newMetrics[index] = { ...newMetrics[index], [field]: value }
    updateProposal({ summaryMetrics: newMetrics })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="space-y-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.summaryTitle}
            onChange={(e) => updateProposal({ summaryTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.summarySubtitle}
            onChange={(e) =>
              updateProposal({ summarySubtitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Texto do Sumário Executivo</Label>
          <Textarea
            value={proposal.executiveSummary}
            onChange={(e) =>
              updateProposal({ executiveSummary: e.target.value })
            }
            className="h-32"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-900">Customização Visual</h3>
        <div>
          <Label>Imagem de Fundo</Label>
          <Input
            value={proposal.summaryPageImage}
            onChange={(e) =>
              updateProposal({ summaryPageImage: e.target.value })
            }
            placeholder="https://..."
          />
        </div>
        <div>
          <Label>Imagem do Box</Label>
          <Input
            value={proposal.summaryBoxImage}
            onChange={(e) =>
              updateProposal({ summaryBoxImage: e.target.value })
            }
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Cor da Overlay (Box)</Label>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="color"
                value={proposal.summaryOverlayColor || '#000000'}
                onChange={(e) =>
                  updateProposal({ summaryOverlayColor: e.target.value })
                }
                className="h-8 w-8 cursor-pointer border rounded"
              />
              <span className="text-xs text-slate-500">
                {proposal.summaryOverlayColor}
              </span>
            </div>
          </div>
          <div>
            <Label>Opacidade ({proposal.summaryOverlayOpacity ?? 30}%)</Label>
            <Slider
              defaultValue={[proposal.summaryOverlayOpacity ?? 30]}
              max={100}
              step={1}
              onValueChange={(val) =>
                updateProposal({ summaryOverlayOpacity: val[0] })
              }
              className="mt-3"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <Label className="mb-4 block text-base">Métricas em Destaque</Label>
        <div className="grid gap-4">
          {proposal.summaryMetrics?.map((metric, i) => (
            <div
              key={i}
              className="bg-slate-50 p-3 rounded border border-slate-200"
            >
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <Label className="text-xs">Valor (ex: +100%)</Label>
                  <Input
                    value={metric.value}
                    onChange={(e) => updateMetric(i, 'value', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Label (ex: Leads)</Label>
                  <Input
                    value={metric.label}
                    onChange={(e) => updateMetric(i, 'label', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">
                  Ícone (target, trending, users)
                </Label>
                <Input
                  value={metric.icon}
                  onChange={(e) => updateMetric(i, 'icon', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <Label className="mb-2 block">Links Adicionais</Label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input
            placeholder="Título (ex: Ver Site)"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          />
          <div className="flex gap-2">
            <Input
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
            <Button onClick={addLink} size="icon" variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {proposal.summaryLinks?.map((link, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-slate-50 p-2 rounded text-sm border border-slate-100"
            >
              <div className="flex gap-2">
                <span className="font-bold">{link.title}:</span>
                <span className="text-slate-500 truncate max-w-[150px]">
                  {link.url}
                </span>
              </div>
              <button
                onClick={() => removeLink(i)}
                className="text-slate-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
