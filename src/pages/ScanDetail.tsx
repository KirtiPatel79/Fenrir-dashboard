import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  Search,
  Map,
  FlaskConical,
  CheckCircle,
  FileText,
  ListCollapse,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { scanSteps, scanMeta, activityLogs, findings, footerStats } from "../data/mockData";

const STEP_ICONS = [Search, Map, FlaskConical, CheckCircle, FileText];

function renderLogLine(line: string, keyPrefix: string) {
  if (line == null || typeof line !== "string") return null;
  const regex =
    /(\[\d{2}:\d{2}:\d{2}\]|\b[a-zA-Z0-9.-]+\.(com|net|org|io|dev)\b|\b\d{1,3}(\.\d{1,3}){3}\b|\/api\/[^\s]*|\/password\/[^\s]*|\b\w+:\w+\b|\b(IDOR|SQLi|XSS|RCE|CSRF)\b|X-[A-Za-z-]+:\s*\d+)/g;
  const out: React.ReactNode[] = [];
  let last = 0;

  for (const match of line.matchAll(regex)) {
    const start = match.index ?? 0;
    const value = match[0];

    out.push(line.slice(last, start));

    const cleaned = value.replace(/\*\*/g, "");
    const cls =
      value.includes("X-UserId")
        ? "text-orange-500"
        : value.includes("IDOR")
          ? "text-red-500 font-semibold"
          : "text-teal-500";

    out.push(
      <span key={`${keyPrefix}-${start}`} className={cls}>
        {cleaned}
      </span>
    );

    last = start + value.length;
  }

  out.push(line.slice(last));
  return out;
}

type Finding = (typeof findings)[number];

