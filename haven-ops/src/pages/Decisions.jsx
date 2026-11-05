import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit,
  Activity,
  Zap,
  Server,
  Clock3,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  CircleCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Gauge,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

const forecastData = [
  { time: '08:00', actual: 1200, forecast: 1300 },
  { time: '09:00', actual: 1800, forecast: 1700 },
  { time: '10:00', actual: 1500, forecast: 1650 },
  { time: '11:00', actual: 2400, forecast: 2250 },
  { time: '12:00', actual: 2100, forecast: 2300 },
  { time: '13:00', actual: 2900, forecast: 2750 },
  { time: '14:00', actual: 2500, forecast: 2800 },
  { time: '15:00', actual: 3400, forecast: 3250 },
  { time: '16:00', actual: null, forecast: 3700 },
  { time: '17:00', actual: null, forecast: 3900 },
  { time: '18:00', actual: null, forecast: 3500 },
]

const initialDecisions = [
  {
    id: 1,
    action: 'Launch replica',
    target: 'Replica-07',
    reason: 'Projected workload exceeds available capacity.',
    time: '10:42:00',
    type: 'launch',
    status: 'Completed',
  },
  {
    id: 2,
    action: 'Keep capacity',
    target: 'Current cluster',
    reason: 'Available capacity is sufficient for the observed workload.',
    time: '10:41:30',
    type: 'keep',
    status: 'Completed',
  },
  {
    id: 3,
    action: 'Repair replica',
    target: 'Replica-04',
    reason: 'Replica health requires recovery attention.',
    time: '10:41:00',
    type: 'repair',
    status: 'Completed',
  },
  {
    id: 4,
    action: 'Keep capacity',
    target: 'Current cluster',
    reason: 'No scaling change is currently required.',
    time: '10:40:30',
    type: 'keep',
    status: 'Completed',
  },
]

const initialSignals = [
  { name: 'Incoming request rate', value: '3,400 req/s', level: 'Elevated', type: 'warning' },
  { name: 'Queue length', value: '124 requests', level: 'Moderate', type: 'neutral' },
  { name: 'Average CPU usage', value: '64%', level: 'Normal', type: 'good' },
  { name: 'Available replicas', value: '02 units', level: 'Available', type: 'good' },
]

function actionIcon(type) {
  if (type === 'launch') return <TrendingUp size={17} />
  if (type === 'retire') return <TrendingDown size={17} />
  if (type === 'repair') return <RefreshCw size={17} />
  return <Minus size={17} />
}

