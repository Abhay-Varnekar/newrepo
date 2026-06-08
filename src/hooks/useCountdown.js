import { useState, useEffect } from 'react'

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' })

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' })
        return
      }
      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        secs: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}