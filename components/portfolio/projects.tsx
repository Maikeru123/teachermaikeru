"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { projectStories } from "@/lib/project-stories"
import { ProjectStoryDialog } from "./project-story-dialog"

export function Projects() {
  const [story, setStory] = useState<number | null>(null)
  const bentoPlacement: Record<string, string> = {
    massageease: "lg:col-span-12",
    acs: "lg:col-span-6 lg:row-start-2",
    eventhub: "lg:col-start-7 lg:row-start-2 lg:col-span-6",
    "velez-creation": "lg:col-span-12 lg:row-start-3",
  }
  const titleScale: Record<string, string> = {
    massageease: "text-4xl sm:text-5xl lg:text-6xl",
    acs: "text-3xl lg:text-4xl",
    eventhub: "text-3xl lg:text-4xl",
    "velez-creation": "text-4xl lg:text-5xl",
  }
  const imageAspect: Record<string, string> = {
    massageease: "aspect-[1.55] lg:aspect-[2.7]",
    acs: "aspect-[1.55]",
    eventhub: "aspect-[1.55]",
    "velez-creation": "aspect-[1.55] lg:aspect-[3.1]",
  }
  return (
    <section id="work" className="section-frame story-section bg-background" aria-labelledby="work-heading">
      <header className="story-header">
        <p className="story-kicker">WHAT I&apos;VE BUILT</p>
        <h2 id="work-heading" className="story-title">SELECTED WORK</h2>
        <p className="story-summary">A few projects that shaped how I build.</p>
      </header>
      <div id="projects" className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        {projectStories.map((project, index) => (
          <article key={project.id} className={`group relative flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card p-6 shadow-[0_8px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/50 hover:shadow-[0_14px_30px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_14px_30px_rgba(0,0,0,0.4)] sm:p-8 ${bentoPlacement[project.id]}`}>
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-foreground/60 transition-[width] duration-500 motion-safe:group-hover:w-full" />
            <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground"><span>Project {String(index + 1).padStart(2, "0")}</span><span>{project.scenes.length} scenes</span></div>
            <button type="button" onClick={() => setStory(index)} aria-haspopup="dialog" aria-label={`Explore ${project.title} story`} className={`relative z-10 mt-5 w-full overflow-hidden rounded-sm bg-secondary text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${imageAspect[project.id]}`}>
              <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
            </button>
            <div className="relative z-10 pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.11em] text-muted-foreground">{project.category}</p>
            <h3 className={`mt-3 font-semibold leading-[0.95] tracking-[-0.06em] transition-transform duration-300 motion-safe:group-hover:translate-x-1 ${titleScale[project.id]}`}>
              {project.title}
            </h3>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">{project.teaser}</p>
            <button type="button" onClick={() => setStory(index)} aria-haspopup="dialog" className="mt-8 inline-flex min-h-11 items-center gap-2 text-left text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">Explore story <ArrowUpRight className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" /></button>
            </div>
          </article>
        ))}
      </div>
      {story !== null && <ProjectStoryDialog initialProject={story} onClose={() => setStory(null)} />}
    </section>
  )
}
