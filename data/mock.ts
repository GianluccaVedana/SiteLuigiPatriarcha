import { Team, Match, Standing, Scorer, News, Sponsor, ChampionHistory } from '@/types'

export const mockTeams: Team[] = [
  {
    id: '1', name: 'Atlético Futsal', city: 'Pato Branco', category: 'adulto',
    responsible: 'Carlos Silva', phone: '(46) 99999-0001', email: 'atletico@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-01',
  },
  {
    id: '2', name: 'Grêmio Esportivo', city: 'Francisco Beltrão', category: 'adulto',
    responsible: 'Ana Costa', phone: '(46) 99999-0002', email: 'gremio@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-02',
  },
  {
    id: '3', name: 'FC União', city: 'Dois Vizinhos', category: 'adulto',
    responsible: 'Paulo Mendes', phone: '(46) 99999-0003', email: 'fcuniao@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-03',
  },
  {
    id: '4', name: 'Sport Club Sudoeste', city: 'Clevelândia', category: 'adulto',
    responsible: 'Roberto Lima', phone: '(46) 99999-0004', email: 'sport@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-04',
  },
  {
    id: '5', name: 'Real Futsal', city: 'Coronel Vivida', category: 'adulto',
    responsible: 'Marcos Alves', phone: '(46) 99999-0005', email: 'real@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-05',
  },
  {
    id: '6', name: 'Independente FC', city: 'Chopinzinho', category: 'adulto',
    responsible: 'Fernanda Rocha', phone: '(46) 99999-0006', email: 'indep@email.com',
    status: 'approved', paymentStatus: 'paid', players: [], createdAt: '2026-03-06',
  },
]

export const mockMatches: Match[] = [
  {
    id: '1', homeTeam: mockTeams[0], awayTeam: mockTeams[1],
    homeScore: 3, awayScore: 1, date: '2026-06-10', time: '19:00',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'A', referee: 'João Ferreira', status: 'finished',
  },
  {
    id: '2', homeTeam: mockTeams[2], awayTeam: mockTeams[3],
    homeScore: 2, awayScore: 2, date: '2026-06-10', time: '20:30',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'B', referee: 'Maria Santos', status: 'finished',
  },
  {
    id: '3', homeTeam: mockTeams[4], awayTeam: mockTeams[5],
    date: '2026-06-17', time: '19:00',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'A', referee: 'Pedro Oliveira', status: 'scheduled',
  },
  {
    id: '4', homeTeam: mockTeams[0], awayTeam: mockTeams[2],
    date: '2026-06-17', time: '20:30',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'B', referee: 'Carlos Souza', status: 'scheduled',
  },
  {
    id: '5', homeTeam: mockTeams[1], awayTeam: mockTeams[4],
    date: '2026-06-24', time: '19:00',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'A', status: 'scheduled',
  },
  {
    id: '6', homeTeam: mockTeams[3], awayTeam: mockTeams[5],
    date: '2026-06-24', time: '20:30',
    venue: 'Ginásio Municipal de Pato Branco', category: 'adulto',
    phase: 'grupo', group: 'B', status: 'scheduled',
  },
]

export const mockStandings: Standing[] = [
  { position: 1, team: mockTeams[0], points: 9, played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 4, goalDiff: 6, group: 'A' },
  { position: 2, team: mockTeams[4], points: 6, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 6, goalDiff: 2, group: 'A' },
  { position: 3, team: mockTeams[1], points: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 5, goalsAgainst: 8, goalDiff: -3, group: 'A' },
  { position: 1, team: mockTeams[2], points: 7, played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 9, goalsAgainst: 5, goalDiff: 4, group: 'B' },
  { position: 2, team: mockTeams[3], points: 4, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 7, goalsAgainst: 7, goalDiff: 0, group: 'B' },
  { position: 3, team: mockTeams[5], points: 1, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 3, goalsAgainst: 9, goalDiff: -6, group: 'B' },
]

export const mockScorers: Scorer[] = [
  { position: 1, player: { id: 'p1', name: 'Lucas Rodrigues', number: 10, position: 'pivo', birthDate: '1998-05-12', cpf: '000.000.000-00', goals: 8 }, team: mockTeams[0], goals: 8 },
  { position: 2, player: { id: 'p2', name: 'Gabriel Martins', number: 7, position: 'ala', birthDate: '2000-03-20', cpf: '000.000.000-00', goals: 6 }, team: mockTeams[2], goals: 6 },
  { position: 3, player: { id: 'p3', name: 'Felipe Souza', number: 9, position: 'pivo', birthDate: '1997-08-15', cpf: '000.000.000-00', goals: 5 }, team: mockTeams[1], goals: 5 },
  { position: 4, player: { id: 'p4', name: 'André Lima', number: 11, position: 'ala', birthDate: '2001-11-30', cpf: '000.000.000-00', goals: 4 }, team: mockTeams[3], goals: 4 },
  { position: 5, player: { id: 'p5', name: 'Rafael Costa', number: 5, position: 'fixo', birthDate: '1999-02-18', cpf: '000.000.000-00', goals: 4 }, team: mockTeams[4], goals: 4 },
  { position: 6, player: { id: 'p6', name: 'Thiago Alves', number: 8, position: 'ala', birthDate: '2002-07-25', cpf: '000.000.000-00', goals: 3 }, team: mockTeams[5], goals: 3 },
]

