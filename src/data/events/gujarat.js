import { Crown, Rocket, Users, Award, HeartHandshake, ShieldCheck, Handshake, Mic } from 'lucide-react'

const speakers = [
  {
    image: '/images/speakers/gujrat summit/Anand Desai/image.png',
    name: 'Anand Desai',
    designation: 'Managing Director',
    company: 'Anupam Rasayan India Ltd',
    bio: '',
  },
  {
    image: '/images/speakers/gujrat summit/Dundurapu Ram/image.png',
    name: 'Dundurapu Ram Reddy',
    designation: 'Managing Director',
    company: 'Balaji Amines Ltd',
    bio: 'Mr. D. Ram’s three decades of experience in the management sector and his contribution to the rise of Balaji Amines is incomparable. Since 1988, he is hugely responsible for the procurement, marketing and logistics activities of the company. He has taken on a central part in setting up customer and supplier relationships with leading buyers and providers of specialty chemicals, both in the state and also overseas. He has been instrumental in achieving the first of its kind large scale supply contract arrangement with the world’s leading company in specialty chemicals.',
  },
  {
    image: '/images/speakers/gujrat summit/Jaimin Gupta/image.png',
    name: 'Jaimin Gupta',
    designation: 'Managing Director',
    company: 'Aarvee Denims & Exports Ltd',
    bio: 'Jaimin Gupta is a visionary entrepreneur reshaping India’s textile landscape through strategic leadership and innovation. In 2015, he founded Stitched Textiles Limited (Barcelona), transforming it into a nationally recognised brand driven by modern design and bold marketing—marked by collaborations with cricket legend Virender Sehwag and actor Sonu Sood. He further expanded his presence in the industry with the acquisition of Varvee Global Limited in 2024, reinforcing his position as a forward-thinking industry leader.',
  },
  {
    image: '/images/speakers/gujrat summit/Naresh Patel/image.png',
    name: 'Naresh Patel',
    designation: 'Managing Director',
    company: 'Acutaas Chemicals Limited',
    bio: 'Mr. Nareshkumar R. Patel is the Promoter Director designated as Executive Chairman and Managing Director of Ami Organics Limited. He has been associated with the Company since its inception and has extensive experience in the global generic pharma business. As a specialist in Strategic Business Planning, he has hands on experience in corporate leadership, managing multi technology cross functional teams, developing Research & Development strategies and building new model for growth for the company. Mr. Nareshkumar Ramjibhai Patel is the Executive Chairman & Managing Director of Ami Organics Limited. Mr. Nareshkumar R. Patel holds Bachelor of Engineering (Chemicals) from the Gujarat University.',
  },
  {
    image: '/images/speakers/gujrat summit/Samir Desai/image.png',
    name: 'Samir Desai',
    designation: 'HR- Head',
    company: 'Gujarat Alkalies and Chemicals Ltd',
    bio: 'Human Resource Professional with technical background (BE Mech with MBA - HR) offering over 25 years of rich experience in the areas of Core HR Operations at Corporate as well as plant level: Recruitment & Selection, Performance Management, Talent Management, Learning & Development, Employee Engagement, Succession Planning, Planning & Budgeting, Compensation & Benefits, and Employee Grievances. Specialties include Performance Management, Compensation and Benefits, Talent Management, Learning & Development, Employee Engagement, Succession Planning, and Planning & Budgeting.',
  },
  {
    image: '/images/speakers/gujrat summit/Saumya Engineer/image.png',
    name: 'Saumya Engineer',
    designation: 'CEO',
    company: 'Astral Limited',
    bio: 'Saumya Engineer is the Chief Executive Officer for Astral’s Adhesives & Paints Businesses. He holds a Bachelor of Science (BS) in Management from Arizona State University – W.P. Carey School of Business. After completing his education in the US, he joined Astral in 2014. He started his career in business development to understand industry dynamics and has since gained extensive experience analyzing trends and factors influencing the building materials industry. His commitment to building a strong adhesives business foundation has enabled him to establish a leadership position at Astral.',
  },
  {
    image: '/images/speakers/gujrat summit/Shant Mankodi/image.jpg',
    name: 'Shant Mankodi',
    designation: 'HR- Head',
    company: 'Alembic Pharmaceuticals Ltd',
    bio: 'Shant Kumar Mankodi is an HR Head at Alembic Pharmaceuticals, bringing extensive experience in human resources within the manufacturing sector. He possesses a comprehensive understanding of talent management and strategic HR initiatives. His career reflects a strong focus on human resources management, progressing through various roles including General Manager, Deputy General Manager, Assistant General Manager, and Senior Manager – Human Resources. He has contributed significantly to HR operations and talent development programs within the pharmaceutical manufacturing environment.',
  },
  {
    image: '/images/speakers/gujrat summit/Sunita Gami/image.png',
    name: 'Sunita Gami',
    designation: 'HR- Head',
    company: 'Gujarat Fluorochemicals Limited',
    bio: '24+ years of core experience in Strategic HR, Policy Formulation, Talent Management, Organization Development, Talent Acquisition, Succession Planning, Change Management, Performance Management, Learning & Development, and Industrial Relations. Expertise in managing Greenfield and Brownfield projects, Mergers & Acquisitions, and Cultural Transformation. Experienced in managing Corporate and Plant HR functions in MNCs and large Indian conglomerates. Actively involved in developing and promoting Diversity, Capability, and Happiness Frameworks while ensuring 100% statutory compliance and coordination with government authorities.',
  },
];

