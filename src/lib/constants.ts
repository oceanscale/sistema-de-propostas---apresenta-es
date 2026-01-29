import { Proposal } from '@/types/proposal'

export const DEFAULT_PROPOSAL: Proposal = {
  id: 'new',
  agencyName: 'OCEAN PROPOSAL',
  agencyCnpj: '00.000.000/0001-00',
  agencyRep: 'Seu Nome',
  clientName: 'Cliente Exemplo',
  clientUrl: 'www.exemplo.com.br',
  clientObjective: 'Escalar vendas e reduzir custo por lead.',
  sector: 'Imóveis de Alto Padrão',
  location: 'São Paulo, SP',
  tags: [],
  viewMode: 'document',

  profile: {
    name: 'Seu Nome',
    cpf: '',
    company: 'OCEAN PROPOSAL',
    cnpj: '00.000.000/0001-00',
    logo: 'https://img.usecurling.com/i?q=ocean&color=blue',
  },

  coverImage:
    'https://img.usecurling.com/p/1200/800?q=modern%20skyscrapers%20corporate&color=black',
  coverOverlayColor: '#000000',
  coverOverlayOpacity: 40,

  summaryPageImage:
    'https://img.usecurling.com/p/1200/800?q=white%20minimalist%20office&color=white',
  summaryBoxImage:
    'https://img.usecurling.com/p/1200/800?q=abstract%20technology%20network&color=blue',
  summaryOverlayColor: '#000000',
  summaryOverlayOpacity: 30,

  closingImage:
    'https://img.usecurling.com/p/1200/800?q=handshake%20business%20deal%20close&color=black',
  closingOverlayColor: '#000000',
  closingOverlayOpacity: 20,

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
  closingButtonText: 'APROVAR PLANO ESTRATÉGICO',

  currentInvestment: 15000,
  suggestedInvestment: 0,
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
      items: ['Auditoria', 'LPs', 'Setup', 'Tagueamento'],
    },
    {
      month: 'Mês 2',
      title: 'Validação & Testes',
      items: ['Testes A/B', 'Públicos', 'Keywords', 'Métricas'],
    },
    {
      month: 'Mês 3',
      title: 'Escala & Otimização',
      items: ['Escala Verba', 'Redução CAC', 'Novos Canais', 'Reports'],
    },
  ],

  ganttPages: [
    {
      id: 'gantt-1',
      title: 'Cronograma Detalhado',
      subtitle: 'Visão Semanal',
      month: 'MÊS 1',
      tasks: [
        {
          name: 'Setup de BM',
          s1: true,
          s2: true,
          s3: false,
          s4: false,
          type: 'planning',
          pillar: 'Setup',
        },
        {
          name: 'Criação de LPs',
          s1: false,
          s2: true,
          s3: true,
          s4: false,
          type: 'execution',
          pillar: 'Setup',
        },
        {
          name: 'Config Pixel',
          s1: true,
          s2: false,
          s3: false,
          s4: false,
          type: 'planning',
          pillar: 'Tracking',
        },
        {
          name: 'Criativos',
          s1: false,
          s2: true,
          s3: true,
          s4: false,
          type: 'execution',
          pillar: 'Criativos',
        },
        {
          name: 'Lançamento',
          s1: false,
          s2: false,
          s3: false,
          s4: true,
          type: 'review',
          pillar: 'Mídia',
        },
      ],
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

  funnelSteps: [
    { label: 'Impressões', value: '1.5M', color: '#38bdf8' },
    { label: 'Cliques', value: '15k', color: '#0ea5e9' },
    { label: 'Leads', value: '450', color: '#0284c7' },
    { label: 'Vendas', value: '25', color: '#0369a1' },
  ],

  projectionCards: [
    {
      title: 'Leads Qualificados',
      metric: '+100%',
      subtext: 'Aumento de volume',
      tag: 'Meta Principal',
      tooltip: 'Baseado no aumento de verba.',
    },
    {
      title: 'Redução de CAC',
      metric: '-20%',
      subtext: 'Otimização de custos',
      tag: 'Eficiência',
      tooltip: 'Otimização de campanhas.',
    },
    {
      title: 'Novas Vendas',
      metric: '+15',
      subtext: 'Incremental mensal',
      tag: 'Receita',
      tooltip: 'Conversão de leads qualificados.',
    },
  ],

  operationalCosts: [
    { id: '1', name: 'Verba Mídia (Sug.)', value: 20000 },
    { id: '2', name: 'Software/Tech', value: 1500 },
  ],
  costsTitle: 'Custos Operacionais',
  costsSubtitle: 'Valores para terceiros',
  costDisclaimers: [
    'Pagamento direto via cartão de crédito.',
    'Valores estimados.',
  ],

  investmentTiers: [
    {
      name: 'Essencial',
      fee: 4000,
      description: 'Para quem está começando a escalar.',
      features: ['Gestão de 2 Canais', 'Relatório Mensal', 'Setup Básico'],
      recommended: false,
      buttonText: 'Selecionar Essencial',
      buttonUrl: '#',
      buttonColor: '#f1f5f9',
      buttonTextColor: '#0f172a',
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
      buttonText: 'Contratar Growth',
      buttonUrl: '#',
      buttonColor: '#0ea5e9',
      buttonTextColor: '#ffffff',
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
      buttonText: 'Falar com Consultor',
      buttonUrl: '#',
      buttonColor: '#f1f5f9',
      buttonTextColor: '#0f172a',
    },
  ],

  roiBenchmarks: [
    { label: 'Receita', current: 150000, projected: 350000, unit: 'R$' },
    { label: 'Leads', current: 125, projected: 350, unit: '' },
    { label: 'Vendas', current: 10, projected: 25, unit: '' },
    { label: 'ROAS', current: 4, projected: 8, unit: 'x' },
  ],

  roasProjected: {
    roi: '550%',
    label: 'ROI Estimado',
    note: 'Sobre o investimento total',
  },

  strategyText:
    'Nossa abordagem integra captação de Fundo de Funil com Google Ads e Geração de Demanda visual via Meta Ads.',
  executiveSummary:
    'O objetivo principal é escalar a geração de leads qualificados reduzindo o CAC atual em 20%.',

  summaryTriad: {
    marketing: 'Estratégia Full-Funnel focada em performance.',
    ai: 'Tecnologia de ponta para análise preditiva.',
    commercial: 'Foco total em vendas e receita.',
  },

  methodologyText: 'Utilizamos uma metodologia proprietária baseada em dados.',
  summaryLinks: [{ title: 'Ver Site', url: 'https://example.com' }],

  summaryMetrics: [
    {
      label: 'Leads Qualificados',
      value: '+100%',
      icon: 'target',
      description: 'Meta de crescimento',
    },
    {
      label: 'ROI Estimado',
      value: '5x',
      icon: 'trending',
      description: 'Retorno sobre Mídia',
    },
    {
      label: 'Share of Voice',
      value: 'Top 1',
      icon: 'users',
      description: 'Dominância de Mercado',
    },
  ],

  methodologyItems: [
    {
      title: 'Growth AI Screening',
      description:
        'Nossa tecnologia proprietária analisa leads em tempo real, pontuando a intenção de compra.',
      icon: 'cpu',
    },
    {
      title: 'Dashboard Ao Vivo',
      description:
        'Transparência radical. Acesso 24/7 a um painel financeiro para acompanhar cada centavo.',
      icon: 'barChart',
    },
    {
      title: 'Auditoria Semanal',
      description:
        'Rotina dupla de otimização: algoritmos preditivos para lances e curadoria humana sênior.',
      icon: 'search',
    },
  ],

  methodologyFeatures: [
    'Time Sênior Dedicado (Sem Juniors)',
    'Acesso a APIs Oficiais (Meta/Google)',
    'Transparência Total de Dados',
  ],
  methodologyQaTitle: 'Garantia de Qualidade',
  methodologyQaIcon: 'ShieldCheck',

  methodologyExtra: {
    title: 'Omnichannel Nativo',
    text: 'Integração total entre canais e CRM. O dado que entra em um canal alimenta a inteligência do outro.',
    icon: 'zap',
  },

  footerText: ['Time Sênior', 'APIs Oficiais', 'Transparência de Dados'],

  pageOrder: [
    'parts',
    'cover',
    'summary',
    'competitors',
    'diagnosis',
    'ecosystem',
    'timeline',
    'gantt-1',
    'methodology',
    'projection',
    'financials',
    'roi',
    'closing',
  ],

  library: [],

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
}
