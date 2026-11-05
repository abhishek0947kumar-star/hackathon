import { motion } from 'framer-motion'
import {
  Activity,
  Wallet,
  Clock3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download,
  CheckCircle2,
  Server,
  Gauge,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const costData = [
  { day: 'Mon', cost: 42 },
  { day: 'Tue', cost: 48 },
  { day: 'Wed', cost: 39 },
  { day: 'Thu', cost: 55 },
  { day: 'Fri', cost: 51 },
  { day: 'Sat', cost: 34 },
  { day: 'Sun', cost: 45 },
]

const requestData = [
  { time: '09:00', completed: 420, failed: 18 },
  { time: '10:00', completed: 510, failed: 12 },
  { time: '11:00', completed: 610, failed: 21 },
  { time: '12:00', completed: 570, failed: 14 },
  { time: '13:00', completed: 720, failed: 9 },
  { time: '14:00', completed: 680, failed: 11 },
  { time: '15:00', completed: 790, failed: 7 },
]

const distribution = [
  { name: 'Compute', value: 55 },
  { name: 'Storage', value: 25 },
  { name: 'Network', value: 20 },
]

const COLORS = ['#8b7355', '#b6a187', '#d6c8b5']

function MetricCard({ icon: Icon, label, value, note, trend, positive }) {
  return (
    <motion.div
      className="analytics-metric"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="analytics-metric-top">
        <span className="analytics-icon"><Icon size={19} /></span>
        <span className={`analytics-trend ${positive ? 'good' : 'neutral'}`}>
          {trend}
        </span>
      </div>
      <p>{label}</p>
      <h2>{value}</h2>
      <small>{note}</small>
    </motion.div>
  )
}

export default function Analytics() {
  return (
    <div className="analytics-page">
      <div className="analytics-heading">
        <div>
          <span className="analytics-eyebrow">SYSTEM INSIGHTS</span>
          <h1>Performance & Cost</h1>
          <p>Understand service efficiency, infrastructure spending, and reliability.</p>
        </div>
        <button
          className="analytics-export"
          onClick={() => window.print()}
        >
          <Download size={16} /> Export report
        </button>
      </div>

      <div className="analytics-demo-note">
        <Activity size={17} />
        Demo analytics — these figures are sample data, not live simulator results.
      </div>

      <div className="analytics-metrics">
        <MetricCard
          icon={Wallet}
          label="Estimated infrastructure cost"
          value="$314"
          note="Sample total for this week"
          trend="Weekly"
          positive
        />
        <MetricCard
          icon={CheckCircle2}
          label="Requests completed"
          value="4,300"
          note="Sample completed requests"
          trend="+8.4%"
          positive
        />
        <MetricCard
          icon={Clock3}
          label="Average response time"
          value="184 ms"
          note="Sample average latency"
          trend="Stable"
          positive
        />
        <MetricCard
          icon={AlertTriangle}
          label="Failed requests"
          value="92"
          note="Sample failed requests"
          trend="2.1%"
          positive={false}
        />
      </div>

      <div className="analytics-chart-grid">
        <section className="analytics-panel analytics-wide">
          <div className="analytics-panel-heading">
            <div>
              <h3>Infrastructure spending</h3>
              <p>Estimated daily cost · sample USD</p>
            </div>
            <span className="analytics-tag">Last 7 days</span>
          </div>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData}>
                <defs>
                  <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b7355" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#8b7355" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9e1d7" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#8b7355"
                  strokeWidth={2.5}
                  fill="url(#costFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Cost distribution</h3>
              <p>Sample spending by resource</p>
            </div>
          </div>
          <div className="analytics-donut">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="analytics-legend">
            {distribution.map((item, index) => (
              <div key={item.name}>
                <span>
                  <i style={{ background: COLORS[index] }} />
                  {item.name}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-panel analytics-wide">
          <div className="analytics-panel-heading">
            <div>
              <h3>Request performance</h3>
              <p>Completed and failed requests · sample hourly data</p>
            </div>
            <span className="analytics-tag">Today</span>
          </div>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestData} barGap={5}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9e1d7" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="completed" name="Completed" fill="#8b7355" radius={[5, 5, 0, 0]} />
                <Bar dataKey="failed" name="Failed" fill="#c58d70" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="analytics-chart-legend">
            <span><i className="legend-completed" /> Completed</span>
            <span><i className="legend-failed" /> Failed</span>
          </div>
        </section>

        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Reliability snapshot</h3>
              <p>Illustrative service indicators</p>
            </div>
            <Gauge size={20} />
          </div>
          <div className="analytics-reliability">
            <div className="reliability-score">
              <strong>98.2%</strong>
              <span>Sample availability</span>
            </div>
            <div className="reliability-row">
              <span><Server size={15} /> Healthy replicas</span>
              <strong>4 / 5</strong>
            </div>
            <div className="reliability-row">
              <span><Clock3 size={15} /> Recovery time</span>
              <strong>42 sec</strong>
            </div>
            <div className="reliability-row">
              <span><AlertTriangle size={15} /> Lost work events</span>
              <strong>3</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="analytics-insight">
        <div className="analytics-insight-icon"><TrendingUp size={21} /></div>
        <div>
          <h3>What this page helps you monitor</h3>
          <p>
            Compare infrastructure cost with completed work, watch request failures,
            and track recovery indicators. Once connected to your simulator, replace
            these sample values with measured observations and controller results.
          </p>
        </div>
      </section>
    </div>
  )
}