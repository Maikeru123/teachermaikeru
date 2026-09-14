import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: "Michael Velez | IT Educator & Software Developer",
  description: "Portfolio of Michael Aguido L. Velez, an IT Educator and Software Developer.",
  openGraph: {
    title: "Michael Velez | IT Educator & Software Developer",
    description: "Educator. Developer. Continuous learner.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Velez | IT Educator & Software Developer",
    description: "Educator. Developer. Continuous learner.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  )
}
