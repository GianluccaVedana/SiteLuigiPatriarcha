import Link from 'next/link'
import { Award, ChevronRight, Target } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockScorers } from '@/data/mock'

export default function TopScorers() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-line mb-3" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Artilheiros <span className="gold-text">da Taça</span>
              </h2>
              <p className="text-white/40 mt-1 text-sm">Categoria Adulto · Fase de Grupos</p>
            </div>
            <Link href="/classificacao#artilheiros" className="hidden sm:flex items-center gap-1 text-gold-400 text-sm font-medium hover:gap-2 transition-all">
              Ver mais <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {mockScorers.map((scorer, i) => (
            <AnimatedSection key={scorer.player.id} delay={i * 60}>
              <div className={`glass-card rounded-2xl p-4 flex items-center gap-4 card-hover border ${i === 0 ? 'border-gold-500/30' : 'border-transparent hover:border-gold-500/10'}`}>
                {/* Position */}
                <div className={`w-8 text-center font-black text-lg ${i === 0 ? 'text-gold-400' : i === 1 ? 'text-blue-400' : i === 2 ? 'text-orange-400' : 'text-white/30'}`}>
                  {i === 0 ? <Award size={22} className="text-gold-400 mx-auto" /> : i + 1}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  i === 0 ? 'bg-gold-gradient text-navy-900' : 'bg-navy-700 text-white/70'
                }`}>
                  {scorer.player.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm leading-tight truncate">{scorer.player.name}</p>
                  <p className="text-white/40 text-xs">{scorer.team.name} · #{scorer.player.number} · {scorer.player.position}</p>
                </div>

                {/* Goals bar */}
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <div className="w-24 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                      style={{ width: `${(scorer.goals / mockScorers[0].goals) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Goals count */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Target size={13} className="text-gold-500" />
                  <span className={`font-black text-lg tabular-nums ${i === 0 ? 'text-gold-400' : 'text-white'}`}>{scorer.goals}</span>
                  <span className="text-white/30 text-xs">gols</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
