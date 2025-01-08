import { NextResponse } from 'next/server'
import { loadJobs, saveJobs } from '@/lib/fileStorage'

export async function GET() {
  const jobs = await loadJobs()
  return NextResponse.json(jobs)
}

export async function POST(request: Request) {
  const jobs = await request.json()
  await saveJobs(jobs)
  return NextResponse.json({ success: true })
}