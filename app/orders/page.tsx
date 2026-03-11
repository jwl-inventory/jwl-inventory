import Link from 'next/link'

const STAGES = [
  'Inquiry',
  'Design',
  'Client Approval',
  'Production',
  'QC',
  'Delivery',
] as const

type Stage = (typeof STAGES)[number]

const STAGE_COLORS: Record<Stage, string> = {
  'Inquiry':         'text-sky-400 bg-sky-400/10',
  'Design':          'text-violet-400 bg-violet-400/10',
  'Client Approval': 'text-amber-400 bg-amber-400/10',
  'Production':      'text-orange-400 bg-orange-400/10',
  'QC':              'text-lime-400 bg-lime-400/10',
  'Delivery':        'text-emerald-400 bg-emerald-400/10',
}

// Placeholder — replace with real DB query
const orders: {
  id: string
  client_name: string
  stage: Stage
  due_date: string | null
  notes: string | null
}[] = []

export default function OrdersPage() {
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
            { href: '/orders', label: 'Orders', active: true },
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
            <p className="text-gold-600 text-xs tracking-widest uppercase mb-1">Commissions</p>
            <h1 className="font-serif text-3xl text-cream/90">Custom Orders</h1>
          </div>
          <Link
            href="/orders/new"
            className="bg-gold-600 hover:bg-gold-500 text-obsidian-950 px-6 py-2.5 text-xs
              font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            + New Order
          </Link>
        </header>

        {/* Stage pipeline legend */}
        <div className="flex gap-2 flex-wrap mb-8">
          {STAGES.map((s) => (
            <span key={s} className={`text-xs px-3 py-1 rounded-sm font-sans ${STAGE_COLORS[s]}`}>
              {s}
            </span>
          ))}
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="border border-gold-900/20 p-16 text-center">
            <p className="text-obsidian-500 text-sm tracking-wide">
              No orders yet.{' '}
              <Link href="/orders/new" className="text-gold-500 hover:text-gold-300 underline underline-offset-4">
                Create your first commission.
              </Link>
            </p>
          </div>
        ) : (
          <div className="border border-gold-900/20">
            <div className="grid grid-cols-4 border-b border-gold-900/20 px-6 py-3 bg-obsidian-900/40">
              {['Client', 'Stage', 'Due Date', 'Notes'].map((h) => (
                <span key={h} className="text-xs tracking-widest uppercase text-obsidian-500">{h}</span>
              ))}
            </div>
            {orders.map((o) => (
              <Link
                key={o.id}
                href={`/orders/${o.id}`}
                className="grid grid-cols-4 px-6 py-4 border-b border-gold-900/10 last:border-b-0
                  hover:bg-obsidian-900/30 transition-colors duration-150"
              >
                <span className="text-sm text-cream/80">{o.client_name}</span>
                <span>
                  <span className={`text-xs px-2 py-0.5 rounded-sm font-sans ${STAGE_COLORS[o.stage]}`}>
                    {o.stage}
                  </span>
                </span>
                <span className="text-sm text-obsidian-400">
                  {o.due_date ? new Date(o.due_date).toLocaleDateString() : '—'}
                </span>
                <span className="text-sm text-obsidian-500 truncate">{o.notes ?? '—'}</span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
