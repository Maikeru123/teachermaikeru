import { GraduationCap } from "lucide-react"

export function Education() {
  return (
    <section id="education" className="section-frame bg-background px-6 py-12 sm:px-12 sm:py-14 lg:px-[4.5%]" aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.07em]">EDUCATION</h2>
      <article className="mt-7 flex flex-wrap items-start justify-between gap-5 border border-border bg-card p-5 shadow-[0_8px_18px_rgba(0,0,0,0.035)] sm:p-6 dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><GraduationCap className="size-5" /></span>
          <div>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400">University of Mindanao</p>
            <h3 className="mt-1 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.04em]">Bachelor of Science in Information Technology</h3>
            <p className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-300">Graduated August 2025</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-600/35 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-400/10 dark:text-emerald-300">Magna Cum Laude</span>
      </article>
      <article className="mt-3 flex flex-wrap items-start justify-between gap-5 border border-border bg-card p-5 shadow-[0_8px_18px_rgba(0,0,0,0.035)] sm:p-6 dark:shadow-[0_8px_18px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"><GraduationCap className="size-5" /></span>
          <div>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Graduate Studies</p>
            <h3 className="mt-1 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.04em]">Master in Information Technology</h3>
            <p className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-300">Present</p>
          </div>
        </div>
        <span className="rounded-full border border-sky-600/35 bg-sky-50 px-3 py-1.5 text-[11px] font-medium text-sky-800 dark:border-sky-400/35 dark:bg-sky-400/10 dark:text-sky-300">Ongoing</span>
      </article>
    </section>
  )
}
