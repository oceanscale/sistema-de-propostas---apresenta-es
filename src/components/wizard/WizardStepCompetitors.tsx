import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X, Globe, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { CompetitorItem } from '@/types/proposal'
import { cn } from '@/lib/utils'

export function WizardStepCompetitors() {
  const { proposal, updateProposal } = useProposal()

  const [newComp, setNewComp] = useState<Partial<CompetitorItem>>({
    name: '',
    website: '',
    presence: '',
    strengths: [],
    weaknesses: [],
  })

  const [currentStrength, setCurrentStrength] = useState('')
  const [currentWeakness, setCurrentWeakness] = useState('')

  const handleAddTag = (type: 'strengths' | 'weaknesses', value: string) => {
    if (!value) return
    setNewComp((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), value],
    }))
  }

  const handleRemoveTag = (type: 'strengths' | 'weaknesses', index: number) => {
    setNewComp((prev) => ({
      ...prev,
      [type]: prev[type]?.filter((_, i) => i !== index),
    }))
  }

  const addCompetitor = () => {
    if (newComp.name && newComp.website) {
      updateProposal({
        competitorsData: [
          ...proposal.competitorsData,
          newComp as CompetitorItem,
        ],
      })
      setNewComp({
        name: '',
        website: '',
        presence: '',
        strengths: [],
        weaknesses: [],
      })
      setCurrentStrength('')
      setCurrentWeakness('')
    }
  }

  const removeCompetitor = (index: number) => {
    const newData = [...proposal.competitorsData]
    newData.splice(index, 1)
    updateProposal({ competitorsData: newData })
  }

  const isMaxReached = proposal.competitorsData.length >= 5

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título da Página</Label>
          <Input
            value={proposal.competitorsTitle}
            onChange={(e) =>
              updateProposal({ competitorsTitle: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Subtítulo da Página</Label>
          <Input
            value={proposal.competitorsSubtitle}
            onChange={(e) =>
              updateProposal({ competitorsSubtitle: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Análise de Mercado (Texto Livre)</Label>
        <Textarea
          value={proposal.marketBenchmarking}
          onChange={(e) =>
            updateProposal({ marketBenchmarking: e.target.value })
          }
          className="h-20 text-sm"
        />
      </div>

      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-semibold">
            Adicionar Concorrente
          </Label>
          <span
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-full',
              isMaxReached
                ? 'bg-red-100 text-red-600'
                : 'bg-slate-100 text-slate-600',
            )}
          >
            {proposal.competitorsData.length}/5
          </span>
        </div>

        {!isMaxReached ? (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Nome</Label>
                <Input
                  value={newComp.name}
                  onChange={(e) =>
                    setNewComp({ ...newComp, name: e.target.value })
                  }
                  placeholder="Empresa X"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Website</Label>
                <Input
                  value={newComp.website}
                  onChange={(e) =>
                    setNewComp({ ...newComp, website: e.target.value })
                  }
                  placeholder="www.site.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Presença Digital</Label>
              <Textarea
                value={newComp.presence}
                onChange={(e) =>
                  setNewComp({ ...newComp, presence: e.target.value })
                }
                placeholder="Resumo da atuação..."
                className="h-16"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-emerald-600">
                  Pontos Fortes
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={currentStrength}
                    onChange={(e) => setCurrentStrength(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      (handleAddTag('strengths', currentStrength),
                      setCurrentStrength(''))
                    }
                  />
                  <Button
                    onClick={() => {
                      handleAddTag('strengths', currentStrength)
                      setCurrentStrength('')
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {newComp.strengths?.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-emerald-100 text-emerald-700 px-1 rounded flex items-center"
                    >
                      {s}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => handleRemoveTag('strengths', idx)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-red-600">Pontos Fracos</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentWeakness}
                    onChange={(e) => setCurrentWeakness(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      (handleAddTag('weaknesses', currentWeakness),
                      setCurrentWeakness(''))
                    }
                  />
                  <Button
                    onClick={() => {
                      handleAddTag('weaknesses', currentWeakness)
                      setCurrentWeakness('')
                    }}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {newComp.weaknesses?.map((w, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-red-100 text-red-700 px-1 rounded flex items-center"
                    >
                      {w}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => handleRemoveTag('weaknesses', idx)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={addCompetitor}
              className="w-full bg-slate-900"
              disabled={!newComp.name}
            >
              Adicionar
            </Button>
          </div>
        ) : (
          <div className="bg-yellow-50 text-yellow-800 p-2 rounded text-xs">
            Limite atingido.
          </div>
        )}

        <div className="space-y-2 mt-4">
          {proposal.competitorsData.map((comp, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded border border-slate-200 relative"
            >
              <button
                onClick={() => removeCompetitor(i)}
                className="absolute top-2 right-2 text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="font-bold">{comp.name}</h4>
              <div className="flex gap-2 text-xs text-slate-500 mt-1">
                <span>{comp.strengths.length} Forças</span>
                <span>{comp.weaknesses.length} Fraquezas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
