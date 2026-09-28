"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
}

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = revealRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.classList.add("is-visible")
        observer.unobserve(element)
      },
      // Tall sections must still reveal in short landscape viewports.
      { rootMargin: "0px 0px -24px 0px", threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="scroll-reveal" ref={revealRef} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
