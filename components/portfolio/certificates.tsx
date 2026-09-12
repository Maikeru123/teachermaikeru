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
    <section id="certificates" className="section-frame bg-white/70 px-6 py-12 sm:px-12 sm:py-14 lg:px-[4.5%] dark:bg-zinc-900/80" aria-labelledby="certificates-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Continuous Learning</p>
          <h2 id="certificates-heading" className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.07em]">CERTIFICATIONS</h2>
        </div>
        <p className="max-w-[370px] text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">Information Technology Specialist certifications that support my work in IT education and software development.</p>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map(([src, title, issuer]) => (
          <article className="group" key={src}>
            <div className="relative aspect-[1.294] overflow-hidden border border-zinc-200 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
              <Image src={src} alt={`${title} certificate`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4"><div><h3 className="text-[16px] font-medium tracking-[-0.03em]">{title}</h3><p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{issuer}</p></div><span className="mt-1 size-2 rounded-full bg-emerald-500" aria-hidden="true" /></div>
          </article>
        ))}
      </div>
    </section>
  )
}
