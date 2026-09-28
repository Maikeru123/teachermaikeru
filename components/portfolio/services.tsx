"use client"

import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  Smartphone,
} from "lucide-react"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { skillDetails } from "@/lib/skills"
import { SkillPlayground } from "./skill-playground"
import { TeachingGraphic } from "./teaching-graphic"
import "./teaching-and-skills.css"

const PANEL_EXIT_DURATION = 220
const PANEL_ENTER_DURATION = 320

const skillCategories = [
  {
    id: "web",
    label: "Web",
    skills: [
      skillDetails["Next.js"],
      skillDetails.React,
      skillDetails.TypeScript,
      skillDetails.JavaScript,
      skillDetails["Tailwind CSS"],
      skillDetails["shadcn/ui"],
      skillDetails.HTML,
      skillDetails.CSS,
      skillDetails.Laravel,
      skillDetails.PHP,
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [skillDetails.Flutter, skillDetails.Dart, skillDetails.Firebase],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      skillDetails.PHP,
      skillDetails.Laravel,
      skillDetails["C#"],
      skillDetails["ASP.NET"],
      skillDetails["Entity Framework"],
      skillDetails.Supabase,
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      skillDetails.MySQL,
      skillDetails.SQL,
      skillDetails.Supabase,
      skillDetails.Firebase,
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      skillDetails.Git,
      skillDetails.GitHub,
      skillDetails["VS Code"],
      skillDetails.Vercel,
    ],
  },
] as const

const teachingAreas = [
  {
    id: "web",
    title: "Web Development",
    description:
      "Helping students understand how web applications are structured, designed, and developed.",
    Icon: Code2,
    caption: "Structure becomes a working page.",
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    description:
      "Guiding students through practical mobile application development.",
    Icon: Smartphone,
    caption: "An idea becomes an interface.",
  },
  {
    id: "database",
    title: "Database Development",
    description:
      "Teaching database design, relationships, queries, and data management.",
    Icon: Database,
    caption: "Individual records become connected data.",
  },
] as const

type PanelPhase = "idle" | "out" | "in"

export function Services() {
  const [visibleAreas, setVisibleAreas] = useState<string[]>([])
  const [replayKeys, setReplayKeys] = useState<Record<string, number>>({})
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [displayedCategory, setDisplayedCategory] = useState(0)
  const [panelPhase, setPanelPhase] = useState<PanelPhase>("idle")
  const teachingRefs = useRef<(HTMLElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = (entry.target as HTMLElement).dataset.teachingId
          if (id) {
            setVisibleAreas((current) =>
              current.includes(id) ? current : [...current, id]
            )
          }
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
    )

    for (const element of teachingRefs.current) {
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(
    () => () => {
      if (panelTimer.current) clearTimeout(panelTimer.current)
    },
    []
  )

  function replayIllustration(id: string) {
    if (!visibleAreas.includes(id)) return
    setReplayKeys((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  }

  function changeCategory(index: number) {
    if (index === selectedCategory && panelPhase !== "out") return

    if (panelTimer.current) clearTimeout(panelTimer.current)
    setSelectedCategory(index)

    if (index === displayedCategory) {
      setPanelPhase("in")
      panelTimer.current = setTimeout(() => {
        setPanelPhase("idle")
        panelTimer.current = null
      }, PANEL_ENTER_DURATION)
      return
    }

    setPanelPhase("out")
    panelTimer.current = setTimeout(() => {
      setDisplayedCategory(index)
      setPanelPhase("in")
      panelTimer.current = setTimeout(() => {
        setPanelPhase("idle")
        panelTimer.current = null
      }, PANEL_ENTER_DURATION)
    }, PANEL_EXIT_DURATION)
  }

  function selectWithKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let next: number

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (index + 1) % skillCategories.length
        break
      case "ArrowUp":
      case "ArrowLeft":
        next = (index + skillCategories.length - 1) % skillCategories.length
        break
      case "Home":
        next = 0
        break
      case "End":
        next = skillCategories.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    changeCategory(next)
    tabRefs.current[next]?.focus()
  }

  const category = skillCategories[displayedCategory]

  return (
    <>
      <section
        id="teaching"
        className="page-container story-section bg-background"
        aria-labelledby="teaching-heading"
      >
        <header className="story-header">
          <p className="story-kicker">WHAT I SHARE</p>
          <h2 id="teaching-heading" className="story-title">
            TEACHING AREAS
          </h2>
          <p className="story-summary">
            IT Educator at the University of Mindanao.
          </p>
        </header>

        <div className="teaching-journey">
          {teachingAreas.map(
            ({ id, title, description, Icon, caption }, index) => {
              const isVisible = visibleAreas.includes(id)

              return (
                <article
                  key={id}
                  ref={(element) => {
                    teachingRefs.current[index] = element
                  }}
                  tabIndex={0}
                  data-teaching-id={id}
                  data-visible={isVisible}
                  className="teaching-scene"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") replayIllustration(id)
                  }}
                  onFocus={() => replayIllustration(id)}
                >
                  <div className="teaching-copy">
                    <div className="teaching-label">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>

                  <div
                    className="teaching-visual"
                    aria-labelledby={`teaching-caption-${id}`}
                  >
                    <TeachingGraphic
                      key={`${id}-${replayKeys[id] ?? 0}`}
                      kind={id}
                    />
                    <p id={`teaching-caption-${id}`}>{caption}</p>
                  </div>
                </article>
              )
            }
          )}
        </div>
      </section>

      <section
        id="technical"
        className="page-container section-frame story-section technical-section bg-background"
        aria-labelledby="technical-heading"
      >
        <div className="chapter-bridge" aria-hidden="true">
          <span />
          <ArrowDown className="size-4" />
          <span />
        </div>
        <header className="story-header">
          <p className="story-kicker">WHAT I BUILD WITH</p>
          <h2 id="technical-heading" className="story-title">
            TECHNICAL SKILLS
          </h2>
          <p className="story-summary">Explore the technologies I use.</p>
        </header>

        <div className="technology-explorer">
          <div
            role="tablist"
            aria-label="Technology categories"
            className="technology-categories"
          >
            {skillCategories.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`technology-tab-${item.id}`}
                aria-controls={`technology-panel-${item.id}`}
                aria-selected={selectedCategory === index}
                tabIndex={selectedCategory === index ? 0 : -1}
                className="technology-category"
                onFocus={() => changeCategory(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") changeCategory(index)
                }}
                onClick={() => changeCategory(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
              >
                <span className="technology-category-label">{item.label}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="technology-canvas">
            <div
              id={`technology-panel-${category.id}`}
              role="tabpanel"
              aria-labelledby={`technology-tab-${category.id}`}
              tabIndex={0}
              data-phase={panelPhase}
              className="technology-panel"
            >
              <div className="technology-panel-heading">
                <h3>{category.label}</h3>
              </div>

              <SkillPlayground
                skills={category.skills}
                active={panelPhase === "idle"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
