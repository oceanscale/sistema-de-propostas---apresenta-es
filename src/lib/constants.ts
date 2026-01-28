import { Proposal } from '@/types/proposal'

export const DEFAULT_PROPOSAL: Proposal = {
  id: 'new',
  agencyName: 'GrowthProposal OS',
  agencyCnpj: '00.000.000/0001-00',
  agencyRep: 'Seu Nome',

  clientName: 'Cliente Exemplo',
  clientUrl: 'www.exemplo.com.br',
  ctaUrl: 'https://wa.me/5511999999999',
  sector: 'Imóveis de Alto Padrão',
  location: 'São Paulo, SP',

  coverImage:
    'https://img.usecurling.com/p/1200/800?q=modern%20skyscrapers%20corporate&color=black',
  summaryImage:
    'https://img.usecurling.com/p/1200/800?q=abstract%20technology%20network&color=blue',

  currentInvestment: 15000,
  currentCPA: 120,
  currentRevenue: 150000,
  currentLeads: 125,
  gaps: ['Ausência de Tagueamento Avançado', 'Baixa conversão na Landing Page'],

  competitorsData: [
    {
      name: 'Concorrente A',
      website: 'www.concorrente-a.com.br',
      presence:
        'Forte presença no Instagram com influenciadores, mas site lento e sem otimização mobile.',
      strengths: ['Preço Competitivo', 'Entrega Rápida'],
    },
    {
      name: 'Concorrente B',
      website: 'www.concorrente-b.com',
      presence:
        'Investe pesado em Google Ads, porém com criativos genéricos e baixa retenção.',
      strengths: ['Marca Forte', 'Variedade de Produtos'],
    },
  ],
  marketBenchmarking:
    'O mercado apresenta saturação em canais tradicionais, abrindo oportunidade para estratégias de tráfego pago segmentado focadas em experiência do usuário.',

  channels: ['Google Ads', 'Meta Ads (Facebook/Instagram)'],
  addons: ['Landing Page High-Convert', 'Triagem com IA'],

  timelinePhases: [
    {
      month: 'Mês 1',
      title: 'Setup & Estruturação',
      items: [
        'Auditoria de Tagueamento',
        'Criação de LPs',
        'Setup de Campanhas',
      ],
    },
    {
      month: 'Mês 2',
      title: 'Validação & Testes',
      items: [
        'Testes A/B de Criativos',
        'Otimização de Públicos',
        'Refinamento de Keywords',
      ],
    },
    {
      month: 'Mês 3',
      title: 'Escala & Otimização',
      items: ['Escala de Verba', 'Redução de CAC', 'Expansão de Canais'],
    },
  ],

  funnelCurrent: {
    clicks: 5000,
    leads: 125,
    mql: 40,
    sql: 15,
    sales: 5,
  },
  funnelProjected: {
    clicks: 12000,
    leads: 350,
    mql: 120,
    sql: 50,
    sales: 18,
  },

  mediaBudget: 20000,
  softwareCost: 1500,
  investmentTiers: [
    {
      name: 'Essencial',
      fee: 4000,
      description: 'Para quem está começando a escalar.',
      features: ['Gestão de 2 Canais', 'Relatório Mensal', 'Setup Básico'],
      recommended: false,
    },
    {
      name: 'Growth',
      fee: 7500,
      description: 'Aceleração total com inteligência.',
      features: [
        'Gestão Multicanal',
        'Dashboard Tempo Real',
        'Landing Pages',
        'Otimização Semanal',
      ],
      recommended: true,
    },
    {
      name: 'Scale',
      fee: 12000,
      description: 'Dominação de mercado e alta performance.',
      features: [
        'Squad Dedicado',
        'Consultoria de Vendas',
        'CRO Avançado',
        'Design Premium',
      ],
      recommended: false,
    },
  ],

  strategyText:
    'Nossa abordagem integra captação de Fundo de Funil com Google Ads e Geração de Demanda visual via Meta Ads, suportada por nossa Tecnologia Proprietária de Triagem com IA.',
  executiveSummary:
    'O objetivo principal é escalar a geração de leads qualificados reduzindo o CAC atual em 20% nos primeiros 90 dias, utilizando inteligência de dados para maximizar o ROI.',
  methodologyText:
    'Utilizamos uma metodologia proprietária baseada em dados, combinando inteligência artificial para triagem de leads e expertise humana para estratégia criativa.',

  createdAt: new Date().toISOString(),
  status: 'draft',
}
