import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
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

  return (
    <div className="space-y-6 animate-fade-in">
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
