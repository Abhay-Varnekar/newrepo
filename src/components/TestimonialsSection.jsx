import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const SQRT_5000 = Math.sqrt(5000)

const TESTIMONIALS = [
  {
    id: 1,
    text: "Speaking at this summit was an incredible experience. The quality of attendees and the depth of conversations were truly unmatched in the industry.",
    by: "Aditya Thontakudi",
    role: "Keynote Speaker",
    img: "/images/speakers/national leadership summit/Aditya Thontakudi/image.png",
  },
  {
    id: 2,
    text: "The organization of the event was flawless. It provided an excellent platform to share insights and connect with visionary leaders from across the country.",
    by: "Arfeen Khan",
    role: "Featured Speaker",
    img: "/images/speakers/national leadership summit/Afreen Khan/image.png",
  },
  {
    id: 3,
    text: "TimesAspire events always bring together the brightest minds. The energy, the networking, and the knowledge sharing were absolutely phenomenal.",
    by: "Amisha Vora",
    role: "Panelist",
    img: "/images/speakers/national leadership summit/Amisha Vora/image.png",
  },
  {
    id: 4,
    text: "I was highly impressed by the curation of topics. The discussions were highly relevant and provided actionable takeaways for every leader in the room.",
    by: "Dr. Brillian S. K.",
    role: "Keynote Speaker",
    img: "/images/speakers/maharashtra summit/Brillian S. K/image.png",
  },
  {
    id: 5,
    text: "A truly premium experience. From the stage setup to the audience engagement, everything was executed with the utmost professionalism.",
    by: "Deepal Shah",
    role: "Featured Speaker",
    img: "/images/speakers/maharashtra summit/Deepal Shah/image.png",
  },
  {
    id: 6,
    text: "It was an absolute honor to share the stage with such distinguished individuals. This summit is a must-attend for anyone serious about growth and impact.",
    by: "Prashant Nagre",
    role: "Guest Speaker",
    img: "/images/speakers/maharashtra summit/Prashant Nagre/image.png",
  },
  {
    id: 7,
    text: "The sheer scale of networking opportunities available here is incredible. I've forged partnerships here that will last a lifetime.",
    by: "Vaibhav Maloo",
    role: "Panelist",
    img: "/images/speakers/maharashtra summit/Vaibhav Maloo/image.png",
  },
  {
    id: 8,
    text: "If you want to understand where the future of the industry is heading, this is the room you need to be in. Exceptionally well curated.",
    by: "Anand Desai",
    role: "Keynote Speaker",
    img: "/images/speakers/gujrat summit/Anand Desai/image.png",
  },
  {
    id: 9,
    text: "I loved the dynamic format of the sessions. It wasn't just lectures, it was a true exchange of ideas among peers and innovators.",
    by: "Jaimin Gupta",
    role: "Featured Speaker",
    img: "/images/speakers/gujrat summit/Jaimin Gupta/image.png",
  },
  {
    id: 10,
    text: "Being recognized and having the opportunity to address such an elite gathering was a highlight of the year. Kudos to the entire organizing team.",
    by: "Saumya Engineer",
    role: "Guest Speaker",
    img: "/images/speakers/gujrat summit/Saumya Engineer/image.png",
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

export default function TestimonialsSection({ testimonials = TESTIMONIALS }) {
  const [cardSize, setCardSize] = useState(320)
  const [list, setList] = useState(testimonials)

  useEffect(() => {
    setList(testimonials)
  }, [testimonials])

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
    <section id="testimonials" className="relative py-20 lg:py-28 bg-white overflow-hidden">
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