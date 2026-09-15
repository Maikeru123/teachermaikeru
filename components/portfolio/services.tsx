"use client"

import { ChevronDown, Code2, Database, Smartphone, X } from "lucide-react"
import { useState } from "react"

const strengths = [
  {
    title: "WEB DEVELOPMENT",
    description: "Developing responsive, modern websites and web applications with frontend technologies and ASP.NET.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "ASP.NET"],
  },
  {
    title: "MOBILE DEVELOPMENT",
    description: "Building the fundamentals and practical implementation of mobile applications, interfaces, and integrated features.",
    skills: ["Flutter", "Dart", "React Native", "Android Emulator", "Mobile UI Development", "API Integration"],
  },
  {
    title: "DATABASE & BACKEND",
    description: "Working with database design, SQL, data management, and backend services for database-driven applications.",
    skills: ["SQL", "Supabase", "Firebase", "SQLite", "PostgreSQL", "Database Design", "Database Management", "API Integration"],
  },
  {
    title: "OTHER TECHNICAL KNOWLEDGE",
    description: "Supporting technical work through version control, troubleshooting, IT fundamentals, and practical problem solving.",
    skills: ["Git / Version Control", "Computer Troubleshooting", "IT Fundamentals", "Google Maps API", "Algorithms and Problem Solving"],
  },
] as const

const teachingAreas = [
  ["WEB DEVELOPMENT", "Teaching students how modern websites and web applications are designed, developed, and structured.", Code2],
  ["MOBILE DEVELOPMENT", "Teaching the fundamentals and practical implementation of mobile application development.", Smartphone],
  ["DATABASE DEVELOPMENT", "Teaching database design, SQL, data management, relationships, and database-driven applications.", Database],
] as const

const teachingAreaDetails = {
  "WEB DEVELOPMENT": {
    subtitle: "Frontend & Web Technologies",
    cardClass: "border-border bg-card",
    iconClass: "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950",
  },
  "MOBILE DEVELOPMENT": {
    subtitle: "Cross-Platform Applications",
    cardClass: "border-border bg-card",
    iconClass: "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950",
  },
  "DATABASE DEVELOPMENT": {
    subtitle: "Data Design & Management",
    cardClass: "border-border bg-card",
    iconClass: "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950",
  },
} as const

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="teaching" className="section-frame story-section bg-transparent" aria-labelledby="teaching-heading">
      <header className="story-header">
        <p className="story-kicker">WHAT I SHARE</p>
        <h2 id="teaching-heading" className="story-title">TEACHING AREAS</h2>
        <p className="story-summary">The subjects I spend the most time making practical, approachable, and useful for students.</p>
      </header>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {teachingAreas.map(([title, description, Icon]) => {
          const details = teachingAreaDetails[title]

          return (
          <article className={`story-reveal rounded-sm border p-6 shadow-[0_8px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/50 dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)] ${details.cardClass}`} key={title}>
              <span className={`inline-flex size-12 items-center justify-center rounded-full ${details.iconClass}`}><Icon className="size-6" strokeWidth={1.75} /></span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
              <p className="mt-2 text-xs font-medium italic tracking-[0.01em] text-zinc-500 dark:text-zinc-400">{details.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
            </article>
          )
        })}
      </div>
      <header id="technical" className="story-header story-header--technical">
        <p className="story-kicker">WHAT I WORK WITH</p>
        <h2 className="story-title">TECHNICAL SKILLS</h2>
        <p className="story-summary">The tools and working knowledge behind the projects, lessons, and systems I build.</p>
      </header>
      <div className="mt-6">
        {strengths.map((strength, index) => {
          const isOpen = activeIndex === index

          return (
            <article className={`overflow-hidden border-b border-zinc-400 dark:border-zinc-700 ${isOpen ? "border-b-0" : ""}`} key={strength.title}>
              <button
                type="button"
                className={`group flex w-full items-center justify-between px-3 text-left transition-colors duration-300 sm:px-5 ${isOpen ? "bg-zinc-800 py-6 text-white sm:py-7" : "py-5 hover:bg-secondary sm:py-5.5"}`}
                aria-expanded={isOpen}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                <span className={`text-[clamp(1.5rem,3.35vw,3rem)] font-light tracking-[-0.075em] ${isOpen ? "font-normal" : ""}`}>{strength.title}</span>
                {isOpen ? <X className="size-5 shrink-0 sm:size-6" strokeWidth={1.3} /> : <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 sm:size-6" strokeWidth={1.45} />}
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0 overflow-hidden bg-zinc-800 text-white">
                  <div className="px-3 pb-7 sm:px-5 sm:pb-8">
                    <p className="max-w-[500px] text-sm leading-relaxed text-zinc-300 sm:text-base">{strength.description}</p>
                    <div className="mt-5 flex max-w-[580px] flex-wrap gap-2">
                      {strength.skills.map((skill) => <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-zinc-100" key={skill}>{skill}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
