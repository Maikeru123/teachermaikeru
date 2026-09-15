export type StoryVisual =
  | "image"
  | "cleaning"
  | "services"
  | "scope"
  | "transform"
  | "tech"
  | "timeline"
  | "collaboration"
  | "interface"
  | "deadline"
  | "keywords"
  | "home"
  | "offline"
  | "inquiries"
  | "website"
  | "family"
  | "reflection"
  | "market"
  | "departure"
  | "responsibilities"
  | "clinic"
  | "records"
  | "maintenance"
  | "acs-stack"
  | "responsibility"
export type StoryScene = {
  label: string
  title: string[]
  supporting?: string
  visual: StoryVisual
  items?: string[]
}
export type ProjectStory = {
  id: string
  title: string
  category: string
  teaser: string
  image: string
  role?: string
  tech?: string[]
  scenes: StoryScene[]
}

// Story content supplied by Michael. Add verified details only.
export const projectStories: ProjectStory[] = [
  {
    id: "massageease",
    title: "MassageEase",
    category: "Undergraduate Capstone",
    teaser: "From a broad service-finder idea to a focused massage platform.",
    image: "/MassageEase.png",
    role: "Backend Developer",
    tech: ["Supabase", "Google Maps API", "Gale-Shapley Algorithm"],
    scenes: [
      {
        label: "The spark",
        title: ["It started", "with someone", "cleaning."],
        supporting:
          "I started thinking about how people find workers for everyday services.",
        visual: "cleaning",
      },
      {
        label: "The bigger idea",
        title: ["One platform.", "Many services."],
        supporting: "A centralized finder for everyday jobs.",
        visual: "services",
      },
      {
        label: "The feedback",
        title: ["Then our panel", "challenged the idea."],
        supporting:
          "We were encouraged to narrow the scope instead of building something too broad.",
        visual: "scope",
      },
      {
        label: "The pivot",
        title: ["We chose", "massage services."],
        supporting: "That focus became MassageEase.",
        visual: "transform",
      },
      {
        label: "The build",
        title: ["I handled", "the backend."],
        visual: "tech",
      },
      {
        label: "The outcome",
        title: ["From a broader idea", "to our capstone", "journey."],
        supporting:
          "MassageEase became part of our undergraduate journey until graduation.",
        visual: "timeline",
        items: ["Idea", "Focus", "Build", "Capstone", "Graduation"],
      },
    ],
  },
  {
    id: "eventhub",
    title: "EventHub",
    category: "Open-Market Project",
    teaser:
      "A useful project for open-market organizers. A new stack and real lessons.",
    image: "/EventHub.png",
    role: "Frontend Developer",
    tech: ["ASP.NET", "HTML", "CSS", "JavaScript"],
    scenes: [
      {
        label: "The introduction",
        title: ["EventHub.", "Built to be used."],
        supporting:
          "A working project used by people organizing occasional open markets.",
        visual: "image",
      },
      {
        label: "In practice",
        title: ["For people", "bringing markets", "to life."],
        supporting:
          "EventHub had real practical use for open-market organizers.",
        visual: "market",
      },
      {
        label: "The stack",
        title: ["A new stack.", "Learning by doing."],
        supporting: "Building with ASP.NET taught me a lot along the way.",
        visual: "tech",
      },
      {
        label: "My role",
        title: ["I built", "the frontend."],
        visual: "interface",
      },
      {
        label: "The change",
        title: ["My partner left.", "I carried it alone."],
        supporting:
          "When my partner abandoned the project, the remaining work fell to me.",
        visual: "departure",
      },
      {
        label: "The reality",
        title: ["Other work", "needed me too."],
        supporting:
          "With other projects and responsibilities to handle, development eventually stopped.",
        visual: "responsibilities",
      },
      {
        label: "What stayed",
        title: ["The work stopped.", "Its value remained."],
        supporting:
          "It served real organizers and left me with experience I could carry forward.",
        visual: "keywords",
        items: ["ASP.NET", "Real use", "Frontend", "Responsibility"],
      },
    ],
  },
  {
    id: "velez-creation",
    title: "Velez Creation",
    category: "Family Business Website",
    teaser:
      "From questions coming through me to inquiries going straight to our family business.",
    image: "/VelezToga.png",
    scenes: [
      {
        label: "A personal beginning",
        title: ["A website", "for my family."],
        supporting:
          "This story started with our family-owned toga rental business.",
        visual: "image",
      },
      {
        label: "The old way",
        title: ["A business built", "on conversations."],
        supporting:
          "Word of mouth, tarpaulins and manual inquiries brought people to us.",
        visual: "offline",
      },
      {
        label: "In the middle",
        title: ["They often", "asked me first."],
        supporting:
          "Being the owner's son made me the go-between for prices and rental details.",
        visual: "family",
      },
      {
        label: "The realization",
        title: ["The same questions.", "Again and again."],
        supporting:
          "Customers needed an easier way to ask the business directly.",
        visual: "inquiries",
      },
      {
        label: "The solution",
        title: ["So I built", "a website."],
        supporting:
          "A direct inquiry path to the business, instead of always going through me.",
        visual: "website",
      },
      {
        label: "Why I built it",
        title: ["No assignment.", "Just a problem", "I kept seeing."],
        supporting: "I wanted to build something useful for my family.",
        visual: "home",
      },
      {
        label: "The lesson",
        title: ["A little", "less friction."],
        supporting: "Sometimes that is enough reason to build something.",
        visual: "reflection",
      },
    ],
  },
  {
    id: "acs",
    title: "ACS",
    category: "Doctor-Patient Management / Clinic System",
    teaser:
      "Real responsibility maintaining a working clinic system during my internship.",
    image: "/acs.png",
    role: "Backend Developer",
    tech: ["C#", "Entity Framework"],
    scenes: [
      {
        label: "The introduction",
        title: ["ACS was a real", "system I handled", "during my internship."],
        supporting:
          "It was part of my responsibility to maintain and support the system.",
        visual: "image",
      },
      {
        label: "The system",
        title: ["A clinic.", "Connected records."],
        supporting:
          "A doctor-patient management system for appointments and patient information.",
        visual: "clinic",
      },
      {
        label: "Everyday use",
        title: ["Appointments.", "Patients.", "Their history."],
        visual: "records",
      },
      {
        label: "My role",
        title: ["I worked", "on the backend."],
        supporting:
          "I handled maintenance and backend-related responsibilities.",
        visual: "maintenance",
      },
      {
        label: "The stack",
        title: ["C#.", "Entity Framework."],
        visual: "acs-stack",
      },
      {
        label: "What it meant",
        title: ["A working system.", "Real responsibility."],
        supporting:
          "My internship gave me responsibility for maintaining a system already in use.",
        visual: "responsibility",
      },
    ],
  },
]
