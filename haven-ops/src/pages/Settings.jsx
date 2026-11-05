import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings2,
  Clock3,
  Server,
  Activity,
  Bell,
  RotateCcw,
  Save,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'

function SettingToggle({ label, description, checked, onChange }) {
  return (
    <div className="setting-toggle-row">
      <div>
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
      <button
        type="button"
        className={`setting-switch ${checked ? 'active' : ''}`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={`Toggle ${label}`}
      >
        <span />
      </button>
    </div>
  )
}

export default function Settings() {
  const defaults = {
    interval: 30,
    minReplicas: 2,
    maxReplicas: 8,
    cpuThreshold: 75,
    queueThreshold: 100,
    autoRepair: true,
    notifications: true,
    demoMode: true,
  }

  const [config, setConfig] = useState(defaults)
  const [saved, setSaved] = useState(false)

  const update = (key, value) => {
    setConfig((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const saveSettings = () => {
    // Demo only: settings are not sent to the Python controller.
    setSaved(true)
  }

  const resetSettings = () => {
    setConfig(defaults)
    setSaved(false)
  }

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <span className="settings-eyebrow">CONTROL PANEL</span>
          <h1>System Settings</h1>
          <p>Configure how HAVEN OPS monitors and manages your service.</p>
        </div>
        <div className="settings-heading-icon">
          <Settings2 size={24} />
        </div>
      </div>

      <div className="settings-demo-note">
        <ShieldCheck size={18} />
        Demo configuration — changes are local to this page and are not connected to the backend.
      </div>

      <div className="settings-layout">
        <div className="settings-main">

          <motion.section className="settings-card" whileHover={{ y: -2 }}>
            <div className="settings-card-heading">
              <span className="settings-card-icon"><Clock3 size={19} /></span>
              <div>
                <h3>Controller behaviour</h3>
                <p>Set how frequently the controller evaluates the service.</p>
              </div>
            </div>

            <div className="setting-field">
              <div className="setting-label-row">
                <label>Decision interval</label>
                <strong>{config.interval} seconds</strong>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={config.interval}
                onChange={(e) => update('interval', Number(e.target.value))}
              />
              <div className="setting-range-labels">
                <span>10 sec</span>
                <span>120 sec</span>
              </div>
              <small>How often the controller checks observations and chooses an action.</small>
            </div>
          </motion.section>

          <motion.section className="settings-card" whileHover={{ y: -2 }}>
            <div className="settings-card-heading">
              <span className="settings-card-icon"><Server size={19} /></span>
              <div>
                <h3>Infrastructure limits</h3>
                <p>Define the permitted replica capacity.</p>
              </div>
            </div>

            <div className="settings-two-fields">
              <div className="setting-field">
                <label htmlFor="min-replicas">Minimum replicas</label>
                <input
                  id="min-replicas"
                  type="number"
                  min="1"
                  max={config.maxReplicas}
                  value={config.minReplicas}
                  onChange={(e) => update('minReplicas', Math.max(1, Math.min(config.maxReplicas, Number(e.target.value))))}
                />
              </div>
              <div className="setting-field">
                <label htmlFor="max-replicas">Maximum replicas</label>
                <input
                  id="max-replicas"
                  type="number"
                  min={config.minReplicas}
                  max="30"
                  value={config.maxReplicas}
                  onChange={(e) => update('maxReplicas', Math.max(config.minReplicas, Math.min(30, Number(e.target.value))))}
                />
              </div>
            </div>
            <small className="settings-helper">The controller should never go below the minimum or above the maximum.</small>
          </motion.section>

          <motion.section className="settings-card" whileHover={{ y: -2 }}>
            <div className="settings-card-heading">
              <span className="settings-card-icon"><Activity size={19} /></span>
              <div>
                <h3>Monitoring thresholds</h3>
                <p>Example thresholds for highlighting service pressure.</p>
              </div>
            </div>

            <div className="setting-field">
              <div className="setting-label-row">
                <label>CPU usage alert</label>
                <strong>{config.cpuThreshold}%</strong>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={config.cpuThreshold}
                onChange={(e) => update('cpuThreshold', Number(e.target.value))}
              />
              <div className="setting-range-labels">
                <span>30%</span>
                <span>95%</span>
              </div>
            </div>

            <div className="setting-field">
              <div className="setting-label-row">
                <label>Queue length alert</label>
                <strong>{config.queueThreshold} requests</strong>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={config.queueThreshold}
                onChange={(e) => update('queueThreshold', Number(e.target.value))}
              />
              <div className="setting-range-labels">
                <span>10</span>
                <span>300</span>
              </div>
            </div>
          </motion.section>

          <motion.section className="settings-card" whileHover={{ y: -2 }}>
            <div className="settings-card-heading">
              <span className="settings-card-icon"><SlidersHorizontal size={19} /></span>
              <div>
                <h3>System preferences</h3>
                <p>Choose which demo features are enabled.</p>
              </div>
            </div>

            <SettingToggle
              label="Automatic repair"
              description="Allow the demo interface to show automatic repair as enabled."
              checked={config.autoRepair}
              onChange={(value) => update('autoRepair', value)}
            />
            <SettingToggle
              label="Notifications"
              description="Enable notification preference in this demo configuration."
              checked={config.notifications}
              onChange={(value) => update('notifications', value)}
            />
            <SettingToggle
              label="Demo mode"
              description="Keep sample data and simulated actions clearly separated from live operations."
              checked={config.demoMode}
              onChange={(value) => update('demoMode', value)}
            />
          </motion.section>

          <div className="settings-actions">
            <button className="settings-reset" onClick={resetSettings}>
              <RotateCcw size={16} /> Reset defaults
            </button>
            <button className="settings-save" onClick={saveSettings}>
              <Save size={16} /> Save settings
            </button>
          </div>

          {saved && (
            <div className="settings-saved-message">
              <ShieldCheck size={17} />
              Demo settings saved in this page's current session.
            </div>
          )}
        </div>

        <aside className="settings-side">
          <div className="settings-summary-card">
            <span className="settings-summary-icon"><Settings2 size={20} /></span>
            <h3>Configuration summary</h3>
            <p>Your current demo configuration</p>
            <div className="settings-summary-row">
              <span>Decision interval</span>
              <strong>{config.interval}s</strong>
            </div>
            <div className="settings-summary-row">
              <span>Replica range</span>
              <strong>{config.minReplicas}–{config.maxReplicas}</strong>
            </div>
            <div className="settings-summary-row">
              <span>CPU alert</span>
              <strong>{config.cpuThreshold}%</strong>
            </div>
            <div className="settings-summary-row">
              <span>Queue alert</span>
              <strong>{config.queueThreshold}</strong>
            </div>
            <div className="settings-summary-status">
              <span className="settings-status-dot" />
              Demo configuration active
            </div>
          </div>

          <div className="settings-tip-card">
            <Bell size={19} />
            <h3>Before connecting the backend</h3>
            <p>
              Confirm the allowed action names, replica limits, observation fields,
              and timing rules in your hackathon problem statement. The Python
              controller should validate settings before applying them.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}