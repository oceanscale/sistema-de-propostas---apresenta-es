import { useState, useRef } from 'react'
import { ProposalProvider, useProposal } from '@/context/ProposalContext'
import { FullDeck } from '@/components/slides/FullDeck'
import { Button } from '@/components/ui/button'
import { WizardStepParts } from '@/components/wizard/WizardStepParts'
import { WizardStepCover } from '@/components/wizard/WizardStepCover'
import { WizardStepSummary } from '@/components/wizard/WizardStepSummary'
import { WizardStepCompetitors } from '@/components/wizard/WizardStepCompetitors'
import { WizardStepDiagnosis } from '@/components/wizard/WizardStepDiagnosis'
import { WizardStepEcosystem } from '@/components/wizard/WizardStepEcosystem'
import { WizardStepTimeline } from '@/components/wizard/WizardStepTimeline'
import { WizardStepMethodology } from '@/components/wizard/WizardStepMethodology'
import { WizardStepProjection } from '@/components/wizard/WizardStepProjection'
import { WizardStepInvestment } from '@/components/wizard/WizardStepInvestment'
import { WizardStepROI } from '@/components/wizard/WizardStepROI'
import { WizardStepClosing } from '@/components/wizard/WizardStepClosing'
import { WizardStepGantt } from '@/components/wizard/WizardStepGantt'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Share2,
  Save,
  Building2,
  FileImage,
  FileText,
  Users,
  AlertTriangle,
  Target,
  Calendar,
  Cpu,
  BarChart,
  DollarSign,
  TrendingUp,
  CheckCircle,
  GripVertical,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { v4 as uuidv4 } from 'uuid'

