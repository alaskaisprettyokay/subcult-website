'use server'

import { supabase } from '@/lib/supabase'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address' }
  }

  // Try Supabase first if configured
  if (supabase) {
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ 
          email, 
          city,
          user_type: userType,
          referral: referral || null
        })

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505' || error.message.includes('unique')) {
          return { success: false, error: 'Already joined' }
        }
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (err) {
      console.error('Supabase error:', err)
      // Fall through to JSON fallback
    }
  }

  // Fallback to local JSON file (dev only)
  if (process.env.NODE_ENV === 'development') {
    try {
      const dataDir = path.join(process.cwd(), '.data')
      const filePath = path.join(dataDir, 'subscribers.json')

      // Ensure .data directory exists
      if (!existsSync(dataDir)) {
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
      }

      // Check for duplicate
      if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'Already joined' }
      }

      // Add new subscriber
      subscribers.push({
        email,
        city: city || null,
        user_type: userType,
        referral: referral || null,
        created_at: new Date().toISOString(),
      })

      // Write back to file
      await writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf-8')

      return { success: true }
    } catch (err) {
      console.error('File write error:', err)
      return { success: false, error: 'Failed to save subscription' }
    }
  }

  return { success: false, error: 'Subscription service unavailable' }
}

