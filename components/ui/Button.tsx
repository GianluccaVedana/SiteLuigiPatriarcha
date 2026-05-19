import { ReactNode, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'gold' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold-gradient text-navy-900 font-bold hover:opacity-90 shadow-gold',
  outline: 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  danger: 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export default function Button({ children, variant = 'gold', size = 'md', href, loading = false, icon, fullWidth = false, className = '', disabled, ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {icon && <span>{icon}</span>}
        {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
      </Link>
    )
  }

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {icon && <span>{icon}</span>}
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
    </button>
  )
}
