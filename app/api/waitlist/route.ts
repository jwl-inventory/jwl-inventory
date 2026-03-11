import { NextRequest, NextResponse } from 'next/server'

// Email validation regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    // ── Option A: Resend (recommended) ──────────────────────────────────────
    // Requires RESEND_API_KEY in .env.local and an audience created in Resend.
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    //   unsubscribed: false,
    // })

    // ── Option B: Supabase table ─────────────────────────────────────────────
    // Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
    //
    // import { createClient } from '@supabase/supabase-js'
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // )
    // const { error } = await supabase.from('waitlist').insert({ email })
    // if (error) {
    //   if (error.code === '23505') {
    //     return NextResponse.json({ message: 'You\'re already on the list!' }, { status: 200 })
    //   }
    //   throw error
    // }

    // ── Temporary: log to console until an option above is wired up ──────────
    console.log(`[waitlist] new signup: ${email}`)

    return NextResponse.json(
      { message: 'You\'re on the list. We\'ll be in touch soon.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
