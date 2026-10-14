import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LUPO — Taste of Luxury',
  description: 'Cafe · Padel · Restaurant on the ring road in Mansoura, Egypt.',
  generator: 'v0.app',
  openGraph: {
    title: 'LUPO — Taste of Luxury',
    description: 'Cafe · Padel · Restaurant in Mansoura, Egypt.',
    images: ['/lupo-logo.svg'],
  },
  icons: {
    icon: '/lupo-logo.svg',
    apple: '/lupo-logo.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#14241A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
