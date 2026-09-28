type TeachingGraphicKind = "web" | "mobile" | "database"

const descriptions = {
  web: "A browser assembles a navigation bar, content, and an action button into a webpage.",
  mobile: "A phone interface assembles a profile, content rows, and a bottom navigation bar.",
  database: "Student, enrollment, and course records connect through relationships.",
}

export function TeachingGraphic({ kind }: { kind: TeachingGraphicKind }) {
  return (
    <svg className={`teaching-graphic teaching-graphic--${kind}`} viewBox="0 0 320 200" role="img" aria-label={descriptions[kind]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === "web" && <>
        <g className="lesson-piece lesson-piece--first"><rect x="24" y="20" width="272" height="160" rx="8" /><path d="M24 47h272" /><circle cx="38" cy="34" r="2" /><circle cx="48" cy="34" r="2" /><circle cx="58" cy="34" r="2" /></g>
        <g className="lesson-piece lesson-piece--second"><rect x="40" y="64" width="94" height="96" rx="4" className="lesson-soft" /><path d="m52 134 22-28 18 15 20-34 12 47" /></g>
        <g className="lesson-piece lesson-piece--third"><path d="M154 71h115m-115 14h86m-86 20h120m-120 12h103" /><rect x="154" y="138" width="68" height="22" rx="11" className="lesson-solid" /></g>
      </>}
      {kind === "mobile" && <>
        <g className="lesson-piece lesson-piece--first"><rect x="109" y="9" width="102" height="182" rx="16" /><path d="M145 21h30m-29 159h28" /></g>
        <g className="lesson-piece lesson-piece--second"><circle cx="135" cy="53" r="11" className="lesson-soft" /><path d="M155 48h41m-41 10h30" /><rect x="124" y="76" width="72" height="39" rx="5" className="lesson-soft" /></g>
        <g className="lesson-piece lesson-piece--third"><path d="M124 130h72m-72 11h52" /><rect x="124" y="155" width="72" height="14" rx="7" className="lesson-solid" /></g>
      </>}
      {kind === "database" && <>
        <g className="lesson-piece lesson-piece--first"><rect x="10" y="20" width="126" height="61" rx="5" /><path d="M10 47h126" /><text x="73" y="38">Students</text><text x="73" y="66" className="lesson-field">student_id</text></g>
        <g className="lesson-piece lesson-piece--second"><rect x="184" y="20" width="126" height="61" rx="5" /><path d="M184 47h126" /><text x="247" y="38">Courses</text><text x="247" y="66" className="lesson-field">course_id</text></g>
        <g className="lesson-piece lesson-piece--third"><rect x="97" y="129" width="126" height="61" rx="5" className="lesson-soft" /><path d="M97 156h126" /><text x="160" y="147">Enrollments</text><text x="160" y="176" className="lesson-field">student_id · course_id</text></g>
        <path d="M73 81v23h59v25M247 81v23h-59v25" pathLength="1" className="lesson-connection" />
      </>}
    </svg>
  )
}
