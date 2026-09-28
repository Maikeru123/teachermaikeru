import Image from "next/image"

import { ArrowButton } from "./primitives"
import { RandomFact } from "./random-fact"
import { TechStackShowcase } from "./tech-stack-showcase"

function HeroIntro() {
  return (
    <div className="hero-intro">
      <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Michael Aguido L. Velez</p>
      <p className="text-2xl font-semibold leading-tight tracking-[-0.05em]">IT Educator &amp; Software Developer</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        IT educator specializing in web, mobile application development, and databases while combining teaching with hands-on software development.
      </p>
      <a href="#projects" className="group mt-3 inline-block"><ArrowButton>View projects</ArrowButton></a>
    </div>
  )
}

function HeroWordmark() {
  return (
    <h1 className="hero-wordmark whitespace-nowrap font-medium leading-none tracking-[-0.09em] text-foreground">
      <span className="font-light text-transparent [-webkit-text-stroke:1.5px_var(--foreground)] sm:[-webkit-text-stroke:2px_var(--foreground)]">MICHAEL</span>{" "}
      <span className="font-extrabold">VELEZ</span>
    </h1>
  )
}

function Portrait() {
  return (
    <div className="hero-portrait">
      <Image
        src="/pic1.png"
        alt="Michael Velez"
        fill
        preload
        sizes="(max-width: 639px) min(320px, 92vw), (max-width: 1023px) min(380px, 44vw), (max-width: 1279px) 34vw, (max-width: 1678px) 470px, (max-width: 2142px) 28vw, 600px"
        className="hero-portrait-cut hero-portrait-image object-contain object-top opacity-100 drop-shadow-[0_8px_14px_rgba(0,0,0,0.12)] dark:opacity-0"
      />
      <Image
        src="/pic2white.png"
        alt=""
        aria-hidden="true"
        fill
        preload
        sizes="(max-width: 639px) min(320px, 92vw), (max-width: 1023px) min(380px, 44vw), (max-width: 1279px) 34vw, (max-width: 1678px) 470px, (max-width: 2142px) 28vw, 600px"
        className="hero-portrait-cut hero-portrait-image object-contain object-top opacity-0 drop-shadow-[0_0_24px_color-mix(in_srgb,var(--muted-foreground)_14%,transparent)] dark:opacity-100"
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="section-frame hero-section relative isolate bg-background" aria-label="Introduction">
      <div className="page-container hero-container">
        <HeroWordmark />
        <div className="hero-composition">
          <HeroIntro />
          <Portrait />
          <div className="hero-details">
            <div className="hero-fact"><RandomFact /></div>
            <TechStackShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}
