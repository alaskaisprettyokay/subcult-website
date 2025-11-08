'use server'

import { createClient } from '@supabase/supabase-js'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Create Supabase client in server action (environment variables are available here)
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }
  return null
}

export interface SubscribeResult {
  success: boolean
  error?: string
}

export async function subscribe(
  email: string,
  userType: 'curator' | 'user',
  city?: string,
  referral?: string
): Promise<SubscribeResult> {
  // Normalize email (lowercase, trim)
  const normalizedEmail = email.toLowerCase().trim()
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(normalizedEmail)) {
    return { success: false, error: 'Invalid email address' }
  }

  // Check environment
  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  console.log('Subscribe attempt:', {
    email: normalizedEmail,
    userType,
    hasSupabase,
    isVercel: !!process.env.VERCEL,
    nodeEnv: process.env.NODE_ENV
  })

  // Try Supabase first if configured
  const supabase = getSupabaseClient()
  if (supabase && hasSupabase) {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert({ 
          email: normalizedEmail, 
          city: city ? city.trim() : null,
          user_type: userType,
          referral: referral ? referral.trim() : null
        })
        .select()

      if (error) {
        console.error('Supabase insert error:', error)
        // Check if it's a duplicate email error
        if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
          return { success: false, error: 'ALREADY_ON_LIST' }
        }
        return { success: false, error: error.message || 'Database error' }
      }

      console.log('Supabase success:', data)
      return { success: true }
    } catch (err) {
      console.error('Supabase exception:', err)
      // Fall through to JSON fallback
    }
  } else {
    console.log('Supabase not configured, using JSON fallback')
  }

  // Fallback to local JSON file (works in dev, may not work in production/serverless)
  try {
    const dataDir = path.join(process.cwd(), '.data')
    const filePath = path.join(dataDir, 'subscribers.json')

    console.log('Attempting JSON fallback:', { dataDir, filePath })

    // Ensure .data directory exists
    if (!existsSync(dataDir)) {
      console.log('Creating .data directory')
      await mkdir(dataDir, { recursive: true })
    }

    // Read existing data
    let subscribers: Array<{ 
      email: string
      city?: string | null
      user_type: string
      referral?: string | null
      created_at: string 
    }> = []
    if (existsSync(filePath)) {
      const content = await readFile(filePath, 'utf-8')
      subscribers = JSON.parse(content)
      console.log('Read existing subscribers:', subscribers.length)
    } else {
      console.log('No existing subscribers file')
    }

    // Check for duplicate (case-insensitive)
    if (subscribers.some((s) => s.email.toLowerCase().trim() === normalizedEmail)) {
      return { success: false, error: 'ALREADY_ON_LIST' }
    }

    // Add new subscriber
    const newSubscriber = {
      email: normalizedEmail,
      city: city ? city.trim() : null,
      user_type: userType,
      referral: referral ? referral.trim() : null,
      created_at: new Date().toISOString(),
    }
    subscribers.push(newSubscriber)

    console.log('Writing subscribers:', subscribers.length)

    // Write back to file
    await writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf-8')

    console.log('Successfully saved to JSON file')
    return { success: true }
  } catch (err: any) {
    console.error('File write error:', err)
    console.error('Error details:', {
      message: err?.message,
      code: err?.code,
      stack: err?.stack
    })
    
    // In production/serverless (Vercel), file writes don't work
    // User needs to configure Supabase
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      return { 
        success: false, 
        error: 'Subscription service not configured. Please configure Supabase environment variables in Vercel. See VERCEL_SETUP.md for instructions.' 
      }
    }
    return { 
      success: false, 
      error: `Failed to save subscription: ${err?.message || 'Unknown error'}` 
    }
  }
}


