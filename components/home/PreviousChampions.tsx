import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockChampions } from '@/data/mock'
import { Trophy, Target } from 'lucide-react'

export default function PreviousChampions() {
  return (
    <section className="py-20 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="section-line mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Campeões <span className="gold-text">Anteriores</span>
          </h2>
          <p className="text-white/40 mt-2 text-sm">A história dos maiores campeões da Taça Luigi Patriarcha</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mockChampions.map((c, i) => (
            <AnimatedSection key={c.edition} delay={i * 80}>
              <div className={`glass-card rounded-2xl p-5 text-center border card-hover ${i === 0 ? 'border-gold-500/40 gold-glow' : 'border-transparent hover:border-gold-500/15'}`}>
                {i === 0 && (
                  <div className="text-xs text-gold-400 uppercase tracking-widest font-semibold mb-2">Último Campeão</div>
                )}
                <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-lg ${i === 0 ? 'bg-gold-gradient text-navy-900' : 'bg-navy-700 text-gold-500'}`}>
                  <Trophy size={i === 0 ? 24 : 20} />
                </div>
                <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">{c.year} · {c.edition}ª Ed.</div>
                <p className="text-white font-bold text-sm leading-tight mb-2">{c.champion}</p>
                <p className="text-white/30 text-xs mb-2">Vice: {c.runnerUp}</p>
                <div className="flex items-center justify-center gap-1 text-white/40 text-xs">
                  <Target size={10} className="text-gold-500" />
                  <span>{c.topScorer} ({c.topScorerGoals} gols)</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