export const mockNews: News[] = [
  {
    id: '1', slug: 'abertura-29a-taca', author: 'Redação',
    title: 'Abertura oficial da 29ª Taça Luigi Patriarcha', publishedAt: '2026-05-15',
    excerpt: 'A 29ª edição da Taça Luigi Patriarcha de Futsal foi oficialmente aberta com grande festa no Ginásio Municipal.',
    content: 'A 29ª edição da tradicional Taça Luigi Patriarcha de Futsal foi oficialmente aberta...',
    image: 'https://picsum.photos/800/400?random=1', category: 'noticias',
  },
  {
    id: '2', slug: 'inscricoes-abertas', author: 'Redação',
    title: 'Inscrições abertas para todas as categorias', publishedAt: '2026-05-10',
    excerpt: 'As inscrições para a 29ª Taça Luigi Patriarcha estão abertas. Equipes podem se inscrever até o dia 30 de maio.',
    content: 'As inscrições para todas as categorias já estão abertas...',
    image: 'https://picsum.photos/800/400?random=2', category: 'comunicados',
  },
  {
    id: '3', slug: 'atletico-vence-gremio', author: 'Redação',
    title: 'Atlético vence Grêmio por 3 a 1 na rodada de abertura', publishedAt: '2026-06-10',
    excerpt: 'Em partida emocionante, o Atlético Futsal superou o Grêmio Esportivo por 3 a 1 na estreia do Grupo A.',
    content: 'Em duelo equilibrado e muito disputado...',
    image: 'https://picsum.photos/800/400?random=3', category: 'resultados',
  },
  {
    id: '4', slug: 'regulamento-publicado', author: 'Comissão Organizadora',
    title: 'Regulamento oficial da 29ª edição publicado', publishedAt: '2026-04-20',
    excerpt: 'A comissão organizadora publicou o regulamento completo da 29ª Taça Luigi Patriarcha. Confira as novidades desta edição.',
    content: 'O regulamento completo da 29ª edição está disponível para download...',
    image: 'https://picsum.photos/800/400?random=4', category: 'comunicados',
  },
]

export const mockSponsors: Sponsor[] = [
  { id: '1', name: 'Prefeitura de Pato Branco', tier: 'master' },
  { id: '2', name: 'Grêmio Industrial Patobranquense', tier: 'master' },
  { id: '3', name: 'Banco do Brasil', tier: 'ouro' },
  { id: '4', name: 'Cooperativa Lar', tier: 'ouro' },
  { id: '5', name: 'Sebrae PR', tier: 'prata' },
  { id: '6', name: 'Sicredi', tier: 'prata' },
  { id: '7', name: 'Supermercado Central', tier: 'apoio' },
  { id: '8', name: 'Auto Peças Sudoeste', tier: 'apoio' },
]

export const mockChampions: ChampionHistory[] = [
  { year: 2024, edition: 28, champion: 'Grêmio Industrial PBCO', runnerUp: '', category: 'adulto', topScorer: '', topScorerGoals: 0 },
  { year: 2023, edition: 27, champion: 'São Lourenço do Oeste', runnerUp: '', category: 'adulto', topScorer: '', topScorerGoals: 0 },
  { year: 2022, edition: 26, champion: 'Colégio Vicentino', runnerUp: '', category: 'adulto', topScorer: '', topScorerGoals: 0 },
  { year: 2019, edition: 25, champion: 'São Domingos', runnerUp: '', category: 'adulto', topScorer: '', topScorerGoals: 0 },
  { year: 2018, edition: 24, champion: 'Coronel Vivida', runnerUp: '', category: 'adulto', topScorer: '', topScorerGoals: 0 },
]

export const COMPETITION_DATE = new Date('2026-07-01T09:00:00')

export const CATEGORIES = [
  { value: 'sub-11', label: 'Sub-11' },
  { value: 'sub-13', label: 'Sub-13' },
  { value: 'sub-15', label: 'Sub-15' },
  { value: 'sub-17', label: 'Sub-17' },
  { value: 'sub-20', label: 'Sub-20' },
  { value: 'adulto', label: 'Adulto' },
  { value: 'feminino', label: 'Feminino' },
]
