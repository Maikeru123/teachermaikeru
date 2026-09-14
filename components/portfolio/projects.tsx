"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

const projects = [
  { title: "MassageEase - Mobile Booking Application", image: "/MassageEase.png", role: "Backend & Database Developer", description: "Cross-platform booking for finding and scheduling massage services.", tags: ["Supabase", "Google Maps API", "Gale-Shapley Algorithm"] },
  { title: "EventHub - Event Management Platform", image: "/EventHub.png", role: "Frontend Developer", description: "Web-based event management platform developed with ASP.NET.", tags: ["ASP.NET", "HTML & CSS", "JavaScript"] },
  { title: "Velez Creation - Toga Rental", image: "/VelezToga.png", role: "Project Showcase", description: "A web project presentation for Velez Creation Toga Rental.", tags: ["Toga Rental"] },
] as const

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="relative aspect-[1.15] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.015]" />
    </div>
  )
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [carouselPosition, setCarouselPosition] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const movementQueue = useRef<(1 | -1)[]>([])
  const touchStartX = useRef<number | null>(null)
  const carouselProjects = [projects[projects.length - 1], ...projects, projects[0]]

  const beginMove = (direction: 1 | -1) => {
    setIsAnimating(true)
    setActiveIndex((index) => (index + direction + projects.length) % projects.length)
    setCarouselPosition((position) => position + direction)
  }

  const moveCarousel = (direction: 1 | -1) => {
    if (isAnimating) {
      movementQueue.current.push(direction)
      return
    }
    beginMove(direction)
  }

  const selectProject = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
    setCarouselPosition(index + 1)
  }

  const continueQueuedMovement = () => {
    const nextDirection = movementQueue.current.shift()
    if (nextDirection) beginMove(nextDirection)
    else setIsAnimating(false)
  }

  const handleTransitionEnd = () => {
    if (carouselPosition === 0 || carouselPosition === projects.length + 1) {
      setCarouselPosition(carouselPosition === 0 ? projects.length : 1)
      setIsAnimating(false)
      window.requestAnimationFrame(() => window.requestAnimationFrame(continueQueuedMovement))
      return
    }

    continueQueuedMovement()
  }

  return (
    <section id="work" className="section-frame bg-background px-6 py-12 sm:px-12 sm:py-14 lg:px-[11.5%]" aria-labelledby="work-heading">
      <div className="text-center">
        <h2 id="work-heading" className="inline-block border-b-2 border-zinc-950 pb-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.07em] dark:border-zinc-100">SELECTED WORK</h2>
      </div>
      <div className="mt-8 flex items-center justify-between text-[12px] font-medium">
        <div className="flex gap-5"><button>All</button><button className="text-zinc-500 dark:text-zinc-400">Real Project</button><button className="text-zinc-500 dark:text-zinc-400">Exploration</button></div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous project" className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-950" onClick={() => moveCarousel(-1)}><ChevronLeft className="size-4" /></button>
          <button type="button" aria-label="Next project" className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-950" onClick={() => moveCarousel(1)}><ChevronRight className="size-4" /></button>
        </div>
      </div>
      <div
        className="mt-6 overflow-hidden touch-pan-y"
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current
          const endX = event.changedTouches[0]?.clientX
          touchStartX.current = null

          if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) return
          moveCarousel(endX < startX ? 1 : -1)
        }}
      >
        <div className="flex ease-[cubic-bezier(.22,1,.36,1)]" onTransitionEnd={(event) => { if (event.target === event.currentTarget && event.propertyName === "transform") handleTransitionEnd() }} style={{ transform: `translateX(-${carouselPosition * 100}%)`, transitionDuration: isAnimating ? "420ms" : "0ms", transitionProperty: "transform" }}>
          {carouselProjects.map((project, carouselIndex) => (
            <article className="group grid w-full shrink-0 gap-6 sm:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] sm:items-center" key={`${project.title}-${carouselIndex}`}>
              <div className="overflow-hidden bg-zinc-100 shadow-[0_12px_20px_rgba(0,0,0,0.03)] dark:bg-zinc-800 dark:shadow-[0_12px_20px_rgba(0,0,0,0.25)]"><ProjectPreview project={project} /></div>
              <div className="pr-2 sm:pr-8">
                <h3 className="max-w-[410px] text-[clamp(1.45rem,3vw,2.35rem)] font-medium leading-snug tracking-[-0.05em]">{project.title}</h3>
                <p className="mt-4 text-[13px] font-medium text-zinc-700 dark:text-zinc-200">{project.role}</p>
                <p className="mt-2 max-w-[460px] text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.tags.map((tag) => <span className="rounded-full border border-zinc-200 px-3 py-1.5 text-[11px] dark:border-zinc-700 dark:bg-zinc-800" key={tag}>{tag}</span>)}</div>
                <div className="mt-7 flex items-center gap-2" aria-label="Project slide selection">
                  {projects.map((item, index) => <button type="button" aria-label={`Show ${item.title}`} className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-zinc-950 dark:bg-zinc-100" : "w-3 bg-zinc-300 hover:bg-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-400"}`} disabled={isAnimating} key={item.title} onClick={() => selectProject(index)} />)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
