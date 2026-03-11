'use client'

import { useState } from 'react'

// ─── Art Deco decorative components ──────────────────────────────────────────

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-600 opacity-60" />
      <div className="w-2 h-2 rotate-45 bg-gold-500 opacity-80" />
      <div className="w-1 h-1 rotate-45 bg-gold-400 opacity-60" />
      <div className="w-2 h-2 rotate-45 bg-gold-500 opacity-80" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-600 opacity-60" />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold-500 text-xs tracking-widest-3 uppercase font-sans mb-4">
      {children}
    </p>
  )
}

// ─── Waitlist form ────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'You\'re on the list. We\'ll be in touch.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div className="w-8 h-8 rotate-45 bg-gold-500 mx-auto mb-4" />
        <p className="text-gold-400 text-sm tracking-wider font-sans">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@atelier.com"
        required
        className="flex-1 bg-obsidian-900 border border-gold-700/40 text-cream placeholder-obsidian-500
          px-5 py-3 text-sm font-sans tracking-wide focus:outline-none focus:border-gold-500
          transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gold-600 hover:bg-gold-500 text-obsidian-950 px-8 py-3 text-xs font-sans
          font-semibold tracking-widest uppercase transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
      </button>
      {status === 'error' && (
        <p className="w-full text-red-400 text-xs text-center mt-1">{message}</p>
      )}
    </form>
  )
}

// ─── Pain point comparison table ──────────────────────────────────────────────

const comparisons = [
  { pain: 'Spreadsheets break when you have 200+ one-of-a-kind SKUs', jwl: 'Per-piece record with full material and gemstone lineage' },
  { pain: 'QuickBooks has no concept of carat, cut, or origin', jwl: 'Gemstone attributes baked into every piece record' },
  { pain: 'Custom order stages live in email threads and sticky notes', jwl: 'Visual workflow: Inquiry → Design → Approval → Production → Delivery' },
  { pain: 'Valuation is a manual calculation every time', jwl: 'Auto cost breakdown: materials + labor + margin, always current' },
  { pain: 'Client history is scattered across apps', jwl: 'Every order and piece linked to a client profile' },
]

// ─── Feature cards ────────────────────────────────────────────────────────────

