'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

/** Total intro length. The overlay's own CSS exit animation completes at 2.2s. */
const INTRO_MS = 2200
const SEEN_KEY = 'lupo-intro-seen'
/** Set on <html> only while the intro runs. It gates the hero entrance animation and nothing else. */
const RUNNING_CLASS = 'intro-running'

/**
 * useLayoutEffect on the client so a returning visitor's overlay is removed BEFORE the browser
 * paints (no flash); useEffect on the server, where layout effects do not run and React warns.
 */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Self-contained loading intro, mounted once from the root layout so every route behaves the same.
 *
 * The overlay is decorative: the page underneath is fully rendered from the start and nothing about
 * the hero's visibility depends on this component. If JS never runs the hero renders normally; if
 * this component crashes the hero has already been revealed. A stylesheet-level failsafe keeps the
 * overlay honest on its own - its exit animation ends in `visibility:hidden`, so even with no JS the
 * overlay stops blocking input after 2.2s.
 */
export default function LupoIntro() {
  const [dismissed, setDismissed] = useState(false)

  useIsomorphicLayoutEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      // Storage blocked (private mode, disabled cookies). Play the intro rather than risk a crash;
      // a failed read must never stop the site from rendering.
    }

    if (alreadySeen) {
      setDismissed(true)
      return
    }

    document.documentElement.classList.add(RUNNING_CLASS)

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // Ignore write failures: worst case the intro replays next visit.
      }
      document.documentElement.classList.remove(RUNNING_CLASS)
      setDismissed(true)
    }, INTRO_MS)

    return () => {
      window.clearTimeout(timer)
      // Always restore, so a Strict Mode double-invoke or an early unmount cannot leave the hero
      // pinned at opacity 0.
      document.documentElement.classList.remove(RUNNING_CLASS)
    }
  }, [])

  if (dismissed) return null

  return (
    <div className="lupo-intro" aria-hidden="true">
      <div className="lupo-intro-mark">
        {/* Inlined from /public/lupo-logo.svg (frame + wolf + wordmark) so the mark is on screen at
            first paint with no network round-trip. Identical artwork, not a redraw. */}
        <svg className="lupo-intro-logo" viewBox="0 0 1080 1080" focusable="false">
          <g fill="none" stroke="#D4B98A" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="4" d="M177 322c-9 91-5 167 24 247M903 322c9 91 5 167-24 247M275 708c48 63 106 120 160 164M805 708c-48 63-106 120-160 164" />
            <path strokeWidth="3" d="M225 594c-27 14-35 49-21 81 13 30 42 47 72 51 11-29 16-61 5-89-10-25-30-39-56-43Z" />
            <path strokeWidth="3" d="M855 594c27 14 35 49 21 81-13 30-42 47-72 51-11-29-16-61-5-89 10-25 30-39 56-43Z" />
            <path strokeWidth="3" d="M231 602c18 18 16 53 23 75M849 602c-18 18-16 53-23 75" />
          </g>
          <g fill="#D4B98A">
            <path d="M292 413c64-63 124-68 170-67-9-71 0-119 16-157 38 55 73 91 113 115l26-40c23 47 52 72 91 87 24 9 47 15 61 37 13 20 37 29 62 43l77 45c-12 23-27 30-51 35-9 24-25 31-47 29-43-5-76-14-113-13-53 1-101 14-145 31l-19-5 20-45c-65 10-121 32-168 70-45 36-70 78-91 124-20-55-18-99-2-140 15-39 43-76 76-104 17-14 34-27 51-38-22 2-50 15-78 39l-36 32c-4-20-4-40 3-58Z" />
            <path d="M470 486c-57 72-78 141-65 211 6 33 21 66 46 94-17-57-17-121 1-177 15-47 38-84 72-119l-54-9Z" />
            <path d="M659 403c25 1 52 12 73 30-16-5-34-7-53-6l-30-24 10 0Z" />
            <path d="M518 687c-4 43 6 80 34 119l-30 19c-29-34-43-76-39-118 4-43 19-80 46-110-10 31-13 60-11 90Z" />
          </g>
          <g fill="#D4B98A" fontFamily="Georgia,Times New Roman,serif" fontWeight="700" textAnchor="middle">
            <text x="540" y="231" fontSize="65" letterSpacing="9">Taste of Luxury</text>
            <text x="540" y="932" fontSize="64" letterSpacing="9">LUPO</text>
          </g>
        </svg>
        <span className="lupo-intro-rule" />
      </div>
    </div>
  )
}