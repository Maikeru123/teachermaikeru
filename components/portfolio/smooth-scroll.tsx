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
      // Lenis reads the shared scroll-padding-top from CSS.
      anchors: true,
      respectReducedMotion: true,
      prevent: (node) => Boolean(node.closest("dialog, input, textarea, select, [contenteditable='true'], [data-lenis-prevent]")),
    })

    const scrollTo = (event: Event) => lenis.scrollTo((event as CustomEvent<number>).detail, { duration: 0.85 })
    const pause = () => lenis.stop()
    const resume = () => { lenis.start(); lenis.resize() }
    window.addEventListener("lenis:scroll-to", scrollTo)
    window.addEventListener("lenis:pause", pause)
    window.addEventListener("lenis:resume", resume)

    return () => {
      window.removeEventListener("lenis:scroll-to", scrollTo)
      window.removeEventListener("lenis:pause", pause)
      window.removeEventListener("lenis:resume", resume)
      lenis.destroy()
    }
  }, [])

  return children
}
