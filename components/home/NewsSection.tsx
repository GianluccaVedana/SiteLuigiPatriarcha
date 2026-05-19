import Link from 'next/link'
import { ChevronRight, Clock } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockNews } from '@/data/mock'

const categoryLabel: Record<string, { label: string; variant: any }> = {
  noticias: { label: 'Notícias', variant: 'blue' },
  resultados: { label: 'Resultados', variant: 'green' },
  comunicados: { label: 'Comunicado', variant: 'gold' },
  classificacao: { label: 'Classificação', variant: 'orange' },
}

export default function NewsSection() {
  const [featured, ...rest] = mockNews

  return (
    <section className="py-20 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-line mb-3" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Últimas <span className="gold-text">Notícias</span>
              </h2>
            </div>
            <Link href="/noticias" className="hidden sm:flex items-center gap-1 text-gold-400 text-sm font-medium hover:gap-2 transition-all">
              Ver todas <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            <Link href={`/noticias/${featured.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-navy-700 mb-4">
                {featured.image && (
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge variant={categoryLabel[featured.category]?.variant}>{categoryLabel[featured.category]?.label}</Badge>
                </div>
              </div>
              <h3 className="text-white font-bold text-xl leading-tight group-hover:text-gold-400 transition-colors mb-2">{featured.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-3">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Clock size={12} />
                {new Date(featured.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </Link>
          </AnimatedSection>

          {/* List */}
          <AnimatedSection className="lg:col-span-2 space-y-4" direction="right">
            {rest.map((news, i) => (
              <Link key={news.id} href={`/noticias/${news.slug}`} className="group flex gap-3 glass-card rounded-xl p-3 hover:border-gold-500/15 border border-transparent transition-all card-hover">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-navy-700 flex-shrink-0">
                  {news.image && <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />}
                </div>
                <div className="min-w-0 flex-1">
                  <Badge variant={categoryLabel[news.category]?.variant} className="mb-1">{categoryLabel[news.category]?.label}</Badge>
                  <p className="text-white text-sm font-semibold leading-tight group-hover:text-gold-400 transition-colors line-clamp-2">{news.title}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {new Date(news.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
