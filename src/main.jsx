import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const github = "https://github.com/ABHISHEK-YELMAMDI";
const initialTheme =
  typeof window !== "undefined" ? window.localStorage.getItem("theme") || "light" : "light";

if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = initialTheme;
}

const projects = [
  {
    title: "Transactional Inventory Reservation",
    type: "Backend System",
    accent: "#0f766e",
    metric: "Concurrency-safe checkout",
    summary:
      "A reservation API designed to prevent overselling when multiple users try to reserve the same inventory at once.",
    highlights: [
      "Used PostgreSQL row-level locking with SELECT FOR UPDATE",
      "Designed confirm, release, and expiry workflows",
      "Added clear 409 Conflict and 410 Gone API responses",
    ],
    architecture: {
      nodes: [
        ["Client", "Next.js checkout UI"],
        ["Routes", "App Router API handlers"],
        ["Service", "Reservation + lazy expiry"],
        ["ORM", "Prisma transaction"],
        ["Database", "Neon Postgres row lock"],
      ],
      notes: [
        ["Concurrency risk", "Multiple users can reserve the same item at the same time."],
        ["Design choice", "Use SELECT FOR UPDATE inside a database transaction."],
        ["Deployment", "Vercel app with Neon Postgres and Prisma migrations."],
      ],
    },
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod", "Tailwind"],
    repo: "https://github.com/ABHISHEK-YELMAMDI/Transactional-Inventory-Reservation",
    live: "https://allo-health-theta.vercel.app/",
  },
  {
    title: "Smart Digital Library System",
    type: "Full Stack Platform",
    accent: "#4f46e5",
    metric: "6 chatbot domains",
    summary:
      "A digital library system with room booking, live seat availability, chatbot workflows, and secure authentication.",
    highlights: [
      "Built the React, Flask, and PostgreSQL booking module",
      "Integrated Socket.io with YOLOv11-based occupancy detection",
      "Implemented JWT access tokens, refresh tokens, and audit logging",
    ],
    architecture: {
      nodes: [
        ["Student", "Booking + discovery UI"],
        ["API", "Flask REST services"],
        ["Auth", "JWT access + refresh tokens"],
        ["Realtime", "Socket.io seat updates"],
        ["Vision", "YOLOv11 occupancy pipeline"],
      ],
      notes: [
        ["Misuse risk", "Room booking needed SRN-based restrictions and audit trails."],
        ["Design choice", "Separate auth, booking, chatbot, and live-seat workflows."],
        ["Realtime layer", "Seat availability updates flow through Socket.io."],
      ],
    },
    stack: ["React", "Flask", "PostgreSQL", "Socket.io", "YOLOv11"],
    repo: "",
    live: "",
  },
  {
    title: "GitHub Repo Analyzer",
    type: "Full Stack Tool",
    accent: "#0369a1",
    metric: "GitHub API + persisted history",
    summary:
      "A Dockerized web tool that analyzes public GitHub repositories and presents metadata, contributors, commits, and activity insights.",
    highlights: [
      "Built a React and Flask workflow for analyzing public repository URLs",
      "Integrated GitHub REST API with validation, 404 handling, and rate-limit feedback",
      "Stored analysis history in PostgreSQL using JSONB data columns",
    ],
    architecture: {
      nodes: [
        ["Input", "Public GitHub URL"],
        ["Frontend", "React 18 + Vite UI"],
        ["Backend", "Flask routes + CORS"],
        ["Client", "GitHub API adapter"],
        ["Storage", "PostgreSQL JSONB table"],
      ],
      notes: [
        ["External API risk", "GitHub rate limits and missing/private repositories."],
        ["Design choice", "Validate URLs, handle 404/429 states, and show reset-time feedback."],
        ["Containerization", "Docker Compose runs frontend, backend, and database services."],
      ],
    },
    stack: ["React", "Flask", "PostgreSQL", "Docker", "GitHub API"],
    repo: "https://github.com/ABHISHEK-YELMAMDI/github-repo-analyzer",
    live: "",
  },
  {
    title: "EmoStream",
    type: "Distributed Streaming",
    accent: "#0e7490",
    metric: "Real-time event flow",
    summary:
      "A concurrent emoji broadcasting system built around event streaming and low-latency message processing.",
    highlights: [
      "Designed Kafka producer-consumer architecture",
      "Used Spark Streaming for micro-batch aggregation",
      "Built a scalable publish-subscribe workflow",
    ],
    architecture: {
      nodes: [
        ["Producer", "Emoji reaction events"],
        ["Broker", "Kafka topics + partitions"],
        ["Processor", "Spark micro-batches"],
        ["Aggregator", "Reaction counts"],
        ["Clients", "Live broadcast output"],
      ],
      notes: [
        ["Scale risk", "Concurrent reactions need low-latency fan-out."],
        ["Design choice", "Use Kafka partitioning and Spark micro-batch aggregation."],
        ["Reliability", "Publish-subscribe flow keeps producers and consumers decoupled."],
      ],
    },
    stack: ["Kafka", "Spark Streaming", "Distributed Systems"],
    repo: "",
    live: "",
  },
  {
    title: "Stock Portfolio Risk Analysis",
    type: "Fintech Dashboard",
    accent: "#b45309",
    metric: "Risk + forecast + sentiment",
    summary:
      "A full-stack platform for portfolio risk prediction using simulations, forecasting, and market-news sentiment.",
    highlights: [
      "Built Monte Carlo simulation and ARIMA forecasting flows",
      "Integrated NewsAPI and TextBlob sentiment signals",
      "Created persistent portfolio history with Chart.js visualizations",
    ],
    architecture: {
      nodes: [
        ["Client", "Portfolio dashboard"],
        ["API", "Flask analytics routes"],
        ["Risk", "Monte Carlo simulation"],
        ["Forecast", "ARIMA trend model"],
        ["Signals", "News sentiment layer"],
      ],
      notes: [
        ["Decision context", "Risk needs more than a single static metric."],
        ["Design choice", "Combine simulation, forecasting, and sentiment signals."],
        ["UX", "Chart.js visualizations make portfolio history easier to inspect."],
      ],
    },
    stack: ["React", "Flask", "Python", "ARIMA", "Chart.js"],
    repo: "",
    live: "",
  },
  {
    title: "Football Formation & Transfer Recommendation",
    type: "Applied ML Research",
    accent: "#be185d",
    metric: "93.3% classification accuracy",
    summary:
      "A research project for position-specific player classification, valuation, and formation recommendation.",
    highlights: [
      "Co-authored at AIR 2026, Nazarbayev University",
      "Used XGBoost, K-Means, and stacking ensembles",
      "Achieved R2 = 0.89 for goalkeeper valuation",
    ],
    architecture: {
      nodes: [
        ["Dataset", "Player attributes"],
        ["Features", "Position-specific inputs"],
        ["Models", "XGBoost + ensembles"],
        ["Evaluation", "Accuracy + valuation metrics"],
        ["Output", "Formation recommendation"],
      ],
      notes: [
        ["Modeling risk", "Different positions need different feature signals."],
        ["Design choice", "Build position-specific pipelines and stacked models."],
        ["Result", "93.3% midfielder accuracy and R2 = 0.89 goalkeeper valuation."],
      ],
    },
    stack: ["Python", "XGBoost", "K-Means", "ML"],
    repo: "",
    live: "",
  },
];

