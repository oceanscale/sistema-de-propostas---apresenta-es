import { useProposal } from '@/context/ProposalContext'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CHANNELS, ADDONS } from '@/types/proposal'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export function WizardStepScope() {
  const { proposal, updateProposal, generateAI, isGenerating } = useProposal()

  const toggleChannel = (channel: string) => {
    const current = [...proposal.channels]
    if (current.includes(channel)) {
      updateProposal({ channels: current.filter((c) => c !== channel) })
    } else {
      updateProposal({ channels: [...current, channel] })
    }
  }

  const toggleAddon = (addon: string) => {
    const current = [...proposal.addons]
    if (current.includes(addon)) {
      updateProposal({ addons: current.filter((a) => a !== addon) })
    } else {
      updateProposal({ addons: [...current, addon] })
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-3">
        <Label className="text-base">Canais de Aquisição</Label>
        <div className="grid grid-cols-2 gap-3">
          {CHANNELS.map((c) => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox
                id={c}
                checked={proposal.channels.includes(c)}
                onCheckedChange={() => toggleChannel(c)}
              />
              <label
                htmlFor={c}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Serviços Adicionais</Label>
        <div className="grid grid-cols-1 gap-3">
          {ADDONS.map((a) => (
            <div key={a} className="flex items-center space-x-2">
              <Checkbox
                id={a}
                checked={proposal.addons.includes(a)}
                onCheckedChange={() => toggleAddon(a)}
              />
              <label
                htmlFor={a}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {a}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <Label className="text-base">Estratégia & Resumo</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateAI}
            disabled={isGenerating}
            className="text-sky-600 border-sky-200 hover:bg-sky-50"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Gerar com IA
          </Button>
        </div>
        <div className="space-y-4">
          <Textarea
            value={proposal.executiveSummary}
            onChange={(e) =>
              updateProposal({ executiveSummary: e.target.value })
            }
            placeholder="Sumário executivo..."
            className="h-24"
          />
          <Textarea
            value={proposal.strategyText}
            onChange={(e) => updateProposal({ strategyText: e.target.value })}
            placeholder="Detalhes da estratégia..."
            className="h-24"
          />
        </div>
      </div>
    </div>
  )
}
