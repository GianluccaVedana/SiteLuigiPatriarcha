import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { CATEGORIES } from '@/data/mock'
import { CheckCircle2, User, Users, ChevronRight, Plus, Trash2, Upload } from 'lucide-react'

const STEPS = ['Responsável', 'Equipe', 'Atletas', 'Confirmação']

interface AtletaForm { name: string; number: string; position: string; birthDate: string }

export default function InscricaoPage() {
  const router = useRouter()
  const { isAuthenticated, user, token } = useAuth()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    responsavel: user?.name || '',
    cpf: '', phone: '', email: user?.email || '',
    teamName: '', city: '', state: 'PR', category: 'adulto', teamLogo: '',
  })
  const [atletas, setAtletas] = useState<AtletaForm[]>([
    { name: '', number: '1', position: 'goleiro', birthDate: '' },
    { name: '', number: '2', position: 'fixo', birthDate: '' },
  ])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const setAtleta = (i: number, k: string, v: string) => setAtletas(a => a.map((at, idx) => idx === i ? { ...at, [k]: v } : at))
  const addAtleta = () => setAtletas(a => [...a, { name: '', number: String(a.length + 1), position: 'ala', birthDate: '' }])
  const removeAtleta = (i: number) => setAtletas(a => a.filter((_, idx) => idx !== i))

  const handleNext = async () => {
    if (step === STEPS.length - 2) {
      setLoading(true)
      await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          teamName: form.teamName,
          city: form.city,
          state: form.state,
          category: form.category,
          responsible: form.responsavel,
          phone: form.phone,
          email: form.email,
          players: atletas,
        }),
      })
      setLoading(false)
    }
    setStep(s => s + 1)
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
              <User size={36} className="text-gold-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3">Acesso necessário</h2>
            <p className="text-white/50 mb-6">Você precisa criar uma conta ou entrar para inscrever sua equipe.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/auth/cadastro" className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm">Criar conta</Link>
              <Link href="/auth/login" className="px-6 py-3 rounded-xl glass-card border border-gold-500/30 text-gold-400 font-semibold text-sm">Entrar</Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head><title>Inscrição de Equipe · 29ª Taça Luigi Patriarcha</title></Head>

      <div className="relative pt-32 pb-10">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Inscrição de <span className="gold-text">Equipe</span></h1>
            <p className="text-white/40 text-sm">29ª Taça Luigi Patriarcha de Futsal · 2026</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto py-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-gold-gradient text-navy-900' :
                  'bg-navy-700 text-white/30'
                }`}>
                  {i < step ? <CheckCircle2 size={18} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${i === step ? 'text-gold-400 font-semibold' : 'text-white/30'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-1 mb-4 ${i < step ? 'bg-green-500' : 'bg-navy-700'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatedSection key={step} direction="up">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-gold-500/15">
            {/* Step 0: Responsável */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2"><User size={20} className="text-gold-400" />Dados do Responsável</h2>
                {[
                  { label: 'Nome completo *', key: 'responsavel', type: 'text', placeholder: 'Nome do responsável pela equipe' },
                  { label: 'CPF *', key: 'cpf', type: 'text', placeholder: '000.000.000-00' },
                  { label: 'Telefone / WhatsApp *', key: 'phone', type: 'tel', placeholder: '(46) 99999-9999' },
                  { label: 'E-mail *', key: 'email', type: 'email', placeholder: 'seu@email.com' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">{field.label}</label>
                    <input type={field.type} value={(form as any)[field.key]} onChange={e => set(field.key, e.target.value)} className="form-input" placeholder={field.placeholder} />
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Equipe */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2"><Users size={20} className="text-gold-400" />Dados da Equipe</h2>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Nome da equipe *</label>
                  <input type="text" value={form.teamName} onChange={e => set('teamName', e.target.value)} className="form-input" placeholder="Nome oficial da equipe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Cidade *</label>
                    <input type="text" value={form.city} onChange={e => set('city', e.target.value)} className="form-input" placeholder="Sua cidade" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Estado</label>
                    <input type="text" value={form.state} onChange={e => set('state', e.target.value)} className="form-input" maxLength={2} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Categoria *</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Logo da equipe (opcional)</label>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-xl border border-dashed border-gold-500/20 cursor-pointer hover:border-gold-500/40 transition-all">
                    <Upload size={20} className="text-gold-400 flex-shrink-0" />
                    <span className="text-white/40 text-sm">Clique para fazer upload da logo (.png, .jpg)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Atletas */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users size={20} className="text-gold-400" />Lista de Atletas</h2>
                  <Badge variant="blue">{atletas.length} atletas</Badge>
                </div>
                <div className="space-y-3 mb-4">
                  {atletas.map((at, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 border border-gold-500/10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gold-400 font-bold text-sm">Atleta #{i + 1}</span>
                        {atletas.length > 2 && (
                          <button onClick={() => removeAtleta(i)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="col-span-2">
                          <input value={at.name} onChange={e => setAtleta(i, 'name', e.target.value)} className="form-input text-sm" placeholder="Nome completo" />
                        </div>
                        <input value={at.number} onChange={e => setAtleta(i, 'number', e.target.value)} className="form-input text-sm" placeholder="Nº" type="number" min="1" max="99" />
                        <select value={at.position} onChange={e => setAtleta(i, 'position', e.target.value)} className="form-input text-sm">
                          <option value="goleiro">Goleiro</option>
                          <option value="fixo">Fixo</option>
                          <option value="ala">Ala</option>
                          <option value="pivo">Pivô</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                {atletas.length < 15 && (
                  <button onClick={addAtleta} className="w-full py-3 rounded-xl glass-card border border-dashed border-gold-500/20 text-gold-400 text-sm font-semibold hover:border-gold-500/40 hover:bg-gold-500/5 transition-all flex items-center justify-center gap-2">
                    <Plus size={16} />Adicionar atleta
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Confirmação */}
            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-3">Inscrição enviada!</h2>
                <p className="text-white/50 mb-2">Sua inscrição foi recebida e está sendo processada.</p>
                <p className="text-white/40 text-sm mb-8">Você receberá um e-mail de confirmação em <span className="text-gold-400">{form.email}</span>.</p>

                <div className="glass-card rounded-xl p-5 text-left mb-6 space-y-2 border border-gold-500/15">
                  {[
                    { label: 'Equipe', value: form.teamName },
                    { label: 'Categoria', value: CATEGORIES.find(c => c.value === form.category)?.label },
                    { label: 'Atletas', value: `${atletas.length} jogadores cadastrados` },
                    { label: 'Status', value: 'Aguardando confirmação', gold: true },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-white/40">{row.label}</span>
                      <span className={row.gold ? 'text-gold-400 font-semibold' : 'text-white font-medium'}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 justify-center">
                  <Link href="/painel" className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm">Ir para meu painel</Link>
                  <Link href="/" className="px-6 py-3 rounded-xl glass-card border border-gold-500/30 text-gold-400 font-semibold text-sm">Voltar ao início</Link>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < STEPS.length - 1 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gold-500/10">
                {step > 0 ? (
                  <button onClick={() => setStep(s => s - 1)} className="px-5 py-2.5 rounded-xl glass-card text-white/60 hover:text-white text-sm font-semibold border border-white/10 transition-all">
                    ← Voltar
                  </button>
                ) : <div />}
                <button onClick={handleNext} disabled={loading} className="px-6 py-2.5 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50">
                  {loading ? <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : <>
                    {step === STEPS.length - 2 ? 'Confirmar inscrição' : 'Próximo'}
                    <ChevronRight size={16} />
                  </>}
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </Layout>
  )
}
