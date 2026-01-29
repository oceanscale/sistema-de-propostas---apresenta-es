export interface InvestmentTier {
  name: string
  fee: number
  description: string
  features: string[]
  recommended?: boolean
}

export interface OperationalCost {
  id: string
  name: string
  value: number
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

export interface SummaryMetric {
  label: string
  value: string
  icon: string
  description: string
}

export interface MethodologyItem {
  title: string
  description: string
  icon: string
}

export interface ProjectionCard {
  title: string
  metric: string
  subtext: string
  tag: string
}

export interface GanttTask {
  name: string
  s1: boolean
  s2: boolean
  s3: boolean
  s4: boolean
  type: 'planning' | 'execution' | 'review'
}

export interface GanttPage {
  id: string
  title: string
  subtitle: string
  month: string
  tasks: GanttTask[]
}

export interface ProfileData {
  name: string
  cpf: string
  company: string
  cnpj: string
  logo: string
}

export interface SummaryTriad {
  marketing: string
  ai: string
  commercial: string
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

  // Meta
  tags: string[]

  // Profile
  profile: ProfileData

  // Images & Visuals
  // Cover
  coverImage: string
  coverOverlayColor: string
  coverOverlayOpacity: number

  // Summary
  summaryPageImage: string
  summaryBoxImage: string
  summaryOverlayColor: string
  summaryOverlayOpacity: number

  // Closing
  closingImage: string
  closingOverlayColor: string
  closingOverlayOpacity: number

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
  closingButtonText: string

  // Diagnosis Data
  gaps: string[]
  growthLevers: string[]

  // Competitors Data
  competitorsData: CompetitorItem[]
  marketBenchmarking: string

  // Ecosystem Data (Strategy)
  trafficSources: string[]
  conversionZone: string[]
  salesIntelligence: string[]

  // Timeline Data
  timelinePhases: TimelinePhase[]

  // Gantt Data
  ganttPages: GanttPage[]

  // Projection Data
  currentInvestment: number
  currentCPA: number
  currentRevenue: number
  currentLeads: number
  currentSales: number

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

  // Projection Cards
  projectionCards: ProjectionCard[]

  // Financials
  operationalCosts: OperationalCost[]
  investmentTiers: InvestmentTier[]

  // Text Content
  strategyText: string
  executiveSummary: string // Kept for backward compatibility or simple layout
  summaryTriad: SummaryTriad
  methodologyText: string
  summaryLinks: SummaryLink[]

  // Methodology Details
  methodologyFeatures: string[]
  methodologyExtra: {
    title: string
    text: string
    icon: string
  }

  // Footer
  footerText: string[]

  // Editable Arrays
  summaryMetrics: SummaryMetric[]
  methodologyItems: MethodologyItem[]

  // Order of pages & Library
  pageOrder: string[]
  library: string[] // IDs of removed pages

  createdAt: string
  updatedAt: string
  userId?: string
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
