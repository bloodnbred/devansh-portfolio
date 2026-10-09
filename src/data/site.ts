/**
 * Single source of truth for all site copy.
 * Extracted verbatim from the previous build — edit here, never in components.
 */

/**
 * Vite rewrites the URLs it can see in index.html and CSS, but not string
 * literals inside a component. Anything served out of /public therefore has to
 * be built off BASE_URL, so it stays correct whether the site is served from the
 * domain root or from a GitHub Pages /<repo>/ sub-path.
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const identity = {
  first: 'DEVANSH',
  last: 'YADAV',
  full: 'Devansh Yadav',
  role: 'Software Developer',
  subrole: 'Computer Science Engineering Student',
  institution: 'Vidyalankar Institute of Technology',
  rollNo: '24102A0038',
  email: 'devanshsantoshyadav@gmail.com',
  github: 'https://github.com/Yadav-Devansh',
  linkedin: 'https://www.linkedin.com/in/devansh-yadav-8334a728b',
  resumeHref: asset('resume.pdf'),
  resumeFilename: 'Devansh_Yadav_Resume.pdf',
  portrait: asset('media/portrait.jpg'),
  year: '2026',
  tagline: 'Developer, builder, problem solver.',
} as const

export const heroHighlights = [
  'Strong in C, Java',
  'Current CGPA: 9.3',
  'Focused on Data Structures & Systems',
  'Building real-world optimized solutions',
] as const

export const tickerWords = [
  'Data Structures',
  'C',
  'Java',
  'C++',
  'SQL',
  'DBMS',
  'Full-Stack',
  'Graph Algorithms',
  'OpenCV',
  'React',
  'TypeScript',
  'System Design',
] as const

export const about = {
  paragraphs: [
    'I have a strong foundation in C and Java, and I am currently building depth in C++, SQL, DBMS, and full-stack development.',
    'I enjoy designing well-structured systems, optimizing performance, and building software that scales.',
  ],
  principles: [
    "I don't just write code. I design systems.",
    'I break problems into structures.',
    'I optimize before I scale.',
    'I prefer clarity over complexity.',
  ],
} as const

export const stats = [
  { value: 9.3, decimals: 1, prefix: '', suffix: '', label: 'Current CGPA' },
  { value: 82, decimals: 0, prefix: '', suffix: '%', label: 'SSC' },
  { value: 90, decimals: 0, prefix: '', suffix: '%', label: 'HSC' },
  { value: 7, decimals: 0, prefix: '', suffix: '', label: 'Projects Built' },
] as const

export const skills = [
  { title: 'Languages', items: ['C', 'Java', 'C++', 'SQL', 'JavaScript'] },
  { title: 'Core Subjects', items: ['Data Structures', 'DBMS', 'Computer Organization & Architecture', 'Structured Programming'] },
  { title: 'Tools & Frameworks', items: ['MERN Stack', 'Bootstrap', 'Eclipse', 'Git'] },
] as const

export const milestones = [
  { id: 'ssc', title: 'SSC', score: '82%', numericScore: 82, suffix: '%', prefix: '', institution: 'Vidya Vikasini High School', subtitle: '', side: 'left' },
  { id: 'hsc', title: 'HSC', score: '90%', numericScore: 90, suffix: '%', prefix: '', institution: "St. Anne's Knowledge Centre Jr College", subtitle: '', side: 'right' },
  { id: 'btech', title: 'B.Tech', score: 'CGPA 9.3', numericScore: 9.3, suffix: '', prefix: 'CGPA ', institution: 'Vidyalankar Institute of Technology', subtitle: 'Till 4th Semester', side: 'left' },
] as const

/* -------------------------------------------------------------------------- */

export type Stage =
  | { type: 'usecase'; title: string; content: string }
  | { type: 'architecture'; title: string; content: ''; diagram: string[] }
  | { type: 'flow'; title: string; content: string[] }
  | { type: 'features'; title: string; content: string[] }
  | { type: 'tech'; title: string; content: ''; techGroups: { label: string; items: string[] }[] }
  | { type: 'tryit'; title: string; content: string; links: { label: string; url: string } }

