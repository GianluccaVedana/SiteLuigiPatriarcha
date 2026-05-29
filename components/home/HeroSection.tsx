import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Play, Calendar } from 'lucide-react'
import { useCountdown } from '@/hooks/useCountdown'
import { COMPETITION_DATE } from '@/data/mock'

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 md:w-20 h-16 md:h-20 glass-card rounded-xl flex items-center justify-center gold-glow">
        <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-gold-500 text-xs uppercase tracking-widest mt-2 font-semibold">{label}</span>
    </div>
  )
}

export default function HeroSection() {
  const countdown = useCountdown(COMPETITION_DATE)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 hero-overlay" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,81,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Particles */}
      <div className="particles">
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-float">
          <img
            src="/logo.png"
            alt="29ª Taça Luigi Patriarcha"
            className="w-40 md:w-56 drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 40px rgba(200,169,81,0.4))' }}
          />
        </div>

        {/* Edition badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          29ª Edição · 2026
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-4 animate-slide-up">
          TAÇA{' '}
          <span className="gold-text block sm:inline">LUIGI PATRIARCHA</span>
        </h1>

        {/* Tagline */}
        <p className="text-gold-300/80 text-lg md:text-xl font-light tracking-wide mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          A tradição entra em quadra mais uma vez
        </p>
        <p className="text-white/40 text-sm md:text-base mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Grêmio Industrial Patobranquense · Pato Branco – PR · 15/08 de 2026
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/inscricao"
            className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-900 font-bold text-base hover:opacity-90 transition-all shadow-gold-lg hover:scale-105 active:scale-95 duration-200"
          >
            Fazer Inscrição
          </Link>
          <Link
            href="/jogos"
            className="px-8 py-4 rounded-xl glass-card border border-gold-500/30 text-gold-400 font-semibold text-base hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Ver Jogos
          </Link>
        </div>

        {/* Countdown */}
        {!countdown.isExpired && (
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Calendar size={14} className="text-gold-500" />
              <span className="text-white/50 text-xs uppercase tracking-widest">Início em</span>
            </div>
            <div className="flex items-start justify-center gap-3 md:gap-5">
              <CountdownBox value={countdown.days} label="Dias" />
              <span className="text-gold-500 text-2xl font-bold mt-4">:</span>
              <CountdownBox value={countdown.hours} label="Horas" />
              <span className="text-gold-500 text-2xl font-bold mt-4">:</span>
              <CountdownBox value={countdown.minutes} label="Min" />
              <span className="text-gold-500 text-2xl font-bold mt-4">:</span>
              <CountdownBox value={countdown.seconds} label="Seg" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Rolar</span>
        <ChevronDown size={18} />
      </div>
    </section>
  )
}
