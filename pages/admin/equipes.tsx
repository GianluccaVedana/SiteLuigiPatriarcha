import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockTeams } from '@/data/mock'
import { Team } from '@/types'
import { Search, Filter, CheckCircle2, XCircle, Eye, Users, LogOut, BarChart2, CreditCard, Newspaper, Image, Settings, Home, Menu, X, Bell, Trophy, Calendar } from 'lucide-react'

const navItems = [
  { href: '/admin', icon: BarChart2, label: 'Dashboard' },
  { href: '/admin/equipes', icon: Users, label: 'Equipes' },
  { href: '/admin/jogos', icon: Trophy, label: 'Jogos' },
  { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
  { href: '/admin/noticias', icon: Newspaper, label: 'Notícias' },
  { href: '/admin/galeria', icon: Image, label: 'Galeria' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 border-r border-gold-500/10 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gold-500/10">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <div><p className="text-white font-bold text-sm">Taça Luigi</p><p className="text-gold-500 text-xs">Painel Admin</p></div>
        <button onClick={onClose} className="ml-auto lg:hidden text-white/40"><X size={18} /></button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <Link key={item.href} href={item.href} onClick={onClose} className={`admin-nav-item ${router.pathname === item.href ? 'active' : ''}`}>
            <item.icon size={18} /><span className="text-sm">{item.label}</span>
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
  )
}

export default function AdminEquipes() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todas')
  const [selected, setSelected] = useState<Team | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) router.push('/auth/login')
  }, [isLoading, isAuthenticated, user])

  const filtered = teams.filter(t => {
    const searchOk = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.city.toLowerCase().includes(search.toLowerCase())
    const statusOk = statusFilter === 'Todas' || t.status === statusFilter.toLowerCase()
    return searchOk && statusOk
  })

  const approve = (id: string) => setTeams(t => t.map(team => team.id === id ? { ...team, status: 'approved' } : team))
  const reject = (id: string) => setTeams(t => t.map(team => team.id === id ? { ...team, status: 'rejected' } : team))

  if (isLoading || !user) return <div className="min-h-screen bg-navy-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-navy-950 flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-navy-900/80 backdrop-blur-sm border-b border-gold-500/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60"><Menu size={22} /></button>
            <h1 className="text-white font-bold">Gerenciar Equipes</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg glass-card text-white/50 hover:text-white"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" /></button>
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-sm">{user.name[0]}</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Head><title>Equipes · Admin · 29ª Taça Luigi Patriarcha</title></Head>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <input className="form-input pl-9 text-sm" placeholder="Buscar equipe ou cidade..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {['Todas', 'Pending', 'Approved', 'Rejected'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass-card text-white/50 hover:text-white'}`}>
                  {s === 'Pending' ? 'Pendentes' : s === 'Approved' ? 'Aprovadas' : s === 'Rejected' ? 'Rejeitadas' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <AnimatedSection>
            <div className="glass-card rounded-2xl border border-gold-500/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="championship-table">
                  <thead>
                    <tr>
                      <th>Equipe</th>
                      <th className="hidden sm:table-cell">Cidade</th>
                      <th className="hidden md:table-cell">Categoria</th>
                      <th>Status</th>
                      <th>Pagamento</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(team => (
                      <tr key={team.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center text-white/60 text-xs font-bold flex-shrink-0">{team.name[0]}</div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-semibold truncate">{team.name}</p>
                              <p className="text-white/30 text-xs">{team.responsible}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell text-white/60 text-sm">{team.city}</td>
                        <td className="hidden md:table-cell">
                          <Badge variant="blue" size="sm">{team.category}</Badge>
                        </td>
                        <td>
                          <Badge variant={team.status === 'approved' ? 'green' : team.status === 'pending' ? 'orange' : 'red'} size="sm">
                            {team.status === 'approved' ? 'Aprovada' : team.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                          </Badge>
                        </td>
                        <td>
                          <Badge variant={team.paymentStatus === 'paid' ? 'green' : 'orange'} size="sm">
                            {team.paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
                          </Badge>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => setSelected(team)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all" title="Ver detalhes"><Eye size={14} /></button>
                            {team.status === 'pending' && (
                              <>
                                <button onClick={() => approve(team.id)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-400 transition-all" title="Aprovar"><CheckCircle2 size={14} /></button>
                                <button onClick={() => reject(team.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-all" title="Rejeitar"><XCircle size={14} /></button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-gold-500/10 text-white/30 text-xs">
                {filtered.length} equipe(s) encontrada(s) de {teams.length} total
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} className="glass-card rounded-2xl border border-gold-500/20 p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Responsável', value: selected.responsible },
                { label: 'Telefone', value: selected.phone },
                { label: 'E-mail', value: selected.email },
                { label: 'Cidade', value: selected.city },
                { label: 'Categoria', value: selected.category },
                { label: 'Data de inscrição', value: new Date(selected.createdAt).toLocaleDateString('pt-BR') },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2 border-b border-gold-500/10">
                  <span className="text-white/40">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              {selected.status === 'pending' && (
                <>
                  <button onClick={() => { approve(selected.id); setSelected(null) }} className="flex-1 py-2.5 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 font-semibold text-sm hover:bg-green-500/30 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />Aprovar
                  </button>
                  <button onClick={() => { reject(selected.id); setSelected(null) }} className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 font-semibold text-sm hover:bg-red-500/30 transition-all flex items-center justify-center gap-2">
                    <XCircle size={16} />Rejeitar
                  </button>
                </>
              )}
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 rounded-xl glass-card text-white/60 text-sm font-semibold hover:text-white transition-all">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
