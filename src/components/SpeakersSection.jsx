import {Linkedin, Twitter} from 'lucide-react'

const SPEAKERS = [
    {
        image: '/images/speakers/south india summit/Arup Sarkar/Photo.png',
        name: 'Arup Sarkar',
        designation: 'CFO',
        company: 'Nandhana Group',
        bio: 'An assiduous, aspiring, and dynamic Senior Management Professional offering 29+ years of extensive experience in Financial Management, Cash Flow Management, Auditing, Financial Control, Strategic Planning, Statutory Compliances, SAP/ERP Implementation, Working Capital Management, Costing & Budgeting, and MIS Reporting. Possessing a strong sense of confidence with significant achievements across diverse operational domains, proven expertise in examining and analyzing accounting records, including branch accounting, financial statements, and financial reports to ensure accuracy, completeness, and compliance with reporting standards and procedures. Demonstrated leadership in managing finance and accounting teams while driving adherence to GAAP standards and organizational policies. Skilled in Financial Planning & Analysis, Finance & Accounts Management, Management Reporting, and strategic business planning, with a strong ability to ensure compliance with internal policies, statutory regulations, and legal requirements.'
    },
    {
        image: '/images/speakers/south india summit/Biju Kuriakose/Photo.png',
        name: 'Biju Kuriakose',
        designation: 'CEO',
        company: 'Career and Campus',
        bio: 'For me, education isn’t just about earning degrees; it’s about unlocking possibilities. With the right guidance, a student’s future can take shape in ways they never imagined, and that’s what drives my work every day. As the Managing Director of GATEWAY CAREER AND CAMPUS PVT LTD, I help educational institutions streamline admissions, connect with the right students, and create meaningful opportunities that make a real impact. With dual Bachelor\'s degrees in Sociology and Philosophy from Pune University and Jnana Deepa Vidyapeeth, along with Master\'s degrees in Psychology and Personnel Management (MPM) from Madras and Pune University, I bring a multidisciplinary perspective to career consulting. This diverse foundation enables me to understand the unique challenges institutions face and develop strategies that drive results.'
    },
    {
        image: '/images/speakers/south india summit/Dr Pramod Gupta/Photo.png',
        name: 'Dr Pramod Gupta',
        designation: 'COO',
        company: 'Apollo Hospitals',
        bio: 'Experienced P&L responsibility holder and business operations head with a demonstrated history of working in the hospital and healthcare industry. Skilled in business process reengineering, P&L management, business development, revenue growth, profitability, healthcare management, and leadership. Strong operations professional with an AMPH in Health Care Administration and Management from the Indian School of Business.'
    },
    {
        image: '/images/speakers/south india summit/Dr. Annesly Carvalho/Photo.png',
        name: 'Dr. Annesly Carvalho',
        designation: 'Head – HR',
        company: 'Blackstraw.ai',
        bio: 'Global and local HR leader with 23 years of experience across India, USA, Middle East, Japan, Singapore, and the UK. Expertise spans HR transformation, talent acquisition, organizational development, total rewards, performance management, succession planning, and business scaling. Successfully built and led HR functions through startup, stabilization, restructuring, M&A, and growth phases for organizations valued between $40M and $3.9B. Known for driving large-scale talent growth, learning and development initiatives, and aligning people strategies with business outcomes.'
    }, {
        image: '/images/speakers/south india summit/Karthik M/Photo.png',
        name: 'Karthik M',
        designation: 'Head Sales & Marketing',
        company: 'Concorde.in',
        bio: 'A results-driven sales and marketing leader with over 20 years of experience across India, specializing in enterprise business leadership, revenue growth, and market expansion. Recognized as a turnaround specialist with expertise in sales strategy, marketing, fundraising, valuations, business development, and financial closures across the real estate and infrastructure sectors. Proven track record of driving business growth, strengthening P&L performance, expanding market share, and leading high-performing teams in competitive markets.'
    }, {
        image: '/images/speakers/south india summit/Khuze Siam/Photo.png',
        name: 'Khuze Siam',
        designation: 'CEO',
        company: 'Siam Computing',
        bio: 'Founder and CEO of Siam Computing, a healthcare-focused technology company he started at the age of 23 in Chennai. Over the past decade, he has grown the organization into a 120+ member firm serving healthcare providers, public health bodies, payors, and startups across the GCC, UK, US, and India. With expertise in AI-powered patient engagement, telehealth, healthcare analytics, and digital product development, Khuze is known for helping organizations transform complex healthcare challenges into scalable digital solutions while driving innovation, patient outcomes, and business growth.'
    }, {
        image: '/images/speakers/south india summit/Nelson Thomas/Photo.png',
        name: 'Nelson Thomas',
        designation: 'Head HR - R&D',
        company: 'Vitesco Technologies',
        bio: 'An accomplished HR leader with over 15 years of experience driving organizational performance through strategic human resource management across diverse industries. Expertise spans end-to-end HR operations, organizational development, talent management, learning and development, employee engagement, performance management, and workforce retention. Proven track record of implementing HR best practices, leading transformational initiatives, enhancing organizational effectiveness, and building high-performing, inclusive workplaces aligned with business objectives.'
    }, {
        image: '/images/speakers/south india summit/PrabhatRanjan Singh/Photo.png',
        name: 'Prabhat Ranjan Singh',
        designation: 'Head HR Business Advisor India',
        company: 'Deutsche Bank',
        bio: 'PrabhatRanjan Singh is a seasoned HR leader with extensive experience in strategic human resources, talent acquisition, and business partnering within global organizations. As Head HR Business Advisor India at Deutsche Bank, he provides strategic HR leadership, supports business transformation, and drives talent management initiatives across the organization. With a strong background in HR advisory, workforce planning, and recruitment, he has successfully led talent acquisition and HR business partnering functions, helping align people strategies with business goals. He holds an MBA from Amity University and a B.A. LL.B. from Bangalore University.'
    }, {
        image: '/images/speakers/south india summit/Priya Cherian/Photo.png',
        name: 'Priya Cherian',
        designation: 'Head of HR',
        company: 'Walmart Global Tech',
        bio: 'Priya Cherian is the Head of HR at Walmart Global Tech India, where she leads the people strategy focused on career growth, employee well-being, inclusion, and belonging. She partners with business leaders to build a high-performance culture supported by world-class digital tools and innovative talent practices. Prior to Walmart, she served as a Venture Partner at NextB Ventures, advising early-stage startups on scaling businesses, building strong talent foundations, and creating sustainable organizational cultures. She brings extensive experience in HR leadership, talent strategy, organizational development, and workforce transformation.'
    }, {
        image: '/images/speakers/south india summit/Raghu Dharmaraju/Photo.png',
        name: 'Raghu Dharmaraju',
        designation: 'CEO',
        company: 'ARTPAR',
        bio: 'A visionary entrepreneur and innovation leader with over two decades of experience building institutions, scaling startups, and advancing the intersection of deep technology, societal impact, and public policy. Raghu has helped build and support more than 70 startups, led nationally significant AI, health, climate, and language technology initiatives, and played a key role in shaping India’s digital and data ecosystems. A multiple-time winner of global innovation challenges, he has collaborated with organizations including IISc, ICMR, Google, NITI Aayog, AWS, and the Ministry of Health. Previously, as Co-founder and VP of Products & Programs at Wadhwani AI, he helped establish one of the world’s leading AI-for-social-good organizations, securing nearly $20 million in funding from global institutions and driving transformative solutions in healthcare, climate resilience, and public policy.'
    }, {
        image: '/images/speakers/south india summit/Shikha Agarwal/Photo.png',
        name: 'Shikha Agarwal',
        designation: 'Head of Human Resources',
        company: 'BorgWarner India',
        bio: 'Shikha Agarwal is the Head of Human Resources for BorgWarner India Propulsion Engineering Center (IPEC) in Bengaluru. An experienced HR leader, she drives talent strategy, employee experience, organizational growth, and workforce development initiatives at one of the company’s key engineering and innovation hubs. Her expertise includes talent management, leadership development, employee engagement, and building high-performance cultures that support business growth and technological innovation.'
    }, {
        image: '/images/speakers/south india summit/Soumya Ningappa/Photo.png',
        name: 'Soumya Ningappa',
        designation: 'Head Of Department - CSR',
        company: 'Bangalore International Airport Ltd',
        bio: 'A CSR, ESG, and DE&I leader with over 20 years of experience designing and implementing transformative programs that align business objectives with meaningful community impact. Soumya specializes in building sustainable and inclusive ecosystems focused on empowering children, women, and underrepresented communities while driving measurable social outcomes. She is currently strengthening her expertise through ESG Certification from SGS Academy, with a focus on global frameworks and standards including GRI, SASB, TCFD, SDGs, and SEBI’s BRSR, enabling the development of future-ready and compliant sustainability strategies.'
    },
];

