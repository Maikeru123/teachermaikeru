/* eslint-disable @next/next/no-img-element -- next/og renders this image server-side. */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const alt = "Michael Velez — IT Educator & Software Developer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function OpenGraphImage() {
  const portraitData = await readFile(join(process.cwd(), "public", "pic1.png"), "base64")
  const portrait = `data:image/png;base64,${portraitData}`

  return new ImageResponse(
    (
      <div
        style={{
          background: "#18181b",
          color: "#fafafa",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "58px 64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "660px" }}>
          <div
            style={{
              alignItems: "center",
              background: "#27272a",
              alignSelf: "flex-start",
              borderRadius: "999px",
              display: "flex",
              fontSize: 20,
              padding: "11px 18px",
            }}
          >
            <span style={{ background: "#10b981", borderRadius: "999px", display: "flex", height: 10, marginRight: 10, width: 10 }} />
            IT Educator · University of Mindanao
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "88px" }}>
            <span style={{ color: "#a1a1aa", fontSize: 23, letterSpacing: "0.14em" }}>MICHAEL AGUIDO L. VELEZ</span>
            <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1.05, marginTop: 16 }}>IT Educator &amp; Software Developer</span>
            <span style={{ color: "#d4d4d8", fontSize: 27, lineHeight: 1.35, marginTop: 26 }}>Educator. Developer. Continuous learner.</span>
          </div>
        </div>
        <img
          alt=""
          height={560}
          src={portrait}
          style={{ bottom: "-42px", objectFit: "contain", position: "absolute", right: "-6px", width: "540px" }}
        />
      </div>
    ),
    size,
  )
}
