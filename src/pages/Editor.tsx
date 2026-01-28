import { useState } from 'react'
import { ProposalProvider } from '@/context/ProposalContext'
import { FullDeck } from '@/components/slides/FullDeck'
import { useProposal } from '@/context/ProposalContext'
import { Button } from '@/components/ui/button'
import { WizardStepClient } from '@/components/wizard/WizardStepClient'
import { WizardStepDiagnosis } from '@/components/wizard/WizardStepDiagnosis'
import { WizardStepScope } from '@/components/wizard/WizardStepScope'
import { WizardStepFinancials } from '@/components/wizard/WizardStepFinancials'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Printer,
  Share2,
  Save,
  LayoutTemplate,
  LineChart,
  Target,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

function EditorContent() {
  const { proposal } = useProposal()
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
    toast({
      title: 'Proposta salva com sucesso!',
      description: 'As alterações foram sincronizadas.',
    })
  }

  const steps = [
    {
      id: 1,
      label: 'Cliente & Contexto',
      icon: LayoutTemplate,
      component: WizardStepClient,
    },
    {
      id: 2,
      label: 'Diagnóstico',
      icon: LineChart,
      component: WizardStepDiagnosis,
    },
    {
      id: 3,
      label: 'Escopo & Estratégia',
      icon: Target,
      component: WizardStepScope,
    },
    {
      id: 4,
      label: 'Financeiro',
      icon: DollarSign,
      component: WizardStepFinancials,
    },
  ]

  const CurrentStepComponent =
    steps.find((s) => s.id === step)?.component || WizardStepClient

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar Editor - No Print */}
      <aside className="w-[400px] flex flex-col border-r border-slate-200 bg-white no-print z-20 shadow-xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <span className="font-bold text-slate-800">GrowthProposal OS</span>
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

        {/* Steps Navigation */}
        <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={cn(
                'flex-1 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex flex-col items-center gap-2 min-w-[80px]',
                step === s.id
                  ? 'border-sky-500 text-sky-600 bg-sky-50/50'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50',
              )}
            >
              <s.icon className="w-5 h-5" />
              {s.id}. {s.label.split(' ')[0]}
            </button>
          ))}
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {steps.find((s) => s.id === step)?.label}
            </h2>
            <CurrentStepComponent />
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              PDF / Print
            </Button>
            <Button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                toast({
                  title: 'Link copiado!',
                  description: 'Compartilhe com seu cliente.',
                })
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
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
