"use client"

import { Braces, Code2, Database, FileCode2, Flame, GitBranch, ServerCog, Smartphone, Wind } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Technology = { name: string; icon: LucideIcon }
type TechCard = { front: Technology; back: Technology; flipped: boolean; transitioning: boolean }

const technologies: Technology[] = [
  { name: "Next.js", icon: Code2 }, { name: "React", icon: Code2 }, { name: "TypeScript", icon: Braces }, { name: "JavaScript", icon: FileCode2 }, { name: "Tailwind CSS", icon: Wind }, { name: "HTML", icon: FileCode2 }, { name: "CSS", icon: Wind }, { name: "Laravel", icon: ServerCog }, { name: "PHP", icon: FileCode2 }, { name: "MySQL", icon: Database }, { name: "Supabase", icon: Database }, { name: "Firebase", icon: Flame }, { name: "Flutter", icon: Smartphone }, { name: "Dart", icon: Code2 }, { name: "Git", icon: GitBranch }, { name: "C#", icon: Braces }, { name: "ASP.NET", icon: ServerCog }, { name: "Entity Framework", icon: Database },
]

function makeCards(): TechCard[] {
  return Array.from({ length: 6 }, (_, index) => ({ front: technologies[index], back: technologies[index + 6], flipped: false, transitioning: false }))
}

export function TechStackShowcase({ compact = false }: { compact?: boolean }) {
  const [cards, setCards] = useState<TechCard[]>(makeCards)
  const cardsRef = useRef(cards)
  useEffect(() => { cardsRef.current = cards }, [cards])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const completionTimers = new Set<number>()
    const rotateOne = () => {
      const current = cardsRef.current
      const eligible = current.map((card, index) => !card.transitioning ? index : -1).filter((index) => index >= 0)
      if (!eligible.length) return
      const index = eligible[Math.floor(Math.random() * eligible.length)]
      const occupied = new Set(current.map((card) => (card.flipped ? card.back.name : card.front.name)))
      const candidates = technologies.filter((technology) => !occupied.has(technology.name))
      if (!candidates.length) return
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      const nextCards = current.map((card, cardIndex) => {
        if (cardIndex !== index) return card
        return !card.flipped ? { ...card, back: next, flipped: true, transitioning: true } : { ...card, front: next, flipped: false, transitioning: true }
      })
      cardsRef.current = nextCards
      setCards(nextCards)
      const timer = window.setTimeout(() => {
        completionTimers.delete(timer)
        const settled = cardsRef.current.map((card, cardIndex) => cardIndex === index ? { ...card, transitioning: false } : card)
        cardsRef.current = settled
        setCards(settled)
      }, 650)
      completionTimers.add(timer)
    }
    const first = window.setTimeout(rotateOne, 2200)
    const interval = window.setInterval(rotateOne, 4200)
    return () => { window.clearTimeout(first); window.clearInterval(interval); completionTimers.forEach(window.clearTimeout) }
  }, [])

  const visibleCards = compact ? cards.slice(0, 3) : cards
  return <aside className={compact ? "hero-tech-mobile" : "hero-tech-showcase"} aria-label="Technology stack">
    {visibleCards.map((card, index) => {
      const FrontIcon = card.front.icon
      const BackIcon = card.back.icon
      return <article className={`tech-flip-card${card.flipped ? " is-flipped" : ""}`} key={index}><div className="tech-flip-card__inner">
        <div className="tech-flip-card__face tech-flip-card__front"><span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><FrontIcon className="size-4" strokeWidth={1.75} /></span><span className="truncate text-sm font-semibold">{card.front.name}</span></div>
        <div className="tech-flip-card__face tech-flip-card__back"><span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><BackIcon className="size-4" strokeWidth={1.75} /></span><span className="truncate text-sm font-semibold">{card.back.name}</span></div>
      </div></article>
    })}
  </aside>
}
