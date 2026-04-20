// ─── FREE RESOURCES — Curated learning materials ─────────────────────────────
// tracks: 'sde' | 'frontend' | 'backend' | 'devops' | 'data' | 'all'

export const TRACKS = [
  { id: 'all',      label: 'All',           emoji: '🌐' },
  { id: 'sde',      label: 'SDE / DSA',     emoji: '💻' },
  { id: 'frontend', label: 'Frontend',      emoji: '🎨' },
  { id: 'backend',  label: 'Backend',       emoji: '⚙️'  },
  { id: 'devops',   label: 'DevOps',        emoji: '🔧' },
  { id: 'data',     label: 'Data Analyst',  emoji: '📊' },
];

export const RESOURCE_CATEGORIES = [
  // ─── DSA PRACTICE ──────────────────────────────────────────────────────────
  {
    id: 'dsa-practice',
    label: 'DSA Practice',
    emoji: '💻',
    color: '#10b981',
    tracks: ['sde'],
    resources: [
      { id: 'leetcode',    title: 'LeetCode',                   description: 'The gold standard for coding interviews. Start with NeetCode 150 or Blind 75.',                       url: 'https://leetcode.com',                        type: 'platform', free: true, mustKnow: true,  tracks: ['sde'],           tags: ['dsa', 'practice', 'problems'] },
      { id: 'neetcode',    title: 'NeetCode.io',                description: 'Free roadmap with video solutions for top 150 interview problems.',                                   url: 'https://neetcode.io',                         type: 'platform', free: true, mustKnow: true,  tracks: ['sde'],           tags: ['dsa', 'roadmap', 'video'] },
      { id: 'striver',     title: "Striver's A2Z DSA Sheet",    description: '455 problems organized by topic. Best structured sheet for FAANG prep.',                             url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2', type: 'sheet', free: true, mustKnow: true, tracks: ['sde'], tags: ['dsa', 'sheet', 'structured'] },
      { id: 'blind-75',    title: 'Blind 75 LeetCode List',     description: 'The classic 75 must-solve problems covering all key patterns. Minimum viable prep.',                 url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', type: 'sheet', free: true, mustKnow: true, tracks: ['sde'], tags: ['dsa', 'sheet', 'faang'] },
      { id: 'gfg',         title: 'GeeksforGeeks',              description: "India's #1 CS resource — DSA articles, interview experiences, and problems.",                        url: 'https://www.geeksforgeeks.org',               type: 'platform', free: true, mustKnow: true,  tracks: ['sde'],           tags: ['dsa', 'articles', 'india'] },
      { id: 'visualgo',    title: 'VisuAlgo',                   description: 'Visualize data structures and algorithms step by step. Great for building mental models.',           url: 'https://visualgo.net',                        type: 'tool',     free: true, mustKnow: false, tracks: ['sde'],           tags: ['visualization', 'learning'] },
      { id: 'lc-patterns', title: 'LeetCode Patterns',          description: 'Problems grouped by coding patterns (sliding window, two pointer, etc.).',                          url: 'https://seanprashad.com/leetcode-patterns/',  type: 'sheet',    free: true, mustKnow: true,  tracks: ['sde'],           tags: ['dsa', 'patterns', 'sheet'] },
      { id: 'cp-algos',    title: 'CP-Algorithms',              description: 'Deep theoretical explanations of algorithms with proofs and implementations.',                       url: 'https://cp-algorithms.com',                   type: 'website',  free: true, mustKnow: false, tracks: ['sde'],           tags: ['dsa', 'theory', 'competitive'] },
      { id: 'bigocheat',   title: 'Big-O Cheat Sheet',          description: 'Quick reference for time & space complexity of all common algorithms and data structures.',         url: 'https://www.bigocheatsheet.com',              type: 'tool',     free: true, mustKnow: true,  tracks: ['sde'],           tags: ['complexity', 'reference'] },
    ],
  },

  // ─── SYSTEM DESIGN ─────────────────────────────────────────────────────────
  {
    id: 'system-design',
    label: 'System Design (HLD)',
    emoji: '🏗️',
    color: '#6366f1',
    tracks: ['sde', 'backend'],
    resources: [
      { id: 'sd-primer',      title: 'System Design Primer',             description: 'The most comprehensive free system design resource on GitHub. 265k+ stars.',                  url: 'https://github.com/donnemartin/system-design-primer',           type: 'github',  free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['system-design', 'hld', 'comprehensive'] },
      { id: 'bytebytego',     title: 'ByteByteGo Newsletter',            description: 'Weekly system design breakdowns with beautiful diagrams.',                                    url: 'https://blog.bytebytego.com',                                   type: 'blog',    free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['system-design', 'newsletter', 'visual'] },
      { id: 'awesome-sd',     title: 'ashishps1/awesome-system-design',  description: 'Curated GitHub list of system design resources, papers, and references.',                   url: 'https://github.com/ashishps1/awesome-system-design-resources', type: 'github',  free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['system-design', 'curated'] },
      { id: 'karan-sd',       title: 'karanpratapsingh/system-design',   description: 'Open-source system design guide with diagrams. Free alternative to the paid book.',         url: 'https://github.com/karanpratapsingh/system-design',             type: 'github',  free: true, mustKnow: false, tracks: ['sde', 'backend'], tags: ['system-design', 'guide', 'diagrams'] },
      { id: 'high-scale',     title: 'High Scalability Blog',            description: 'Real-world case studies of how Netflix, Twitter, and Uber scaled their systems.',            url: 'http://highscalability.com',                                    type: 'blog',    free: true, mustKnow: false, tracks: ['sde', 'backend'], tags: ['system-design', 'real-world'] },
      { id: 'excalidraw',     title: 'Excalidraw',                       description: 'Free whiteboard for drawing system design diagrams during interviews.',                      url: 'https://excalidraw.com',                                        type: 'tool',    free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['tool', 'diagrams', 'whiteboard'] },
    ],
  },

  // ─── LLD ───────────────────────────────────────────────────────────────────
  {
    id: 'lld',
    label: 'Low Level Design (LLD)',
    emoji: '🧩',
    color: '#8b5cf6',
    tracks: ['sde', 'backend'],
    resources: [
      { id: 'refactoring-guru', title: 'Refactoring Guru — Design Patterns', description: 'Best free resource for design patterns with code examples and visual diagrams.',    url: 'https://refactoring.guru/design-patterns',                type: 'website', free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['lld', 'design-patterns', 'oop'] },
      { id: 'lld-github',       title: 'ashishps1/awesome-low-level-design', description: 'LLD questions (Parking Lot, Snake Game, Chess) with solutions in Java/Python.', url: 'https://github.com/ashishps1/awesome-low-level-design',    type: 'github',  free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['lld', 'problems', 'solutions'] },
      { id: 'solid-baeldung',   title: 'SOLID Principles — Baeldung',        description: 'Clear explanation of SOLID with Java examples and anti-patterns.',               url: 'https://www.baeldung.com/solid-principles',               type: 'article', free: true, mustKnow: true,  tracks: ['sde', 'backend'], tags: ['lld', 'solid', 'oop'] },
    ],
  },

  // ─── FRONTEND RESOURCES ────────────────────────────────────────────────────
  {
    id: 'frontend-resources',
    label: 'Frontend Development',
    emoji: '🎨',
    color: '#ec4899',
    tracks: ['frontend'],
    resources: [
      { id: 'mdn-docs',        title: 'MDN Web Docs',                  description: 'The definitive reference for HTML, CSS, JavaScript, and Web APIs. Bookmark this forever.',   url: 'https://developer.mozilla.org',                         type: 'website', free: true, mustKnow: true,  tracks: ['frontend'], tags: ['html', 'css', 'javascript', 'reference'] },
      { id: 'javascript-info', title: 'javascript.info',               description: 'Best modern JavaScript tutorial. Covers fundamentals to advanced topics with exercises.',    url: 'https://javascript.info',                               type: 'website', free: true, mustKnow: true,  tracks: ['frontend'], tags: ['javascript', 'tutorial', 'deep-dive'] },
      { id: 'react-docs',      title: 'React Official Docs (react.dev)',description: 'The new React documentation with interactive examples and the new mental model.',           url: 'https://react.dev',                                     type: 'website', free: true, mustKnow: true,  tracks: ['frontend'], tags: ['react', 'official', 'docs'] },
      { id: 'fe-mentor',       title: 'Frontend Mentor',               description: 'Build real projects from professional designs. Best way to grow your portfolio.',           url: 'https://www.frontendmentor.io',                         type: 'platform', free: true, mustKnow: true, tracks: ['frontend'], tags: ['projects', 'portfolio', 'challenges'] },
      { id: 'web-dev-google',  title: 'web.dev by Google',             description: 'Google\'s free guide to web performance, accessibility, and Core Web Vitals.',              url: 'https://web.dev',                                       type: 'website', free: true, mustKnow: false, tracks: ['frontend'], tags: ['performance', 'accessibility', 'pwa'] },
      { id: 'typescript-docs', title: 'TypeScript Handbook',           description: 'Official TypeScript documentation. Start with the handbook for a structured intro.',        url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'website', free: true, mustKnow: true, tracks: ['frontend'], tags: ['typescript', 'docs'] },
      { id: 'css-tricks',      title: 'CSS-Tricks',                    description: 'CSS tutorials, guides, and the famous complete guide to Flexbox and Grid.',                  url: 'https://css-tricks.com',                                type: 'website', free: true, mustKnow: false, tracks: ['frontend'], tags: ['css', 'flexbox', 'grid'] },
      { id: 'bundlephobia',    title: 'Bundlephobia',                  description: 'Check npm package sizes before adding them. Keep your bundle lean.',                        url: 'https://bundlephobia.com',                              type: 'tool',    free: true, mustKnow: false, tracks: ['frontend'], tags: ['performance', 'npm', 'bundle'] },
    ],
  },

  // ─── BACKEND RESOURCES ─────────────────────────────────────────────────────
  {
    id: 'backend-resources',
    label: 'Backend Development',
    emoji: '⚙️',
    color: '#6366f1',
    tracks: ['backend'],
    resources: [
      { id: 'node-docs',        title: 'Node.js Official Docs',         description: 'Official Node.js documentation and API reference.',                                         url: 'https://nodejs.org/en/docs/',                            type: 'website', free: true, mustKnow: true,  tracks: ['backend'], tags: ['nodejs', 'docs', 'official'] },
      { id: 'spring-guides',    title: 'Spring Guides',                 description: 'Official Spring Boot getting-started guides. Best structured Java backend learning.',       url: 'https://spring.io/guides',                               type: 'website', free: true, mustKnow: false, tracks: ['backend'], tags: ['java', 'spring', 'backend'] },
      { id: 'postgres-docs',    title: 'PostgreSQL Documentation',      description: 'The official PostgreSQL docs. Especially the chapters on indexes and query planning.',      url: 'https://www.postgresql.org/docs/',                       type: 'website', free: true, mustKnow: false, tracks: ['backend'], tags: ['sql', 'database', 'postgres'] },
      { id: 'redis-docs',       title: 'Redis Documentation',           description: 'Official Redis docs with patterns for caching, pub/sub, rate limiting, and leaderboards.',  url: 'https://redis.io/docs/',                                 type: 'website', free: true, mustKnow: false, tracks: ['backend'], tags: ['redis', 'caching', 'backend'] },
      { id: 'kafka-intro',      title: 'Apache Kafka Introduction',     description: 'Official Kafka introduction. Understand producers, consumers, topics, and partitions.',     url: 'https://kafka.apache.org/intro',                         type: 'website', free: true, mustKnow: false, tracks: ['backend'], tags: ['kafka', 'messaging', 'streaming'] },
      { id: 'roadmap-backend',  title: 'roadmap.sh — Backend',          description: 'Community-built backend developer roadmap. See what to learn and in what order.',          url: 'https://roadmap.sh/backend',                             type: 'website', free: true, mustKnow: true,  tracks: ['backend'], tags: ['roadmap', 'backend', 'structured'] },
    ],
  },

  // ─── DEVOPS RESOURCES ──────────────────────────────────────────────────────
  {
    id: 'devops-resources',
    label: 'DevOps & Cloud',
    emoji: '🔧',
    color: '#f97316',
    tracks: ['devops'],
    resources: [
      { id: 'roadmap-devops',   title: 'roadmap.sh — DevOps',           description: 'The most followed DevOps roadmap. Tells you exactly what to learn and in what order.',       url: 'https://roadmap.sh/devops',                              type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['devops', 'roadmap', 'structured'] },
      { id: 'docker-docs',      title: 'Docker Official Documentation', description: 'Official Docker docs. Read the Getting Started guide and Dockerfile best practices.',        url: 'https://docs.docker.com',                                type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['docker', 'containers', 'official'] },
      { id: 'k8s-docs',         title: 'Kubernetes Documentation',      description: 'Official K8s docs. Start with Concepts → Workloads, then Tutorials.',                       url: 'https://kubernetes.io/docs/home/',                       type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['kubernetes', 'k8s', 'official'] },
      { id: 'kodekloud',        title: 'KodeKloud (Free Labs)',          description: 'Hands-on DevOps labs. Free Docker, K8s, Terraform, and Ansible playgrounds.',               url: 'https://kodekloud.com',                                  type: 'platform', free: true, mustKnow: true, tracks: ['devops'], tags: ['devops', 'hands-on', 'labs'] },
      { id: 'terraform-docs',   title: 'Terraform Documentation',       description: 'HashiCorp official Terraform docs. Start with the Getting Started AWS tutorial.',           url: 'https://developer.hashicorp.com/terraform/docs',         type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['terraform', 'iac', 'aws'] },
      { id: 'ansible-docs',     title: 'Ansible Documentation',         description: 'Official Ansible docs. Read the Playbook section and best practices guide.',                url: 'https://docs.ansible.com',                               type: 'website', free: true, mustKnow: false, tracks: ['devops'], tags: ['ansible', 'iac', 'automation'] },
      { id: 'aws-free',         title: 'AWS Free Tier',                 description: 'Spin up real AWS services for free. Best way to practice EC2, S3, Lambda, RDS.',            url: 'https://aws.amazon.com/free/',                           type: 'platform', free: true, mustKnow: true, tracks: ['devops'], tags: ['aws', 'cloud', 'practice'] },
      { id: 'github-actions',   title: 'GitHub Actions Docs',           description: 'Build CI/CD pipelines right in GitHub. Official docs with workflow examples.',              url: 'https://docs.github.com/en/actions',                     type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['cicd', 'github-actions', 'automation'] },
      { id: 'prometheus-docs',  title: 'Prometheus Documentation',      description: 'Official Prometheus docs for metrics collection, alerting, and PromQL.',                    url: 'https://prometheus.io/docs/introduction/overview/',      type: 'website', free: true, mustKnow: false, tracks: ['devops'], tags: ['monitoring', 'prometheus', 'observability'] },
      { id: 'play-k8s',        title: 'Play with Kubernetes',           description: 'Free browser-based K8s playground. Spin up a cluster in seconds, no setup needed.',        url: 'https://labs.play-with-k8s.com',                         type: 'platform', free: true, mustKnow: false, tracks: ['devops'], tags: ['kubernetes', 'playground', 'free'] },
      { id: 'linuxjourney',     title: 'Linux Journey',                 description: 'Free, gamified Linux course from absolute basics to networking and storage.',               url: 'https://linuxjourney.com',                               type: 'website', free: true, mustKnow: true,  tracks: ['devops'], tags: ['linux', 'beginner', 'fundamentals'] },
      { id: 'devops-awesome',   title: 'awesome-devops (GitHub)',       description: 'Curated list of DevOps tools, resources, books, and communities.',                         url: 'https://github.com/wmariuss/awesome-devops',             type: 'github',  free: true, mustKnow: false, tracks: ['devops'], tags: ['devops', 'curated', 'tools'] },
    ],
  },

  // ─── DATA ANALYST RESOURCES ────────────────────────────────────────────────
  {
    id: 'data-resources',
    label: 'Data Analysis',
    emoji: '📊',
    color: '#a78bfa',
    tracks: ['data'],
    resources: [
      { id: 'kaggle',           title: 'Kaggle',                        description: 'Free datasets, notebooks, competitions, and courses. The home of data science learning.',   url: 'https://www.kaggle.com',                                 type: 'platform', free: true, mustKnow: true,  tracks: ['data'], tags: ['data', 'competitions', 'datasets'] },
      { id: 'pandas-docs',      title: 'Pandas Documentation',          description: 'Official Pandas docs. Study the User Guide chapter by chapter.',                            url: 'https://pandas.pydata.org/docs/',                        type: 'website', free: true, mustKnow: true,  tracks: ['data'], tags: ['pandas', 'python', 'docs'] },
      { id: 'mode-sql',         title: 'Mode SQL Tutorial',             description: 'From basic SELECT to advanced window functions. The best hands-on SQL course.',            url: 'https://mode.com/sql-tutorial/',                         type: 'website', free: true, mustKnow: true,  tracks: ['data'], tags: ['sql', 'advanced', 'analytics'] },
      { id: 'stratascratch',    title: 'StrataScratch',                 description: 'Real SQL and Python interview questions from FAANG companies. Best for DA interview prep.',  url: 'https://www.stratascratch.com',                          type: 'platform', free: true, mustKnow: true, tracks: ['data'], tags: ['sql', 'interview', 'data-science'] },
      { id: 'tableau-public',   title: 'Tableau Public (Free)',         description: 'Free version of Tableau. Build dashboards and publish to the Tableau Public gallery.',     url: 'https://public.tableau.com',                             type: 'platform', free: true, mustKnow: true, tracks: ['data'], tags: ['tableau', 'visualization', 'dashboards'] },
      { id: 'powerbi-free',     title: 'Power BI Desktop (Free)',       description: 'Microsoft\'s free BI tool. Download and connect to any data source immediately.',          url: 'https://powerbi.microsoft.com/en-us/desktop/',           type: 'platform', free: true, mustKnow: false,tracks: ['data'], tags: ['powerbi', 'microsoft', 'bi'] },
      { id: 'statquest',        title: 'StatQuest with Josh Starmer',   description: 'Statistics and machine learning explained clearly. The best free stats education.',        url: 'https://www.youtube.com/@statquest',                     type: 'youtube', free: true, mustKnow: true,  tracks: ['data'], tags: ['statistics', 'ml', 'youtube'] },
      { id: 'looker-studio',    title: 'Looker Studio (Google)',        description: 'Free dashboarding tool from Google. Connect to Sheets, BigQuery, GA, and more.',           url: 'https://lookerstudio.google.com',                        type: 'platform', free: true, mustKnow: false,tracks: ['data'], tags: ['dashboards', 'google', 'bi'] },
      { id: 'sqlzoo',           title: 'SQLZoo',                        description: 'Interactive SQL practice. Master JOINs, subqueries, and aggregations hands-on.',           url: 'https://sqlzoo.net',                                     type: 'platform', free: true, mustKnow: false, tracks: ['data'], tags: ['sql', 'practice', 'interactive'] },
      { id: 'dbt-docs',         title: 'dbt Learn',                     description: 'Learn dbt (data build tool) — the modern way to transform data in warehouses.',            url: 'https://docs.getdbt.com/docs/introduction',              type: 'website', free: true, mustKnow: false, tracks: ['data'], tags: ['dbt', 'data-engineering', 'sql'] },
    ],
  },

  // ─── YOUTUBE CHANNELS ──────────────────────────────────────────────────────
  {
    id: 'youtube',
    label: 'YouTube Channels',
    emoji: '▶️',
    color: '#ec4899',
    tracks: ['sde', 'frontend', 'backend', 'devops', 'data'],
    resources: [
      { id: 'striver-yt',    title: 'take U forward (Striver)',   description: 'Best DSA course on YouTube. SDE sheet explained end-to-end in Hindi/English.',      url: 'https://www.youtube.com/@takeUforward',          type: 'youtube', free: true, mustKnow: true,  tracks: ['sde'],              tags: ['dsa', 'hindi', 'youtube'] },
      { id: 'neetcode-yt',   title: 'NeetCode',                   description: 'Clean Python solutions to every LeetCode problem. Essential for SDE prep.',          url: 'https://www.youtube.com/@NeetCode',               type: 'youtube', free: true, mustKnow: true,  tracks: ['sde'],              tags: ['dsa', 'english', 'youtube'] },
      { id: 'gaurav-sen',    title: 'Gaurav Sen',                  description: 'System design concepts explained brilliantly. A must-follow for senior roles.',      url: 'https://www.youtube.com/@gkcs',                   type: 'youtube', free: true, mustKnow: true,  tracks: ['sde', 'backend'],   tags: ['system-design', 'youtube'] },
      { id: 'techworld-nana',title: 'TechWorld with Nana',         description: 'Best DevOps YouTube channel. Docker, K8s, Terraform, CI/CD all explained clearly.', url: 'https://www.youtube.com/@TechWorldwithNana',      type: 'youtube', free: true, mustKnow: true,  tracks: ['devops'],           tags: ['devops', 'docker', 'kubernetes'] },
      { id: 'fireship',      title: 'Fireship',                    description: '100-second concept videos + deep dives. Fast, dense, and accurate. Best for frontend.', url: 'https://www.youtube.com/@Fireship',             type: 'youtube', free: true, mustKnow: true,  tracks: ['frontend', 'backend'], tags: ['web', 'javascript', 'concise'] },
      { id: 'traversy',      title: 'Traversy Media',              description: 'Full crash courses for every web technology. React, Node, Python, Docker and more.', url: 'https://www.youtube.com/@TraversyMedia',          type: 'youtube', free: true, mustKnow: true,  tracks: ['frontend', 'backend'], tags: ['web', 'crash-course', 'full-stack'] },
      { id: 'alex-analyst',  title: 'Alex The Analyst',            description: 'SQL, Python for data analysis, Tableau, and Power BI. Best data analyst channel.',  url: 'https://www.youtube.com/@AlexTheAnalyst',         type: 'youtube', free: true, mustKnow: true,  tracks: ['data'],             tags: ['sql', 'python', 'data', 'hindi'] },
      { id: 'aditya-verma',  title: 'Aditya Verma',                description: 'Best DP and Recursion playlist on YouTube. His DP series is legendary.',           url: 'https://www.youtube.com/@adityaverma7555',        type: 'youtube', free: true, mustKnow: true,  tracks: ['sde'],              tags: ['dp', 'recursion', 'youtube'] },
      { id: 'net-ninja',     title: 'The Net Ninja',               description: 'Structured playlist-based web dev courses. CSS, React, Node.js, TypeScript.',        url: 'https://www.youtube.com/@NetNinja',               type: 'youtube', free: true, mustKnow: false, tracks: ['frontend'],         tags: ['web', 'playlists', 'frontend'] },
      { id: 'kodekloud-yt',  title: 'KodeKloud',                   description: 'Kubernetes, Docker, Ansible, Terraform explained for beginners and pros.',           url: 'https://www.youtube.com/@KodeKloud',              type: 'youtube', free: true, mustKnow: true,  tracks: ['devops'],           tags: ['devops', 'kubernetes', 'hands-on'] },
      { id: 'primeagen',     title: 'The Primeagen',               description: 'Deep takes on algorithms, backend engineering, and becoming a better engineer.',      url: 'https://www.youtube.com/@ThePrimeagen',           type: 'youtube', free: true, mustKnow: false, tracks: ['sde', 'backend'],   tags: ['backend', 'algorithms', 'rust'] },
      { id: 'luke-barousse', title: 'Luke Barousse',               description: 'Data analysis career advice, Python projects, and SQL tutorials. Very practical.',   url: 'https://www.youtube.com/@LukeBarousse',           type: 'youtube', free: true, mustKnow: false, tracks: ['data'],             tags: ['data', 'career', 'python'] },
    ],
  },

  // ─── INTERVIEW PREP ────────────────────────────────────────────────────────
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    emoji: '🎯',
    color: '#f59e0b',
    tracks: ['sde', 'frontend', 'backend', 'devops', 'data'],
    resources: [
      { id: 'pramp',         title: 'Pramp',                        description: 'Free peer-to-peer mock interviews. Practice with real engineers worldwide.',         url: 'https://www.pramp.com',                      type: 'platform', free: true, mustKnow: true,  tracks: ['sde', 'frontend', 'backend'], tags: ['mock-interview', 'practice'] },
      { id: 'levels-fyi',    title: 'levels.fyi',                   description: 'See real salary data for product companies. Know your worth before negotiating.',    url: 'https://www.levels.fyi',                     type: 'tool',    free: true, mustKnow: true,  tracks: ['sde', 'frontend', 'backend', 'devops', 'data'], tags: ['salary', 'negotiation'] },
      { id: 'amazon-lp',     title: 'Amazon Leadership Principles', description: 'Comprehensive STAR-method guide for all 16 Amazon Leadership Principles.',           url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', type: 'guide', free: true, mustKnow: true, tracks: ['sde', 'backend'], tags: ['amazon', 'behavioral', 'lp'] },
      { id: 'gfg-exp',       title: 'GFG Interview Experiences',    description: 'Thousands of real interview experiences at Amazon, Google, Flipkart, and more.',     url: 'https://www.geeksforgeeks.org/company-interview-corner/', type: 'community', free: true, mustKnow: true, tracks: ['sde', 'frontend', 'backend'], tags: ['interview', 'experience', 'india'] },
      { id: 'lc-discuss',    title: 'LeetCode Discuss',             description: 'Company-specific questions shared by candidates after their real interviews.',       url: 'https://leetcode.com/discuss/interview-experience', type: 'community', free: true, mustKnow: true, tracks: ['sde'], tags: ['interview', 'company-specific'] },
      { id: 'devops-qs',     title: 'DevOps Interview Questions',   description: 'Top 100 DevOps interview questions covering Docker, K8s, CI/CD, AWS, and Linux.',   url: 'https://www.simplilearn.com/tutorials/devops-tutorial/devops-interview-questions', type: 'article', free: true, mustKnow: true, tracks: ['devops'], tags: ['devops', 'interview', 'questions'] },
    ],
  },

  // ─── RESUME & LINKEDIN ─────────────────────────────────────────────────────
  {
    id: 'resume',
    label: 'Resume & LinkedIn',
    emoji: '📄',
    color: '#34d399',
    tracks: ['sde', 'frontend', 'backend', 'devops', 'data'],
    resources: [
      { id: 'jake-resume',  title: "Jake's Resume Template",       description: 'The most ATS-friendly LaTeX resume template. Used by thousands of SWEs worldwide.',  url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs', type: 'template', free: true, mustKnow: true, tracks: ['sde', 'frontend', 'backend', 'devops', 'data'], tags: ['resume', 'template', 'ats'] },
      { id: 'rxresu',       title: 'RxResume (Free Builder)',       description: 'Open-source, privacy-friendly resume builder. Clean templates, no sign-up.',        url: 'https://rxresu.me',                          type: 'tool',     free: true, mustKnow: false, tracks: ['sde', 'frontend', 'backend', 'devops', 'data'], tags: ['resume', 'builder', 'free'] },
      { id: 'github-badge', title: 'GitHub Profile README',        description: 'Make your GitHub profile stand out. Recruiters check GitHub for all tech roles.',    url: 'https://rahuldkjain.github.io/gh-profile-readme-generator/', type: 'tool', free: true, mustKnow: false, tracks: ['sde', 'frontend', 'backend', 'devops'], tags: ['github', 'profile', 'portfolio'] },
    ],
  },

  // ─── FREE BOOKS & COURSES ──────────────────────────────────────────────────
  {
    id: 'books-courses',
    label: 'Free Books & Courses',
    emoji: '📚',
    color: '#f97316',
    tracks: ['sde', 'devops', 'data'],
    resources: [
      { id: 'cs50',          title: 'Harvard CS50 (Free on edX)',    description: 'The best intro CS course ever made. C, Python, SQL, and web development.',         url: 'https://cs50.harvard.edu/x/',                type: 'platform', free: true, mustKnow: false, tracks: ['sde'],           tags: ['fundamentals', 'course', 'beginner'] },
      { id: 'pro-git',       title: 'Pro Git Book (Free)',           description: 'Official free Git book. Master Git for professional development.',                  url: 'https://git-scm.com/book/en/v2',             type: 'website', free: true, mustKnow: false, tracks: ['sde', 'devops'],  tags: ['git', 'tools', 'professional'] },
      { id: 'cp-handbook',   title: "CP Programmer's Handbook (PDF)",description: 'Comprehensive free e-book on competitive programming algorithms. The CP Bible.',    url: 'https://cses.fi/book/book.pdf',              type: 'website', free: true, mustKnow: false, tracks: ['sde'],           tags: ['competitive', 'book', 'algorithms'] },
      { id: 'github-student',title: 'GitHub Student Developer Pack', description: 'Free GitHub Copilot + 100+ tools if you have a student email.',                    url: 'https://education.github.com/pack',          type: 'tool',    free: true, mustKnow: true,  tracks: ['sde', 'frontend', 'backend', 'devops'], tags: ['student', 'free-perks'] },
      { id: 'mit-ocw',       title: 'MIT 6.006 — Algorithms (Free)','description': "MIT's legendary algorithms course. Free lecture videos, notes, and problem sets.", url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/', type: 'website', free: true, mustKnow: false, tracks: ['sde'], tags: ['algorithms', 'course', 'academic'] },
      { id: 'linux-book',    title: 'The Linux Command Line (Free)', description: 'Essential Linux CLI skills book by William Shotts. Free to read online.',          url: 'https://linuxcommand.org/tlcl.php',           type: 'website', free: true, mustKnow: false, tracks: ['devops'],         tags: ['linux', 'shell', 'devops'] },
    ],
  },

  // ─── COMMUNITIES ───────────────────────────────────────────────────────────
  {
    id: 'communities',
    label: 'Communities',
    emoji: '🤝',
    color: '#a78bfa',
    tracks: ['sde', 'frontend', 'backend', 'devops', 'data'],
    resources: [
      { id: 'reddit-cscareer', title: 'r/cscareerquestions',      description: '2M+ engineers discussing job search, salary, and interviews.',                      url: 'https://www.reddit.com/r/cscareerquestions/', type: 'community', free: true, mustKnow: true,  tracks: ['sde', 'frontend', 'backend'], tags: ['community', 'career'] },
      { id: 'reddit-india',    title: 'r/developersIndia',        description: 'India-specific discussions on job switching, salaries, and interview tips.',        url: 'https://www.reddit.com/r/developersIndia/',   type: 'community', free: true, mustKnow: true,  tracks: ['sde', 'frontend', 'backend', 'devops', 'data'], tags: ['community', 'india'] },
      { id: 'devops-reddit',   title: 'r/devops',                 description: 'DevOps community on Reddit. Best place for real-world Q&A and tool discussions.',   url: 'https://www.reddit.com/r/devops/',            type: 'community', free: true, mustKnow: false, tracks: ['devops'],                      tags: ['devops', 'community'] },
    ],
  },
];

// ─── FEATURED VIDEOS ─────────────────────────────────────────────────────────
// Videos are embeddable in-app via YouTube iframe.
// If any video ID seems wrong, update it here.
export const FEATURED_VIDEOS = [

  // ── SDE / DSA ──────────────────────────────────────────────────────────────
  {
    id: 'vid-dp-fcc',        videoId: 'oBt53YbR9Kk', track: 'sde',
    title: 'Dynamic Programming — Learn to Solve Algorithmic Problems',
    channel: 'freeCodeCamp.org', duration: '5h 13m',
    description: 'Complete DP course covering memoization, tabulation, and classic patterns used in FAANG interviews.',
    tags: ['dp', 'algorithms', 'faang'], mustKnow: true,
  },
  {
    id: 'vid-graph-fcc',     videoId: 'tWVWeAqZ0WU', track: 'sde',
    title: 'Graph Algorithms for Technical Interviews',
    channel: 'freeCodeCamp.org', duration: '2h 14m',
    description: 'BFS, DFS, Dijkstra, union-find. All graph algorithms you need explained with visualizations.',
    tags: ['graphs', 'bfs', 'dfs'], mustKnow: true,
  },
  {
    id: 'vid-dsa-full',      videoId: 'RBSGKlAvoiM', track: 'sde',
    title: 'Data Structures Easy to Advanced — Full Course',
    channel: 'freeCodeCamp.org', duration: '8h 2m',
    description: 'Arrays, linked lists, trees, heaps, hash tables, and graphs from scratch.',
    tags: ['dsa', 'fundamentals', 'beginner'], mustKnow: false,
  },
  {
    id: 'vid-recursion',     videoId: 'ngCos392W4w', track: 'sde',
    title: 'Recursion in Programming — Full Course',
    channel: 'freeCodeCamp.org', duration: '2h 30m',
    description: 'Master recursion from the ground up — call stack, base cases, backtracking and more.',
    tags: ['recursion', 'backtracking', 'algorithms'], mustKnow: false,
  },
  {
    id: 'vid-sd-basics',     videoId: 'quLrc3PbuIw', track: 'sde',
    title: 'System Design Concepts — Full Course',
    channel: 'freeCodeCamp.org', duration: '4h 50m',
    description: 'CAP theorem, consistent hashing, load balancing, caching — everything for senior interviews.',
    tags: ['system-design', 'hld'], mustKnow: true,
  },
  {
    id: 'vid-lld-patterns',  videoId: 'v9ejT8FO-3I', track: 'sde',
    title: 'Design Patterns in Object Oriented Programming',
    channel: 'Christopher Okhravi', duration: 'Playlist',
    description: 'In-depth GoF design patterns series. Best for LLD interview preparation.',
    tags: ['lld', 'design-patterns', 'oop'], mustKnow: false,
  },

  // ── FRONTEND ───────────────────────────────────────────────────────────────
  {
    id: 'vid-js-full',       videoId: 'jS4aFq5-91M', track: 'frontend',
    title: 'JavaScript Full Course for Beginners',
    channel: 'Dave Gray', duration: '8h 30m',
    description: 'Complete modern JavaScript from scratch — variables, functions, closures, async/await, DOM.',
    tags: ['javascript', 'beginners', 'full-course'], mustKnow: true,
  },
  {
    id: 'vid-react-full',    videoId: 'u6gSSpfsoOg', track: 'frontend',
    title: 'Full React Course 2024',
    channel: 'freeCodeCamp.org', duration: '12h',
    description: 'Complete React with hooks, context, React Router, and TanStack Query for beginners.',
    tags: ['react', 'frontend', 'full-course'], mustKnow: true,
  },
  {
    id: 'vid-typescript',    videoId: '30LWjhZzg50', track: 'frontend',
    title: 'TypeScript Full Course for Beginners',
    channel: 'Dave Gray', duration: '8h',
    description: 'Learn TypeScript from the ground up — types, interfaces, generics, and decorators.',
    tags: ['typescript', 'javascript', 'frontend'], mustKnow: false,
  },
  {
    id: 'vid-css-flexgrid',  videoId: 'phWxA89Dy94', track: 'frontend',
    title: 'CSS Flexbox & Grid — Full Course',
    channel: 'freeCodeCamp.org', duration: '2h',
    description: 'Master CSS Flexbox and Grid layouts. Essential for every frontend developer.',
    tags: ['css', 'flexbox', 'grid'], mustKnow: true,
  },

  // ── BACKEND ────────────────────────────────────────────────────────────────
  {
    id: 'vid-node-full',     videoId: 'f2EqECiTBL8', track: 'backend',
    title: 'Node.js Full Course for Beginners',
    channel: 'freeCodeCamp.org', duration: '7h',
    description: 'Complete Node.js from modules and npm to REST APIs, auth, and deployment.',
    tags: ['nodejs', 'backend', 'javascript'], mustKnow: true,
  },
  {
    id: 'vid-sql-full',      videoId: 'HXV3zeQKqGY', track: 'backend',
    title: 'SQL Tutorial — Full Database Course',
    channel: 'freeCodeCamp.org', duration: '4h 20m',
    description: 'Complete SQL from basics to advanced queries, JOINs, and stored procedures.',
    tags: ['sql', 'dbms', 'backend'], mustKnow: true,
  },
  {
    id: 'vid-redis',         videoId: 'XCsS_NVAa1g', track: 'backend',
    title: 'Redis Crash Course',
    channel: 'Traversy Media', duration: '40m',
    description: 'Quick intro to Redis — data types, pub/sub, caching patterns, Node.js integration.',
    tags: ['redis', 'caching', 'backend'], mustKnow: false,
  },

  // ── DEVOPS ─────────────────────────────────────────────────────────────────
  {
    id: 'vid-docker-fcc',    videoId: 'fqMOX6JJhGo', track: 'devops',
    title: 'Docker — Full Course for Beginners',
    channel: 'freeCodeCamp.org', duration: '2h 10m',
    description: 'Docker fundamentals — images, containers, Dockerfile, Docker Compose with hands-on examples.',
    tags: ['docker', 'containers', 'devops'], mustKnow: true,
  },
  {
    id: 'vid-k8s-nana',      videoId: 'X48VuDVv0do', track: 'devops',
    title: 'Kubernetes Tutorial for Beginners',
    channel: 'TechWorld with Nana', duration: '4h',
    description: 'The most popular K8s beginner course. Pods, deployments, services, Helm explained clearly.',
    tags: ['kubernetes', 'k8s', 'devops'], mustKnow: true,
  },
  {
    id: 'vid-devops-intro',  videoId: 'Xrgk023l4lI', track: 'devops',
    title: 'DevOps Roadmap 2024 — Step-by-step guide',
    channel: 'TechWorld with Nana', duration: '1h',
    description: 'Exact path to become a DevOps engineer — what to learn, in what order, and why.',
    tags: ['devops', 'roadmap', 'career'], mustKnow: true,
  },
  {
    id: 'vid-terraform',     videoId: 'SLB_c_ayRMo', track: 'devops',
    title: 'Terraform Course — Automate AWS Infrastructure',
    channel: 'freeCodeCamp.org', duration: '2h 30m',
    description: 'Build and manage AWS infrastructure with Terraform. State, modules, and real-world project.',
    tags: ['terraform', 'iac', 'aws'], mustKnow: true,
  },
  {
    id: 'vid-github-actions',videoId: 'R8_veQiYBjI', track: 'devops',
    title: 'GitHub Actions — Full Course',
    channel: 'TechWorld with Nana', duration: '1h 50m',
    description: 'Build real CI/CD pipelines with GitHub Actions. Workflows, jobs, runners, secrets.',
    tags: ['cicd', 'github-actions', 'automation'], mustKnow: true,
  },
  {
    id: 'vid-linux-basics',  videoId: 'ROjZy1WbCIA', track: 'devops',
    title: 'Linux Command Line Full Course',
    channel: 'freeCodeCamp.org', duration: '5h 30m',
    description: 'Master the Linux command line from absolute basics — files, permissions, networking, scripting.',
    tags: ['linux', 'bash', 'devops'], mustKnow: true,
  },
  {
    id: 'vid-aws-basics',    videoId: 'ulprqHHWlng', track: 'devops',
    title: 'AWS Certified Cloud Practitioner — Full Course',
    channel: 'freeCodeCamp.org', duration: '13h',
    description: 'Covers all core AWS services for the CLF-C02 exam and real-world cloud knowledge.',
    tags: ['aws', 'cloud', 'certification'], mustKnow: false,
  },

  // ── DATA ANALYST ───────────────────────────────────────────────────────────
  {
    id: 'vid-python-da',     videoId: 'r-uOLxNrNk8', track: 'data',
    title: 'Data Analysis with Python — Full Course',
    channel: 'freeCodeCamp.org', duration: '4h 30m',
    description: 'NumPy, Pandas, Matplotlib, Seaborn for complete data analysis from scratch.',
    tags: ['python', 'pandas', 'data'], mustKnow: true,
  },
  {
    id: 'vid-pandas',        videoId: '2uvysYbKdjM', track: 'data',
    title: 'Pandas Full Course — Python for Data Analysis',
    channel: 'Keith Galli', duration: '3h',
    description: 'Most comprehensive free Pandas tutorial. DataFrames, groupby, merge, pivot, and real-world data.',
    tags: ['pandas', 'python', 'data'], mustKnow: true,
  },
  {
    id: 'vid-sql-da',        videoId: 'HXV3zeQKqGY', track: 'data',
    title: 'SQL Full Course for Data Analysts',
    channel: 'freeCodeCamp.org', duration: '4h 20m',
    description: 'Master SQL from basics to advanced analytics — window functions, CTEs, and aggregations.',
    tags: ['sql', 'analytics', 'data'], mustKnow: true,
  },
  {
    id: 'vid-tableau',       videoId: '6xv1KvCMF1Q', track: 'data',
    title: 'Tableau Full Course for Beginners',
    channel: 'Simplilearn', duration: '8h',
    description: 'Tableau fundamentals to advanced — charts, dashboards, calculated fields, and LOD expressions.',
    tags: ['tableau', 'visualization', 'bi'], mustKnow: false,
  },
  {
    id: 'vid-stats',         videoId: 'xxpc-HPKN28', track: 'data',
    title: 'Statistics for Data Science — Full Course',
    channel: 'freeCodeCamp.org', duration: '8h',
    description: 'Probability, distributions, hypothesis testing, and regression analysis for data analysts.',
    tags: ['statistics', 'probability', 'data'], mustKnow: false,
  },
];

export const RESOURCE_TYPES = {
  platform:  { label: 'Platform',    color: '#10b981' },
  github:    { label: 'GitHub',      color: '#6366f1' },
  youtube:   { label: 'YouTube',     color: '#ec4899' },
  blog:      { label: 'Blog',        color: '#f59e0b' },
  sheet:     { label: 'Sheet',       color: '#8b5cf6' },
  tool:      { label: 'Tool',        color: '#06b6d4' },
  community: { label: 'Community',   color: '#f97316' },
  template:  { label: 'Template',    color: '#a78bfa' },
  article:   { label: 'Article',     color: '#94a3b8' },
  guide:     { label: 'Guide',       color: '#fbbf24' },
  website:   { label: 'Website',     color: '#34d399' },
};