export type Project = {
  id: string
  title: string
  subtitle: string
  featured?: boolean
  /** Short line for the track panel. */
  blurb: string
  tags: string[]
  stages: Stage[]
}

/** The four deployed, walkthrough-grade projects — full stage data preserved. */
export const flagshipProjects: Project[] = [
  {
    id: 'campustrace',
    title: 'CampusTrace',
    subtitle: 'Intelligent Lost & Found System',
    featured: true,
    blurb: 'Image and fuzzy-text matching behind a Python microservice, wrapped in a React client.',
    tags: ['React', 'TypeScript', 'Python', 'OpenCV', 'RapidFuzz'],
    stages: [
      {
        type: 'usecase',
        title: 'The Problem',
        content:
          'Students frequently lose personal items on campus with no centralized recovery system. Manual searching is inefficient and unreliable.',
      },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: [
          'Frontend (React + TypeScript)',
          'REST API Layer',
          'Python Microservice (Flask / FastAPI)',
          'Matching Engine (OpenCV + RapidFuzz)',
          'Database (Supabase / Local Storage)',
        ],
      },
      {
        type: 'flow',
        title: 'System Flow',
        content: [
          'User uploads item',
          'API call triggered',
          'Python microservice processes data',
          'Image + similarity matching',
          'Results returned',
          'User sees matches',
        ],
      },
      {
        type: 'features',
        title: 'Features',
        content: [
          'Intelligent item matching',
          'Image-based comparison',
          'Fuzzy similarity search',
          'Centralized system',
          'Real-time feedback',
        ],
      },
      {
        type: 'tech',
        title: 'Tech Stack',
        content: '',
        techGroups: [
          { label: 'Frontend', items: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'] },
          { label: 'Backend', items: ['Supabase', 'REST APIs'] },
          { label: 'Python Layer', items: ['Python', 'Flask/FastAPI', 'OpenCV', 'TensorFlow Lite', 'RapidFuzz', 'NumPy'] },
        ],
      },
      {
        type: 'tryit',
        title: 'Try It Yourself',
        content: 'Experience the intelligent matching system live.',
        links: { label: 'Launch CampusTrace', url: 'https://vit-campustrace.vercel.app' },
      },
    ],
  },
  {
    id: 'eats-realtime',
    title: 'Eats Real-Time',
    subtitle: 'Ordering & Analytics System',
    blurb: 'Queue-driven ordering with live status pushed to the customer and an analytics dashboard for the vendor.',
    tags: ['React', 'Node.js', 'Express', 'Firestore', 'Recharts'],
    stages: [
      {
        type: 'usecase',
        title: 'The Problem',
        content:
          'Vendors struggle with managing orders, tracking preparation, and analyzing sales efficiently.',
      },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: ['Frontend (React)', 'API Layer (Node + Express)', 'Database (Firestore / Supabase)', 'Real-Time Updates + Analytics'],
      },
      {
        type: 'flow',
        title: 'System Flow',
        content: ['Order placed', 'Stored in DB', 'Queue updates', 'Vendor processes', 'Status updates', 'Customer notified', 'Analytics updated'],
      },
      {
        type: 'features',
        title: 'Features',
        content: ['Real-time order tracking', 'Queue-based processing', 'Customer preferences', 'Vendor dashboard', 'Analytics visualization'],
      },
      {
        type: 'tech',
        title: 'Tech Stack',
        content: '',
        techGroups: [
          { label: 'Frontend', items: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'] },
          { label: 'Backend', items: ['Node.js', 'Express.js'] },
          { label: 'Database', items: ['Firestore', 'Supabase'] },
          { label: 'Analytics', items: ['Recharts', 'Chart.js'] },
        ],
      },
      {
        type: 'tryit',
        title: 'Try It Yourself',
        content: 'See the real-time ordering system in action.',
        links: { label: 'Launch Eats Real-Time', url: 'https://eats-real-time.vercel.app' },
      },
    ],
  },
  {
    id: 'vit-attend',
    title: 'VIT Attendance',
    subtitle: 'Attendance Tracking & Analytics',
    blurb: 'An installable PWA with calendar history, custom targets and role-based access over Postgres RLS.',
    tags: ['TanStack Start', 'React 19', 'PostgreSQL', 'PWA'],
    stages: [
      {
        type: 'usecase',
        title: 'The Problem',
        content:
          'VIT students often lose track of attendance across labs, theory classes, and changing timetables. Missing the minimum percentage can mean losing exam eligibility or re-registering courses. VIT Attendance makes it easy to mark daily attendance, review past records through a calendar, and stay above the required threshold with clear analytics and targets.',
      },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: [
          'Frontend (TanStack Start + React)',
          'Auth Layer (Role-based access)',
          'Serverless Data Layer (Lovable Cloud)',
          'PostgreSQL + RLS Policies',
          'PWA Layer (Manifest + Install)',
        ],
      },
      {
        type: 'flow',
        title: 'System Flow',
        content: [
          'Student signs in & sets attendance target',
          'Marks lectures Present / Absent / Cancelled',
          'Reviews or edits records via Calendar',
          'Dashboard shows stats & announcements',
          'Backup & restore data as JSON',
        ],
      },
      {
        type: 'features',
        title: 'Features',
        content: [
          'Mark daily attendance (Present / Absent / Cancelled)',
          'Calendar view for historical records',
          'Subject-wise attendance tracking',
          'Dashboard with stats & progress',
          'Custom attendance targets (75%–90%)',
          'Dark / light theme toggle',
          'JSON backup & restore',
          'Installable PWA + admin announcements',
        ],
      },
      {
        type: 'tech',
        title: 'Tech Stack',
        content: '',
        techGroups: [
          { label: 'Framework', items: ['TanStack Start', 'React 19', 'TypeScript'] },
          { label: 'Styling & UI', items: ['Tailwind CSS v4', 'shadcn/ui', 'Lucide React'] },
          { label: 'State', items: ['TanStack Query'] },
          { label: 'Backend', items: ['Lovable Cloud', 'PostgreSQL', 'RLS Policies'] },
          { label: 'PWA', items: ['Web App Manifest', 'Custom Install Prompt'] },
        ],
      },
      {
        type: 'tryit',
        title: 'Try It Yourself',
        content: 'Track your attendance and stay above the threshold.',
        links: { label: 'Launch VIT Attendance', url: 'https://vit-attend.vercel.app' },
      },
    ],
  },
  {
    id: 'cgpa-planner',
    title: 'CGPA Planner',
    subtitle: 'Prediction & Simulation Engine',
    blurb: 'What-if simulation of academic targets, driven entirely by a typed rules engine.',
    tags: ['React', 'TypeScript', 'Chart.js', 'ECharts'],
    stages: [
      {
        type: 'usecase',
        title: 'The Problem',
        content: 'Students cannot realistically plan CGPA due to lack of structured prediction tools.',
      },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: ['User Input', 'Logic Engine (TypeScript)', 'Prediction + Constraints', 'Visualization Layer (Charts)', 'Interactive Output'],
      },
      {
        type: 'flow',
        title: 'System Flow',
        content: ['User inputs SGPI', 'System calculates CGPA', 'Predicts required SGPI', 'Validates feasibility', 'Displays simulation'],
      },
      {
        type: 'features',
        title: 'Features',
        content: ['CGPA prediction', 'What-if simulation', 'Real-time updates', 'Interactive charts'],
      },
      {
        type: 'tech',
        title: 'Tech Stack',
        content: '',
        techGroups: [
          { label: 'Frontend', items: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'] },
          { label: 'Visualization', items: ['Chart.js', 'ECharts'] },
          { label: 'Logic', items: ['TypeScript utilities'] },
        ],
      },
      {
        type: 'tryit',
        title: 'Try It Yourself',
        content: 'Plan your academic journey with interactive simulations.',
        links: { label: 'Launch CGPA Planner', url: 'https://vitcgpapredicter.vercel.app' },
      },
    ],
  },
]