export default function ScanDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"activity" | "verification">("activity");
  const [toast, setToast] = useState<string | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [visibleFindings, setVisibleFindings] = useState<Finding[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const findingsContainerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  const activeIndex = useMemo(() => scanSteps.findIndex((s) => s.active), []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Stream logs one-by-one (400-800ms per line)
  useEffect(() => {
    let index = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      if (!mountedRef.current || index >= activityLogs.length) {
        if (mountedRef.current && index >= activityLogs.length) {
          setIsStreaming(false);
        }
        return;
      }
      timerId = setTimeout(() => {
        if (!mountedRef.current) return;
        setVisibleLogs((prev) => [...prev, activityLogs[index]]);
        index += 1;
        scheduleNext();
      }, 600);
    };
    scheduleNext();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  // Stream findings one-by-one (first at ~1.5s, second at ~3s, third at ~4.5s)
  useEffect(() => {
    const delays = [1500, 3000, 4500];
    const timers: ReturnType<typeof setTimeout>[] = [];

    findings.forEach((f, i) => {
      const t = setTimeout(() => {
        if (mountedRef.current) {
          setVisibleFindings((prev) => [...prev, f]);
        }
      }, delays[i]);
      timers.push(t);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Auto-scroll both panels when new content arrives
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({ top: logContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleLogs]);

  useEffect(() => {
    if (findingsContainerRef.current) {
      findingsContainerRef.current.scrollTo({ top: findingsContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleFindings]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  const btnBase =
    "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50";
  const btnSecondary =
    "border border-(--border) bg-(--bg-primary) text-(--text-primary) hover:bg-(--bg-tertiary)";
  const btnDanger = "bg-red-500 text-white hover:bg-red-600";

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Sidebar mobileOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-4 border-b border-(--border) bg-(--bg-primary)">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-(--bg-tertiary) mr-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="text-sm text-(--text-secondary)">
              Scan / Private Assets / <span className="text-teal-500 font-medium">New Scan</span>
            </nav>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => showToast("Export started")}
              className={`${btnBase} ${btnSecondary}`}
            >
              Export Report
            </button>

            <button
              type="button"
              onClick={() => showToast("Scan stopped")}
              className={`${btnBase} ${btnDanger}`}
            >
              Stop Scan
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 pb-16 overflow-auto">
          {/* Progress */}
          <section className="rounded-xl border border-(--border) bg-(--bg-secondary) p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* progress ring */}
              <div className="relative w-32 h-32 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--border)" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="#0CC8A8"
                    strokeWidth="3"
                    strokeDasharray="97 97"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">0%</span>
                  <span className="text-xs text-(--text-muted)">In Progress</span>
                </div>
              </div>

              {/* steps + meta */}
              <div className="flex-1 w-full">
                <div className="flex items-start relative z-0 ">
                  <div className="absolute top-1/3 left-1 right-1 h-0.5 bg-gray-100 dark:bg-gray-600 -z-1"></div>
                  {scanSteps.map((step, i) => {
                    const Icon = STEP_ICONS[i];
                    const isActive = step.active;
                    const isDone = activeIndex > i;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center justify-center flex-1 min-w-0 "
                      >
                        <div className="flex items-center justify-center w-full">
                          <div
                            className={[
                              "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                              isActive
                                ? "bg-teal-500 text-white ring-6 ring-teal-500/20"
                                : isDone
                                  ? "bg-teal-500 text-white"
                                  : "bg-(--bg-tertiary) text-(--text-muted)",
                            ].join(" ")}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <span
                          className={[
                            "text-xs font-medium mt-1.5 whitespace-nowrap",
                            isActive
                              ? "text-teal-500"
                              : isDone
                                ? "text-teal-500/80"
                                : "text-(--text-muted)",
                          ].join(" ")}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-(--border)">
                  <div className="flex flex-wrap gap-6 justify-start items-center">

                    <div className="flex flex-col min-w-20">
                      <span className="text-xs text-(--text-muted)">Scan Type</span>
                      <span className="text-sm font-medium">
                        {scanMeta.scanType}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-20">
                      <span className="text-xs text-(--text-muted)">Targets</span>
                      <span className="text-sm font-medium">
                        {scanMeta.targets}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-35">
                      <span className="text-xs text-(--text-muted)">Started At</span>
                      <span className="text-sm font-medium ">
                        {scanMeta.startedAt}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-20">
                      <span className="text-xs text-(--text-muted)">Credentials</span>
                      <span className="text-sm font-medium">
                        {scanMeta.credentials}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-20">
                      <span className="text-xs text-(--text-muted)">Files</span>
                      <span className="text-sm font-medium">
                        {scanMeta.files}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-20">
                      <span className="text-xs text-(--text-muted)">Checklists</span>
                      <span className="text-sm font-medium text-teal-400">
                        {scanMeta.checklists}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Console */}
          <section className="rounded-xl border border-(--border) bg-(--bg-secondary) overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-(--border) bg-(--bg-tertiary)/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Live Scan Console</span>
                <span className={`px-2 py-0.5 rounded text-xs ${isStreaming ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-(--bg-tertiary) text-(--text-muted)"}`}>
                  {isStreaming ? "Running..." : "Idle"}
                </span>
              </div>

              <div className="flex gap-2">
                <button type="button" className="p-1 rounded hover:bg-(--bg-tertiary) text-(--text-secondary)" aria-label="Minimize">
                  <ListCollapse className="w-4 h-4" />
                </button>

              </div>
            </div>

            {/* tabs */}
            <div className="flex border-b border-(--border)">
              <button
                type="button"
                onClick={() => setActiveTab("activity")}
                className={[
                  "px-4 py-3 text-sm font-medium",
                  activeTab === "activity"
                    ? "text-teal-500 border-b-2 border-teal-500"
                    : "text-(--text-muted) hover:text-(--text-primary)",
                ].join(" ")}
              >
                Activity Log
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("verification")}
                className={[
                  "px-4 py-3 text-sm font-medium",
                  activeTab === "verification"
                    ? "text-teal-500 border-b-2 border-teal-500"
                    : "text-(--text-muted) hover:text-(--text-primary)",
                ].join(" ")}
              >
                Verification Loops
              </button>
            </div>

            <div className="grid md:grid-cols-2">

              <div ref={logContainerRef} className="border-b md:border-b-0 md:border-r border-(--border) p-4 min-h-48 max-h-96 overflow-auto">
                {activeTab === "verification" ? (
                  <div className="text-sm text-(--text-muted)">
                    No verification loops recorded yet.
                  </div>
                ) : (
                  <div className="text-xs font-mono text-(--text-secondary) whitespace-pre-wrap leading-relaxed">
                    {visibleLogs.map((line, i) => (
                      <div key={i} className="mb-1">
                        {renderLogLine(line, String(i))}
                      </div>
                    ))}
                    {isStreaming && (
                      <span className="inline-block text-teal-500 animate-pulse" aria-hidden>|</span>
                    )}
                  </div>
                )}
              </div>

              <div ref={findingsContainerRef} className="mt-4 md:mt-0 p-4 overflow-auto min-h-48 max-h-96 space-y-3">
                {visibleFindings.map((f, i) => {
                  if (!f) return null;
                  const badgeClass =
                    f.severity === "Critical"
                      ? "bg-red-500/90 text-white"
                      : f.severity === "High"
                        ? "bg-orange-500/90 text-white"
                        : "bg-amber-500/90 text-white";

                  return (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-(--border) bg-(--bg-primary)"
                    >
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${badgeClass}`}>
                        {f.severity}
                      </span>

                      <h4 className="font-medium text-sm">{f.title}</h4>
                      <p className="text-teal-500 text-xs font-mono mt-1">{f.endpoint}</p>
                      <p className="text-xs text-(--text-secondary) mt-2">{f.description}</p>
                      <p className="text-xs text-(--text-muted) mt-2">{f.time}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 flex items-center gap-6 px-4 py-2 bg-(--bg-secondary) border-t border-(--border) text-xs text-(--text-muted)">
        <span>Sub-Agents: {footerStats.subAgents}</span>
        <span>Parallel Executions: {footerStats.parallelExecutions}</span>
        <span>Operations: {footerStats.operations}</span>

        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Critical: {footerStats.critical}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          High: {footerStats.high}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Medium: {footerStats.medium}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          Low: {footerStats.low}
        </span>
      </div>

      {toast && (
        <div className="fixed bottom-12 right-6 px-4 py-2 rounded-lg bg-(--bg-primary) text-(--text-primary) text-sm shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}