"use client"

import { Download, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

import { ThemeToggle } from "./theme-toggle"

const links = [
  { label: "Work", id: "work" },
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
    <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between border-b border-border/70 bg-background/85 px-5 py-3 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:px-[4.5%] sm:py-4 dark:shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
      <a
        href="/VelezMichaelResume.pdf"
        download
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[11px] font-medium text-zinc-950 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground dark:text-zinc-100 dark:shadow-[0_6px_18px_rgba(0,0,0,0.3)]"
      >
        <Download className="size-3.5" strokeWidth={1.8} />
        Download resume
      </a>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-[11px] font-medium md:flex" aria-label="Main navigation">
        {links.map(({ label, id }) => (
          <a
            className={`rounded-full px-3 py-2 transition-all duration-300 ${activeSection === id ? "bg-zinc-950 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-950" : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"}`}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => setActiveSection(id)}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:hidden dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
        <ThemeToggle />
      </div>
      {isMenuOpen && <nav className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-sm border border-border bg-card p-2 shadow-[0_12px_28px_rgba(0,0,0,0.12)] md:hidden dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)]" aria-label="Mobile navigation">
        {links.map(({ label, id }) => (
          <a
            className={`block rounded-sm px-3 py-3 text-sm font-medium transition-colors ${activeSection === id ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => { setActiveSection(id); setIsMenuOpen(false) }}
          >
            {label}
          </a>
        ))}
      </nav>}
    </header>
  )
}
