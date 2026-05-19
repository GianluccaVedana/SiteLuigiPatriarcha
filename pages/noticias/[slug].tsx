import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { mockNews } from '@/data/mock'
import { News } from '@/types'
import { Clock, ArrowLeft, Share2 } from 'lucide-react'

const badgeVariant: Record<string, any> = { noticias: 'blue', resultados: 'green', comunicados: 'gold', classificacao: 'orange' }
const badgeLabel: Record<string, string> = { noticias: 'Notícias', resultados: 'Resultados', comunicados: 'Comunicado', classificacao: 'Classificação' }

interface Props { news: News; related: News[] }

export default function NoticiaPage({ news, related }: Props) {
  return (
    <Layout>
      <Head>
        <title>{news.title} · 29ª Taça Luigi Patriarcha</title>
        <meta name="description" content={news.excerpt} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back */}
        <AnimatedSection direction="fade">
          <Link href="/noticias" className="inline-flex items-center gap-1.5 text-white/40 hover:text-gold-400 text-sm transition-colors mb-8">
            <ArrowLeft size={14} />Voltar para notícias
          </Link>
        </AnimatedSection>

        {/* Article */}
        <AnimatedSection>
          <Badge variant={badgeVariant[news.category]} size="md" className="mb-4">{badgeLabel[news.category]}</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{news.title}</h1>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <span className="font-medium text-white/60">{news.author}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(news.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-white/50 hover:text-white text-xs transition-all border border-white/10">
              <Share2 size={12} />Compartilhar
            </button>
          </div>

          {news.image && (
            <div className="rounded-2xl overflow-hidden aspect-video mb-8 bg-navy-700">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 text-base leading-relaxed mb-4 text-lg font-medium">{news.excerpt}</p>
            <p className="text-white/60 text-base leading-relaxed">{news.content}</p>
            <p className="text-white/60 text-base leading-relaxed mt-4">
              A 29ª Taça Luigi Patriarcha de Futsal continua emocionando os apreciadores do esporte no Sudoeste do Paraná. Acompanhe todas as novidades pela plataforma oficial.
            </p>
          </div>
        </AnimatedSection>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gold-500/10">
            <h3 className="text-lg font-bold text-white mb-6">Mais notícias</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(r => (
                <AnimatedSection key={r.id}>
                  <Link href={`/noticias/${r.slug}`} className="group flex gap-3 glass-card rounded-xl p-3 hover:border-gold-500/15 border border-transparent transition-all">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-navy-700 flex-shrink-0">
                      {r.image && <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-semibold group-hover:text-gold-400 transition-colors line-clamp-2">{r.title}</p>
                      <p className="text-white/30 text-xs mt-1">{new Date(r.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: mockNews.map(n => ({ params: { slug: n.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const news = mockNews.find(n => n.slug === params?.slug)
  if (!news) return { notFound: true }
  const related = mockNews.filter(n => n.id !== news.id).slice(0, 2)
  return { props: { news, related } }
}
