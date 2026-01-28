import { useProposal } from '@/context/ProposalContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, X, Globe, Trophy, Search, AlertTriangle } from 'lucide-react'
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
  })

  const [currentStrength, setCurrentStrength] = useState('')

  const handleAddStrength = () => {
    if (!currentStrength) return
    setNewComp((prev) => ({
      ...prev,
      strengths: [...(prev.strengths || []), currentStrength],
    }))
    setCurrentStrength('')
  }

  const handleRemoveStrength = (index: number) => {
    setNewComp((prev) => ({
      ...prev,
      strengths: prev.strengths?.filter((_, i) => i !== index),
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
      // Reset form
      setNewComp({
        name: '',
        website: '',
        presence: '',
        strengths: [],
      })
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
      {/* Context Section */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500" />
          Análise de Mercado (Benchmarking)
        </Label>
        <Textarea
          value={proposal.marketBenchmarking}
          onChange={(e) =>
            updateProposal({ marketBenchmarking: e.target.value })
          }
          placeholder="Descreva o cenário atual do mercado..."
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
            {proposal.competitorsData.length}/5 Utilizados
          </span>
        </div>

        {/* Add Form */}
        {!isMaxReached ? (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Nome do Concorrente</Label>
                <div className="relative">
                  <Trophy className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={newComp.name}
                    onChange={(e) =>
                      setNewComp({ ...newComp, name: e.target.value })
                    }
                    placeholder="Ex: Empresa X"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={newComp.website}
                    onChange={(e) =>
                      setNewComp({ ...newComp, website: e.target.value })
                    }
                    placeholder="Ex: www.empresax.com"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Presença Digital (Resumo)</Label>
              <Textarea
                value={newComp.presence}
                onChange={(e) =>
                  setNewComp({ ...newComp, presence: e.target.value })
                }
                placeholder="Como eles atuam no digital? Pontos de atenção..."
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Pontos Fortes (Tags)</Label>
              <div className="flex gap-2">
                <Input
                  value={currentStrength}
                  onChange={(e) => setCurrentStrength(e.target.value)}
                  placeholder="Digite e aperte Enter..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAddStrength()}
                />
                <Button
                  onClick={handleAddStrength}
                  size="icon"
                  variant="outline"
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {newComp.strengths && newComp.strengths.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newComp.strengths.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 text-slate-700 text-xs px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {s}
                      <button
                        onClick={() => handleRemoveStrength(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={addCompetitor}
              className="w-full bg-slate-900 hover:bg-slate-800"
              disabled={!newComp.name || !newComp.website}
            >
              <Plus className="w-4 h-4 mr-2" /> Adicionar à Tabela
            </Button>
          </div>
        ) : (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Limite máximo de 5 concorrentes atingido.
          </div>
        )}

        {/* List of Added Competitors */}
        <div className="space-y-3 mt-6">
          <Label>Lista de Concorrentes</Label>
          {proposal.competitorsData.length === 0 && (
            <p className="text-sm text-slate-400 italic">
              Nenhum concorrente adicionado.
            </p>
          )}
          {proposal.competitorsData.map((comp, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group hover:border-sky-300 transition-colors"
            >
              <button
                onClick={() => removeCompetitor(i)}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-slate-800">{comp.name}</h4>
                <a
                  href={`https://${comp.website}`}
                  target="_blank"
                  className="text-xs text-sky-500 hover:underline flex items-center gap-0.5"
                  rel="noreferrer"
                >
                  <Globe className="w-3 h-3" />
                  {comp.website}
                </a>
              </div>

              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                {comp.presence}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {comp.strengths.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
