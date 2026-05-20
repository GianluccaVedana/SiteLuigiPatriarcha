import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { X, ZoomIn } from 'lucide-react'

const photos = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1587384474964-3a06ce1ce699?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Jogada', category: 'Jogos' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1521217078329-f8fc1becab68?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1521217078329-f8fc1becab68?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Disputa de bola', category: 'Jogos' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1509077613385-f89402467146?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1509077613385-f89402467146?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Gol', category: 'Jogos' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1598026878267-1f22ae804eac?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1598026878267-1f22ae804eac?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Partida', category: 'Jogos' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1622862259519-f6aab1c6168a?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1622862259519-f6aab1c6168a?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Lance', category: 'Jogos' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1630420598913-44208d36f9af?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1630420598913-44208d36f9af?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Cerimônia', category: 'Premiação' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1630420598771-dd52ab08c8cb?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1630420598771-dd52ab08c8cb?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Troféu', category: 'Premiação' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?w=800&h=600&fit=crop&q=80', thumb: 'https://images.unsplash.com/photo-1695950695168-f4038b55a9ca?w=400&h=300&fit=crop&q=80', caption: '29ª Taça Luigi Patriarcha · Campeões', category: 'Premiação' },
]

const categories = ['Todas', 'Jogos', 'Premiação']

export default function GaleriaPage() {
  const [cat, setCat] = useState('Todas')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = cat === 'Todas' ? photos : photos.filter(p => p.category === cat)
  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <Layout>
      <Head>
        <title>Galeria de Fotos · 29ª Taça Luigi Patriarcha</title>
      </Head>

      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-black text-white mb-3">Galeria de <span className="gold-text">Fotos</span></h1>
            <p className="text-white/40">Os melhores momentos da 29ª edição</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${cat === c ? 'bg-gold-gradient text-navy-900' : 'glass-card text-white/50 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <AnimatedSection key={photo.id} delay={i * 40}>
              <button onClick={() => setLightbox(i)} className="group relative block w-full rounded-2xl overflow-hidden aspect-square bg-navy-700">
                <img src={photo.thumb} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-300 flex flex-col items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                  <span className="text-white/70 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 text-center">{photo.category}</span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10">
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img src={current.src} alt={current.caption} className="w-full rounded-2xl" />
            <p className="text-white/50 text-sm text-center mt-3">{current.caption}</p>
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={() => setLightbox(l => l !== null && l > 0 ? l - 1 : filtered.length - 1)} className="px-4 py-2 glass-card rounded-lg text-white/60 hover:text-white text-sm transition-all">← Anterior</button>
              <span className="px-4 py-2 text-white/30 text-sm">{lightbox! + 1} / {filtered.length}</span>
              <button onClick={() => setLightbox(l => l !== null && l < filtered.length - 1 ? l + 1 : 0)} className="px-4 py-2 glass-card rounded-lg text-white/60 hover:text-white text-sm transition-all">Próxima →</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
