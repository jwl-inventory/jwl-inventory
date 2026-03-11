import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'JWL — Inventory Software for Fine Jewelry Ateliers',
  description:
    'The only inventory management system built for ateliers that craft one-of-a-kind pieces. Track gemstones, valuations, and custom orders with precision.',
  openGraph: {
    title: 'JWL — Inventory Software for Fine Jewelry Ateliers',
    description:
      'Precision inventory management for high-end jewelry ateliers. Per-piece tracking, gemstone attributes, custom order workflows, and real-time valuation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
