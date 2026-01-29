import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function WizardStepEcosystem() {
  const { proposal, updateProposal } = useProposal()
  const [newItem, setNewItem] = useState('')
  const [activeList, setActiveList] = useState<
    'trafficSources' | 'conversionZone' | 'salesIntelligence'
  >('trafficSources')

  const addItem = () => {
    if (!newItem) return
    const current = proposal[activeList] || []
    updateProposal({ [activeList]: [...current, newItem] })
    setNewItem('')
  }

  const removeItem = (index: number) => {
    const current = [...(proposal[activeList] || [])]
    current.splice(index, 1)
    updateProposal({ [activeList]: current })
  }

  const lists = [
    {
      key: 'trafficSources',
      label: 'Fontes de Tráfego',
      color: 'text-blue-600',
    },
    {
      key: 'conversionZone',
      label: 'Zona de Conversão',
      color: 'text-sky-600',
    },
    {
      key: 'salesIntelligence',
      label: 'Inteligência de Vendas',
      color: 'text-emerald-600',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.ecosystemTitle}
            onChange={(e) => updateProposal({ ecosystemTitle: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.ecosystemSubtitle}
            onChange={(e) =>
              updateProposal({ ecosystemSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {lists.map((l) => (
            <button
              key={l.key}
              onClick={() => setActiveList(l.key as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                activeList === l.key
                  ? `bg-slate-900 text-white border-slate-900`
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label
            className={`text-sm ${lists.find((l) => l.key === activeList)?.color}`}
          >
            Editar: {lists.find((l) => l.key === activeList)?.label}
          </Label>
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Adicionar item..."
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
            <Button onClick={addItem} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1 mt-2 max-h-[300px] overflow-y-auto">
            {proposal[activeList]?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-50 p-2 rounded text-sm border border-slate-100"
              >
                <span>{item}</span>
                <button
                  onClick={() => removeItem(i)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
