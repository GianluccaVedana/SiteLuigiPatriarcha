import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { CATEGORIES } from '@/data/mock'
import { Users, LogOut, Home, Menu, X, Pencil, Check, ChevronDown, ChevronUp, Trash2, Download, Plus } from 'lucide-react'

interface Player { name: string; rg: string; birthDate: string }

interface Team {
  id: number
  team_name: string
  city: string
  state: string
  category: string
  responsible: string
  phone: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  logo_url?: string
  created_at: string
  user_name?: string
  players: { id: number; name: string; rg: string; birth_date: string }[]
}

function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-navy-950 flex">
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
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className="admin-nav-item active">
            <Users size={18} /><span className="text-sm">Equipes Inscritas</span>
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
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white"><Menu size={22} /></button>
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

const statusConfig = {
  pending:  { label: 'Pendente',  color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  approved: { label: 'Aprovada',  color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  rejected: { label: 'Rejeitada', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, token } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [fetching, setFetching] = useState(true)
  const [filters, setFilters] = useState({ status: '', category: '', city: '', responsible: '' })
  const [editing, setEditing] = useState<Team | null>(null)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editingPlayers, setEditingPlayers] = useState<{ team: Team; players: Player[] } | null>(null)
  const [savingPlayers, setSavingPlayers] = useState(false)

  const openPlayersEdit = (team: Team) =>
    setEditingPlayers({ team, players: team.players.map(p => ({ name: p.name, rg: p.rg || '', birthDate: p.birth_date || '' })) })

  const setPlayer = (i: number, k: keyof Player, v: string) =>
    setEditingPlayers(ep => ep && ({ ...ep, players: ep.players.map((p, idx) => idx === i ? { ...p, [k]: v } : p) }))

  const addPlayer = () =>
    setEditingPlayers(ep => ep && ({ ...ep, players: [...ep.players, { name: '', rg: '', birthDate: '' }] }))

  const removePlayer = (i: number) =>
    setEditingPlayers(ep => ep && ({ ...ep, players: ep.players.filter((_, idx) => idx !== i) }))

  const savePlayers = async () => {
    if (!editingPlayers) return
    setSavingPlayers(true)
    const res = await fetch(`/api/teams/${editingPlayers.team.id}/players`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ players: editingPlayers.players }),
    })
    if (res.ok) {
      const updated = await res.json()
      setTeams(ts => ts.map(t => t.id === editingPlayers.team.id ? { ...t, players: updated } : t))
      setEditingPlayers(null)
    }
    setSavingPlayers(false)
  }

  const deleteTeam = async (id: number, name: string) => {
    if (!confirm(`Excluir a equipe "${name}"? Esta ação não pode ser desfeita.`)) return
    setDeletingId(id)
    const res = await fetch(`/api/teams/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok || res.status === 204) setTeams(ts => ts.filter(t => t.id !== id))
    setDeletingId(null)
  }

  const toggleExpand = (id: number) =>
    setExpanded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) router.push('/auth/login')
  }, [isLoading, isAuthenticated, user])

  useEffect(() => {
    if (!token) return
    fetch('/api/teams', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setTeams(Array.isArray(data) ? data : []); setFetching(false) })
      .catch(() => setFetching(false))
  }, [token])

  const setFilter = (k: keyof typeof filters, v: string) => setFilters(f => ({ ...f, [k]: v }))

  const filteredTeams = teams.filter(t =>
    (!filters.status   || t.status === filters.status) &&
    (!filters.category || t.category === filters.category) &&
    (!filters.city     || t.city.toLowerCase().includes(filters.city.toLowerCase())) &&
    (!filters.responsible || t.responsible.toLowerCase().includes(filters.responsible.toLowerCase()))
  )

  const saveEdit = async () => {
    if (!editing) return
    setSaving(true)
    const res = await fetch(`/api/teams/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        teamName: editing.team_name,
        city: editing.city,
        state: editing.state,
        category: editing.category,
        responsible: editing.responsible,
        phone: editing.phone,
        email: editing.email,
        status: editing.status,
      }),
    })
    if (res.ok) {
      const updated = await res.json()
      setTeams(ts => ts.map(t => t.id === updated.id ? { ...t, ...updated } : t))
      setEditing(null)
    }
    setSaving(false)
  }

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
            <Users size={18} className="text-gold-400" />Equipes Inscritas
          </h2>
          <span className="text-white/40 text-sm">
            {filteredTeams.length}{filteredTeams.length !== teams.length ? ` de ${teams.length}` : ''} equipe{teams.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Filtros */}
        <div className="px-5 py-3 border-b border-gold-500/10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <select value={filters.status} onChange={e => setFilter('status', e.target.value)} className="form-input text-sm py-2">
            <option value="">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovada</option>
            <option value="rejected">Rejeitada</option>
          </select>
          <select value={filters.category} onChange={e => setFilter('category', e.target.value)} className="form-input text-sm py-2">
            <option value="">Todas as categorias</option>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <input
            value={filters.city}
            onChange={e => setFilter('city', e.target.value)}
            className="form-input text-sm py-2"
            placeholder="Filtrar por cidade..."
          />
          <input
            value={filters.responsible}
            onChange={e => setFilter('responsible', e.target.value)}
            className="form-input text-sm py-2"
            placeholder="Filtrar por responsável..."
          />
        </div>

        {fetching ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>{teams.length === 0 ? 'Nenhuma equipe inscrita ainda.' : 'Nenhuma equipe encontrada com esses filtros.'}</p>
          </div>
        ) : (
          <div className="divide-y divide-gold-500/10">
            {filteredTeams.map(team => (
              <div key={team.id} className="transition-all">
                {/* Linha da equipe */}
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-white/2">
                  {team.logo_url ? (
                    <img src={team.logo_url} alt="Logo" className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-navy-700 border border-gold-500/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white/60 font-bold text-sm flex-shrink-0">
                      {team.team_name[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{team.team_name}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {team.city} · {CATEGORIES.find(c => c.value === team.category)?.label || team.category} · {team.responsible} · {team.phone}
                    </p>
                    <p className="text-white/30 text-xs">{team.email} · {new Date(team.created_at).toLocaleDateString('pt-BR')}{team.user_name ? ` · ${team.user_name}` : ''}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex-shrink-0 ${statusConfig[team.status].color}`}>
                    {statusConfig[team.status].label}
                  </span>
                  {team.logo_url && (
                    <a
                      href={team.logo_url}
                      download={`logo-${team.team_name}.jpg`}
                      className="p-2 rounded-lg glass-card text-white/40 hover:text-green-400 transition-all border border-transparent hover:border-green-500/20"
                      title="Baixar logo"
                    >
                      <Download size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => toggleExpand(team.id)}
                    className="p-2 rounded-lg glass-card text-white/40 hover:text-blue-400 transition-all border border-transparent hover:border-blue-500/20"
                    title="Ver atletas"
                  >
                    {expanded.has(team.id) ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  <button
                    onClick={() => setEditing({ ...team })}
                    className="p-2 rounded-lg glass-card text-white/40 hover:text-gold-400 transition-all border border-transparent hover:border-gold-500/20"
                    title="Editar"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteTeam(team.id, team.team_name)}
                    disabled={deletingId === team.id}
                    className="p-2 rounded-lg glass-card text-white/40 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20 disabled:opacity-40"
                    title="Excluir"
                  >
                    {deletingId === team.id
                      ? <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
                      : <Trash2 size={15} />}
                  </button>
                </div>

                {/* Atletas expandidos */}
                {expanded.has(team.id) && (
                  <div className="px-5 pb-4 border-t border-gold-500/5 bg-navy-900/30">
                    <div className="flex items-center justify-between pt-3 mb-2">
                      <p className="text-white/40 text-xs uppercase tracking-wider font-medium">
                        Atletas ({team.players.length})
                      </p>
                      <button
                        onClick={() => openPlayersEdit(team)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg glass-card text-gold-400 text-xs font-semibold border border-gold-500/20 hover:bg-gold-500/10 transition-all"
                      >
                        <Pencil size={11} />Editar atletas
                      </button>
                    </div>
                    {team.players.length === 0 ? (
                      <p className="text-white/20 text-xs py-2">Nenhum atleta cadastrado.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {team.players.map((p, j) => (
                          <div key={j} className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy-800/60 border border-gold-500/5 text-sm">
                            <span className="text-white font-medium">{p.name}</span>
                            <div className="flex gap-4 text-white/40 text-xs">
                              {p.rg && <span>RG: {p.rg}</span>}
                              {p.birth_date && <span>{new Date(p.birth_date).toLocaleDateString('pt-BR')}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edição */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="glass-card rounded-2xl border border-gold-500/20 w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Editar Equipe</h3>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Nome da equipe</label>
                <input value={editing.team_name} onChange={e => setEditing(ed => ed && ({ ...ed, team_name: e.target.value }))} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Cidade</label>
                  <input value={editing.city} onChange={e => setEditing(ed => ed && ({ ...ed, city: e.target.value }))} className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Categoria</label>
                  <select value={editing.category} onChange={e => setEditing(ed => ed && ({ ...ed, category: e.target.value }))} className="form-input">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Responsável</label>
                <input value={editing.responsible} onChange={e => setEditing(ed => ed && ({ ...ed, responsible: e.target.value }))} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Telefone</label>
                  <input value={editing.phone} onChange={e => setEditing(ed => ed && ({ ...ed, phone: e.target.value }))} className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">E-mail</label>
                  <input value={editing.email} onChange={e => setEditing(ed => ed && ({ ...ed, email: e.target.value }))} className="form-input" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Status</label>
                <select value={editing.status} onChange={e => setEditing(ed => ed && ({ ...ed, status: e.target.value as any }))} className="form-input">
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovada</option>
                  <option value="rejected">Rejeitada</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl glass-card text-white/60 hover:text-white text-sm font-semibold border border-white/10 transition-all">
                Cancelar
              </button>
              <button onClick={saveEdit} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : <><Check size={16} />Salvar</>}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal edição de atletas */}
      {editingPlayers && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditingPlayers(null)}>
          <div className="glass-card rounded-2xl border border-gold-500/20 w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold-500/10">
              <h3 className="text-white font-bold">Atletas — {editingPlayers.team.team_name}</h3>
              <button onClick={() => setEditingPlayers(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {editingPlayers.players.map((p, i) => (
                <div key={i} className="glass-card rounded-xl p-3 border border-gold-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gold-400 text-xs font-bold">Atleta #{i + 1}</span>
                    {editingPlayers.players.length > 1 && (
                      <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <input value={p.name} onChange={e => setPlayer(i, 'name', e.target.value)} className="form-input text-sm" placeholder="Nome completo" />
                    </div>
                    <input value={p.rg} onChange={e => setPlayer(i, 'rg', e.target.value)} className="form-input text-sm" placeholder="RG" />
                    <input value={p.birthDate} onChange={e => setPlayer(i, 'birthDate', e.target.value)} className="form-input text-sm" type="date" />
                  </div>
                </div>
              ))}
              {editingPlayers.players.length < 15 && (
                <button onClick={addPlayer} className="w-full py-2.5 rounded-xl glass-card border border-dashed border-gold-500/20 text-gold-400 text-sm font-semibold hover:border-gold-500/40 hover:bg-gold-500/5 transition-all flex items-center justify-center gap-2">
                  <Plus size={15} />Adicionar atleta
                </button>
              )}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gold-500/10">
              <button onClick={() => setEditingPlayers(null)} className="flex-1 py-2.5 rounded-xl glass-card text-white/60 hover:text-white text-sm font-semibold border border-white/10 transition-all">
                Cancelar
              </button>
              <button onClick={savePlayers} disabled={savingPlayers} className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {savingPlayers ? <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : <><Check size={15} />Salvar</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
