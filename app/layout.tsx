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
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ydTAvJeSkOqdFVgsdMKB74YuDfKUYP.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: `(() => { try { if (sessionStorage.getItem('lupo-intro') === '1') document.documentElement.dataset.lupoIntroSeen = '1'; else { document.documentElement.removeAttribute('data-lupo-intro-seen'); document.body.classList.add('lupo-intro-active') } } catch (_) {} })()` }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
