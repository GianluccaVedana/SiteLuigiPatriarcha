import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockTeams, mockMatches } from '@/data/mock'
import {
  Users, Trophy, CreditCard, Bell, BarChart2, Settings,
  LogOut, ChevronRight, CheckCircle2, Clock, AlertCircle,
  FileText, Calendar, Home, Shield, Newspaper, Image, Menu, X
} from 'lucide-react'

const navItems = [
  { href: '/admin', icon: BarChart2, label: 'Dashboard' },
  { href: '/admin/equipes', icon: Users, label: 'Equipes' },
  { href: '/admin/jogos', icon: Trophy, label: 'Jogos' },
  { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
  { href: '/admin/noticias', icon: Newspaper, label: 'Notícias' },
  { href: '/admin/galeria', icon: Image, label: 'Galeria' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 border-r border-gold-500/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gold-500/10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Taça Luigi</p>
            <p className="text-gold-500 text-xs">Painel Admin</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/40"><X size={18} /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`admin-nav-item ${router.pathname === item.href ? 'active' : ''}`}>
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gold-500/10">
          <Link href="/" className="admin-nav-item mb-1"><Home size={18} /><span className="text-sm">Ver site</span></Link>
          <button onClick={() => { logout(); router.push('/') }} className="admin-nav-item w-full text-red-400 hover:text-red-300">
            <LogOut size={18} /><span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-navy-900/80 backdrop-blur-sm border-b border-gold-500/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
              <Menu size={22} />
            </button>
            <h1 className="text-white font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg glass-card text-white/50 hover:text-white transition-all">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-sm">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:block text-white/70 text-sm">{user?.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) router.push('/auth/login')
  }, [isLoading, isAuthenticated, user])

  if (isLoading || !user) {
    return <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  }

  const stats = [
    { label: 'Equipes Inscritas', value: mockTeams.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', delta: '+3 essa semana' },
    { label: 'Aprovadas', value: mockTeams.filter(t => t.status === 'approved').length, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', delta: '100% aprovação' },
    { label: 'Pagamentos Pendentes', value: mockTeams.filter(t => t.paymentStatus === 'pending').length, icon: CreditCard, color: 'text-orange-400', bg: 'bg-orange-500/10', delta: 'Requer atenção' },
    { label: 'Total Arrecadado', value: 'R$ 1.500', icon: Trophy, color: 'text-gold-400', bg: 'bg-gold-500/10', delta: '6 pagamentos' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <Head><title>Admin · 29ª Taça Luigi Patriarcha</title></Head>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 60}>
            <div className="glass-card rounded-2xl p-5 border border-gold-500/10">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <span className="text-white/30 text-xs text-right leading-tight max-w-[80px]">{stat.delta}</span>
              </div>
              <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-white/50 text-xs font-medium">{stat.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent teams */}
        <AnimatedSection className="lg:col-span-3" delay={100}>
          <div className="glass-card rounded-2xl border border-gold-500/10 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold-500/10">
              <h2 className="font-bold text-white text-sm">Últimas Inscrições</h2>
              <Link href="/admin/equipes" className="text-gold-400 text-xs hover:text-gold-300 flex items-center gap-0.5">Ver todas <ChevronRight size={12} /></Link>
            </div>
            <div className="divide-y divide-gold-500/10">
              {mockTeams.slice(0, 5).map(team => (
                <div key={team.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/2">
                  <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-white/60 font-bold text-sm flex-shrink-0">{team.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{team.name}</p>
                    <p className="text-white/40 text-xs">{team.city} · {team.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={team.status === 'approved' ? 'green' : team.status === 'pending' ? 'orange' : 'red'} size="sm">
                      {team.status === 'approved' ? 'Aprovada' : team.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                    </Badge>
                    <Badge variant={team.paymentStatus === 'paid' ? 'green' : 'orange'} size="sm">
                      {team.paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Right side */}
        <AnimatedSection className="lg:col-span-2 space-y-4" delay={200}>
          {/* Quick actions */}
          <div className="glass-card rounded-2xl border border-gold-500/10 p-5">
            <h2 className="font-bold text-white text-sm mb-4">Ações Rápidas</h2>
            <div className="space-y-2">
              {[
                { href: '/admin/equipes', icon: Users, label: 'Aprovar inscrições pendentes', badge: '2' },
                { href: '/admin/jogos', icon: Calendar, label: 'Lançar resultados', badge: '3' },
                { href: '/admin/pagamentos', icon: CreditCard, label: 'Confirmar pagamentos', badge: '1' },
                { href: '/admin/noticias', icon: FileText, label: 'Publicar notícia', badge: null },
              ].map(action => (
                <Link key={action.href} href={action.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group">
                  <action.icon size={16} className="text-gold-400" />
                  <span className="text-white/70 group-hover:text-white text-sm flex-1 transition-colors">{action.label}</span>
                  {action.badge && <span className="w-5 h-5 rounded-full bg-red-500/80 text-white text-xs font-bold flex items-center justify-center">{action.badge}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming matches */}
          <div className="glass-card rounded-2xl border border-gold-500/10 p-5">
            <h2 className="font-bold text-white text-sm mb-4">Próximos Jogos</h2>
            <div className="space-y-3">
              {mockMatches.filter(m => m.status === 'scheduled').slice(0, 3).map(match => (
                <div key={match.id} className="text-xs">
                  <div className="flex justify-between text-white/40 mb-0.5">
                    <span>{new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {match.time}</span>
                    <Badge variant="blue" size="sm">Grupo {match.group}</Badge>
                  </div>
                  <p className="text-white/80 text-xs">{match.homeTeam.name} <span className="text-gold-500">×</span> {match.awayTeam.name}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </AdminLayout>
  )
}
