import { Proposal } from '@/types/proposal'

export const DEFAULT_PROPOSAL: Proposal = {
  id: 'new',
  clientName: 'Cliente Exemplo',
  clientUrl: 'www.exemplo.com.br',
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
    'Foco total em captura de demanda existente via Google Ads e remarketing agressivo no Meta Ads.',
  executiveSummary:
    'O objetivo principal é escalar a geração de leads qualificados reduzindo o CAC atual em 20% nos primeiros 90 dias.',
  createdAt: new Date().toISOString(),
  status: 'draft',
}
