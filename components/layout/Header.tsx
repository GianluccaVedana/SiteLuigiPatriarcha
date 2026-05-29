import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X, User, LogOut, ChevronDown, Trophy } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/competicao', label: 'Competição' },
  { href: '/galeria', label: 'Galeria' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
    setUserMenu(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-gold-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size={48} showText />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  router.pathname === link.href
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium hover:bg-gold-500/20 transition-all"
                >
                  <User size={16} />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl py-2 shadow-xl">
                    <Link href={user.role === 'admin' ? '/admin' : '/painel'} className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-gold-400 hover:bg-gold-500/10 transition-all">
                      <Trophy size={14} />
                      {user.role === 'admin' ? 'Painel Admin' : 'Meu Painel'}
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all">
                      <LogOut size={14} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-white/70 hover:text-white font-medium transition-colors">
                  Entrar
                </Link>
                <Link
                  href="/inscricao"
                  className="px-5 py-2 rounded-lg bg-gold-gradient text-navy-900 text-sm font-bold hover:opacity-90 transition-opacity shadow-gold"
                >
                  Fazer Inscrição
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-gold-500/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  router.pathname === link.href
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gold-500/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href={user?.role === 'admin' ? '/admin' : '/painel'} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gold-400 bg-gold-500/10">
                    {user?.role === 'admin' ? 'Painel Admin' : 'Meu Painel'}
                  </Link>
                  <button onClick={() => { handleLogout(); setOpen(false) }} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-white/70 hover:bg-white/5">
                    Entrar
                  </Link>
                  <Link href="/inscricao" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-bold text-center bg-gold-gradient text-navy-900">
                    Fazer Inscrição
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
