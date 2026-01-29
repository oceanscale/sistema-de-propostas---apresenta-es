import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SECTORS } from '@/types/proposal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

export function WizardStepParts() {
  const { proposal, updateProposal } = useProposal()

  const handleFooterChange = (val: string) => {
    // Split by comma or new line
    const lines = val.split('\n').filter((s) => s.trim() !== '')
    updateProposal({ footerText: lines })
  }

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      {/* Client Section */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <h3 className="font-bold text-slate-900">Dados do Cliente</h3>
        <div>
          <Label>Nome do Cliente</Label>
          <Input
            value={proposal.clientName}
            onChange={(e) => updateProposal({ clientName: e.target.value })}
          />
        </div>
        <div>
          <Label>URL do Site</Label>
          <Input
            value={proposal.clientUrl}
            onChange={(e) => updateProposal({ clientUrl: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Setor</Label>
            <Select
              value={proposal.sector}
              onValueChange={(val) => updateProposal({ sector: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Localização</Label>
            <Input
              value={proposal.location}
              onChange={(e) => updateProposal({ location: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <h3 className="font-bold text-slate-900">Customização Visual</h3>
        <div>
          <Label>Imagem de Fundo (Capa)</Label>
          <Input
            value={proposal.coverImage}
            onChange={(e) => updateProposal({ coverImage: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Cor da Overlay</Label>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="color"
                value={proposal.overlayColor || '#000000'}
                onChange={(e) =>
                  updateProposal({ overlayColor: e.target.value })
                }
                className="h-8 w-8 cursor-pointer border rounded"
              />
              <span className="text-xs text-slate-500">
                {proposal.overlayColor}
              </span>
            </div>
          </div>
          <div>
            <Label>Opacidade ({proposal.overlayOpacity}%)</Label>
            <Slider
              defaultValue={[proposal.overlayOpacity]}
              max={100}
              step={1}
              onValueChange={(val) =>
                updateProposal({ overlayOpacity: val[0] })
              }
              className="mt-3"
            />
          </div>
        </div>

        <div>
          <Label>Imagem do Sumário (Fundo da Página)</Label>
          <Input
            value={proposal.summaryPageImage}
            onChange={(e) =>
              updateProposal({ summaryPageImage: e.target.value })
            }
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900">Rodapé Global</h3>
        <div>
          <Label>Itens do Rodapé (Um por linha)</Label>
          <Textarea
            value={proposal.footerText?.join('\n') || ''}
            onChange={(e) => handleFooterChange(e.target.value)}
            className="h-24"
            placeholder="Time Sênior&#10;APIs Oficiais&#10;Transparência de Dados"
          />
        </div>
      </div>
    </div>
  )
}
