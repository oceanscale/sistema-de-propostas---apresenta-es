import { Proposal } from '@/types/proposal'
import { SlideCover } from './SlideCover'
import { SlideSummary } from './SlideSummary'
import { SlideCompetitors } from './SlideCompetitors'
import { SlideDiagnosis } from './SlideDiagnosis'
import { SlideEcosystem } from './SlideEcosystem'
import { SlideTimeline } from './SlideTimeline'
import { SlideMethodology } from './SlideMethodology'
import { SlideProjection } from './SlideProjection'
import { SlideInvestment } from './SlideInvestment'
import { SlideROI } from './SlideROI'
import { SlideClosing } from './SlideClosing'
import { SlideGantt } from './SlideGantt'

export function FullDeck({ proposal }: { proposal: Proposal }) {
  const renderSlide = (id: string) => {
    // Handle dynamic Gantt pages
    if (id.startsWith('gantt-')) {
      const ganttPage = proposal.ganttPages.find((p) => p.id === id)
      if (ganttPage) return <SlideGantt key={id} page={ganttPage} />
      return null
    }

    // Handle duplicate pages (e.g. cover-copy-123 -> cover)
    const baseId = id.split('-copy-')[0]

    switch (baseId) {
      case 'cover':
        return <SlideCover key={id} proposal={proposal} />
      case 'summary':
        return <SlideSummary key={id} proposal={proposal} />
      case 'competitors':
        return <SlideCompetitors key={id} proposal={proposal} />
      case 'diagnosis':
        return <SlideDiagnosis key={id} proposal={proposal} />
      case 'ecosystem':
        return <SlideEcosystem key={id} proposal={proposal} />
      case 'timeline':
        return <SlideTimeline key={id} proposal={proposal} />
      case 'methodology':
        return <SlideMethodology key={id} proposal={proposal} />
      case 'projection':
        return <SlideProjection key={id} proposal={proposal} />
      case 'financials':
        return <SlideInvestment key={id} proposal={proposal} />
      case 'roi':
        return <SlideROI key={id} proposal={proposal} />
      case 'closing':
        return <SlideClosing key={id} proposal={proposal} />
      default:
        return null
    }
  }

  // Filter out 'parts' as it's not a slide
  const slides = proposal.pageOrder.filter((id) => id !== 'parts')

  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-slate-100 min-h-screen print:bg-white print:py-0 print:gap-0 print:block">
      {slides.map((id) => {
        const component = renderSlide(id)
        if (!component) return null

        return (
          <div key={id} id={id} className="print:break-after-page">
            {component}
          </div>
        )
      })}
    </div>
  )
}
