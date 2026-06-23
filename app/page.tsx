"use client";

import { SectionHeading, SectionLabel } from "@/components/reusables";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { SignInButton, useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

import { SUGGESTIONS } from "@/lib/data";
import { PRICING_PLANS } from "@/lib/constants";
import { CheckoutButton } from "@clerk/nextjs/experimental";

import { cn } from "@/lib/utils";
import LuxuryBackground from "@/components/backgrounds/PremiumBackground";
import AuroraBackground from "@/components/backgrounds/AuroraBackground";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const METRICS = [
  {
    value: 10,
    suffix: "K+",
    label: "Apps Generated",
  },
  {
    value: 1.2,
    suffix: "M+",
    label: "Lines of Code",
  },
  {
    value: 98.7,
    suffix: "%",
    label: "Success Rate",
  },
  {
    value: 40,
    suffix: "+",
    label: "Frameworks",
  },
];

const AGENT_ACTIVITY = [
  "Analyzing requirements",
  "Planning architecture",
  "Generating components",
  "Connecting database",
  "Installing dependencies",
  "Running tests",
  "Optimizing performance",
  "Deploying preview",
];

const PREMIUM_PLACEHOLDERS = [
  "Build an AI CRM with automated follow-ups...",
  "Create a SaaS platform with Stripe billing...",
  "Build a social network for photographers...",
  "Generate a recruitment platform with ATS...",
  "Create a startup dashboard with analytics...",
];

export default function Home() {
  const { isSignedIn, has } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PREMIUM_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <LuxuryBackground />
      <AuroraBackground />

      <div className="absolute left-1/2 top-40 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      <section className="relative px-6 pt-40 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Powered by Autonomous AI Agents
            </Badge>
          </div>

          <h1 className="mx-auto mt-10 max-w-6xl text-center text-6xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-9xl">
            <span className="text-white/60">Software creation,</span>

            <br />

            <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
              reinvented.
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-white/45">
            Turn ideas into production-ready applications with autonomous AI
            agents. Generate code, architect systems, install dependencies and
            deploy globally — all from a single prompt.
          </p>

          {/* Metrics */}

          <div
            ref={ref}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <div className="text-2xl font-bold">
                  {inView && (
                    <CountUp
                      end={metric.value}
                      duration={2.5}
                      separator=","
                      decimals={metric.value % 1 !== 0 ? 1 : 0}
                    />
                  )}
                  {metric.suffix}
                </div>

                <div className="mt-1 text-xs uppercase tracking-wider text-white/35">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Playground */}

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div
              className={cn(
                "overflow-hidden rounded-3xl border bg-white/[0.03] backdrop-blur-2xl transition-all duration-300",
                isFocused
                  ? "border-blue-500/40 shadow-[0_0_80px_rgba(59,130,246,0.15)]"
                  : "border-white/10",
              )}
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                placeholder={PREMIUM_PLACEHOLDERS[placeholderIndex]}
                className="min-h-[90px] w-full resize-none bg-transparent px-8 pt-8 text-lg placeholder:text-white/20 focus:outline-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
                <span className="text-sm text-white/30">
                  Press Enter to generate • Shift + Enter for new line
                </span>

                {isSignedIn ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim()}
                    className="rounded-full px-8"
                  >
                    Generate App
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="rounded-full px-8">
                      Generate App
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Agent Activity Floating Card */}

          <div className="mx-auto mt-14 max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />

                <span className="font-medium">AI Workforce</span>
              </div>

              <div className="space-y-3">
                {AGENT_ACTIVITY.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                    <span className="text-sm text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   AI WORKSPACE PREVIEW
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <SectionLabel>Live Workspace</SectionLabel>

            <SectionHeading
              gray="An autonomous engineering team"
              blue="inside your browser."
            />

            <p className="mx-auto mt-5 max-w-2xl text-white/40">
              Watch AI plan, code, test, and deploy your application in
              real-time.
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
            {/* Browser Header */}

            <div className="flex items-center border-b border-white/10 px-6 py-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>

              <div className="mx-auto flex h-8 w-[320px] items-center justify-center rounded-full border border-white/10 bg-black/30">
                <span className="text-xs text-white/30">
                  zephyr.app/workspace
                </span>
              </div>
            </div>

            {/* Workspace */}

            <div className="grid min-h-[650px] lg:grid-cols-[320px_1fr_320px]">
              {/* CHAT PANEL */}

              <div className="border-r border-white/10 bg-black/20">
                <div className="border-b border-white/10 p-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />

                    <span className="text-sm font-medium">AI Conversation</span>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  {/* USER */}

                  <div className="flex justify-end">
                    <div className="max-w-[240px] rounded-3xl rounded-br-md bg-blue-500 px-4 py-3 text-sm">
                      Build an AI CRM with email automation and Stripe billing.
                    </div>
                  </div>

                  {/* AI */}

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                      <Zap className="h-4 w-4 text-black" />
                    </div>

                    <div className="max-w-[240px] rounded-3xl rounded-tl-md bg-white/5 px-4 py-3">
                      <p className="text-sm text-white/70">
                        I&apos;ll create a multi-tenant SaaS CRM using Next.js,
                        Prisma, PostgreSQL, Clerk and Stripe.
                      </p>
                    </div>
                  </div>

                  {/* AI */}

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                      <Zap className="h-4 w-4 text-black" />
                    </div>

                    <div className="max-w-[240px] rounded-3xl rounded-tl-md bg-white/5 px-4 py-3">
                      <p className="text-sm text-white/70">
                        Creating database schema...
                      </p>
                    </div>
                  </div>

                  {/* Loading */}

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                      <Zap className="h-4 w-4 text-black" />
                    </div>

                    <div className="flex items-center gap-2 rounded-3xl rounded-tl-md bg-white/5 px-4 py-4">
                      {[0, 0.2, 0.4].map((delay) => (
                        <span
                          key={delay}
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                          style={{
                            animationDelay: `${delay}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PREVIEW PANEL */}

              <div className="relative overflow-hidden bg-[#0A0A0A]">
                {/* Glow */}

                <div className="absolute left-1/2 top-20 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

                <div className="border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-5">
                    <button className="border-b-2 border-blue-500 pb-3 text-sm">
                      Preview
                    </button>

                    <button className="pb-3 text-sm text-white/30">Code</button>

                    <button className="pb-3 text-sm text-white/30">
                      Database
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {/* Fake SaaS Dashboard */}

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Revenue Overview</h3>

                        <p className="text-xs text-white/40">
                          AI Generated Dashboard
                        </p>
                      </div>

                      <Badge>Live</Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {["$84.2K", "1,234", "97.8%"].map((value) => (
                        <div
                          key={value}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                        >
                          <div className="text-2xl font-bold">{value}</div>

                          <div className="mt-1 text-xs text-white/40">
                            Metric
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}

                    <div className="mt-6 flex h-52 items-end gap-3">
                      {[35, 55, 40, 80, 65, 90, 120].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                          style={{
                            height: `${h}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AGENT PANEL */}

              <div className="border-l border-white/10 bg-black/20">
                <div className="border-b border-white/10 p-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                    <span className="text-sm font-medium">AI Workforce</span>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  {[
                    {
                      title: "Product Manager",
                      status: "Done",
                    },
                    {
                      title: "System Architect",
                      status: "Done",
                    },
                    {
                      title: "Frontend Engineer",
                      status: "Working",
                    },
                    {
                      title: "Backend Engineer",
                      status: "Working",
                    },
                    {
                      title: "QA Agent",
                      status: "Pending",
                    },
                    {
                      title: "DevOps Agent",
                      status: "Pending",
                    },
                  ].map((agent) => (
                    <div
                      key={agent.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {agent.title}
                        </span>

                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-[10px] font-medium",
                            agent.status === "Done"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : agent.status === "Working"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-white/10 text-white/40",
                          )}
                        >
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Progress */}

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm">Build Progress</span>

                      <span className="text-sm text-blue-400">78%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   AI WORKFORCE
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <SectionLabel>Autonomous Workforce</SectionLabel>

            <SectionHeading
              gray="Six specialized AI agents"
              blue="working together."
            />

            <p className="mx-auto mt-5 max-w-2xl text-white/40">
              Every project is handled by a coordinated team of AI specialists,
              each responsible for a critical stage of software creation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "AI Product Manager",
                icon: "01",
                desc: "Analyzes requirements, writes specifications and creates development roadmaps.",
              },
              {
                title: "AI Architect",
                icon: "02",
                desc: "Designs scalable application structures, APIs and database systems.",
              },
              {
                title: "AI Engineer",
                icon: "03",
                desc: "Generates production-ready frontend and backend code.",
              },
              {
                title: "AI Designer",
                icon: "04",
                desc: "Creates modern interfaces, layouts and user experiences.",
              },
              {
                title: "AI QA",
                icon: "05",
                desc: "Finds bugs, validates functionality and improves reliability.",
              },
              {
                title: "AI DevOps",
                icon: "06",
                desc: "Builds, deploys and optimizes applications globally.",
              },
            ].map((agent) => (
              <div
                key={agent.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <span className="text-lg font-bold text-blue-400">
                    {agent.icon}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold">{agent.title}</h3>

                <p className="leading-relaxed text-white/45">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   PREMIUM BENTO GRID
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <SectionLabel>Capabilities</SectionLabel>

            <SectionHeading
              gray="Everything required"
              blue="to ship products."
            />
          </div>

          <div className="grid auto-rows-[260px] gap-5 lg:grid-cols-4">
            {/* Large */}

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:col-span-2">
              <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-blue-500/10 blur-[120px]" />

              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-400">
                Autonomous Generation
              </p>

              <h3 className="max-w-md text-3xl font-semibold leading-tight">
                Build complete applications from a single prompt.
              </h3>

              <p className="mt-4 max-w-lg text-white/45">
                Generate frontend, backend, authentication, payments and
                infrastructure automatically.
              </p>
            </div>

            {/* Small */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-3 text-lg font-semibold">Live Preview</h3>

              <p className="text-white/45">
                See changes instantly while AI writes code.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-3 text-lg font-semibold">Smart Packages</h3>

              <p className="text-white/45">
                Automatically installs verified dependencies.
              </p>
            </div>

            {/* Wide */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:col-span-2">
              <h3 className="mb-3 text-2xl font-semibold">
                AI-Powered Error Recovery
              </h3>

              <p className="max-w-xl text-white/45">
                Runtime issues are automatically detected, analyzed and fixed by
                AI agents.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-3 text-lg font-semibold">Stripe Ready</h3>

              <p className="text-white/45">
                Billing and subscriptions integrated instantly.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-3 text-lg font-semibold">Authentication</h3>

              <p className="text-white/45">Secure sign-in powered by Clerk.</p>
            </div>

            {/* Large */}

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-8 lg:col-span-4">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

              <h3 className="relative text-4xl font-bold">
                Generate. Iterate. Deploy.
              </h3>

              <p className="relative mt-4 max-w-2xl text-white/45">
                Replace weeks of engineering effort with a team of autonomous AI
                agents working continuously inside your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   HOW IT WORKS 2.0
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <SectionLabel>Process</SectionLabel>

            <SectionHeading gray="From idea" blue="to production." />
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Describe Your Product",
                desc: "Explain your idea naturally. Upload screenshots, designs or requirements.",
              },
              {
                step: "02",
                title: "AI Plans Everything",
                desc: "Agents create architecture, data models, workflows and technical specifications.",
              },
              {
                step: "03",
                title: "Code Is Generated",
                desc: "Frontend, backend, APIs and integrations are built automatically.",
              },
              {
                step: "04",
                title: "Deploy Instantly",
                desc: "Preview, export or launch globally in just a few clicks.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group flex gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-blue-500/30"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <span className="text-xl font-bold text-blue-400">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>

                  <p className="text-white/45">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   PRICING
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <SectionLabel>Pricing</SectionLabel>

            <SectionHeading
              gray="Pay for outcomes,"
              blue="not infrastructure."
            />

            <p className="mx-auto mt-5 max-w-xl text-white/40">
              Start building for free. Upgrade only when your projects begin to
              scale.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => {
              const planOrder: Record<string, number> = {
                free: 0,
                starter: 1,
                pro: 2,
              };

              const activePlanKey = isSignedIn
                ? has?.({ plan: "pro" })
                  ? "pro"
                  : has?.({ plan: "starter" })
                    ? "starter"
                    : "free"
                : null;

              const isActive = isSignedIn && activePlanKey === plan.key;

              const isDowngrade =
                isSignedIn &&
                activePlanKey !== null &&
                !isActive &&
                planOrder[plan.key] < planOrder[activePlanKey];

              return (
                <div
                  key={plan.key}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-[32px] border p-8 backdrop-blur-xl transition-all duration-300",

                    plan.featured
                      ? "border-blue-500/30 bg-blue-500/[0.05]"
                      : "border-white/10 bg-white/[0.03]",
                  )}
                >
                  {plan.featured && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />

                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-[100px]" />

                      <div className="absolute left-6 top-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        MOST POPULAR
                      </div>
                    </>
                  )}

                  <div className="relative mt-10">
                    <h3 className="text-xl font-semibold">{plan.label}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/45">
                      {plan.description}
                    </p>

                    <div className="mt-8 flex items-end gap-2">
                      <span className="text-6xl font-bold tracking-tight">
                        {plan.price === 0 ? "$0" : <>${plan.price}</>}
                      </span>

                      {plan.price > 0 && (
                        <span className="mb-2 text-white/40">/month</span>
                      )}
                    </div>

                    <div className="mt-8 space-y-4">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                          <span className="text-sm text-white/60">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-10">
                      {isActive ? (
                        <Button disabled className="w-full rounded-full">
                          Current Plan
                        </Button>
                      ) : plan.price === 0 ? (
                        <SignInButton mode="modal">
                          <Button
                            variant="outline"
                            className="w-full rounded-full"
                          >
                            Get Started Free
                          </Button>
                        </SignInButton>
                      ) : isSignedIn ? (
                        <CheckoutButton planId={plan.planId} planPeriod="month">
                          <Button
                            className={cn(
                              "w-full rounded-full cursor-pointer",

                              plan.featured && "bg-blue-500 hover:bg-blue-400",
                            )}
                          >
                            {isDowngrade ? "Downgrade" : "Upgrade"}

                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CheckoutButton>
                      ) : (
                        <SignInButton mode="modal">
                          <Button
                            className={cn(
                              "w-full rounded-full",

                              plan.featured && "bg-blue-500 hover:bg-blue-400",
                            )}
                          >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </SignInButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   ENTERPRISE CTA
────────────────────────────────────────────── */}

      <section className="relative px-6 pb-40">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-16 backdrop-blur-xl">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

          <div className="relative text-center">
            <SectionLabel>Start Building</SectionLabel>

            <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              <span className="text-white/70">Your next startup</span>

              <br />

              <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
                starts with a prompt.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/40">
              Join founders, developers and designers building products at AI
              speed.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <SignInButton mode="modal">
                <Button size="lg" className="h-14 rounded-full px-10 text-base">
                  Start Building Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>

              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full px-10 text-base"
              >
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-10 text-sm text-white/30">
              <span>10 Free Generations</span>

              <span>No Credit Card Required</span>

              <span>Deploy Instantly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            The AI Engineer
            <br />
            <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
              That Never Sleeps.
            </span>
          </h2>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────── */}

      {/* <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center md:flex-row">
          <div>
            <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
              Zephyr
            </span>

            <p className="mt-2 text-sm text-white/35">
              Autonomous software creation platform.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-white/35">
            <button className="hover:text-white">Features</button>

            <button className="hover:text-white">Pricing</button>

            <button className="hover:text-white">Docs</button>

            <button className="hover:text-white">Contact</button>
          </div>
        </div>
      </footer> */}
      <footer className="relative overflow-hidden border-t border-white/10">
        {/* Background Glow */}

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="relative">
          {/* Top Section */}

          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
              {/* Brand */}

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400">
                    <Zap className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">Zephyr</h3>

                    <p className="text-sm text-white/40">
                      AI Software Creation Platform
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-md leading-relaxed text-white/40">
                  Transform ideas into production-ready software using
                  autonomous AI agents. Build, iterate, and deploy applications
                  faster than ever before.
                </p>

                {/* Stats */}

                <div className="mt-8 flex gap-8">
                  <div>
                    <div className="text-xl font-bold">10K+</div>

                    <div className="text-xs text-white/35">Apps Built</div>
                  </div>

                  <div>
                    <div className="text-xl font-bold">1.2M+</div>

                    <div className="text-xs text-white/35">Lines Generated</div>
                  </div>
                </div>
              </div>

              {/* Product */}

              <div>
                <h4 className="mb-5 font-semibold">Product</h4>

                <div className="space-y-3 text-white/45">
                  <a href="#" className="block hover:text-white">
                    Features
                  </a>

                  <a href="#" className="block hover:text-white">
                    Pricing
                  </a>

                  <a href="#" className="block hover:text-white">
                    AI Agents
                  </a>

                  <a href="#" className="block hover:text-white">
                    Roadmap
                  </a>
                </div>
              </div>

              {/* Resources */}

              <div>
                <h4 className="mb-5 font-semibold">Resources</h4>

                <div className="space-y-3 text-white/45">
                  <a href="#" className="block hover:text-white">
                    Documentation
                  </a>

                  <a href="#" className="block hover:text-white">
                    Guides
                  </a>

                  <a href="#" className="block hover:text-white">
                    Blog
                  </a>

                  <a href="#" className="block hover:text-white">
                    Changelog
                  </a>
                </div>
              </div>

              {/* Company */}

              <div>
                <h4 className="mb-5 font-semibold">Company</h4>

                <div className="space-y-3 text-white/45">
                  <a href="#" className="block hover:text-white">
                    About
                  </a>

                  <a href="#" className="block hover:text-white">
                    Careers
                  </a>

                  <a href="#" className="block hover:text-white">
                    Contact
                  </a>

                  <a href="#" className="block hover:text-white">
                    Partners
                  </a>
                </div>
              </div>

              {/* Newsletter */}

              <div>
                <h4 className="mb-5 font-semibold">Stay Updated</h4>

                <p className="mb-4 text-sm text-white/40">
                  Get product updates and AI insights.
                </p>

                <div className="space-y-3">
                  <input
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-blue-500"
                  />

                  <Button className="w-full rounded-xl">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="border-t border-white/10" />

          {/* Bottom Bar */}

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
            <div className="text-sm text-white/35">
              © 2026 Zephyr. All rights reserved.
            </div>

            <div className="flex items-center gap-8 text-sm text-white/35">
              <a href="#" className="hover:text-white">
                Privacy
              </a>

              <a href="#" className="hover:text-white">
                Terms
              </a>

              <a href="#" className="hover:text-white">
                Security
              </a>

              <a href="#" className="hover:text-white">
                Status
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-500/30"
              >
                𝕏
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-500/30"
              >
                in
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-500/30"
              >
                GH
              </a>
            </div>
          </div>

          {/* Huge Background Logo */}

          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[220px] font-black tracking-[-0.08em] text-white/[0.02]">
            ZEPHYR
          </div>
        </div>
      </footer>
    </main>
  );
}
