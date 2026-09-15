import {
  Braces,
  Brush,
  Code2,
  Database,
  GraduationCap,
  Hammer,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  CalendarDays,
  ClipboardList,
  History,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import type { ProjectStory, StoryScene } from "@/lib/project-stories"

const stagger = (index: number): CSSProperties =>
  ({ "--step": index }) as CSSProperties
const services = [
  { name: "Cleaner", Icon: Brush, x: 130, y: 120 },
  { name: "Plumber", Icon: Wrench, x: 390, y: 120 },
  { name: "Carpenter", Icon: Hammer, x: 100, y: 300 },
  { name: "Massage Therapist", Icon: HeartHandshake, x: 405, y: 300 },
  { name: "Everyday Services", Icon: Users, x: 260, y: 390 },
]

function Canvas({
  description,
  children,
}: {
  description: string
  children: ReactNode
}) {
  return (
    <figure className="story-graphic">
      <svg
        viewBox="0 0 520 480"
        role="img"
        aria-label={description}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </figure>
  )
}

function Label({
  x,
  y,
  children,
  large = false,
}: {
  x: number
  y: number
  children: ReactNode
  large?: boolean
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      stroke="none"
      fill="currentColor"
      className={large ? "graphic-label graphic-label--large" : "graphic-label"}
    >
      {children}
    </text>
  )
}

function Node({
  x,
  y,
  Icon,
  label,
  core = false,
}: {
  x: number
  y: number
  Icon: LucideIcon
  label?: string
  core?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={core ? 56 : 34}
        className={core ? "graphic-core" : "graphic-node"}
      />
      <Icon
        x={-15}
        y={-15}
        width={30}
        height={30}
        strokeWidth={1.25}
        className={core ? "graphic-core-icon" : undefined}
      />
      {label && (
        <Label x={0} y={core ? 80 : 58}>
          {label}
        </Label>
      )}
    </g>
  )
}

function Browser({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect
        x="95"
        y="115"
        width="330"
        height="250"
        rx="8"
        className="graphic-paper"
      />
      <path d="M95 148h330" className="graphic-guide" />
      <circle cx="110" cy="132" r="2" />
      <circle cx="120" cy="132" r="2" />
      <circle cx="130" cy="132" r="2" />
      {children}
    </g>
  )
}

function Cleaning() {
  return (
    <Canvas description="A simplified person sweeps a floor beside a bucket. The arm and broom move gently, leaving a clean sweep.">
      <path d="M65 382h390M95 399h100" className="graphic-guide" />
      <circle cx="218" cy="111" r="23" fill="currentColor" stroke="none" />
      <path
        d="M204 148Q228 137 243 164L263 247L204 249L192 183Q189 158 204 148Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M216 251L201 313L181 373M247 250L250 316L279 373"
        strokeWidth="17"
      />
      <path d="M166 377h34m65 0h34" strokeWidth="8" />
      <g className="graphic-sweep">
        <path d="M231 167L271 211L304 191" strokeWidth="12" />
        <path d="M320 151L285 351" strokeWidth="5" />
        <path d="M268 348h35l16 29h-68Z" fill="currentColor" />
        <path
          d="M271 361l-4 12m17-12v12m11-12l4 12"
          className="graphic-core-icon"
        />
      </g>
      <g className="graphic-wipe">
        <path d="M294 389h61m-49 9h31" />
        <path d="M348 360h18m-12 -8h22" />
      </g>
      <path d="M367 327h49l-7 50h-35ZM375 325v-11a17 17 0 0 1 34 0v11" />
      <Label x={260} y={442}>
        AN EVERYDAY MOMENT. THE FIRST SPARK.
      </Label>
    </Canvas>
  )
}

function ServiceNetwork({
  focus = false,
  transform = false,
}: {
  focus?: boolean
  transform?: boolean
}) {
  return (
    <Canvas
      description={
        focus
          ? "Five everyday services converge toward one focus: massage services."
          : "Everyday service roles spread out from a single connected service finder."
      }
    >
      {services.map(({ name, Icon, x, y }, index) => (
        <g key={name}>
          <path
            d={`M260 230L${x} ${y}`}
            className="graphic-connection"
            style={stagger(index)}
          />
          <g
            style={
              {
                ...stagger(index),
                "--dx": `${260 - x}px`,
                "--dy": `${230 - y}px`,
              } as CSSProperties
            }
            className={focus ? "graphic-collapse" : "graphic-arrive"}
          >
            <Node x={x} y={y} Icon={Icon} label={name} />
          </g>
        </g>
      ))}
      <g className={focus ? "graphic-focus" : "graphic-arrive"}>
        <Node
          x={260}
          y={230}
          Icon={focus ? HeartHandshake : Network}
          core
          label={
            focus
              ? transform
                ? "MassageEase"
                : "Massage services"
              : "One service finder"
          }
        />
      </g>
      {focus && (
        <Label x={260} y={448}>
          MANY POSSIBILITIES → ONE CLEAR FOCUS
        </Label>
      )}
    </Canvas>
  )
}

function Website({ messages = false }: { messages?: boolean }) {
  return (
    <Canvas description="Personal rental inquiries travel along connected paths into a website with business information and an inquiry action.">
      {[120, 260, 400].map((x, index) => (
        <g key={x}>
          <path
            d={`M${x} 72Q${x} 110 260 145`}
            className="graphic-connection"
          />
          <g className="graphic-message-flow" style={stagger(index)}>
            <MessageCircle
              x={x - 15}
              y={40}
              width="30"
              height="30"
              strokeWidth="1.2"
            />
          </g>
        </g>
      ))}
      <g className="graphic-arrive" style={stagger(3)}>
        <Browser>
          <GraduationCap
            x="124"
            y="178"
            width="65"
            height="65"
            strokeWidth="1"
          />
          <path
            d="M217 187h165m-165 18h130m-130 18h145"
            className="graphic-guide"
          />
          <Label x={260} y={279}>
            Velez Creation
          </Label>
          <rect
            x="186"
            y="301"
            width="148"
            height="38"
            rx="19"
            className="graphic-core"
          />
          <text
            x="260"
            y="325"
            textAnchor="middle"
            stroke="none"
            className="graphic-button-text"
          >
            Make an inquiry
          </text>
        </Browser>
      </g>
      <Label x={260} y={424}>
        {messages
          ? "CONVERSATIONS → A CLEARER PATH"
          : "INFORMATION. ONE PLACE TO FIND IT."}
      </Label>
    </Canvas>
  )
}

export function ProjectStoryVisual({
  project,
  scene,
}: {
  project: ProjectStory
  scene: StoryScene
}) {
  const items = scene.items ?? []
  switch (scene.visual) {
    case "market":
      return (
        <Canvas description="Two open-market stalls and people represent the organizers who used EventHub.">
          {[75, 295].map((x, i) => (
            <g key={x} transform={`translate(${x} 125)`}>
              <g className="graphic-arrive" style={stagger(i)}>
                <path d="M0 45h150L130 0H20ZM10 45v140h130V45M10 115h130" />
                <path
                  d="M38 5l-8 40m45 -40v40m37 -40l8 40"
                  className="graphic-guide"
                />
                <rect
                  x="25"
                  y="135"
                  width="35"
                  height="35"
                  className="graphic-soft"
                />
                <rect
                  x="90"
                  y="135"
                  width="35"
                  height="35"
                  className="graphic-soft"
                />
              </g>
            </g>
          ))}
          <Users x="230" y="345" width="60" height="45" strokeWidth="1" />
          <Label x={260} y={440}>
            Real use. Occasional open markets.
          </Label>
        </Canvas>
      )
    case "departure":
      return (
        <Canvas description="Two collaborators become one as the partner fades away. The project remains with Michael.">
          <path d="M135 180h250M135 215v110h125" className="graphic-guide" />
          <Node x={135} y={180} Icon={Code2} label="Me" />
          <g className="graphic-partner-leaves">
            <Node x={385} y={180} Icon={Users} label="My partner" />
          </g>
          <Node x={260} y={325} Icon={Monitor} core label="EventHub" />
        </Canvas>
      )
    case "responsibilities":
      return (
        <Canvas description="Other projects and responsibilities share limited time. EventHub development stops as the workload grows.">
          {["Other projects", "Responsibilities", "EventHub"].map(
            (label, i) => (
              <g key={label} className="graphic-arrive" style={stagger(i)}>
                <Label x={260} y={105 + i * 100}>
                  {label}
                </Label>
                <path
                  d={`M100 ${130 + i * 100}h320`}
                  className="graphic-guide"
                />
                <path
                  d={`M100 ${130 + i * 100}h${[280, 225, 85][i]}`}
                  strokeWidth="8"
                  className="graphic-workload"
                />
              </g>
            )
          )}
          <Label x={260} y={435}>
            Limited time. Development stopped.
          </Label>
        </Canvas>
      )
    case "clinic":
      return (
        <Canvas description="A clinic system connects patient information with appointments and past records.">
          <path
            d="M260 230V100M205 255L110 325M315 255l95 70"
            className="graphic-connection"
          />
          <Node x={260} y={100} Icon={Users} label="Patient information" />
          <Node x={110} y={340} Icon={CalendarDays} label="Appointments" />
          <Node x={410} y={340} Icon={History} label="Past records" />
          <Node x={260} y={240} Icon={ClipboardList} core label="ACS" />
        </Canvas>
      )
    case "records":
      return (
        <Canvas description="Four everyday clinic tasks: book appointments, view records, manage patient information and track past records.">
          {[
            { label: "Book appointments", Icon: CalendarDays },
            { label: "View records", Icon: ClipboardList },
            { label: "Patient information", Icon: Users },
            { label: "Track past records", Icon: History },
          ].map(({ label, Icon }, i) => (
            <g key={label} className="graphic-arrive" style={stagger(i)}>
              <Icon
                x={85}
                y={80 + i * 90}
                width="32"
                height="32"
                strokeWidth="1"
              />
              <Label x={295} y={100 + i * 90}>
                {label}
              </Label>
              <path d={`M85 ${133 + i * 90}h345`} className="graphic-guide" />
            </g>
          ))}
        </Canvas>
      )
    case "maintenance":
      return (
        <Canvas description="Backend maintenance connects application logic and stored records in the working ACS system.">
          <path d="M130 140h260v180H130Z" className="graphic-connection" />
          <Node x={130} y={140} Icon={Code2} label="Backend logic" />
          <Node x={390} y={140} Icon={Database} label="Stored records" />
          <Node
            x={260}
            y={320}
            Icon={Wrench}
            core
            label="Maintenance & support"
          />
        </Canvas>
      )
    case "acs-stack":
      return (
        <Canvas description="C# application code connects through Entity Framework to records.">
          <path d="M110 220h300" className="graphic-connection" />
          <Node x={110} y={220} Icon={Code2} label="C#" />
          <Node x={290} y={220} Icon={Braces} label="Entity Framework" />
          <Database x="418" y="203" width="34" height="34" strokeWidth="1.2" />
          <Label x={260} y={380}>
            The backend tools I worked with.
          </Label>
        </Canvas>
      )
    case "responsibility":
      return (
        <Canvas description="Hands-on internship responsibility: maintaining and supporting a working clinic system.">
          <Node
            x={260}
            y={220}
            Icon={ClipboardList}
            core
            label="A working system"
          />
          <path
            d="M95 340l55 36h220l55 -36M150 376v25m220 -25v25"
            strokeWidth="3"
          />
          <Label x={260} y={445}>
            Maintain. Support. Take responsibility.
          </Label>
        </Canvas>
      )
    case "cleaning":
      return <Cleaning />
    case "services":
      return <ServiceNetwork />
    case "scope":
      return (
        <Canvas description="A broad collection of service ideas moves through a narrowing scope.">
          <path d="M80 100h360L310 310v65H210v-65Z" className="graphic-soft" />
          {[140, 200, 260, 320, 380].map((x, i) => (
            <g key={x} className="graphic-scope-dot" style={stagger(i)}>
              <circle cx={x} cy={145} r="8" fill="currentColor" />
            </g>
          ))}
          <Label x={260} y={72}>
            Broad idea
          </Label>
          <Label x={260} y={245}>
            Too broad
          </Label>
          <Label x={260} y={420} large>
            Narrow the scope
          </Label>
        </Canvas>
      )
    case "transform":
      return project.id === "massageease" ? (
        <Canvas description="Five service options are considered. The others fade as massage services remain selected.">
          {services.map(({ name, Icon }, index) => (
            <g
              key={name}
              className={
                name === "Massage Therapist"
                  ? "graphic-choice-kept"
                  : "graphic-choice-muted"
              }
              style={stagger(index)}
            >
              <Icon
                x={90}
                y={65 + index * 66}
                width={26}
                height={26}
                strokeWidth={1.2}
              />
              <Label x={275} y={84 + index * 66}>
                {name}
              </Label>
              {name === "Massage Therapist" && (
                <path d="M397 277l7 7 14 -17" strokeWidth="2" />
              )}
            </g>
          ))}
          <Label x={260} y={441} large>
            MassageEase
          </Label>
        </Canvas>
      ) : (
        <Website messages />
      )
    case "image":
      return (
        <figure className="story-image story-object">
          <div className="story-preview-frame">
            <div className="story-preview-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="relative aspect-[1.15] w-full">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 767px) 90vw, 48vw"
                className="object-contain"
              />
            </div>
          </div>
          <figcaption>
            {project.title} / {project.category}
          </figcaption>
        </figure>
      )
    case "tech":
      return project.id === "massageease" ? (
        <Canvas description="Supabase, Google Maps API and the Gale-Shapley matching algorithm connect around a backend core.">
          {[
            { x: 260, y: 85, Icon: Database },
            { x: 116, y: 310, Icon: MapPin },
            { x: 404, y: 310, Icon: Network },
          ].map(({ x, y, Icon }, index) => (
            <g key={index} className="graphic-arrive" style={stagger(index)}>
              <path d={`M260 240L${x} ${y}`} className="graphic-connection" />
              <Node
                x={x}
                y={y}
                Icon={Icon}
                label={
                  index === 2 ? "Matching algorithm" : project.tech?.[index]
                }
              />
            </g>
          ))}
          <Node x={260} y={240} Icon={Database} core label="Backend" />
          <Label x={260} y={449}>
            GALE-SHAPLEY / SERVICE MATCHING
          </Label>
        </Canvas>
      ) : (
        <Canvas description="ASP.NET, HTML, CSS and JavaScript assemble into a layered application stack.">
          {[...(project.tech ?? [])].reverse().map((item, index) => (
            <g key={item} className="graphic-layer" style={stagger(index)}>
              <path
                d={`M90 ${290 - index * 57}l170 -60 170 60 -170 60Z`}
                className="graphic-paper"
              />
              <Label x={260} y={295 - index * 57}>
                {item}
              </Label>
            </g>
          ))}
          <Label x={260} y={424}>
            LEARNING THE STACK, LAYER BY LAYER
          </Label>
        </Canvas>
      )
    case "timeline":
      return (
        <Canvas description="A rising path connects the idea, capstone and build to graduation.">
          <path
            d="M70 355C160 355 150 265 230 265S310 145 435 130"
            className="graphic-connection"
          />
          {items.map((item, index) => {
            const x = 65 + index * 95
            const y = [355, 310, 265, 195, 130][index]
            return (
              <g
                key={item}
                className="graphic-arrive"
                style={stagger(index * 2)}
              >
                <circle cx={x} cy={y} r="8" fill="currentColor" />
                <Label x={x} y={y + 35}>
                  {item}
                </Label>
              </g>
            )
          })}
          <GraduationCap
            x="374"
            y="62"
            width="65"
            height="50"
            strokeWidth="1"
          />
          <Label x={260} y={436}>
            THE IDEA CHANGED. THE JOURNEY CONTINUED.
          </Label>
        </Canvas>
      )
    case "collaboration":
      return (
        <Canvas description="Two collaborators connect their frontend work into one shared academic project.">
          <path d="M120 215h280M260 215v115" className="graphic-connection" />
          <g className="graphic-arrive">
            <Node x={120} y={215} Icon={Code2} label="My frontend work" />
          </g>
          <g className="graphic-arrive" style={stagger(2)}>
            <Node x={400} y={215} Icon={Users} label="My classmate" />
          </g>
          <g className="graphic-arrive" style={stagger(4)}>
            <Node x={260} y={350} Icon={Monitor} core label="EventHub" />
          </g>
          <Label x={260} y={100}>
            TWO CONTRIBUTORS. A SHARED BUILD.
          </Label>
        </Canvas>
      )
    case "interface":
      return (
        <Canvas description="Navigation, content, form fields and a button assemble inside a browser interface.">
          <Browser />
          {[0, 1, 2, 3].map((index) => (
            <g
              key={index}
              className="graphic-assemble"
              style={stagger(index * 2)}
            >
              {index === 0 ? (
                <>
                  <rect
                    x="115"
                    y="167"
                    width="290"
                    height="24"
                    className="graphic-core"
                  />
                  <path
                    d="M325 179h16m10 0h16m10 0h16"
                    className="graphic-core-icon"
                  />
                </>
              ) : index === 1 ? (
                <>
                  <rect
                    x="115"
                    y="209"
                    width="130"
                    height="130"
                    className="graphic-soft"
                  />
                  <path d="M135 280l30 -35 25 20 20 -12 17 27" />
                  <circle cx="212" cy="233" r="7" />
                </>
              ) : index === 2 ? (
                <>
                  <path d="M270 217h130m-130 14h90" />
                  <rect x="270" y="251" width="130" height="26" rx="3" />
                  <rect x="270" y="289" width="130" height="26" rx="3" />
                </>
              ) : (
                <rect
                  x="330"
                  y="328"
                  width="70"
                  height="14"
                  rx="7"
                  className="graphic-core"
                />
              )}
            </g>
          ))}
          <Label x={260} y={424}>
            INTERFACE PIECES → ONE EXPERIENCE
          </Label>
        </Canvas>
      )
    case "deadline":
      return (
        <Canvas description="A clock advances toward an academic deadline. The build path ends at a deliberate stopping point.">
          <circle cx="260" cy="194" r="99" />
          <circle
            cx="260"
            cy="194"
            r="86"
            className="graphic-guide"
            strokeDasharray="1 20"
          />
          <path d="M260 194v-64" className="graphic-clock" strokeWidth="3" />
          <path d="M260 194l40 20" strokeWidth="3" />
          <circle cx="260" cy="194" r="5" fill="currentColor" />
          <path d="M85 350h350" className="graphic-guide" />
          <path
            d="M85 350h305"
            className="graphic-connection"
            strokeWidth="3"
          />
          <path d="M390 334v32" strokeWidth="4" />
          <Label x={105} y={383}>
            Build
          </Label>
          <Label x={390} y={383}>
            Deadline
          </Label>
          <Label x={260} y={441}>
            WE CHOSE TO STOP HERE.
          </Label>
        </Canvas>
      )
    case "keywords":
      return (
        <Canvas description="Four skills remain connected as the learning from EventHub: ASP.NET, collaboration, frontend and time management.">
          <path
            d="M135 130L385 130 385 335 135 335Z"
            className="graphic-connection"
          />
          {items.map((item, index) => (
            <g key={item} className="graphic-arrive" style={stagger(index)}>
              <Node
                x={index % 2 ? 385 : 135}
                y={index < 2 ? 130 : 335}
                Icon={[Braces, Users, Monitor, Code2][index]}
                label={item}
              />
            </g>
          ))}
          <Label x={260} y={243} large>
            What stayed.
          </Label>
        </Canvas>
      )
    case "home":
    case "family":
      return (
        <Canvas description="A simple house contains the family toga rental business, with a graduation gown at its center.">
          <path
            d="M105 224L260 94 415 224M135 202v186h250V202"
            strokeWidth="2"
          />
          <g className="graphic-arrive" style={stagger(2)}>
            <path
              d="M228 210l-44 31 24 45 24 -12 -11 79h78l-11 -79 24 12 24 -45 -44 -31 -32 21Z"
              className="graphic-soft"
            />
            <path d="M248 229v108m24 -108v108" />
            <GraduationCap
              x="233"
              y="156"
              width="54"
              height="40"
              strokeWidth="1"
            />
          </g>
          <path d="M90 388h340" className="graphic-guide" />
          <Label x={260} y={435}>
            {scene.visual === "home"
              ? "IT STARTED AT HOME."
              : "SOMETHING USEFUL FOR MY FAMILY."}
          </Label>
        </Canvas>
      )
    case "offline":
      return (
        <Canvas description="A toga rental sign connects to word of mouth and direct personal inquiries.">
          <path d="M100 105H420V225H100ZM115 225v35m290 -35v35" />
          <Label x={260} y={153} large>
            TOGA RENTAL
          </Label>
          <Label x={260} y={185}>
            A FAMILY BUSINESS
          </Label>
          <path
            d="M260 260v25M140 300v-15h240v15"
            className="graphic-connection"
          />
          <g className="graphic-arrive" style={stagger(2)}>
            <Node
              x={380}
              y={340}
              Icon={MessageCircle}
              label="Direct inquiries"
            />
          </g>
          <Node x={140} y={340} Icon={Users} label="Word of mouth" />
          <Label x={260} y={435}>
            WORD OF MOUTH. PERSONAL INQUIRIES.
          </Label>
        </Canvas>
      )
    case "inquiries":
      return (
        <Canvas description="Repeated messages ask how much toga rental costs, all directed to the owner's son.">
          {[0, 1, 2].map((index) => (
            <g
              key={index}
              transform={`translate(${index === 1 ? 105 : 65} ${65 + index * 88})`}
            >
              <g className="graphic-arrive" style={stagger(index * 2)}>
                <path
                  d="M0 0h345v58H35L16 73V58H0Z"
                  className="graphic-paper"
                />
                <Label x={172} y={35}>
                  {
                    [
                      "How much is the toga?",
                      "Do you have available sizes?",
                      "How much is the rental?",
                    ][index]
                  }
                </Label>
              </g>
            </g>
          ))}
          <path d="M260 329v25" className="graphic-connection" />
          <Node x={260} y={394} Icon={Users} />
          <Label x={260} y={460}>
            THE SAME QUESTION. AGAIN AND AGAIN.
          </Label>
        </Canvas>
      )
    case "website":
      return <Website />
    case "reflection":
      return (
        <Canvas description="A tangled inquiry path resolves into a simple direct connection between people and business information.">
          <path
            d="M95 225C150 80 315 350 192 335S120 100 275 165 220 385 340 260"
            className="graphic-tangle"
          />
          <path d="M95 225h330" className="graphic-direct" />
          <Node x={95} y={225} Icon={Users} />
          <Node x={425} y={225} Icon={Monitor} />
          <Label x={260} y={397} large>
            A little less friction.
          </Label>
        </Canvas>
      )
  }
}
