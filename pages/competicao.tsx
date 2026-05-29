import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { Trophy, MapPin, Calendar, FileText, Award, Users, Clock } from 'lucide-react'

const categories = [
  { name: 'Sub-07', age: 'Nascidos em 2019 ou após', teams: 8, description: 'Iniciação ao futsal' },
  { name: 'Sub-09', age: 'Nascidos em 2017 ou após', teams: 8, description: 'Desenvolvimento inicial' },
  { name: 'Sub-11', age: 'Nascidos em 2015 ou após', teams: 8, description: 'Aprimoramento técnico' },
  { name: 'Sub-13', age: 'Nascidos em 2013 ou após', teams: 10, description: 'Formação tática' },
  { name: 'Sub-15', age: 'Nascidos em 2011 ou após', teams: 10, description: 'Alta performance juvenil' },
]

const calendar = [
  { date: '30 Mai', event: 'Encerramento das inscrições', status: 'done' },
  { date: '05 Jun', event: 'Divulgação dos grupos e tabela', status: 'done' },
  { date: '10 Jun', event: 'Início da fase de grupos', status: 'active' },
  { date: '05 Jul', event: 'Fase eliminatória (oitavas e quartas)', status: 'pending' },
  { date: '19 Jul', event: 'Semifinais', status: 'pending' },
  { date: '26 Jul', event: 'Final e Cerimônia de Premiação', status: 'pending' },
]

export default function CompeticaoPage() {
  return (
    <Layout>
      <Head>
        <title>A Competição · 29ª Taça Luigi Patriarcha</title>
        <meta name="description" content="Conheça a história, regulamento, categorias, premiação e calendário da 29ª Taça Luigi Patriarcha de Futsal." />
      </Head>

      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(26,58,107,0.4) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <Badge variant="gold" size="md" className="mb-4">29ª Edição · 2026</Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">A <span className="gold-text">Competição</span></h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Conheça tudo sobre a mais tradicional competição de futsal do Sudoeste do Paraná.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* História */}
      <section id="historia" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="section-line mb-4" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Uma história de <span className="gold-text">tradição e esporte</span>
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>A Taça Luigi Patriarcha de Futsal é uma das competições mais tradicionais e respeitadas do Sudoeste do Paraná. Criada em 1996 pelo Grêmio Industrial Patobranquense, a competição homenageia Luigi Patriarcha, um dos maiores incentivadores do esporte na região.</p>
                <p>Ao longo de 29 edições, o torneio revelou talentos que chegaram ao futebol profissional e contribuiu imensamente para o desenvolvimento do futsal na região, reunindo equipes de toda a mesorregião do Sudoeste paranaense.</p>
                <p>Com dezenas de equipes participantes ao longo de sua história e Centenas de atletas formados, a Taça Luigi Patriarcha é um patrimônio esportivo da comunidade patobranquense.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="grid grid-cols-2 gap-4">
              {[
                { icon: Trophy, value: '29', label: 'Edições realizadas' },
                { icon: Users, value: 'Dezenas', label: 'Equipes históricas' },
                { icon: Award, value: 'Centenas', label: 'Atletas formados' },
                { icon: Calendar, value: '1996', label: 'Ano de fundação' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="glass-card rounded-2xl p-6 text-center border border-gold-500/10">
                  <Icon size={24} className="text-gold-400 mx-auto mb-3" />
                  <div className="text-3xl font-black gold-text mb-1">{value}</div>
                  <div className="text-white/40 text-xs">{label}</div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Regulamento */}
      <section id="regulamento" className="py-20 bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <div className="section-line mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white">Regulamento <span className="gold-text">Oficial</span></h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8 border border-gold-500/20 text-center">
              <FileText size={48} className="text-gold-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Regulamento da 29ª Edição</h3>
              <p className="text-white/50 text-sm mb-6">Documento oficial com todas as regras, normas e disposições da competição. Leitura obrigatória para todas as equipes participantes.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/regulamento.pdf" className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-900 font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <FileText size={16} /> Baixar PDF
                </a>
                <a href="/regulamento.pdf" className="px-6 py-3 rounded-xl glass-card border border-gold-500/30 text-gold-400 font-semibold text-sm hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2">
                  Visualizar online
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <div className="section-line mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white">Categorias <span className="gold-text">2026</span></h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 60}>
                <div className="glass-card rounded-2xl p-5 border border-transparent hover:border-gold-500/20 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-gold-400 text-lg">{cat.name}</span>
                    <Badge variant="blue">{cat.teams} times</Badge>
                  </div>
                  <p className="text-white/70 text-sm font-medium mb-1">{cat.age}</p>
                  <p className="text-white/40 text-xs">{cat.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Formato */}
      <section className="py-20 bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <div className="section-line mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white">Formato do <span className="gold-text">Campeonato</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { phase: 'Fase de Grupos', icon: Users, desc: 'Equipes divididas em grupos. Todos jogam entre si. Os 2 primeiros de cada grupo avançam.', num: '1' },
              { phase: 'Fase Eliminatória', icon: Trophy, desc: 'Confrontos mata-mata a partir das quartas de final até as semifinais. Jogo único.', num: '2' },
              { phase: 'Grande Final', icon: Award, desc: 'Final única no Ginásio do Grêmio Industrial, com cerimônia de premiação ao final da partida.', num: '3' },
            ].map(({ phase, icon: Icon, desc, num }, i) => (
              <AnimatedSection key={phase} delay={i * 100}>
                <div className="glass-card rounded-2xl p-6 text-center border border-gold-500/10 relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-6xl font-black text-white/5">{num}</div>
                  <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-gold-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{phase}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Calendário */}
      <section id="calendario" className="py-20 bg-navy-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <div className="section-line mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white">Calendário <span className="gold-text">2026</span></h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold-500/20" />
            <div className="space-y-4">
              {calendar.map((item, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                  <div className="relative flex items-center gap-5 pl-14">
                    <div className={`absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.status === 'done' ? 'bg-green-500 border-green-500' : item.status === 'active' ? 'bg-gold-500 border-gold-500 animate-pulse-gold' : 'bg-navy-700 border-gold-500/30'}`}>
                      {item.status === 'done' && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className={`glass-card rounded-xl px-5 py-3 flex-1 border ${item.status === 'active' ? 'border-gold-500/40' : 'border-transparent'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">{item.event}</span>
                        <span className={`text-xs font-bold ${item.status === 'done' ? 'text-green-400' : item.status === 'active' ? 'text-gold-400' : 'text-white/30'}`}>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-8">
            <div className="section-line mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white">Local dos <span className="gold-text">Jogos</span></h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-6 border border-gold-500/15">
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={20} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold">Ginásio de Esportes do Grêmio Industrial Patobranquense</h3>
                  <p className="text-white/50 text-sm">R. Araucária, 883 · Santa Terezinha · Pato Branco – PR</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Clock size={20} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold">Horários dos Jogos</h3>
                  <p className="text-white/50 text-sm">Sábados e Domingos: 08:00 às 19:00</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  )
}
