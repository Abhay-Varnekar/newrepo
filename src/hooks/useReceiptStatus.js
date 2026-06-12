/**
 * useReceiptStatus — polls /api/receipt/:receiptId/status every 2 s.
 * Stops automatically once { ready: true } is received.
 * Returns { ready, downloadUrl, error }.
 */
import { useState, useEffect, useRef } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export function useReceiptStatus(receiptId) {
  const [state, setState] = useState({ ready: false, downloadUrl: null, error: null })
  const timerRef = useRef(null)

  useEffect(() => {
    if (!receiptId) return

    let cancelled = false

    async function poll() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/receipt/${receiptId}/status`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled && data.ready) {
          setState({ ready: true, downloadUrl: data.downloadUrl, error: null })
          clearInterval(timerRef.current)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[useReceiptStatus] poll error:', err.message)
        }
      }
    }

    poll() // immediate first check
    timerRef.current = setInterval(poll, 2000)

    return () => {
      cancelled = true
      clearInterval(timerRef.current)
    }
  }, [receiptId])

  return state
}
