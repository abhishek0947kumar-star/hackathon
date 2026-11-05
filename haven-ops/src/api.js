const API_BASE = 'http://127.0.0.1:8000'

export async function getBackendHealth() {
  const response = await fetch(`${API_BASE}/api/health`)

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`)
  }

  return response.json()
}