export default function Decisions() {
  const [decisions, setDecisions] = useState(initialDecisions)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(1)
  const [controllerRunning, setControllerRunning] = useState(true)
  const [notice, setNotice] = useState('')

  const selectedDecision = decisions.find(d => d.id === selected)

  const filteredDecisions = decisions.filter(d =>
    filter === 'All' || d.type === filter.toLowerCase()
  )

  function simulateDecision(type) {
    if (!controllerRunning) {
      setNotice('Controller is paused. Resume monitoring before testing a decision.')
      return
    }

    const labels = {
      launch: 'Launch replica',
      keep: 'Keep capacity',
      retire: 'Retire replica',
      repair: 'Repair replica',
    }

    const reasons = {
      launch: 'Demo action: additional capacity requested for a projected workload increase.',
      keep: 'Demo action: existing capacity retained to avoid unnecessary infrastructure costs.',
      retire: 'Demo action: excess capacity retirement requested.',
      repair: 'Demo action: recovery action requested for an unhealthy replica.',
    }

    const newDecision = {
      id: Date.now(),
      action: labels[type],
      target: type === 'keep' ? 'Current cluster' : 'Demo target',
      reason: reasons[type],
      time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      type,
      status: 'Simulated',
    }

    setDecisions(prev => [newDecision, ...prev])
    setSelected(newDecision.id)
    setFilter('All')
    setNotice(`${labels[type]} decision added to the demo timeline.`)
  }

  return (
    <div className="decision-container">

      <section className="decision-hero">
        <div>
          <div className="eyebrow"><span /> INTELLIGENT OPERATIONS</div>
          <h1>Think ahead.<br /><em>Scale smarter.</em></h1>
          <p>
            Understand workload signals, inspect controller decisions,
            and explore how intelligent capacity management works.
          </p>
        </div>

        <div className="decision-hero-right">
          <div className="ai-orb">
            <BrainCircuit size={39} />
            <span />
          </div>
          <div className="ai-orb-caption">
            <strong>HAVEN INTELLIGENCE</strong>
            <small>Controller interface</small>
          </div>
        </div>
      </section>

      {notice && (
        <div className="decision-notice">
          <CircleCheck size={16} />
          {notice}
          <button onClick={() => setNotice('')}>×</button>
        </div>
      )}

      <section className="controller-banner">
        <div className="controller-left">
          <div className="controller-icon"><BrainCircuit size={23} /></div>
          <div>
            <strong>Autonomous controller</strong>
            <p>Decision monitoring and infrastructure policy</p>
          </div>
        </div>

        <div className="controller-right">
          <span className={`controller-state ${controllerRunning ? '' : 'paused'}`}>
            <i /> {controllerRunning ? 'MONITORING' : 'PAUSED'}
          </span>
          <button
            className="controller-toggle"
            onClick={() => setControllerRunning(prev => !prev)}
          >
            {controllerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </section>

      <section className="decision-stats">
        <div className="decision-stat">
          <div className="decision-stat-icon"><Activity size={18} /></div>
          <span>Decision interval</span>
          <strong>30 <small>sec</small></strong>
          <p>Configured control cycle</p>
        </div>

        <div className="decision-stat">
          <div className="decision-stat-icon"><Zap size={18} /></div>
          <span>Recorded decisions</span>
          <strong>{decisions.length.toString().padStart(2, '0')}</strong>
          <p>In this demo session</p>
        </div>

        <div className="decision-stat">
          <div className="decision-stat-icon"><Server size={18} /></div>
          <span>Current capacity</span>
          <strong>08 <small>units</small></strong>
          <p>Illustrative cluster value</p>
        </div>

        <div className="decision-stat">
          <div className="decision-stat-icon"><ShieldCheck size={18} /></div>
          <span>Controller mode</span>
          <strong className="mode-value">Adaptive</strong>
          <p>Illustrative policy setting</p>
        </div>
      </section>

      <section className="decision-analysis-grid">

        <div className="panel forecast-panel">
          <div className="panel-heading">
            <div>
              <div className="section-kicker">WORKLOAD INTELLIGENCE</div>
              <h2>Traffic prediction</h2>
              <p>Illustrative observed and forecast request trends</p>
            </div>
            <span className="forecast-badge">FORECAST</span>
          </div>

          <div className="forecast-highlight">
            <div>
              <span>Projected peak traffic</span>
              <strong>3,900 <small>req/s</small></strong>
            </div>
            <div className="forecast-growth">
              <ArrowUpRight size={16} /> +14.7%
            </div>
          </div>

          <div className="forecast-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8e9a7e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8e9a7e" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c0a982" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#c0a982" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eae5da" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#989084', fontSize: 10 }} />
                <YAxis hide domain={[0, 4500]} />
                <Tooltip
                  contentStyle={{
                    background: '#51443a',
                    border: 'none',
                    borderRadius: 9,
                    color: '#fff',
                    fontSize: 11,
                  }}
                />
                <ReferenceLine x="16:00" stroke="#bba477" strokeDasharray="4 4" />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#839176"
                  strokeWidth={2.5}
                  fill="url(#actualGradient)"
                  connectNulls={false}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#b79b70"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  fill="url(#forecastGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="forecast-legend">
            <span><i className="actual-dot" /> Observed traffic</span>
            <span><i className="predicted-dot" /> Forecast traffic</span>
          </div>
        </div>

        <div className="panel signals-panel">
          <div className="panel-heading">
            <div>
              <div className="section-kicker">DECISION INPUTS</div>
              <h2>Live signals</h2>
              <p>Illustrative controller observations</p>
            </div>
            <Activity size={18} color="#93846c" />
          </div>

          <div className="signals-list">
            {initialSignals.map(signal => (
              <div className="signal-row" key={signal.name}>
                <div className="signal-info">
                  <span>{signal.name}</span>
                  <strong>{signal.value}</strong>
                </div>
                <span className={`signal-status ${signal.type}`}>
                  {signal.level}
                </span>
              </div>
            ))}
          </div>

          <div className="signal-footnote">
            <ShieldCheck size={16} />
            <span>Decisions should use only observations available at the current control step.</span>
          </div>
        </div>
      </section>

      <section className="panel recommendation-panel">
        <div className="panel-heading">
          <div>
            <div className="section-kicker">CONTROLLER EXPLORER</div>
            <h2>Test a decision</h2>
            <p>Explore the four permitted controller action categories.</p>
          </div>
          <Sparkles size={19} color="#b69a65" />
        </div>

        <div className="recommendation-grid">
          <button className="recommendation-card" onClick={() => simulateDecision('launch')}>
            <div className="recommendation-icon launch-icon"><TrendingUp size={20} /></div>
            <strong>Launch replica</strong>
            <p>Explore adding capacity when workload pressure increases.</p>
            <span>Test action <ArrowUpRight size={14} /></span>
          </button>

          <button className="recommendation-card" onClick={() => simulateDecision('keep')}>
            <div className="recommendation-icon keep-icon"><Minus size={20} /></div>
            <strong>Keep capacity</strong>
            <p>Explore retaining the existing cluster when capacity is sufficient.</p>
            <span>Test action <ArrowUpRight size={14} /></span>
          </button>

          <button className="recommendation-card" onClick={() => simulateDecision('retire')}>
            <div className="recommendation-icon retire-icon"><TrendingDown size={20} /></div>
            <strong>Retire replica</strong>
            <p>Explore removing unnecessary spare capacity.</p>
            <span>Test action <ArrowUpRight size={14} /></span>
          </button>

          <button className="recommendation-card" onClick={() => simulateDecision('repair')}>
            <div className="recommendation-icon repair-icon"><RefreshCw size={20} /></div>
            <strong>Attempt repair</strong>
            <p>Explore a recovery request when a replica needs attention.</p>
            <span>Test action <ArrowUpRight size={14} /></span>
          </button>
        </div>
      </section>

      <section className="decision-history-grid">

        <div className="panel history-panel">
          <div className="panel-heading">
            <div>
              <div className="section-kicker">DECISION HISTORY</div>
              <h2>Controller timeline</h2>
            </div>
            <span className="history-count">{decisions.length} EVENTS</span>
          </div>

          <div className="history-filters">
            {['All', 'Launch', 'Keep', 'Retire', 'Repair'].map(item => (
              <button
                key={item}
                className={filter === item ? 'history-filter-active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="history-list">
            <AnimatePresence>
              {filteredDecisions.map((decision, index) => (
                <motion.button
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  key={decision.id}
                  className={`history-row ${selected === decision.id ? 'history-selected' : ''}`}
                  onClick={() => setSelected(decision.id)}
                >
                  <div className={`history-action-icon ${decision.type}`}>
                    {actionIcon(decision.type)}
                  </div>
                  <div className="history-info">
                    <strong>{decision.action}</strong>
                    <p>{decision.target}</p>
                  </div>
                  <div className="history-time">
                    <span>{decision.time}</span>
                    <small>{decision.status}</small>
                  </div>
                  <ChevronRight size={15} />
                </motion.button>
              ))}
            </AnimatePresence>
            {filteredDecisions.length === 0 && (
              <div className="history-empty">No decisions in this category yet.</div>
            )}
          </div>
        </div>

        <div className="panel explanation-panel">
          <div className="section-kicker">DECISION EXPLANATION</div>
          <h2>Inside the decision.</h2>
          {selectedDecision ? (
            <>
              <div className={`explanation-action ${selectedDecision.type}`}>
                {actionIcon(selectedDecision.type)}
                <span>{selectedDecision.action}</span>
              </div>

              <div className="explanation-detail">
                <span>Target</span>
                <strong>{selectedDecision.target}</strong>
              </div>

              <div className="explanation-detail">
                <span>Recorded at</span>
                <strong>{selectedDecision.time}</strong>
              </div>

              <div className="explanation-reason">
                <div><BrainCircuit size={17} /> Reasoning summary</div>
                <p>{selectedDecision.reason}</p>
              </div>

              <div className="explanation-status">
                <CircleCheck size={16} />
                {selectedDecision.status}
              </div>
            </>
          ) : (
            <p className="history-empty">Select a decision to inspect its explanation.</p>
          )}
        </div>
      </section>

      <div className="decision-disclaimer">
        <AlertTriangle size={15} />
        <span>Demo interface only. Forecasts, decisions and events are illustrative and are not generated by your actual Python controller.</span>
      </div>

    </div>
  )
}