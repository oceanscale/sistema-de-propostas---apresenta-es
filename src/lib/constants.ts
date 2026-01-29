import { Proposal } from '@/types/proposal'

export const DEFAULT_PROPOSAL: Proposal = {
  id: 'new',
  // Parts
  agencyName: 'OCEAN PROPOSAL',
  agencyCnpj: '00.000.000/0001-00',
  agencyRep: 'Seu Nome',
  clientName: 'Cliente Exemplo',
  clientUrl: 'www.exemplo.com.br',
  sector: 'Imóveis de Alto Padrão',
  location: 'São Paulo, SP',

  // Images
  coverImage:
    'https://img.usecurling.com/p/1200/800?q=modern%20skyscrapers%20corporate&color=black',
  summaryPageImage:
    'https://img.usecurling.com/p/1200/800?q=white%20minimalist%20office&color=white',
  summaryBoxImage:
    'https://img.usecurling.com/p/1200/800?q=abstract%20technology%20network&color=blue',

  // Titles & Subtitles
  coverTitle: 'Plano de Aceleração & Performance',
  coverSubtitle: 'Estratégia comercial personalizada',

  summaryTitle: 'Sumário Executivo',
  summarySubtitle: 'Visão Geral do Projeto',

  competitorsTitle: 'Análise Competitiva',
  competitorsSubtitle: 'Inteligência de Mercado',

  diagnosisTitle: 'Diagnóstico & Oportunidades',
  diagnosisSubtitle: 'Análise de Cenário',

  ecosystemTitle: 'O Ecossistema de Performance',
  ecosystemSubtitle: 'Jornada do Cliente',

  timelineTitle: 'Cronograma - 90 Dias',
  timelineSubtitle: 'Roadmap de Implementação',

  methodologyTitle: 'Metodologia e Tecnologia',
  methodologySubtitle: 'Diferenciais Competitivos',

  projectionTitle: 'Projeção de Resultados',
  projectionSubtitle: 'Funil de Vendas & Performance',

  investmentTitle: 'Investimento',
  investmentSubtitle: 'Proposta Comercial',

  roiTitle: 'ROI Estimado',
  roiSubtitle: 'Retorno sobre Investimento',

  closingTitle: 'Vamos acelerar o crescimento juntos?',
  closingSubtitle: 'Do tráfego à venda real.',

  ctaUrl: 'https://wa.me/5511999999999',

  // Data
  currentInvestment: 15000,
  currentCPA: 120,
  currentRevenue: 150000,
  currentLeads: 125,
  currentSales: 10,
  gaps: ['Ausência de Tagueamento Avançado', 'Baixa conversão na Landing Page'],
  growthLevers: [
    'Exploração de Google Ads',
    'Otimização de CRO',
    'Automação de Leads',
  ],

  competitorsData: [
    {
      name: 'Concorrente A',
      website: 'www.concorrente-a.com.br',
      presence: 'Forte presença no Instagram.',
      strengths: ['Preço', 'Entrega'],
      weaknesses: ['Site Lento', 'Sem SEO'],
    },
  ],
  marketBenchmarking: 'O mercado apresenta saturação em canais tradicionais.',

  // Ecosystem Lists
  trafficSources: [
    'Google ADS (Pesquisa)',
    'Meta Ads (Facebook/Instagram)',
    'Linkedin Ads',
  ],
  conversionZone: [
    'Landing Page (High-Convert)',
    'Automação de Leads',
    'Website',
  ],
  salesIntelligence: [
    'CRM',
    'Dashboard de Campanhas',
    'Acompanhamento Comercial',
  ],

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
    'Nossa abordagem integra captação de Fundo de Funil com Google Ads e Geração de Demanda visual via Meta Ads.',
  executiveSummary:
    'O objetivo principal é escalar a geração de leads qualificados reduzindo o CAC atual em 20%.',
  methodologyText: 'Utilizamos uma metodologia proprietária baseada em dados.',
  summaryLinks: [{ title: 'Ver Site', url: 'https://example.com' }],

  createdAt: new Date().toISOString(),
  status: 'draft',
}
