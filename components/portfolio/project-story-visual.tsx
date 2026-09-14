"use client"

import { ArrowDown, ArrowRight, Braces, Brush, Code2, Database, GraduationCap, Hammer, Home, MapPin, MessageCircle, Network, Plus, Sparkles, Users, Wrench } from "lucide-react"
import Image from "next/image"
import { useState, type CSSProperties } from "react"
import type { ProjectStory, StoryScene } from "@/lib/project-stories"

const serviceIcons = [Brush, Wrench, Hammer, Sparkles, Plus]
const stagger = (index: number): CSSProperties => ({ "--step": index } as CSSProperties)

export function ProjectStoryVisual({ project, scene }: { project: ProjectStory; scene: StoryScene }) {
  const [selected, setSelected] = useState<string | null>(null)
  const items = scene.items ?? []

  if (["image", "family", "reflection"].includes(scene.visual)) {
    return <figure className="story-image story-object"><div className="relative aspect-[1.15] w-full overflow-hidden rounded-sm bg-card"><Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 767px) 90vw, 42vw" className="object-contain" /></div><figcaption className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{project.title} / {project.category}</figcaption></figure>
  }
  if (scene.visual === "services") {
    return <div className="story-visual"><div className="grid w-full grid-cols-2 gap-3">{items.map((item, index) => {
      const Icon = serviceIcons[index % serviceIcons.length]
      return <button type="button" key={item} aria-pressed={selected === item} onClick={() => setSelected(selected === item ? null : item)} className={`story-token story-service story-object ${selected && selected !== item ? "story-service--muted" : ""}`} style={stagger(index)}><Icon className="size-6" strokeWidth={1.4} /><span>{item}</span></button>
    })}</div><p className="mt-4 min-h-6 text-center text-xs text-muted-foreground" aria-live="polite">{selected ? `${selected} — part of the original idea.` : "One idea. Many possibilities."}</p></div>
  }
  if (scene.visual === "scope" || scene.visual === "transform") {
    return <div className="story-visual">
      {scene.visual === "scope" && <div className="mb-7 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">{["Cleaner", "Plumber", "Carpenter", "Massage", "Other"].map((item, index) => <span key={item} className={`story-scope-tag ${item === "Massage" ? "story-scope-tag--kept" : ""}`} style={stagger(index)}>{item}</span>)}</div>}
      <ol className="w-full space-y-3">{items.map((item, index) => <li key={item} className="story-transform-step story-object" style={stagger(index)}>{index > 0 && <ArrowDown aria-hidden="true" className="mx-auto mb-3 size-5 text-muted-foreground" />}<p className={`text-center font-semibold uppercase tracking-tight ${index === items.length - 1 ? "border-y border-foreground py-5 text-2xl sm:text-3xl" : "text-sm text-muted-foreground sm:text-base"}`}>{item}</p></li>)}</ol>
    </div>
  }
  if (scene.visual === "tech" || scene.visual === "keywords") {
    const technologies = scene.visual === "tech" ? project.tech ?? [] : items
    const icons = project.id === "massageease" ? [Database, MapPin, Network] : [Code2, Braces, Code2, Braces]
    return <div className="story-visual"><div className={`grid w-full gap-3 ${project.id === "eventhub" ? "grid-cols-2" : "grid-cols-1"}`}>{technologies.map((item, index) => { const Icon = icons[index % icons.length]; return <div key={item} className="story-token story-tech story-object" style={stagger(index)}><Icon className="size-7" strokeWidth={1.4} /><span>{item}</span></div> })}</div></div>
  }
  if (scene.visual === "timeline") {
    return <div className="story-visual"><GraduationCap className="story-object mb-10 size-20" strokeWidth={1} /><ol className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">{items.map((item, index) => <li key={item} className="story-object border-t border-border pt-4" style={stagger(index)}><span className="text-xs text-muted-foreground">0{index + 1}</span><p className="mt-2 text-sm font-medium">{item}</p></li>)}</ol></div>
  }
  if (scene.visual === "collaboration") {
    return <div className="story-visual gap-4"><div className="story-token story-collaborator story-collaborator--one"><Code2 className="size-8" strokeWidth={1.3} /><span>{items[0]}</span></div><Plus aria-hidden="true" className="size-5 text-muted-foreground" /><div className="story-token story-collaborator story-collaborator--two"><Users className="size-8" strokeWidth={1.3} /><span>{items[1]}</span></div></div>
  }
  if (scene.visual === "interface") {
    return <div className="story-visual"><p className="mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">The building blocks of frontend work</p><div className="grid w-full grid-cols-2 gap-3" aria-label="An abstract illustration of frontend elements"><div className="story-ui-piece story-object col-span-2 flex justify-between" style={stagger(0)}><span>Navigation</span><span aria-hidden="true">— — —</span></div><div className="story-ui-piece story-object" style={stagger(1)}><div className="mb-4 h-10 rounded bg-muted" />Card</div><div className="story-ui-piece story-object space-y-3" style={stagger(2)}><span>Form</span><div className="h-5 border border-border" /><div className="h-5 border border-border" /></div><div className="story-ui-piece story-object col-span-2 flex items-center justify-between" style={stagger(3)}><span>Layout</span><span className="rounded bg-foreground px-4 py-2 text-xs text-background">Button</span></div></div></div>
  }
  if (scene.visual === "deadline") {
    return <div className="story-visual"><div className="w-full border-y border-border py-7"><p className="text-xs uppercase tracking-widest text-muted-foreground">Academic schedule</p><div className="my-6 h-1 overflow-hidden bg-border"><div className="story-deadline h-full origin-left bg-foreground" /></div><div className="flex justify-between text-xs text-muted-foreground"><span>Build</span><span>Deadline</span></div></div><p className="story-decision mt-8 text-center text-2xl font-semibold leading-tight">{items[0]}</p></div>
  }
  if (scene.visual === "home") {
    return <div className="story-visual"><Home className="story-home mb-8 size-24" strokeWidth={1} /><p className="story-home-caption text-center text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{items[0]}</p></div>
  }
  if (scene.visual === "offline") {
    return <div className="story-visual"><div className="grid w-full grid-cols-2 gap-4">{items.map((item, index) => <div key={item} className="story-token story-offline story-object" style={stagger(index)}><MessageCircle className="size-6" strokeWidth={1.3} /><span>{item}</span></div>)}</div></div>
  }
  if (scene.visual === "inquiries") {
    return <div className="story-visual gap-4">{["How much is the toga?", "How much is the rental?", "How much is the toga?"].map((text, index) => <button key={index} type="button" className="story-bubble story-object" style={stagger(index)} onClick={() => setSelected(text)}>{text}<ArrowRight aria-hidden="true" className="size-4 shrink-0" /></button>)}<p className="mt-4 min-h-12 text-center text-sm leading-relaxed text-muted-foreground" aria-live="polite">{selected ? "That question is exactly why I built this." : "Tap a question."}</p></div>
  }
  return <div className="story-visual"><div className="story-converge flex w-full justify-center gap-3" aria-hidden="true"><MessageCircle /><MessageCircle /><MessageCircle /></div><ArrowDown aria-hidden="true" className="my-7 size-6 text-muted-foreground" /><div className="story-website w-full border-y border-foreground py-7 text-center"><span className="text-3xl font-semibold uppercase tracking-tight sm:text-5xl">Website.</span><p className="mt-3 text-sm text-muted-foreground">Velez Creation</p></div></div>
}
