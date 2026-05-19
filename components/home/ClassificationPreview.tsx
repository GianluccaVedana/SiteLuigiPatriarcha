import Link from 'next/link'
import { ChevronRight, TrendingUp } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockStandings } from '@/data/mock'

function positionColor(pos: number) {
  if (pos === 1) return 'text-gold-400 font-black'
  if (pos === 2) return 'text-blue-400 font-bold'
  if (pos === 3) return 'text-orange-400 font-bold'
  return 'text-white/40'
}

export default function ClassificationPreview() {
  const groupA = mockStandings.filter(s => s.group === 'A')
  const groupB = mockStandings.filter(s => s.group === 'B')

  const GroupTable = ({ standings, group }: { standings: typeof mockStandings; group: string }) => (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400 font-black text-xs">{group}</div>
        <span className="text-white/50 text-xs uppercase tracking-widest">Grupo {group}</span>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="championship-table">
          <thead>
            <tr>
              <th className="w-8">#</th>
              <th>Equipe</th>
              <th className="text-center w-10">P</th>
              <th className="text-center w-10 hidden sm:table-cell">J</th>
              <th className="text-center w-10 hidden sm:table-cell">V</th>
              <th className="text-center w-10 hidden sm:table-cell">SG</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s) => (
              <tr key={s.team.id}>
                <td className={`text-center text-sm ${positionColor(s.position)}`}>{s.position}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy-600 flex items-center justify-center text-white/50 text-xs font-bold flex-shrink-0">
                      {s.team.name[0]}
                    </div>
                    <span className="text-white text-sm font-medium truncate max-w-[120px]">{s.team.name}</span>
                  </div>
                </td>
                <td className="text-center text-gold-400 font-bold text-sm">{s.points}</td>
                <td className="text-center text-white/50 text-sm hidden sm:table-cell">{s.played}</td>
                <td className="text-center text-white/50 text-sm hidden sm:table-cell">{s.won}</td>
                <td className={`text-center text-sm hidden sm:table-cell ${s.goalDiff > 0 ? 'text-green-400' : s.goalDiff < 0 ? 'text-red-400' : 'text-white/40'}`}>
                  {s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-line mb-3" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                <span className="gold-text">Classificação</span>
              </h2>
              <p className="text-white/40 mt-1 text-sm flex items-center gap-1">
                <TrendingUp size={13} /> Atualizada após última rodada
              </p>
            </div>
            <Link href="/classificacao" className="hidden sm:flex items-center gap-1 text-gold-400 text-sm font-medium hover:gap-2 transition-all">
              Completa <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedSection delay={100} direction="left"><GroupTable standings={groupA} group="A" /></AnimatedSection>
          <AnimatedSection delay={200} direction="right"><GroupTable standings={groupB} group="B" /></AnimatedSection>
        </div>

        <AnimatedSection delay={300} className="mt-6">
          <div className="flex flex-wrap gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gold-500/20 border border-gold-500/40" /> Classificado</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/40" /> Eliminado</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
