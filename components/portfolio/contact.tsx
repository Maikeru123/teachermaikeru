import { ContactForm } from "./contact-form"
import { SocialPill } from "./primitives"

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="border-t border-border bg-background px-6 py-12 text-foreground sm:px-12 sm:py-14 lg:px-[4.5%]">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Contact</p>
          <h2 id="contact-heading" className="mt-2 text-[32px] font-semibold tracking-[-0.05em] sm:text-5xl">LET&apos;S CONNECT</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have a project, question, collaboration, or opportunity? Send me a message and I&apos;ll get back to you.
          </p>
          <div className="mt-7 flex flex-wrap gap-2" aria-label="Social links">
            <SocialPill name="Instagram" />
            <SocialPill name="LinkedIn" />
            <SocialPill name="GitHub" />
            <SocialPill name="Email" />
          </div>
        </div>
        <ContactForm />
      </div>
    </footer>
  )
}
