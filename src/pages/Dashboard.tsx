import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Ban,
  TriangleAlert,
  SearchAlert,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import VulnBadges from "../components/VulnBadge";
import { orgStats, severityData, scans } from "../data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();

  // UI state
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  //filter scans by name/type
  const filteredScans = scans.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()),
  );

  //temporary toast
  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };
  const severityIconMap = {
    critical: {
      Icon: Ban,
      stroke: "red",
      bg: "bg-red-100",
    },
    high: {
      Icon: TriangleAlert,
      stroke: "#f97316",
      bg: "bg-orange-100",
    },
    medium: {
      Icon: TriangleAlert,
      stroke: "#ca8a04",
      bg: "bg-yellow-100",
    },
    low: {
      Icon: SearchAlert,
      stroke: "#2563eb",
      bg: "bg-blue-100",
    },
  } as const;

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      {/* Sidebar (drawer on mobile) */}
      <Sidebar
        mobileOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(false)}
      />

      {/* mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* page content / leaves space for sidebar on lg */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-4 border-b border-(--border) bg-(--bg-primary)">
          <div className="flex items-center">
            {/* mobile open */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-(--bg-tertiary) mr-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 (--text-primary)" />
            </button>

            <nav className="text-sm text-(--text-secondary)">
              Scan / Private Assets /{" "}
              <span className="text-teal-500 font-medium">New Scan</span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast("Export started")}
              className="px-3 py-2 rounded-lg text-sm border border-(--border) bg-(--bg-primary) hover:bg-(--bg-tertiary)"
            >
              Export Report
            </button>

            <button
              type="button"
              onClick={() => showToast("Scan stopped")}
              className="px-3 py-2 rounded-lg text-sm border border-red-300 bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-700 hover:border-red-500"
            >
              Stop Scan
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {/* small org stats row */}
          <div className="py-4 border-b border-(--border) flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Grid on mobile, single line on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:items-center text-sm text-(--text-secondary) gap-y-3 lg:gap-y-0 lg:divide-x lg:divide-(--border)">
              <div className="lg:pr-4">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Org :{" "}
                </span>
                <span className="text-(--text-primary) font-medium">
                  {orgStats.org}
                </span>
              </div>

              <div className="lg:px-4">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Owner :{" "}
                </span>
                <span className="text-(--text-primary) font-medium">
                  {orgStats.owner}
                </span>
              </div>

              <div className="lg:px-4">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Total Scans :{" "}
                </span>
                <span className="text-(--text-primary) font-medium">
                  {orgStats.totalScans}
                </span>
              </div>

              <div className="lg:px-4">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Scheduled :{" "}
                </span>
                <span className="text-(--text-primary) font-medium">
                  {orgStats.scheduled}
                </span>
              </div>

              <div className="lg:px-4">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Rescans :{" "}
                </span>
                <span className="text-(--text-primary) font-medium">
                  {orgStats.rescans}
                </span>
              </div>

              <div className="lg:px-4 text-red-600 dark:text-red-400">
                <span className="block lg:inline text-xs uppercase lg:normal-case opacity-70 lg:opacity-100">
                  Failed :{" "}
                </span>
                <span className="font-bold">{orgStats.failedScans}</span>
              </div>
            </div>

            <span className="text-xs text-(--text-muted) flex items-center gap-1.5 shrink-0 border-t border-(--border) pt-3 lg:border-none lg:pt-0">
              <RefreshCw className="w-3.5 h-3.5" />
              Updated {orgStats.lastUpdated}
            </span>
          </div>
          {/* severity summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {severityData.map((s) => {
              const config =
                severityIconMap[
                  s.color.toLowerCase() as keyof typeof severityIconMap
                ];
              const Icon = config?.Icon;
              return (
                <div
                  key={s.label}
                  className={`p-4 relative rounded-xl border border-(--border) bg-(--bg-secondary)`}
                >
                  <p className="text-sm text-(--text-secondary) mb-1">
                    {s.label}
                  </p>
                  <p className="text-2xl font-bold text-(--text-primary)">
                    {s.count}
                  </p>
                  <p
                    className={`text-xs mt-1 ${s.isIncrease ? "text-red-500" : "text-green-500"}`}
                  >
                    {s.isIncrease ? "+" : "-"}
                    {s.change}% {s.isIncrease ? "increase" : "decrease"} than
                    yesterday
                  </p>
                  {Icon && (
                    <Icon
                      className={`absolute top-2 right-2 md:top-4 md:right-4 ${config.bg} rounded-md p-1 md:p-1.5`}
                      size={30}
                      stroke={config.stroke}
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* table + controls */}
          <div className="rounded-xl border border-(--border) bg-(--bg-secondary) overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-(--border)">
              {/* search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
                <input
                  type="search"
                  placeholder="Search scans by name or type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-(--border) bg-(--bg-primary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>

              {/* actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Filter opened")}
                  className="px-3 py-2 rounded-lg text-sm border border-(--border) bg-(--bg-primary) hover:bg-(--bg-tertiary)"
                >
                  Filter
                </button>

                <button
                  type="button"
                  onClick={() => showToast("Column settings")}
                  className="px-3 py-2 rounded-lg text-sm border border-(--border) bg-(--bg-primary) hover:bg-(--bg-tertiary)"
                >
                  Column
                </button>

                <button
                  type="button"
                  onClick={() => showToast("New scan created")}
                  className="px-4 py-2 rounded-lg text-sm bg-teal-500 text-white hover:bg-teal-600"
                >
                  + New scan
                </button>
              </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-(--border) bg-(--bg-tertiary)/50">
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Scan Name
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Progress
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Vulnerability
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-(--text-secondary)">
                      Last Scan
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredScans.map((scan) => (
                    <tr
                      key={scan.id}
                      onClick={() => navigate(`/scan/${scan.id}`)}
                      className="border-b border-(--border) hover:bg-(--bg-tertiary)/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-(--text-primary)">
                        {scan.name}
                      </td>
                      <td className="px-4 py-3 text-(--text-primary)">
                        {scan.type}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={
                            scan.status as "Completed" | "Scheduled" | "Failed"
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-(--bg-tertiary) overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                scan.status === "Failed"
                                  ? "bg-red-500"
                                  : "bg-teal-500"
                              }`}
                              style={{ width: `${scan.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-(--text-primary)">
                            {scan.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <VulnBadges vulns={scan.vulnerabilities} />
                      </td>
                      <td className="px-4 py-3 text-(--text-muted)">
                        {scan.lastScan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* footer / pagination (static for now) */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-(--border) text-sm text-(--text-muted)">
              <span>
                Showing {filteredScans.length} of {orgStats.totalScans} Scans
              </span>

              <div className="flex gap-1">
                <button
                  type="button"
                  className="p-2 rounded hover:bg-(--bg-tertiary) disabled:opacity-40 text-(--text-secondary)"
                  disabled
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="p-2 rounded hover:bg-(--bg-tertiary) disabled:opacity-40 text-(--text-secondary)"
                  disabled
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* toast (simple) */}
      {toast && (
        <div className="fixed bottom-6 right-6 px-4 py-2 rounded-lg bg-(--text-primary) text-(--bg-primary) text-sm shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
