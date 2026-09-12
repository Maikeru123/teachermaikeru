"use client"

import { ChevronDown, X } from "lucide-react"
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
    skills: ["Flutter", "Dart", "Mobile UI Development", "API Integration"],
  },
  {
    title: "DATABASE & BACKEND",
    description: "Working with database design, SQL, data management, and backend services for database-driven applications.",
    skills: ["SQL", "Supabase", "Database Design", "Database Management", "API Integration"],
  },
  {
    title: "OTHER TECHNICAL KNOWLEDGE",
    description: "Supporting technical work through version control, troubleshooting, IT fundamentals, and practical problem solving.",
    skills: ["Git / Version Control", "Computer Troubleshooting", "IT Fundamentals", "Google Maps API", "Algorithms and Problem Solving"],
  },
] as const

const teachingAreas = [
  ["WEB DEVELOPMENT", "Teaching students how modern websites and web applications are designed, developed, and structured.", "</>"],
  ["MOBILE DEVELOPMENT", "Teaching the fundamentals and practical implementation of mobile application development.", "▣"],
  ["DATABASE DEVELOPMENT", "Teaching database design, SQL, data management, relationships, and database-driven applications.", "◫"],
] as const

const teachingAreaDetails = {
  "WEB DEVELOPMENT": {
    subtitle: "Frontend & Web Technologies",
    cardClass: "border-zinc-300 bg-white/80 dark:border-zinc-700 dark:bg-zinc-800",
    iconClass: "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950",
  },
  "MOBILE DEVELOPMENT": {
    subtitle: "Cross-Platform Applications",
    cardClass: "border-zinc-300/90 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-800/90",
    iconClass: "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950",
  },
  "DATABASE DEVELOPMENT": {
    subtitle: "Data Design & Management",
    cardClass: "border-zinc-400/80 bg-zinc-100/65 dark:border-zinc-600 dark:bg-zinc-800/75",
    iconClass: "bg-zinc-900 text-white dark:bg-zinc-300 dark:text-zinc-950",
  },
} as const

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="teaching" className="section-frame bg-transparent px-6 py-12 sm:px-12 sm:py-14 lg:px-[4.5%]" aria-labelledby="teaching-heading">
      <h2 id="teaching-heading" className="text-[clamp(1.75rem,3vw,2.45rem)] font-medium tracking-[-0.07em]">ABOUT</h2>
      <div className="mt-4 max-w-[1040px] space-y-3 text-[14px] leading-relaxed text-zinc-700 sm:text-[15px] dark:text-zinc-300">
        <p>I am an IT educator at the University of Mindanao with a strong interest in software development and technology education. I primarily teach web development, mobile application development, and database-related subjects.</p>
        <p>As an educator, I help students understand programming concepts and how they are applied in real-world software development. Alongside teaching, I continue to build and explore web, mobile, and database-driven applications to strengthen my technical skills and bring practical experience into the classroom.</p>
      </div>
      <h3 className="mt-9 text-[clamp(1.55rem,2.6vw,2.1rem)] font-semibold tracking-[-0.06em]">TEACHING AREAS</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {teachingAreas.map(([title, description, icon]) => {
          const details = teachingAreaDetails[title]

          return (
            <article className={`rounded-sm border p-5 shadow-[0_8px_18px_rgba(0,0,0,0.035)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)] ${details.cardClass}`} key={title}>
              <span className={`inline-flex size-9 items-center justify-center rounded-full text-[14px] font-semibold ${details.iconClass}`}>{icon}</span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.04em]">{title}</h3>
              <p className="mt-1 text-[11px] font-medium italic tracking-[0.01em] text-zinc-500 dark:text-zinc-400">{details.subtitle}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
            </article>
          )
        })}
      </div>
      <h3 className="mt-12 text-[clamp(1.45rem,2.5vw,2rem)] font-medium tracking-[-0.06em]">TECHNICAL SKILLS</h3>
      <p className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-400">Select an area to view the technologies and knowledge I use.</p>
      <div className="mt-5">
        {strengths.map((strength, index) => {
          const isOpen = activeIndex === index

          return (
            <article className={`overflow-hidden border-b border-zinc-400 dark:border-zinc-700 ${isOpen ? "border-b-0" : ""}`} key={strength.title}>
              <button
                type="button"
                className={`group flex w-full items-center justify-between px-3 text-left transition-colors duration-300 sm:px-5 ${isOpen ? "bg-zinc-800 py-6 text-white sm:py-7 dark:bg-zinc-800" : "py-5 hover:bg-white/45 sm:py-5.5 dark:hover:bg-zinc-800/60"}`}
                aria-expanded={isOpen}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                <span className={`text-[clamp(1.5rem,3.35vw,3rem)] font-light tracking-[-0.075em] ${isOpen ? "font-normal" : ""}`}>{strength.title}</span>
                {isOpen ? <X className="size-5 shrink-0 sm:size-6" strokeWidth={1.3} /> : <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 sm:size-6" strokeWidth={1.45} />}
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0 overflow-hidden bg-zinc-800 text-white">
                  <div className="px-3 pb-7 sm:px-5 sm:pb-8">
                    <p className="max-w-[500px] text-[13px] leading-relaxed text-zinc-300 sm:text-[14px]">{strength.description}</p>
                    <div className="mt-5 flex max-w-[580px] flex-wrap gap-2">
                      {strength.skills.map((skill) => <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-100 sm:text-[12px]" key={skill}>{skill}</span>)}
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
