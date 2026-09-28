"use client"

import type { SkillDetail } from "@/lib/skills"
import { DetailModal } from "./detail-modal"

function skillId(name: string) {
  return `skill-dialog-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`
}

export function SkillDetailDialog({
  onClose,
  skill,
}: {
  onClose: () => void
  skill: SkillDetail
}) {
  const titleId = skillId(skill.name)

  return (
    <DetailModal
      topbarLabel="Technical skill detail"
      closeLabel={`Close ${skill.name} detail`}
      labelledBy={titleId}
      onClose={onClose}
    >
      <div className="skill-detail-content">
        <div className="skill-detail-heading">
          <p>{skill.type}</p>
          <h2 id={titleId} tabIndex={-1} data-modal-heading>
            {skill.name}
          </h2>
        </div>

        <div className="skill-detail-explanation">
          {skill.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {skill.usage && (
            <p className="skill-detail-usage">
              <span>{skill.usage.label}:</span> {skill.usage.value}
            </p>
          )}
        </div>
      </div>
    </DetailModal>
  )
}
