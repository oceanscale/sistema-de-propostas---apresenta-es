import { ProposalProvider, useProposal } from '@/context/ProposalContext'
import { FullDeck } from '@/components/slides/FullDeck'
import { Button } from '@/components/ui/button'
import { Printer, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SlideContainer } from '@/components/SlideContainer'
import { SlideCover } from '@/components/slides/SlideCover'
import { SlideSummary } from '@/components/slides/SlideSummary'
import { SlideCompetitors } from '@/components/slides/SlideCompetitors'
import { SlideDiagnosis } from '@/components/slides/SlideDiagnosis'
import { SlideEcosystem } from '@/components/slides/SlideEcosystem'
import { SlideTimeline } from '@/components/slides/SlideTimeline'
import { SlideMethodology } from '@/components/slides/SlideMethodology'
import { SlideProjection } from '@/components/slides/SlideProjection'
import { SlideInvestment } from '@/components/slides/SlideInvestment'
import { SlideROI } from '@/components/slides/SlideROI'
import { SlideClosing } from '@/components/slides/SlideClosing'
import { SlideGantt } from '@/components/slides/SlideGantt'

function PresentationView() {
  const { proposal } = useProposal()
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = proposal.pageOrder.filter((id) => id !== 'parts')

  const next = () => setCurrentIndex((p) => Math.min(p + 1, slides.length - 1))
  const prev = () => setCurrentIndex((p) => Math.max(p - 1, 0))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [slides.length])

  const currentId = slides[currentIndex]

  // Helper to render specific slide by ID
  const renderSlide = (id: string) => {
    if (id.startsWith('gantt-')) {
      const page = proposal.ganttPages.find((p) => p.id === id)
      return page ? <SlideGantt page={page} /> : null
    }
    const baseId = id.split('-copy-')[0]
    switch (baseId) {
      case 'cover':
        return <SlideCover proposal={proposal} />
      case 'summary':
        return <SlideSummary proposal={proposal} />
      case 'competitors':
        return <SlideCompetitors proposal={proposal} />
      case 'diagnosis':
        return <SlideDiagnosis proposal={proposal} />
      case 'ecosystem':
        return <SlideEcosystem proposal={proposal} />
      case 'timeline':
        return <SlideTimeline proposal={proposal} />
      case 'methodology':
        return <SlideMethodology proposal={proposal} />
      case 'projection':
        return <SlideProjection proposal={proposal} />
      case 'financials':
        return <SlideInvestment proposal={proposal} />
      case 'roi':
        return <SlideROI proposal={proposal} />
      case 'closing':
        return <SlideClosing proposal={proposal} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="transform scale-[0.8] md:scale-[1]">
        {renderSlide(currentId)}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur text-white flex justify-between items-center z-50">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={prev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <span className="text-sm font-bold">
          {currentIndex + 1} / {slides.length}
        </span>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={next}
          disabled={currentIndex === slides.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

function ShareContent() {
  const { proposal } = useProposal()

  useEffect(() => {
    document.title = `Proposta - ${proposal.clientName}`
  }, [proposal])

  if (proposal.viewMode === 'slide') {
    return <PresentationView />
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="no-print fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">
            OP
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">
              OCEAN PROPOSAL
            </h1>
            <p className="text-xs text-slate-500">Visualização de Proposta</p>
          </div>
        </div>
        <Button onClick={() => window.print()} variant="outline">
          <Printer className="w-4 h-4 mr-2" /> Salvar PDF
        </Button>
      </div>
      <div className="pt-24 pb-12 flex justify-center">
        <div className="shadow-2xl print:shadow-none">
          <FullDeck proposal={proposal} />
        </div>
      </div>
    </div>
  )
}

export default function Share() {
  return (
    <ProposalProvider>
      <ShareContent />
    </ProposalProvider>
  )
}
