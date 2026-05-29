import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockChampions } from '@/data/mock'
import { Trophy } from 'lucide-react'

export default function PreviousChampions() {
  return (
    <section className="py-20 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="section-line mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Maiores <span className="gold-text">Campeões</span>
          </h2>
          <p className="text-white/40 mt-2 text-sm">A história dos maiores campeões da Taça Luigi Patriarcha</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mockChampions.map((c, i) => (
            <AnimatedSection key={c.edition} delay={i * 80}>
              <div className={`glass-card rounded-2xl p-5 text-center border card-hover ${i === 0 ? 'border-gold-500/40 gold-glow' : 'border-transparent hover:border-gold-500/15'}`}>
                <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-lg ${i === 0 ? 'bg-gold-gradient text-navy-900' : 'bg-navy-700 text-gold-500'}`}>
                  <Trophy size={i === 0 ? 24 : 20} />
                </div>
                <p className="text-white font-bold text-sm leading-tight">{c.champion}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
