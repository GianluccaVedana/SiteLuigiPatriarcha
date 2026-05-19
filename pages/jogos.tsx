import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { Calendar, Clock, MapPin, Filter, User } from 'lucide-react'
import { mockMatches } from '@/data/mock'
import { Match } from '@/types'

const phases = ['Todos', 'Grupo A', 'Grupo B', 'Quartas', 'Semi', 'Final']
const statuses = ['Todos', 'Programado', 'Encerrado', 'Ao Vivo']

function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === 'finished'
  const isLive = match.status === 'live'
  const homeWon = isFinished && (match.homeScore ?? 0) > (match.awayScore ?? 0)
  const awayWon = isFinished && (match.awayScore ?? 0) > (match.homeScore ?? 0)

  return (
    <div className={`glass-card rounded-2xl p-5 border transition-all card-hover ${isLive ? 'border-red-500/40' : 'border-transparent hover:border-gold-500/15'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isLive && <Badge variant="red" pulse>Ao Vivo</Badge>}
          {isFinished && <Badge variant="green">Encerrado</Badge>}
          {!isFinished && !isLive && <Badge variant="default">Programado</Badge>}
          <Badge variant="blue">{match.phase === 'grupo' ? `Grupo ${match.group}` : match.phase}</Badge>
        </div>
        <div className="flex items-center gap-3 text-white/40 text-xs">
          <span className="flex items-center gap-1"><Calendar size={11} />{new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{match.time}</span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center gap-4">
        {/* Home */}
        <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-end gap-3">
          <div className="text-right">
            <p className={`font-bold text-base ${homeWon ? 'text-white' : 'text-white/70'}`}>{match.homeTeam.name}</p>
            <p className="text-white/30 text-xs">{match.homeTeam.city}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white/50 font-bold text-sm flex-shrink-0">
            {match.homeTeam.name[0]}
          </div>
        </div>

        {/* Score / VS */}
        <div className="flex-shrink-0 min-w-[72px] text-center">
          {isFinished || isLive ? (
            <div className="bg-navy-700 rounded-xl px-3 py-2">
              <span className={`font-black text-xl tabular-nums ${homeWon ? 'text-white' : 'text-white/60'}`}>{match.homeScore}</span>
              <span className="text-gold-500 font-black text-xl mx-1">–</span>
              <span className={`font-black text-xl tabular-nums ${awayWon ? 'text-white' : 'text-white/60'}`}>{match.awayScore}</span>
            </div>
          ) : (
            <span className="text-gold-400 font-black text-lg">VS</span>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white/50 font-bold text-sm flex-shrink-0">
            {match.awayTeam.name[0]}
          </div>
          <div className="text-left">
            <p className={`font-bold text-base ${awayWon ? 'text-white' : 'text-white/70'}`}>{match.awayTeam.name}</p>
            <p className="text-white/30 text-xs">{match.awayTeam.city}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gold-500/10 flex flex-wrap items-center justify-between gap-2 text-xs text-white/30">
        <span className="flex items-center gap-1"><MapPin size={10} />{match.venue}</span>
        {match.referee && <span className="flex items-center gap-1"><User size={10} />Árb: {match.referee}</span>}
      </div>
    </div>
  )
}

export default function JogosPage() {
  const [phaseFilter, setPhaseFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')

  const filtered = mockMatches.filter(m => {
    const phaseOk = phaseFilter === 'Todos' || (m.phase === 'grupo' && phaseFilter.includes('Grupo') && m.group === phaseFilter.split(' ')[1]) || m.phase === phaseFilter.toLowerCase()
    const statusOk = statusFilter === 'Todos' ||
      (statusFilter === 'Programado' && m.status === 'scheduled') ||
      (statusFilter === 'Encerrado' && m.status === 'finished') ||
      (statusFilter === 'Ao Vivo' && m.status === 'live')
    return phaseOk && statusOk
  })

  return (
    <Layout>
      <Head>
        <title>Jogos e Resultados · 29ª Taça Luigi Patriarcha</title>
      </Head>

      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-black text-white mb-3">Jogos & <span className="gold-text">Resultados</span></h1>
            <p className="text-white/40">Acompanhe a programação e os resultados de todos os jogos</p>
          </AnimatedSection>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-navy-900/95 backdrop-blur-md border-b border-gold-500/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2 items-center">
          <Filter size={14} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-1.5">
            {phases.map(p => (
              <button key={p} onClick={() => setPhaseFilter(p)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${phaseFilter === p ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                {p}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-gold-500/20 hidden sm:block" />
          <div className="flex flex-wrap gap-1.5">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Matches */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/30">Nenhum jogo encontrado com os filtros selecionados.</div>
          ) : filtered.map((match, i) => (
            <AnimatedSection key={match.id} delay={i * 50}>
              <MatchCard match={match} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Layout>
  )
}
