/**
 * PastEventVideoSection
 *
 * Renders a centred video player between the hero grid and the Speakers section.
 * Only shown when `videoUrl` is a non-empty string.
 *
 * Accepts any URL that a <video> element can handle:
 *   - Local file:  '/videos/nls-highlights.mp4'
 *   - CDN/hosted:  'https://example.com/video.mp4'
 *
 * For YouTube embeds, use an <iframe> instead — contact the developer.
 */
import { useEffect, useRef } from 'react'

export default function PastEventVideoSection({ videoUrl }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Browsers block unmuted autoplay, so we use .catch to prevent console errors
            videoRef.current.play().catch(() => {})
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 } // Play when at least 50% is visible
    )

    observer.observe(videoRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])
  if (!videoUrl) return null

  return (
    <section id="video" className="bg-warm-50 py-14 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Optional label */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="w-8 h-px bg-gb-500" />
          <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">
            Event Highlights
          </span>
          <div className="w-8 h-px bg-gb-500" />
        </div>

        {/* Video player */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-neutral-300/60 border border-neutral-200/60">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            muted
            loop
            className="w-full block bg-black"
            style={{ aspectRatio: '16/9' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  )
}
