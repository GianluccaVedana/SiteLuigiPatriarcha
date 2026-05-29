import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Badge from '@/components/ui/Badge'
import { mockTeams } from '@/data/mock'
import { Users, LogOut, Home, Menu, X } from 'lucide-react'

function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-navy-900 border-r border-gold-500/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gold-500/10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Taça Luigi</p>
            <p className="text-gold-500 text-xs">Painel Admin</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/40"><X size={18} /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/admin" onClick={() => setSidebarOpen(false)}
            className="admin-nav-item active">
            <Users size={18} />
            <span className="text-sm">Equipes Inscritas</span>
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-gold-500/10">
          <Link href="/" className="admin-nav-item mb-1"><Home size={18} /><span className="text-sm">Ver site</span></Link>
          <button onClick={() => { logout(); router.push('/') }} className="admin-nav-item w-full text-red-400 hover:text-red-300">
            <LogOut size={18} /><span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-navy-900/80 backdrop-blur-sm border-b border-gold-500/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
              <Menu size={22} />
            </button>
            <h1 className="text-white font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-sm">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="hidden sm:block text-white/70 text-sm">{user?.name}</span>
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

  return (
    <AdminLayout title="Equipes Inscritas">
      <Head><title>Admin · 29ª Taça Luigi Patriarcha</title></Head>

      <div className="glass-card rounded-2xl border border-gold-500/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-gold-500/10 flex items-center justify-between">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Users size={18} className="text-gold-400" />
            Equipes Inscritas
          </h2>
          <span className="text-white/40 text-sm">{mockTeams.length} equipe{mockTeams.length !== 1 ? 's' : ''}</span>
        </div>

        {mockTeams.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>Nenhuma equipe inscrita ainda.</p>
          </div>
        ) : (
          <div className="divide-y divide-gold-500/10">
            {mockTeams.map(team => (
              <div key={team.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-all">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white/60 font-bold text-sm flex-shrink-0">
                  {team.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{team.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{team.city} · {team.category} · {team.responsible}</p>
                </div>
                <Badge
                  variant={team.status === 'approved' ? 'green' : team.status === 'pending' ? 'orange' : 'red'}
                  size="sm"
                >
                  {team.status === 'approved' ? 'Aprovada' : team.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
