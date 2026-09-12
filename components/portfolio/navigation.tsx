"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Availability } from "./primitives"
import { ThemeToggle } from "./theme-toggle"

const links = [
  { label: "Work", id: "work" },
  { label: "Teaching", id: "teaching" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Certificates", id: "certificates" },
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
    <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between border-b border-zinc-200/70 bg-white/85 px-5 py-3 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:px-[4.5%] sm:py-4 dark:border-zinc-700/80 dark:bg-zinc-950/85 dark:shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
      <Availability />
      <nav className="hidden items-center gap-1 text-[11px] font-medium md:flex" aria-label="Main navigation">
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
      {isMenuOpen && <nav className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-sm border border-zinc-200 bg-white p-2 shadow-[0_12px_28px_rgba(0,0,0,0.12)] md:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-[0_12px_28px_rgba(0,0,0,0.4)]" aria-label="Mobile navigation">
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
