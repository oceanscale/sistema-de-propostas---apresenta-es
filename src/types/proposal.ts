export interface Proposal {
  id: string
  clientName: string
  clientUrl: string
  sector: string
  location: string
  competitors: string

  // Diagnosis
  currentInvestment: number
  currentCPA: number
  currentRevenue: number
  currentLeads: number
  gaps: string[]

  // Strategy
  channels: string[]
  addons: string[]

  // Financials
  agencyFee: number
  mediaBudget: number
  softwareCost: number

  // AI Generated / Calculated
  strategyText: string
  executiveSummary: string

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
