'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock3, Coffee, Camera, MapPin, MessageCircle, Sun, Users } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

const photos = [
  ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85','Coffee ritual'],
  ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85','The dining room'],
  ['https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=85','Slow mornings'],
  ['https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=85','Padel under lights'],
  ['https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85','Shared plates'],
  ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85','The coffee bar'],
  ['https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85','Golden hour'],
  ['https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=900&q=85','Late dinner'],
] as const

const bentoPhotos = photos.slice(0, 4)
const galleryPhotos = photos.slice(4)

function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const shell = document.getElementById('lupo-intro-shell')
    const skip = document.getElementById('lupo-intro-skip')
    if (!shell || document.documentElement.classList.contains('lupo-intro-seen')) {
      onDone()
      return
    }
    document.documentElement.classList.add('lupo-intro-active')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let exitTimer: number | undefined
    const finish = () => {
      shell.classList.add('is-exiting')
      exitTimer = window.setTimeout(() => {
        try { sessionStorage.setItem('lupo-intro', '1') } catch {}
        document.documentElement.classList.remove('lupo-intro-active')
        shell.remove()
        onDone()
      }, reducedMotion ? 300 : 850)
    }
    const introTimer = window.setTimeout(finish, reducedMotion ? 300 : 2000)
    const failsafeTimer = window.setTimeout(finish, 3500)
    const handleSkip = () => finish()
    skip?.addEventListener('click', handleSkip)
    return () => {
      window.clearTimeout(introTimer)
      window.clearTimeout(failsafeTimer)
      if (exitTimer) window.clearTimeout(exitTimer)
      skip?.removeEventListener('click', handleSkip)
    }
  }, [onDone])
  return null
}

