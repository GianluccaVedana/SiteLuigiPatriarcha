export interface Team {
  id: string
  name: string
  logo?: string
  city: string
  category: Category
  responsible: string
  phone: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  paymentStatus: 'pending' | 'paid' | 'overdue'
  players: Player[]
  createdAt: string
}

export interface Player {
  id: string
  name: string
  number: number
  position: 'goleiro' | 'fixo' | 'ala' | 'pivo'
  birthDate: string
  cpf: string
  goals?: number
  yellowCards?: number
  redCards?: number
}

export type Category = 'sub-11' | 'sub-13' | 'sub-15' | 'sub-17' | 'sub-20' | 'adulto' | 'feminino'

export interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  venue: string
  category: Category
  phase: 'grupo' | 'oitavas' | 'quartas' | 'semi' | 'final'
  group?: string
  referee?: string
  status: 'scheduled' | 'live' | 'finished'
}

export interface Standing {
  position: number
  team: Team
  points: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  group: string
}

export interface Scorer {
  player: Player
  team: Team
  goals: number
  position: number
}

export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image?: string
  author: string
  publishedAt: string
  category: 'noticias' | 'resultados' | 'classificacao' | 'comunicados'
  slug: string
}

export interface Sponsor {
  id: string
  name: string
  logo?: string
  tier: 'master' | 'ouro' | 'prata' | 'apoio'
  website?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  team?: Team
  createdAt: string
}

export interface PaymentInfo {
  id: string
  teamId: string
  amount: number
  status: 'pending' | 'paid' | 'cancelled' | 'overdue'
  method?: 'pix' | 'cartao' | 'boleto'
  dueDate: string
  paidAt?: string
  pixCode?: string
}

export interface ChampionHistory {
  year: number
  edition: number
  champion: string
  runnerUp: string
  category: Category
  topScorer: string
  topScorerGoals: number
}
