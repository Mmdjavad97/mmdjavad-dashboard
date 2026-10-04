import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Clock3,
  Activity,
  ChevronRight,
} from "lucide-react";
import "./styles.css";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const stats = [
  { label: "Active Projects", value: "12", change: "+2 this month", icon: FolderKanban },
  { label: "Open Tasks", value: "28", change: "8 due this week", icon: CheckSquare },
  { label: "Documents", value: "146", change: "+14 this month", icon: FileText },
  { label: "Activity", value: "94%", change: "System health", icon: Activity },
];

const activities = [
  { title: "Project Alpha was updated", time: "12 minutes ago", type: "Project" },
  { title: "New document uploaded", time: "1 hour ago", type: "Document" },
  { title: "Task marked as completed", time: "3 hours ago", type: "Task" },
  { title: "Project Beta deadline changed", time: "Yesterday", type: "Project" },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle =
    navigation.find((item) => item.id === activePage)?.label || "Dashboard";

  const selectPage = (id) => {
    setActivePage(id);
    setMobileOpen(false);
  };

  return (
    <div className="app">
      {mobileOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-name">My Dashboard</div>
            <div className="brand-subtitle">Personal workspace</div>
          </div>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nav">
          <div className="nav-label">MENU</div>
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activePage === id ? "active" : ""}`}
              onClick={() => selectPage(id)}
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar">M</div>
            <div className="user-info">
              <strong>My Account</strong>
              <span>Personal</span>
            </div>
            <ChevronRight size={17} className="muted" />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
            <div>
              <div className="eyebrow">WORKSPACE</div>
              <h1>{pageTitle}</h1>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="search-button">
              <Search size={18} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="icon-button notification" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <div className="top-avatar">M</div>
          </div>
        </header>

        {activePage === "dashboard" ? (
          <Dashboard />
        ) : (
          <PlaceholderPage title={pageTitle} />
        )}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="content">
      <section className="hero">
        <div>
          <div className="hero-kicker">GOOD MORNING</div>
          <h2>Welcome back.</h2>
          <p>Here’s what is happening in your workspace today.</p>
        </div>
        <button className="primary-button">
          <Plus size={18} />
          New item
        </button>
      </section>

      <section className="stats-grid">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <article className="stat-card" key={label}>
            <div className="stat-top">
              <div className="stat-icon"><Icon size={19} /></div>
              <ArrowUpRight size={17} className="stat-arrow" />
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-change">{change}</div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h3>Recent activity</h3>
              <p>Your latest workspace activity.</p>
            </div>
            <button className="text-button">View all</button>
          </div>

          <div className="activity-list">
            {activities.map((item, index) => (
              <div className="activity-row" key={index}>
                <div className="activity-icon">
                  {item.type === "Project" && <FolderKanban size={17} />}
                  {item.type === "Document" && <FileText size={17} />}
                  {item.type === "Task" && <CheckSquare size={17} />}
                </div>
                <div className="activity-main">
                  <strong>{item.title}</strong>
                  <span><Clock3 size={13} /> {item.time}</span>
                </div>
                <span className="activity-type">{item.type}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel quick-panel">
          <div className="panel-header">
            <div>
              <h3>Quick actions</h3>
              <p>Common things you may want to do.</p>
            </div>
          </div>

          <div className="quick-actions">
            <button>
              <div className="quick-icon"><Plus size={18} /></div>
              <div>
                <strong>Create project</strong>
                <span>Start something new</span>
              </div>
              <ChevronRight size={17} />
            </button>
            <button>
              <div className="quick-icon"><CheckSquare size={18} /></div>
              <div>
                <strong>Add a task</strong>
                <span>Keep track of your work</span>
              </div>
              <ChevronRight size={17} />
            </button>
            <button>
              <div className="quick-icon"><FileText size={18} /></div>
              <div>
                <strong>Upload document</strong>
                <span>Add a file to your workspace</span>
              </div>
              <ChevronRight size={17} />
            </button>
          </div>
        </article>
      </section>

      <section className="bottom-note">
        <div className="note-icon"><Activity size={18} /></div>
        <div>
          <strong>Your dashboard is ready to expand.</strong>
          <p>
            This is the foundation. We can now add real pages, databases,
            authentication, APIs, and your own tools without redesigning the whole app.
          </p>
        </div>
      </section>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="content placeholder-wrap">
      <div className="placeholder">
        <div className="placeholder-icon"><Settings size={24} /></div>
        <h2>{title}</h2>
        <p>This page is ready for us to build next.</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);