import { BackToTop } from "@/components/portfolio/back-to-top"
import { Certificates } from "@/components/portfolio/certificates"
import { Contact } from "@/components/portfolio/contact"
import { Education } from "@/components/portfolio/education"
import { Experience } from "@/components/portfolio/experience"
import { Hero } from "@/components/portfolio/hero"
import { Navigation } from "@/components/portfolio/navigation"
import { Projects } from "@/components/portfolio/projects"
import { ScrollReveal } from "@/components/portfolio/scroll-reveal"
import { Services } from "@/components/portfolio/services"

export default function Page() {
  return (
    <>
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[70] rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white focus:not-sr-only dark:bg-zinc-100 dark:text-zinc-950">Skip to content</a>
      <Navigation />
      <main id="main-content" className="cloud-page">
        <div className="page-shell mx-auto w-full overflow-hidden border border-border shadow-[0_17px_46px_rgba(0,0,0,0.14)]">
          <ScrollReveal><Hero /></ScrollReveal>
          <ScrollReveal delay={80}><Projects /></ScrollReveal>
          <ScrollReveal delay={80}><Services /></ScrollReveal>
          <ScrollReveal delay={80}><Experience /></ScrollReveal>
          <ScrollReveal delay={80}><Education /></ScrollReveal>
          <ScrollReveal delay={80}><Certificates /></ScrollReveal>
          <Contact />
        </div>
      </main>
      <BackToTop />
    </>
  )
}
