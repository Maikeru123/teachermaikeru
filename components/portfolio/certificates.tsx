import Image from "next/image"

const certificates = [
  ["/cert1.png", "Cybersecurity", "Information Technology Specialist"],
  ["/cert2.png", "Databases", "Information Technology Specialist"],
  ["/cert3.png", "HTML and CSS", "Information Technology Specialist"],
  ["/cert4.png", "Network Security", "Information Technology Specialist"],
  ["/cert5.png", "Networking", "Information Technology Specialist"],
] as const

export function Certificates() {
  return (
    <section id="certificates" className="section-frame story-section bg-background" aria-labelledby="certificates-heading">
      <header className="story-header">
        <p className="story-kicker">KEEP LEARNING</p>
        <h2 id="certificates-heading" className="story-title">CERTIFICATIONS</h2>
        <p className="story-summary">A collection of things I&apos;ve continued learning along the way.</p>
      </header>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map(([src, title, issuer]) => (
          <article className="story-reveal group" key={src}>
            <div className="relative aspect-[1.294] overflow-hidden border border-border bg-card shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-foreground/50 dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
              <Image src={src} alt={`${title} certificate`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4"><div><h3 className="text-xl font-medium tracking-[-0.03em]">{title}</h3><p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{issuer}</p><span className="mt-2 block text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">View certificate →</span></div><span className="mt-1 size-2 rounded-full bg-emerald-500" aria-hidden="true" /></div>
          </article>
        ))}
      </div>
    </section>
  )
}
