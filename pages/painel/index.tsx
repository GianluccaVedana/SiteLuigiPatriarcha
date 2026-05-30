import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { CATEGORIES } from '@/data/mock'
import { User, Users, AlertCircle, CheckCircle2, Clock, LogOut, Plus, MapPin } from 'lucide-react'

interface TeamData {
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

const statusConfig = {
  pending:  { label: 'Aguardando aprovação', variant: 'orange' as const, icon: Clock },
  approved: { label: 'Aprovada',             variant: 'green'  as const, icon: CheckCircle2 },
  rejected: { label: 'Rejeitada',            variant: 'red'    as const, icon: AlertCircle },
}

export default function PainelPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, token } = useAuth()
  const [teams, setTeams] = useState<TeamData[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/auth/login')
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    if (!token) return
    fetch('/api/teams', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setTeams(Array.isArray(data) ? data : []); setFetching(false) })
      .catch(() => setFetching(false))
  }, [token])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user.role === 'admin') { router.push('/admin'); return null }

  return (
    <Layout>
      <Head><title>Meu Painel · 29ª Taça Luigi Patriarcha</title></Head>

      {/* Header */}
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
          {/* Equipes */}
          <div className="lg:col-span-2 space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-gold-400" />
                Minhas Equipes
                {teams.length > 0 && <span className="text-sm font-normal text-white/40">({teams.length})</span>}
              </h2>
              <Link href="/inscricao" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm hover:opacity-90 transition-all">
                <Plus size={15} />Inscrever equipe
              </Link>
            </div>

            {fetching ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : teams.length === 0 ? (
              <AnimatedSection>
                <div className="glass-card rounded-2xl p-8 border border-gold-500/15 text-center">
                  <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-white/20" />
                  </div>
                  <p className="text-white/50 mb-5 text-sm">Você ainda não inscreveu nenhuma equipe.</p>
                  <Link href="/inscricao" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm">
                    <Plus size={16} />Inscrever equipe agora
                  </Link>
                </div>
              </AnimatedSection>
            ) : (
              teams.map((team, i) => (
                <AnimatedSection key={team.id} delay={i * 80}>
                  <div className="glass-card rounded-2xl p-6 border border-gold-500/15">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 font-black text-base">
                          {team.team_name[0]}
                        </div>
                        <div>
                          <p className="text-white font-bold">{team.team_name}</p>
                          <p className="text-white/40 text-xs flex items-center gap-1">
                            <MapPin size={10} />{team.city}{team.state ? ` · ${team.state}` : ''}
                          </p>
                        </div>
                      </div>
                      <Badge variant={statusConfig[team.status].variant}>
                        {statusConfig[team.status].label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/40 text-xs">Categoria</span>
                        <span className="text-white">{CATEGORIES.find(c => c.value === team.category)?.label ?? team.category}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/40 text-xs">Responsável</span>
                        <span className="text-white">{team.responsible}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/40 text-xs">Telefone</span>
                        <span className="text-white">{team.phone}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/40 text-xs">Inscrito em</span>
                        <span className="text-white">{new Date(team.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    {team.players.length > 0 && (
                      <div className="border-t border-gold-500/10 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/50 text-xs font-medium uppercase tracking-wide">Atletas</span>
                          <Badge variant="blue" size="sm">{team.players.length}</Badge>
                        </div>
                        <div className="space-y-1.5">
                          {team.players.map((p, j) => (
                            <div key={j} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-navy-800/50 border border-gold-500/5">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 text-xs font-bold">{p.number}</span>
                                <span className="text-white text-sm">{p.name || <span className="text-white/30 italic">Sem nome</span>}</span>
                              </div>
                              <span className="text-white/40 text-xs">{POSITION_LABELS[p.position] ?? p.position}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>

          {/* Sidebar — Perfil */}
          <div className="space-y-4">
            <AnimatedSection direction="right">
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
