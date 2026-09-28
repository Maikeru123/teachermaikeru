"use client"

import { X } from "lucide-react"
import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import styles from "./detail-modal.module.css"

export function DetailModal({
  children,
  closeLabel,
  labelledBy,
  onClose,
  topbarLabel,
}: {
  children: ReactNode
  closeLabel: string
  labelledBy: string
  onClose: () => void
  topbarLabel: string
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const backdropPress = useRef(false)

  useEffect(() => {
    const element = dialog.current!
    const opener = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    const rootOverflow = document.documentElement.style.overflow

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    window.dispatchEvent(new CustomEvent("lenis:pause"))
    element.showModal()
    element
      .querySelector<HTMLElement>("[data-modal-heading]")
      ?.focus({ preventScroll: true })

    return () => {
      element.close()
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = rootOverflow
      window.dispatchEvent(new CustomEvent("lenis:resume"))
      opener?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialog}
      className={styles.dialog}
      data-lenis-prevent
      aria-modal="true"
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        backdropPress.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (backdropPress.current && event.target === event.currentTarget)
          onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return

        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
          )
        ).filter((control) => control.getClientRects().length > 0)
        const index = controls.indexOf(document.activeElement as HTMLElement)
        const next = event.shiftKey
          ? index <= 0
            ? controls.length - 1
            : index - 1
          : index >= controls.length - 1
            ? 0
            : index + 1

        if (!controls.length) return
        event.preventDefault()
        controls[next]?.focus()
      }}
    >
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <p>{topbarLabel}</p>
          <button
            type="button"
            className={styles.closeButton}
            aria-label={closeLabel}
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body
  )
}
