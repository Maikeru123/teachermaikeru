"use client"

import { Download, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { ThemeToggle } from "./theme-toggle"

const links = [
  { label: "Projects", id: "projects" },
  { label: "Teaching", id: "teaching" },
  { label: "Technical", id: "technical" },
  { label: "Education", id: "education" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
] as const

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsMenuOpen(false); menuButton.current?.focus() }
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const resize = () => { if (desktop.matches) setIsMenuOpen(false) }
    document.addEventListener("pointerdown", dismiss)
    document.addEventListener("keydown", escape)
    desktop.addEventListener("change", resize)
    return () => {
      document.removeEventListener("pointerdown", dismiss)
      document.removeEventListener("keydown", escape)
      desktop.removeEventListener("change", resize)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const updateActiveSection = () => {
      const current = [...links].reverse().find(({ id }) => {
        const section = document.getElementById(id)
        return section && section.getBoundingClientRect().top <= 150
      })

      setActiveSection(current?.id ?? null)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-[60] border-b border-border/70 bg-background/85 py-3 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
      <div className="page-container relative flex items-center justify-between gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <a
        href="/VelezMichaelResume.pdf"
        download
        className="inline-flex min-h-11 justify-self-start items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[11px] font-medium text-foreground shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:shadow-[0_6px_18px_rgba(0,0,0,0.3)]"
      >
        <Download className="size-3.5" strokeWidth={1.8} />
        Download resume
      </a>
      <nav className="hidden items-center gap-1 text-[11px] font-medium lg:flex" aria-label="Main navigation">
        {links.map(({ label, id }) => (
          <a
            className={`inline-flex min-h-11 items-center rounded-full border-b-2 px-3 py-2 transition-[background-color,color,border-color,box-shadow,opacity] duration-300 ${activeSection === id ? "border-accent bg-accent text-accent-foreground shadow-sm" : "border-transparent text-muted-foreground hover:bg-surface hover:text-accent-hover"}`}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => setActiveSection(id)}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex shrink-0 items-center justify-self-end gap-2">
        <button
          type="button"
          ref={menuButton}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
        <ThemeToggle />
      </div>
      {isMenuOpen && <nav id="mobile-navigation" data-lenis-prevent className="absolute inset-x-4 top-[calc(100%+0.75rem)] max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-sm border border-border bg-card p-2 shadow-[0_12px_28px_rgba(0,0,0,0.12)] lg:hidden dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)]" aria-label="Mobile navigation">
        {links.map(({ label, id }) => (
          <a
            className={`block rounded-sm border-l-2 px-3 py-3 text-sm font-medium transition-colors ${activeSection === id ? "border-accent bg-accent text-accent-foreground" : "border-transparent text-muted-foreground hover:bg-background hover:text-accent-hover"}`}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => { setActiveSection(id); setIsMenuOpen(false) }}
          >
            {label}
          </a>
        ))}
      </nav>}
      </div>
    </header>
  )
}
