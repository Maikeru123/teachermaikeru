import { BackToTop } from "@/components/portfolio/back-to-top"
import { Certificates } from "@/components/portfolio/certificates"
import { Contact } from "@/components/portfolio/contact"
import { Education } from "@/components/portfolio/education"
import { Hero } from "@/components/portfolio/hero"
import { Navigation } from "@/components/portfolio/navigation"
import { Projects } from "@/components/portfolio/projects"
import { ScrollReveal } from "@/components/portfolio/scroll-reveal"
import { Services } from "@/components/portfolio/services"

export default function Page() {
  return (
    <>
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[70] rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Skip to content</a>
      <Navigation />
      <main id="main-content" className="cloud-page">
        <div className="page-shell w-full">
          <ScrollReveal><Hero /></ScrollReveal>
          <ScrollReveal delay={80}><Projects /></ScrollReveal>
          <ScrollReveal delay={80}><Services /></ScrollReveal>
          <ScrollReveal delay={80}><Education /></ScrollReveal>
          <ScrollReveal delay={80}><Certificates /></ScrollReveal>
          <Contact />
        </div>
      </main>
      <BackToTop />
    </>
  )
}
