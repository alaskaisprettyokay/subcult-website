import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const pathExists = (relativePath) => existsSync(join(root, relativePath))

const forbiddenRuntimeSurfaces = [
  'app/_admin/page.tsx',
  'app/api/admin/auth/route.ts',
  'app/api/newsletter/send/route.ts',
]

const forbiddenOperationalArtifacts = [
  '.claude',
  '.cursorrules',
  'CLAUDE.md',
  'VERCEL_SETUP.md',
  'backup',
  'newsite',
  'thoughts',
  'scripts/test-supabase.ts',
  'app/_about',
  'app/_subcult',
  'app/_technical',
]

test('obsolete admin and newsletter runtime surfaces are absent', () => {
  const present = forbiddenRuntimeSurfaces.filter(pathExists)
  assert.deepEqual(present, [])
})

test('internal plans, backup code, and local-agent artifacts are absent', () => {
  const present = forbiddenOperationalArtifacts.filter(pathExists)
  assert.deepEqual(present, [])
})

test('the public email subscription route remains intact', () => {
  const routePath = join(root, 'app/api/email/subscribe/route.ts')
  assert.equal(existsSync(routePath), true)
  const source = readFileSync(routePath, 'utf8')
  assert.match(source, /export\s+async\s+function\s+POST/)
})
