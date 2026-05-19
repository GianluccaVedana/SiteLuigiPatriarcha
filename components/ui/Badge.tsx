import { ReactNode } from 'react'

type Variant = 'gold' | 'blue' | 'green' | 'red' | 'orange' | 'default'

interface Props {
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md'
  pulse?: boolean
  className?: string
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  green: 'bg-green-500/15 text-green-400 border-green-500/30',
  red: 'bg-red-500/15 text-red-400 border-red-500/30',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  default: 'bg-white/10 text-white/70 border-white/20',
}

export default function Badge({ children, variant = 'default', size = 'sm', pulse = false, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-semibold uppercase tracking-wide ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
      } ${variants[variant]} ${pulse ? 'badge-live' : ''} ${className}`}
    >
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