/** The three academic / coursework projects. No live deploy, no deep stage
 *  walkthrough — but they belong on the same track. */
export const courseworkProjects: Project[] = [
  {
    id: 'mumbai-commute',
    title: 'Mumbai Commute Optimizer',
    subtitle: 'Graph-based Route Optimizer',
    blurb: 'A route optimization system designed to improve daily commute efficiency across Mumbai’s transport network using graph algorithms and real-time data analysis.',
    tags: ['Java', 'Graph Algorithms', 'Data Structures'],
    stages: [
      { type: 'usecase', title: 'The Problem', content: 'Commuting across Mumbai is a graph problem disguised as a geography problem — and treated like guesswork by every app.' },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: ['Transport Network (Nodes + Edges)', 'Graph Algorithms (Dijkstra / A*)', 'Real-Time Data Analysis', 'Optimized Route Output'],
      },
      {
        type: 'flow',
        title: 'System Flow',
        content: ['Ingest network data', 'Build weighted graph', 'Run pathfinding', 'Analyze real-time delay data', 'Output optimized route'],
      },
      {
        type: 'features', title: 'Features', content: ['Weighted graph modeling', 'Shortest-path selection', 'Real-time delay analysis', 'Route comparison'] },
      { type: 'tech', title: 'Tech Stack', content: '', techGroups: [{ label: 'Core', items: ['Java', 'Graph Algorithms', 'Data Structures'] }] },
    ],
  },
  {
    id: 'arcade-machine',
    title: 'Arcade Machine',
    subtitle: 'Data Structures in C',
    blurb: 'An interactive arcade machine simulation built entirely in C, showcasing advanced data structures including linked lists, stacks, queues, and binary trees.',
    tags: ['C', 'Data Structures', 'CLI'],
    stages: [
      { type: 'usecase', title: 'The Problem', content: 'Data structures are taught in isolation. This project makes each one load-bearing — you can see what happens when you pick the wrong one.' },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: ['CLI Frontend', 'State Manager', 'Linked List / Stack / Queue', 'Binary Tree', 'Persistence'],
      },
      { type: 'flow', title: 'System Flow', content: ['Player input', 'Command dispatch', 'Structure operation', 'State update', 'Render to console'] },
      { type: 'features', title: 'Features', content: ['Linked list operations', 'Stack & queue mechanics', 'Binary tree traversal', 'Scoring system', 'Pure CLI interface'] },
      { type: 'tech', title: 'Tech Stack', content: '', techGroups: [{ label: 'Core', items: ['C', 'Data Structures', 'CLI'] }] },
    ],
  },
  {
    id: 'vendor-order',
    title: 'Vendor Order & Inventory System',
    subtitle: 'Database-backed Full Stack',
    blurb: 'A comprehensive vendor management system handling order processing, inventory tracking, and analytics with a structured database backend.',
    tags: ['SQL', 'DBMS', 'Full Stack'],
    stages: [
      { type: 'usecase', title: 'The Problem', content: 'Vendors track orders, stock and sales in three disconnected places — so none of the numbers agree.' },
      {
        type: 'architecture',
        title: 'System Architecture',
        content: '',
        diagram: ['Front-End Interface', 'Application Logic', 'Relational Database (SQL)', 'Reporting / Analytics'],
      },
      { type: 'flow', title: 'System Flow', content: ['Order captured', 'Normalized & stored', 'Inventory adjusted', 'Records queried', 'Reports generated'] },
      { type: 'features', title: 'Features', content: ['Order processing', 'Inventory tracking', 'Relational schema design', 'Analytics and reporting'] },
      { type: 'tech', title: 'Tech Stack', content: '', techGroups: [{ label: 'Core', items: ['SQL', 'DBMS', 'Full Stack'] }] },
    ],
  },
]

export const projects: Project[] = [...flagshipProjects, ...courseworkProjects]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const

export const contactLinks = [
  { label: 'Email', href: `mailto:${identity.email}` },
  { label: 'GitHub', href: identity.github },
  { label: 'LinkedIn', href: identity.linkedin },
] as const