const formatName = (name) => {
    const parts = name.trim().split(' ')

    if (parts.length <= 1) {
        return {firstLine: parts[0], secondLine: ''}
    }

    return {
        firstLine: parts.slice(0, -1).join(' '),
        secondLine: parts[parts.length - 1]
    }
}

export default function SpeakersSection({ speakers: speakersProp } = {}) {
    const speakers = speakersProp || SPEAKERS

    return (
        <section id="speakers" className="relative py-20 lg:py-28 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-px bg-gb-500"/>
                            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Featured Voices</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                            Distinguished  
                            <span className="text-gradient-gb"> Speakers</span>
                        </h2>
                    </div>
                    <a href="#" className="group flex items-center gap-2 text-sm font-medium text-gb-600 hover:text-gb-800 transition-colors">
                        View all speakers
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
                    {speakers.map((speaker) => (
                        <div key={
                                speaker.name
                            }
                            className="group relative rectangle-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                            style={
                                {aspectRatio: '3/4'}
                        }>
                            {/* Photo */}
                            <img src={
                                    speaker.image
                                }
                                alt={
                                    speaker.name
                                }
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"/> {/* Default gradient (bottom info) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0"/> {/* Name overlay - default state */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 group-hover:opacity-0">
                                {
                                (() => {
                                    const {firstLine, secondLine} = formatName(speaker.name)

                                    return (
                                        <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                            {firstLine}
                                            {
                                            secondLine && (
                                                <>
                                                    <br/> {secondLine} </>
                                            )
                                        } </h4>
                                    )
                                })()
                            }

                                <p className="text-[15px] text-gb-300 font-medium mt-0.5">
                                    {
                                    speaker.designation
                                } </p>
                                <p className="text-[12px] text-white mt-0.5">
                                    {
                                    speaker.company
                                } </p>
                            </div>

                            {/* Hover overlay with bio */}
                            <div className="absolute inset-0 bg-[#2a2015]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                                {/* Social icons top right */}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <a href="#" className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-gb-500 transition-all duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <Linkedin className="w-3.5 h-3.5 text-white"/>
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-gb-500 transition-all duration-300 translate-y-2 group-hover:translate-y-0 transition-transform delay-75">
                                        <Twitter className="w-3.5 h-3.5 text-white"/>
                                    </a>
                                </div>

                                {/* Bio content bottom */}
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h4 className="text-2xl font-bold text-white leading-tight">
                                        {
                                        speaker.name
                                    }</h4>
                                    <p className="text-[13px] text-gb-300 font-medium mt-0.5">
                                        {
                                        speaker.designation
                                    }</p>
                                    <p className="text-[12px] text-white mt-0.5">
                                        {
                                        speaker.company
                                    }</p>
                                    <div className="w-6 h-px bg-gb-500/50 my-3"/>
                                    <p className="text-xs text-white/70 leading-relaxed line-clamp-4">
                                        {
                                        speaker.bio
                                    }</p>
                                </div>
                            </div>
                        </div>
                    ))
                } </div>

                {/* Hint */}
                <p className="text-center text-xs text-neutral-300 mt-10">
                    {/* Hover over any speaker to view their profile */} </p>
            </div>
        </section>
    )
}
