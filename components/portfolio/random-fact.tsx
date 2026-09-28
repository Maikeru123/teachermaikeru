"use client"

import { ArrowUpRight, RotateCw } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { personalFacts } from "@/lib/personal-facts"

const EXIT_DURATION = 180
const BREATHING_PAUSE = 200
const ENTER_DURATION = 180
const TYPE_INTERVAL = 34

type FactPhase = "idle" | "out" | "in" | "typing"

export function RandomFact() {
  const headingId = useId()
  const factId = useId()
  const [current, setCurrent] = useState<number | null>(null)
  const [displayedFact, setDisplayedFact] = useState("")
  const [announcedFact, setAnnouncedFact] = useState("")
  const [phase, setPhase] = useState<FactPhase>("idle")
  const busy = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  function finishTransition() {
    setPhase("idle")
    busy.current = false
    timer.current = null
  }

  function typeFact(fact: string, position = 1) {
    timer.current = setTimeout(() => {
      setDisplayedFact(fact.slice(0, position))

      if (position < fact.length) {
        typeFact(fact, position + 1)
      } else {
        finishTransition()
      }
    }, TYPE_INTERVAL)
  }

  function revealFact() {
    if (busy.current || personalFacts.length === 0) return
    // Draw from every index except the current one, without retrying randomly.
    const choices = personalFacts
      .map((_, index) => index)
      .filter(
        (index) =>
          current === null || personalFacts[index] !== personalFacts[current]
      )
    if (!choices.length) return
    const next = choices[Math.floor(Math.random() * choices.length)]
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    busy.current = true

    function showNext() {
      setCurrent(next)
      setAnnouncedFact(personalFacts[next])
      setDisplayedFact(prefersReducedMotion ? personalFacts[next] : "")

      if (prefersReducedMotion) {
        setPhase("in")
        timer.current = setTimeout(finishTransition, ENTER_DURATION)
      } else {
        setPhase("typing")
        typeFact(personalFacts[next])
      }
    }

    if (current === null) showNext()
    else {
      setPhase("out")
      timer.current = setTimeout(() => {
        timer.current = setTimeout(showNext, BREATHING_PAUSE)
      }, EXIT_DURATION)
    }
  }

  if (personalFacts.length === 0) return null
  const hasAnother =
    current === null ||
    personalFacts.some((fact) => fact !== personalFacts[current])

  return (
    <aside aria-labelledby={headingId} className="text-foreground">
      <h2
        id={headingId}
        className="text-sm leading-relaxed font-semibold tracking-[0.14em] text-muted-foreground uppercase xl:text-base"
      >
        Know me <span className="block">beyond code</span>
      </h2>
      <div className="mt-3 border-t border-border pt-4">
        <div
          id={factId}
          aria-busy={phase !== "idle"}
          className={
            current === null
              ? ""
              : "min-h-[5.2em] text-[22px] lg:text-2xl xl:text-[28px]"
          }
        >
          {current !== null && (
            <p
              aria-hidden="true"
              key={current}
              data-phase={phase}
              className="hero-fact-copy text-[22px] leading-[1.3] font-semibold tracking-[-0.025em] lg:text-2xl xl:text-[28px]"
            >
              &ldquo;{displayedFact}
              {phase !== "typing" && <>&rdquo;</>}
            </p>
          )}
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {announcedFact}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={revealFact}
            disabled={phase !== "idle" || !hasAnother}
            aria-controls={factId}
            className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-default disabled:opacity-60 xl:text-base"
          >
            {current === null ? (
              <>
                Tell me something random
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </>
            ) : (
              <>
                Another one
                <RotateCw
                  aria-hidden="true"
                  className="size-3.5 transition-transform motion-safe:group-hover:rotate-12"
                />
              </>
            )}
          </button>
          {current !== null && (
            <span
              aria-hidden="true"
              className="text-xs text-muted-foreground tabular-nums xl:text-sm"
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(personalFacts.length).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}
