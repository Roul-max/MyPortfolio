export interface NavLink {
  name: string;
  href: string;
}

export interface Social {
  name: string;
  href: string;
  icon: 'github' | 'linkedin' | 'instagram';
}

export interface SkillItem {
  name: string;
  icon?: string;
  brandColor: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  filterCategory: 'fullstack' | 'ai' | 'web';
  featured?: boolean;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  impact: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  specialization: string;
  institution: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  color: string;
}

export interface Interest {
  name: string;
}

const skillIcons: Record<string, Pick<SkillItem, 'icon' | 'brandColor'>> = {
  'HTML5': { icon: 'html5', brandColor: '#E34F26' },
  'CSS3': { icon: 'css3', brandColor: '#1572B6' },
  'JavaScript': { icon: 'javascript', brandColor: '#F7DF1E' },
  'TypeScript': { icon: 'typescript', brandColor: '#3178C6' },
  'React.js': { icon: 'react', brandColor: '#61DAFB' },
  'Next.js': { icon: 'nextjs', brandColor: '#ffffff' },
  'Tailwind CSS': { icon: 'tailwindcss', brandColor: '#38BDF8' },
  'Framer Motion': { brandColor: '#A855F7' },
  'Node.js': { icon: 'nodejs', brandColor: '#5FA04E' },
  'Express': { icon: 'express', brandColor: '#ffffff' },
  'PostgreSQL': { icon: 'postgresql', brandColor: '#4169E1' },
  'MongoDB': { icon: 'mongodb', brandColor: '#47A248' },
  'REST APIs': { brandColor: '#06B6D4' },
  'Git': { icon: 'git', brandColor: '#F05032' },
  'GitHub': { brandColor: '#ffffff' },
  'VS Code': { brandColor: '#007ACC' },
  'Figma': { icon: 'figma', brandColor: '#F24E1E' },
  'Postman': { brandColor: '#FF6C37' },
  'Render': { brandColor: '#46E3B7' },
  'Vercel': { brandColor: '#ffffff' },
  'Netlify': { brandColor: '#00C7B7' },
  'Fast Learner': { brandColor: '#F59E0B' },
  'Problem Solving': { brandColor: '#7C3AED' },
  'Teamwork': { brandColor: '#10B981' },
  'Clear Communication': { brandColor: '#06B6D4' },
};

const makeSkill = (name: string): SkillItem => ({ name, ...skillIcons[name] });

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const socials: Social[] = [
  { name: 'GitHub', href: 'https://github.com/Roul-max', icon: 'github' },
  { name: 'LinkedIn', href: 'http://www.linkedin.com/in/roul-max', icon: 'linkedin' },
  { name: 'Instagram', href: 'https://www.instagram.com/luv_roul', icon: 'instagram' },
];

export const skills: SkillGroup[] = [
  {
    category: 'Frontend Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map(makeSkill),
  },
  {
    category: 'Backend & Database',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'].map(makeSkill),
  },
  {
    category: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Vercel', 'Render'].map(makeSkill),
  },
  {
    category: 'Soft Skills',
    items: ['Fast Learner', 'Problem Solving', 'Teamwork', 'Clear Communication'].map(makeSkill),
  },
];

