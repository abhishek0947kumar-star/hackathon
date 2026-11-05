import { useEffect, useState } from 'react'
import { getBackendHealth } from '../api'
import { Activity, Wifi, WifiOff } from 'lucide-react'

export default function BackendStatus() {
  const [status, setStatus] = useState('checking')
  const [lastChecked, setLastChecked] = useState('')

  useEffect(() => {
    let active = true

    async function checkBackend() {
      try {
        const result = await getBackendHealth()

        if (active && result.status === 'ok') {
          setStatus('connected')
          setLastChecked(new Date().toLocaleTimeString())
        } else if (active) {
          setStatus('offline')
        }
      } catch {
        if (active) setStatus('offline')
      }
    }

    checkBackend()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className={`backend-status ${status}`}>
      {status === 'connected' ? (
        <Wifi size={17} />
      ) : status === 'offline' ? (
        <WifiOff size={17} />
      ) : (
        <Activity size={17} />
      )}

      <div>
        <strong>
          {status === 'connected'
            ? 'Python backend connected'
            : status === 'offline'
            ? 'Backend offline'
            : 'Checking backend...'}
        </strong>
        <small>
          {status === 'connected'
            ? `Last checked: ${lastChecked}`
            : status === 'offline'
            ? 'Start the FastAPI server to connect'
            : 'Contacting HAVEN OPS API'}
        </small>
      </div>
    </div>
  )
}