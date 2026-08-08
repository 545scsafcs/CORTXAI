import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import CountUpRaw from "react-countup";

const CountUp = typeof CountUpRaw === "function"
  ? CountUpRaw
  : (CountUpRaw && typeof CountUpRaw.default === "function" ? CountUpRaw.default : null);

import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Workflow,
  BarChart3,
  Cpu,
  Play,
  Star,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import noraDefault from "../../assets/images/nora-default.png";
import noraListening from "../../assets/images/nora-listening.png";
import noraThinking from "../../assets/images/nora-thinking.png";
import noraSpeaking from "../../assets/images/nora-speaking.png";
import noraSuccess from "../../assets/images/nora-success.png";
import noraSleeping from "../../assets/images/nora-sleeping.png";
import noraFullBody from "../../assets/images/nora-full-body.png";
import aiOperatingSystem from "../../assets/images/ai-operating-system.png";
import aiCommandCenter from "../../assets/images/ai-command-center.png";
import aiAgentsImage from "../../assets/images/ai-agents.png";
import enterpriseIntelligence from "../../assets/images/enterprise-intelligence.png";
import customerJourney from "../../assets/images/customer-journey.png";
import employeeAnalytics from "../../assets/images/employee-analytics.png";
import financialIntelligence from "../../assets/images/financial-intelligence.png";
import inventoryAutomation from "../../assets/images/inventory-automation.png";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "AI Agents", href: "#agents" },
  { label: "Modules", href: "#modules" },
  { label: "Nora", href: "#nora-preview" },
  { label: "Why CORTXAI", href: "#why-cortxai" },
];

const stats = [
  { value: 98, suffix: "%", label: "Workflow automation coverage" },
  { value: 6, suffix: "x", label: "Faster cross-team execution" },
  { value: 24, suffix: "/7", label: "Autonomous AI operations" },
];

const featureCards = [
  {
    title: "Unified Command Layer",
    desc: "HR, CRM, finance, inventory and analytics operate as one intelligent system.",
    icon: Workflow,
  },
  {
    title: "Adaptive AI Agents",
    desc: "Nora deploys role-specific agents that reason, act, and report in real time.",
    icon: Bot,
  },
  {
    title: "Enterprise Security",
    desc: "Built for governance, auditability, role-based controls, and private deployment.",
    icon: ShieldCheck,
  },
  {
    title: "Predictive Intelligence",
    desc: "Forecast outcomes instantly across payroll, inventory, revenue, and operations.",
    icon: Cpu,
  },
];

const agents = [
  {
    id: "hr",
    title: "Nora HR Agent",
    metric: "94% less HR admin overhead",
    desc: "Automates attendance, leave workflows, payroll checks, and employee query routing.",
    image: employeeAnalytics,
  },
  {
    id: "crm",
    title: "Nora CRM Agent",
    metric: "+40% pipeline velocity",
    desc: "Scores lead intent, drafts contextual outreach, and orchestrates follow-up timing.",
    image: customerJourney,
  },
  {
    id: "finance",
    title: "Nora Finance Agent",
    metric: "Zero reconciliation lag",
    desc: "Monitors ledgers, identifies variances, and keeps reporting continuously aligned.",
    image: financialIntelligence,
  },
  {
    id: "inventory",
    title: "Nora Inventory Agent",
    metric: "0% stockout surprises",
    desc: "Tracks threshold risks, suggests restocking, and keeps supplier actions proactive.",
    image: inventoryAutomation,
  },
];

const modules = [
  {
    title: "AI Operating System",
    image: aiOperatingSystem,
    desc: "One operating layer for all business-critical workflows.",
  },
  {
    title: "AI Command Center",
    image: aiCommandCenter,
    desc: "Real-time decision cockpit with contextual business intelligence.",
  },
  {
    title: "AI Agent Mesh",
    image: aiAgentsImage,
    desc: "Specialized AI workforce coordinating every team objective.",
  },
  {
    title: "Enterprise Intelligence",
    image: enterpriseIntelligence,
    desc: "Cross-functional data awareness that drives autonomous execution.",
  },
];

