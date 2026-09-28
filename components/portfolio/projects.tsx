"use client"

import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { projectStories } from "@/lib/project-stories"
import { ProjectPreview } from "./project-preview"
import { ProjectStoryDialog } from "./project-story-dialog"
import styles from "./projects.module.css"

const HOVER_INTENT_DELAY = 100
const PREVIEW_EXIT_DURATION = 240
const PREVIEW_ENTER_DURATION = 320

type PreviewPhase = "idle" | "out" | "in"

export function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [displayedProject, setDisplayedProject] = useState(0)
  const [previewPhase, setPreviewPhase] = useState<PreviewPhase>("idle")
  const [story, setStory] = useState<number | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
      if (transitionTimer.current) clearTimeout(transitionTimer.current)
    },
    [],
  )

  function clearHoverIntent() {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  function clearPreviewTransition() {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current)
      transitionTimer.current = null
    }
  }

  function changePreview(index: number) {
    clearHoverIntent()

    if (index === activeProject && previewPhase !== "out") return

    clearPreviewTransition()
    setActiveProject(index)

    if (index === displayedProject) {
      setPreviewPhase("in")
      transitionTimer.current = setTimeout(() => {
        setPreviewPhase("idle")
        transitionTimer.current = null
      }, PREVIEW_ENTER_DURATION)
      return
    }

    setPreviewPhase("out")
    transitionTimer.current = setTimeout(() => {
      setDisplayedProject(index)
      setPreviewPhase("in")
      transitionTimer.current = setTimeout(() => {
        setPreviewPhase("idle")
        transitionTimer.current = null
      }, PREVIEW_ENTER_DURATION)
    }, PREVIEW_EXIT_DURATION)
  }

  function schedulePreview(index: number) {
    clearHoverIntent()
    if (index === activeProject) return

    hoverTimer.current = setTimeout(() => {
      changePreview(index)
    }, HOVER_INTENT_DELAY)
  }

  function handleProjectClick(index: number, detail: number) {
    const hasDesktopHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    if (detail === 0 || hasDesktopHover) {
      setStory(index)
    } else {
      changePreview(index)
    }
  }

  return (
    <section
      id="projects"
      className="page-container section-frame story-section bg-background"
      aria-labelledby="projects-heading"
      onPointerLeave={clearHoverIntent}
    >
      <header className="story-header">
        <p className="story-kicker">WHAT I&apos;VE BUILT</p>
        <h2 id="projects-heading" className="story-title">FEATURED WORK</h2>
        <p className="story-summary">A few projects that shaped how I build.</p>
      </header>

      <div className={styles.browser}>
        <nav className={styles.selector} aria-label="Featured project selector">
          <ol className={styles.list} aria-label="Featured projects">
            {projectStories.map((project, index) => {
              const isActive = activeProject === index

              return (
                <li key={project.id} className={styles.row} data-active={isActive}>
                  <button
                    type="button"
                    className={styles.projectButton}
                    aria-current={isActive ? "true" : undefined}
                    aria-controls="featured-project-preview"
                    aria-haspopup="dialog"
                    aria-label={`${isActive ? "Active project: " : "Preview "}${project.title}. Press Enter to explore its full story.`}
                    onFocus={() => changePreview(index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") schedulePreview(index)
                    }}
                    onClick={(event) => handleProjectClick(index, event.detail)}
                  >
                    <span className={styles.projectText}>
                      <span className={styles.title}>{project.title}</span>
                      <span className={styles.category}>{project.id === "acs" ? "Clinic Management System" : project.category}</span>
                    </span>
                    <span className={styles.sceneCount}>{String(project.scenes.length).padStart(2, "0")} scenes</span>
                    <ArrowUpRight className={styles.rowArrow} aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <ProjectPreview
          key={displayedProject}
          projectIndex={displayedProject}
          phase={previewPhase}
          playing={story === null && previewPhase !== "out"}
          onExplore={() => setStory(displayedProject)}
        />
      </div>

      {story !== null && <ProjectStoryDialog initialProject={story} onClose={() => setStory(null)} />}
    </section>
  )
}
