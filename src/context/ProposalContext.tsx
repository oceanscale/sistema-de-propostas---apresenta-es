import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Proposal } from '@/types/proposal'
import { DEFAULT_PROPOSAL } from '@/lib/constants'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface ProposalContextType {
  proposal: Proposal
  updateProposal: (data: Partial<Proposal>) => void
  generateAI: () => void
  duplicatePage: (pageId: string) => void
  removePage: (pageId: string) => void
  restorePage: (pageId: string) => void
  saveProposal: () => Promise<void>
  isGenerating: boolean
  isLoading: boolean
}

export const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined,
)

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal>(DEFAULT_PROPOSAL)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // Load user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data && !error) {
        setProposal((prev) => ({
          ...prev,
          agencyName: data.company_name || prev.agencyName,
          agencyCnpj: data.cnpj || prev.agencyCnpj,
          agencyRep: data.representative_name || prev.agencyRep,
          profile: {
            ...prev.profile,
            name: data.representative_name || prev.profile.name,
            company: data.company_name || prev.profile.company,
            cnpj: data.cnpj || prev.profile.cnpj,
            cpf: data.cpf || prev.profile.cpf,
            logo: data.logo_url || prev.profile.logo,
          },
        }))
      }
    }

    loadProfile()
  }, [user])

  const updateProposal = (data: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...data }))
  }

  const saveProposal = async () => {
    if (!user) {
      toast({
        title: 'Erro ao salvar',
        description: 'Você precisa estar logado para salvar.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const { id, content, ...rest } = proposal
      // If ID is 'new', we let supabase generate one or we generate one
      const proposalId = proposal.id === 'new' ? undefined : proposal.id

      const payload = {
        client_name: proposal.clientName,
        title: proposal.coverTitle,
        content: proposal as any, // Store full JSON
        updated_at: new Date().toISOString(),
        lead_id: null, // Assuming no lead relation strictly required for now
      }

      let result

      if (proposalId) {
        result = await supabase
          .from('proposals')
          .update(payload)
          .eq('id', proposalId)
          .select()
      } else {
        result = await supabase
          .from('proposals')
          .insert([{ ...payload, created_at: new Date().toISOString() }])
          .select()
      }

      if (result.error) throw result.error

      if (result.data && result.data[0]) {
        const savedId = result.data[0].id
        setProposal((prev) => ({ ...prev, id: savedId }))
        toast({
          title: 'Proposta salva!',
          description: 'Suas alterações foram sincronizadas.',
        })
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Erro ao salvar',
        description: error.message || 'Ocorreu um erro desconhecido',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
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
        saveProposal,
        isLoading,
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
