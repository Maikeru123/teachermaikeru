import { ArrowUpRight, AtSign, BriefcaseBusiness, Camera, GitBranch } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

type SocialName = "Instagram" | "LinkedIn" | "Email" | "GitHub"

const socialIcons: Record<SocialName, LucideIcon> = {
  Instagram: Camera,
  LinkedIn: BriefcaseBusiness,
  Email: AtSign,
  GitHub: GitBranch,
}

const socialLinks: Record<SocialName, string> = {
  Instagram: "https://www.instagram.com/mikonotdumpreal/",
  LinkedIn: "https://www.linkedin.com/in/michael-velez-09b7ab370/",
  Email: "https://mail.google.com/mail/?view=cm&fs=1&to=michaelvelez112301@gmail.com",
  GitHub: "https://github.com/Maikeru123",
}

export function Availability() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-950 shadow-[0_6px_18px_rgba(0,0,0,0.08)] dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[0_6px_18px_rgba(0,0,0,0.3)]">
      <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.13)]" />
      IT Educator · University of Mindanao
    </span>
  )
}

export function ArrowButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-5 py-3 text-[12px] font-medium text-white shadow-[0_6px_10px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-950">
      {children}
      <ArrowUpRight className="size-3" strokeWidth={1.8} />
    </span>
  )
}

export function SocialPill({ name }: { name: SocialName }) {
  const Icon = socialIcons[name]
  const href = socialLinks[name]
  return (
    <a
      href={href}
      aria-label={name}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-w-[118px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[11px] font-medium text-zinc-950 transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-500"
    >
      <Icon className="size-3" strokeWidth={1.7} />
      {name}
    </a>
  )
}
