"use client";

/* INTERACTIVE DASHBOARD PREVIEW — a fake admin console you can actually poke.
   Tabs (Agents / Logs) · filter chips (status) · table rows animate in/out on
   filter change (AnimatePresence) · an interactive bar chart (hover a bar →
   highlight + tooltip). All client state, no backend. */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { StatusDot, MonoLabel } from "./hud";

type Status = "active" | "idle" | "error";

const AGENTS: { name: string; status: Status; region: string; load: number }[] = [
  { name: "orchestrator-01", status: "active", region: "us-east", load: 72 },
  { name: "vision-ingest-09", status: "active", region: "eu-west", load: 54 },
  { name: "policy-router-03", status: "idle", region: "ap-south", load: 12 },
  { name: "anomaly-scout-07", status: "error", region: "us-west", load: 0 },
  { name: "exec-agent-22", status: "active", region: "eu-central", load: 88 },
  { name: "learn-loop-02", status: "idle", region: "sa-east", load: 9 },
];

const LOGS = [
  "12:04:51  orchestrator-01 dispatched 240 tasks",
  "12:04:52  anomaly-scout-07 FLAGGED latency spike · eu-west",
  "12:04:53  policy-router-03 escalated event #88241 → operator",
  "12:04:55  exec-agent-22 completed batch · 1,024 ops",
  "12:04:57  learn-loop-02 updated threshold τ=0.82",
  "12:05:01  vision-ingest-09 throughput +12% · nominal",
];

const CHART = [38, 52, 44, 61, 48, 72, 65];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const STATUS_COLOR: Record<Status, string> = {
  active: "text-green",
  idle: "text-amber",
  error: "text-danger",
};
const DOT: Record<Status, "green" | "amber" | "danger"> = {
  active: "green",
  idle: "amber",
  error: "danger",
};

export function DashboardPreview() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"agents" | "logs">("agents");
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [hover, setHover] = useState<number | null>(null);

  const rows = AGENTS.filter((a) => filter === "all" || a.status === filter);

  return (
    <section id="dashboard" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-12">
            <MonoLabel>// 05 — control panel</MonoLabel>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
              Run it like you&apos;re already inside.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="glow-soft overflow-hidden rounded-xl border border-border bg-surface/60">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-danger/70" />
                <span className="h-3 w-3 rounded-full bg-amber/70" />
                <span className="h-3 w-3 rounded-full bg-green/70" />
                <span className="ml-3 font-mono text-xs text-ink-muted">
                  command-center.os / admin
                </span>
              </div>
              <span className="flex items-center gap-2">
                <StatusDot /> <MonoLabel>live</MonoLabel>
              </span>
            </div>

            {/* tabs */}
            <div className="flex gap-1 border-b border-border px-4 pt-3">
              {(["agents", "logs"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-4 py-2 text-sm capitalize transition-colors ${
                    tab === t ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-2 -bottom-px h-px bg-cyan"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
              {/* left: table / logs */}
              <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                {tab === "agents" ? (
                  <>
                    {/* filters */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {(["all", "active", "idle", "error"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`rounded-full px-3 py-1 font-mono text-xs capitalize transition-colors ${
                            filter === f
                              ? "bg-cyan text-bg"
                              : "border border-border text-ink-muted hover:text-ink"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    {/* table */}
                    <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr] gap-2 border-b border-border pb-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                      <span>Agent</span>
                      <span>Region</span>
                      <span className="text-right">Load</span>
                    </div>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {rows.map((a, i) => (
                        <motion.div
                          key={a.name}
                          layout={!reduce}
                          initial={reduce ? false : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduce ? undefined : { opacity: 0, x: 12 }}
                          transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.04 }}
                          className="grid grid-cols-[1.6fr_0.8fr_0.8fr] items-center gap-2 border-b border-border/60 py-3 text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <StatusDot color={DOT[a.status]} />
                            <span className="font-mono text-ink">{a.name}</span>
                          </span>
                          <span className="font-mono text-xs text-ink-muted">{a.region}</span>
                          <span className={`text-right font-mono ${STATUS_COLOR[a.status]}`}>
                            {a.load}%
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="space-y-1 font-mono text-xs">
                    {LOGS.map((l, i) => (
                      <motion.div
                        key={l}
                        initial={reduce ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.05 }}
                        className={`rounded px-2 py-1.5 ${
                          l.includes("FLAGGED")
                            ? "bg-danger/10 text-danger"
                            : "text-ink-muted hover:bg-surface-2"
                        }`}
                      >
                        {l}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* right: interactive chart */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <MonoLabel>throughput · 7d</MonoLabel>
                  <span className="font-mono text-xs text-cyan">
                    {hover !== null ? `${CHART[hover]}k ops` : "hover a bar"}
                  </span>
                </div>
                <div className="mt-6 flex h-44 items-end gap-2">
                  {CHART.map((v, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      className="group flex flex-1 flex-col items-center justify-end gap-2"
                      aria-label={`Day ${DAYS[i]}: ${v}k ops`}
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          hover === i ? "bg-cyan" : "bg-cyan/35 group-hover:bg-cyan/60"
                        }`}
                        style={{ height: `${v}%` }}
                      />
                      <span className="font-mono text-[10px] text-ink-muted">{DAYS[i]}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-md border border-border bg-surface-2/60 p-4">
                  <MonoLabel>peak</MonoLabel>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">
                    72k <span className="text-sm font-normal text-ink-muted">ops/s · Sat</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
