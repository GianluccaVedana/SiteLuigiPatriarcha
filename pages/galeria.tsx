import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { X, ZoomIn } from 'lucide-react'

const driveIds = [
  '1FrFxHJhJ-L4cq9FCxnOKF-jeEAoV4P85',
  '1ICUWIMbjRuD1HSRCeT5zAqMwsBeThc76',
  '1LVKOhi1aPFX-xMwDffClkkqRzjdKTtZu',
  '1XKF6RrnN0JwNKRrADb5iuiT_ixBJljMS',
  '1YMDakb4eggcZzo3Jzhysjqw3OHF6KgZe',
  '1nf9MQG30P5Aum4NMc14Y0Z0OELXzJANL',
]

const photos = driveIds.map((id, i) => ({
  id: i + 1,
  src: `https://drive.google.com/uc?export=view&id=${id}`,
  thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w600`,
  caption: `29ª Taça Luigi Patriarcha`,
}))

export default function GaleriaPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const current = lightbox !== null ? photos[lightbox] : null

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
            <p className="text-white/40">Os melhores momentos da competição</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <AnimatedSection key={photo.id} delay={i * 40}>
              <button onClick={() => setLightbox(i)} className="group relative block w-full rounded-2xl overflow-hidden aspect-square bg-navy-700">
                <img src={photo.thumb} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {current && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10">
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img src={current.src} alt={current.caption} className="w-full rounded-2xl" />
            <p className="text-white/50 text-sm text-center mt-3">{current.caption}</p>
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={() => setLightbox(l => l !== null && l > 0 ? l - 1 : photos.length - 1)} className="px-4 py-2 glass-card rounded-lg text-white/60 hover:text-white text-sm transition-all">← Anterior</button>
              <span className="px-4 py-2 text-white/30 text-sm">{lightbox! + 1} / {photos.length}</span>
              <button onClick={() => setLightbox(l => l !== null && l < photos.length - 1 ? l + 1 : 0)} className="px-4 py-2 glass-card rounded-lg text-white/60 hover:text-white text-sm transition-all">Próxima →</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
