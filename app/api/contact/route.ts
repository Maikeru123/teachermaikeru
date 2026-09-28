import { createHash } from "node:crypto"
import { validateContact, type ContactFields } from "@/lib/contact"

export const runtime = "nodejs"

const failure = "Something went wrong. Please try again."
const defaultRecipient = "michaelvelez112301@gmail.com"

function logContactFailure(
  event: string,
  context?: Record<string, number | string | string[] | null>
) {
  console.error(`[contact] ${event}`, context ?? {})
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: failure }, { status: 415 })
  }
  // Browsers must submit from this site's origin. This complements the honeypot.
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: failure }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    // Bound streamed input too, including requests without Content-Length.
    const reader = request.body?.getReader()
    if (!reader) return Response.json({ error: failure }, { status: 400 })
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 32768) {
        await reader.cancel()
        return Response.json({ error: failure }, { status: 413 })
      }
      chunks.push(value)
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error("Invalid body")
  } catch {
    return Response.json({ error: failure }, { status: 400 })
  }

  if (typeof body.website !== "string" || body.website !== "") {
    return Response.json({ error: failure }, { status: 400 })
  }
  if (
    !["name", "email", "phone", "message"].every(
      (key) => typeof body[key] === "string"
    )
  ) {
    return Response.json({ error: failure }, { status: 400 })
  }
  const fields: ContactFields = {
    name: (body.name as string).trim(),
    email: (body.email as string).trim(),
    phone: (body.phone as string).trim(),
    message: (body.message as string).trim(),
  }
  const errors = validateContact(fields)
  if (Object.keys(errors).length)
    return Response.json({ errors }, { status: 400 })
  if (
    typeof body.submissionId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.submissionId
    )
  ) {
    return Response.json({ error: failure }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() || defaultRecipient
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    (process.env.NODE_ENV !== "production"
      ? "Portfolio Contact <onboarding@resend.dev>"
      : "")
  if (!apiKey || !from) {
    const missing = [
      !apiKey ? "RESEND_API_KEY" : "",
      !from ? "CONTACT_FROM_EMAIL" : "",
    ].filter(Boolean)
    logContactFailure("Email delivery is not configured", { missing })
    return Response.json({ error: failure }, { status: 503 })
  }

  try {
    const payload = {
      from,
      to: [to],
      reply_to: fields.email,
      subject: `Portfolio Contact — ${fields.name}`,
      text: `New portfolio inquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nContact number: ${fields.phone || "Not provided"}\n\nMessage:\n${fields.message}`,
    }
    // Retrying an uncertain request uses the same key, avoiding duplicate emails.
    const digest = createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex")
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${body.submissionId}/${digest}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) {
      logContactFailure("Resend rejected the email", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
      })
      return Response.json({ error: failure }, { status: 502 })
    }
    const result = await response.json()
    if (!result.id) {
      logContactFailure("Resend returned an unexpected response", {
        requestId: response.headers.get("x-request-id"),
      })
      return Response.json({ error: failure }, { status: 502 })
    }
    return Response.json({ success: true })
  } catch (error) {
    logContactFailure("Email request failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    })
    return Response.json({ error: failure }, { status: 502 })
  }
}
