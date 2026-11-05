import BackendStatus from './components/BackendStatus';
import SettingsPage from './pages/Settings'
import Analytics from './pages/Analytics'
import Decisions from './pages/Decisions'
import Infrastructure from './pages/Infrastructure'
import { useState } from 'react'

import {
  LayoutDashboard,
  Server,
  ChartNoAxesCombined,
  BrainCircuit,
  Settings as SettingsIcon,
  Bell,
  Search,
  Cloud,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Clock3,
  CircleCheck,
  Menu,
  X,
  Plus,
  MoreHorizontal,
} from 'lucide-react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { motion } from 'framer-motion'

// Traffic data
const trafficData = [
  { time: '08:00', requests: 1200 },
  { time: '09:00', requests: 1800 },
  { time: '10:00', requests: 1500 },
  { time: '11:00', requests: 2400 },
  { time: '12:00', requests: 2100 },
  { time: '13:00', requests: 2900 },
  { time: '14:00', requests: 2500 },
  { time: '15:00', requests: 3400 },
  { time: '16:00', requests: 3000 },
]

// Navigation items
const navItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Infrastructure', icon: Server },
  { name: 'Performance & Cost', icon: ChartNoAxesCombined },
  { name: 'AI Decisions', icon: BrainCircuit },
]

// Dashboard metrics
const metrics = [
  {
    title: 'Active Replicas',
    value: '08',
    change: '+2',
    description: 'Compared to previous hour',
    icon: Server,
    positive: true,
  },
  {
    title: 'Incoming Traffic',
    value: '3.4k',
    unit: 'req/s',
    change: '+12.8%',
    description: 'Request volume',
    icon: Activity,
    positive: true,
  },
  {
    title: 'Queue Length',
    value: '124',
    change: '-8.2%',
    description: 'Waiting requests',
    icon: Clock3,
    positive: true,
  },
  {
    title: 'Infrastructure Cost',
    value: '₹248',
    unit: '/hr',
    change: '+3.2%',
    description: 'Estimated hourly cost',
    icon: Zap,
    positive: false,
  },
]

// Server information
const servers = [
  {
    name: 'Replica-01',
    location: 'Node Asia South',
    cpu: 42,
    status: 'Healthy',
  },
  {
    name: 'Replica-02',
    location: 'Node Asia South',
    cpu: 68,
    status: 'Healthy',
  },
  {
    name: 'Replica-03',
    location: 'Node Asia East',
    cpu: 31,
    status: 'Healthy',
  },
  {
    name: 'Replica-04',
    location: 'Node Asia East',
    cpu: 84,
    status: 'Warning',
  },
]

// Recent activities
const activities = [
  {
    title: 'Replica launched successfully',
    detail: 'New capacity added to the cluster',
    time: '2 min ago',
    icon: Plus,
  },
  {
    title: 'Traffic forecast updated',
    detail: 'Incoming workload trend recalculated',
    time: '8 min ago',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Server health check passed',
    detail: 'All monitored nodes responded',
    time: '14 min ago',
    icon: CircleCheck,
  },
]