const testimonials = [
  {
    quote:
      "CORTXAI fundamentally changed our operating rhythm. Nora replaced disconnected workflows with one intelligent execution layer.",
    author: "Elena Rostova",
    role: "VP of Operations",
  },
  {
    quote:
      "Running HR, sales, and finance in one AI neocortex gave us the clarity and speed we could never get from fragmented software.",
    author: "Marc Andre-Vigne",
    role: "Founder",
  },
  {
    quote:
      "Our security team approved CORTXAI quickly because governance and control are deeply integrated into the product architecture.",
    author: "Siddharth Mehta",
    role: "Chief Security Architect",
  },
];

function MagneticButton({ children, to, href = "#", variant = "primary", className = "" }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all duration-300";
  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-cyan-600 shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.35)]",
    ghost:
      "bg-white/80 text-slate-800 border border-slate-200/80 hover:bg-white hover:border-cyan-400 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl",
  };

  const onMove = (e) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.12, y: y * 0.12 });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  const onRipple = (e) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 520);
  };

  const content = (
    <motion.span
      ref={buttonRef}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onRipple}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="landing-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden
        />
      ))}
      {children}
    </motion.span>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return <a href={href}>{content}</a>;
}

export default function LandingPage() {
  const [activeAgent, setActiveAgent] = useState("hr");
  const [noraMode, setNoraMode] = useState("default");
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const floatRef = useRef(null);
  const noraRef = useRef(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: (i * 17.7) % 100,
        top: (i * 29.3) % 100,
        size: 2 + ((i * 7) % 4),
        duration: 6 + ((i * 13) % 10),
      })),
    []
  );

  const noraAsset = {
    default: noraDefault,
    listening: noraListening,
    thinking: noraThinking,
    speaking: noraSpeaking,
    success: noraSuccess,
  }[noraMode];

  const noraCaption = {
    default: "Nora is online and synchronizing your operations.",
    listening: "Listening: gathering context across your teams.",
    thinking: "Thinking: mapping dependencies and next actions.",
    speaking: "Speaking: delivering confident execution guidance.",
    success: "Resolved: your workflows are now in perfect sync.",
  }[noraMode];

  useEffect(() => {
    const modes = ["default", "listening", "thinking", "speaking", "success"];
    let index = 0;
    const modeTimer = window.setInterval(() => {
      index = (index + 1) % modes.length;
      setNoraMode(modes[index]);
    }, 3200);
    return () => window.clearInterval(modeTimer);
  }, []);

  useEffect(() => {
    let timer;
    const blink = () => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 120);
      timer = window.setTimeout(blink, 2600 + Math.random() * 3000);
    };
    timer = window.setTimeout(blink, 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(floatRef.current, {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(noraRef.current, {
        rotate: 0.8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="landing-v3 relative min-h-screen overflow-x-hidden text-slate-900">
      <div className="landing-aurora" aria-hidden />
      <div className="landing-noise" aria-hidden />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="landing-particle"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ y: [-14, 14, -14], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/75 px-5 py-3 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <a href="#hero" className="flex items-center gap-3">
            <img src={logo} alt="CORTXAI logo" className="h-8 w-8 rounded-lg object-cover shadow-sm" />
            <span className="text-sm font-bold tracking-[0.2em] text-slate-900">CORTXAI</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </div>
          <MagneticButton to="/login" variant="ghost" className="px-5 py-2.5 text-xs">
            Launch Command Center <ArrowRight size={14} />
          </MagneticButton>
        </nav>
      </header>

      <section
        id="hero"
        className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pt-36 md:px-8"
        onMouseMove={(e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setMouse({ x: nx, y: ny });
        }}
      >
        <motion.div
          className="landing-cursor-glow"
          animate={{ x: mouse.x * 90, y: mouse.y * 90 }}
          transition={{ type: "spring", stiffness: 70, damping: 24 }}
          aria-hidden
        />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 shadow-[0_4px_20px_rgba(6,182,212,0.12)] backdrop-blur-md">
              <Sparkles size={14} /> AI Business Operating System
            </span>
            <h1 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-slate-900 md:text-7xl">
              Run your entire business with <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">one intelligence layer</span>.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              CORTXAI unifies HR, CRM, finance, inventory and analytics into one autonomous operating
              system powered by Nora.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton to="/login">
                Launch CORTXAI <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href="#nora-preview" variant="ghost">
                <Play size={15} /> Meet Nora
              </MagneticButton>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="landing-glass rounded-2xl p-4">
                  <p className="text-3xl font-extrabold text-slate-900">
                    {CountUp ? (
                      <CountUp end={item.value} duration={2.2} enableScrollSpy />
                    ) : (
                      <span>{item.value}</span>
                    )}
                    {item.suffix}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={floatRef} className="relative">
            <motion.div
              ref={noraRef}
              className="landing-glass relative overflow-hidden rounded-[2.5rem] border border-white/90 p-5 shadow-[0_25px_60px_-15px_rgba(6,182,212,0.2),0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-2xl"
              style={{
                transform: `perspective(1100px) rotateX(${-mouse.y * 7}deg) rotateY(${mouse.x * 9}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-indigo-500/10" />
              <img
                src={noraAsset}
                alt="Nora AI Assistant"
                className="relative z-10 h-[520px] w-full object-cover object-top rounded-2xl"
              />
              <img
                src={noraSleeping}
                alt=""
                aria-hidden
                className={`pointer-events-none absolute inset-0 z-20 h-full w-full object-cover object-top transition-opacity duration-100 ${isBlinking ? "opacity-100" : "opacity-0"
                  }`}
              />
              <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between rounded-full border border-slate-200/80 bg-white/85 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-xl shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  Nora Live
                </span>
                <span>FaceTime Mode</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={noraCaption}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 text-sm font-medium text-slate-800 backdrop-blur-2xl shadow-lg"
                >
                  {noraCaption}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Core Features</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Built for autonomous business execution.
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((feature, idx) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="landing-glass group rounded-3xl p-7"
            >
              <feature.icon className="h-7 w-7 text-cyan-600" />
              <h3 className="mt-5 text-2xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{feature.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700">
                Learn more <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="agents" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">AI Agents</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Meet Nora&apos;s autonomous workforce.
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            {agents.map((agent) => {
              const active = activeAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className="relative w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 hover:bg-white px-5 py-4 text-left transition-all shadow-sm hover:shadow-md"
                >
                  {active ? (
                    <motion.span
                      layoutId="active-agent"
                      className="absolute inset-0 rounded-2xl bg-cyan-500/10 border border-cyan-400/30"
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    />
                  ) : null}
                  <div className="relative z-10">
                    <p className="text-base font-bold text-slate-900">{agent.title}</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">{agent.metric}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {agents
              .filter((agent) => agent.id === activeAgent)
              .map((agent) => (
                <motion.article
                  key={agent.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="landing-glass relative overflow-hidden rounded-[2.2rem] p-7 lg:col-span-8"
                >
                  <div className="absolute right-6 top-6 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
                    {agent.metric}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{agent.title}</h3>
                  <p className="mt-3 max-w-xl text-slate-600 leading-relaxed">{agent.desc}</p>
                  <img
                    src={agent.image}
                    alt={agent.title}
                    className="mt-6 h-[290px] w-full rounded-2xl border border-slate-200/80 object-cover shadow-md"
                    loading="lazy"
                  />
                </motion.article>
              ))}
          </AnimatePresence>
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-10 flex items-center gap-3 text-cyan-600">
          <Building2 size={18} />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Business Modules</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((module, idx) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="landing-glass group rounded-3xl p-5"
            >
              <img
                src={module.image}
                alt={module.title}
                className="h-52 w-full rounded-2xl border border-slate-200/80 object-cover transition duration-500 group-hover:scale-[1.02] shadow-sm"
                loading="lazy"
              />
              <h3 className="mt-5 text-2xl font-bold text-slate-900">{module.title}</h3>
              <p className="mt-2 text-slate-600">{module.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="nora-preview" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="landing-glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border border-white/90 shadow-2xl">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Nora Preview</p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Natural conversation, executive-level clarity.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Nora listens, reasons, and responds with context from every business module—while
                maintaining a calm, human communication rhythm.
              </p>
              <div className="space-y-3 text-sm font-medium">
                <p className="rounded-xl border border-slate-200/80 bg-white/90 p-3.5 text-slate-800 shadow-sm">
                  <strong>You:</strong> What happens to margin if raw material cost rises 8% next month?
                </p>
                <p className="rounded-xl border border-cyan-200/70 bg-cyan-50/80 p-3.5 text-slate-900 shadow-sm">
                  <strong>Nora:</strong> Projected margin impact is -3.6%. I can optimize procurement
                  timing and suggest vendor alternatives now.
                </p>
              </div>
            </div>
            <div className="relative lg:col-span-6">
              <img
                src={noraFullBody}
                alt="Nora full body visual"
                className="mx-auto h-[540px] w-full max-w-md rounded-[2rem] border border-slate-200/80 object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="why-cortxai" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Why CORTXAI</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Enterprise-grade intelligence with startup-speed execution.
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Operational Excellence",
              desc: "Coordinate teams, data, and decisions from one intelligent source of truth.",
              icon: BriefcaseBusiness,
            },
            {
              title: "Security by Design",
              desc: "Access control, audit trails, and governance-first architecture built in.",
              icon: ShieldCheck,
            },
            {
              title: "Measurable Growth",
              desc: "Increase speed, reduce costs, and scale reliable automation with confidence.",
              icon: BarChart3,
            },
          ].map((item) => (
            <article key={item.title} className="landing-glass rounded-3xl p-7">
              <item.icon className="h-7 w-7 text-cyan-600" />
              <h3 className="mt-5 text-2xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
        <div id="pricing" className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { tier: "Starter", price: "₹9,999/mo", users: "Up to 20 users" },
            { tier: "Scale", price: "₹29,999/mo", users: "Up to 100 users" },
            { tier: "Enterprise", price: "Custom", users: "Unlimited teams" },
          ].map((plan, idx) => (
            <article
              key={plan.tier}
              className={`rounded-3xl border p-7 transition-all ${idx === 1
                  ? "border-cyan-400 bg-white/90 shadow-[0_20px_50px_rgba(6,182,212,0.2)]"
                  : "landing-glass border-slate-200/80"
                }`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{plan.tier}</p>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">{plan.price}</p>
              <p className="mt-2 text-slate-600">{plan.users}</p>
              <button className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700">
                Explore plan <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <Star size={16} className="text-cyan-600" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Testimonials</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.article
              key={item.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="landing-glass rounded-3xl p-7"
            >
              <p className="text-slate-700 italic leading-relaxed">“{item.quote}”</p>
              <p className="mt-6 text-base font-bold text-slate-900">{item.author}</p>
              <p className="text-sm font-medium text-slate-500">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-200/60 bg-gradient-to-br from-white via-cyan-50/60 to-slate-100 p-10 text-center md:p-16 shadow-2xl">
          <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Get Started</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            Build the future of operations with Nora.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 text-lg">
            Replace disconnected tools with one elegant intelligence layer and scale with confidence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/login">
              Launch Command Center <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#hero" variant="ghost">
              Back to top
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 px-4 py-12 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="CORTXAI logo" className="h-8 w-8 rounded-lg object-cover shadow-sm" loading="lazy" />
              <span className="text-sm font-bold tracking-[0.2em] text-slate-900">CORTXAI</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              The AI Business Operating System for modern organizations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm font-medium text-slate-600 md:grid-cols-3">
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#agents" className="transition hover:text-slate-900">
              AI Agents
            </a>
            <a href="#modules" className="transition hover:text-slate-900">
              Modules
            </a>
            <a href="#pricing" className="transition hover:text-slate-900">
              Pricing
            </a>
            <a href="#why-cortxai" className="transition hover:text-slate-900">
              Security
            </a>
            <Link to="/login" className="transition hover:text-slate-900">
              Portal Login
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-7xl border-t border-slate-200/70 pt-6 text-xs text-slate-400">
          © 2026 CORTXAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}