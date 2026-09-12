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
      className={`fixed bottom-6 right-6 z-[60] inline-flex size-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-5" strokeWidth={1.8} />
    </button>
  )
}