// Sidebar component
function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">
            <Cloud size={23} />
          </div>

          <span>
            haven<span className="brand-light">ops.</span>
          </span>

          <button
            className="close-sidebar"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <div className="workspace">
          <div className="workspace-avatar">C</div>

          <div>
            <strong>Campus Cloud</strong>
            <small>Operations team</small>
          </div>

          <MoreHorizontal size={19} />
        </div>

        <div className="nav-label">MENU</div>

        <nav className="navigation">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  active === item.name ? 'active' : ''
                }`}
                onClick={() => {
                  setActive(item.name)
                  setOpen(false)
                }}
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.name}</span>

                {item.name === 'AI Decisions' && (
                  <span className="nav-dot" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <BrainCircuit size={20} />
            </div>

            <strong>Need a hand?</strong>

            <p>
              Explore your cloud operations and system insights.
            </p>

            <button
              onClick={() => {
                setActive('AI Decisions')
                setOpen(false)
              }}
            >
              Explore insights <ArrowUpRight size={14} />
            </button>
          </div>

          <button
            className={`nav-item settings-item ${
              active === 'Settings' ? 'active' : ''
            }`}
            onClick={() => {
              setActive('Settings')
              setOpen(false)
            }}
          >
            <SettingsIcon size={19} />
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="profile-avatar">H</div>

            <div>
              <strong>Haven Admin</strong>
              <small>System administrator</small>
            </div>

            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>
    </>
  )
}

// Metric card component
function MetricCard({ metric, index }) {
  const Icon = metric.icon

  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="metric-top">
        <div className="metric-icon">
          <Icon size={19} />
        </div>

        <button className="more-button">
          <MoreHorizontal size={19} />
        </button>
      </div>

      <p className="metric-title">{metric.title}</p>

      <div className="metric-value">
        {metric.value}

        {metric.unit && (
          <span>{metric.unit}</span>
        )}
      </div>

      <div className="metric-footer">
        <span
          className={`metric-change ${
            metric.positive
              ? 'change-good'
              : 'change-neutral'
          }`}
        >
          {metric.positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {metric.change}
        </span>

        <span className="metric-description">
          {metric.description}
        </span>
      </div>
    </motion.div>
  )
}
// Ingestion Updates component
function IngestionUpdates() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Morning Data Sync',
      original: '1,200 records',
      revised: '1,500 records',
      status: 'Revised',
      retries: 0,
    },
    {
      id: 2,
      name: 'Student Activity Batch',
      original: '3,500 records',
      revised: '3,500 records',
      status: 'Scheduled',
      retries: 1,
    },
    {
      id: 3,
      name: 'Evening Analytics Batch',
      original: '800 records',
      revised: '1,000 records',
      status: 'Revised',
      retries: 0,
    },
  ])

  const handleRetry = (id) => {
    setPlans((previousPlans) =>
      previousPlans.map((plan) =>
        plan.id === id
          ? { ...plan, retries: plan.retries + 1 }
          : plan
      )
    )
  }

  return (
    <section className="panel ingestion-updates-panel">
      <div className="panel-heading">
        <div>
          <div className="section-kicker">
            PLAN CHANGE MONITOR
          </div>
          <h2>Ingestion Updates & Retries</h2>
          <p>Track revised workload plans and retry activity</p>
        </div>
        <span className="updated-label">
          DEMO DATA
        </span>
      </div>

      <div className="update-list">
        {plans.map((plan) => (
          <div className="update-row" key={plan.id}>
            <div className="update-main">
              <strong>{plan.name}</strong>
              <small>
                Original: {plan.original}
              </small>
              <small>
                Latest plan: {plan.revised}
              </small>
            </div>

            <div className="update-meta">
              <span
                className={`update-status ${
                  plan.status === 'Revised'
                    ? 'update-revised'
                    : 'update-scheduled'
                }`}
              >
                {plan.status}
              </span>

              <span className="retry-count">
                Retries: {plan.retries}
              </span>

              <button
                className="retry-button"
                onClick={() => handleRetry(plan.id)}
              >
                Record retry
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="demo-note">
        Demo interaction only. Retry counts are not sent to the
        simulator or backend.
      </p>
    </section>
  )
}
function CostBreakdown() {
  const costs = [
    {
      name: 'Scheduled ingestion',
      amount: 85,
      detail: 'Processing scheduled workloads',
    },
    {
      name: 'Idle capacity',
      amount: 42,
      detail: 'Unused active replica capacity',
    },
    {
      name: 'Replica startup',
      amount: 28,
      detail: 'Starting additional infrastructure',
    },
    {
      name: 'Recovery operations',
      amount: 16,
      detail: 'Service recovery and repair',
    },
  ]

  const total = costs.reduce(
    (sum, item) => sum + item.amount,
    0
  )

  return (
    <section className="panel cost-breakdown-panel">
      <div className="panel-heading">
        <div>
          <div className="section-kicker">
            INFRASTRUCTURE EXPENDITURE
          </div>
          <h2>Updated Cost Breakdown</h2>
          <p>Illustrative operating cost categories</p>
        </div>
        <span className="updated-label">
          DEMO DATA
        </span>
      </div>

      <div className="cost-total">
        <span>Illustrative total cost</span>
        <strong>₹{total}<small> / sample period</small></strong>
      </div>

      <div className="cost-list">
        {costs.map((item) => (
          <div className="cost-row" key={item.name}>
            <div className="cost-info">
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </div>

            <strong className="cost-amount">
              ₹{item.amount}
            </strong>
          </div>
        ))}
      </div>

      <p className="demo-note">
        Sample figures only. Actual costs will come from the simulator.
      </p>
    </section>
  )
  // Main App component
function App() {
  const [active, setActive] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <BackendStatus/>

      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <main className="main-content">

        {/* Top navigation */}
        <header className="topbar">
          <div className="topbar-left">

            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="breadcrumb">
              Workspace <span>/</span> {active}
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={17} />

              <input placeholder="Search anything..." />

              <span>⌘ K</span>
            </div>

            <button className="notification-button">
              <Bell size={19} />
              <i />
            </button>

            <div className="top-avatar">H</div>
          </div>
        </header>

        {/* Page navigation */}
        {active === 'Infrastructure' ? (
          <Infrastructure />
        ) : active === 'AI Decisions' ? (
          <Decisions />
        ) : active === 'Performance & Cost' ? (
          <Analytics />
        ) : active === 'Settings' ? (
          <SettingsPage />
        ) : (

          /* Overview dashboard */
          <div className="dashboard-container">

            {/* Welcome section */}
            <section className="welcome-section">
              <div>
                <div className="eyebrow">
                  <span />
                  CLOUD OPERATIONS CENTER
                </div>

                <h1>
                  Everything running
                  <br />
                  <em>in harmony.</em>
                </h1>

                <p>
                  Monitor your infrastructure, understand your
                  workload, and keep your campus services running
                  smoothly.
                </p>
              </div>

              <div className="welcome-actions">
                <div className="live-indicator">
                  <span />
                  DEMO PREVIEW
                </div>

                <button
                  className="primary-button"
                  onClick={() => setActive('Infrastructure')}
                >
                  View infrastructure
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </section>

            {/* System status */}
            <section className="status-banner">
              <div className="status-left">
                <div className="status-check">
                  <CircleCheck size={21} />
                </div>

                <div>
                  <strong>All systems looking good</strong>

                  <p>
                    Your simulated campus service is operational.
                  </p>
                </div>
              </div>

              <div className="status-right">
                <span className="status-pulse" />
                SYSTEM HEALTHY
              </div>
            </section>

            {/* Metrics section */}
            <section className="section-block">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    AT A GLANCE
                  </div>

                  <h2>Infrastructure overview</h2>
                </div>

                <span className="updated-label">
                  Illustrative sample data
                </span>
              </div>

              <div className="metrics-grid">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={metric.title}
                    metric={metric}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Analytics section */}
            <section className="analytics-grid">

              {/* Traffic chart */}
              <div className="panel traffic-panel">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">
                      WORKLOAD MONITOR
                    </div>

                    <h2>Traffic overview</h2>

                    <p>
                      Incoming requests across the campus API
                    </p>
                  </div>

                  <button className="period-button">
                    Today <span>⌄</span>
                  </button>
                </div>

                <div className="chart-summary">
                  <strong>
                    3,400 <small>req/s</small>
                  </strong>

                  <span>
                    <ArrowUpRight size={15} />
                    12.8%
                  </span>
                </div>

                <div className="chart-area">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient
                          id="trafficFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#9DA78B"
                            stopOpacity={0.36}
                          />

                          <stop
                            offset="95%"
                            stopColor="#9DA78B"
                            stopOpacity={0.01}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="#EAE5DA"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: '#989084',
                          fontSize: 11,
                        }}
                        dy={10}
                      />

                      <YAxis
                        hide
                        domain={[0, 4000]}
                      />

                      <Tooltip
                        contentStyle={{
                          background: '#51443A',
                          border: 'none',
                          borderRadius: '10px',
                          color: '#fff',
                        }}
                        labelStyle={{
                          color: '#E8DDCC',
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="#75836B"
                        strokeWidth={2.5}
                        fill="url(#trafficFill)"
                        activeDot={{
                          r: 5,
                          fill: '#51443A',
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-footer">
                  <span>
                    <i className="legend-dot" />
                    Incoming requests
                  </span>

                  <span>Requests per second</span>
                </div>
              </div>

              {/* Capacity usage */}
              <div className="panel capacity-panel">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">
                      RESOURCE ALLOCATION
                    </div>

                    <h2>Capacity usage</h2>

                    <p>Current replica utilization</p>
                  </div>

                  <button className="more-button">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="capacity-visual">
                  <div className="donut">
                    <div className="donut-center">
                      <strong>64%</strong>
                      <span>UTILIZED</span>
                    </div>
                  </div>
                </div>

                <div className="capacity-legend">
                  <div>
                    <i className="legend-dot" />
                    <span>Used capacity</span>
                    <strong>64%</strong>
                  </div>

                  <div>
                    <i className="legend-dot legend-muted" />
                    <span>Available capacity</span>
                    <strong>36%</strong>
                  </div>
                </div>

                <div className="capacity-note">
                  <Zap size={16} />

                  <span>
                    Capacity is within the illustrative operating
                    range.
                  </span>
                </div>
              </div>
            </section>

            {/* Ingestion Schedule */}
<section className="panel ingestion-panel">
  <div className="panel-heading">
    <div>
      <div className="section-kicker">
        WORKLOAD PLANNING
      </div>
      <h2>Ingestion Schedule</h2>
      <p>Upcoming scheduled workload activity</p>
    </div>

    <span className="updated-label">
      Illustrative sample data
    </span>
  </div>

  <div className="ingestion-list">
    <div className="ingestion-row">
      <div className="ingestion-time">
        <strong>09:30 AM</strong>
        <small>Today</small>
      </div>
      <div className="ingestion-info">
        <strong>Morning Data Sync</strong>
        <small>Scheduled campus data ingestion</small>
      </div>
      <div className="ingestion-volume">
        <strong>1,200</strong>
        <small>Sample records</small>
      </div>
      <span className="ingestion-status scheduled">
        Scheduled
      </span>
    </div>

    <div className="ingestion-row">
      <div className="ingestion-time">
        <strong>12:00 PM</strong>
        <small>Today</small>
      </div>
      <div className="ingestion-info">
        <strong>Student Activity Batch</strong>
        <small>Scheduled campus data ingestion</small>
      </div>
      <div className="ingestion-volume">
        <strong>3,500</strong>
        <small>Sample records</small>
      </div>
      <span className="ingestion-status revised">
        Revised
      </span>
    </div>

    <div className="ingestion-row">
      <div className="ingestion-time">
        <strong>03:30 PM</strong>
        <small>Today</small>
      </div>
      <div className="ingestion-info">
        <strong>Evening Analytics Batch</strong>
        <small>Scheduled campus data ingestion</small>
      </div>
      <div className="ingestion-volume">
        <strong>800</strong>
        <small>Sample records</small>
      </div>
      <span className="ingestion-status scheduled">
        Scheduled
      </span>
    </div>
  </div>

  <div className="quiet-period">
    <span className="quiet-dot" />
    <div>
      <strong>Quiet-period monitoring</strong>
      <p>Watch for lower workload periods before adjusting capacity.</p>
    </div>
  </div>
</section>

<IngestionUpdates />
<CostBreakdown/> 

            {/* Server and activity section */}
            <section className="bottom-grid">

              {/* Server health */}
              <div className="panel server-panel">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">
                      COMPUTE NODES
                    </div>

                    <h2>Server health</h2>
                  </div>

                  <button
                    className="text-link"
                    onClick={() => setActive('Infrastructure')}
                  >
                    View all
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="server-list">
                  {servers.map((server) => (
                    <div
                      className="server-row"
                      key={server.name}
                    >
                      <div className="server-symbol">
                        <Server size={18} />
                      </div>

                      <div className="server-info">
                        <strong>{server.name}</strong>
                        <small>{server.location}</small>
                      </div>

                      <div className="server-load">
                        <div className="load-track">
                          <div
                            className={`load-fill ${
                              server.cpu > 80
                                ? 'load-warning'
                                : ''
                            }`}
                            style={{
                              width: `${server.cpu}%`,
                            }}
                          />
                        </div>

                        <small>{server.cpu}%</small>
                      </div>

                      <span
                        className={`server-status ${
                          server.status === 'Warning'
                            ? 'warning'
                            : ''
                        }`}
                      >
                        {server.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="panel activity-panel">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">
                      SYSTEM TIMELINE
                    </div>

                    <h2>Recent activity</h2>
                  </div>

                  <button className="more-button">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="activity-list">
                  {activities.map((activity) => {
                    const Icon = activity.icon

                    return (
                      <div
                        className="activity-row"
                        key={activity.title}
                      >
                        <div className="activity-icon">
                          <Icon size={17} />
                        </div>

                        <div className="activity-info">
                          <strong>{activity.title}</strong>

                          <p>{activity.detail}</p>

                          <small>{activity.time}</small>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="footer">
              <span>©️ 2026 HAVEN OPS</span>

              <span>
                DESIGNED FOR INTELLIGENT INFRASTRUCTURE
              </span>

              <span>BUILT WITH CARE ✳</span>
            </footer>

          </div>
        )}

      </main>
    </div>
  )
}

export default App