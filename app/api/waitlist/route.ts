import { NextRequest, NextResponse } from 'next/server'
import { appendFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FILE = join(process.cwd(), 'data', 'waitlist.csv')

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  mkdirSync(join(process.cwd(), 'data'), { recursive: true })
  appendFileSync(FILE, `${new Date().toISOString()},${email}\n`)

  return NextResponse.json({ message: "You're on the list." })
}
