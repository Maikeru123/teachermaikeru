export type StoryVisual = "image" | "services" | "scope" | "transform" | "tech" | "timeline" | "collaboration" | "interface" | "deadline" | "keywords" | "home" | "offline" | "inquiries" | "website" | "family" | "reflection"
export type StoryScene = { label: string; title: string[]; supporting?: string; visual: StoryVisual; items?: string[] }
export type ProjectStory = { id: string; title: string; category: string; teaser: string; image: string; role?: string; tech?: string[]; scenes: StoryScene[] }

// Story content supplied by Michael. Add verified details only.
export const projectStories: ProjectStory[] = [
  {
    id: "massageease", title: "MassageEase", category: "Undergraduate Capstone",
    teaser: "From a broad service-finder idea to a focused massage platform.", image: "/MassageEase.png", role: "Backend Developer",
    tech: ["Supabase", "Google Maps API", "Gale-Shapley Algorithm"],
    scenes: [
      { label: "The unexpected beginning", title: ["MassageEase", "wasn't supposed", "to be MassageEase."], supporting: "It started with a completely different idea.", visual: "image" },
      { label: "The spark", title: ["It started", "with someone", "cleaning."], supporting: "I started thinking about how people find workers for everyday services.", visual: "services", items: ["Cleaner", "Everyday services"] },
      { label: "The original idea", title: ["One place.", "All of them."], supporting: "A centralized odd-job finder. Pick a service to explore the original idea.", visual: "services", items: ["Cleaner", "Plumber", "Carpenter", "Massage Therapist", "Other Services"] },
      { label: "The plot twist", title: ["Then our panel", "challenged the idea."], supporting: "Our adviser and panel suggested focusing on one service instead.", visual: "scope", items: ["Too broad", "Narrow the scope", "Focus on one"] },
      { label: "The transformation", title: ["A smaller scope.", "A clearer idea."], visual: "transform", items: ["Odd job finder", "Service finder", "Massage services", "MassageEase"] },
      { label: "My part", title: ["I built", "the backend."], supporting: "This became my main responsibility throughout the capstone.", visual: "tech" },
      { label: "The end of the chapter", title: ["From an idea", "to our capstone", "to graduation."], supporting: "The project taught me that the first idea doesn't always have to be the final one.", visual: "timeline", items: ["Idea", "Capstone", "Build", "Graduation"] },
    ],
  },
  {
    id: "eventhub", title: "EventHub", category: "Enterprise-Level Academic Project",
    teaser: "A shared project. A new stack. Learning while building.", image: "/EventHub.png", role: "Frontend Developer", tech: ["ASP.NET", "HTML", "CSS", "JavaScript"],
    scenes: [
      { label: "Learning by doing", title: ["I learned", "while building."], supporting: "EventHub was one of those projects where the learning happened while we were coding.", visual: "image" },
      { label: "The project", title: ["An academic project.", "A shared effort."], visual: "collaboration", items: ["Enterprise-level academic project", "Built with a classmate"] },
      { label: "The stack", title: ["A new stack", "to learn."], visual: "tech" },
      { label: "My role", title: ["Frontend", "developer."], visual: "interface" },
      { label: "The reality check", title: ["Then the", "deadlines hit."], supporting: "We were working under a tight academic schedule.", visual: "deadline", items: ["We chose not to continue the project."] },
      { label: "What stayed", title: ["Not every project", "needs to become", "a product."], supporting: "Sometimes what stays with you is what you learned while building it.", visual: "keywords", items: ["ASP.NET", "Collaboration", "Frontend", "Time management"] },
    ],
  },
  {
    id: "velez-creation", title: "Velez Creation", category: "Family Business Website",
    teaser: "The same rental question, again and again. A website for my family.", image: "/VelezToga.png",
    scenes: [
      { label: "A different beginning", title: ["This one", "didn't start", "in a classroom."], visual: "home", items: ["It started at home."] },
      { label: "The old way", title: ["A business built", "on conversations."], supporting: "Our family toga rental business was mostly offline.", visual: "offline", items: ["Word of mouth", "Tarpaulins", "Direct conversations", "Personal inquiries"] },
      { label: "The question", title: ["I kept getting", "the same question."], supporting: "Being the owner's son meant people often asked me directly.", visual: "inquiries" },
      { label: "The realization", title: ["There has to be", "an easier way."], visual: "website" },
      { label: "Offline meets online", title: ["Another way", "to find us."], supporting: "A website to make business information and inquiries easier to access.", visual: "transform", items: ["Word of mouth + tarpaulin + direct questions", "Online presence", "Velez Creation website"] },
      { label: "Why I built it", title: ["No assignment.", "No capstone.", "Just a problem", "I kept seeing."], supporting: "So I built something useful for my family.", visual: "family" },
      { label: "The lesson", title: ["Software doesn't", "have to solve", "a huge problem."], supporting: "Sometimes it just removes a little friction.", visual: "reflection" },
    ],
  },
]
