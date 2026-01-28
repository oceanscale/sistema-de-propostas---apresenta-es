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

export function FullDeck({ proposal }: { proposal: Proposal }) {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-slate-100 min-h-screen print:bg-white print:py-0 print:gap-0 print:block">
      {/* 1. Cover */}
      <SlideCover proposal={proposal} />

      {/* 2. Executive Summary */}
      <SlideSummary proposal={proposal} />

      {/* 3. Competitor Analysis (New) */}
      <SlideCompetitors proposal={proposal} />

      {/* 4. GAPs & Opportunities (Diagnosis) */}
      <SlideDiagnosis proposal={proposal} />

      {/* 5. Performance Ecosystem */}
      <SlideEcosystem proposal={proposal} />

      {/* 6. Implementation Timeline (90 Days) */}
      <SlideTimeline proposal={proposal} />

      {/* 7. Methodology & Differentials */}
      <SlideMethodology proposal={proposal} />

      {/* 8. Growth Projection & Funnel */}
      <SlideProjection proposal={proposal} />

      {/* 9. Investment (3 Tiers) */}
      <SlideInvestment proposal={proposal} />

      {/* 10. ROI */}
      <SlideROI proposal={proposal} />

      {/* 11. Closing */}
      <SlideClosing proposal={proposal} />
    </div>
  )
}
