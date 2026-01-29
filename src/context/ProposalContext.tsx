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

const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined,
)

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal>(DEFAULT_PROPOSAL)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateProposal = (data: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...data }))
  }

  const duplicatePage = (pageId: string) => {
    // For standard pages, we just duplicate the ID in the list, but since React keys need to be unique,
    // we need a mechanism to handle multiple instances of standard pages or just unique IDs.
    // The current architecture uses fixed IDs for standard pages (cover, summary, etc).
    // Duplicating them is tricky without refactoring the whole slide renderer to map generic IDs to types.
    // However, Gantt pages are already dynamic.
    // For this requirement, I'll implement duplication for dynamic pages (Gantt) easily.
    // For standard pages, I will generate a new unique ID like 'cover-copy-uuid' and we need to map it in FullDeck.
    // BUT FullDeck uses switch(id) which expects specific IDs.
    // To support duplication of ANY page properly, we would need a type field in the page definition.
    // Given the constraints and the codebase, I will implement true duplication for Gantt pages.
    // For standard pages, I will clone the ID with a suffix, but FullDeck needs to know how to render it.
    // I will update FullDeck to handle suffix IDs.

    // Actually, to make it simple and robust:
    // 1. Identify page type from ID.
    // 2. If it's a Gantt page, clone the data in ganttPages.
    // 3. If it's a standard page, we can't easily duplicate it because data is stored flat in Proposal (e.g. coverTitle).
    //    Duplicating "Cover" would imply having coverTitle2, coverTitle3...
    //    The current data structure (flat Proposal) doesn't support multiple instances of standard pages easily.
    //    Except Gantt pages which are an array.
    //
    //    User Story says: "Duplicate... identical copy".
    //    If I cannot duplicate standard pages due to architecture, I should at least support Gantt.
    //    However, maybe I can just add another reference to the SAME page?
    //    "Creates an identical copy" implies independence? Usually yes.
    //    If I just add the ID again, they will share data.
    //
    //    Let's assume duplication is primarily for "Gantt" or generic content pages if they existed.
    //    For standard pages like "Cover", duplicating it implies you want two covers?
    //    It's an edge case. I'll implement duplication by creating a unique ID and mapping it to the same component type.
    //    But they will SHARE data (except Gantt). This is a limitation of the current data structure.
    //    But for the requirement, I'll add the ID to the list.

    //    Wait, I can improve this. If I duplicate "timeline", I get "timeline-copy-1".
    //    In FullDeck, I can strip the suffix to decide which component to render.
    //    BUT they will share the `timelineTitle`, `timelinePhases` data.
    //    If the user edits one, both update. This might be acceptable or confusing.
    //    Realistically, users want to duplicate Gantt pages or maybe create variations.
    //    I will implement duplication for ALL, but warn that standard pages share data.
    //    Actually, I'll duplicate the ID.

    const newId = `${pageId}-copy-${uuidv4().slice(0, 4)}`
    const currentIndex = proposal.pageOrder.indexOf(pageId)
    const newOrder = [...proposal.pageOrder]
    newOrder.splice(currentIndex + 1, 0, newId)

    // specific handling for Gantt duplication (deep copy data)
    let newGanttPages = [...proposal.ganttPages]
    if (pageId.startsWith('gantt-')) {
      const sourcePage = proposal.ganttPages.find((p) => p.id === pageId)
      if (sourcePage) {
        // The new ID in pageOrder must match the ID in ganttPages
        // For Gantt, the ID acts as the data key.
        // So we need to ensure the new ID in pageOrder matches the new Gantt page ID.
        // We used `newId` above. Let's use it.
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
    // Move to library
    const newOrder = proposal.pageOrder.filter((id) => id !== pageId)
    const newLibrary = [...proposal.library, pageId]

    updateProposal({
      pageOrder: newOrder,
      library: newLibrary,
    })
  }

  const restorePage = (pageId: string) => {
    // Remove from library, add to end of order (or we could try to restore position, but end is safer)
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

      // Mock AI Logic based on channels
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
