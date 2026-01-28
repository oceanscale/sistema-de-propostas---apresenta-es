import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Proposal, SECTORS, CHANNELS } from '@/types/proposal'
import { DEFAULT_PROPOSAL } from '@/lib/constants'

interface ProposalContextType {
  proposal: Proposal
  updateProposal: (data: Partial<Proposal>) => void
  generateAI: () => void
  isGenerating: boolean
}

const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined,
)

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal>(DEFAULT_PROPOSAL)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateProposal = (data: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...data }))
  }

  const generateAI = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let strategy = ''
      let summary = ''

      // Mock AI Logic
      if (proposal.channels.includes('Google Ads')) {
        strategy +=
          'Prioridade em capturar intenção de compra (Fundo de Funil) através de campanhas de Pesquisa e Shopping. '
        summary += 'Consolidar liderança nas buscas transacionais. '
      }

      if (proposal.channels.includes('Meta Ads (Facebook/Instagram)')) {
        strategy +=
          'Utilização de criativos de alto impacto visual para gerar demanda e nutrir audiências frias. '
      }

      if (proposal.channels.includes('LinkedIn Ads')) {
        strategy +=
          'Abordagem Account-Based Marketing (ABM) para decisores B2B. '
        summary += 'Posicionamento de autoridade no nicho corporativo. '
      }

      if (proposal.sector === 'Imóveis de Alto Padrão') {
        summary +=
          'Foco na qualificação do lead para maximizar o VGV e otimizar o tempo do time comercial.'
      } else if (proposal.sector === 'E-commerce Varejo') {
        summary += 'Maximizar o ROAS mantendo um volume de vendas constante.'
      } else {
        summary += 'Crescimento sustentável focado em ROI positivo.'
      }

      if (!strategy)
        strategy = 'Estratégia multicanal focada em performance e dados.'
      if (!summary)
        summary =
          'Acelerar o crescimento digital da marca através de mídia paga inteligente.'

      updateProposal({
        strategyText: strategy,
        executiveSummary: summary,
      })
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <ProposalContext.Provider
      value={{ proposal, updateProposal, generateAI, isGenerating }}
    >
      {children}
    </ProposalContext.Provider>
  )
}

export const useProposal = () => {
  const context = useContext(ProposalContext)
  if (!context) {
    throw new Error('useProposal must be used within a ProposalProvider')
  }
  return context
}
