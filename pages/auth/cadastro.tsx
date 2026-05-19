import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Logo from '@/components/Logo'

export default function CadastroPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) return
    setLoading(true)
    await register({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    setDone(true)
    setTimeout(() => router.push('/painel'), 2000)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle2 size={64} className="text-green-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-white mb-2">Conta criada!</h2>
          <p className="text-white/40">Redirecionando para seu painel...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head><title>Criar Conta · 29ª Taça Luigi Patriarcha</title></Head>
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8"><Logo size={72} /></Link>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Criar conta</h1>
            <p className="text-white/40 text-sm">Cadastre-se para inscrever sua equipe na 29ª Taça Luigi Patriarcha</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Nome completo *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} required className="form-input pl-9" placeholder="Seu nome completo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">E-mail *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required className="form-input pl-9" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Telefone / WhatsApp</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="form-input pl-9" placeholder="(46) 99999-9999" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Senha *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} className="form-input pl-9 pr-10" placeholder="Mínimo 6 caracteres" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Confirmar senha *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} required className={`form-input pl-9 ${form.confirm && form.password !== form.confirm ? 'border-red-500' : ''}`} placeholder="Repita a senha" />
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-red-400 text-xs mt-1">As senhas não coincidem.</p>
              )}
            </div>

            <button type="submit" disabled={loading || (!!form.confirm && form.password !== form.confirm)} className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-900 font-black text-base hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
              {loading ? <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : 'Criar conta grátis'}
            </button>
          </form>

          <p className="mt-6 text-center text-white/40 text-sm">
            Já tem conta?{' '}
            <Link href="/auth/login" className="text-gold-400 font-semibold hover:text-gold-300 transition-colors">Entrar</Link>
          </p>
          <div className="mt-4 text-center">
            <Link href="/" className="text-white/20 text-xs hover:text-white/50 transition-colors">← Voltar ao site</Link>
          </div>
        </div>
      </div>
    </>
  )
}
