"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Certificate } from "./certificates"
import { DetailModal } from "./detail-modal"
import styles from "./certificates.module.css"

export function CertificateDialog({
  certificate,
  onClose,
}: {
  certificate: Certificate
  onClose: () => void
}) {
  return (
    <DetailModal
      topbarLabel="Certificate detail"
      closeLabel="Close certificate detail"
      labelledBy="certificate-dialog-title"
      onClose={onClose}
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogImageFrame}>
          <Image
            src={certificate.src}
            alt={`${certificate.title} certificate`}
            fill
            sizes="(max-width: 767px) 86vw, 58vw"
            className={styles.dialogImage}
          />
        </div>

        <div className={styles.dialogDetails}>
          <p className={styles.dialogCredential}>{certificate.credential}</p>
          <h2
            tabIndex={-1}
            data-modal-heading
            id="certificate-dialog-title"
            className={styles.dialogTitle}
          >
            {certificate.title}
          </h2>
          <p className={styles.dialogDescription}>{certificate.description}</p>

          <dl className={styles.metadata}>
            <div>
              <dt>Date awarded</dt>
              <dd>{certificate.date}</dd>
            </div>
          </dl>

          <a
            className={styles.openCertificate}
            href={certificate.src}
            target="_blank"
            rel="noreferrer"
          >
            Open Full Certificate <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </DetailModal>
  )
}
