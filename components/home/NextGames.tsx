import Link from 'next/link'
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockMatches } from '@/data/mock'

export default function NextGames() {
  const upcoming = mockMatches.filter(m => m.status === 'scheduled').slice(0, 4)
  const finished = mockMatches.filter(m => m.status === 'finished').slice(0, 2)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-line mb-3" />
              <h2 className="text-3xl md:text-4xl font-black text-white">Próximos <span className="gold-text">Jogos</span></h2>
              <p className="text-white/40 mt-1 text-sm">Confira a programação dos próximos jogos</p>
            </div>
            <Link href="/jogos" className="hidden sm:flex items-center gap-1 text-gold-400 text-sm font-medium hover:gap-2 transition-all">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming */}
          <div className="space-y-3">
            <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">Programados</h3>
            {upcoming.map((match, i) => (
              <AnimatedSection key={match.id} delay={i * 60} direction="left">
                <div className="glass-card rounded-2xl p-4 card-hover border border-transparent hover:border-gold-500/15">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="blue">{match.phase === 'grupo' ? `Grupo ${match.group}` : match.phase}</Badge>
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Calendar size={11} />{new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{match.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-right">
                      <p className="font-bold text-white text-sm leading-tight">{match.homeTeam.name}</p>
                      <p className="text-white/40 text-xs">{match.homeTeam.city}</p>
                    </div>
                    <div className="flex-shrink-0 px-3 py-2 glass-card rounded-xl text-center min-w-[52px]">
                      <span className="text-gold-400 font-black text-sm">VS</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-white text-sm leading-tight">{match.awayTeam.name}</p>
                      <p className="text-white/40 text-xs">{match.awayTeam.city}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-white/30 text-xs">
                    <MapPin size={10} />{match.venue}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-3">
            <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">Últimos Resultados</h3>
            {finished.map((match, i) => (
              <AnimatedSection key={match.id} delay={i * 60} direction="right">
                <div className="glass-card rounded-2xl p-4 border border-transparent hover:border-gold-500/15 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="green">Encerrado</Badge>
                    <span className="text-white/40 text-xs">{new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-right">
                      <p className={`font-bold text-sm ${(match.homeScore ?? 0) > (match.awayScore ?? 0) ? 'text-white' : 'text-white/50'}`}>{match.homeTeam.name}</p>
                    </div>
                    <div className="flex-shrink-0 px-3 py-2 bg-navy-700 rounded-xl text-center min-w-[60px]">
                      <span className="text-gold-400 font-black text-lg tabular-nums">{match.homeScore} – {match.awayScore}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-bold text-sm ${(match.awayScore ?? 0) > (match.homeScore ?? 0) ? 'text-white' : 'text-white/50'}`}>{match.awayTeam.name}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* CTA */}
            <AnimatedSection delay={180}>
              <Link href="/jogos" className="block glass-card rounded-2xl p-4 text-center text-gold-400 text-sm font-semibold hover:bg-gold-500/10 transition-all border border-gold-500/20 hover:border-gold-500/40">
                Ver todos os jogos e resultados →
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
