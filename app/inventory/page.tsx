import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  active:      'text-emerald-400 bg-emerald-400/10',
  in_progress: 'text-gold-400 bg-gold-400/10',
  sold:        'text-obsidian-400 bg-obsidian-400/10',
  archived:    'text-obsidian-600 bg-obsidian-700/20',
}

// Placeholder — replace with real DB query
const pieces: {
  id: string
  name: string
  status: string
  materials_cost: number
  labor_cost: number
  margin: number
  client: string | null
  created_at: string
}[] = []

export default function InventoryPage() {
  const totalValue = pieces.reduce((sum, p) => {
    const cost = p.materials_cost + p.labor_cost
    return sum + cost * (1 + p.margin / 100)
  }, 0)

  return (
    <div className="min-h-screen bg-obsidian-950 text-cream">
      <aside className="fixed inset-y-0 left-0 w-56 border-r border-gold-900/30 bg-obsidian-950 flex flex-col">
        <div className="px-6 py-6 border-b border-gold-900/30">
          <span className="font-serif text-xl text-gold-400 tracking-widest-2">JWL</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/inventory', label: 'Inventory', active: true },
            { href: '/orders', label: 'Orders' },
            { href: '/clients', label: 'Clients' },
          ].map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2.5 text-sm transition-colors duration-150 rounded-sm tracking-wide
                ${active
                  ? 'text-gold-400 bg-gold-900/20'
                  : 'text-obsidian-400 hover:text-cream hover:bg-obsidian-900/60'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-56 p-10">
        <header className="flex items-start justify-between mb-10">
          <div>
            <p className="text-gold-600 text-xs tracking-widest uppercase mb-1">Atelier</p>
            <h1 className="font-serif text-3xl text-cream/90">Piece Inventory</h1>
          </div>
          <Link
            href="/inventory/new"
            className="bg-gold-600 hover:bg-gold-500 text-obsidian-950 px-6 py-2.5 text-xs
              font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            + Add Piece
          </Link>
        </header>

        {/* Summary bar */}
        <div className="border border-gold-900/30 p-5 mb-8 flex gap-8">
          <div>
            <p className="text-obsidian-500 text-xs tracking-widest uppercase mb-1">Total Pieces</p>
            <p className="font-serif text-2xl">{pieces.length}</p>
          </div>
          <div>
            <p className="text-obsidian-500 text-xs tracking-widest uppercase mb-1">Inventory Value</p>
            <p className="font-serif text-2xl">
              {pieces.length > 0 ? `$${totalValue.toLocaleString()}` : '—'}
            </p>
          </div>
        </div>

        {/* Table */}
        {pieces.length === 0 ? (
          <div className="border border-gold-900/20 p-16 text-center">
            <p className="text-obsidian-500 text-sm tracking-wide">
              No pieces yet.{' '}
              <Link href="/inventory/new" className="text-gold-500 hover:text-gold-300 underline underline-offset-4">
                Add your first piece.
              </Link>
            </p>
          </div>
        ) : (
          <div className="border border-gold-900/20">
            <div className="grid grid-cols-5 border-b border-gold-900/20 px-6 py-3 bg-obsidian-900/40">
              {['Name', 'Status', 'Materials', 'Labor', 'Client'].map((h) => (
                <span key={h} className="text-xs tracking-widest uppercase text-obsidian-500">{h}</span>
              ))}
            </div>
            {pieces.map((p) => (
              <Link
                key={p.id}
                href={`/inventory/${p.id}`}
                className="grid grid-cols-5 px-6 py-4 border-b border-gold-900/10 last:border-b-0
                  hover:bg-obsidian-900/30 transition-colors duration-150"
              >
                <span className="text-sm text-cream/80">{p.name}</span>
                <span>
                  <span className={`text-xs px-2 py-0.5 rounded-sm font-sans ${STATUS_COLORS[p.status] ?? ''}`}>
                    {p.status.replace('_', ' ')}
                  </span>
                </span>
                <span className="text-sm text-obsidian-400">${p.materials_cost.toLocaleString()}</span>
                <span className="text-sm text-obsidian-400">${p.labor_cost.toLocaleString()}</span>
                <span className="text-sm text-obsidian-400">{p.client ?? '—'}</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
