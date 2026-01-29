import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepSummary() {
  const { proposal, updateProposal } = useProposal()
  const [newLink, setNewLink] = useState({ title: '', url: '' })

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

  const updateTriad = (field: string, value: string) => {
    updateProposal({
      summaryTriad: { ...proposal.summaryTriad, [field]: value },
    })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 border-b pb-2">Cabeçalho</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Título</Label>
            <Input
              value={proposal.summaryTitle}
              onChange={(e) => updateProposal({ summaryTitle: e.target.value })}
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Input
              value={proposal.summarySubtitle}
              onChange={(e) =>
                updateProposal({ summarySubtitle: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="font-bold text-slate-800 border-b pb-2">
          Informações do Cliente
        </h3>
        <div>
          <Label>Objetivo do Projeto</Label>
          <Textarea
            value={proposal.clientObjective}
            onChange={(e) =>
              updateProposal({ clientObjective: e.target.value })
            }
            className="h-20"
          />
        </div>

        <div>
          <Label className="mb-2 block">Links Rápidos</Label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <Input
              placeholder="Título"
              value={newLink.title}
              onChange={(e) =>
                setNewLink({ ...newLink, title: e.target.value })
              }
            />
            <Input
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
            <Button onClick={addLink} size="icon" variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {proposal.summaryLinks?.map((link, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-50 p-2 rounded text-sm border border-slate-100"
              >
                <span className="truncate">
                  {link.title}: {link.url}
                </span>
                <button onClick={() => removeLink(i)} className="text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="font-bold text-slate-800 border-b pb-2">
          Tríade Estratégica
        </h3>
        <div>
          <Label className="text-sky-600">Marketing</Label>
          <Textarea
            value={proposal.summaryTriad?.marketing}
            onChange={(e) => updateTriad('marketing', e.target.value)}
          />
        </div>
        <div>
          <Label className="text-purple-600">Inteligência (IA)</Label>
          <Textarea
            value={proposal.summaryTriad?.ai}
            onChange={(e) => updateTriad('ai', e.target.value)}
          />
        </div>
        <div>
          <Label className="text-emerald-600">Comercial</Label>
          <Textarea
            value={proposal.summaryTriad?.commercial}
            onChange={(e) => updateTriad('commercial', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="font-bold text-slate-800 border-b pb-2">Visual</h3>
        <div>
          <Label>Imagem Fundo</Label>
          <Input
            value={proposal.summaryPageImage}
            onChange={(e) =>
              updateProposal({ summaryPageImage: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Imagem Box</Label>
          <Input
            value={proposal.summaryBoxImage}
            onChange={(e) =>
              updateProposal({ summaryBoxImage: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Cor Overlay</Label>
            <div className="flex gap-2 mt-2">
              <input
                type="color"
                value={proposal.summaryOverlayColor || '#000000'}
                onChange={(e) =>
                  updateProposal({ summaryOverlayColor: e.target.value })
                }
                className="h-8 w-8 cursor-pointer border rounded"
              />
            </div>
          </div>
          <div>
            <Label>Opacidade</Label>
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
    </div>
  )
}
