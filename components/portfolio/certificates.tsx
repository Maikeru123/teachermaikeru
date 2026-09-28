"use client"

import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { useState } from "react"
import { CertificateDialog } from "./certificate-dialog"
import styles from "./certificates.module.css"

export type Certificate = {
  src: string
  title: string
  credential: string
  date: string
  description: string
}

export const certificates: Certificate[] = [
  {
    src: "/cert1.png",
    title: "Cybersecurity",
    credential: "Information Technology Specialist",
    date: "October 11, 2024",
    description:
      "This certification demonstrates foundational understanding of cybersecurity concepts, including common threats, security principles, risk awareness, and practices used to protect digital systems and information.",
  },
  {
    src: "/cert2.png",
    title: "Databases",
    credential: "Information Technology Specialist",
    date: "March 10, 2023",
    description:
      "This certification demonstrates foundational knowledge of database concepts, including data organization, tables, relationships, queries, and basic database management principles.",
  },
  {
    src: "/cert3.png",
    title: "HTML and CSS",
    credential: "Information Technology Specialist",
    date: "May 18, 2023",
    description:
      "This certification demonstrates foundational ability to structure and style web pages using HTML and CSS, including page layout, formatting, and basic responsive design concepts.",
  },
  {
    src: "/cert4.png",
    title: "Network Security",
    credential: "Information Technology Specialist",
    date: "July 15, 2024",
    description:
      "This certification demonstrates foundational understanding of network security concepts, including protecting systems and networks, recognizing common threats, and applying basic security practices.",
  },
  {
    src: "/cert5.png",
    title: "Networking",
    credential: "Information Technology Specialist",
    date: "December 14, 2023",
    description:
      "This certification demonstrates foundational knowledge of networking concepts, including how devices communicate, basic network configuration, connectivity, protocols, and network troubleshooting.",
  },
]

function CertificateCard({
  certificate,
  index,
  duplicate = false,
  onOpen,
  onBlur,
}: {
  certificate: Certificate
  index: number
  duplicate?: boolean
  onOpen: () => void
  onBlur: () => void
}) {
  return (
    <div className={styles.cardItem} role={duplicate ? undefined : "listitem"}>
      <button
        type="button"
        className={styles.card}
        data-certificate-index={index}
        tabIndex={duplicate ? -1 : 0}
        aria-label={`View details for ${certificate.title} certificate`}
        onClick={onOpen}
        onBlur={onBlur}
      >
        <span className={styles.imageFrame}>
          <Image
            src={certificate.src}
            alt={`${certificate.title} certificate`}
            fill
            sizes="(max-width: 639px) 78vw, (max-width: 1023px) 44vw, 360px"
            className={styles.image}
          />
        </span>
        <span className={styles.cardCopy}>
          <span className={styles.cardTitle}>{certificate.title}</span>
          <span className={styles.cardCredential}>
            {certificate.credential}
          </span>
        </span>
      </button>
    </div>
  )
}

export function Certificates() {
  const [selected, setSelected] = useState<number | null>(null)
  const [resumeAfterDialog, setResumeAfterDialog] = useState(false)

  function openCertificate(index: number, duplicate = false) {
    if (duplicate) {
      document
        .querySelector<HTMLButtonElement>(
          `#certificates button[data-certificate-index="${index}"][tabindex="0"]`
        )
        ?.focus({ preventScroll: true })
    }

    setResumeAfterDialog(false)
    setSelected(index)
  }

  function closeCertificate() {
    setResumeAfterDialog(true)
    setSelected(null)
  }

  return (
    <section
      id="certificates"
      className="page-container section-frame story-section certifications-section bg-background"
      aria-labelledby="certificates-heading"
    >
      <div className="chapter-bridge" aria-hidden="true">
        <span />
        <ArrowDown className="size-4" />
        <span />
      </div>
      <header className="story-header">
        <p className="story-kicker">CONTINUED LEARNING</p>
        <h2 id="certificates-heading" className="story-title">
          CERTIFICATIONS
        </h2>
        <p className="story-summary">Learning beyond the degree.</p>
      </header>

      <div
        className={styles.marquee}
        data-modal-open={selected !== null}
        data-resume-after-dialog={resumeAfterDialog}
        aria-label="Certification showcase"
      >
        <div className={styles.track}>
          <div className={styles.group} role="list" aria-label="Certificates">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.src}
                certificate={certificate}
                index={index}
                onOpen={() => openCertificate(index)}
                onBlur={() => setResumeAfterDialog(false)}
              />
            ))}
          </div>
          <div
            className={`${styles.group} ${styles.duplicateGroup}`}
            aria-hidden="true"
          >
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={`${certificate.src}-duplicate`}
                certificate={certificate}
                index={index}
                duplicate
                onOpen={() => openCertificate(index, true)}
                onBlur={() => setResumeAfterDialog(false)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected !== null && (
        <CertificateDialog
          certificate={certificates[selected]}
          onClose={closeCertificate}
        />
      )}
    </section>
  )
}
