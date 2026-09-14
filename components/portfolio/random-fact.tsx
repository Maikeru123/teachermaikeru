"use client"

import { ArrowUpRight, RotateCw } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { personalFacts } from "@/lib/personal-facts"

export function RandomFact() {
  const headingId = useId()
  const factId = useId()
  const [current, setCurrent] = useState<number | null>(null)
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle")
  const busy = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function revealFact() {
    if (busy.current || personalFacts.length === 0) return
    // Draw from every index except the current one, without retrying randomly.
    const choices = personalFacts
      .map((_, index) => index)
      .filter((index) => current === null || personalFacts[index] !== personalFacts[current])
    if (!choices.length) return
    const next = choices[Math.floor(Math.random() * choices.length)]
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(next)
      return
    }

    busy.current = true
    function showNext() {
      setCurrent(next)
      setPhase("in")
      timer.current = setTimeout(() => {
        setPhase("idle")
        busy.current = false
      }, 180)
    }
    if (current === null) showNext()
    else {
      setPhase("out")
      timer.current = setTimeout(showNext, 150)
    }
  }

  if (personalFacts.length === 0) return null
  const hasAnother = current === null || personalFacts.some((fact) => fact !== personalFacts[current])

  return (
    <aside aria-labelledby={headingId} className="text-foreground">
      <h2 id={headingId} className="text-sm font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted-foreground xl:text-base">
        Know me <span className="block">beyond code</span>
      </h2>
      <div className="mt-3 border-t border-border pt-4">
        <div id={factId} aria-live="polite" aria-atomic="true" className={current === null ? "" : "min-h-[5.2em] text-[22px] lg:text-2xl xl:text-[28px]"}>
          {current !== null && (
            <p key={current} data-phase={phase} className="hero-fact-copy text-[22px] font-semibold leading-[1.3] tracking-[-0.025em] lg:text-2xl xl:text-[28px]">
              &ldquo;{personalFacts[current]}&rdquo;
            </p>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={revealFact}
            disabled={phase !== "idle" || !hasAnother}
            aria-controls={factId}
            className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:cursor-default disabled:opacity-60 xl:text-base"
          >
            {current === null ? <>Tell me something random<ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" /></> : <>Another one<RotateCw aria-hidden="true" className="size-3.5 transition-transform motion-safe:group-hover:rotate-12" /></>}
          </button>
          {current !== null && <span aria-hidden="true" className="text-xs tabular-nums text-muted-foreground xl:text-sm">{String(current + 1).padStart(2, "0")} / {String(personalFacts.length).padStart(2, "0")}</span>}
        </div>
      </div>
    </aside>
  )
}
