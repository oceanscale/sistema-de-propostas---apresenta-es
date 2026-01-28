export interface InvestmentTier {
  name: string
  fee: number
  description: string
  features: string[]
  recommended?: boolean
}

export interface TimelinePhase {
  title: string
  month: string
  items: string[]
}

export interface CompetitorItem {
  name: string
  strength: string
  weakness: string
}

export interface Proposal {
  id: string
  // Agency
  agencyName: string
  agencyCnpj: string
  agencyRep: string

  // Client
  clientName: string
  clientUrl: string
  ctaUrl: string
  sector: string
  location: string

  // Images
  coverImage: string
  summaryImage: string

  // Diagnosis
  currentInvestment: number
  currentCPA: number
  currentRevenue: number
  currentLeads: number
  gaps: string[]

  // Competitors
  competitorsData: CompetitorItem[]
  marketBenchmarking: string

  // Strategy
  channels: string[]
  addons: string[]

  // Timeline
  timelinePhases: TimelinePhase[]

  // Funnel
  funnelCurrent: {
    clicks: number
    leads: number
    mql: number
    sql: number
    sales: number
  }
  funnelProjected: {
    clicks: number
    leads: number
    mql: number
    sql: number
    sales: number
  }

  // Financials
  mediaBudget: number
  softwareCost: number
  investmentTiers: InvestmentTier[]

  // Text
  strategyText: string
  executiveSummary: string
  methodologyText: string

  createdAt: string
  status: 'draft' | 'sent' | 'approved'
}

export const SECTORS = [
  'Imóveis de Alto Padrão',
  'E-commerce Varejo',
  'SaaS B2B',
  'Educação / Cursos',
  'Saúde & Estética',
  'Finanças / Fintech',
  'Automotivo',
  'Outro',
]

export const CHANNELS = [
  'Google Ads',
  'Meta Ads (Facebook/Instagram)',
  'LinkedIn Ads',
  'TikTok Ads',
  'Pinterest Ads',
  'YouTube Ads',
  'SEO / Conteúdo',
]

export const ADDONS = [
  'Landing Page High-Convert',
  'CRM Proprietário',
  'Automação de Leads (Zapier)',
  'Gestão Google Meu Negócio',
  'Triagem com IA',
]
