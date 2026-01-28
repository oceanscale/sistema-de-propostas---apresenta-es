import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Proposal } from '@/types/proposal'
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

      // Mock AI Logic based on channels
      const hasGoogle = proposal.channels.includes('Google Ads')
      const hasSocial =
        proposal.channels.includes('Meta Ads (Facebook/Instagram)') ||
        proposal.channels.includes('TikTok Ads')
      const hasLinkedIn = proposal.channels.includes('LinkedIn Ads')

      strategy += 'Estratégia Full-Funnel focada em performance. '

      if (hasGoogle) {
        strategy +=
          'Prioridade em capturar a intenção de compra (Fundo de Funil) através de campanhas de Pesquisa de alta relevância. '
      }

      if (hasSocial) {
        strategy +=
          'Foco em Geração de Demanda e nutrição de audiências frias utilizando Criativos de Alto Impacto visual. '
      }

      if (hasLinkedIn) {
        strategy +=
          'Abordagem Account-Based Marketing (ABM) para atingir decisores B2B com precisão cirúrgica. '
      }

      strategy +=
        'Todo o ecossistema será monitorado por nossa tecnologia de Dashboards em Tempo Real e Triagem com IA, garantindo que apenas leads qualificados cheguem ao comercial.'

      // Summary Logic
      summary = `Plano de aceleração para ${proposal.clientName} focado em transformar o investimento de mídia em receita previsível. `

      if (proposal.sector === 'Imóveis de Alto Padrão') {
        summary +=
          'Iremos qualificar drasticamente o lead para maximizar o VGV e otimizar o tempo dos corretores.'
      } else if (proposal.sector === 'E-commerce Varejo') {
        summary +=
          'Foco total em maximizar o ROAS e escalar o volume de vendas mantendo a margem de contribuição.'
      } else {
        summary +=
          'O objetivo é construir uma máquina de vendas previsível e escalável nos próximos 90 dias.'
      }

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
