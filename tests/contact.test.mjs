import assert from "node:assert/strict"
import { registerHooks } from "node:module"
import { test } from "node:test"

// Resolve the app alias for Node's native TypeScript test runner.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/contact") {
      return { url: new URL("../lib/contact.ts", import.meta.url).href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  },
})
const { POST } = await import("../app/api/contact/route.ts")
const valid = {
  name: "Juan Dela Cruz", email: "juan@example.com", phone: "09123456789",
  message: "Hello Michael, let's discuss a project.", website: "",
  submissionId: "967c9a34-4a04-470b-bb04-d7d9056ee7ae",
}
function request(body, headers = {}) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

test("contact endpoint validation and email delivery contract", async (t) => {
  const envKeys = ["RESEND_API_KEY", "CONTACT_EMAIL", "CONTACT_FROM_EMAIL"]
  const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))
  t.after(() => {
    for (const key of envKeys) {
      if (previousEnv[key] === undefined) delete process.env[key]
      else process.env[key] = previousEnv[key]
    }
  })
  process.env.RESEND_API_KEY = "test-private-key"
  process.env.CONTACT_EMAIL = "owner@example.com"
  process.env.CONTACT_FROM_EMAIL = "Portfolio <contact@example.com>"
  const calls = []
  const emailFetch = t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, init })
    return Response.json({ id: "test-email-id" })
  })

  for (const payload of ["{broken", null, [], { ...valid, name: 4 }, { ...valid, submissionId: "bad" }, { ...valid, website: "spam.example" }]) {
    assert.equal((await POST(request(payload))).status, 400)
  }
  const invalid = await POST(request({ ...valid, name: " ", email: "invalid", message: " " }))
  assert.deepEqual((await invalid.json()).errors, {
    name: "Please enter your name.", email: "Please enter a valid email.", message: "Please enter a message.",
  })
  for (const payload of [{ ...valid, name: "Injected\r\nSubject: spam" }, { ...valid, message: "a".repeat(5001) }, { ...valid, email: "a@b.com\nBcc: x@y.com" }]) {
    assert.equal((await POST(request(payload))).status, 400)
  }
  assert.equal((await POST(request("a".repeat(32769)))).status, 413)
  assert.equal((await POST(request(valid, { Origin: "https://attacker.example" }))).status, 403)
  assert.equal((await POST(request(valid, { "Content-Type": "text/plain" }))).status, 415)
  assert.equal(calls.length, 0, "Invalid submissions never call the email service")

  process.env.RESEND_API_KEY = ""
  assert.equal((await POST(request(valid))).status, 503)
  assert.equal(calls.length, 0)
  process.env.RESEND_API_KEY = "test-private-key"

  assert.deepEqual(await (await POST(request(valid))).json(), { success: true })
  const sent = JSON.parse(calls[0].init.body)
  assert.equal(calls[0].url, "https://api.resend.com/emails")
  assert.deepEqual(sent.to, ["owner@example.com"])
  assert.equal(sent.from, "Portfolio <contact@example.com>")
  assert.equal(sent.reply_to, valid.email)
  assert.equal(sent.subject, "Portfolio Contact - Juan Dela Cruz")
  for (const value of [valid.name, valid.email, valid.phone, valid.message]) assert.ok(sent.text.includes(value))
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-private-key")
  await POST(request(valid))
  assert.equal(calls[0].init.headers["Idempotency-Key"], calls[1].init.headers["Idempotency-Key"])
  await POST(request({ ...valid, phone: "" }))
  assert.ok(JSON.parse(calls[2].init.body).text.includes("Contact Number: Not provided"))

  emailFetch.mock.mockImplementation(async () => Response.json({ message: "private provider detail" }, { status: 429 }))
  const rejected = await POST(request(valid))
  assert.equal(rejected.status, 502)
  assert.deepEqual(await rejected.json(), { error: "Something went wrong. Please try again." })
  emailFetch.mock.mockImplementation(async () => { throw new Error("network failure") })
  assert.equal((await POST(request(valid))).status, 502)
  emailFetch.mock.mockImplementation(async () => Response.json({}))
  assert.equal((await POST(request(valid))).status, 502)
})
