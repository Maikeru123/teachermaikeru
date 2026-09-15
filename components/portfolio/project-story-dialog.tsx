"use client"

import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { projectStories } from "@/lib/project-stories"
import { ProjectStoryVisual } from "./project-story-visual"
import "./project-stories.css"

export function ProjectStoryDialog({ initialProject, onClose }: { initialProject: number; onClose: () => void }) {
  const [projectIndex, setProjectIndex] = useState(initialProject)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [motionPaused, setMotionPaused] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const backdropPress = useRef(false)
  const project = projectStories[projectIndex]
  const scene = project.scenes[sceneIndex]
  const lastScene = sceneIndex === project.scenes.length - 1

  useEffect(() => {
    const element = dialog.current!
    const opener = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    const rootOverflow = document.documentElement.style.overflow
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    element.showModal()
    heading.current?.focus({ preventScroll: true })
    return () => {
      element.close()
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = rootOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [])

  useLayoutEffect(() => {
    scroller.current?.scrollTo({ top: 0, behavior: "instant" })
    if (dialog.current?.open) heading.current?.focus({ preventScroll: true })
  }, [sceneIndex, projectIndex])

  function move(step: number) {
    setDirection(step)
    setSceneIndex((index) => Math.max(0, Math.min(project.scenes.length - 1, index + step)))
  }

  function nextStory() {
    setDirection(1)
    setProjectIndex((index) => (index + 1) % projectStories.length)
    setSceneIndex(0)
  }

  return createPortal(
    <dialog ref={dialog} data-lenis-prevent aria-modal="true" aria-labelledby="project-story-title" className="project-story-dialog"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onPointerDown={(event) => { backdropPress.current = event.target === event.currentTarget }}
      onClick={(event) => { if (backdropPress.current && event.target === event.currentTarget) onClose() }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'))
          const index = controls.indexOf(document.activeElement as HTMLElement)
          const next = event.shiftKey ? (index <= 0 ? controls.length - 1 : index - 1) : (index + 1) % controls.length
          event.preventDefault()
          controls[next]?.focus()
          return
        }
        if (event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
      }}
    >
      <div className="story-shell" data-motion-paused={motionPaused}>
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-8">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Project {String(projectIndex + 1).padStart(2, "0")} / {String(projectStories.length).padStart(2, "0")}</p>
            <h2 id="project-story-title" className="truncate text-base font-semibold sm:text-lg">{project.title}</h2>
          </div>
          <div className="flex items-center gap-2"><button type="button" className="story-control story-motion-control" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? "Resume motion" : "Pause motion"}</button><button type="button" onClick={onClose} className="story-control shrink-0" aria-label="Close project story"><X className="size-4" /><span>Close</span></button></div>
        </header>
        <div role="progressbar" aria-label="Story progress" aria-valuemin={1} aria-valuemax={project.scenes.length} aria-valuenow={sceneIndex + 1} aria-valuetext={`Scene ${sceneIndex + 1} of ${project.scenes.length}: ${scene.label}`} className="h-0.5 shrink-0 bg-border">
          <div className="h-full origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none" style={{ transform: `scaleX(${(sceneIndex + 1) / project.scenes.length})` }} />
        </div>
        <div ref={scroller} className="story-scroller">
          <div key={`${project.id}-${sceneIndex}`} className={`story-scene story-scene--${sceneIndex % 3}`} data-direction={direction}>
            <div className="min-w-0">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{scene.label}</p>
              <h3 ref={heading} tabIndex={-1} className="story-heading" aria-label={scene.title.join(" ")}>
                {scene.title.map((line, index) => <span key={line} aria-hidden="true" className="story-title-line" style={{ animationDelay: `${index * 90}ms` }}>{line}</span>)}
              </h3>
              {scene.supporting && <p className="story-supporting">{scene.supporting}</p>}
              {sceneIndex === 0 && <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{project.category}{project.role && <><br />{project.role}</>}</p>}
            </div>
            <ProjectStoryVisual project={project} scene={scene} />
          </div>
        </div>
        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border px-5 py-3 sm:px-8">
          <button type="button" className="story-control" onClick={() => move(-1)} disabled={sceneIndex === 0}><ArrowLeft className="size-4" /><span>Previous</span></button>
          <span className="text-xs tabular-nums text-muted-foreground" aria-live="polite" aria-atomic="true">{String(sceneIndex + 1).padStart(2, "0")} / {String(project.scenes.length).padStart(2, "0")}</span>
          <button type="button" className="story-control" onClick={lastScene ? nextStory : () => move(1)}>{lastScene ? "Next story" : "Next"}<ArrowRight className="size-4" /></button>
          {lastScene && <button type="button" className="story-control w-full justify-center text-muted-foreground" onClick={onClose}>Back to Selected Work</button>}
        </footer>
      </div>
    </dialog>, document.body,
  )
}
