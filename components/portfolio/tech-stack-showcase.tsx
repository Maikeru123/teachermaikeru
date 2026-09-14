import { Braces, Code2, Database, FileCode2, Flame, GitBranch, ServerCog, Smartphone, Wind } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Technology = {
  name: string
  icon: LucideIcon
}

const techFlips: { front: Technology; back: Technology }[] = [
  { front: { name: "Next.js", icon: Code2 }, back: { name: "Flutter", icon: Smartphone } },
  { front: { name: "TypeScript", icon: Braces }, back: { name: "Dart", icon: Code2 } },
  { front: { name: "Tailwind CSS", icon: Wind }, back: { name: "Laravel", icon: ServerCog } },
  { front: { name: "MySQL", icon: Database }, back: { name: "Git", icon: GitBranch } },
  { front: { name: "PHP", icon: FileCode2 }, back: { name: "Firebase", icon: Flame } },
  { front: { name: "Flutter", icon: Smartphone }, back: { name: "Next.js", icon: Code2 } },
]

export function TechStackShowcase({ compact = false }: { compact?: boolean }) {
  const visibleTechFlips = compact ? techFlips.slice(0, 3) : techFlips

  return (
    <aside className={compact ? "hero-tech-mobile" : "hero-tech-showcase"} aria-label="Technology stack">
      {visibleTechFlips.map(({ front, back }, index) => {
        const FrontIcon = front.icon
        const BackIcon = back.icon

        return (
          <article className={`tech-flip-card tech-flip-card--${index + 1}`} key={`${front.name}-${back.name}`}>
            <div className="tech-flip-card__inner">
              <div className="tech-flip-card__face tech-flip-card__front">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><FrontIcon className="size-4" strokeWidth={1.75} /></span>
                <span className="truncate text-sm font-semibold">{front.name}</span>
              </div>
              <div className="tech-flip-card__face tech-flip-card__back">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><BackIcon className="size-4" strokeWidth={1.75} /></span>
                <span className="truncate text-sm font-semibold">{back.name}</span>
              </div>
            </div>
          </article>
        )
      })}
    </aside>
  )
}
