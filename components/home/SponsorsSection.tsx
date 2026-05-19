import AnimatedSection from '@/components/ui/AnimatedSection'
import { mockSponsors } from '@/data/mock'

const tierConfig = {
  master: { label: 'Patrocinador Master', cols: 'grid-cols-2', size: 'h-16' },
  ouro: { label: 'Patrocinador Ouro', cols: 'grid-cols-3', size: 'h-12' },
  prata: { label: 'Patrocinador Prata', cols: 'grid-cols-4', size: 'h-10' },
  apoio: { label: 'Apoio', cols: 'grid-cols-4 sm:grid-cols-6', size: 'h-8' },
}

export default function SponsorsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="section-line mx-auto mb-3" />
          <h2 className="text-3xl font-black text-white">Nossos <span className="gold-text">Patrocinadores</span></h2>
          <p className="text-white/40 mt-2 text-sm">Parceiros que tornam a competição possível</p>
        </AnimatedSection>

        {(Object.entries(tierConfig) as [keyof typeof tierConfig, typeof tierConfig[keyof typeof tierConfig]][]).map(([tier, config]) => {
          const sponsors = mockSponsors.filter(s => s.tier === tier)
          if (!sponsors.length) return null
          return (
            <AnimatedSection key={tier} className="mb-10">
              <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-5">{config.label}</p>
              <div className={`grid ${config.cols} gap-4 max-w-3xl mx-auto`}>
                {sponsors.map(sponsor => (
                  <div
                    key={sponsor.id}
                    className="glass-card rounded-xl flex items-center justify-center p-4 border border-gold-500/10 hover:border-gold-500/30 transition-all card-hover"
                  >
                    <span className={`text-white/40 font-semibold text-center text-xs sm:text-sm leading-tight ${config.size}`} style={{ display: 'flex', alignItems: 'center' }}>
                      {sponsor.name}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </section>
  )
}
