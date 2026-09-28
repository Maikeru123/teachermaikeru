"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_5px_10px_rgba(0,0,0,0.18)] transition-[background-color,color,border-color,box-shadow,opacity,transform] hover:-translate-y-0.5 hover:border-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Moon
        aria-hidden="true"
        className="absolute size-4 scale-100 opacity-100 transition-[opacity,transform] duration-300 ease-out dark:scale-75 dark:opacity-0 motion-reduce:transition-none"
        strokeWidth={1.8}
      />
      <Sun
        aria-hidden="true"
        className="absolute size-4 scale-75 opacity-0 transition-[opacity,transform] duration-300 ease-out dark:scale-100 dark:opacity-100 motion-reduce:transition-none"
        strokeWidth={1.8}
      />
    </button>
  )
}
