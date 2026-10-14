import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lupo-nu.vercel.app'),
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `try { if (sessionStorage.getItem('lupo-intro') === '1') document.documentElement.classList.add('lupo-intro-seen'); else document.documentElement.classList.add('lupo-intro-active') } catch (e) {}` }} />
      </head>
      <body className="antialiased">
        <div id="lupo-intro-shell" className="lupo-intro fixed inset-0 z-[9999]" role="dialog" aria-label="Loading LUPO">
          <div className="lupo-intro-surface" aria-hidden="true"><svg viewBox="0 0 1080 1080" className="lupo-intro-logo"><use href="/lupo-logo.svg#wolf" /><use href="/lupo-logo.svg#frame" /><use href="/lupo-logo.svg#frame-text" /></svg><div className="lupo-intro-progress"><span /></div></div>
          <button id="lupo-intro-skip" className="absolute bottom-8 left-1/2 min-h-11 -translate-x-1/2 px-4 text-xs uppercase tracking-[.28em] text-[#A9A38F] hover:text-[#F2E8D5]">Skip intro</button>
        </div>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
