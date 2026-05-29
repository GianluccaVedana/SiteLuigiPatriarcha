import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockSponsors } from '@/data/mock'

export default function SponsorsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="section-line mx-auto mb-3" />
          <h2 className="text-3xl font-black text-white">Nossos <span className="gold-text">Patrocinadores</span></h2>
          <p className="text-white/40 mt-2 text-sm">Parceiros que tornam a competição possível</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex justify-center">
            {mockSponsors.map(sponsor => (
              <div
                key={sponsor.id}
                className="glass-card rounded-xl flex items-center justify-center px-10 py-6 border border-gold-500/20 hover:border-gold-500/40 transition-all card-hover"
              >
                <span className="text-white/60 font-semibold text-center text-base leading-tight">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
