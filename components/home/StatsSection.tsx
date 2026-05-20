import { Users, Shield, Trophy, Zap } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const stats = [
  { icon: Users, value: '48', label: 'Equipes Inscritas', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Shield, value: '5', label: 'Categorias', color: 'text-gold-400', bg: 'bg-gold-500/10' },
  { icon: Zap, value: '120+', label: 'Jogos Programados', color: 'text-green-400', bg: 'bg-green-500/10' },
]

export default function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80} direction="up">
              <div className="glass-card rounded-2xl p-6 text-center card-hover gold-glow-hover border border-transparent hover:border-gold-500/20">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-white/50 text-sm font-medium">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
