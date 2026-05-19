import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { Clock, Search } from 'lucide-react'
import { mockNews } from '@/data/mock'

const categories = ['Todas', 'Notícias', 'Resultados', 'Comunicados', 'Classificação']
const catMap: Record<string, string> = { 'Notícias': 'noticias', 'Resultados': 'resultados', 'Comunicados': 'comunicados', 'Classificação': 'classificacao' }
const badgeVariant: Record<string, any> = { noticias: 'blue', resultados: 'green', comunicados: 'gold', classificacao: 'orange' }
const badgeLabel: Record<string, string> = { noticias: 'Notícias', resultados: 'Resultados', comunicados: 'Comunicado', classificacao: 'Classificação' }

export default function NoticiasPage() {
  const [cat, setCat] = useState('Todas')
  const [search, setSearch] = useState('')

  const filtered = mockNews.filter(n => {
    const catOk = cat === 'Todas' || n.category === catMap[cat]
    const searchOk = !search || n.title.toLowerCase().includes(search.toLowerCase())
    return catOk && searchOk
  })

  return (
    <Layout>
      <Head>
        <title>Notícias · 29ª Taça Luigi Patriarcha</title>
      </Head>

      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-black text-white mb-3">Últimas <span className="gold-text">Notícias</span></h1>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="form-input pl-9 text-sm"
              placeholder="Buscar notícias..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${cat === c ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass-card text-white/50 hover:text-white'}`}>{c}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">Nenhuma notícia encontrada.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((news, i) => (
              <AnimatedSection key={news.id} delay={i * 60}>
                <Link href={`/noticias/${news.slug}`} className="group block glass-card rounded-2xl overflow-hidden border border-transparent hover:border-gold-500/15 card-hover transition-all">
                  <div className="relative aspect-video bg-navy-700 overflow-hidden">
                    {news.image && <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={badgeVariant[news.category]}>{badgeLabel[news.category]}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white leading-tight mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-3">{news.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span>{news.author}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{new Date(news.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
