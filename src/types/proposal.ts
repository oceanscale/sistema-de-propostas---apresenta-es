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
  website: string
  presence: string
  strengths: string[]
  weaknesses: string[]
}

export interface SummaryLink {
  title: string
  url: string
}

export interface Proposal {
  id: string
  // Agency & Client (Parts)
  agencyName: string
  agencyCnpj: string
  agencyRep: string
  clientName: string
  clientUrl: string
  sector: string
  location: string

  // Images
  coverImage: string
  summaryPageImage: string // New: Background for Summary Page (optional or used somewhere)
  summaryBoxImage: string // New: Background for the Summary Box

  // Page Titles & Subtitles
  coverTitle: string
  coverSubtitle: string

  summaryTitle: string
  summarySubtitle: string

  competitorsTitle: string
  competitorsSubtitle: string

  diagnosisTitle: string
  diagnosisSubtitle: string

  ecosystemTitle: string
  ecosystemSubtitle: string

  timelineTitle: string
  timelineSubtitle: string

  methodologyTitle: string
  methodologySubtitle: string

  projectionTitle: string
  projectionSubtitle: string

  investmentTitle: string
  investmentSubtitle: string

  roiTitle: string
  roiSubtitle: string

  closingTitle: string
  closingSubtitle: string

  // Closing
  ctaUrl: string

  // Diagnosis Data
  gaps: string[] // Renamed in UI to Pontos de Atenção
  growthLevers: string[] // New: Alavancas de Crescimento

  // Competitors Data
  competitorsData: CompetitorItem[]
  marketBenchmarking: string

  // Ecosystem Data (Strategy)
  trafficSources: string[] // Formerly channels
  conversionZone: string[] // Formerly addons
  salesIntelligence: string[] // New

  // Timeline Data
  timelinePhases: TimelinePhase[]

  // Projection Data (Formerly Funnel + Investment Context)
  currentInvestment: number
  currentCPA: number
  currentRevenue: number
  currentLeads: number
  currentSales: number // Added for ROI calc

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

  // Text Content
  strategyText: string
  executiveSummary: string
  methodologyText: string
  summaryLinks: SummaryLink[] // New

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