const awards = [
  { icon: Crown,         title: 'Gujarat Business Leader of the Year',        desc: "Recognizing outstanding leadership in Gujarat's business ecosystem." },
  { icon: Rocket,        title: 'Innovation Excellence Award',                 desc: 'Celebrating innovation and entrepreneurship in Gujarat.' },
  { icon: Users,         title: 'Most Influential HR Leader',                  desc: 'Honoring HR leaders who shape people-first workplaces.' },
  { icon: Award,         title: 'Visionary CEO Award',                         desc: 'Recognizing CEOs driving transformative organizational success.' },
  { icon: HeartHandshake,title: 'CSR & Social Impact Award',                   desc: 'Honoring impactful CSR and social responsibility programs.' },
  { icon: ShieldCheck,   title: 'BFSI Leadership Award',                       desc: 'Recognizing leadership in banking and financial services.' },
]

const about = {
  heading: 'Gujarat Visionaries\nSummit 2026',
  description: "The Gujarat Visionaries Summit 2026 brought together the brightest minds and boldest leaders of Gujarat's thriving business ecosystem for a day of powerful conversations, strategic networking, and prestigious recognition.",
  features: [
    { icon: Handshake, title: 'Elite Networking',        desc: 'Curated connections between Gujarat\'s top business leaders and innovators.' },
    { icon: Mic,       title: 'Visionary Keynotes',      desc: 'Insights from industry veterans shaping Gujarat\'s economic future.' },
    { icon: Award,     title: 'Prestigious Recognition', desc: 'Celebrating excellence across industries at the Gujarat Visionaries Awards.' },
  ],
  stats: [
    { value: '300+',  label: 'Delegates Attended', highlight: true },
    { value: '15+',   label: 'Speakers Featured' },
  ],
  photos: [
    { seed: 'gj-stage',     h: 'h-48' },
    { seed: 'gj-award',     h: 'h-64' },
    { seed: 'gj-network',   h: 'h-64', offset: true },
    { seed: 'gj-panel',     h: 'h-48', offset: true },
  ],
  testimonials: [
    { id: 1, text: "The Gujarat Summit highlighted the immense potential and dynamic growth of the region. A phenomenal event.", by: "Anand Desai", role: "Keynote Speaker", img: "/images/speakers/gujrat summit/Anand Desai/image.png" },
    { id: 2, text: "An excellent platform for forging connections that drive real business outcomes. Highly recommended.", by: "Dundurapu Ram Reddy", role: "Speaker", img: "/images/speakers/gujrat summit/Dundurapu Ram/image.png" },
    { id: 3, text: "The curated sessions provided deep insights into the evolving market landscape. Brilliant organization.", by: "Jaimin Gupta", role: "Featured Speaker", img: "/images/speakers/gujrat summit/Jaimin Gupta/image.png" },
    { id: 4, text: "It was a privilege to share my journey with such a distinguished audience. The networking was exceptional.", by: "Naresh Patel", role: "Panelist", img: "/images/speakers/gujrat summit/Naresh Patel/image.png" },
    { id: 5, text: "TimesAspire consistently delivers top-tier events. The Gujarat Summit was no exception.", by: "Samir Desai", role: "Speaker", img: "/images/speakers/gujrat summit/Samir Desai/image.png" },
    { id: 6, text: "The energy and enthusiasm at the summit were contagious. A true celebration of leadership and innovation.", by: "Saumya Engineer", role: "Guest Speaker", img: "/images/speakers/gujrat summit/Saumya Engineer/image.png" },
    { id: 7, text: "A highly productive summit that offered unparalleled access to industry leaders and policymakers.", by: "Shant Mankodi", role: "Keynote Speaker", img: "/images/speakers/gujrat summit/Shant Mankodi/image.jpg" },
    { id: 8, text: "The level of discourse and the caliber of attendees made this an incredibly valuable experience.", by: "Sunita Gami", role: "Featured Speaker", img: "/images/speakers/gujrat summit/Sunita Gami/image.png" },
  ],
}

export const gujaratEvent = {
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
  speakers,
  awards,
  about,
  heroTitle: { top: 'Gujarat', highlight: 'Visionaries', bottom: 'Summit 2026' },
  heroPhotos: null,
  videoUrl: null,
}
