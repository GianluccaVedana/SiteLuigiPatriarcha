import Link from 'next/link'
import { Camera, ChevronRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const photos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/600/400?random=${i + 10}`,
  alt: `Foto ${i + 1} da 29ª Taça Luigi Patriarcha`,
}))

export default function GallerySection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="section-line mb-3" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Galeria de <span className="gold-text">Fotos</span>
              </h2>
            </div>
            <Link href="/galeria" className="hidden sm:flex items-center gap-1 text-gold-400 text-sm font-medium hover:gap-2 transition-all">
              <Camera size={14} />Ver galeria completa <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <AnimatedSection key={photo.id} delay={i * 60}>
              <Link href="/galeria" className="group relative block rounded-2xl overflow-hidden aspect-video bg-navy-700">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-300 flex items-center justify-center">
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
