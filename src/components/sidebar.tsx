import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  FileSearch,
  Calendar,
  Bell,
  Settings,
  Info,
  User,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type SidebarItem = {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const primaryNav: SidebarItem[] = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "#", label: "Projects", Icon: Folder },
  { to: "/scan", label: "Scans", Icon: FileSearch },
  { to: "#", label: "Schedule", Icon: Calendar },
];

const secondaryNav: SidebarItem[] = [
  { to: "#", label: "Notifications", Icon: Bell },
  { to: "#", label: "Settings", Icon: Settings },
  { to: "#", label: "Support", Icon: Info },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMenuClick?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMenuClick }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // Active styling logic:
  const isActivePath = (to: string) => {
    if (to === "/dashboard") return pathname === "/dashboard";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const linkClass = (active: boolean) =>
    [
      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
      active
        ? "bg-teal-500/15 text-teal-500 font-medium"
        : "text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)",
    ].join(" ");

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-40 h-screen w-64 flex flex-col",
        "bg-(--bg-secondary) border-r border-(--border)",
        "transition-transform",
        // default: hidden on mobile
        "-translate-x-full",
        // visible on large screens
        "lg:translate-x-0",
        // visible on mobile when menu is open
        mobileOpen ? "translate-x-0" : "",
      ].join(" ")}
    >
      {/* Header / Brand */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
            <div className="w-3.5 h-3.5 rounded-full bg-white" />
          </div>
          <span className="font-semibold text-(--text-primary)">aps</span>
        </div>

        {/* Close button (mobile only) */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded hover:bg-(--bg-tertiary)"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {primaryNav.map(({ to, label, Icon }) => (
          <NavLink key={label} to={to} className={() => linkClass(isActivePath(to))}>
            <Icon className="w-5 h-5 shrink-0 opacity-80" />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="border-t border-(--border) my-3" />

        {secondaryNav.map(({ to, label, Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={() =>
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors " +
              "text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)"
            }
          >
            <Icon className="w-5 h-5 shrink-0 opacity-80" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-(--border)">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-neutral-800" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-(--text-primary) truncate">
              admin@edu.com
            </p>
            <p className="text-xs text-(--text-muted)">Security Lead</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="w-full py-2 rounded-lg text-xs text-(--text-secondary) hover:bg-(--bg-tertiary) border border-(--border)"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </aside>
  );
}