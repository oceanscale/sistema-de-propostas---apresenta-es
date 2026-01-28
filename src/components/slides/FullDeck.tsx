import { Proposal } from '@/types/proposal'
import { SlideCover } from './SlideCover'
import { SlideSummary } from './SlideSummary'
import { SlideEcosystem } from './SlideEcosystem'
import { SlideDiagnosis } from './SlideDiagnosis'
import { SlideTimeline } from './SlideTimeline'
import { SlideMethodology } from './SlideMethodology'
import { SlideProjection } from './SlideProjection'
import { SlideInvestment } from './SlideInvestment'
import { SlideROI } from './SlideROI'
import { SlideClosing } from './SlideClosing'

export function FullDeck({ proposal }: { proposal: Proposal }) {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-slate-100 min-h-screen print:bg-white print:py-0 print:gap-0 print:block">
      <SlideCover proposal={proposal} />
      <SlideSummary proposal={proposal} />
      <SlideEcosystem proposal={proposal} />
      <SlideDiagnosis proposal={proposal} />
      <SlideTimeline proposal={proposal} />
      <SlideMethodology proposal={proposal} />
      <SlideProjection proposal={proposal} />
      <SlideInvestment proposal={proposal} />
      <SlideROI proposal={proposal} />
      <SlideClosing proposal={proposal} />
    </div>
  )
}
