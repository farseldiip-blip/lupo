export const siteConfig = {
  padel: {
    courts: '02',
    lighting: 'Floodlit',
    hours: '10:00 — 02:00',
  },
  contact: {
    whatsapp: '201000000000',
    mapUrl: 'https://maps.google.com/?q=Fantazya+Mansoura',
  },
} as const

export type SiteConfig = typeof siteConfig
