import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockStandings, mockScorers } from '@/data/mock'
import { TrendingUp, Target, Award, Shield } from 'lucide-react'

const tabs = ['Classificação', 'Artilheiros', 'Melhor Defesa']

function posColor(pos: number) {
  if (pos === 1) return 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
  if (pos === 2) return 'bg-blue-500/15 text-blue-400'
  if (pos === 3) return 'bg-orange-500/15 text-orange-400'
  return 'bg-transparent text-white/30'
}

export default function ClassificacaoPage() {
  const [tab, setTab] = useState(0)
  const [group, setGroup] = useState<'A' | 'B'>('A')

  const standings = mockStandings.filter(s => s.group === group)

  return (
    <Layout>
      <Head>
        <title>Classificação · 29ª Taça Luigi Patriarcha</title>
      </Head>

      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-black text-white mb-3"><span className="gold-text">Classificação</span> Geral</h1>
            <p className="text-white/40 flex items-center justify-center gap-1">
              <TrendingUp size={14} /> Atualizada em tempo real após cada rodada
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Tabs */}
        <div className="flex gap-1 glass-card rounded-xl p-1 mb-8 w-fit mx-auto">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === i ? 'bg-gold-gradient text-navy-900' : 'text-white/50 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Classificação */}
        {tab === 0 && (
          <AnimatedSection>
            {/* Group tabs */}
            <div className="flex gap-2 mb-6">
              {(['A', 'B'] as const).map(g => (
                <button key={g} onClick={() => setGroup(g)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${group === g ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass-card text-white/50 hover:text-white'}`}>
                  Grupo {g}
                </button>
              ))}
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="championship-table">
                  <thead>
                    <tr>
                      <th className="w-10">#</th>
                      <th>Equipe</th>
                      <th className="text-center">PTS</th>
                      <th className="text-center hidden sm:table-cell">J</th>
                      <th className="text-center hidden sm:table-cell">V</th>
                      <th className="text-center hidden sm:table-cell">E</th>
                      <th className="text-center hidden sm:table-cell">D</th>
                      <th className="text-center hidden md:table-cell">GP</th>
                      <th className="text-center hidden md:table-cell">GC</th>
                      <th className="text-center">SG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s) => (
                      <tr key={s.team.id} className={s.position <= 2 ? 'bg-gold-500/5' : ''}>
                        <td>
                          <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-bold ${posColor(s.position)}`}>{s.position}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center text-white/60 text-xs font-bold flex-shrink-0">{s.team.name[0]}</div>
                            <div>
                              <p className="text-white font-semibold text-sm">{s.team.name}</p>
                              <p className="text-white/30 text-xs">{s.team.city}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-gold-400 font-black text-base">{s.points}</td>
                        <td className="text-center text-white/50 text-sm hidden sm:table-cell">{s.played}</td>
                        <td className="text-center text-green-400 text-sm hidden sm:table-cell">{s.won}</td>
                        <td className="text-center text-yellow-400 text-sm hidden sm:table-cell">{s.drawn}</td>
                        <td className="text-center text-red-400 text-sm hidden sm:table-cell">{s.lost}</td>
                        <td className="text-center text-white/50 text-sm hidden md:table-cell">{s.goalsFor}</td>
                        <td className="text-center text-white/50 text-sm hidden md:table-cell">{s.goalsAgainst}</td>
                        <td className={`text-center text-sm font-semibold ${s.goalDiff > 0 ? 'text-green-400' : s.goalDiff < 0 ? 'text-red-400' : 'text-white/40'}`}>
                          {s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gold-500/10 flex flex-wrap gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gold-500/20 border border-gold-500/40 rounded-sm" />Classificado para Quartas</span>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Artilheiros */}
        {tab === 1 && (
          <AnimatedSection>
            <div className="space-y-3">
              {mockScorers.map((scorer, i) => (
                <div key={scorer.player.id} className={`glass-card rounded-2xl p-4 flex items-center gap-4 border ${i === 0 ? 'border-gold-500/30 gold-glow' : 'border-transparent'}`}>
                  <div className={`w-8 text-center font-black text-xl ${i === 0 ? 'text-gold-400' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-400' : 'text-white/30'}`}>
                    {i < 3 ? <Award size={22} className="mx-auto" /> : i + 1}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${i === 0 ? 'bg-gold-gradient text-navy-900' : 'bg-navy-700 text-white/60'}`}>
                    {scorer.player.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">{scorer.player.name}</p>
                    <p className="text-white/40 text-xs">{scorer.team.name} · #{scorer.player.number}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-28 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-gradient" style={{ width: `${(scorer.goals / mockScorers[0].goals) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Target size={14} className="text-gold-500" />
                    <span className={`font-black text-2xl tabular-nums ${i === 0 ? 'gold-text' : 'text-white'}`}>{scorer.goals}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Melhor Defesa */}
        {tab === 2 && (
          <AnimatedSection>
            <div className="space-y-3">
              {mockStandings.sort((a, b) => a.goalsAgainst - b.goalsAgainst).map((s, i) => (
                <div key={s.team.id} className={`glass-card rounded-2xl p-4 flex items-center gap-4 border ${i === 0 ? 'border-gold-500/30' : 'border-transparent'}`}>
                  <span className={`w-8 text-center font-black text-lg ${i === 0 ? 'text-gold-400' : 'text-white/30'}`}>{i + 1}</span>
                  <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white/60 font-bold text-sm flex-shrink-0">{s.team.name[0]}</div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{s.team.name}</p>
                    <p className="text-white/40 text-xs">{s.played} jogos · Grupo {s.group}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Shield size={14} className="text-blue-400" />
                      <span className="text-blue-400 font-black text-xl tabular-nums">{s.goalsAgainst}</span>
                    </div>
                    <p className="text-white/30 text-xs">gols sofridos</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </Layout>
  )
}
