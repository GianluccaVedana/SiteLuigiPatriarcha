import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Logo from '@/components/Logo'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <Head><title>Recuperar Senha · 29ª Taça Luigi Patriarcha</title></Head>
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8"><Logo size={72} /></Link>
        <div className="w-full max-w-sm">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 size={56} className="text-green-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-black text-white mb-2">E-mail enviado!</h2>
              <p className="text-white/50 text-sm mb-6">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors">
                <ArrowLeft size={14} />Voltar ao login
              </Link>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors">
                <ArrowLeft size={14} />Voltar ao login
              </Link>
              <h1 className="text-3xl font-black text-white mb-2">Recuperar senha</h1>
              <p className="text-white/40 text-sm mb-8">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">E-mail cadastrado</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input pl-9" placeholder="seu@email.com" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-900 font-black text-base hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : 'Enviar link de recuperação'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
