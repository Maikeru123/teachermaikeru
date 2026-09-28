"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 500)
    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`fixed bottom-6 right-6 z-[60] inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-[background-color,color,box-shadow,opacity,transform] duration-300 hover:-translate-y-1 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      onClick={() => window.dispatchEvent(new CustomEvent("lenis:scroll-to", { detail: 0 }))}
    >
      <ArrowUp className="size-5" strokeWidth={1.8} />
    </button>
  )
}
