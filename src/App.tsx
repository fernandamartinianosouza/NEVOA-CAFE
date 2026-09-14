import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Clock3, Instagram, MapPin, Menu, Quote, X } from 'lucide-react'

const coffees = [
  { name: 'Névoa Latte', note: 'Espresso, leite cremoso e toque de baunilha', price: 'R$ 16', tone: 'latte' },
  { name: 'Sol de Canela', note: 'Cappuccino, canela e caramelo da casa', price: 'R$ 18', tone: 'cinnamon' },
  { name: 'Brisa Gelada', note: 'Cold brew, laranja e espuma cítrica', price: 'R$ 17', tone: 'cold' },
]

const menu = [
  ['Espresso', 'Intenso, doce e encorpado', 'R$ 9'],
  ['Cappuccino', 'Espresso, leite e cacau', 'R$ 14'],
  ['Coado da casa', 'Grão especial do dia', 'R$ 12'],
  ['Mocha', 'Chocolate, espresso e leite', 'R$ 16'],
]

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: .75, ease: [0.22, 1, 0.36, 1] } },
}

function Logo() {
  return <a className="logo" href="#inicio" aria-label="Névoa Café — início">
    <span className="logo-mark"><i /><b /></span>
    <span>NÉVOA CAFÉ</span>
  </a>
}

function Cup() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, .28], [0, 80])
  const rotate = useTransform(scrollYProgress, [0, .28], [0, -4])
  return <motion.div className="cup-scene" style={{ y, rotate }} aria-hidden="true">
    <div className="sun-disc" />
    <div className="steam steam-one" />
    <div className="steam steam-two" />
    <div className="cup">
      <div className="coffee"><span /></div>
      <div className="cup-symbol">⌁</div>
    </div>
    <div className="handle" />
    <div className="cup-shadow" />
  </motion.div>
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return <main>
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <Logo />
      <nav className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
        <a href="#historia" onClick={close}>História</a>
        <a href="#cafes" onClick={close}>Cafés</a>
        <a href="#cardapio" onClick={close}>Cardápio</a>
        <a href="#experiencia" onClick={close}>Experiência</a>
        <a className="nav-cta" href="#visite" onClick={close}>Visite-nos</a>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        {open ? <X /> : <Menu />}
      </button>
    </header>

    <section className="hero" id="inicio">
      <div className="leaf-shadow" />
      <div className="hero-line" />
      <motion.div className="hero-copy left-copy" initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9 }}>
        <span>Seu</span><span>momento</span>
        <small>Café é mais do que rotina.<br />É encontro.</small>
      </motion.div>
      <Cup />
      <motion.div className="hero-copy right-copy" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .12 }}>
        <span>pede um</span><span>bom café.</span>
        <p>Sabores especiais para desacelerar,<br />conversar e ficar mais um pouco.</p>
      </motion.div>
      <div className="hero-actions">
        <a className="primary-button" href="#cafes">Conheça nossos cafés <ArrowRight /></a>
        <a className="text-button" href="#cardapio">Ver cardápio <ArrowRight /></a>
      </div>
      <a className="scroll-cue" href="#historia"><span>Role para descobrir</span><ArrowDown /></a>
    </section>

    <section className="story section" id="historia">
      <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>01 — Nossa história</motion.div>
      <div className="story-grid">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2>Todo dia merece<br /><em>uma boa pausa.</em></h2>
          <p className="lead">A Névoa nasceu para transformar o café em um pequeno ritual. Selecionamos grãos brasileiros e criamos sabores que convidam você a ficar.</p>
          <a className="inline-link" href="#experiencia">Conheça a experiência <ArrowRight /></a>
        </motion.div>
        <motion.figure className="photo-frame" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85" alt="Preparo artesanal de café especial" />
          <figcaption>Feito devagar.<br />Servido com intenção.</figcaption>
        </motion.figure>
      </div>
    </section>

    <section className="coffee-section section" id="cafes">
      <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div><span className="section-kicker">02 — Favoritos da casa</span><h2>Cafés com<br /><em>personalidade.</em></h2></div>
        <p>Receitas autorais, ingredientes honestos e um sabor para cada tipo de pausa.</p>
      </motion.div>
      <div className="coffee-grid">
        {coffees.map((item, i) => <motion.article className="coffee-card" key={item.name} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * .1 }}>
          <div className={"drink " + item.tone}><div /><span /></div>
          <div className="card-number">0{i + 1}</div>
          <h3>{item.name}</h3><p>{item.note}</p><strong>{item.price}</strong>
        </motion.article>)}
      </div>
    </section>

    <section className="menu-section section" id="cardapio">
      <motion.div className="menu-title" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <span className="section-kicker light">03 — Nosso cardápio</span>
        <h2>Escolha seu<br /><em>próximo favorito.</em></h2>
      </motion.div>
      <motion.div className="menu-list" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {menu.map(([name, desc, price]) => <div className="menu-item" key={name}>
          <div><h3>{name}</h3><p>{desc}</p></div><strong>{price}</strong>
        </div>)}
        <a className="menu-download" href="#visite">Ver cardápio completo <ArrowRight /></a>
      </motion.div>
    </section>

    <section className="experience section" id="experiencia">
      <div className="experience-photos">
        <motion.img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85" alt="Ambiente acolhedor da cafeteria" initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} />
        <motion.img src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=85" alt="Detalhes do balcão da cafeteria" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} />
      </div>
      <motion.div className="experience-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <span className="section-kicker">04 — Experiência</span>
        <h2>Aqui, o tempo<br /><em>tem outro sabor.</em></h2>
        <p>Luz quente, música boa e espaço para conversar. Cada detalhe foi pensado para fazer você se sentir em casa — só que com um café melhor.</p>
      </motion.div>
    </section>

    <section className="quote-section">
      <Quote />
      <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        “Um lugar para chegar sem pressa<br />e sair querendo voltar.”
      </motion.blockquote>
      <span>— Quem já viveu uma pausa Névoa</span>
    </section>

    <section className="visit section" id="visite">
      <motion.div className="visit-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <span className="section-kicker">05 — Visite-nos</span>
        <h2>Seu café está<br /><em>quase pronto.</em></h2>
        <div className="visit-info">
          <p><MapPin /> Rua das Boas Pausas, 120<br />Centro • Sua cidade</p>
          <p><Clock3 /> Segunda a sábado<br />08h às 20h</p>
        </div>
        <a className="primary-button" href="https://maps.google.com" target="_blank" rel="noreferrer">Como chegar <ArrowRight /></a>
      </motion.div>
      <div className="visit-art"><div className="mini-cup"><i /></div><span>N</span></div>
    </section>

    <footer>
      <Logo />
      <p>Mais que café, um outro ritmo.</p>
      <a href="https://instagram.com" aria-label="Instagram"><Instagram /> Instagram</a>
      <small>Projeto-conceito por Flowexp Tech © 2026</small>
    </footer>
  </main>
}
