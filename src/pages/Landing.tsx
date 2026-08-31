import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  GitCompareArrows,
  GraduationCap,
  Lightbulb,
  Search,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const steps = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Set Your Profile",
    desc: "Choose your college, branch, and add your current skills.",
  },
  {
    icon: <GitCompareArrows className="h-6 w-6" />,
    title: "Compare",
    desc: "Compare colleges, companies, branches, or job roles side by side.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Find Skill Gaps",
    desc: "See exactly which skills you're missing for any target role.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learn & Target",
    desc: "Get clear recommendations on what to learn next and where to apply.",
  },
];

const features = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "College Comparison",
    desc: "Compare skill exposure across colleges, campuses, and branches — not just subject names.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Company Comparison",
    desc: "Compare requirements across companies, locations, and roles to understand what's expected.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Skill Match Score",
    desc: "See a transparent percentage showing how closely your skills match any role.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "What to Learn Next",
    desc: "Get specific skill recommendations based on your target company or role.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Target Role Finder",
    desc: "Discover which companies and roles best match your current skill set.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Data Confidence",
    desc: "Every comparison shows how fresh and reliable the underlying data is.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[oklch(0.15_0.04_270)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]">
              <span className="text-lg font-bold text-[oklch(0.15_0.04_270)]">
                S
              </span>
            </div>
            <span className="text-lg font-semibold text-white">
              Skill Align
            </span>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="rounded-lg bg-[oklch(0.70_0.18_165)] px-5 py-2 text-sm font-medium text-[oklch(0.15_0.04_270)] transition-all hover:bg-[oklch(0.75_0.18_165)] hover:shadow-lg hover:shadow-[oklch(0.70_0.18_165)]/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[oklch(0.12_0.04_270)]">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.70_0.18_165)]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[oklch(0.45_0.12_270)]/15 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.70_0.18_165)]/30 bg-[oklch(0.70_0.18_165)]/10 px-4 py-1.5 text-sm text-[oklch(0.70_0.18_165)]">
              <Zap className="h-3.5 w-3.5" />
              Smart India Hackathon 2026 — Problem ID: SIH26135
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto max-w-3xl text-5xl leading-tight font-bold tracking-tight text-white sm:text-6xl"
          >
            Know Your Skills.
            <br />
            <span className="bg-gradient-to-r from-[oklch(0.70_0.18_165)] to-[oklch(0.65_0.20_190)] bg-clip-text text-transparent">
              Find Your Path.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            Compare colleges, explore companies, and discover exactly what
            skills you need to learn next — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 rounded-xl bg-[oklch(0.70_0.18_165)] px-7 py-3.5 text-base font-semibold text-[oklch(0.15_0.04_270)] shadow-lg shadow-[oklch(0.70_0.18_165)]/25 transition-all hover:bg-[oklch(0.75_0.18_165)] hover:shadow-xl hover:shadow-[oklch(0.70_0.18_165)]/30"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-base font-medium text-white/80 transition-all hover:border-white/30 hover:text-white"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Mockup preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-16 max-w-4xl"
          >
            <div className="rounded-2xl border border-white/10 bg-[oklch(0.18_0.04_270)] p-1 shadow-2xl shadow-black/30">
              <div className="rounded-xl bg-[oklch(0.22_0.04_270)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-2 text-xs text-white/30">
                    skillalign.app/dashboard
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="mb-2 text-xs text-[oklch(0.70_0.18_165)]">
                      Skill Match
                    </div>
                    <div className="text-2xl font-bold text-white">78%</div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[oklch(0.70_0.18_165)]"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="mb-2 text-xs text-[oklch(0.70_0.18_165)]">
                      Data Confidence
                    </div>
                    <div className="text-2xl font-bold text-white">High</div>
                    <div className="mt-2 text-xs text-white/40">
                      Updated 12 days ago
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="mb-2 text-xs text-[oklch(0.70_0.18_165)]">
                      Skills to Learn
                    </div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="mt-2 flex gap-1">
                      <span className="rounded bg-red-400/20 px-1.5 py-0.5 text-[10px] text-red-300">
                        SQL
                      </span>
                      <span className="rounded bg-red-400/20 px-1.5 py-0.5 text-[10px] text-red-300">
                        Docker
                      </span>
                      <span className="rounded bg-red-400/20 px-1.5 py-0.5 text-[10px] text-red-300">
                        AWS
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-2 text-xs text-white/50">
                      COEP CE vs PCCOE CE
                    </div>
                    <div className="flex gap-1">
                      <span className="rounded bg-[oklch(0.70_0.18_165)]/20 px-1.5 py-0.5 text-[10px] text-[oklch(0.70_0.18_165)]">
                        C++
                      </span>
                      <span className="rounded bg-[oklch(0.70_0.18_165)]/20 px-1.5 py-0.5 text-[10px] text-[oklch(0.70_0.18_165)]">
                        Java
                      </span>
                      <span className="rounded bg-green-400/20 px-1.5 py-0.5 text-[10px] text-green-300">
                        React
                      </span>
                      <span className="rounded bg-yellow-400/20 px-1.5 py-0.5 text-[10px] text-yellow-300">
                        Docker
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="mb-2 text-xs text-white/50">
                      Matching Roles
                    </div>
                    <div className="flex gap-1">
                      <span className="rounded bg-green-400/20 px-1.5 py-0.5 text-[10px] text-green-300">
                        TCS — 85%
                      </span>
                      <span className="rounded bg-yellow-400/20 px-1.5 py-0.5 text-[10px] text-yellow-300">
                        Google — 62%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-b border-border bg-background py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-wide text-[oklch(0.55_0.15_165)] uppercase"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              From confusion to clarity in four steps
            </motion.h2>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i + 2}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-[oklch(0.70_0.18_165)]/30 hover:shadow-lg hover:shadow-[oklch(0.70_0.18_165)]/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)] transition-colors group-hover:bg-[oklch(0.70_0.18_165)]/15">
                  {step.icon}
                </div>
                <div className="mb-2 text-xs font-bold text-muted-foreground/60 uppercase">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
                {i < 3 && (
                  <ChevronRight className="absolute top-12 -right-3 hidden h-5 w-5 text-muted-foreground/30 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-wide text-[oklch(0.55_0.15_165)] uppercase"
            >
              What Skill Align Does
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Everything you need to find your direction
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 max-w-lg text-muted-foreground"
            >
              Not another complicated portal — a simple tool that connects
              where you are with where you want to go.
            </motion.p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)]">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example ────────────────────────────────────────── */}
      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-wide text-[oklch(0.55_0.15_165)] uppercase"
            >
              Real Example
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              See Skill Align in action
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
            className="mt-12 rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)]">
                <span className="text-lg">👨‍💻</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Riya — Computer Engineering, PCCOE Akurdi
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Knows C++, Python, and DSA. Wants to target a software role
                  at JP Morgan.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-muted/50 p-5">
                <p className="mb-3 text-xs font-bold text-muted-foreground/60 uppercase">
                  Role Requires
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Java",
                    "Python",
                    "SQL",
                    "DSA",
                    "Spring Boot",
                    "Docker",
                    "Git",
                    "AWS",
                  ].map((s) => (
                    <span
                      key={s}
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        ["Python", "DSA"].includes(s)
                          ? "bg-green-400/15 text-green-600 dark:text-green-400"
                          : "bg-red-400/10 text-red-500 dark:text-red-400"
                      }`}
                    >
                      {["Python", "DSA"].includes(s) ? "✓ " : "+ "}
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-5">
                <p className="mb-3 text-xs font-bold text-muted-foreground/60 uppercase">
                  Skill Align Says
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Skill Match
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[oklch(0.70_0.18_165)]"
                          style={{ width: "25%" }}
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        25%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground">
                    Learn next: Java, SQL, Spring Boot, Docker, AWS
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Skill Align immediately tells Riya: <strong>"You match 2 out of
              8 required skills. Learn Java, SQL, Spring Boot, Docker, and AWS
              to strengthen your profile for this role."</strong> She can also
              compare PCCOE Akurdi's skill exposure with COEP or VIT, or check
              which other companies fit her current skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[oklch(0.12_0.04_270)] py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[oklch(0.70_0.18_165)]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Stop guessing. Start aligning.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mx-auto mt-4 max-w-md text-white/60"
            >
              Know exactly where you stand, what you're missing, and what to
              learn next.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8">
              <button
                onClick={() => navigate("/auth")}
                className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.70_0.18_165)] px-8 py-4 text-lg font-semibold text-[oklch(0.15_0.04_270)] shadow-lg shadow-[oklch(0.70_0.18_165)]/25 transition-all hover:bg-[oklch(0.75_0.18_165)] hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[oklch(0.70_0.18_165)]">
              <span className="text-sm font-bold text-[oklch(0.15_0.04_270)]">
                S
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              Skill Align
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Team Apex · Smart India Hackathon 2026 · Problem ID: SIH26135
          </p>
        </div>
      </footer>
    </div>
  );
}
