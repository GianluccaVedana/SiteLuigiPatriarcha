import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { CATEGORIES } from '@/data/mock'
import { User, Users, CreditCard, AlertCircle, CheckCircle2, Clock, LogOut, Plus, MapPin } from 'lucide-react'

interface InscricaoData {
  id: number
  team_name: string
  category: string
  city: string
  state: string
  responsible: string
  phone: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  players: { name: string; number: number; position: string }[]
  created_at: string
}

const POSITION_LABELS: Record<string, string> = {
  goleiro: 'Goleiro', fixo: 'Fixo', ala: 'Ala', pivo: 'Pivô',
}

export default function PainelPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, token } = useAuth()
  const [inscricao, setInscricao] = useState<InscricaoData | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/auth/login')
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    if (!token) return
    fetch('/api/teams', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setInscricao(data[0]) })
      .catch(() => {})
  }, [token])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user.role === 'admin') {
    router.push('/admin')
    return null
  }

  const statusConfig = {
    pending: { label: 'Aguardando aprovação', variant: 'orange' as const, icon: Clock },
    approved: { label: 'Aprovada', variant: 'green' as const, icon: CheckCircle2 },
    rejected: { label: 'Rejeitada', variant: 'red' as const, icon: AlertCircle },
  }

  const categoryLabel = inscricao
    ? (CATEGORIES.find(c => c.value === inscricao.category)?.label ?? inscricao.category)
    : ''

  return (
    <Layout>
      <Head><title>Meu Painel · 29ª Taça Luigi Patriarcha</title></Head>

      <div className="relative pt-24 pb-8 bg-navy-950/50 border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-navy-900 font-black text-xl">
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Olá, {user.name.split(' ')[0]}!</h1>
                <p className="text-white/40 text-sm">{user.email}</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push('/') }} className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-white/50 hover:text-red-400 transition-all text-sm">
              <LogOut size={14} />Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inscrição card */}
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-6 border border-gold-500/15">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Users size={18} className="text-gold-400" />Minha Inscrição
                </h2>

                {!inscricao ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-4">
                      <Users size={28} className="text-white/20" />
                    </div>
                    <p className="text-white/50 mb-5 text-sm">Você ainda não inscreveu uma equipe.</p>
                    <Link href="/inscricao" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm">
                      <Plus size={16} />Inscrever equipe agora
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-0">
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm">Equipe</span>
                      <span className="text-white font-semibold">{inscricao.team_name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm">Categoria</span>
                      <span className="text-white">{categoryLabel}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm flex items-center gap-1"><MapPin size={12} />Cidade</span>
                      <span className="text-white">{inscricao.city}{inscricao.state ? ` · ${inscricao.state}` : ''}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm">Responsável</span>
                      <span className="text-white">{inscricao.responsible}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm">Status</span>
                      <Badge variant={statusConfig[inscricao.status].variant}>{statusConfig[inscricao.status].label}</Badge>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gold-500/10">
                      <span className="text-white/50 text-sm">Inscrito em</span>
                      <span className="text-white/70 text-sm">{new Date(inscricao.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>

                    {/* Atletas */}
                    <div className="pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/50 text-sm font-medium">Atletas cadastrados</span>
                        <Badge variant="blue">{inscricao.players.length} atletas</Badge>
                      </div>
                      <div className="space-y-2">
                        {inscricao.players.map((p, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy-800/50 border border-gold-500/5">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 text-xs font-bold">
                                {p.number}
                              </span>
                              <span className="text-white text-sm">{p.name || <span className="text-white/30 italic">Sem nome</span>}</span>
                            </div>
                            <span className="text-white/40 text-xs">{POSITION_LABELS[p.position] ?? p.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Pagamento card */}
            <AnimatedSection delay={100}>
              <div className="glass-card rounded-2xl p-6 border border-gold-500/15">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-gold-400" />Pagamento
                </h2>
                <div className="text-center py-6 text-white/30 text-sm">
                  Nenhuma cobrança gerada.
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Profile */}
            <AnimatedSection direction="right" delay={200}>
              <div className="glass-card rounded-2xl p-5 border border-gold-500/15">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={14} />Meu Perfil
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/40">Nome</span><span className="text-white">{user.name}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">E-mail</span><span className="text-white/70 text-xs truncate max-w-[140px]">{user.email}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Conta criada</span><span className="text-white/70">{new Date(user.created_at).toLocaleDateString('pt-BR')}</span></div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  )
}
