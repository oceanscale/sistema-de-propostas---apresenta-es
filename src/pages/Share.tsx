import { ProposalProvider, useProposal } from '@/context/ProposalContext'
import { FullDeck } from '@/components/slides/FullDeck'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import { useEffect } from 'react'

function ShareContent() {
  const { proposal } = useProposal()

  // Simulate loading data based on ID if we had a backend
  // For now it uses default context which is fine for demo

  useEffect(() => {
    document.title = `Proposta - ${proposal.clientName}`
  }, [proposal])

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
          <Printer className="w-4 h-4 mr-2" />
          Salvar PDF
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
