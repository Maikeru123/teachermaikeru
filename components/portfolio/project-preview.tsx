"use client"

import { ArrowUpRight, Pause, Play } from "lucide-react"
import { useEffect, useState, useSyncExternalStore } from "react"
import { projectStories } from "@/lib/project-stories"
import { ProjectStoryVisual } from "./project-story-visual"
import styles from "./projects.module.css"

const MOMENT_DURATION = 1800

const previewScenes: Record<string, number[]> = {
  massageease: [0, 1, 3],
  eventhub: [1, 2, 5],
  "velez-creation": [3, 4, 6],
  acs: [1, 2, 4],
}

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  )
}

export function ProjectPreview({
  projectIndex,
  phase,
  playing,
  onExplore,
}: {
  projectIndex: number
  phase: "idle" | "out" | "in"
  playing: boolean
  onExplore: () => void
}) {
  const project = projectStories[projectIndex]
  const moments = previewScenes[project.id]
  const [moment, setMoment] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const isPlaying = playing && !paused && !reducedMotion
  const scene = project.scenes[moments[moment]]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setMoment((current) => (current + 1) % moments.length)
    }, MOMENT_DURATION)

    return () => clearInterval(interval)
  }, [isPlaying, moments.length])

  return (
    <article
      id="featured-project-preview"
      className={styles.preview}
      aria-labelledby="featured-preview-title"
      data-phase={phase}
      data-playing={isPlaying}
      data-reduced-motion={reducedMotion}
    >
      <div className={styles.previewHeader}>
        <div>
          <p className={styles.previewKicker}>PROJECT PREVIEW</p>
          <h3 id="featured-preview-title" className={styles.previewTitle}>
            {project.title}
          </h3>
        </div>
        <p className={styles.previewCategory}>{project.category}</p>
      </div>

      <div className={styles.moment}>
        <div className={styles.momentCopy} key={`${project.id}-copy-${moment}`}>
          <p className={styles.momentLabel}>{scene.label}</p>
          <p className={styles.momentTitle}>
            {scene.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <div
          className={styles.previewVisual}
          key={`${project.id}-visual-${moment}`}
        >
          <ProjectStoryVisual project={project} scene={scene} />
        </div>
      </div>

      <div className={styles.previewFooter}>
        <div className={styles.previewControls}>
          <div className={styles.progress} aria-hidden="true">
            {moments.map((_, index) => (
              <span key={index} data-active={index === moment} />
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              className={styles.previewToggle}
              aria-label={
                paused ? "Play project preview" : "Pause project preview"
              }
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? (
                <Play aria-hidden="true" />
              ) : (
                <Pause aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        <button
          type="button"
          className={styles.exploreButton}
          aria-haspopup="dialog"
          aria-label={`Explore ${project.title} full story`}
          onClick={onExplore}
        >
          Explore Full Story <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
