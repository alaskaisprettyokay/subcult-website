import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const mono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
})
const clash = localFont({
  src: [
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-clash',
})

export const metadata: Metadata = {
  title: 'Subcult — Discover underground communities',
  description: 'Local music scenes as self-managed micro-economies. Join the private beta.',
  openGraph: {
    title: 'Subcult — Discover underground communities',
    description: 'Local music scenes as self-managed micro-economies. Join the private beta.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // For iOS notch support
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${clash.variable} font-sans`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
