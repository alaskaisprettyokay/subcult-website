/**
 * Test script to verify Supabase connection
 * Run with: npx tsx scripts/test-supabase.ts
 * Or: node --loader ts-node/esm scripts/test-supabase.ts
 * 
 * Make sure you have .env.local with:
 * NEXT_PUBLIC_SUPABASE_URL=your-url
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Simple .env.local parser (no dotenv dependency needed)
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const envFile = readFileSync(envPath, 'utf-8')
    const lines = envFile.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
          process.env[key.trim()] = value
        }
      }
    }
  } catch (err) {
    // .env.local doesn't exist, that's okay
  }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Checking Supabase configuration...\n')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase not configured!')
  console.log('\nMissing environment variables:')
  if (!supabaseUrl) console.log('  - NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.log('\n📝 To set up:')
  console.log('1. Create a .env.local file in the project root')
  console.log('2. Add your Supabase credentials:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
  console.log('\nSee VERCEL_SETUP.md for detailed instructions.')
  process.exit(1)
}

console.log('✅ Environment variables found')
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`)
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...\n`)

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔌 Testing Supabase connection...\n')

  try {
    // Test 1: Check if we can query the subscribers table
    console.log('1️⃣ Testing table access...')
    const { data, error } = await supabase
      .from('subscribers')
      .select('count')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.error('❌ Table "subscribers" does not exist!')
        console.log('\n📝 To create the table:')
        console.log('1. Go to your Supabase project')
        console.log('2. Open SQL Editor')
        console.log('3. Run this SQL:')
        console.log(`
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  city text,
  user_type text not null check (user_type in ('user', 'curator')),
  referral text,
  created_at timestamp with time zone default now()
);
        `)
        process.exit(1)
      } else {
        throw error
      }
    }

    console.log('✅ Table access successful')
    console.log(`   Found ${data?.length || 0} records\n`)

    // Test 2: Try inserting a test record (then delete it)
    console.log('2️⃣ Testing insert capability...')
    const testEmail = `test-${Date.now()}@example.com`
    const { data: insertData, error: insertError } = await supabase
      .from('subscribers')
      .insert({
        email: testEmail,
        user_type: 'user',
        city: 'Test City',
        referral: 'test-script'
      })
      .select()

    if (insertError) {
      throw insertError
    }

    console.log('✅ Insert successful')
    console.log(`   Inserted: ${insertData?.[0]?.email}\n`)

    // Test 3: Clean up test record
    console.log('3️⃣ Cleaning up test record...')
    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('email', testEmail)

    if (deleteError) {
      console.warn('⚠️  Could not delete test record (not critical)')
    } else {
      console.log('✅ Test record deleted\n')
    }

    console.log('🎉 All tests passed! Supabase is configured correctly.')
    console.log('\n✅ Your subscription service should work now!')

  } catch (error: any) {
    console.error('\n❌ Connection test failed!')
    console.error(`   Error: ${error.message}`)
    console.error(`   Code: ${error.code || 'N/A'}`)
    console.error(`   Details: ${error.details || 'N/A'}`)
    console.error(`   Hint: ${error.hint || 'N/A'}\n`)
    
    if (error.message.includes('JWT')) {
      console.log('💡 This might be an authentication issue. Check your anon key.')
    }
    
    process.exit(1)
  }
}

testConnection()

