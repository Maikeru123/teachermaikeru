const responsibilityGroups = [
  {
    title: "Teaching & course delivery",
    items: [
      "Teach web development concepts and technologies.",
      "Teach mobile application development.",
      "Teach database design, management, and implementation.",
      "Develop lectures, laboratory activities, exercises, and technical assessments.",
    ],
  },
  {
    title: "Student guidance",
    items: [
      "Guide students through programming and software development projects.",
      "Help students develop problem-solving, programming, and software development skills.",
    ],
  },
  {
    title: "Practical learning",
    items: ["Demonstrate practical applications of technologies discussed in class."],
  },
]

export function Experience() {
  return (
    <section id="experience" className="section-frame bg-transparent px-6 sm:px-12 lg:px-[4.5%]" aria-labelledby="experience-heading">
      <div className="overflow-hidden bg-zinc-800 px-5 py-9 text-white sm:px-6 sm:py-10 dark:bg-zinc-900">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 id="experience-heading" className="text-[32px] font-semibold tracking-[-0.05em]">PROFESSIONAL EXPERIENCE</h2>
            <p className="pt-2 text-[12px]">Current Position</p>
          </div>
        </div>
        <div className="relative mt-7 border-y border-white/15 py-5 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-sm text-zinc-300">University of Mindanao</p><h3 className="mt-1 text-2xl font-medium tracking-[-0.04em]">IT Educator</h3></div>
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] text-zinc-200">Current Position</span>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {responsibilityGroups.map((group) => (
              <section key={group.title}>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">{group.title}</h4>
                <div className="mt-2 space-y-2">
                  {group.items.map((item) => <p className="flex gap-2 text-sm leading-relaxed text-zinc-300 sm:text-base" key={item}><span className="mt-2 size-1 shrink-0 rounded-full bg-white" />{item}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
        <article className="border-b border-white/15 py-5 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-sm text-zinc-300">Aquilla Software</p><h3 className="mt-1 text-2xl font-medium tracking-[-0.04em]">Software Development Intern</h3></div>
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] text-zinc-200">3-Month Internship</span>
          </div>
          <p className="mt-5 max-w-[900px] text-sm leading-relaxed text-zinc-300 sm:text-base">Completed a three-month software development internship at Aquilla Software, where I contributed to a Doctor-Patient Management System. The experience provided hands-on exposure to developing a real-world software solution and working within a professional development environment.</p>
          <div className="mt-5 rounded-sm border border-white/15 bg-white/[0.035] p-4 sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">Project Handled</p>
            <h4 className="mt-2 text-xl font-medium">Doctor-Patient Management System</h4>
            <p className="mt-1 text-sm leading-relaxed text-zinc-300 sm:text-base">A management system designed to support and organize doctor-patient processes and information within a centralized application.</p>
          </div>
          <div className="mt-5 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {[
              "Contributed to the development of a Doctor-Patient Management System.",
              "Applied software development concepts in a real-world project.",
              "Gained hands-on experience working within a professional software development environment.",
              "Participated in the development and improvement of system functionality.",
              "Gained experience translating project requirements into working software features.",
            ].map((highlight) => <p className="flex gap-2 text-sm leading-relaxed text-zinc-300 sm:text-base" key={highlight}><span className="mt-2 size-1 shrink-0 rounded-full bg-white" />{highlight}</p>)}
          </div>
        </article>
      </div>
    </section>
  )
}
