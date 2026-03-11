import Link from 'next/link'

// In production these come from the DB via server components / API
const stats = [
  { label: 'Pieces in Progress', value: '—' },
  { label: 'Orders This Month', value: '—' },
  { label: 'Overdue Orders', value: '—' },
  { label: 'Inventory Value', value: '—' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-cream">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-56 border-r border-gold-900/30 bg-obsidian-950 flex flex-col">
        <div className="px-6 py-6 border-b border-gold-900/30">
          <span className="font-serif text-xl text-gold-400 tracking-widest-2">JWL</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/inventory', label: 'Inventory' },
            { href: '/orders', label: 'Orders' },
            { href: '/clients', label: 'Clients' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2.5 text-sm text-obsidian-400 hover:text-cream hover:bg-obsidian-900/60
                transition-colors duration-150 rounded-sm tracking-wide"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gold-900/30">
          <p className="text-obsidian-600 text-xs tracking-wide">Beta v0.1</p>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 p-10">
        <header className="mb-10">
          <p className="text-gold-600 text-xs tracking-widest uppercase mb-1">Overview</p>
          <h1 className="font-serif text-3xl text-cream/90">Dashboard</h1>
        </header>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold-900/20 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-obsidian-950 p-6">
              <p className="text-obsidian-500 text-xs tracking-widest uppercase mb-3">{s.label}</p>
              <p className="font-serif text-3xl text-cream/90">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/inventory/new', label: 'Add Piece', desc: 'Record a new item' },
            { href: '/orders/new', label: 'New Order', desc: 'Start a custom commission' },
            { href: '/clients/new', label: 'Add Client', desc: 'Create a client profile' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="border border-gold-900/30 p-6 hover:border-gold-700/50 hover:bg-obsidian-900/30
                transition-all duration-200 group"
            >
              <p className="text-gold-500 text-xs tracking-widest uppercase mb-2 group-hover:text-gold-400">
                {a.label}
              </p>
              <p className="text-obsidian-400 text-sm">{a.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