function EditorContent() {
  const { proposal, updateProposal } = useProposal()
  const [activeTab, setActiveTab] = useState('parts')
  const { toast } = useToast()

  // Drag and Drop State
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleSave = () => {
    toast({
      title: 'Proposta salva com sucesso!',
      description: 'As alterações foram sincronizadas.',
    })
  }

  const handleShare = () => {
    // Opens in new tab
    window.open(`/share/${proposal.id}`, '_blank')
  }

  const addNewGanttPage = () => {
    const newId = `gantt-${uuidv4().slice(0, 8)}`
    const newPage = {
      id: newId,
      title: 'Cronograma Detalhado',
      subtitle: 'Visão Semanal',
      month: 'NOVO MÊS',
      tasks: [],
    }

    // Find where to insert (after timeline or last gantt)
    const timelineIndex = proposal.pageOrder.indexOf('timeline')
    const newOrder = [...proposal.pageOrder]
    newOrder.splice(timelineIndex + 1, 0, newId)

    updateProposal({
      ganttPages: [...proposal.ganttPages, newPage],
      pageOrder: newOrder,
    })
    setActiveTab(newId)
  }

  // Map of static components
  const staticComponents: Record<string, any> = {
    parts: { label: 'Partes', icon: Building2, component: WizardStepParts },
    cover: { label: 'Capa', icon: FileImage, component: WizardStepCover },
    summary: { label: 'Sumário', icon: FileText, component: WizardStepSummary },
    competitors: {
      label: 'Concorrência',
      icon: Users,
      component: WizardStepCompetitors,
    },
    diagnosis: {
      label: 'Diagnóstico',
      icon: AlertTriangle,
      component: WizardStepDiagnosis,
    },
    ecosystem: {
      label: 'Estratégia',
      icon: Target,
      component: WizardStepEcosystem,
    },
    timeline: {
      label: 'Cronograma',
      icon: Calendar,
      component: WizardStepTimeline,
    },
    methodology: {
      label: 'Metodologia',
      icon: Cpu,
      component: WizardStepMethodology,
    },
    projection: {
      label: 'Projeção',
      icon: BarChart,
      component: WizardStepProjection,
    },
    financials: {
      label: 'Investimento',
      icon: DollarSign,
      component: WizardStepInvestment,
    },
    roi: { label: 'ROI', icon: TrendingUp, component: WizardStepROI },
    closing: {
      label: 'Fechamento',
      icon: CheckCircle,
      component: WizardStepClosing,
    },
  }

  // Get component for current tab
  const getActiveComponent = () => {
    if (activeTab.startsWith('gantt-')) {
      return <WizardStepGantt pageId={activeTab} />
    }
    const conf = staticComponents[activeTab]
    if (conf) {
      const Comp = conf.component
      return <Comp />
    }
    return <WizardStepParts />
  }

  const getTabLabel = (id: string) => {
    if (id.startsWith('gantt-')) {
      const page = proposal.ganttPages.find((p) => p.id === id)
      return { label: page?.month || 'Gantt', icon: Calendar }
    }
    return staticComponents[id] || { label: id, icon: FileText }
  }

  // Drag Handlers
  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
    // Hack to hide ghost image if needed, or set custom one
  }

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === id) return

    // Perform reorder
    const newOrder = [...proposal.pageOrder]
    const draggedIdx = newOrder.indexOf(draggedItem)
    const targetIdx = newOrder.indexOf(id)

    if (draggedIdx !== -1 && targetIdx !== -1) {
      newOrder.splice(draggedIdx, 1)
      newOrder.splice(targetIdx, 0, draggedItem)
      updateProposal({ pageOrder: newOrder })
    }
  }

  const onDragEnd = () => {
    setDraggedItem(null)
  }

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleTabClick = (id: string) => {
    setActiveTab(id)
    // Scroll preview to slide
    if (id !== 'parts') {
      scrollToSlide(id)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      {/* Sidebar Navigation (Left) */}
      <aside className="w-64 flex flex-col bg-white border-r border-slate-200 z-20 shadow-xl flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <Link
            to="/"
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <span className="font-bold text-slate-900 text-sm">
            OCEAN PROPOSAL
          </span>
        </div>

        {/* Page List (Vertical + DnD) */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Páginas
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={addNewGanttPage}
              title="Add Gantt Page"
            >
              <Plus className="w-4 h-4 text-slate-500" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {proposal.pageOrder.map((id) => {
                const { label, icon: Icon } = getTabLabel(id)
                const isActive = activeTab === id

                return (
                  <div
                    key={id}
                    draggable
                    onDragStart={(e) => onDragStart(e, id)}
                    onDragOver={(e) => onDragOver(e, id)}
                    onDragEnd={onDragEnd}
                    onClick={() => handleTabClick(id)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all border group select-none',
                      isActive
                        ? 'bg-sky-50 border-sky-200 text-sky-700 font-semibold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <div className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-400">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        isActive ? 'text-sky-500' : 'text-slate-400',
                      )}
                    />
                    <span className="truncate flex-1">{label}</span>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-sky-500 hover:bg-sky-600"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </aside>

      {/* Editor Panel (Middle) - Config for selected Step */}
      <aside className="w-[400px] flex flex-col bg-white border-r border-slate-200 z-10 flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {getTabLabel(activeTab).icon &&
              (() => {
                const Icon = getTabLabel(activeTab).icon!
                return <Icon className="w-5 h-5 text-sky-500" />
              })()}
            {getTabLabel(activeTab).label}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edite o conteúdo desta seção abaixo.
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">{getActiveComponent()}</div>
        </ScrollArea>
      </aside>

      {/* Live Preview (Right) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100 relative">
        <header className="h-12 border-b border-slate-200 bg-white flex items-center justify-between px-6 no-print shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">
              Live Preview
            </span>
            <span>{proposal.clientName}</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-200/50">
          <div className="scale-[0.5] origin-top md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] 2xl:scale-[1] transition-transform duration-300 ease-in-out pb-[1000px]">
            <FullDeck proposal={proposal} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Editor() {
  return (
    <ProposalProvider>
      <EditorContent />
    </ProposalProvider>
  )
}
