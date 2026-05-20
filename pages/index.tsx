import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import NextGames from '@/components/home/NextGames'
import ClassificationPreview from '@/components/home/ClassificationPreview'
import TopScorers from '@/components/home/TopScorers'
import GallerySection from '@/components/home/GallerySection'
import SponsorsSection from '@/components/home/SponsorsSection'
import PreviousChampions from '@/components/home/PreviousChampions'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>29ª Taça Luigi Patriarcha de Futsal · Pato Branco – PR</title>
        <meta name="description" content="Plataforma oficial da 29ª Taça Luigi Patriarcha de Futsal. Inscrições, jogos, classificação e notícias. Grêmio Industrial Patobranquense." />
      </Head>

      <HeroSection />
      <StatsSection />
      <NextGames />
      <ClassificationPreview />
      <TopScorers />
      <GallerySection />
      <PreviousChampions />
      <SponsorsSection />

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(200,169,81,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-6 animate-float drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 20px rgba(200,169,81,0.5))' }} />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Sua equipe na <span className="gold-text">29ª Taça?</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Inscrições abertas para todas as categorias. Não perca o prazo e garanta sua vaga na competição mais tradicional do Sudoeste do Paraná.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inscricao" className="px-10 py-4 rounded-xl bg-gold-gradient text-navy-900 font-black text-base hover:opacity-90 transition-all shadow-gold-lg hover:scale-105 duration-200 active:scale-95">
                Fazer Inscrição Agora
              </Link>
              <Link href="/competicao" className="px-10 py-4 rounded-xl glass-card border border-gold-500/30 text-gold-400 font-semibold text-base hover:bg-gold-500/10 transition-all">
                Ver Regulamento
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5546984136469?text=Olá! Tenho interesse em me inscrever na 29ª Taça Luigi Patriarcha."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-400 hover:scale-110 transition-all duration-200"
        title="Fale conosco no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </Layout>
  )
}
