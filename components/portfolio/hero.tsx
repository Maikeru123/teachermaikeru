"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { ArrowButton } from "./primitives"
import { RandomFact } from "./random-fact"
import { TechStackShowcase } from "./tech-stack-showcase"

function HeroIntro() {
  return (
    <div className="hero-intro max-w-[235px] sm:max-w-[320px]">
      <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">Michael Aguido L. Velez</p>
      <p className="text-2xl font-semibold leading-tight tracking-[-0.05em]">IT Educator &amp; Software Developer</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
        IT educator specializing in web, mobile application development, and databases while combining teaching with hands-on software development.
      </p>
      <a href="#work" className="group mt-3 inline-block"><ArrowButton>View projects</ArrowButton></a>
    </div>
  )
}

function HeroWordmark() {
  return (
    <h1 className="hero-wordmark whitespace-nowrap text-[clamp(2.75rem,8.45vw,8.1rem)] font-medium leading-none tracking-[-0.09em] text-zinc-950 dark:text-zinc-100">
      <span className="font-light text-transparent [-webkit-text-stroke:1.5px_#18181b] sm:[-webkit-text-stroke:2px_#18181b] dark:[-webkit-text-stroke:1.5px_#f4f4f5] sm:dark:[-webkit-text-stroke:2px_#f4f4f5]">MICHAEL</span>{" "}
      <span className="font-extrabold">VELEZ</span>
    </h1>
  )
}

function Portrait({ imageSrc, desktop = false }: { imageSrc: string; desktop?: boolean }) {
  return (
    <div className={desktop ? "hero-portrait relative h-[510px] w-[530px] justify-self-center" : "hero-portrait absolute -right-10 bottom-0 z-10 h-[300px] w-[300px] max-w-none"}>
      <Image
        src={imageSrc}
        alt="Michael Velez"
        fill
        preload
        sizes="(max-width: 640px) 100vw, 530px"
        className={desktop ? "hero-portrait-cut -translate-y-[90px] scale-[0.99] object-contain object-top drop-shadow-[0_8px_14px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_0_24px_rgba(161,161,170,0.14)]" : "translate-y-[78px] scale-[0.95] object-contain object-top drop-shadow-[0_8px_14px_rgba(0,0,0,0.12)]"}
      />
    </div>
  )
}

export function Hero() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
  const { resolvedTheme } = useTheme()
  const imageSrc = mounted && resolvedTheme === "dark" ? "/pic2white.png" : "/pic1.png"

  return (
    <section className="section-frame relative isolate min-h-[650px] overflow-hidden bg-background lg:min-h-svh" aria-label="Introduction">
      <div className="relative isolate min-h-[650px] overflow-hidden lg:min-h-svh">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 bottom-[-25px] z-0 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,212,216,0.68)_0%,rgba(228,228,231,0.34)_46%,transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(63,63,70,0.3)_0%,rgba(39,39,42,0.16)_46%,transparent_72%)] sm:inset-x-0 sm:bottom-[-55px] sm:mx-auto sm:h-[560px] sm:w-[560px] lg:h-[590px] lg:w-[590px]"
        />

        <div className="relative z-10 hidden min-h-svh flex-col px-[8%] pb-0 pt-5 lg:flex">
          <div className="flex shrink-0 flex-col items-center gap-14">
            <div aria-hidden="true" className="h-2" />
            <HeroWordmark />
          </div>
          <div className="relative grid min-h-[680px] flex-1 grid-cols-[minmax(260px,0.82fr)_minmax(390px,1fr)_minmax(400px,1.05fr)] items-end gap-6 xl:min-h-[660px]">
            <div className="absolute right-0 top-6 z-20 w-[min(30vw,360px)]"><RandomFact /></div>
            <div className="self-end pb-[180px]"><HeroIntro /></div>
            <Portrait imageSrc={imageSrc} desktop />
            <div className="self-end justify-self-end pb-[204px] translate-x-16"><TechStackShowcase /></div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="pointer-events-none absolute inset-x-6 top-[110px] z-0 flex justify-center overflow-hidden">
            <HeroWordmark />
          </div>
          <Portrait imageSrc={imageSrc} />
          <div className="absolute left-6 top-[195px] z-20"><HeroIntro /></div>
        </div>
      </div>
      <div className="relative px-6 pb-10 pt-8 sm:px-12 lg:hidden">
        <div className="max-w-sm sm:ml-auto"><RandomFact /></div>
      </div>
    </section>
  )
}
