import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) {
      router.push('/painel')
    } else {
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <>
      <Head>
        <title>Entrar · 29ª Taça Luigi Patriarcha</title>
      </Head>
      <div className="min-h-screen flex bg-navy-950">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 40% 60%, rgba(200,169,81,0.1) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(200,169,81,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
            <Logo size={120} className="mb-8 animate-float" />
            <h1 className="text-4xl font-black text-white mb-3">Bem-vindo de volta!</h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">Acesse sua conta para gerenciar sua inscrição na 29ª Taça Luigi Patriarcha.</p>
          </div>
        </div>

        {/* Right panel (form) */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex justify-center mb-8 lg:hidden">
              <Logo size={80} />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Entrar na conta</h2>
              <p className="text-white/40 text-sm">Insira seus dados para acessar o painel</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm mb-6">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">E-mail</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input pl-9" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Senha</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="form-input pl-9 pr-10" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/auth/recuperar" className="text-xs text-gold-400 hover:text-gold-300 transition-colors">Esqueci minha senha</Link>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-900 font-black text-base hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Não tem conta?{' '}
                <Link href="/auth/cadastro" className="text-gold-400 font-semibold hover:text-gold-300 transition-colors">Criar conta grátis</Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">← Voltar ao site</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
