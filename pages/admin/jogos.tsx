import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockMatches } from '@/data/mock'
import { Match } from '@/types'
import { BarChart2, Users, Trophy, CreditCard, Newspaper, Image, Settings, Home, Menu, X, Bell, LogOut, Save, Edit3 } from 'lucide-react'

const navItems = [
  { href: '/admin', icon: BarChart2, label: 'Dashboard' },
  { href: '/admin/equipes', icon: Users, label: 'Equipes' },
  { href: '/admin/jogos', icon: Trophy, label: 'Jogos' },
  { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
  { href: '/admin/noticias', icon: Newspaper, label: 'Notícias' },
  { href: '/admin/galeria', icon: Image, label: 'Galeria' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function AdminJogos() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [matches, setMatches] = useState<Match[]>(mockMatches)
  const [editing, setEditing] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) router.push('/auth/login')
  }, [isLoading, isAuthenticated, user])

  const startEdit = (match: Match) => {
    setEditing(match.id)
    setScores(s => ({ ...s, [match.id]: { home: String(match.homeScore ?? ''), away: String(match.awayScore ?? '') } }))
  }

  const saveScore = (matchId: string) => {
    const s = scores[matchId]
    setMatches(ms => ms.map(m => m.id === matchId ? {
      ...m,
      homeScore: parseInt(s.home) || 0,
      awayScore: parseInt(s.away) || 0,
      status: 'finished',
    } : m))
    setEditing(null)
  }

  if (isLoading || !user) return <div className="min-h-screen bg-navy-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 border-r border-gold-500/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gold-500/10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div><p className="text-white font-bold text-sm">Taça Luigi</p><p className="text-gold-500 text-xs">Painel Admin</p></div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/40"><X size={18} /></button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`admin-nav-item ${router.pathname === item.href ? 'active' : ''}`}>
              <item.icon size={18} /><span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-gold-500/10">
          <Link href="/" className="admin-nav-item mb-1"><Home size={18} /><span className="text-sm">Ver site</span></Link>
          <button onClick={() => { logout(); router.push('/') }} className="admin-nav-item w-full text-red-400"><LogOut size={18} /><span className="text-sm">Sair</span></button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-navy-900/80 backdrop-blur-sm border-b border-gold-500/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60"><Menu size={22} /></button>
            <h1 className="text-white font-bold">Gerenciar Jogos</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg glass-card text-white/50 hover:text-white"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" /></button>
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-sm">{user.name[0]}</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Head><title>Jogos · Admin · 29ª Taça Luigi Patriarcha</title></Head>

          <div className="space-y-3">
            {matches.map((match, i) => (
              <AnimatedSection key={match.id} delay={i * 40}>
                <div className={`glass-card rounded-2xl p-4 border ${match.status === 'live' ? 'border-red-500/30' : 'border-gold-500/10'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={match.status === 'finished' ? 'green' : match.status === 'live' ? 'red' : 'default'} pulse={match.status === 'live'} size="sm">
                        {match.status === 'finished' ? 'Encerrado' : match.status === 'live' ? 'Ao Vivo' : 'Programado'}
                      </Badge>
                      <Badge variant="blue" size="sm">Grupo {match.group}</Badge>
                      <span className="text-white/40 text-xs">{new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {match.time}</span>
                    </div>

                    {editing !== match.id ? (
                      <button onClick={() => startEdit(match)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-gold-400 text-xs font-semibold border border-gold-500/20 hover:bg-gold-500/10 transition-all">
                        <Edit3 size={12} />Lançar resultado
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input type="number" min="0" max="99" value={scores[match.id]?.home || ''} onChange={e => setScores(s => ({ ...s, [match.id]: { ...s[match.id], home: e.target.value } }))} className="w-12 h-8 bg-navy-700 border border-gold-500/30 rounded-lg text-white text-center text-sm font-bold focus:outline-none focus:border-gold-500" placeholder="0" />
                        <span className="text-gold-500 font-bold">×</span>
                        <input type="number" min="0" max="99" value={scores[match.id]?.away || ''} onChange={e => setScores(s => ({ ...s, [match.id]: { ...s[match.id], away: e.target.value } }))} className="w-12 h-8 bg-navy-700 border border-gold-500/30 rounded-lg text-white text-center text-sm font-bold focus:outline-none focus:border-gold-500" placeholder="0" />
                        <button onClick={() => saveScore(match.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold hover:bg-green-500/30 transition-all">
                          <Save size={12} />Salvar
                        </button>
                        <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg glass-card text-white/50 text-xs font-semibold hover:text-white transition-all">
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center text-white/60 text-xs font-bold">{match.homeTeam.name[0]}</div>
                      <span className={`font-bold text-sm ${match.status === 'finished' && (match.homeScore ?? 0) > (match.awayScore ?? 0) ? 'text-white' : 'text-white/60'}`}>{match.homeTeam.name}</span>
                    </div>
                    <div className="flex-shrink-0 min-w-[60px] text-center">
                      {match.status === 'finished' ? (
                        <span className="text-gold-400 font-black text-lg tabular-nums">{match.homeScore} – {match.awayScore}</span>
                      ) : (
                        <span className="text-white/30 font-bold">VS</span>
                      )}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className={`font-bold text-sm ${match.status === 'finished' && (match.awayScore ?? 0) > (match.homeScore ?? 0) ? 'text-white' : 'text-white/60'}`}>{match.awayTeam.name}</span>
                      <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center text-white/60 text-xs font-bold">{match.awayTeam.name[0]}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
