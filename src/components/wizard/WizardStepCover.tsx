import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export function WizardStepCover() {
  const { proposal, updateProposal } = useProposal()

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="space-y-4">
        <div>
          <Label>Título da Página (Capa)</Label>
          <Input
            value={proposal.coverTitle}
            onChange={(e) => updateProposal({ coverTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.coverSubtitle}
            onChange={(e) => updateProposal({ coverSubtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-4">
        <h3 className="font-bold text-slate-900">Customização Visual</h3>
        <div>
          <Label>Imagem de Fundo</Label>
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
                value={proposal.coverOverlayColor || '#000000'}
                onChange={(e) =>
                  updateProposal({ coverOverlayColor: e.target.value })
                }
                className="h-8 w-8 cursor-pointer border rounded"
              />
              <span className="text-xs text-slate-500">
                {proposal.coverOverlayColor}
              </span>
            </div>
          </div>
          <div>
            <Label>Opacidade ({proposal.coverOverlayOpacity ?? 40}%)</Label>
            <Slider
              defaultValue={[proposal.coverOverlayOpacity ?? 40]}
              max={100}
              step={1}
              onValueChange={(val) =>
                updateProposal({ coverOverlayOpacity: val[0] })
              }
              className="mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
