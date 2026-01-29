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
  tags: [],

  profile: {
    name: 'Seu Nome',
    cpf: '',
    company: 'OCEAN PROPOSAL',
    cnpj: '00.000.000/0001-00',
    logo: 'https://img.usecurling.com/i?q=ocean&color=blue',
  },

  // Images
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

  // Titles
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
        'Análise de Métricas',
      ],
    },
    {
      month: 'Mês 3',
      title: 'Escala & Otimização',
      items: ['Escala de Verba', 'Redução de CAC', 'Expansão de Canais'],
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
          name: 'Setup de Business Manager',
          s1: true,
          s2: true,
          s3: false,
          s4: false,
          type: 'planning',
        },
        {
          name: 'Criação de Landing Pages',
          s1: false,
          s2: true,
          s3: true,
          s4: false,
          type: 'execution',
        },
        {
          name: 'Configuração de Pixel/API',
          s1: true,
          s2: false,
          s3: false,
          s4: false,
          type: 'planning',
        },
        {
          name: 'Produção de Criativos',
          s1: false,
          s2: true,
          s3: true,
          s4: false,
          type: 'execution',
        },
        {
          name: 'Lançamento de Campanhas',
          s1: false,
          s2: false,
          s3: false,
          s4: true,
          type: 'review',
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

  projectionCards: [
    {
      title: 'Leads Qualificados',
      metric: '+100%',
      subtext: 'Aumento de volume',
      tag: 'Meta Principal',
    },
    {
      title: 'Redução de CAC',
      metric: '-20%',
      subtext: 'Otimização de custos',
      tag: 'Eficiência',
    },
    {
      title: 'Taxa de Conversão',
      metric: '15%',
      subtext: 'Landing Pages',
      tag: 'CRO',
    },
    {
      title: 'Novas Vendas',
      metric: '+15',
      subtext: 'Incremental mensal',
      tag: 'Receita',
    },
  ],

  operationalCosts: [
    { id: '1', name: 'Verba Mídia (Sug.)', value: 20000 },
    { id: '2', name: 'Software/Tech', value: 1500 },
  ],

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
