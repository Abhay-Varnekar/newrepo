import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const SQRT_5000 = Math.sqrt(5000)

const TESTIMONIALS = [
  {
    id: 1,
    text: "Winning the CEO of the Year award was a defining moment for our brand. The event quality, the networking, and the post-event visibility were absolutely world-class.",
    by: "Vikram Patel",
    role: "CEO, Sterling Industries",
    img: "https://picsum.photos/seed/tst-ceo1/150/150.jpg",
  },
  {
    id: 2,
    text: "TimesAspire's HR Summit gave us access to CHROs we'd been trying to reach for months. The curated networking format is genuinely different from anything else in India.",
    by: "Nisha Agarwal",
    role: "VP - People, CloudFirst Tech",
    img: "https://picsum.photos/seed/tst-chro2/150/150.jpg",
  },
  {
    id: 3,
    text: "As a startup founder, speaking at TimesAspire opened doors to three major partnerships. Their team's professionalism and attention to detail is remarkable.",
    by: "Rohan Singh",
    role: "Founder, GreenLeaf Solutions",
    img: "https://picsum.photos/seed/tst-fnd3/150/150.jpg",
  },
  {
    id: 4,
    text: "The Education Leadership Awards brought credibility to our institution that no marketing budget could buy. We saw a 40% increase in admissions inquiries post-event.",
    by: "Dr. Meera Joshi",
    role: "Director, BrightPath Academy",
    img: "https://picsum.photos/seed/tst-edu4/150/150.jpg",
  },
  {
    id: 5,
    text: "Sponsoring the Gujarat Summit was the best marketing investment we made last year. The lead quality was exceptional and we closed 12 deals directly from the event.",
    by: "Amit Desai",
    role: "CMO, FinEdge Solutions",
    img: "https://picsum.photos/seed/tst-spn5/150/150.jpg",
  },
  {
    id: 6,
    text: "The roundtable format allowed for genuine conversations with policymakers. I've never experienced that level of access at any other conference in India.",
    by: "Kavitha Nair",
    role: "Policy Advisor, NITI Aayog",
    img: "https://picsum.photos/seed/tst-pol6/150/150.jpg",
  },
  {
    id: 7,
    text: "TimesAspire understands what leaders need. No fluff, no filler — just high-impact sessions with people who've actually built things.",
    by: "Rajiv Mehta",
    role: "MD, NovaTech Industries",
    img: "https://picsum.photos/seed/tst-md7/150/150.jpg",
  },
  {
    id: 8,
    text: "We've participated in 4 TimesAspire events now. Each one gets better. The team genuinely cares about creating value for every attendee.",
    by: "Priyanka Shah",
    role: "CHRO, PeopleFirst Corp",
    img: "https://picsum.photos/seed/tst-chr8/150/150.jpg",
  },
  {
    id: 9,
    text: "The Social Impact Award recognition helped us attract donors and volunteers. TimesAspire doesn't just give awards — they amplify your mission.",
    by: "Suresh Kumar",
    role: "Founder, HopeFoundation",
    img: "https://picsum.photos/seed/tst-ngo9/150/150.jpg",
  },
  {
    id: 10,
    text: "From the venue to the speakers to the after-party — everything was impeccable. TimesAspire sets the standard for business events in India.",
    by: "Ananya Reddy",
    role: "CEO, Elevate Group",
    img: "https://picsum.photos/seed/tst-ceo10/150/150.jpg",
  },
]

function TestimonialCard({ position, testimonial, handleMove, cardSize }) {
  const isCenter = position === 0

  return (
    <div
      onClick={() => handleMove(position)}
      className={`absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out ${
        isCenter
          ? 'z-10 bg-white border-gb-400'
          : 'z-0 bg-white/90 border-neutral-200 hover:border-gb-300'
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -50 : position % 2 ? 12 : -12}px)
          rotate(${isCenter ? 0 : position % 2 ? 2 : -2}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px #d4942a, 0 20px 40px rgba(212,148,42,0.15)'
          : '0px 0px 0px 0px transparent',
      }}
    >
      {/* Decorative line */}
      <span
        className="absolute block origin-top-right rotate-45 bg-gb-200"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      {/* Avatar */}
      <img
        src={testimonial.img}
        alt={testimonial.by}
        className="mb-3 h-12 w-10 bg-neutral-100 object-cover object-top"
        style={{ boxShadow: '3px 3px 0px #faf0e0' }}
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${isCenter ? 'text-gb-500 fill-gb-500' : 'text-neutral-300 fill-neutral-300'}`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className={`text-xs sm:text-sm font-medium leading-relaxed ${
        isCenter ? 'text-neutral-800' : 'text-neutral-500'
      }`}>
        "{testimonial.text}"
      </p>

      {/* Author */}
      <p className={`absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 mt-2 text-xs italic ${
        isCenter ? 'text-gb-700' : 'text-neutral-400'
      }`}>
        — {testimonial.by}, {testimonial.role}
      </p>
    </div>
  )
}

export default function TestimonialsSection() {
  const [cardSize, setCardSize] = useState(320)
  const [list, setList] = useState(TESTIMONIALS)

  const handleMove = (steps) => {
    const newList = [...list]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, id: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, id: Math.random() })
      }
    }
    setList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const sm = window.matchMedia('(min-width: 640px)').matches
      const md = window.matchMedia('(min-width: 768px)').matches
      setCardSize(md ? 365 : sm ? 320 : 270)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <Quote className="w-4 h-4 text-gb-500" />
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Voices From Our <span className="text-gradient-gb">Community</span>
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full bg-warm-50/50" style={{ height: 520 }}>
        {list.map((testimonial, index) => {
          const position =
            list.length % 2
              ? index - (list.length + 1) / 2
              : index - list.length / 2
          return (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          )
        })}
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-center gap-3 -mt-4">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center bg-white border-2 border-neutral-200 text-neutral-500 hover:border-gb-400 hover:bg-gb-50 hover:text-gb-700 rounded-xl transition-all duration-200 shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center bg-white border-2 border-neutral-200 text-neutral-500 hover:border-gb-400 hover:bg-gb-50 hover:text-gb-700 rounded-xl transition-all duration-200 shadow-sm"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}