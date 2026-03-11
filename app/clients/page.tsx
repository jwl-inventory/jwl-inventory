import Link from 'next/link'

// Placeholder — replace with real DB query
const clients: {
  id: string
  name: string
  email: string | null
  phone: string | null
  order_count: number
  notes: string | null
}[] = []

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream">
      <aside className="fixed inset-y-0 left-0 w-56 border-r border-gold-900/30 bg-obsidian-950 flex flex-col">
        <div className="px-6 py-6 border-b border-gold-900/30">
          <span className="font-serif text-xl text-gold-400 tracking-widest-2">JWL</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/inventory', label: 'Inventory' },
            { href: '/orders', label: 'Orders' },
            { href: '/clients', label: 'Clients', active: true },
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
            <p className="text-gold-600 text-xs tracking-widest uppercase mb-1">Relationships</p>
            <h1 className="font-serif text-3xl text-cream/90">Clients</h1>
          </div>
          <Link
            href="/clients/new"
            className="bg-gold-600 hover:bg-gold-500 text-obsidian-950 px-6 py-2.5 text-xs
              font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            + Add Client
          </Link>
        </header>

        {clients.length === 0 ? (
          <div className="border border-gold-900/20 p-16 text-center">
            <p className="text-obsidian-500 text-sm tracking-wide">
              No clients yet.{' '}
              <Link href="/clients/new" className="text-gold-500 hover:text-gold-300 underline underline-offset-4">
                Add your first client.
              </Link>
            </p>
          </div>
        ) : (
          <div className="border border-gold-900/20">
            <div className="grid grid-cols-4 border-b border-gold-900/20 px-6 py-3 bg-obsidian-900/40">
              {['Name', 'Email', 'Phone', 'Orders'].map((h) => (
                <span key={h} className="text-xs tracking-widest uppercase text-obsidian-500">{h}</span>
              ))}
            </div>
            {clients.map((c) => (
              <Link
                key={c.id}
                href={`/clients/${c.id}`}
                className="grid grid-cols-4 px-6 py-4 border-b border-gold-900/10 last:border-b-0
                  hover:bg-obsidian-900/30 transition-colors duration-150"
              >
                <span className="text-sm text-cream/80">{c.name}</span>
                <span className="text-sm text-obsidian-400">{c.email ?? '—'}</span>
                <span className="text-sm text-obsidian-400">{c.phone ?? '—'}</span>
                <span className="text-sm text-obsidian-400">{c.order_count}</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