export const projects: Project[] = [
  {
    id: 8,
    title: 'Gharpayy - PG SaaS Platform',
    category: 'SaaS / PG Management',
    filterCategory: 'fullstack',
    featured: true,
    description: 'A modern SaaS platform for PG (Paying Guest) businesses, combining a public storefront with a CRM pipeline to acquire, convert, and retain residents from one dashboard.',
    problem: 'PG owners rely on manual operations and scattered lead channels, lacking a professional digital storefront to attract and manage residents efficiently.',
    solution: 'Developed a full-stack MERN application with a public discovery portal and a secure owner dashboard for CRM and inventory management, powered by scalable REST APIs.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    image: '/Gharpayy.png',
    github: 'https://github.com/Roul-max/gharpayy',
    live: 'https://gharpayyapp.vercel.app/',
    impact: 'Transformed PG management into a streamlined SaaS experience, boosting owner efficiency and resident trust through a unified, professional platform.'
  },
  {
    id: 1,
    title: 'ACE-ERP - University Management Platform',
    category: 'Enterprise Resource Planning',
    filterCategory: 'fullstack',
    description: 'An enterprise-grade academic ERP platform engineered to centralize university operations, including student portals, faculty workflows, and administrative analytics.',
    problem: 'Campus departments suffer from data fragmentation, relying on disconnected legacy systems that hinder operational scaling and cross-departmental visibility.',
    solution: 'Architected a modular, full-stack MERN ecosystem featuring JWT-secured protected routes, granular RBAC, and highly scalable REST APIs.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    image: '/Aceerp.png',
    github: 'https://github.com/Roul-max/ERP',
    live: 'https://aceerp.vercel.app',
    impact: 'Eliminated operational bottlenecks by delivering a unified, secure dashboard with 100% role-based visibility across all university departments.'
  },
  {
    
    id: 2,
    title: 'Impulse - E-Commerce Platform',
    category: 'E-Commerce / FinTech',
    filterCategory: 'fullstack',
    description: 'A high-conversion e-commerce storefront featuring dynamic product discovery, advanced filtering, and frictionless checkout.',
    problem: 'Shoppers abandon carts when product discovery is slow and the checkout process feels untrustworthy or complex.',
    solution: 'Developed a lightning-fast React frontend with intuitive routing, seamlessly integrated with Razorpay for secure transaction processing.',
    tech: ['React.js', 'Tailwind CSS', 'Razorpay'],
    image: '/Impulse.png',
    github: 'https://github.com/Roul-max/Impulse',
    live: 'https://impulseind.vercel.app',
    impact: 'Delivered a premium, high-performance shopping journey that boosts buyer confidence and securely handles end-to-end payment flows via Razorpay.'
  },
  {
    id: 3,
    title: 'Speech - Audio-to-Text AI',
    category: 'AI / Productivity Tool',
    filterCategory: 'ai',
    description: 'An AI-powered mobile utility that instantly transforms spoken audio into accurate, editable text transcripts.',
    problem: 'Manual transcription is a severe time sink for professionals needing quick, accurate text from voice recordings.',
    solution: 'Built a seamless mobile-first interface with Redux state management, connecting to advanced speech-to-text AI models.',
    tech: ['Firebase', 'React Native', 'Redux'],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop',
    github: 'https://github.com/Roul-max/Speech',
    live: 'https://speech-beryl-theta.vercel.app/',
    impact: 'Dramatically reduced manual transcription effort by providing a focused, fast, and highly accurate AI-powered conversion tool.'
  },
  {
    id: 4,
    title: 'Vizva - HR Management System',
    category: 'Internal Business Tool',
    filterCategory: 'fullstack',
    description: 'A secure, internal dashboard for HR operations, providing a centralized system for managing employee records, roles, and organizational data.',
    problem: 'As teams scale, managing employee data in spreadsheets becomes inefficient, error-prone, and poses a security risk for sensitive information.',
    solution: 'Engineered a full CRUD application using Next.js and Tailwind CSS, featuring protected API routes and an intuitive UI for managing employee records.',
    tech: ['Next.js', 'Tailwind CSS', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    github: 'https://github.com/Roul-max/vizva',
    live: 'https://vizva-j5cw.vercel.app/login',
    impact: 'Replaced manual spreadsheet management with a secure, single source of truth for HR data, improving data integrity and operational efficiency.'
  }
];

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Developer',
    company: 'CROMA CAMPUS PVT',
    period: '05/2025 - 08/2025',
    description: 'Engineered production-ready web applications using the MERN stack. Designed robust RESTful APIs, implemented secure authentication pipelines, and optimized system architecture for scale and maintainability.',
    highlights: ['Engineered scalable REST APIs', 'Secure Auth & CRUD pipelines', 'System deployment & optimization']
  },
  {
    role: 'Frontend Developer',
    company: 'AICTE',
    period: '03/2025 - 04/2025',
    description: 'Architected and delivered highly responsive user interfaces for institutional platforms. Focused on modern web accessibility standards, cross-browser compatibility, and frictionless user experiences.',
    highlights: ['Advanced UI/UX development', 'Web accessibility standards (a11y)', 'Agile cross-functional teamwork']
  }
];

export const education: EducationItem[] = [
  {
    degree: 'B.Tech CSE in Artificial Intelligence',
    specialization: 'CGPA: 7.8/10',
    institution: 'IIMT College Of Engineering, Greater Noida',
    period: 'July 2022 - June 2026',
    highlights: ['Advanced Data Structures', 'Applied Machine Learning', 'Modern Web Engineering']
  },
  {
    degree: 'Secondary Education I.Sc (PCM)',
    specialization: 'CGPA: 7.6/10',
    institution: 'Park Mount Public School, Patna',
    period: 'May 2019 - June 2021',
    highlights: ['Advanced Mathematics', 'Analytical Problem Solving', 'Foundational Sciences']
  }
];

export const certifications: Certification[] = [
  {
    name: 'Python with IIOT',
    issuer: 'Dysmech Competency Services',
    year: '2024',
    color: '#3178C6'
  },
  {
    name: 'IIOT Basic using Thingworx',
    issuer: 'Dysmech Competency Services',
    year: '2023',
    color: '#10B981'
  }
];

export const interests: Interest[] = [
  { name: 'Photography' },
  { name: 'Travel' },
  { name: 'Open Source' },
  { name: 'Gaming' },
  { name: 'Music' },
  { name: 'Design' },
  { name: 'Coffee' },
  { name: 'Building things' },
];