const skillGroups = [
  ["Frontend", "React", "JavaScript", "Chart.js"],
  ["Backend", "Node.js", "Express", "Flask", "REST APIs"],
  ["Data", "SQL", "PostgreSQL", "PySpark", "Spark Streaming"],
  ["Systems", "Kafka", "Docker", "Linux", "Git"],
  ["ML", "NLP", "XGBoost", "Time-Series", "Collaborative Filtering"],
];

const featuredProjects = projects.slice(0, 3);

const heroCommands = [
  "designing clean APIs",
  "locking database rows",
  "streaming real-time events",
  "analyzing GitHub repositories",
  "shipping full-stack systems",
];

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [heroCommand, setHeroCommand] = useState(0);
  const [timelineTab, setTimelineTab] = useState("experience");
  const [theme, setTheme] = useState(initialTheme);
  const selected = projects[activeProject];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((current) => ({ ...current, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);

    const themeColor = theme === "light" ? "#f3f6fa" : "#060807";
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", themeColor);
  }, [theme]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setHeroCommand((current) => (current + 1) % heroCommands.length);
    }, 2100);

    return () => window.clearInterval(interval);
  }, []);

  const tickerSkills = useMemo(() => skillGroups.flatMap(([, ...skills]) => skills), []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Go to homepage">
          <span>AY</span>
          <small>Software Engineer</small>
        </a>
        <nav className={menuOpen ? "open" : ""}>
          {["home", "proud", "about", "work", "contact"].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-button" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} aria-label="Toggle color theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <main>
      <section id="home" className="hero">
        <div className="hero-glow one" />
        <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Software Engineer / Full Stack / Backend Systems</p>
              <div className="hero-command" aria-live="polite">
                <span>abhishek@portfolio:~$</span>
                <strong key={heroCommands[heroCommand]}>{heroCommands[heroCommand]}</strong>
                <i />
              </div>
              <h1>
                I build useful software with <span>systems thinking.</span>
              </h1>
              <p>
                Hi, I&apos;m <strong>Abhishek Yelmamdi</strong>. I work across full-stack applications,
                backend APIs, distributed data pipelines, and applied ML projects.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#work">View project lab</a>
                <a className="button ghost" href="/Abhishek_Yelmamdi_Resume.pdf" download>Download resume</a>
              </div>
            </div>
            <div className="console-card" aria-label="Profile console">
              <div className="console-top"><i /><i /><i /><span>profile.ts</span></div>
              <pre>{`const abhishek = {
  role: "Software Engineer",
  focus: ["full stack", "backend", "data"],
  likes: ["clean APIs", "real systems"],
  status: "open to opportunities"
};`}</pre>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>
            {[...tickerSkills, ...tickerSkills].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </div>

        <Section id="proud" visible={visibleSections.proud}>
          <SectionIntro
            label="01 / Proud Of"
            title="Three projects I’d point people to first."
            text="The strongest mix of backend correctness, real-time systems, and applied ML."
          />
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <button
                key={project.title}
                className="featured-card"
                style={{ "--accent": project.accent }}
                onClick={() => {
                  const projectIndex = projects.findIndex((item) => item.title === project.title);
                  if (projectIndex >= 0) {
                    setActiveProject(projectIndex);
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <p>{project.metric}</p>
                <small>{project.type}</small>
              </button>
            ))}
          </div>
        </Section>

        <Section id="about" visible={visibleSections.about}>
          <SectionIntro label="02 / About" title="Engineer with range, not noise." />
          <div className="about-grid">
            <div className="about-copy">
              <p className="about-lead">
                I like building software that has a clear user experience on the surface and careful engineering underneath.
              </p>
              <p>
                My work spans full-stack products, transactional APIs, real-time systems, distributed event pipelines,
                and applied machine learning. I care about correctness, maintainability, and making technical work legible.
              </p>
            </div>
            <div className="about-side">
              <div className="stats">
                <Stat value="8.42" label="B.Tech CGPA" />
                <Stat value="5+" label="major projects" />
                <Stat value="1" label="research publication" />
              </div>
              <div className="identity-panel">
                <h3>Personal touch</h3>
                <p>
                  I like systems that feel thoughtful, not noisy. Clean interfaces, predictable APIs, and strong
                  structure matter to me just as much as the result.
                </p>
                <div className="identity-tags">
                  <span>Builder</span>
                  <span>Research-minded</span>
                  <span>Systems thinker</span>
                </div>
              </div>
              <div className="proof-panel">
                <p><strong>PES University, Bangalore</strong></p>
                <p>Computer Science B.Tech with a focus on software engineering and systems work.</p>
                <p><strong>AIR 2026</strong></p>
                <p>Co-authored a published research project on football formation and transfer recommendation.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="work" visible={visibleSections.work}>
          <SectionIntro
            label="03 / Project Lab"
            title="Choose a system. Inspect the build."
            text="A curated set of systems with visible architecture, notes, stack, and link slots."
          />
          <div className="project-lab">
            <div className="project-list" aria-label="Project list">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  className={activeProject === index ? "active" : ""}
                  style={{ "--accent": project.accent }}
                  onClick={() => setActiveProject(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.title}</strong>
                  <small>{project.type}</small>
                </button>
              ))}
            </div>

            <article className="project-detail" style={{ "--accent": selected.accent }} key={selected.title}>
              <p className="project-type">{selected.type}</p>
              <h3>{selected.title}</h3>
              <p className="project-summary">{selected.summary}</p>
              <div className="metric">
                <span>Key signal</span>
                <strong>{selected.metric}</strong>
              </div>
              <SystemDesignBoard project={selected} />
              <ul>
                {selected.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="tags">
                {selected.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="link-slots">
                <ProjectLink href={selected.repo} label="GitHub Repo" />
                <ProjectLink href={selected.live} label="Live Demo" />
              </div>
            </article>
          </div>
        </Section>

        <Section id="stack" visible={visibleSections.stack}>
          <SectionIntro label="04 / Stack" title="Tools grouped by how I use them." />
          <div className="stack-grid">
            {skillGroups.map(([group, ...skills]) => (
              <article key={group}>
                <h3>{group}</h3>
                <div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="timeline" visible={visibleSections.timeline}>
          <div className="timeline-shell">
            <div className="terminal-window">
              <SectionIntro label="05 / Timeline" title="What I've Been Up To" />
              <div className="terminal-chrome">
                <span />
                <span />
                <span />
                <small>timeline.sh</small>
              </div>
              <div className="terminal-header">
                <span>zsh 3.1.6</span>
                <span>Loading personal and system profiles took 24ms.</span>
                <span>abhishek ~/portfolio main</span>
                <span>&gt; ./timeline.sh --section={timelineTab}</span>
              </div>
              <div className="timeline-tabs" role="tablist" aria-label="Timeline categories">
                <button className={timelineTab === "experience" ? "active" : ""} onClick={() => setTimelineTab("experience")} role="tab" aria-selected={timelineTab === "experience"}>Experiences</button>
                <button className={timelineTab === "achievements" ? "active" : ""} onClick={() => setTimelineTab("achievements")} role="tab" aria-selected={timelineTab === "achievements"}>Achievements</button>
                <button className={timelineTab === "education" ? "active" : ""} onClick={() => setTimelineTab("education")} role="tab" aria-selected={timelineTab === "education"}>Education</button>
              </div>
              <div className="terminal-output">
                <span className="terminal-line">node timeline.js</span>
                <span className="terminal-line">rendering {timelineTab}...</span>
              </div>
              <div className="timeline-panel" role="tabpanel">
                {timelineTab === "experience" && (
                  <div className="timeline">
                    <TimelineItem date="Jan 2026 - May 2026" title="Full Stack Developer Intern" org="PES University · Smart Digital Library" chip="PES">
                      Built room booking, live occupancy, chatbot workflows, and JWT-based authentication.
                    </TimelineItem>
                    <TimelineItem date="Jan 2026 - Present" title="Software Engineer" org="Portfolio + systems projects" chip="AY">
                      Building full-stack, backend, and data-driven systems with a stronger focus on production reasoning.
                    </TimelineItem>
                  </div>
                )}
                {timelineTab === "achievements" && (
                  <div className="timeline">
                    <TimelineItem date="2026" title="Research Co-author" org="AIR 2026 · Nazarbayev University" chip="NU">
                      Co-authored a football formation and transfer recommendation system published under Springer / IOES.
                    </TimelineItem>
                    <TimelineItem date="2026" title="Top 10 Hackathon" org="Arithemania 4.0" chip="HACK">
                      Secured a top 10 position and received a certificate of excellence.
                    </TimelineItem>
                  </div>
                )}
                {timelineTab === "education" && (
                  <div className="timeline">
                    <TimelineItem date="2023 - 2026" title="B.Tech in Computer Science" org="PES University, Bangalore" chip="PES">
                      Focused on software engineering, backend systems, data, and applied ML.
                    </TimelineItem>
                    <TimelineItem date="2019 - 2023" title="Diploma in Tool & Die Making" org="Govt. Tool Room & Training Centre" chip="GTTTC">
                      Built a practical foundation in manufacturing and problem-solving before moving into computing.
                    </TimelineItem>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>

        <section id="contact" className="contact">
          <p className="eyebrow">Open to software engineering opportunities</p>
          <h2>Let&apos;s build something solid.</h2>
          <div className="contact-actions">
            <a className="button primary" href="mailto:yelmadgiabhi25@gmail.com">Email me</a>
            <a className="button ghost" href={github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="button ghost" href="https://www.linkedin.com/in/abhishek-yelmamdi-5169a32aa" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="facts-panel">
            <div>
              <span>Currently exploring</span>
              <strong>Distributed systems, reliable APIs, and cleaner UI architecture</strong>
            </div>
            <div>
              <span>Fun fact</span>
              <strong>Co-authored a published research paper while building production-style web systems.</strong>
            </div>
          </div>
        </section>
      </main>

      <nav className="floating-dock" aria-label="Quick navigation">
        {[
          ["#home", "Home", "home"],
          ["#proud", "Proud", "folder"],
          ["#about", "About", "user"],
          ["#work", "Work", "terminal"],
          ["#contact", "Contact", "mail"],
        ].map(([href, label, icon]) => (
          <a key={href} href={href} aria-label={label}>
            <DockIcon kind={icon} />
          </a>
        ))}
      </nav>

      <footer className="container">
        <span>Abhishek Yelmamdi</span>
        <span>Software Engineer</span>
        <span>2026</span>
      </footer>
    </>
  );
}

function ProjectLink({ href, label }) {
  if (!href) {
    return <span className="empty-link">{label}: add link</span>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label} ↗
    </a>
  );
}

function SystemDesignBoard({ project }) {
  const [client, api, core, data, external] = project.architecture.nodes;

  return (
    <div className="system-board" style={{ "--accent": project.accent }}>
      <div className="board-header">
        <span>System design</span>
        <small>{project.type}</small>
      </div>
      <div className="architecture-canvas">
        <svg className="architecture-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="line-base" d="M18 50 H50 V20" />
          <path className="line-base" d="M50 20 V50" />
          <path className="line-base" d="M50 50 V80" />
          <path className="line-base" d="M50 50 H82" />
          <path className="line-pulse" d="M18 50 H50 V20 M50 20 V50 M50 50 V80 M50 50 H82" />
        </svg>
        <SystemNode className="node-client" node={client} index={0} />
        <SystemNode className="node-api" node={api} index={1} />
        <SystemNode className="node-core" node={core} index={2} />
        <SystemNode className="node-data" node={data} index={3} />
        <SystemNode className="node-external" node={external} index={4} />
      </div>
      <div className="design-notes">
        {project.architecture.notes.map(([title, text]) => (
          <article key={title}>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SystemNode({ node, className, index }) {
  return (
    <div className={`system-node ${className}`} style={{ "--index": index }}>
      <span>{node[0]}</span>
      <strong>{node[1]}</strong>
    </div>
  );
}

function Section({ id, visible, children }) {
  return (
    <section id={id} className={`section container reveal ${visible ? "visible" : ""}`}>
      <div className="section-shell">{children}</div>
    </section>
  );
}

function SectionIntro({ label, title, text }) {
  return (
    <div className="section-intro">
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function TimelineItem({ date, title, org, chip, children }) {
  return (
    <article>
      <time>{date}</time>
      <div>
        <div className="timeline-head">
          <h3>{title}</h3>
          {chip && <span>{chip}</span>}
        </div>
        <strong>{org}</strong>
        <p>{children}</p>
      </div>
    </article>
  );
}

function DockIcon({ kind }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (kind === "folder") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
      </svg>
    );
  }

  if (kind === "user") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="8" r="4" {...common} />
      </svg>
    );
  }

  if (kind === "terminal") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="m5 7 5 5-5 5" />
        <path {...common} d="M13 17h6" />
      </svg>
    );
  }

  if (kind === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" {...common} />
        <path {...common} d="m4 8 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...common} d="M4 10.5 12 4l8 6.5V20H4z" />
      <path {...common} d="M9.5 20v-6h5v6" />
    </svg>
  );
}

createRoot(document.getElementById("root")).render(<App />);
