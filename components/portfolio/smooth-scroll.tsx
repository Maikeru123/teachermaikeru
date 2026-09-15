"use client"

import Lenis from "lenis"
import { useEffect } from "react"

/** Adds unobtrusive page scrolling while leaving dialogs and form controls native. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      lerp: 0.2,
      syncTouch: false,
      overscroll: false,
      anchors: { offset: -88 },
      respectReducedMotion: true,
      prevent: (node) => Boolean(node.closest("dialog, input, textarea, select, [contenteditable='true'], [data-lenis-prevent]")),
    })

    const scrollTo = (event: Event) => lenis.scrollTo((event as CustomEvent<number>).detail, { duration: 0.85 })
    window.addEventListener("lenis:scroll-to", scrollTo)

    return () => {
      window.removeEventListener("lenis:scroll-to", scrollTo)
      lenis.destroy()
    }
  }, [])

  return children
}
