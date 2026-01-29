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
import { useLocation, useSearchParams } from 'react-router-dom'

interface ProposalContextType {
  proposal: Proposal
  updateProposal: (data: Partial<Proposal>) => void
  generateAI: () => void
  duplicatePage: (pageId: string) => void
  removePage: (pageId: string) => void
  restorePage: (pageId: string) => void
  saveProposal: () => Promise<void>
  saveSlideToLibrary: (pageId: string) => Promise<void>
  insertTemplate: (template: any) => void
  isGenerating: boolean
  isLoading: boolean
  mode: 'proposal' | 'template'
  templateId?: string
}

export const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined,
)

export const ProposalProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal>(DEFAULT_PROPOSAL)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'proposal' | 'template'>('proposal')
  const [templateId, setTemplateId] = useState<string | undefined>(undefined)
  const { user } = useAuth()
  const { toast } = useToast()
  const location = useLocation()
  const [searchParams] = useSearchParams()

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

  useEffect(() => {
    const state = location.state as { proposalId?: string }
    const tmplId = searchParams.get('templateId')

    if (tmplId) {
      setMode('template')
      setTemplateId(tmplId)
      loadTemplate(tmplId)
    } else if (state?.proposalId) {
      setMode('proposal')
      loadProposal(state.proposalId)
    }
  }, [location.state, searchParams])

  const loadProposal = async (id: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      if (data && data.content) {
        setProposal((prev) => ({
          ...prev,
          ...(data.content as any),
          id: data.id,
        }))
      }
    } catch (e: any) {
      console.error(e)
      toast({
        title: 'Erro ao carregar',
        description: e.message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadTemplate = async (id: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      if (data && data.snapshot) {
        setProposal((prev) => ({
          ...prev,
          ...(data.snapshot as any),
          id: 'template-edit',
        }))
      } else if (data && data.content && data.content.proposalSnapshot) {
        setProposal((prev) => ({
          ...prev,
          ...data.content.proposalSnapshot,
          id: 'template-edit',
        }))
      }
    } catch (e: any) {
      console.error(e)
      toast({
        title: 'Erro ao carregar modelo',
        description: e.message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateProposal = (data: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...data }))
  }

  const saveProposal = async () => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Faça login.',
        variant: 'destructive',
      })
      return
    }
    setIsLoading(true)
    try {
      if (mode === 'template' && templateId) {
        const { error } = await supabase
          .from('templates')
          .update({ snapshot: proposal as any })
          .eq('id', templateId)

        if (error) throw error
        toast({
          title: 'Modelo Atualizado',
          description: 'Alterações salvas na biblioteca.',
        })
      } else {
        const { id, content, ...rest } = proposal
        const proposalId = proposal.id === 'new' ? undefined : proposal.id
        const payload = {
          client_name: proposal.clientName,
          title: proposal.coverTitle,
          content: proposal as any,
          updated_at: new Date().toISOString(),
          tags: proposal.tags,
          view_mode: proposal.viewMode,
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
          setProposal((prev) => ({
            ...prev,
            id: savedId,
            updatedAt: new Date().toISOString(),
          }))
          toast({
            title: 'Proposta salva!',
            description: 'Suas alterações foram sincronizadas.',
          })
        }
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Erro ao salvar',
        description: error.message,
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
    updateProposal({ pageOrder: newOrder, ganttPages: newGanttPages })
  }

  const removePage = (pageId: string) => {
    const newOrder = proposal.pageOrder.filter((id) => id !== pageId)
    const newLibrary = [...proposal.library, pageId]
    updateProposal({ pageOrder: newOrder, library: newLibrary })
  }

  const restorePage = (pageId: string) => {
    const newLibrary = proposal.library.filter((id) => id !== pageId)
    const newOrder = [...proposal.pageOrder, pageId]
    updateProposal({ library: newLibrary, pageOrder: newOrder })
  }

  const saveSlideToLibrary = async (pageId: string) => {
    if (!user) return
    try {
      const slideData: any = {}
      let type = pageId
      if (pageId.startsWith('gantt-')) {
        type = 'gantt'
      } else {
        type = pageId.split('-copy-')[0]
      }
      slideData.proposalSnapshot = proposal
      slideData.activeType = type

      const { error } = await supabase.from('templates').insert({
        name: `Modelo ${type} - ${new Date().toLocaleDateString()}`,
        description: `Salvo em ${new Date().toLocaleString()}`,
        content: slideData,
        snapshot: proposal as any, // Full snapshot for editing later
        type: type,
        tags: proposal.tags,
        category: proposal.tags[0] || 'General',
      })
      if (error) throw error
      toast({
        title: 'Salvo na Biblioteca',
        description: 'O slide foi salvo como modelo.',
      })
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Erro ao salvar modelo',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const insertTemplate = (template: any) => {
    const snapshot =
      template.snapshot ||
      (template.content && template.content.proposalSnapshot)
    if (snapshot) {
      // Here we could choose to overwrite specific parts or merge
      // For simplicity, we merge non-array fields and append array fields or specific slide logic
      // But user likely wants to overwrite the current slide content or add new slide
      // Since we are in Editor, let's just update the relevant fields for the active slide type if we can determine it
      // Or simply overwrite whole proposal state is risky.
      // Best approach: If template has a specific 'type', update fields related to that type.

      const type = template.type || template.content?.activeType
      if (type) {
        if (type === 'gantt') {
          // Add as new page
          const newId = `gantt-${uuidv4().slice(0, 8)}`
          const sourceGantt =
            snapshot.ganttPages?.[0] || DEFAULT_PROPOSAL.ganttPages[0]
          updateProposal({
            ganttPages: [...proposal.ganttPages, { ...sourceGantt, id: newId }],
            pageOrder: [...proposal.pageOrder, newId],
          })
        } else {
          // For static slides, we overwrite the fields
          // We rely on the snapshot having the fields populated
          // We can use a smarter merge but for now we trust the snapshot
          updateProposal({
            ...snapshot,
            id: proposal.id,
            pageOrder: proposal.pageOrder,
            ganttPages: proposal.ganttPages,
          })
        }
        toast({
          title: 'Modelo Aplicado',
          description: 'Conteúdo atualizado com sucesso.',
        })
      }
    }
  }

  const generateAI = () => {
    setIsGenerating(true)
    setTimeout(() => {
      // Mock AI logic
      updateProposal({ strategyText: 'Estratégia Gerada por IA...' })
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
        saveSlideToLibrary,
        insertTemplate,
        isLoading,
        mode,
        templateId,
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