function Header({ lang, setLang }: { lang: string, setLang: (l:string)=>void }) { return <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10"><Link href="/" aria-label="LUPO home" className="block h-12 w-12 overflow-hidden rounded-full"><Image src="/lupo-logo.svg" alt="LUPO" width={96} height={96} className="size-full object-cover" priority /></Link><nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[.22em] text-[#A9A38F] md:flex"><a href="#vibe" className="hover:text-[#D4B98A]">Vibe</a><a href="#padel" className="hover:text-[#D4B98A]">Padel</a><Link href="/menu" className="hover:text-[#D4B98A]">Menu</Link><a href="#visit" className="hover:text-[#D4B98A]">Visit</a></nav><button onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')} className="lupo-secondary inline-flex items-center px-3 py-2 text-[10px]" aria-label="Toggle language">{lang === 'EN' ? 'عربي' : 'EN'}</button></header> }

const t = { EN: { kicker:'Cafe · Padel · Restaurant', title:'Taste of Luxury', place:'Ring Road, Mansoura', explore:'Explore the menu', book:'Book a court / Padel', vibe:'A place with a pulse', vibeText:'Where considered design meets the energy of the game, and every cup has a story.', featured:'The Lupo edit', menuText:'A considered menu for long afternoons and late-night rituals.', padel:'Play after dark', padelText:'Two panoramic courts, floodlit for the golden hour and beyond.', visit:'Find your way to Lupo' }, AR: { kicker:'كافيه · بادل · مطعم', title:'طعم الفخامة', place:'الطريق الدائري، المنصورة', explore:'اكتشف القائمة', book:'احجز ملعب بادل', vibe:'مكان ينبض بالحياة', vibeText:'حيث يلتقي التصميم المدروس بطاقة اللعب، وكل فنجان له حكايته.', featured:'اختيارات LUPO', menuText:'قائمة مختارة لأمسيات طويلة وطقوس ليلية.', padel:'العب بعد الغروب', padelText:'ملعبان بانوراميان بإضاءة مثالية للساعة الذهبية وما بعدها.', visit:'طريقك إلى LUPO' } }

export default function Home() { const [ready,setReady]=useState(false); const [lang,setLang]=useState('EN'); const copy=t[lang as 'EN'|'AR']; const handleIntroDone = useCallback(() => setReady(true), []); return <><Intro onDone={handleIntroDone} /> <div dir={lang==='AR'?'rtl':'ltr'}><Header lang={lang} setLang={setLang}/><main>
  <section className="hero-glow grain relative flex min-h-[calc(100svh-5rem)] overflow-hidden px-5 pb-32 pt-[25svh] sm:px-10 sm:pb-36 md:min-h-screen md:items-center md:pb-28 md:pt-28"><div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#14241A_78%)]"/><div className="absolute left-1/2 top-[12%] z-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#D4B98A] opacity-20 blur-3xl md:top-[4%] md:h-[760px] md:w-[760px]"/><div className="hero-wolf pointer-events-none absolute right-[-12vw] top-[8vh] z-0 h-[70vw] w-[70vw] max-h-[700px] max-w-[700px] opacity-30 md:right-[8%] md:top-[8%] md:opacity-35" aria-hidden="true"><svg viewBox="0 0 1080 1080" className="size-full"><use href="/lupo-logo.svg#wolf" /></svg></div><div className={`relative z-10 max-w-3xl ${ready ? 'reveal' : 'opacity-0'}`}><p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D4B98A]">{copy.kicker}</p><h1 className="font-display text-6xl leading-[.92] tracking-[-.04em] text-[#F2E8D5] sm:text-8xl md:text-[9rem]">{copy.title}</h1><div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#A9A38F]"><MapPin className="size-4 text-[#D4B98A]"/> {copy.place}</div><div className="mt-7 flex flex-wrap gap-3"><Link href="/menu" className="lupo-primary inline-flex items-center">{copy.explore}</Link><a href="#padel" className="lupo-secondary inline-flex items-center">{copy.book}</a></div></div><a href="#vibe" className="lupo-text-link absolute bottom-20 left-1/2 z-10 w-max -translate-x-1/2 whitespace-nowrap">Scroll to explore</a></section>
  <div className="overflow-hidden border-y border-[#D4B98A]/20 py-4"><div className="marquee-track flex gap-8 whitespace-nowrap text-[11px] uppercase tracking-[.3em] text-[#D4B98A]">{Array(4).fill('Specialty Coffee · Padel Courts · Fine Dining · Takeaway ·').map((x,i)=><span key={i}>{x}</span>)}</div></div>
  <section id="vibe" className="mx-auto max-w-7xl px-5 py-24 pb-32 sm:px-10 md:py-36 md:pb-36"><div className="mb-12 max-w-xl"><p className="mb-4 text-xs uppercase tracking-[.28em] text-[#D4B98A]">01 / The house</p><h2 className="font-display text-5xl leading-none sm:text-7xl">{copy.vibe}</h2><p className="mt-6 text-base leading-7 text-[#A9A38F]">{copy.vibeText}</p></div><div className="grid auto-rows-[220px] gap-3 md:grid-cols-3 md:auto-rows-[260px]"><Vibe image={bentoPhotos[0]} title="Cafe" cls="md:col-span-2"/><Vibe image={bentoPhotos[1]} title="Restaurant"/><Vibe image={bentoPhotos[2]} title="Takeaway"/><Vibe image={bentoPhotos[3]} title="Padel" cls="md:col-span-2"/></div></section>
  <section className="bg-[#1B3023] px-5 py-24 pb-32 sm:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs uppercase tracking-[.28em] text-[#D4B98A]">02 / Menu</p><h2 className="font-display text-5xl sm:text-7xl">{copy.featured}</h2><p className="mt-4 max-w-md text-[#A9A38F]">{copy.menuText}</p></div><Link href="/menu" className="lupo-text-link">Explore full menu</Link></div><div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-5"><MenuCard image={galleryPhotos[0][0]} name="Pistachio Cloud" price="185 EGP"/><MenuCard image={galleryPhotos[1][0]} name="Spanish Latte" price="160 EGP"/><MenuCard image={galleryPhotos[2][0]} name="Lupo Spritz" price="195 EGP"/></div></div></section>
  <section id="padel" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-36"><div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Image src={photos[3][0]} alt={photos[3][1]} fill className="object-cover"/><div className="absolute inset-0 bg-[#14241A]/25"/></div><div><p className="mb-4 text-xs uppercase tracking-[.28em] text-[#D4B98A]">03 / Padel</p><h2 className="font-display text-5xl leading-none sm:text-7xl">{copy.padel}</h2><p className="mt-6 leading-7 text-[#A9A38F]">{copy.padelText}</p><div className="my-8 grid grid-cols-3 gap-3 border-y border-[#D4B98A]/20 py-5"><Stat icon={<Users/>} value={siteConfig.padel.courts} label="Courts"/><Stat icon={<Sun/>} value={siteConfig.padel.lighting} label="Lighting"/><Stat icon={<Clock3/>} value={siteConfig.padel.hours} label="Hours"/></div><a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="lupo-primary inline-flex items-center gap-3"><MessageCircle className="size-4"/>Call / WhatsApp to book</a></div></section>
  <section className="border-y border-[#D4B98A]/20 bg-[#D4B98A] px-5 py-10 text-[#14241A] sm:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5"><div className="flex items-center gap-4"><Coffee className="size-8"/><div><p className="font-display text-2xl">Coffee, on your way.</p><p className="text-sm opacity-70">Your daily ritual, wrapped to go.</p></div></div><a href="#visit" className="text-xs font-bold uppercase tracking-[.2em] underline underline-offset-8">Find us</a></div></section>
  <section className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-36"><div className="mb-10 flex items-end justify-between"><div><p className="mb-4 text-xs uppercase tracking-[.28em] text-[#D4B98A]">04 / In the wild</p><h2 className="font-display text-5xl sm:text-7xl">The Lupo mood</h2></div><a href="https://instagram.com/lupoegy" className="hidden items-center gap-2 text-xs uppercase tracking-[.2em] text-[#D4B98A] sm:flex">@lupoegy <Camera className="size-4"/></a></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{galleryPhotos.map(([src,alt],i)=><div key={src} className={`relative overflow-hidden rounded-2xl ${i===1?'aspect-[3/4] md:mt-12':'aspect-square'}`}><Image src={src} alt={alt} fill className="object-cover transition duration-700 hover:scale-105"/></div>)}</div></section>
  <section id="visit" className="border-t border-[#D4B98A]/20 px-5 py-24 sm:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2"><div><p className="mb-4 text-xs uppercase tracking-[.28em] text-[#D4B98A]">05 / Visit</p><h2 className="font-display text-5xl sm:text-7xl">{copy.visit}</h2></div><div className="flex flex-col gap-6 text-[#A9A38F]"><p className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-[#D4B98A]"/>High Way, opposite Fantazya<br/>Ring Road, Mansoura, Egypt</p><p className="flex gap-4"><Clock3 className="mt-1 size-5 shrink-0 text-[#D4B98A]"/>Every day · {siteConfig.padel.hours}</p><div className="flex gap-5"><a href="https://instagram.com/lupoegy" className="text-[#D4B98A] underline underline-offset-8">Instagram</a><a href="https://linktr.ee/lupoegy" className="text-[#D4B98A] underline underline-offset-8">Linktree</a><a href={siteConfig.contact.mapUrl} className="text-[#D4B98A] underline underline-offset-8">Open map</a></div></div></div></section>
 </main><footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[#D4B98A]/20 px-5 pb-[calc(env(safe-area-inset-bottom)+7rem)] pt-8 text-xs text-[#A9A38F] sm:px-10"><Image src="/lupo-logo.svg" alt="LUPO" width={56} height={56} className="size-14 rounded-full object-cover" /><span>© 2026 Lupo Mansoura</span></footer><div className="fixed bottom-[calc(env(safe-area-inset-bottom)+12px)] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 border border-[#D4B98A]/30 bg-[#14241A]/95 p-1.5 backdrop-blur-xl md:hidden"><a href="#vibe" className="min-h-11 px-4 py-3 text-[10px] uppercase tracking-wider">Home</a><a href="#padel" className="min-h-11 px-4 py-3 text-[10px] uppercase tracking-wider">Padel</a><Link href="/menu" className="lupo-primary min-h-11 px-4 py-3 text-[10px]">Menu</Link><a href="#visit" className="min-h-11 px-4 py-3 text-[10px] uppercase tracking-wider">Visit</a></div></div></> }
function Vibe({image,title,cls=''}:{image:string[],title:string,cls?:string}) { return <div className={`group relative overflow-hidden rounded-2xl ${cls}`}><Image src={image[0]} alt={image[1]} fill className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/80 to-transparent"/><div className="absolute bottom-5 left-5 flex items-center gap-2"><span className="size-2 rounded-full bg-[#D4B98A]"/><h3 className="font-display text-3xl">{title}</h3></div></div> }
function MenuCard({image,name,price}:{image:string,name:string,price:string}) { return <article className="min-w-[78%] snap-start sm:min-w-[42%] md:min-w-[31%]"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><Image src={image} alt={name} fill className="object-cover"/></div><div className="flex justify-between pt-4"><h3 className="font-display text-2xl">{name}</h3><span className="text-sm text-[#D4B98A]">{price}</span></div></article> }
function Stat({icon,value,label}:{icon:React.ReactNode,value:string,label:string}) { return <div><div className="mb-2 text-[#D4B98A] [&>svg]:size-4">{icon}</div><strong className="font-display text-2xl">{value}</strong><p className="text-xs text-[#A9A38F]">{label}</p></div> }