const features = [
  {
    icon: '◈',
    title: 'Piece Inventory',
    body: 'Every item is its own record — photos, materials, gemstones by type, carat, cut, origin, and cost. Nothing falls through the cracks.',
  },
  {
    icon: '⟡',
    title: 'Gemstone Registry',
    body: 'Track each stone with provenance-grade detail. Cost per stone feeds into automatic piece valuation.',
  },
  {
    icon: '◇',
    title: 'Custom Order Workflow',
    body: 'Move orders through Inquiry, Design, Client Approval, Production, QC, and Delivery. See where everything stands at a glance.',
  },
  {
    icon: '⬡',
    title: 'Real-Time Valuation',
    body: 'Material costs + labor hours + your margin = live price breakdown. No more spreadsheet gymnastics before a client quote.',
  },
  {
    icon: '◉',
    title: 'Client Records',
    body: 'Every order, every piece, every communication — linked to a single client profile. Built for long-term atelier relationships.',
  },
  {
    icon: '◎',
    title: 'Atelier Dashboard',
    body: 'Pieces in progress, overdue orders, total inventory value. One screen, zero noise.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="bg-obsidian-950 text-cream min-h-screen font-sans">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold-900/30 bg-obsidian-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-gold-400 tracking-widest-2">JWL</span>
          <a
            href="#waitlist"
            className="text-xs tracking-widest uppercase text-gold-500 hover:text-gold-300 transition-colors duration-200"
          >
            Early Access
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-40 pb-32 px-6 text-center relative overflow-hidden">
        {/* Subtle background geometry */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,137,26,0.08) 0%, transparent 70%)
            `,
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <SectionLabel>Fine Jewelry Inventory Management</SectionLabel>
          <DiamondDivider />

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight mt-8 mb-6">
            <span className="gold-shimmer">Inventory software</span>
            <br />
            <span className="text-cream/90">built for ateliers that make</span>
            <br />
            <span className="text-cream/90">one-of-a-kind pieces.</span>
          </h1>

          <p className="text-obsidian-300 text-lg sm:text-xl max-w-2xl mx-auto mt-6 mb-12 leading-relaxed">
            General-purpose tools were never designed for the precision, provenance,
            and craft that define high-end jewelry. JWL was.
          </p>

          <WaitlistForm />

          <p className="text-obsidian-500 text-xs tracking-wide mt-5">
            Early access · No credit card required · Private beta launching soon
          </p>
        </div>
      </section>

      {/* ── Pain / Contrast ── */}
      <section className="py-28 px-6 bg-obsidian-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>The Problem</SectionLabel>
            <DiamondDivider />
            <h2 className="font-serif text-3xl sm:text-4xl mt-8 text-cream/90">
              Your craft deserves better than a spreadsheet.
            </h2>
          </div>

          <div className="border border-gold-900/30 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-2 border-b border-gold-900/30">
              <div className="px-8 py-4 bg-obsidian-900/60">
                <span className="text-xs tracking-widest uppercase text-obsidian-400 font-sans">
                  What ateliers use today
                </span>
              </div>
              <div className="px-8 py-4 bg-gold-900/10 border-l border-gold-900/30">
                <span className="text-xs tracking-widest uppercase text-gold-600 font-sans">
                  With JWL
                </span>
              </div>
            </div>

            {comparisons.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-gold-900/20 last:border-b-0 ${
                  i % 2 === 0 ? '' : 'bg-obsidian-900/20'
                }`}
              >
                <div className="px-8 py-6 text-obsidian-400 text-sm leading-relaxed border-r border-gold-900/20 flex items-start gap-3">
                  <span className="text-obsidian-600 mt-0.5 shrink-0">✕</span>
                  {row.pain}
                </div>
                <div className="px-8 py-6 text-cream/80 text-sm leading-relaxed flex items-start gap-3">
                  <span className="text-gold-500 mt-0.5 shrink-0">◈</span>
                  {row.jwl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>What You Get</SectionLabel>
            <DiamondDivider />
            <h2 className="font-serif text-3xl sm:text-4xl mt-8 text-cream/90">
              Every feature is atelier-native.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold-900/20">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-obsidian-950 p-8 hover:bg-obsidian-900/50 transition-colors duration-300 group"
              >
                <div className="text-gold-500 text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg text-cream/90 mb-3">{f.title}</h3>
                <p className="text-obsidian-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA / Waitlist ── */}
      <section id="waitlist" className="py-32 px-6 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 80% at 50% 100%, rgba(200,137,26,0.06) 0%, transparent 70%)
            `,
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <SectionLabel>Private Beta</SectionLabel>
          <DiamondDivider />

          <h2 className="font-serif text-4xl sm:text-5xl mt-8 mb-6 text-cream/90">
            Be among the first ateliers to use JWL.
          </h2>

          <p className="text-obsidian-400 text-base mb-10 leading-relaxed">
            We&rsquo;re onboarding a small group of ateliers to shape the product
            before public launch. Early members get lifetime discounted pricing
            and direct input on the roadmap.
          </p>

          <WaitlistForm />

          <p className="text-obsidian-600 text-xs tracking-wide mt-6">
            We respect your craft. We&rsquo;ll never sell your data.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gold-900/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-gold-700 tracking-widest-2">JWL</span>
          <p className="text-obsidian-600 text-xs tracking-wide">
            © {new Date().getFullYear()} JWL · Inventory software for fine jewelry ateliers
          </p>
          <a
            href="mailto:hello@jwlatelier.com"
            className="text-obsidian-500 hover:text-gold-500 text-xs tracking-wide transition-colors duration-200"
          >
            hello@jwlatelier.com
          </a>
        </div>
      </footer>

    </main>
  )
}
