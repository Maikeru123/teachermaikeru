"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { projectStories } from "@/lib/project-stories"
import { ProjectStoryDialog } from "./project-story-dialog"

export function Projects() {
  const [story, setStory] = useState<number | null>(null)
  return (
    <section id="work" className="section-frame bg-background px-6 py-12 sm:px-12 sm:py-16 lg:px-[8%]" aria-labelledby="work-heading">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Three projects. Three different beginnings.</p>
          <h2 id="work-heading" className="mt-3 text-[32px] font-semibold tracking-[-0.05em] sm:text-5xl">SELECTED WORK</h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Every build has a story.<br />Step inside one of mine.</p>
      </div>
      <div className="mt-9 grid gap-10 md:grid-cols-3 md:gap-5 lg:gap-7">
        {projectStories.map((project, index) => (
          <article key={project.id} className="group relative min-w-0 border-t border-border pt-4">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground"><span>Project {String(index + 1).padStart(2, "0")}</span><span>{project.scenes.length} scenes</span></div>
            <div className="relative aspect-[1.15] overflow-hidden rounded-sm bg-card">
              <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
            </div>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">
              <button type="button" onClick={() => setStory(index)} aria-haspopup="dialog" aria-label={`Explore ${project.title} story`} className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-sm focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-foreground">{project.title}</button>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{project.teaser}</p>
            <span aria-hidden="true" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore story <ArrowUpRight className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" /></span>
          </article>
        ))}
      </div>
      {story !== null && <ProjectStoryDialog initialProject={story} onClose={() => setStory(null)} />}
    </section>
  )
}
