import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server,
  Cpu,
  MemoryStick,
  Activity,
  Plus,
  Wrench,
  CircleCheck,
  AlertTriangle,
  Clock3,
  ArrowUpRight,
  MoreHorizontal,
  RefreshCw,
  Zap,
  X,
} from 'lucide-react'

const initialServers = [
  { id: 1, name: 'Replica-01', region: 'Asia South', cpu: 42, memory: 58, status: 'Healthy', uptime: '12h 42m' },
  { id: 2, name: 'Replica-02', region: 'Asia South', cpu: 68, memory: 72, status: 'Healthy', uptime: '08h 21m' },
  { id: 3, name: 'Replica-03', region: 'Asia East', cpu: 31, memory: 45, status: 'Healthy', uptime: '06h 15m' },
  { id: 4, name: 'Replica-04', region: 'Asia East', cpu: 84, memory: 88, status: 'Warning', uptime: '03h 08m' },
  { id: 5, name: 'Replica-05', region: 'Asia South', cpu: 51, memory: 62, status: 'Healthy', uptime: '05h 33m' },
  { id: 6, name: 'Replica-06', region: 'Asia West', cpu: 23, memory: 38, status: 'Healthy', uptime: '09h 47m' },
]

export default function Infrastructure() {
  const [servers, setServers] = useState(initialServers)
  const [filter, setFilter] = useState('All')
  const [logs, setLogs] = useState([
    { title: 'All server health checks passed', time: '2 minutes ago', type: 'success' },
    { title: 'Replica-04 utilization reached 84%', time: '8 minutes ago', type: 'warning' },
    { title: 'Infrastructure monitoring initialized', time: '14 minutes ago', type: 'success' },
  ])
  const [notice, setNotice] = useState('')

  const healthy = servers.filter(s => s.status === 'Healthy').length
  const warnings = servers.filter(s => s.status === 'Warning').length
  const failed = servers.filter(s => s.status === 'Failed').length
  const avgCpu = servers.length
    ? Math.round(servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length)
    : 0

  const visibleServers = servers.filter(s => {
    if (filter === 'All') return true
    return s.status === filter
  })

  function addLog(title, type = 'success') {
    setLogs(prev => [
      { title, time: 'Just now', type },
      ...prev,
    ].slice(0, 5))
  }

  function launchReplica() {
    if (servers.length >= 12) {
      setNotice('Demo limit reached: maximum 12 replicas.')
      return
    }

    const nextId = Math.max(0, ...servers.map(s => s.id)) + 1

    setServers(prev => [
      ...prev,
      {
        id: nextId,
        name: `Replica-${String(nextId).padStart(2, '0')}`,
        region: 'Asia South',
        cpu: 0,
        memory: 0,
        status: 'Starting',
        uptime: 'Starting...',
      },
    ])

    setNotice('Replica launch simulated successfully.')
    addLog(`Replica-${String(nextId).padStart(2, '0')} launch requested`)
  }

  function repairServer(id) {
    setServers(prev => prev.map(server =>
      server.id === id
        ? { ...server, status: 'Healthy', cpu: 35, memory: 48 }
        : server
    ))

    const server = servers.find(s => s.id === id)
    setNotice(`${server.name} repair simulated.`)
    addLog(`${server.name} repair action simulated`)
  }

  function retireReplica(id) {
    if (servers.length <= 1) {
      setNotice('At least one replica must remain in this demo.')
      return
    }

    const server = servers.find(s => s.id === id)
    setServers(prev => prev.filter(s => s.id !== id))
    setNotice(`${server.name} retired in demo mode.`)
    addLog(`${server.name} retirement simulated`, 'warning')
  }

  return (
    <div className="infra-container">

      <section className="infra-heading">
        <div>
          <div className="eyebrow"><span /> CLOUD INFRASTRUCTURE</div>
          <h1>Built to stay <em>resilient.</em></h1>
          <p>Monitor your compute resources, inspect replica health, and understand your available capacity.</p>
        </div>

        <button className="primary-button" onClick={launchReplica}>
          <Plus size={16} /> Launch replica
        </button>
      </section>

      {notice && (
        <div className="infra-notice">
          <CircleCheck size={17} />
          <span>{notice}</span>
          <button onClick={() => setNotice('')}><X size={15} /></button>
        </div>
      )}

      <section className="infra-summary-grid">

        <div className="infra-stat">
          <div className="infra-stat-icon"><Server size={19} /></div>
          <span>Total replicas</span>
          <strong>{servers.length.toString().padStart(2, '0')}</strong>
          <small>Compute instances</small>
        </div>

        <div className="infra-stat">
          <div className="infra-stat-icon green"><CircleCheck size={19} /></div>
          <span>Healthy replicas</span>
          <strong>{healthy.toString().padStart(2, '0')}</strong>
          <small>Operational instances</small>
        </div>

        <div className="infra-stat">
          <div className="infra-stat-icon gold"><AlertTriangle size={19} /></div>
          <span>Warning / failed</span>
          <strong>{warnings + failed}</strong>
          <small>{warnings} warning · {failed} failed</small>
        </div>

        <div className="infra-stat">
          <div className="infra-stat-icon"><Cpu size={19} /></div>
          <span>Average CPU</span>
          <strong>{avgCpu}%</strong>
          <small>Across all replicas</small>
        </div>

      </section>

      <section className="infra-main-grid">

        <div className="panel infra-capacity-panel">
          <div className="panel-heading">
            <div>
              <div className="section-kicker">RESOURCE UTILIZATION</div>
              <h2>Compute distribution</h2>
              <p>Current average resource usage</p>
            </div>
            <span className="infra-demo-tag">DEMO DATA</span>
          </div>

          <div className="resource-row">
            <div className="resource-title">
              <span><Cpu size={17} /> CPU utilization</span>
              <strong>{avgCpu}%</strong>
            </div>
            <div className="resource-track">
              <div className="resource-fill" style={{ width: `${avgCpu}%` }} />
            </div>
            <small>Average processor utilization across replicas</small>
          </div>

          <div className="resource-row">
            <div className="resource-title">
              <span><MemoryStick size={17} /> Memory utilization</span>
              <strong>
                {servers.length
                  ? Math.round(servers.reduce((sum, s) => sum + s.memory, 0) / servers.length)
                  : 0}%
              </strong>
            </div>
            <div className="resource-track">
              <div
                className="resource-fill memory-fill"
                style={{
                  width: `${servers.length
                    ? Math.round(servers.reduce((sum, s) => sum + s.memory, 0) / servers.length)
                    : 0}%`
                }}
              />
            </div>
            <small>Average memory consumption across replicas</small>
          </div>

          <div className="capacity-info">
            <Zap size={17} />
            <span>Monitor resource pressure before adding or retiring capacity.</span>
          </div>
        </div>

        <div className="panel infra-health-panel">
          <div className="panel-heading">
            <div>
              <div className="section-kicker">SERVICE AVAILABILITY</div>
              <h2>Health distribution</h2>
              <p>Replica status breakdown</p>
            </div>
          </div>

          <div className="health-ring-wrap">
            <div
              className="health-ring"
              style={{
                background: `conic-gradient(
                  #8e9a7e 0deg ${servers.length ? healthy / servers.length * 360 : 0}deg,
                  #c4a16f ${servers.length ? healthy / servers.length * 360 : 0}deg ${servers.length ? (healthy + warnings) / servers.length * 360 : 0}deg,
                  #b87c6a ${servers.length ? (healthy + warnings) / servers.length * 360 : 0}deg 360deg
                )`
              }}
            >
              <div className="health-ring-center">
                <strong>{servers.length}</strong>
                <span>REPLICAS</span>
              </div>
            </div>
          </div>

          <div className="health-legend">
            <div><i className="health-dot healthy-dot" /> Healthy <strong>{healthy}</strong></div>
            <div><i className="health-dot warning-dot" /> Warning <strong>{warnings}</strong></div>
            <div><i className="health-dot failed-dot" /> Failed <strong>{failed}</strong></div>
          </div>
        </div>

      </section>

      <section className="panel replica-panel">
        <div className="panel-heading replica-heading">
          <div>
            <div className="section-kicker">COMPUTE MANAGEMENT</div>
            <h2>Active replicas</h2>
            <p>Inspect individual instances and their resource utilization.</p>
          </div>

          <button className="primary-button" onClick={launchReplica}>
            <Plus size={15} /> Add replica
          </button>
        </div>

        <div className="replica-filters">
          {['All', 'Healthy', 'Warning', 'Failed', 'Starting'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={filter === status ? 'filter-active' : ''}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="replica-grid">
          <AnimatePresence>
            {visibleServers.map(server => (
              <motion.div
                layout
                key={server.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="replica-card"
              >
                <div className="replica-card-top">
                  <div className="replica-server-icon"><Server size={19} /></div>
                  <span className={`replica-status status-${server.status.toLowerCase()}`}>
                    <i /> {server.status}
                  </span>
                </div>

                <h3>{server.name}</h3>
                <p className="replica-region">{server.region}</p>

                <div className="replica-resource">
                  <div><span>CPU usage</span><strong>{server.cpu}%</strong></div>
                  <div className="resource-track">
                    <div
                      className={`resource-fill ${server.cpu > 80 ? 'resource-warning' : ''}`}
                      style={{ width: `${server.cpu}%` }}
                    />
                  </div>
                </div>

                <div className="replica-resource">
                  <div><span>Memory</span><strong>{server.memory}%</strong></div>
                  <div className="resource-track">
                    <div
                      className="resource-fill memory-fill"
                      style={{ width: `${server.memory}%` }}
                    />
                  </div>
                </div>

                <div className="replica-uptime">
                  <Clock3 size={13} /> Uptime: {server.uptime}
                </div>

                <div className="replica-actions">
                  {server.status === 'Warning' || server.status === 'Failed' ? (
                    <button onClick={() => repairServer(server.id)}>
                      <Wrench size={14} /> Repair
                    </button>
                  ) : (
                    <button onClick={() => retireReplica(server.id)}>
                      <X size={14} /> Retire
                    </button>
                  )}
                  <span><MoreHorizontal size={17} /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleServers.length === 0 && (
          <div className="empty-replicas">No replicas found in this category.</div>
        )}
      </section>

      <section className="panel infra-activity-panel">
        <div className="panel-heading">
          <div>
            <div className="section-kicker">INFRASTRUCTURE EVENTS</div>
            <h2>Recent operations</h2>
          </div>
          <RefreshCw size={17} color="#928675" />
        </div>

        <div className="infra-log-list">
          {logs.map((log, index) => (
            <div className="infra-log-row" key={`${log.title}-${index}`}>
              <div className={`infra-log-icon ${log.type}`}>
                {log.type === 'success'
                  ? <CircleCheck size={17} />
                  : <AlertTriangle size={17} />}
              </div>
              <strong>{log.title}</strong>
              <span>{log.time}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="infra-disclaimer">
        <Activity size={15} />
        <span>Interactive frontend simulation · Not connected to the Python controller yet.</span>
      </div>

    </div>
  )
}