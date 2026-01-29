import { ReactNode, useContext } from 'react'
import { cn } from '@/lib/utils'
import { ProposalContext } from '@/context/ProposalContext'

interface SlideContainerProps {
  children: ReactNode
  className?: string
  dark?: boolean
  id?: string
}

export function SlideContainer({
  children,
  className,
  dark = false,
  id,
}: SlideContainerProps) {
  const context = useContext(ProposalContext)

  let footerText: string[] = [
    'Time Sênior',
    'APIs Oficiais',
    'Transparência de Dados',
  ]

  if (context?.proposal?.footerText && context.proposal.footerText.length > 0) {
    footerText = context.proposal.footerText
  }

  const logoUrl = context?.proposal?.profile?.logo

  return (
    <div id={id} className="flex justify-center mb-8 print:mb-0 scroll-mt-24">
      <div
        className={cn(
          'slide-container-wrapper relative overflow-hidden transition-all',
          'w-[1123px] h-[794px]', // Approx A4 Landscape pixel size at 96dpi
          'bg-white text-slate-900',
          'origin-top-left',
          dark ? 'bg-slate-900 text-white' : 'bg-white',
          'print:w-[297mm] print:h-[210mm] print:shadow-none',
          'shadow-2xl rounded-sm',
          className,
        )}
      >
        {/* Branding Logo - Automatic Top Right */}
        {logoUrl && (
          <div className="absolute top-8 right-8 z-50">
            <img
              src={logoUrl}
              alt="Agency Logo"
              className="h-8 object-contain opacity-80"
            />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col p-12">{children}</div>

        {/* Watermark / Footer */}
        <div className="absolute bottom-4 left-12 right-12 flex justify-between items-center border-t border-slate-200/20 pt-2 z-40">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">
            {context?.proposal?.agencyName || 'OCEAN PROPOSAL'}
          </div>
          <div className="flex gap-4 text-[10px] uppercase tracking-wider font-medium opacity-40">
            {footerText.map((text, i) => (
              <div key={i} className="flex gap-4">
                <span>{text}</span>
                {i < footerText.length - 1 && <span>•</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
