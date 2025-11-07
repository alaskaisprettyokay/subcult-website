import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Subcult — Discover underground communities',
  description: 'Local music scenes as self-managed micro-economies. Join the private beta.',
  openGraph: {
    title: 'Subcult — Discover underground communities',
    description: 'Local music scenes as self-managed micro-economies. Join the private beta.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}

