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
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const steps = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Set Up Your Institution",
    desc: "Add colleges, branches, and the skills your curriculum covers.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Map Student Skills",
    desc: "Students select their current skills and academic background.",
  },
  {
    icon: <GitCompareArrows className="h-5 w-5" />,
    title: "Compare with Industry",
    desc: "See how skills align with company and role requirements.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Guide Learning",
    desc: "Get specific recommendations on what each student should learn next.",
  },
];

const features = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "College Skill Mapping",
    desc: "Map the skills your curriculum covers across all branches and campuses — not just subject names.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Company Requirement Tracking",
    desc: "See what companies and roles actually require, including location-level differences.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Student Skill Gap Analysis",
    desc: "Identify which skills each student is missing for their target roles.",
  },
  {
    icon: <GitCompareArrows className="h-5 w-5" />,
    title: "Cross-Institution Comparison",
    desc: "Compare skill exposure across colleges, campuses, and branches side by side.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Role Matching",
    desc: "Show students which companies and roles fit their current skill set.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Data Confidence Indicators",
    desc: "Every comparison shows how fresh and reliable the underlying information is.",
  },
];

const audiences = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "For Colleges",
    desc: "Understand how your curriculum compares with industry expectations and where student skill exposure can improve.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "For Placement Cells",
    desc: "Identify skill gaps before placement season begins and guide students toward the right opportunities.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "For Training Departments",
    desc: "Focus training resources on the skills that industry actually demands, not just what appears in the syllabus.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                S
              </span>
            </div>
            <span className="text-base font-semibold tracking-tight">
              Skill Align
            </span>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="border-b border-border/60 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <Zap className="h-3 w-3" />
              Smart India Hackathon 2026 · Problem ID SIH26135
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl"
          >
            Understand skill gaps.
            <br />
            Guide better careers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            Skill Align helps colleges, placement cells, and training
            departments see exactly where students stand — what skills they
            have, what is missing, and what to learn next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Who It's For ───────────────────────────────────── */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              Built for institutions that take placements seriously
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {audiences.map((a, i) => (
              <motion.div
                key={a.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-border/60 p-6"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {a.icon}
                </div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="border-b border-border/60 bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              What Skill Align Does
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Everything you need to understand skill gaps
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-border/60 bg-card p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-b border-border/60 py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Four steps from confusion to clarity
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-xl border border-border/60 p-5 transition-colors hover:border-primary/20"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  {step.icon}
                </div>
                <p className="mb-1 text-[11px] font-semibold text-muted-foreground/60 uppercase">
                  Step {i + 1}
                </p>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
                {i < 3 && (
                  <ChevronRight className="absolute top-10 -right-3 hidden h-4 w-4 text-border sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example ────────────────────────────────────────── */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              In Practice
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-center text-2xl font-bold tracking-tight sm:text-3xl"
            >
              A placement cell in action
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="mt-10 rounded-xl border border-border/60 p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              A placement cell at PCCOE wants to know: which skills do our
              Computer Engineering students lack compared to what Google and
              JP Morgan expect? Instead of manually scanning career pages for
              every company, they open Skill Align.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                  Students Know
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["C++", "Python", "DSA", "HTML"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-green-400/10 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                  Role Also Requires
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Java", "SQL", "Spring Boot", "Docker", "Git"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Skill Align immediately highlights the gap and recommends
              focusing on Java, SQL, Spring Boot, Docker, and Git. The
              placement cell can now guide an entire batch, not just one
              student.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="border-b border-border/60 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Start understanding your students&apos; skill gaps today
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mx-auto mt-3 max-w-md text-sm text-muted-foreground"
            >
              Know exactly where each student stands, what they are missing,
              and what they should learn next.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-6">
              <button
                onClick={() => navigate("/auth")}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">
                S
              </span>
            </div>
            <span className="text-sm font-medium">Skill Align</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Team Apex · Smart India Hackathon 2026 · Problem ID SIH26135
          </p>
        </div>
      </footer>
    </div>
  );
}
