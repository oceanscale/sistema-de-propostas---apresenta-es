import { Proposal } from '@/types/proposal'

export const DEFAULT_PROPOSAL: Proposal = {
  id: 'new',
  clientName: 'Cliente Exemplo',
  clientUrl: 'www.exemplo.com.br',
  ctaUrl: 'https://wa.me/5511999999999',
  sector: 'Imóveis de Alto Padrão',
  location: 'São Paulo, SP',
  competitors: 'Concorrente A, Concorrente B',
  currentInvestment: 15000,
  currentCPA: 120,
  currentRevenue: 150000,
  currentLeads: 125,
  gaps: ['Ausência de Tagueamento Avançado', 'Baixa conversão na Landing Page'],
  channels: ['Google Ads', 'Meta Ads (Facebook/Instagram)'],
  addons: ['Landing Page High-Convert', 'Triagem com IA'],
  agencyFee: 5000,
  mediaBudget: 20000,
  softwareCost: 1500,
  strategyText:
    'Nossa abordagem integra captação de Fundo de Funil com Google Ads e Geração de Demanda visual via Meta Ads, suportada por nossa Tecnologia Proprietária de Triagem com IA.',
  executiveSummary:
    'O objetivo principal é escalar a geração de leads qualificados reduzindo o CAC atual em 20% nos primeiros 90 dias, utilizando inteligência de dados para maximizar o ROI.',
  createdAt: new Date().toISOString(),
  status: 'draft',
}
