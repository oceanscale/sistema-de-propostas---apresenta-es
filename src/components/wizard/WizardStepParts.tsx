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

export function WizardStepParts() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-8 animate-fade-in pb-4">
      {/* Agency Section */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          Dados da Agência
        </h3>
        <div>
          <Label>Nome da Agência</Label>
          <Input
            value={proposal.agencyName}
            onChange={(e) => updateProposal({ agencyName: e.target.value })}
            placeholder="Ex: OCEAN PROPOSAL"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>CNPJ</Label>
            <Input
              value={proposal.agencyCnpj}
              onChange={(e) => updateProposal({ agencyCnpj: e.target.value })}
              placeholder="00.000.000/0001-00"
            />
          </div>
          <div>
            <Label>Representante</Label>
            <Input
              value={proposal.agencyRep}
              onChange={(e) => updateProposal({ agencyRep: e.target.value })}
              placeholder="Seu Nome"
            />
          </div>
        </div>
      </div>

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
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900">Imagens Personalizadas</h3>
        <div>
          <Label>Imagem de Capa (URL)</Label>
          <Input
            value={proposal.coverImage}
            onChange={(e) => updateProposal({ coverImage: e.target.value })}
            placeholder="https://..."
          />
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
        <div>
          <Label>Imagem da Caixa (Sumário Executivo)</Label>
          <Input
            value={proposal.summaryBoxImage}
            onChange={(e) =>
              updateProposal({ summaryBoxImage: e.target.value })
            }
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  )
}
