import React from 'react'
import { Calendar, MapPin } from 'lucide-react'

// ---------------------------------------------------------------------------
// Gold palette
// ---------------------------------------------------------------------------
const GOLD     = '#c9a84c'
const GOLD_15  = 'rgba(201,168,76,0.15)'
const GOLD_35  = 'rgba(201,168,76,0.35)'
const GOLD_55  = 'rgba(201,168,76,0.55)'
const GOLD_75  = 'rgba(201,168,76,0.75)'

// ---------------------------------------------------------------------------
// Placeholder seeds (12 per event — replace with heroPhotos in pastEvents.js)
// ---------------------------------------------------------------------------
const PLACEHOLDER_SEEDS = {
  'gujarat-visionaries-summit-2026': [
    'gj1','gj2','gj3','gj4','gj5','gj6','gj7','gj8','gj9','gj10','gj11','gj12',
  ],
  'national-leadership-summit-2026': [
    'nl1','nl2','nl3','nl4','nl5','nl6','nl7','nl8','nl9','nl10','nl11','nl12',
  ],
  'maharashtra-visionaries-summit-2025': [
    'mh1','mh2','mh3','mh4','mh5','mh6','mh7','mh8','mh9','mh10','mh11','mh12',
  ],
}

function getPhotos(event) {
  if (event.heroPhotos && event.heroPhotos.length >= 12) return event.heroPhotos
  const seeds = PLACEHOLDER_SEEDS[event.slug]
    || Array.from({ length: 12 }, (_, i) => `ev${i + 1}`)
  return seeds.map((s) => `https://picsum.photos/seed/${s}/500/700.jpg`)
}

// ---------------------------------------------------------------------------
// Photo cell — greyscale → colour on hover
// ---------------------------------------------------------------------------
function PhotoCell({ src, col, row }) {
  return (
    <div
      className="overflow-hidden group"
      style={{ gridColumn: col, gridRow: row }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-[1.05] group-hover:scale-100"
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Compact centre card
// ---------------------------------------------------------------------------
function CentreCard({ event, heroTitle }) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-[#0e0c08]"
      style={{
        gridColumn: 3,
        gridRow: '1 / span 3',
        borderLeft:  `1px solid ${GOLD_15}`,
        borderRight: `1px solid ${GOLD_15}`,
      }}
    >
      <div className="text-center px-6 w-full max-w-[240px]">

        {/* ── Exclusive Coverage ── */}
        <div className="flex items-center gap-1.5 mb-5">
          <div className="flex-1 h-px" style={{ background: GOLD_35 }} />
          <span className="text-[7px] tracking-[0.3em] uppercase font-semibold whitespace-nowrap"
                style={{ color: GOLD_75 }}>
            Exclusive Coverage
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD_35 }} />
        </div>

        {/* ── Title ── */}
        <div className="mb-5 leading-snug">
          {heroTitle.top && (
            <div className="text-xl font-bold text-white">{heroTitle.top}</div>
          )}
          {heroTitle.highlight && (
            <div className="text-2xl font-bold italic" style={{ color: GOLD, fontFamily: 'Georgia, serif' }}>
              {heroTitle.highlight}
            </div>
          )}
          {heroTitle.bottom && (
            <div className="text-xl font-bold text-white">{heroTitle.bottom}</div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="w-full mb-4" style={{ height: '1px', background: GOLD_15 }} />

        {/* ── Date & Venue (single compact block) ── */}
        <div className="flex flex-col items-center gap-1.5 mb-5">
          <span className="flex items-center gap-1 text-[10px]" style={{ color: GOLD_55 }}>
            <Calendar className="w-2.5 h-2.5 flex-shrink-0" />
            {event.day} {event.month} {event.year}
          </span>
          <span className="text-[8px]" style={{ color: GOLD_15 }}>•</span>
          <span className="flex items-start gap-1 text-[10px] text-center" style={{ color: GOLD_55 }}>
            <MapPin className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" />
            {event.desc}
          </span>
        </div>

        {/* ── Live Highlights badge ── */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5"
             style={{ border: `1px solid ${GOLD_35}` }}>
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: GOLD }} />
          <span className="text-[7px] tracking-[0.28em] uppercase font-semibold"
                style={{ color: GOLD_55 }}>
            Live Highlights Await
          </span>
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: GOLD }} />
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PastEventHero
// ---------------------------------------------------------------------------
export default function PastEventHero({ event }) {
  const photos = getPhotos(event)

  const heroTitle = event.heroTitle ?? {
    top:       event.title.split(' ')[0],
    highlight: event.title.split(' ')[1] ?? '',
    bottom:    event.title.split(' ').slice(2).join(' '),
  }

  /**
   * Photo grid layout (col, row) — 4 photo columns × 3 rows = 12 equal cells
   * Col 3 is reserved for the centre card.
   *
   * [ P0  P1  CARD  P2  P3  ]  row 1
   * [ P4  P5  CARD  P6  P7  ]  row 2
   * [ P8  P9  CARD  P10 P11 ]  row 3
   */
  const PHOTO_POSITIONS = [
    { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 4, row: 1 }, { col: 5, row: 1 },
    { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 4, row: 2 }, { col: 5, row: 2 },
    { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 4, row: 3 }, { col: 5, row: 3 },
  ]

  return (
    <section
      id="featured-event"
      className="w-full overflow-hidden bg-[#0a0906] pt-20"
      style={{ height: '100vh' }}
    >
      {/* ── Mosaic grid — all screen sizes ── */}
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: 'repeat(2, 1fr) clamp(130px, 28vw, 240px) repeat(2, 1fr)',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: '2px',
          background: '#0a0906',
        }}
      >
        {PHOTO_POSITIONS.map((pos, i) => (
          <PhotoCell key={i} src={photos[i]} col={pos.col} row={pos.row} />
        ))}

        <CentreCard event={event} heroTitle={heroTitle} />
      </div>

    </section>
  )
}
