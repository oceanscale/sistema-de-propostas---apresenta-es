import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SECTORS } from '@/types/proposal'

export function WizardStepClient() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label>Nome do Cliente</Label>
          <Input
            value={proposal.clientName}
            onChange={(e) => updateProposal({ clientName: e.target.value })}
            placeholder="Ex: Tyrreno Imóveis"
          />
        </div>

        <div>
          <Label>URL do Site</Label>
          <Input
            value={proposal.clientUrl}
            onChange={(e) => updateProposal({ clientUrl: e.target.value })}
            placeholder="Ex: tyrreno.com.br"
          />
        </div>

        <div>
          <Label>Link do CTA (Botão Final)</Label>
          <Input
            value={proposal.ctaUrl}
            onChange={(e) => updateProposal({ ctaUrl: e.target.value })}
            placeholder="Ex: https://wa.me/55..."
          />
          <p className="text-xs text-slate-500 mt-1">
            Link de destino para o botão "Aprovar" no último slide.
          </p>
        </div>

        <div>
          <Label>Setor de Atuação</Label>
          <Select
            value={proposal.sector}
            onValueChange={(val) => updateProposal({ sector: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um setor" />
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
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div>
          <Label>Imagem de Capa (URL)</Label>
          <Input
            value={proposal.coverImage}
            onChange={(e) => updateProposal({ coverImage: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label>Imagem do Sumário (URL)</Label>
          <Input
            value={proposal.summaryImage}
            onChange={(e) => updateProposal({ summaryImage: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  )
}
