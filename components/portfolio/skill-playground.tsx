"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { SkillDetail } from "@/lib/skills"
import { SkillDetailDialog } from "./skill-detail-dialog"

type MovingSkill = {
  collisionTimer: ReturnType<typeof setTimeout> | null
  element: HTMLLIElement
  height: number
  hovered: boolean
  vx: number
  vy: number
  width: number
  x: number
  y: number
}

const MIN_SPEED = 24
const SPEED_STEP = 4
const EDGE_GAP = 8

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReducedMotion(query.matches)

    updatePreference()
    query.addEventListener("change", updatePreference)
    return () => query.removeEventListener("change", updatePreference)
  }, [])

  return reducedMotion
}

export function SkillPlayground({
  skills,
  active,
}: {
  skills: readonly SkillDetail[]
  active: boolean
}) {
  const [paused, setPaused] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null)
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<(HTMLLIElement | null)[]>([])
  const movingSkills = useRef<MovingSkill[]>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reducedMotion) return
    let previousWidth = 0
    let previousHeight = 0

    function arrangeSkills() {
      if (!stage) return

      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight

      if (
        stageWidth === previousWidth &&
        stageHeight === previousHeight &&
        movingSkills.current.length === skills.length
      )
        return

      previousWidth = stageWidth
      previousHeight = stageHeight
      const placed: Array<{
        height: number
        width: number
        x: number
        y: number
      }> = []

      movingSkills.current = chipRefs.current.flatMap((element, index) => {
        if (!element) return []

        const width = element.offsetWidth
        const height = element.offsetHeight
        const maxX = Math.max(EDGE_GAP, stageWidth - width - EDGE_GAP)
        const maxY = Math.max(EDGE_GAP, stageHeight - height - EDGE_GAP)
        let x = EDGE_GAP
        let y = EDGE_GAP
        let smallestOverlap = Number.POSITIVE_INFINITY

        for (let attempt = 0; attempt < 160; attempt += 1) {
          const candidateX =
            EDGE_GAP + Math.random() * Math.max(0, maxX - EDGE_GAP)
          const candidateY =
            EDGE_GAP + Math.random() * Math.max(0, maxY - EDGE_GAP)
          const overlap = placed.reduce((total, item) => {
            const overlapX = Math.max(
              0,
              Math.min(candidateX + width + 10, item.x + item.width + 10) -
                Math.max(candidateX - 10, item.x - 10)
            )
            const overlapY = Math.max(
              0,
              Math.min(candidateY + height + 10, item.y + item.height + 10) -
                Math.max(candidateY - 10, item.y - 10)
            )
            return total + overlapX * overlapY
          }, 0)

          if (overlap < smallestOverlap) {
            x = candidateX
            y = candidateY
            smallestOverlap = overlap
          }

          if (overlap === 0) break
        }

        placed.push({ height, width, x, y })
        const speed = MIN_SPEED + (index % 4) * SPEED_STEP
        const angle = ((index * 137.5 + 28) * Math.PI) / 180

        element.style.transform = `translate3d(${x}px, ${y}px, 0)`

        return [
          {
            collisionTimer: null,
            element,
            height,
            hovered: false,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            width,
            x,
            y,
          },
        ]
      })
      stage.dataset.ready = "true"
    }

    const initialFrame = requestAnimationFrame(arrangeSkills)
    const resizeObserver = new ResizeObserver(arrangeSkills)
    resizeObserver.observe(stage)

    return () => {
      cancelAnimationFrame(initialFrame)
      resizeObserver.disconnect()
      for (const body of movingSkills.current) {
        if (body.collisionTimer) clearTimeout(body.collisionTimer)
      }
      movingSkills.current = []
      delete stage.dataset.ready
    }
  }, [reducedMotion, skills])

  useEffect(() => {
    if (!active || paused || reducedMotion || selectedSkill) return

    let animationFrame = 0
    let previousTime = performance.now()

    function animate(time: number) {
      const stage = stageRef.current
      if (!stage) return

      const delta = Math.min((time - previousTime) / 1000, 0.034)
      previousTime = time
      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight
      const bodies = movingSkills.current

      for (const body of bodies) {
        if (!body.hovered) {
          body.x += body.vx * delta
          body.y += body.vy * delta
        }

        const maxX = Math.max(EDGE_GAP, stageWidth - body.width - EDGE_GAP)
        const maxY = Math.max(EDGE_GAP, stageHeight - body.height - EDGE_GAP)

        if (body.x <= EDGE_GAP || body.x >= maxX) {
          body.x = Math.min(Math.max(body.x, EDGE_GAP), maxX)
          body.vx *= -1
        }

        if (body.y <= EDGE_GAP || body.y >= maxY) {
          body.y = Math.min(Math.max(body.y, EDGE_GAP), maxY)
          body.vy *= -1
        }
      }

      for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
        const first = bodies[firstIndex]

        for (
          let secondIndex = firstIndex + 1;
          secondIndex < bodies.length;
          secondIndex += 1
        ) {
          const second = bodies[secondIndex]
          const overlapX =
            Math.min(first.x + first.width, second.x + second.width) -
            Math.max(first.x, second.x)
          const overlapY =
            Math.min(first.y + first.height, second.y + second.height) -
            Math.max(first.y, second.y)

          if (overlapX <= 0 || overlapY <= 0) continue

          for (const body of [first, second]) {
            if (body.collisionTimer) continue
            body.element.dataset.colliding = "true"
            body.collisionTimer = setTimeout(() => {
              delete body.element.dataset.colliding
              body.collisionTimer = null
            }, 220)
          }

          if (overlapX < overlapY) {
            const firstIsLeft =
              first.x + first.width / 2 < second.x + second.width / 2
            const direction = firstIsLeft ? -1 : 1
            const separation = overlapX + 1
            const movableCount =
              Number(!first.hovered) + Number(!second.hovered)

            if (!first.hovered)
              first.x += (direction * separation) / Math.max(1, movableCount)
            if (!second.hovered)
              second.x -= (direction * separation) / Math.max(1, movableCount)
            first.vx = direction * Math.max(MIN_SPEED, Math.abs(first.vx))
            second.vx = -direction * Math.max(MIN_SPEED, Math.abs(second.vx))
          } else {
            const firstIsAbove =
              first.y + first.height / 2 < second.y + second.height / 2
            const direction = firstIsAbove ? -1 : 1
            const separation = overlapY + 1
            const movableCount =
              Number(!first.hovered) + Number(!second.hovered)

            if (!first.hovered)
              first.y += (direction * separation) / Math.max(1, movableCount)
            if (!second.hovered)
              second.y -= (direction * separation) / Math.max(1, movableCount)
            first.vy = direction * Math.max(MIN_SPEED, Math.abs(first.vy))
            second.vy = -direction * Math.max(MIN_SPEED, Math.abs(second.vy))
          }
        }
      }

      for (const body of bodies) {
        body.x = Math.min(
          Math.max(body.x, EDGE_GAP),
          Math.max(EDGE_GAP, stageWidth - body.width - EDGE_GAP)
        )
        body.y = Math.min(
          Math.max(body.y, EDGE_GAP),
          Math.max(EDGE_GAP, stageHeight - body.height - EDGE_GAP)
        )
        body.element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0)`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [active, paused, reducedMotion, selectedSkill])

  function setChipHover(index: number, hovered: boolean) {
    const body = movingSkills.current[index]
    if (body) body.hovered = hovered
  }

  const motionPaused = paused || reducedMotion

  return (
    <div className="skill-playground" data-static={motionPaused}>
      <div className="skill-playground-toolbar">
        <p>
          {reducedMotion
            ? "Static view"
            : paused
              ? "Motion paused"
              : "Motion active"}
        </p>
        <button
          type="button"
          className="skill-motion-toggle"
          aria-pressed={paused}
          disabled={reducedMotion}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>
            {reducedMotion
              ? "Reduced motion"
              : paused
                ? "Play motion"
                : "Pause motion"}
          </span>
        </button>
      </div>

      <div ref={stageRef} className="skill-playground-stage">
        <ul aria-label="Moving technology skills">
          {skills.map((skill, index) => (
            <li
              key={skill.name}
              ref={(element) => {
                chipRefs.current[index] = element
              }}
              className="moving-skill-body"
            >
              <button
                type="button"
                className="moving-skill"
                aria-label={`Open ${skill.name} skill details`}
                onPointerEnter={() => setChipHover(index, true)}
                onPointerLeave={() => setChipHover(index, false)}
                onFocus={() => setChipHover(index, true)}
                onBlur={() => setChipHover(index, false)}
                onClick={() => setSelectedSkill(skill)}
              >
                <span>{skill.name}</span>
                <small>{skill.detail}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedSkill && (
        <SkillDetailDialog
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  )
}
