import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Proposal } from '@/types/proposal'
import { DEFAULT_PROPOSAL } from '@/lib/constants'
import { v4 as uuidv4 } from 'uuid'

interface ProposalContextType {
  proposal: Proposal
  updateProposal: (data: Partial<Proposal>) => void
  generateAI: () => void
  duplicatePage: (pageId: string) => void
  removePage: (pageId: string) => void
  restorePage: (pageId: string) => void
  isGenerating: boolean
}

export const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined,
)

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal>(DEFAULT_PROPOSAL)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateProposal = (data: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...data }))
  }

  const duplicatePage = (pageId: string) => {
    const newId = `${pageId}-copy-${uuidv4().slice(0, 4)}`
    const currentIndex = proposal.pageOrder.indexOf(pageId)
    const newOrder = [...proposal.pageOrder]
    newOrder.splice(currentIndex + 1, 0, newId)

    let newGanttPages = [...proposal.ganttPages]
    if (pageId.startsWith('gantt-')) {
      const sourcePage = proposal.ganttPages.find((p) => p.id === pageId)
      if (sourcePage) {
        newGanttPages.push({
          ...sourcePage,
          id: newId,
          title: `${sourcePage.title} (Cópia)`,
        })
      }
    }

    updateProposal({
      pageOrder: newOrder,
      ganttPages: newGanttPages,
    })
  }

  const removePage = (pageId: string) => {
    const newOrder = proposal.pageOrder.filter((id) => id !== pageId)
    const newLibrary = [...proposal.library, pageId]

    updateProposal({
      pageOrder: newOrder,
      library: newLibrary,
    })
  }

  const restorePage = (pageId: string) => {
    const newLibrary = proposal.library.filter((id) => id !== pageId)
    const newOrder = [...proposal.pageOrder, pageId]

    updateProposal({
      library: newLibrary,
      pageOrder: newOrder,
    })
  }

  const generateAI = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let strategy = ''
      let summary = ''

      const hasGoogle = proposal.trafficSources.includes(
        'Google ADS (Pesquisa)',
      )
      const hasSocial = proposal.trafficSources.includes(
        'Meta Ads (Facebook/Instagram)',
      )
      const hasLinkedIn = proposal.trafficSources.includes('Linkedin Ads')

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
      value={{
        proposal,
        updateProposal,
        generateAI,
        isGenerating,
        duplicatePage,
        removePage,
        restorePage,
      }}
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
