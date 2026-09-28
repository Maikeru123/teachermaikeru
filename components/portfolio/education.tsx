import { GraduationCap, Landmark } from "lucide-react"

const education = [
  {
    chapter: "Undergraduate",
    institution: "University of Mindanao",
    degree: "Bachelor of Science in Information Technology",
    date: "Graduated August 2025",
    status: "Magna Cum Laude",
    Icon: GraduationCap,
  },
  {
    chapter: "Graduate studies",
    institution: "Ateneo de Davao University",
    degree: "Master in Information Technology",
    status: "Currently pursuing",
    Icon: Landmark,
  },
] as const

export function Education() {
  return (
    <section
      id="education"
      className="page-container story-section bg-background"
      aria-labelledby="education-heading"
    >
      <header className="story-header">
        <p className="story-kicker">A CONTINUING JOURNEY</p>
        <h2 id="education-heading" className="story-title">
          EDUCATION
        </h2>
        <p className="story-summary">
          Building on the foundation. Continuing to learn.
        </p>
      </header>
      <ol className="education-journey">
        {education.map((entry, index) => {
          const Icon = entry.Icon

          return (
            <li key={entry.institution}>
              <article className="education-entry story-reveal">
                <div className="education-track" aria-hidden="true">
                  <span
                    className="education-track-line"
                    data-hidden={index === 0}
                  />
                  <span
                    className={`education-marker inline-flex size-12 shrink-0 items-center justify-center rounded-full border text-foreground ${index === education.length - 1 ? "border-accent bg-accent/10 text-accent-readable" : "border-border bg-card"}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span
                    className="education-track-line"
                    data-hidden={index === education.length - 1}
                  />
                </div>

                <div className="education-content">
                  <div className="min-w-0">
                    <p className="story-kicker">{entry.chapter}</p>
                    <h3 className="mt-3 max-w-[28ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-[-.04em]">
                      {entry.institution}
                    </h3>
                    {"date" in entry && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {entry.date}
                      </p>
                    )}
                  </div>
                  <div className="education-degree min-w-0">
                    <p className="max-w-[36ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-[-.04em]">
                      {entry.degree}
                    </p>
                    <span
                      className={`mt-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-medium ${index === education.length - 1 ? "border-accent text-accent-readable" : "border-border"}`}
                    >
                      {index === education.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-accent"
                        />
                      )}
                      {entry.status}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
