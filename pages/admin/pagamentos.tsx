import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockTeams } from '@/data/mock'
import { BarChart2, Users, Trophy, CreditCard, Newspaper, Image, Settings, Home, Menu, X, Bell, LogOut, CheckCircle2 } from 'lucide-react'

const navItems = [
  { href: '/admin', icon: BarChart2, label: 'Dashboard' },
  { href: '/admin/equipes', icon: Users, label: 'Equipes' },
  { href: '/admin/jogos', icon: Trophy, label: 'Jogos' },
  { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
  { href: '/admin/noticias', icon: Newspaper, label: 'Notícias' },
  { href: '/admin/galeria', icon: Image, label: 'Galeria' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function AdminPagamentos() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [payments, setPayments] = useState(mockTeams.map(t => ({
    ...t,
    amount: 250,
    dueDate: '2026-06-01',
    method: t.paymentStatus === 'paid' ? 'pix' : undefined,
  })))
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) router.push('/auth/login')
  }, [isLoading, isAuthenticated, user])

  const confirmPayment = (id: string) => {
    setPayments(p => p.map(pay => pay.id === id ? { ...pay, paymentStatus: 'paid', method: 'pix' } : pay))
  }

  if (isLoading || !user) return <div className="min-h-screen bg-navy-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>

  const totalPaid = payments.filter(p => p.paymentStatus === 'paid').length
  const totalPending = payments.filter(p => p.paymentStatus === 'pending').length
  const totalAmount = totalPaid * 250

  return (
    <div className="min-h-screen bg-navy-950 flex">
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
            <h1 className="text-white font-bold">Pagamentos</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg glass-card text-white/50"><Bell size={18} /></button>
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-sm">{user.name[0]}</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Head><title>Pagamentos · Admin</title></Head>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Pagamentos Confirmados', value: totalPaid, color: 'text-green-400', bg: 'bg-green-500/10' },
              { label: 'Aguardando Pagamento', value: totalPending, color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { label: 'Total Arrecadado', value: `R$ ${totalAmount.toLocaleString('pt-BR')}`, color: 'text-gold-400', bg: 'bg-gold-500/10' },
            ].map(s => (
              <AnimatedSection key={s.label}>
                <div className="glass-card rounded-2xl p-4 border border-gold-500/10 text-center">
                  <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Table */}
          <AnimatedSection delay={100}>
            <div className="glass-card rounded-2xl border border-gold-500/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="championship-table">
                  <thead>
                    <tr>
                      <th>Equipe</th>
                      <th className="hidden sm:table-cell">Categoria</th>
                      <th>Valor</th>
                      <th>Status</th>
                      <th className="hidden md:table-cell">Método</th>
                      <th className="hidden md:table-cell">Vencimento</th>
                      <th className="text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center text-white/60 text-xs font-bold flex-shrink-0">{p.name[0]}</div>
                            <span className="text-white text-sm font-medium">{p.name}</span>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell"><Badge variant="blue" size="sm">{p.category}</Badge></td>
                        <td className="text-white font-bold text-sm">R$ {p.amount}</td>
                        <td>
                          <Badge variant={p.paymentStatus === 'paid' ? 'green' : p.paymentStatus === 'overdue' ? 'red' : 'orange'} size="sm">
                            {p.paymentStatus === 'paid' ? 'Pago' : p.paymentStatus === 'overdue' ? 'Vencido' : 'Pendente'}
                          </Badge>
                        </td>
                        <td className="hidden md:table-cell text-white/50 text-sm">{(p as any).method || '–'}</td>
                        <td className="hidden md:table-cell text-white/50 text-sm">{p.dueDate}</td>
                        <td className="text-center">
                          {p.paymentStatus !== 'paid' && (
                            <button onClick={() => confirmPayment(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold hover:bg-green-500/30 transition-all mx-auto">
                              <CheckCircle2 size={12} />Confirmar
                            </button>
                          )}
                          {p.paymentStatus === 'paid' && <span className="text-green-400 text-xs">✓ Confirmado</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}
