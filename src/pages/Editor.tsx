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

import { ScrollArea } from '@/components/ui/scroll-area'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Printer,
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

function EditorContent() {
  const { proposal } = useProposal()
  const [activeTab, setActiveTab] = useState('parts')
  const { toast } = useToast()
  const navigate = useNavigate()

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
    toast({
      title: 'Proposta salva com sucesso!',
      description: 'As alterações foram sincronizadas.',
    })
  }

  const handleShare = () => {
    navigate(`/share/${proposal.id}`)
  }

  const tabs = [
    {
      id: 'parts',
      label: 'Partes',
      icon: Building2,
      component: WizardStepParts,
    },
    { id: 'cover', label: 'Capa', icon: FileImage, component: WizardStepCover },
    {
      id: 'summary',
      label: 'Sumário',
      icon: FileText,
      component: WizardStepSummary,
    },
    {
      id: 'competitors',
      label: 'Concorrência',
      icon: Users,
      component: WizardStepCompetitors,
    },
    {
      id: 'diagnosis',
      label: 'Diagnóstico',
      icon: AlertTriangle,
      component: WizardStepDiagnosis,
    },
    {
      id: 'ecosystem',
      label: 'Estratégia',
      icon: Target,
      component: WizardStepEcosystem,
    },
    {
      id: 'timeline',
      label: 'Cronograma',
      icon: Calendar,
      component: WizardStepTimeline,
    },
    {
      id: 'methodology',
      label: 'Metodologia',
      icon: Cpu,
      component: WizardStepMethodology,
    },
    {
      id: 'projection',
      label: 'Projeção',
      icon: BarChart,
      component: WizardStepProjection,
    },
    {
      id: 'financials',
      label: 'Investimento',
      icon: DollarSign,
      component: WizardStepInvestment,
    },
    { id: 'roi', label: 'ROI', icon: TrendingUp, component: WizardStepROI },
    {
      id: 'closing',
      label: 'Fechamento',
      icon: CheckCircle,
      component: WizardStepClosing,
    },
  ]

  const ActiveComponent =
    tabs.find((t) => t.id === activeTab)?.component || WizardStepParts

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar Editor */}
      <aside className="w-[400px] flex flex-col border-r border-slate-200 bg-white no-print z-20 shadow-xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <span className="font-bold text-slate-800">OCEAN PROPOSAL</span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              title="Salvar"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs Navigation - Vertical List to accomodate many items */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    'flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 text-left',
                    activeTab === t.id
                      ? 'border-sky-500 text-sky-600 bg-sky-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50',
                  )}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Active Tab Content Area - Now Overlay or separate panel? 
            Actually the design pattern in previous code was Tabs on top, content below.
            Since we have vertical tabs now, we can put the content in a slide-out or just replace the area next to it.
            But to keep it simple and fit the "Sidebar" concept, let's keep the content inside the sidebar but maybe in a nested view or just switch the view.
            
            Wait, the previous design had horizontal tabs and content below.
            With 12 tabs, horizontal is bad. Vertical is better.
            
            Let's split the sidebar: Left strip for icons/tabs (maybe just icons or list), Right part for content.
            OR
            Just keep the sidebar as is, but make the tabs section smaller and the content section larger?
            
            Let's stick to: Tabs list IS the navigation. When you click, it shows the content in the same sidebar area below? No, that pushes content down.
            
            Let's do:
            Sidebar has 2 columns? Or Top half navigation, Bottom half content?
            Top half navigation with scroll might be annoying if content is small.
            
            Let's try a compact horizontal scrollable tab list like before, but clearer?
            The user story says "The sidebar must have a scrollbar to accommodate all tabs".
            So vertical list is cleaner.
            
            Let's make the Sidebar separate:
            Column 1 (w-[400px]): The Editor Panel.
            Inside Editor Panel: 
              Top: Header
              Middle: ScrollArea with Content of Active Tab
              Bottom: Actions
            
            Where is the navigation?
            Maybe a thin strip on the left of the Editor Panel?
            Let's do a thin strip for icons + label on hover?
            
            Actually, let's just use a top bar inside the sidebar for tabs with scroll.
            "The sidebar must have a scrollbar to accommodate all tabs".
            This implies the tabs are IN the sidebar.
            
            I will keep the layout:
            Sidebar (400px):
              Header
              Tabs (Scrollable Horizontal)
              Content (Scrollable Vertical)
              Footer
            
            It works fine if horizontal scroll is enabled.
        */}

        {/* Reverting to Horizontal Scrollable Tabs but ensuring they fit nicely */}
        <div className="border-b border-slate-100 bg-white shadow-sm z-10">
          <ScrollArea
            className="w-full whitespace-nowrap"
            orientation="horizontal"
          >
            <div className="flex w-max p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors',
                    activeTab === t.id
                      ? 'border-sky-500 text-sky-600 bg-sky-50'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50',
                  )}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1 p-6 bg-slate-50/50">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              {tabs.find((t) => t.id === activeTab)?.icon &&
                (() => {
                  const Icon = tabs.find((t) => t.id === activeTab)?.icon!
                  return <Icon className="w-5 h-5 text-sky-500" />
                })()}
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <ActiveComponent />
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              PDF / Print
            </Button>
            <Button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100/50 relative">
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 no-print">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase">
              Live Preview
            </span>
            <span>{proposal.clientName}</span>
          </div>
          <div className="text-xs text-slate-400">
            Alterações salvas automaticamente
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-200/50">
          <div className="scale-[0.6] origin-top md:scale-[0.7] lg:scale-[0.85] xl:scale-[1] transition-transform duration-300 ease-in-out">
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
