/**
 * pastEvents.js — Single source of truth for all past event data.
 *
 * HOW TO FILL IN DATA FOR EACH EVENT:
 * Each event object contains:
 *  - Card/hero fields  (title, image, date, city, etc.)
 *  - speakers[]        → shown in the Speakers section
 *  - awards[]          → shown in the Awards section
 *  - about{}           → shown in the About/Impact section
 *
 * Edit each event's speakers, awards, and about below.
 * The home page is NOT affected — it still uses its own hardcoded data.
 */

import {
  Crown, Building2, Rocket, GraduationCap, HeartHandshake,
  Award, ShieldCheck, Globe, Users, ShoppingBag, Factory,
  HeartPulse, MapPin, Truck, Handshake, Mic,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// PAST EVENT 1 — Gujarat Visionaries Summit 2026
// ---------------------------------------------------------------------------
const gujaratSpeakers = [
  // ✏️ Replace with real Gujarat Summit speakers
  {
    image: 'https://picsum.photos/seed/gj-sp1/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
  {
    image: 'https://picsum.photos/seed/gj-sp2/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
]

const gujaratAwards = [
  // ✏️ Replace with real Gujarat Summit award categories
  { icon: Crown,         title: 'Gujarat Business Leader of the Year',        desc: "Recognizing outstanding leadership in Gujarat's business ecosystem." },
  { icon: Rocket,        title: 'Innovation Excellence Award',                 desc: 'Celebrating innovation and entrepreneurship in Gujarat.' },
  { icon: Users,         title: 'Most Influential HR Leader',                  desc: 'Honoring HR leaders who shape people-first workplaces.' },
  { icon: Award,         title: 'Visionary CEO Award',                         desc: 'Recognizing CEOs driving transformative organizational success.' },
  { icon: HeartHandshake,title: 'CSR & Social Impact Award',                   desc: 'Honoring impactful CSR and social responsibility programs.' },
  { icon: ShieldCheck,   title: 'BFSI Leadership Award',                       desc: 'Recognizing leadership in banking and financial services.' },
]

const gujaratAbout = {
  heading: 'Gujarat Visionaries\nSummit 2026',
  // ✏️ Update this description for the Gujarat Summit
  description: "The Gujarat Visionaries Summit 2026 brought together the brightest minds and boldest leaders of Gujarat's thriving business ecosystem for a day of powerful conversations, strategic networking, and prestigious recognition.",
  features: [
    // ✏️ Replace with 3 key highlights from the Gujarat event
    { icon: Handshake, title: 'Elite Networking',        desc: 'Curated connections between Gujarat\'s top business leaders and innovators.' },
    { icon: Mic,       title: 'Visionary Keynotes',      desc: 'Insights from industry veterans shaping Gujarat\'s economic future.' },
    { icon: Award,     title: 'Prestigious Recognition', desc: 'Celebrating excellence across industries at the Gujarat Visionaries Awards.' },
  ],
  stats: [
    // ✏️ Replace with actual event numbers
    { value: '300+',  label: 'Delegates Attended', highlight: true },
    { value: '28+',   label: 'Award Recipients' },
    { value: '15+',   label: 'Speakers Featured' },
    { value: '98%',   label: 'Satisfaction Rate' },
  ],
  photos: [
    // ✏️ Replace seeds/src with real event photo paths (e.g. '/images/gujarat/photo1.jpg')
    { seed: 'gj-stage',     h: 'h-48' },
    { seed: 'gj-award',     h: 'h-64' },
    { seed: 'gj-network',   h: 'h-64', offset: true },
    { seed: 'gj-panel',     h: 'h-48', offset: true },
  ],
}

// ---------------------------------------------------------------------------
// PAST EVENT 2 — National Leadership Summit 2026
// ---------------------------------------------------------------------------
const nlsSpeakers = [
  // ✏️ Replace with real NLS speakers
  {
    image: 'https://picsum.photos/seed/nls-sp1/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
  {
    image: 'https://picsum.photos/seed/nls-sp2/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
]

const nlsAwards = [
  // ✏️ Replace with real NLS award categories
  { icon: Crown,         title: 'National Leadership Excellence Award',        desc: 'Recognizing India\'s most impactful business leaders.' },
  { icon: Users,         title: 'Most Influential Women Leaders',              desc: 'Celebrating women leaders inspiring change across industries.' },
  { icon: Building2,     title: 'People\'s Choice Companies to Work',          desc: 'Celebrating organizations with exceptional workplace culture.' },
  { icon: Award,         title: 'Business Leader of Excellence',               desc: 'Recognizing outstanding leadership in business growth and strategy.' },
  { icon: GraduationCap, title: 'National HR Excellence Award',                desc: 'Honoring excellence in HR practices and people management.' },
  { icon: Rocket,        title: 'IT & Innovation Excellence',                  desc: 'Celebrating innovation in technology and digital transformation.' },
  { icon: HeartPulse,    title: 'Healthcare / Pharma Excellence Award',        desc: 'Honoring excellence in healthcare and pharmaceutical industries.' },
  { icon: ShieldCheck,   title: 'BFSI Leadership',                             desc: 'Recognizing leadership in banking and financial services.' },
]

const nlsAbout = {
  heading: 'National Leadership\nSummit 2026',
  // ✏️ Update this description for NLS
  description: 'The National Leadership Summit 2026 at the iconic Bombay Stock Exchange brought together over 35 of India\'s foremost business leaders, policymakers, and innovators to chart the course for India\'s next decade of growth.',
  features: [
    // ✏️ Replace with 3 key highlights from NLS
    { icon: Handshake, title: 'High-Impact Networking',    desc: 'BSE\'s International Convention Hall — the perfect arena for deal-making.' },
    { icon: Mic,       title: 'National Stage Dialogues',  desc: 'India\'s top voices on leadership, economy, and the future of work.' },
    { icon: Award,     title: 'Prestigious Recognition',   desc: 'National-level awards recognizing excellence across sectors.' },
  ],
  stats: [
    // ✏️ Replace with actual event numbers
    { value: '500+',  label: 'Delegates Attended', highlight: true },
    { value: '35+',   label: 'Award Recipients' },
    { value: '25+',   label: 'Speakers Featured' },
    { value: '98%',   label: 'Satisfaction Rate' },
  ],
  photos: [
    // ✏️ Replace seeds/src with real event photo paths
    { seed: 'nls-stage',     h: 'h-48' },
    { seed: 'nls-award',     h: 'h-64' },
    { seed: 'nls-network',   h: 'h-64', offset: true },
    { seed: 'nls-panel',     h: 'h-48', offset: true },
  ],
}

// ---------------------------------------------------------------------------
// PAST EVENT 3 — Maharashtra Visionaries Summit & Awards 2025
// ---------------------------------------------------------------------------
const maharashtraSpeakers = [
  // ✏️ Replace with real Maharashtra Summit speakers
  {
    image: 'https://picsum.photos/seed/mh-sp1/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
  {
    image: 'https://picsum.photos/seed/mh-sp2/400/500.jpg',
    name: 'Speaker Name',
    designation: 'Designation',
    company: 'Company Name',
    bio: 'Speaker bio goes here.',
  },
]

const maharashtraAwards = [
  // ✏️ Replace with real Maharashtra Summit award categories
  { icon: Crown,         title: 'Maharashtra Business Visionary Award',        desc: 'Recognizing Maharashtra\'s most visionary business leaders.' },
  { icon: Users,         title: 'Most Influential HR Leader',                  desc: 'Honoring HR leaders who shape people-first workplaces.' },
  { icon: Rocket,        title: 'Startup Innovation Award',                    desc: 'Celebrating innovation and entrepreneurship in Maharashtra.' },
  { icon: Award,         title: 'Most Influential CEO',                        desc: 'Honoring CEOs driving transformative organizational success.' },
  { icon: HeartHandshake, title: 'CSR & Social Impact Award',                  desc: 'Honoring impactful CSR programs.' },
  { icon: GraduationCap, title: 'Education Excellence Award',                  desc: 'Recognizing excellence in education and skill development.' },
  { icon: HeartPulse,    title: 'Healthcare Leadership Award',                 desc: 'Honoring excellence in healthcare leadership.' },
  { icon: Globe,         title: 'Travel & Tourism Excellence Award',           desc: 'Recognizing excellence in travel, hospitality, and tourism.' },
]

const maharashtraAbout = {
  heading: 'Maharashtra Visionaries\nSummit & Awards 2025',
  // ✏️ Update this description for the Maharashtra Summit
  description: 'The Maharashtra Visionaries Summit & Awards 2025 at Radisson Blu, Mumbai International Airport was a landmark gathering celebrating the finest business leaders of Maharashtra, recognizing their extraordinary contributions to industry and society.',
  features: [
    // ✏️ Replace with 3 key highlights from the Maharashtra event
    { icon: Handshake, title: 'Premier Networking',       desc: 'Bringing Maharashtra\'s top executives together for high-value connections.' },
    { icon: Mic,       title: 'Visionary Dialogues',      desc: 'Maharashtra\'s brightest minds sharing insights on growth and leadership.' },
    { icon: Award,     title: 'Gala Recognition Night',   desc: 'A prestigious awards gala celebrating excellence across industries.' },
  ],
  stats: [
    // ✏️ Replace with actual event numbers
    { value: '200+',  label: 'Delegates Attended', highlight: true },
    { value: '15+',   label: 'Award Recipients' },
    { value: '12+',   label: 'Speakers Featured' },
    { value: '98%',   label: 'Satisfaction Rate' },
  ],
  photos: [
    // ✏️ Replace seeds/src with real event photo paths
    { seed: 'mh-stage',     h: 'h-48' },
    { seed: 'mh-award',     h: 'h-64' },
    { seed: 'mh-network',   h: 'h-64', offset: true },
    { seed: 'mh-panel',     h: 'h-48', offset: true },
  ],
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const PAST_EVENTS = [
  {
    slug: 'gujarat-visionaries-summit-2026',
    image: '/images/Summit.49c5f10831d33c125066.png',
    badges: [
      { text: 'New', style: 'bg-gb-500 text-white' },
      { text: 'Conference', style: 'bg-white/90 text-neutral-700 backdrop-blur-sm' },
    ],
    day: '15',
    month: 'May',
    year: '2026',
    city: 'Ahmedabad',
    title: 'Gujarat Visionaries Summit 2026',
    desc: 'Ahmedabad, Gujarat.',
    avatars: ['sp-hr1', 'sp-hr2'],
    extraCount: '+28',
    speakers: gujaratSpeakers,
    awards: gujaratAwards,
    about: gujaratAbout,
    // ✏️ Title split for the hero centre card
    heroTitle: { top: 'Gujarat', highlight: 'Visionaries', bottom: 'Summit 2026' },
    // ✏️ Add 12 real photo paths here when ready, e.g. ['/images/event/1.jpg', ... × 12]
    heroPhotos: null,
    // ✏️ Path or URL to the event highlight video, e.g. '/videos/gujarat-highlights.mp4'
    videoUrl: null,
  },
  {
    slug: 'national-leadership-summit-2026',
    image: '/images/nlp1.a5225fa52103c59d3174.webp',
    badges: [
      { text: 'Annual', style: 'bg-gb-700 text-white' },
      { text: 'Awards', style: 'bg-white/90 text-neutral-700 backdrop-blur-sm' },
    ],
    day: '27',
    month: 'Feb',
    year: '2026',
    city: 'Mumbai',
    title: 'National Leadership Summit 2026',
    desc: 'Bombay Stock Exchange, International Convention Hall, Mumbai.',
    avatars: ['sp-edu1', 'sp-edu2', 'sp-edu3'],
    extraCount: '+35',
    speakers: nlsSpeakers,
    awards: nlsAwards,
    about: nlsAbout,
    // ✏️ Title split for the hero centre card
    heroTitle: { top: 'National', highlight: 'Leadership', bottom: 'Summit 2026' },
    // ✏️ Add 8 real photo paths here when ready, e.g. ['/images/nls/1.jpg', ...]
    heroPhotos: null,
    videoUrl: null,
  },
  {
    slug: 'maharashtra-visionaries-summit-2025',
    image: '/images/869A8469.cd2c007d7222947c5537.JPG',
    badges: [
      { text: 'Gala', style: 'bg-gb-800 text-white' },
    ],
    day: '23',
    month: 'Sep',
    year: '2025',
    city: 'Mumbai',
    title: 'Maharashtra Visionaries Summit & Awards 2025',
    desc: 'Radisson Blu, Mumbai International Airport.',
    avatars: ['sp-ent1'],
    extraCount: '+15',
    speakers: maharashtraSpeakers,
    awards: maharashtraAwards,
    about: maharashtraAbout,
    // ✏️ Title split for the hero centre card
    heroTitle: { top: 'Maharashtra', highlight: 'Visionaries', bottom: 'Summit 2025' },
    // ✏️ Add 12 real photo paths here when ready, e.g. ['/images/event/1.jpg', ... × 12]
    heroPhotos: null,
    // ✏️ Path or URL to the event highlight video, e.g. '/videos/maharashtra-highlights.mp4'
    videoUrl: '/images/event videos/maharashtra summit/video.mp4',
  },
]
