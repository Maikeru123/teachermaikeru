"use client"

import { ArrowUpRight, LoaderCircle } from "lucide-react"
import { useRef, useState, type FormEvent } from "react"
import { contactLimits, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact"

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Contact Number", type: "tel", autoComplete: "tel" },
  { name: "message", label: "Message", type: "text", autoComplete: "off" },
] as const

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const inFlight = useRef(false)
  const attempt = useRef({ payload: "", id: "" })

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const values: ContactFields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    }
    const validation = validateContact(values)
    setErrors(validation)
    setStatus("idle")
    if (Object.keys(validation).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus()
      return
    }
    const payload = JSON.stringify({ ...values, website: String(data.get("website") ?? "") })
    if (attempt.current.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() }
    inFlight.current = true
    setStatus("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(payload), submissionId: attempt.current.id }),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || result.success !== true) {
        if (result.errors) setErrors(result.errors)
        throw new Error("Submission failed")
      }
      setStatus("success")
      form.reset()
      attempt.current = { payload: "", id: "" }
    } catch {
      setStatus("error")
    } finally {
      inFlight.current = false
    }
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Send Michael a message" aria-busy={status === "sending"} className="min-w-0">
      <fieldset disabled={status === "sending"} className="grid min-w-0 gap-5 disabled:opacity-70">
        <legend className="sr-only">Your contact details and message</legend>
        {fields.map((field) => {
          const shared = {
            id: `contact-${field.name}`,
            name: field.name,
            required: field.name !== "phone",
            maxLength: contactLimits[field.name],
            autoComplete: field.autoComplete,
            "aria-invalid": !!errors[field.name],
            "aria-describedby": errors[field.name] ? `contact-${field.name}-error` : undefined,
            className: "mt-2 block w-full min-w-0 rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
          }
          return (
            <div key={field.name}>
              <label htmlFor={shared.id} className="text-sm font-medium">
                {field.label} <span className="font-normal text-muted-foreground">{field.name === "phone" ? "(optional)" : "(required)"}</span>
              </label>
              {field.name === "message" ? <textarea {...shared} rows={5} className={`${shared.className} resize-y`} /> : <input {...shared} type={field.type} />}
              {errors[field.name] && <p id={`contact-${field.name}-error`} className="mt-2 text-xs text-foreground">{errors[field.name]}</p>}
            </div>
          )
        })}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:cursor-wait sm:w-fit">
          {status === "sending" ? <>Sending...<LoaderCircle aria-hidden="true" className="size-4 animate-spin" /></> : <>Send Message<ArrowUpRight aria-hidden="true" className="size-4" /></>}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 min-h-10 text-sm leading-relaxed text-muted-foreground">
        {status === "success" && "Message sent successfully. I'll get back to you soon."}
        {status === "error" && "Something went wrong. Please try again."}
      </p>
    </form>
  )
}
