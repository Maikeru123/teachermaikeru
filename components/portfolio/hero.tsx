import Image from "next/image"
import portrait from "../../public/pic1.png"

import { ArrowButton, SocialPill } from "./primitives"

export function Hero() {
  return (
    <section className="section-frame relative isolate min-h-[650px] overflow-hidden bg-white sm:min-h-[680px] lg:min-h-[704px] dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-x-6 top-[110px] z-0 flex justify-center overflow-hidden sm:top-[160px]">
        <h1 className="hero-wordmark whitespace-nowrap text-[clamp(2.75rem,8.45vw,8.1rem)] font-medium leading-none tracking-[-0.09em] text-zinc-950 dark:text-zinc-100">
          <span className="font-light text-transparent [-webkit-text-stroke:1.5px_#18181b] sm:[-webkit-text-stroke:2px_#18181b] dark:[-webkit-text-stroke:1.5px_#f4f4f5] sm:dark:[-webkit-text-stroke:2px_#f4f4f5]">MICHAEL</span>{" "}
          <span className="font-extrabold">VELEZ</span>
        </h1>
      </div>

      <div className="hero-portrait absolute -right-10 bottom-0 z-10 h-[300px] w-[300px] max-w-none sm:inset-x-0 sm:mx-auto sm:h-[475px] sm:w-auto sm:max-w-[530px] lg:h-[510px]">
        <Image
          src={portrait}
          alt="Michael Velez"
          fill
          preload
          sizes="(max-width: 640px) 100vw, 530px"
          className="translate-y-[58px] scale-[0.95] object-contain object-top sm:translate-y-[115px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-white dark:bg-zinc-950" />
      </div>

      <div className="hero-intro absolute left-6 top-[195px] z-20 max-w-[235px] sm:bottom-[65px] sm:left-[8%] sm:top-auto sm:max-w-[320px]">
        <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">Michael Aguido L. Velez</p>
        <p className="text-[22px] font-semibold leading-tight tracking-[-0.055em] sm:text-[27px]">IT Educator &amp; Software Developer</p>
        <p className="mt-3 text-[14px] leading-[1.5] text-zinc-600 sm:text-[15px] dark:text-zinc-300">
          IT educator specializing in web, mobile application development, and databases while combining teaching with hands-on software development.
        </p>
        <a href="#work" className="group mt-3 inline-block"><ArrowButton>View projects</ArrowButton></a>
      </div>

      <div className="hero-socials absolute bottom-7 left-4 z-20 flex max-w-[170px] flex-wrap justify-start gap-2 sm:bottom-auto sm:left-auto sm:right-[4.5%] sm:top-[96px] sm:max-w-[calc(100%-3rem)] sm:flex-nowrap sm:justify-end">
        <SocialPill name="Instagram" />
        <SocialPill name="LinkedIn" />
        <SocialPill name="Email" />
        <SocialPill name="GitHub" />
      </div>
    </section>
  )
}
