import { useState } from 'react'
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
import { ProfileModal } from '@/components/modals/ProfileModal'
import { TemplateSelectionModal } from '@/components/modals/TemplateSelectionModal'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
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
  Copy,
  Trash2,
  UserCircle,
  Loader2,
  LayoutTemplate,
  LogOut,
  FolderPlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function EditorContent() {
  const {
    proposal,
    updateProposal,
    duplicatePage,
    removePage,
    saveProposal,
    saveSlideToLibrary,
    insertTemplate,
    isLoading,
  } = useProposal()
  const [activeTab, setActiveTab] = useState('parts')

  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)

  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleShare = () => {
    if (proposal.id === 'new') {
      alert('Salve a proposta antes de compartilhar.')
      return
    }
    window.open(`/share/${proposal.id}`, '_blank')
  }

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

  const getActiveComponent = () => {
    if (activeTab.startsWith('gantt-')) {
      return <WizardStepGantt pageId={activeTab} />
    }
    const baseId = activeTab.split('-copy-')[0]
    const conf = staticComponents[baseId]
    if (conf) {
      const Comp = conf.component
      return <Comp />
    }
    if (staticComponents[activeTab]) {
      const Comp = staticComponents[activeTab].component
      return <Comp />
    }
    return <WizardStepParts />
  }

  const getTabLabel = (id: string) => {
    if (id.startsWith('gantt-')) {
      const page = proposal.ganttPages.find((p) => p.id === id)
      return { label: page?.month || 'Gantt', icon: Calendar }
    }
    const baseId = id.split('-copy-')[0]
    const conf = staticComponents[baseId]
    if (conf) {
      return {
        label: conf.label + (id.includes('copy') ? ' (Cópia)' : ''),
        icon: conf.icon,
      }
    }
    return staticComponents[id] || { label: id, icon: FileText }
  }

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === id) return
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
    if (id !== 'parts') {
      scrollToSlide(id)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
      <TemplateSelectionModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        onSelect={(t) => insertTemplate(t)}
      />

      {/* Sidebar Navigation (Left) */}
      <aside
        className={cn(
          'flex flex-col bg-white border-r border-slate-200 z-20 shadow-xl flex-shrink-0 transition-all duration-300',
          leftOpen ? 'w-64' : 'w-14',
        )}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          {leftOpen ? (
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              </Link>
              <span className="font-bold text-slate-900 text-sm">OCEAN</span>
            </div>
          ) : (
            <Link to="/" className="mx-auto">
              <Building2 className="w-5 h-5 text-slate-900" />
            </Link>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setLeftOpen(!leftOpen)}
          >
            {leftOpen ? (
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </Button>
        </div>

        {leftOpen && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Páginas
              </span>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => setTemplateModalOpen(true)}
                  title="Adicionar Página"
                >
                  <Plus className="w-4 h-4 text-sky-600" />
                </Button>
              </div>
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
                      className={cn(
                        'flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer transition-all border group relative',
                        isActive
                          ? 'bg-sky-50 border-sky-200 text-sky-700 font-semibold shadow-sm'
                          : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                      )}
                      onClick={() => handleTabClick(id)}
                    >
                      <div className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-400">
                        <GripVertical className="w-3 h-3" />
                      </div>
                      <Icon
                        className={cn(
                          'w-4 h-4',
                          isActive ? 'text-sky-500' : 'text-slate-400',
                        )}
                      />
                      <span className="truncate flex-1 text-xs">{label}</span>

                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded absolute right-1 top-1 bottom-1 items-center px-1 shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-sky-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            duplicatePage(id)
                          }}
                          title="Duplicar"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-emerald-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            saveSlideToLibrary(id)
                          }}
                          title="Salvar na Biblioteca"
                        >
                          <FolderPlus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            removePage(id)
                          }}
                          title="Remover"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        <div
          className={cn(
            'p-2 border-t border-slate-100 bg-white flex flex-col gap-2',
            !leftOpen && 'items-center',
          )}
        >
          {leftOpen ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <UserCircle className="w-4 h-4 mr-2" /> Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                    <UserCircle className="w-4 h-4 mr-2" /> Perfil
                  </DropdownMenuItem>
                  <Link to="/biblioteca">
                    <DropdownMenuItem>
                      <LayoutTemplate className="w-4 h-4 mr-2" /> Biblioteca
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/">
                    <DropdownMenuItem>
                      <LogOut className="w-4 h-4 mr-2" /> Sair
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={saveProposal}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <UserCircle className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  Perfil
                </DropdownMenuItem>
                <Link to="/biblioteca">
                  <DropdownMenuItem>Biblioteca</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>

      {/* Editor Panel (Middle) - Config for selected Step */}
      <aside
        className={cn(
          'flex flex-col bg-white border-r border-slate-200 z-10 flex-shrink-0 transition-all duration-300 relative',
          rightOpen ? 'w-[400px]' : 'w-0 border-r-0',
        )}
      >
        {rightOpen && (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {getTabLabel(activeTab).icon &&
                    (() => {
                      const Icon = getTabLabel(activeTab).icon!
                      return <Icon className="w-5 h-5 text-sky-500" />
                    })()}
                  {getTabLabel(activeTab).label}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Edite o conteúdo desta seção.
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => setRightOpen(false)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6">{getActiveComponent()}</div>
            </ScrollArea>
          </>
        )}
        {!rightOpen && (
          <div className="absolute top-4 left-2 z-20">
            <Button
              size="icon"
              variant="secondary"
              className="shadow-md"
              onClick={() => setRightOpen(true)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
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
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-slate-400"
              onClick={saveProposal}
            >
              <Save className="w-3 h-3 mr-1" /> Auto-save off
            </Button>
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
