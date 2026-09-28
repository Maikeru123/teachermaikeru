export type SkillDetail = {
  name: string
  detail: string
  type: string
  description: readonly string[]
  usage?: {
    label: "Used in" | "Related to"
    value: string
  }
}

export const skillDetails = {
  "Next.js": {
    name: "Next.js",
    detail: "Full-stack React",
    type: "Framework",
    description: [
      "Next.js is a React framework for building complete web applications. It provides the structure around a React interface, including routing, layouts, server rendering, data loading, and server-side endpoints. These built-in conventions make it easier to keep a growing application organized while still allowing each page to use the rendering approach that fits it best.",
      "I use it when a project needs both a polished front end and dependable server behavior in one codebase. It is especially useful for fast initial page loads, search-friendly content, and deployments where performance and maintainability matter as much as the interface.",
    ],
    usage: { label: "Used in", value: "This portfolio" },
  },
  React: {
    name: "React",
    detail: "Component interfaces",
    type: "Library",
    description: [
      "React is a JavaScript library for building interfaces from reusable components. Each component owns a focused piece of the experience, while state and properties determine what appears on screen. This model makes complex pages easier to reason about because repeated patterns can be implemented once and combined into larger features.",
      "I use React for interfaces that need to respond immediately to user actions, such as filters, forms, tabs, and interactive visual elements. Its component model also helps me keep behavior consistent across screen sizes without duplicating markup or scattering related logic throughout a project.",
    ],
    usage: { label: "Used in", value: "This portfolio" },
  },
  TypeScript: {
    name: "TypeScript",
    detail: "Typed JavaScript",
    type: "Language",
    description: [
      "TypeScript extends JavaScript with a type system that describes the shape of data, component properties, function inputs, and return values. Those descriptions are checked before code runs, so many mistakes appear during development instead of reaching a user. The result is still JavaScript that runs in the browser or on a server.",
      "I rely on TypeScript most when an interface has several related states or data structures. Clear types make those relationships visible, improve editor suggestions, and make future changes safer because the compiler points to every place that must be updated.",
    ],
    usage: { label: "Used in", value: "This portfolio" },
  },
  JavaScript: {
    name: "JavaScript",
    detail: "Web behavior",
    type: "Language",
    description: [
      "JavaScript is the programming language that gives web pages their behavior. It can respond to input, update content without reloading a page, communicate with APIs, and run application logic in both browsers and server environments. It is the foundation beneath many modern web tools, including React and Next.js.",
      "I use JavaScript to turn static layouts into working experiences: validating forms, handling navigation, transforming data, and coordinating asynchronous tasks. Understanding the language itself is important even when a framework is involved, because it makes debugging clearer and prevents framework conventions from becoming a substitute for sound programming decisions.",
    ],
    usage: { label: "Used in", value: "EventHub" },
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    detail: "Utility-first styling",
    type: "CSS Framework",
    description: [
      "Tailwind CSS is a utility-first styling framework. Instead of starting with large, page-specific style sheets, it provides small classes for spacing, color, typography, layout, and responsive behavior. Combining those utilities directly with interface markup makes the visual rules for a component easy to see and adjust.",
      "I use Tailwind to build consistent interfaces quickly while keeping design decisions constrained by a shared system. It is particularly effective for responsive layouts and reusable components, though good results still depend on thoughtful spacing, semantic markup, accessible contrast, and extracting repeated patterns when a component begins to grow.",
    ],
    usage: { label: "Used in", value: "This portfolio" },
  },
  "shadcn/ui": {
    name: "shadcn/ui",
    detail: "Accessible components",
    type: "Component System",
    description: [
      "shadcn/ui is a collection of accessible interface patterns that are added to a project as editable source code. It offers practical starting points for elements such as dialogs, menus, forms, and buttons without hiding their implementation inside a fixed component package. That ownership makes each component easier to adapt to an existing visual language.",
      "I use it when a project needs dependable interaction behavior but still requires full control over styling and composition. The components reduce repetitive setup while leaving room to refine details such as focus states, keyboard navigation, responsive layout, and the way a component fits the rest of the application.",
    ],
  },
  HTML: {
    name: "HTML",
    detail: "Semantic structure",
    type: "Markup Language",
    description: [
      "HTML gives a web page its meaning and structure. Elements identify headings, navigation, forms, articles, buttons, images, and other content so browsers and assistive technologies can understand how the page is organized. It is more than a container for styling; the chosen elements shape accessibility, keyboard behavior, and how content is interpreted.",
      "I use semantic HTML as the base of every web interface. Starting with the correct native element often provides reliable behavior before JavaScript is added, makes pages easier to maintain, and gives screen-reader users a clearer path through the same information sighted users see visually.",
    ],
    usage: { label: "Used in", value: "EventHub" },
  },
  CSS: {
    name: "CSS",
    detail: "Responsive presentation",
    type: "Styling Language",
    description: [
      "CSS controls how structured web content is presented. It handles typography, color, spacing, alignment, animation, and layouts that adapt from small phones to wide displays. Features such as Grid, Flexbox, custom properties, and media queries make it possible to create a coherent visual system rather than styling each screen as an isolated composition.",
      "I use CSS to translate design intent into responsive, usable interfaces. My focus is not only appearance but also predictable behavior: readable line lengths, clear focus indicators, reduced-motion support, stable layouts, and themes that preserve contrast in both light and dark environments.",
    ],
    usage: { label: "Used in", value: "EventHub" },
  },
  Laravel: {
    name: "Laravel",
    detail: "Structured PHP apps",
    type: "Framework",
    description: [
      "Laravel is a PHP framework for building structured web applications. It provides routing, validation, database tools, authentication patterns, background jobs, and a clear way to separate application responsibilities. These conventions reduce repetitive setup and help teams understand where business rules, data access, and request handling belong.",
      "I use Laravel to explain and build the server side of database-backed applications, from receiving a form submission to validating it and storing the result. Its expressive syntax makes important web concepts visible while still providing the practical tools needed for secure, maintainable development.",
    ],
    usage: { label: "Related to", value: "Web Development teaching" },
  },
  PHP: {
    name: "PHP",
    detail: "Server-side web",
    type: "Language",
    description: [
      "PHP is a server-side programming language designed around producing dynamic web content and handling HTTP requests. It can process forms, apply business rules, work with databases, manage sessions, and return either complete pages or structured API responses. Its broad hosting support also makes it a practical foundation for many real-world web systems.",
      "I use PHP to teach how browser requests become server responses and how application logic connects an interface to stored data. Working with the language directly also makes Laravel's conveniences easier to understand, because students can see which responsibilities the framework is organizing for them.",
    ],
    usage: { label: "Related to", value: "Web Development teaching" },
  },
  Flutter: {
    name: "Flutter",
    detail: "Cross-platform apps",
    type: "Framework",
    description: [
      "Flutter is a framework for creating mobile, web, and desktop applications from one Dart codebase. Its widget system describes both appearance and behavior, allowing screens to be composed from small reusable pieces. Because Flutter controls its rendering pipeline, the same interface can remain visually consistent across different devices and operating systems.",
      "I use Flutter to teach mobile application structure, navigation, state, user input, and responsive screen composition. Fast visual feedback helps students connect a code change to its result, while the shared codebase lets lessons focus on application thinking instead of maintaining separate Android and iOS implementations.",
    ],
    usage: {
      label: "Related to",
      value: "Mobile Application Development teaching",
    },
  },
  Dart: {
    name: "Dart",
    detail: "Flutter's language",
    type: "Language",
    description: [
      "Dart is the programming language used to build Flutter applications. It has familiar object-oriented concepts, a sound type system, asynchronous programming support, and language features designed for constructing user interfaces clearly. Dart code can be compiled for native mobile and desktop applications as well as for the web.",
      "I use Dart to teach students how data, functions, classes, and asynchronous operations support a mobile interface. Its readable syntax makes it suitable for learning core programming ideas, while null safety and static analysis encourage habits that prevent common runtime errors as an application becomes more complex.",
    ],
  },
  Firebase: {
    name: "Firebase",
    detail: "Managed app services",
    type: "Platform",
    description: [
      "Firebase is a collection of managed services for application development. It can provide authentication, cloud-hosted databases, file storage, hosting, analytics, and serverless functions without requiring a team to operate every part of the backend infrastructure. Its client libraries also support real-time updates, which are useful for experiences that should reflect changes immediately.",
      "I use Firebase when a prototype or mobile application benefits from quickly connecting user accounts and live data. It reduces infrastructure setup, but it still requires deliberate security rules, a well-planned data model, and an understanding of usage costs so that convenience does not weaken reliability or control.",
    ],
  },
  "C#": {
    name: "C#",
    detail: ".NET development",
    type: "Language",
    description: [
      "C# is a strongly typed programming language in the .NET ecosystem. It supports object-oriented design, asynchronous work, data processing, and the creation of web, desktop, cloud, and service applications. Its compiler and mature tooling help expose mistakes early while keeping larger codebases organized through clear models and interfaces.",
      "I use C# when building application logic that benefits from explicit types and well-defined responsibilities. It works especially well for systems with structured business rules, where validation, data access, and user-facing behavior need to remain understandable as features and records accumulate.",
    ],
    usage: { label: "Used in", value: "ACS" },
  },
  "ASP.NET": {
    name: "ASP.NET",
    detail: ".NET web framework",
    type: "Framework",
    description: [
      "ASP.NET is Microsoft's framework for building web applications and APIs with .NET. It provides request routing, dependency injection, configuration, authentication, validation, and tools for producing server-rendered pages or JSON services. These capabilities give an application a consistent structure from the incoming request through its business logic and response.",
      "I use ASP.NET for web systems that need dependable server-side organization and a clear path between interfaces, application rules, and stored data. Its conventions support incremental growth, while the wider .NET tooling makes debugging and maintaining typed backend code more predictable.",
    ],
    usage: { label: "Used in", value: "EventHub" },
  },
  "Entity Framework": {
    name: "Entity Framework",
    detail: ".NET data access",
    type: "ORM",
    description: [
      "Entity Framework is an object-relational mapper for .NET. It lets an application represent database tables and relationships as C# classes, then query and update those records through typed code. Migrations describe changes to the database structure over time, which helps keep the application model and its stored data aligned.",
      "I use Entity Framework to reduce repetitive database plumbing while keeping data operations visible and testable. It is most effective when relationships, query behavior, and generated SQL are understood rather than treated as magic, especially in systems where correctness and performance depend on how records are loaded and changed.",
    ],
    usage: { label: "Used in", value: "ACS" },
  },
  Supabase: {
    name: "Supabase",
    detail: "Postgres backend",
    type: "Platform",
    description: [
      "Supabase is a managed backend platform built around PostgreSQL. It combines a relational database with authentication, file storage, real-time updates, generated APIs, and server-side functions. Because the database remains standard Postgres, an application can use familiar tables, relationships, constraints, and SQL while gaining services that would otherwise require separate setup.",
      "I use Supabase when an application needs a capable backend without maintaining a full custom server from the beginning. Row-level security is especially valuable because access rules can live close to the data, although those policies still need careful testing for every user role and operation.",
    ],
    usage: { label: "Used in", value: "MassageEase" },
  },
  MySQL: {
    name: "MySQL",
    detail: "Relational storage",
    type: "Database",
    description: [
      "MySQL is a relational database that stores information in structured tables connected by defined relationships. It supports transactions, indexes, constraints, and SQL queries, making it suitable for applications where records must remain consistent and be retrieved efficiently. A well-designed schema gives application data an explicit, durable shape.",
      "I use MySQL for systems that need dependable storage for related entities such as users, bookings, events, or transactions. My approach begins with the relationships and integrity rules, then considers the queries the application will perform so indexes and table structure support real use rather than only mirroring an interface.",
    ],
    usage: { label: "Related to", value: "Web Development teaching" },
  },
  SQL: {
    name: "SQL",
    detail: "Relational queries",
    type: "Query Language",
    description: [
      "SQL is the language used to define, read, and change data in relational databases. It can select specific records, combine related tables, summarize results, enforce constraints, and perform updates safely within transactions. Knowing SQL makes the behavior of a data layer visible even when an application also uses an ORM.",
      "I use SQL to teach the connection between a database design and the questions an application needs to answer. Students move from individual tables to joins, grouping, and integrity rules, learning that accurate results depend as much on a thoughtful schema as on the query written against it.",
    ],
    usage: { label: "Related to", value: "Database Development teaching" },
  },
  Git: {
    name: "Git",
    detail: "Version control",
    type: "Tool",
    description: [
      "Git is a distributed version-control system that records how a codebase changes over time. Commits create meaningful checkpoints, branches isolate work, and merges bring separate lines of development together. Because each working copy contains the repository history, developers can inspect and organize changes without depending on a constant network connection.",
      "I use Git to make development safer and easier to review. Small, focused commits clarify why code changed, while branches allow experiments and features to progress without destabilizing finished work. It also provides a practical recovery path when an implementation needs to be compared, revised, or rolled back.",
    ],
  },
  GitHub: {
    name: "GitHub",
    detail: "Code collaboration",
    type: "Platform",
    description: [
      "GitHub is a collaboration platform built around Git repositories. It adds pull requests, issue tracking, code review, project automation, release management, and hosted workflows to the underlying version history. These features create a shared place where a team can discuss both the code and the decisions surrounding it.",
      "I use GitHub to organize projects beyond the local development environment. Pull requests make changes easier to review in context, issues capture work that still needs attention, and automated checks can verify a branch before it is merged or deployed. The result is a clearer, more accountable path from an idea to a released feature.",
    ],
  },
  "VS Code": {
    name: "VS Code",
    detail: "Development editor",
    type: "Tool",
    description: [
      "Visual Studio Code is a lightweight, extensible editor for writing and navigating software projects. It combines code editing with integrated source control, a terminal, debugging, search, and language-aware features such as completion and refactoring. Extensions can add support for a technology without forcing every project into the same heavyweight environment.",
      "I use VS Code as the central workspace for moving between interface code, server logic, styles, tests, and version history. Its value comes from shortening the feedback loop: errors are surfaced near the code, project-wide references are easy to trace, and repetitive edits can be made consistently across a codebase.",
    ],
  },
  Vercel: {
    name: "Vercel",
    detail: "Web deployment",
    type: "Platform",
    description: [
      "Vercel is a cloud platform focused on deploying modern web applications. It connects to a source repository, builds each revision, serves static assets through a global network, and runs supported server or edge functions when dynamic behavior is needed. Preview deployments give each proposed change its own temporary environment before it reaches production.",
      "I use Vercel to keep deployment closely connected to development. Automatic builds reveal integration problems early, previews make visual and functional review easier, and environment variables keep server-only configuration outside the repository. It is particularly well suited to Next.js applications because their rendering and routing features are supported directly.",
    ],
  },
} satisfies Record<string, SkillDetail>
