import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SlideContainerProps {
  children: ReactNode
  className?: string
  dark?: boolean
}

export function SlideContainer({
  children,
  className,
  dark = false,
}: SlideContainerProps) {
  return (
    <div className="flex justify-center mb-8 print:mb-0">
      <div
        className={cn(
          'slide-container-wrapper relative overflow-hidden transition-all',
          'w-[1123px] h-[794px]', // Approx A4 Landscape pixel size at 96dpi (297mm x 210mm)
          'bg-white text-slate-900',
          'origin-top-left',
          dark ? 'bg-slate-900 text-white' : 'bg-white',
          'print:w-[297mm] print:h-[210mm] print:shadow-none',
          'shadow-2xl rounded-sm', // Visual style for screen
          className,
        )}
        style={
          {
            // aspect ratio 297/210 is approx 1.414. 16:9 is 1.77.
            // The spec asks for 16:9 aspect ratio contained in A4.
            // But also says "series of slides... contained in A4 Landscape container".
            // A4 landscape is 297mm x 210mm.
            // If I use aspect-video (16:9), it won't fill A4 perfectly (A4 is ~√2 aspect).
            // I will stick to the 297mm x 210mm (A4) dimensions as priority for printing,
            // but design contents to look good.
            // Actually, 1123px x 794px is a good proxy for A4 at screen resolution.
          }
        }
      >
        <div className="absolute inset-0 flex flex-col p-12">{children}</div>

        {/* Watermark / Footer */}
        <div className="absolute bottom-4 right-8 text-xs opacity-50 font-medium">
          GrowthProposal OS • Confidential
        </div>
      </div>
    </div>
  )
}
