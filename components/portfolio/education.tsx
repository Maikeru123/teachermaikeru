import { GraduationCap } from "lucide-react"

export function Education() {
  return (
    <section id="education" className="section-frame story-section bg-background" aria-labelledby="education-heading">
      <header className="story-header">
        <p className="story-kicker">THE FOUNDATION</p>
        <h2 id="education-heading" className="story-title">EDUCATION</h2>
        <p className="story-summary">Where the foundation for a life in technology and teaching began.</p>
      </header>
      <div className="mx-auto max-w-4xl border-l border-border pl-5 sm:pl-8">
      <article className="story-reveal flex flex-wrap items-start justify-between gap-6 border border-border bg-card p-6 shadow-[0_8px_18px_rgba(0,0,0,0.035)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><GraduationCap className="size-6" /></span>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">University of Mindanao</p>
            <h3 className="mt-1 text-2xl font-medium tracking-[-0.04em]">Bachelor of Science in Information Technology</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Graduated August 2025</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-600/35 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-400/10 dark:text-emerald-300">Magna Cum Laude</span>
      </article>
      <article className="story-reveal mt-4 flex flex-wrap items-start justify-between gap-6 border border-border bg-card p-6 shadow-[0_8px_18px_rgba(0,0,0,0.035)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><GraduationCap className="size-6" /></span>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Graduate Studies</p>
            <h3 className="mt-1 text-2xl font-medium tracking-[-0.04em]">Master in Information Technology</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Present</p>
          </div>
        </div>
        <span className="rounded-full border border-sky-600/35 bg-sky-50 px-3 py-1.5 text-[11px] font-medium text-sky-800 dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-300">Ongoing</span>
      </article>
      </div>
    </section>
  )
}
