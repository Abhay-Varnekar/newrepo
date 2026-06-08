import { useEffect, useRef } from 'react'

export default function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = ref.current?.querySelectorAll(
      '.event-card, .speaker-card'
    )
    elements?.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(25px)'
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}