// ─── CAREER ROADMAPS ─────────────────────────────────────────────────────────
// resource types:
//   type: 'article' → in-app article at /learn/:slug  (green chip, no external redirect)
//   type: 'video'   → YouTube (pink chip, opens new tab)
//   type: 'doc'     → third-party article / reference (purple chip, opens new tab)

export const ROADMAPS = [
  // ─────────────────────────────────────────────────────────────────────────
  // SDE-2 PRODUCT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sde2-product',
    label: 'SDE-2 at Product Company',
    emoji: '🚀',
    track: 'sde',
    color: '#10b981',
    description: 'The complete path to crack SDE-2 at Amazon, Flipkart, Swiggy, or Zomato',
    duration: '4–6 months',
    premium: false,
    freePhases: 2,
    phases: [
      {
        id: 'foundation',
        label: 'Phase 1 — Foundation',
        weeks: '1–4',
        color: '#10b981',
        steps: [
          { id: 'setup-leetcode',   label: 'Create LeetCode account, solve 5 easy problems',
            resources: [
              { label: 'LeetCode', url: 'https://leetcode.com', type: 'doc' },
              { label: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', type: 'doc' },
            ]},
          { id: 'learn-complexity', label: 'Master Big-O analysis (time & space)',
            resources: [
              { label: 'Big-O Analysis', url: '/learn/big-o-analysis', type: 'article' },
              { label: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com', type: 'doc' },
              { label: 'Abdul Bari — Complexity', url: 'https://www.youtube.com/watch?v=9TlHvipP5yA', type: 'video' },
            ]},
          { id: 'arrays-basics',   label: 'Complete Arrays & Strings section in DSA tracker',
            resources: [
              { label: 'Arrays & Strings Guide', url: '/learn/arrays-and-strings-dsa', type: 'article' },
              { label: 'NeetCode Arrays', url: 'https://neetcode.io/courses/dsa-for-beginners/2', type: 'doc' },
              { label: 'Striver Arrays Playlist', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0rENwdL0nEH0uGom9no0nyB', type: 'video' },
            ]},
          { id: 'first-20',        label: 'Solve first 20 LeetCode Easy problems',
            resources: [
              { label: 'LeetCode', url: 'https://leetcode.com', type: 'doc' },
              { label: 'Blind 75 Easy List', url: 'https://leetcode.com/discuss/general-discussion/460599', type: 'doc' },
            ]},
          { id: 'cs-fundamentals', label: 'Revise OS basics: processes, threads, memory',
            resources: [
              { label: 'OS Fundamentals', url: '/learn/os-basics-for-interviews', type: 'article' },
              { label: 'GFG OS Notes', url: 'https://www.geeksforgeeks.org/operating-systems/', type: 'doc' },
              { label: 'Neso Academy — OS', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O', type: 'video' },
            ]},
          { id: 'git-basics',      label: 'Get comfortable with Git: branch, merge, rebase',
            resources: [
              { label: 'Git Mastery Guide', url: '/learn/git-fundamentals', type: 'article' },
              { label: 'Pro Git Book (free)', url: 'https://git-scm.com/book/en/v2', type: 'doc' },
              { label: 'Atlassian Git Tutorial', url: 'https://www.atlassian.com/git/tutorials', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'core-dsa',
        label: 'Phase 2 — Core DSA',
        weeks: '5–10',
        color: '#6366f1',
        steps: [
          { id: 'binary-search-done', label: 'Complete Binary Search section (all 7 topics)',
            resources: [
              { label: 'Binary Search Patterns', url: '/learn/binary-search-patterns', type: 'article' },
              { label: 'NeetCode Binary Search', url: 'https://neetcode.io/courses/dsa-for-beginners/7', type: 'doc' },
              { label: 'Striver Binary Search', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h34Z', type: 'video' },
            ]},
          { id: 'linked-list-done', label: 'Complete Linked Lists section',
            resources: [
              { label: 'Linked Lists Guide', url: '/learn/linked-lists-dsa', type: 'article' },
              { label: 'NeetCode Linked List', url: 'https://neetcode.io/courses/dsa-for-beginners/5', type: 'doc' },
              { label: 'Striver Linked List', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0r47RKH7m6P9VDiEWfFMQkT', type: 'video' },
            ]},
          { id: 'trees-done',       label: 'Complete Trees & BST section',
            resources: [
              { label: 'Trees & BST Guide', url: '/learn/trees-and-bst', type: 'article' },
              { label: 'NeetCode Trees', url: 'https://neetcode.io/courses/dsa-for-beginners/10', type: 'doc' },
              { label: 'Striver Trees Playlist', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk', type: 'video' },
            ]},
          { id: 'solve-50',         label: 'Reach 50 LeetCode problems solved',
            resources: [
              { label: 'LeetCode Patterns', url: 'https://seanprashad.com/leetcode-patterns/', type: 'doc' },
            ]},
          { id: 'stack-queue-done', label: 'Complete Stack, Queue & Heap section',
            resources: [
              { label: 'Stacks, Queues & Heaps', url: '/learn/stacks-queues-heaps', type: 'article' },
              { label: 'NeetCode Stack', url: 'https://neetcode.io/courses/dsa-for-beginners/8', type: 'doc' },
              { label: 'Striver Stack & Queue', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0pOd5zvvVtbwqM-qICmkwhF', type: 'video' },
            ]},
          { id: 'hashing-done',     label: 'Complete Hashing & Sorting section',
            resources: [
              { label: 'Hashing & Sorting', url: '/learn/hashing-and-sorting', type: 'article' },
              { label: 'NeetCode Hashing', url: 'https://neetcode.io/courses/dsa-for-beginners/6', type: 'doc' },
              { label: 'Sorting Visualized', url: 'https://visualgo.net/en/sorting', type: 'doc' },
            ]},
          { id: 'mock-interviews',  label: 'Do 5 mock interviews on Pramp / interviewing.io',
            resources: [
              { label: 'Pramp (free mocks)', url: 'https://www.pramp.com', type: 'doc' },
              { label: 'interviewing.io', url: 'https://interviewing.io', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'advanced-dsa',
        label: 'Phase 3 — Advanced DSA',
        weeks: '11–16',
        color: '#8b5cf6',
        steps: [
          { id: 'graphs-done',    label: 'Complete Graphs section',
            resources: [
              { label: 'Graph Algorithms Guide', url: '/learn/graphs-algorithms', type: 'article' },
              { label: 'William Fiset — Graph Theory', url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P', type: 'video' },
              { label: 'Striver Graphs', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn', type: 'video' },
            ]},
          { id: 'dp-done',        label: 'Complete Dynamic Programming section',
            resources: [
              { label: 'DP From Confusion to Clarity', url: '/learn/dynamic-programming-guide', type: 'article' },
              { label: 'Striver DP Playlist', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY', type: 'video' },
              { label: 'Aditya Verma DP', url: 'https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go', type: 'video' },
            ]},
          { id: 'backtrack-done', label: 'Complete Backtracking section',
            resources: [
              { label: 'Backtracking Guide', url: '/learn/backtracking-guide', type: 'article' },
              { label: 'NeetCode Backtracking', url: 'https://neetcode.io/courses/advanced-algorithms/5', type: 'doc' },
              { label: 'Striver Backtracking', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma', type: 'video' },
            ]},
          { id: 'solve-150',      label: 'Reach 150 LeetCode problems solved',
            resources: [
              { label: 'NeetCode 150 List', url: 'https://neetcode.io/practice', type: 'doc' },
            ]},
          { id: 'contest-5',      label: 'Participate in 5 LeetCode weekly contests',
            resources: [
              { label: 'LeetCode Contests', url: 'https://leetcode.com/contest/', type: 'doc' },
            ]},
          { id: 'company-wise',   label: 'Solve Amazon/Flipkart tagged problems on LeetCode',
            resources: [
              { label: 'LeetCode Company Filter', url: 'https://leetcode.com/problemset/all/', type: 'doc' },
              { label: 'GFG Company-wise Problems', url: 'https://www.geeksforgeeks.org/must-coding-questions-company-wise/', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'interviews',
        label: 'Phase 4 — Interview Readiness',
        weeks: '17–20',
        color: '#f59e0b',
        steps: [
          { id: 'resume-update',   label: 'Update resume with impact numbers (not just duties)',
            resources: [
              { label: 'Resume for Product Companies', url: '/learn/resume-for-product-companies', type: 'article' },
              { label: 'Tech Interview Handbook Resume', url: 'https://www.techinterviewhandbook.org/resume/', type: 'doc' },
              { label: 'resume.io Templates', url: 'https://resume.io', type: 'doc' },
            ]},
          { id: 'sd-basics',       label: 'Learn System Design basics (HLD)',
            resources: [
              { label: 'System Design Basics', url: '/learn/system-design-basics-hld', type: 'article' },
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
              { label: 'ByteByteGo Blog', url: 'https://blog.bytebytego.com', type: 'doc' },
            ]},
          { id: 'behavioral-prep', label: 'Prepare STAR-format stories for 10 behavioral questions',
            resources: [
              { label: 'STAR Method Guide', url: '/learn/star-method-behavioral', type: 'article' },
              { label: 'Amazon LP Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', type: 'doc' },
            ]},
          { id: 'apply-10',        label: 'Apply to 10 companies via LinkedIn / Naukri',
            resources: [
              { label: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', type: 'doc' },
              { label: 'Naukri.com', url: 'https://www.naukri.com', type: 'doc' },
            ]},
          { id: 'referrals',       label: 'Get 3+ referrals from alumni at product companies',
            resources: [
              { label: 'How to Get Referrals', url: '/learn/how-to-get-referrals', type: 'article' },
              { label: 'LinkedIn Alumni Search', url: 'https://www.linkedin.com/school/search/', type: 'doc' },
            ]},
          { id: 'offer',           label: '🎉 Land the offer!', resources: [] },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FRONTEND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'frontend-specialist',
    label: 'Frontend Engineer',
    emoji: '🎨',
    track: 'frontend',
    color: '#ec4899',
    description: 'Become a frontend specialist — React, performance, and system design',
    duration: '3–5 months',
    premium: false,
    freePhases: 2,
    phases: [
      {
        id: 'js-mastery',
        label: 'Phase 1 — JavaScript Mastery',
        weeks: '1–4',
        color: '#ec4899',
        steps: [
          { id: 'js-closures',  label: 'Deeply understand closures, scope, hoisting',
            resources: [
              { label: 'Closures, Scope & Hoisting', url: '/learn/js-closures-scope', type: 'article' },
              { label: 'javascript.info Closures', url: 'https://javascript.info/closure', type: 'doc' },
              { label: 'Fireship — JS Closures', url: 'https://www.youtube.com/watch?v=vKJpN5FAeF4', type: 'video' },
            ]},
          { id: 'js-async',     label: 'Master Promises, async/await, event loop',
            resources: [
              { label: 'Promises, Async/Await & Event Loop', url: '/learn/js-async-await-event-loop', type: 'article' },
              { label: 'javascript.info Promises', url: 'https://javascript.info/promise-basics', type: 'doc' },
              { label: 'Fireship — Event Loop', url: 'https://www.youtube.com/watch?v=eiC58R16hb8', type: 'video' },
            ]},
          { id: 'js-prototype', label: 'Understand prototypal inheritance & this keyword',
            resources: [
              { label: 'Prototypal Inheritance & this', url: '/learn/js-prototypal-inheritance', type: 'article' },
              { label: 'javascript.info Prototypes', url: 'https://javascript.info/prototypes', type: 'doc' },
              { label: "You Don't Know JS (free)", url: 'https://github.com/getify/You-Dont-Know-JS', type: 'doc' },
            ]},
          { id: 'es6-plus',     label: 'Destructuring, spread, modules, optional chaining',
            resources: [
              { label: 'ES6+ Modern JavaScript', url: '/learn/es6-modern-javascript', type: 'article' },
              { label: 'ES6+ Features Guide', url: 'https://javascript.info/es-modern', type: 'doc' },
              { label: 'Dave Gray — ES6 Full Course', url: 'https://www.youtube.com/watch?v=nZ1DMMsyVyI', type: 'video' },
            ]},
          { id: 'dom-apis',     label: 'Practice DOM manipulation without frameworks',
            resources: [
              { label: 'DOM Manipulation Guide', url: '/learn/dom-manipulation-guide', type: 'article' },
              { label: 'MDN DOM Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', type: 'doc' },
              { label: 'Traversy Media — DOM Crash Course', url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc', type: 'video' },
            ]},
        ],
      },
      {
        id: 'react-advanced',
        label: 'Phase 2 — React Deep Dive',
        weeks: '5–9',
        color: '#6366f1',
        steps: [
          { id: 'react-hooks',      label: 'Master all hooks: useState, useEffect, useRef, useMemo, useCallback',
            resources: [
              { label: 'React Hooks Complete Guide', url: '/learn/react-hooks-guide', type: 'article' },
              { label: 'React Docs — Hooks', url: 'https://react.dev/reference/react', type: 'doc' },
              { label: 'Codevolution — React Hooks', url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A', type: 'video' },
            ]},
          { id: 'react-patterns',   label: 'Learn compound components, render props, HOC patterns',
            resources: [
              { label: 'React Design Patterns', url: '/learn/react-design-patterns', type: 'article' },
              { label: 'Kent C. Dodds Patterns', url: 'https://kentcdodds.com/blog/compound-components-with-react-hooks', type: 'doc' },
              { label: 'Patterns.dev (free)', url: 'https://www.patterns.dev', type: 'doc' },
            ]},
          { id: 'state-mgmt',       label: 'Learn Redux Toolkit or Zustand for state management',
            resources: [
              { label: 'Redux Toolkit Docs', url: 'https://redux-toolkit.js.org/introduction/getting-started', type: 'doc' },
              { label: 'Zustand Docs', url: 'https://zustand-demo.pmnd.rs', type: 'doc' },
            ]},
          { id: 'react-query',      label: 'Use TanStack Query for data fetching & caching',
            resources: [
              { label: 'TanStack Query Docs', url: 'https://tanstack.com/query/latest', type: 'doc' },
              { label: 'Codevolution — React Query', url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2', type: 'video' },
            ]},
          { id: 'build-3-projects', label: 'Build 3 portfolio projects (not todo apps!)',
            resources: [
              { label: 'Frontend Mentor Challenges', url: 'https://www.frontendmentor.io/challenges', type: 'doc' },
              { label: 'JavaScript30', url: 'https://javascript30.com', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'performance',
        label: 'Phase 3 — Performance & Browser',
        weeks: '10–14',
        color: '#10b981',
        steps: [
          { id: 'core-web-vitals', label: 'Learn Core Web Vitals: LCP, CLS, FID/INP',
            resources: [
              { label: 'Core Web Vitals Guide', url: '/learn/core-web-vitals-guide', type: 'article' },
              { label: 'web.dev Core Web Vitals', url: 'https://web.dev/articles/vitals', type: 'doc' },
              { label: 'Google CWV Explainer', url: 'https://www.youtube.com/watch?v=AQqFZ5t8uNc', type: 'video' },
            ]},
          { id: 'lazy-loading',    label: 'Implement lazy loading, code splitting, tree shaking',
            resources: [
              { label: 'web.dev Lazy Loading', url: 'https://web.dev/articles/lazy-loading', type: 'doc' },
              { label: 'Vite Code Splitting', url: 'https://vitejs.dev/guide/build.html', type: 'doc' },
            ]},
          { id: 'browser-render',  label: 'Understand critical rendering path',
            resources: [
              { label: 'Critical Rendering Path', url: '/learn/critical-rendering-path', type: 'article' },
              { label: 'web.dev Rendering Path', url: 'https://web.dev/articles/critical-rendering-path', type: 'doc' },
              { label: 'Browser Rendering — Fireship', url: 'https://www.youtube.com/watch?v=SmE4OwHztCc', type: 'video' },
            ]},
          { id: 'lighthouse',      label: 'Get a Lighthouse score of 90+ on your projects',
            resources: [
              { label: 'Lighthouse Docs', url: 'https://developer.chrome.com/docs/lighthouse/overview/', type: 'doc' },
            ]},
          { id: 'typescript',      label: 'Add TypeScript to at least one project',
            resources: [
              { label: 'TypeScript for JS Devs', url: '/learn/typescript-for-js-devs', type: 'article' },
              { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', type: 'doc' },
              { label: 'Matt Pocock — TypeScript Tutorial', url: 'https://www.youtube.com/watch?v=30LWjhZzg50', type: 'video' },
            ]},
        ],
      },
      {
        id: 'fe-interviews',
        label: 'Phase 4 — Frontend Interview Prep',
        weeks: '15–18',
        color: '#f59e0b',
        steps: [
          { id: 'machine-coding',   label: 'Practice 20 machine coding problems',
            resources: [
              { label: 'GreatFrontEnd', url: 'https://www.greatfrontend.com/questions/javascript', type: 'doc' },
              { label: 'BFE.dev', url: 'https://bigfrontend.dev', type: 'doc' },
            ]},
          { id: 'fe-system-design', label: 'Frontend system design: component libraries, micro-frontends',
            resources: [
              { label: 'Frontend System Design', url: '/learn/frontend-system-design-guide', type: 'article' },
              { label: 'Frontend Interview Handbook', url: 'https://www.frontendinterviewhandbook.com/front-end-system-design/', type: 'doc' },
            ]},
          { id: 'lld-practice',     label: 'Design Typeahead, Infinite Scroll, Drag-Drop component',
            resources: [
              { label: 'GreatFrontEnd UI Components', url: 'https://www.greatfrontend.com/questions/ui', type: 'doc' },
            ]},
          { id: 'dsa-frontend',     label: 'Solve 80+ LeetCode problems (JS focus)',
            resources: [
              { label: 'LeetCode JS Study Plan', url: 'https://leetcode.com/studyplan/30-days-of-javascript/', type: 'doc' },
            ]},
          { id: 'fe-offer',         label: '🎉 Get that frontend role!', resources: [] },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BACKEND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'backend-specialist',
    label: 'Backend Engineer',
    emoji: '⚙️',
    track: 'backend',
    color: '#6366f1',
    description: 'Build robust backend systems — APIs, databases, and microservices',
    duration: '4–6 months',
    premium: false,
    freePhases: 2,
    phases: [
      {
        id: 'backend-foundation',
        label: 'Phase 1 — Backend Foundation',
        weeks: '1–4',
        color: '#6366f1',
        steps: [
          { id: 'http-rest',      label: 'Master HTTP methods, status codes, REST principles',
            resources: [
              { label: 'HTTP & REST APIs', url: '/learn/http-and-rest-apis', type: 'article' },
              { label: 'MDN HTTP Overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', type: 'doc' },
              { label: 'Traversy Media — HTTP Crash Course', url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0', type: 'video' },
            ]},
          { id: 'node-or-java',   label: 'Pick Node.js or Java Spring Boot and get comfortable',
            resources: [
              { label: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs', type: 'doc' },
              { label: 'Spring Boot — freeCodeCamp', url: 'https://www.youtube.com/watch?v=vtPkZShrvXQ', type: 'video' },
            ]},
          { id: 'build-crud-api', label: 'Build a CRUD REST API with authentication',
            resources: [
              { label: 'Traversy Media — REST API', url: 'https://www.youtube.com/watch?v=l8WPWK9mS5M', type: 'video' },
            ]},
          { id: 'sql-basics',     label: 'Write complex SQL: JOINs, subqueries, indexes, EXPLAIN',
            resources: [
              { label: 'SQL Mastery Guide', url: '/learn/sql-fundamentals-guide', type: 'article' },
              { label: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'doc' },
              { label: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com', type: 'doc' },
            ]},
          { id: 'auth-jwt',       label: 'Implement JWT auth with refresh tokens',
            resources: [
              { label: 'JWT Authentication Guide', url: '/learn/jwt-authentication-guide', type: 'article' },
              { label: 'JWT.io Introduction', url: 'https://jwt.io/introduction', type: 'doc' },
              { label: 'Auth0 — JWT Guide', url: 'https://auth0.com/learn/json-web-tokens', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'databases',
        label: 'Phase 2 — Databases & Caching',
        weeks: '5–9',
        color: '#10b981',
        steps: [
          { id: 'sql-advanced', label: 'Learn transactions, ACID, isolation levels',
            resources: [
              { label: 'ACID Transactions Guide', url: '/learn/acid-transactions-guide', type: 'article' },
              { label: 'Use The Index, Luke', url: 'https://use-the-index-luke.com', type: 'doc' },
              { label: 'PostgreSQL Transactions Docs', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html', type: 'doc' },
            ]},
          { id: 'nosql',        label: 'Understand MongoDB or DynamoDB for document storage',
            resources: [
              { label: 'NoSQL & MongoDB Guide', url: '/learn/nosql-mongodb-guide', type: 'article' },
              { label: 'MongoDB University (free)', url: 'https://learn.mongodb.com', type: 'doc' },
              { label: 'Fireship — MongoDB in 100s', url: 'https://www.youtube.com/watch?v=-bt_y4Loofg', type: 'video' },
            ]},
          { id: 'redis',        label: 'Use Redis for caching, rate limiting, sessions',
            resources: [
              { label: 'Redis Caching Guide', url: '/learn/redis-caching-guide', type: 'article' },
              { label: 'Redis Official Docs', url: 'https://redis.io/docs/', type: 'doc' },
              { label: 'Fireship — Redis Explained', url: 'https://www.youtube.com/watch?v=G1rOthIU-uo', type: 'video' },
            ]},
          { id: 'db-design',    label: 'Design 3 real-world database schemas',
            resources: [
              { label: 'DB Diagram (free tool)', url: 'https://dbdiagram.io', type: 'doc' },
              { label: 'freeCodeCamp — DB Design', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', type: 'video' },
            ]},
          { id: 'orm',          label: 'Use Prisma, Hibernate, or TypeORM — understand N+1 problem',
            resources: [
              { label: 'ORMs & the N+1 Problem', url: '/learn/orm-and-n-plus-1', type: 'article' },
              { label: 'Prisma Docs', url: 'https://www.prisma.io/docs/', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'system-thinking',
        label: 'Phase 3 — System Thinking',
        weeks: '10–16',
        color: '#8b5cf6',
        steps: [
          { id: 'microservices',  label: 'Understand microservices vs monolith trade-offs',
            resources: [
              { label: 'Microservices vs Monolith', url: '/learn/microservices-vs-monolith', type: 'article' },
              { label: 'Martin Fowler — Microservices', url: 'https://martinfowler.com/articles/microservices.html', type: 'doc' },
              { label: 'TechWorld Nana — Microservices', url: 'https://www.youtube.com/watch?v=CdBtNQZH8a4', type: 'video' },
            ]},
          { id: 'message-queues', label: 'Learn Kafka or RabbitMQ for async processing',
            resources: [
              { label: 'Message Queues & Kafka', url: '/learn/message-queues-kafka-guide', type: 'article' },
              { label: 'Confluent Kafka Tutorials', url: 'https://developer.confluent.io/courses/', type: 'doc' },
              { label: 'Fireship — Kafka in 100s', url: 'https://www.youtube.com/watch?v=uvb00oaa3k8', type: 'video' },
            ]},
          { id: 'docker-be',      label: 'Dockerize your applications',
            resources: [
              { label: 'Docker Fundamentals', url: '/learn/docker-containers-guide', type: 'article' },
              { label: 'Docker Official Docs', url: 'https://docs.docker.com/get-started/', type: 'doc' },
              { label: 'TechWorld Nana — Docker Tutorial', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'video' },
            ]},
          { id: 'monitoring',     label: 'Set up logging and monitoring (Prometheus / Grafana basics)',
            resources: [
              { label: 'Prometheus Monitoring Guide', url: '/learn/prometheus-monitoring-guide', type: 'article' },
              { label: 'Grafana Getting Started', url: 'https://grafana.com/docs/grafana/latest/getting-started/', type: 'doc' },
            ]},
          { id: 'sd-30',          label: 'Study 30 system design questions',
            resources: [
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
              { label: 'ByteByteGo Newsletter', url: 'https://blog.bytebytego.com', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'be-interviews',
        label: 'Phase 4 — Interview Prep',
        weeks: '17–20',
        color: '#f59e0b',
        steps: [
          { id: 'dsa-150-be', label: 'Solve 150+ LeetCode problems (focus on graphs, DP)',
            resources: [
              { label: 'NeetCode 150', url: 'https://neetcode.io/practice', type: 'doc' },
              { label: 'Striver A2Z Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2', type: 'doc' },
            ]},
          { id: 'lld-be',     label: 'Design: Parking Lot, Cab Booking, Rate Limiter',
            resources: [
              { label: 'awesome-low-level-design', url: 'https://github.com/ashishps1/awesome-low-level-design', type: 'doc' },
            ]},
          { id: 'hld-be',     label: 'Design: URL Shortener, Twitter Feed, Uber',
            resources: [
              { label: 'Design a URL Shortener', url: '/learn/design-url-shortener', type: 'article' },
              { label: 'Design Uber', url: '/learn/design-uber', type: 'article' },
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
            ]},
          { id: 'be-offer',   label: '🎉 Land your backend role!', resources: [] },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DEVOPS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'devops',
    label: 'DevOps Engineer',
    emoji: '🔧',
    track: 'devops',
    color: '#f97316',
    description: 'From zero to job-ready DevOps engineer — Linux, Docker, K8s, AWS, Terraform, CI/CD',
    duration: '6–8 months',
    premium: false,
    freePhases: 2,
    phases: [
      {
        id: 'devops-linux',
        label: 'Phase 1 — Linux & Networking Fundamentals',
        weeks: '1–4',
        color: '#f97316',
        steps: [
          { id: 'linux-cli',      label: 'Master Linux CLI: ls, grep, find, awk, sed, pipes',
            resources: [
              { label: 'Linux CLI Mastery', url: '/learn/linux-command-line', type: 'article' },
              { label: 'Linux Journey', url: 'https://linuxjourney.com', type: 'doc' },
              { label: 'NetworkChuck — Linux for Hackers', url: 'https://www.youtube.com/watch?v=VbEx7B_PTOE', type: 'video' },
            ]},
          { id: 'linux-fs',       label: 'Understand Linux file system hierarchy (/, /etc, /var, /proc)',
            resources: [
              { label: 'Linux Filesystem Hierarchy', url: '/learn/linux-filesystem-hierarchy', type: 'article' },
              { label: 'Linux FHS Standard', url: 'https://www.pathname.com/fhs/', type: 'doc' },
              { label: 'TechHut — Linux File System', url: 'https://www.youtube.com/watch?v=HbgzrKJvDRw', type: 'video' },
            ]},
          { id: 'linux-perms',    label: 'File permissions: chmod, chown, sudo, users & groups',
            resources: [
              { label: 'Linux File Permissions', url: '/learn/linux-file-permissions', type: 'article' },
              { label: 'chmod Calculator', url: 'https://chmod-calculator.com', type: 'doc' },
            ]},
          { id: 'bash-scripting', label: 'Write bash scripts: variables, loops, conditionals, functions',
            resources: [
              { label: 'Bash Scripting Guide', url: '/learn/bash-scripting-guide', type: 'article' },
              { label: 'Bash Scripting Tutorial', url: 'https://ryanstutorials.net/bash-scripting-tutorial/', type: 'doc' },
              { label: 'freeCodeCamp — Bash Scripting', url: 'https://www.youtube.com/watch?v=tK9Oc6AEnR4', type: 'video' },
            ]},
          { id: 'cron-jobs',      label: 'Schedule tasks with cron and systemd timers',
            resources: [
              { label: 'Crontab Guru', url: 'https://crontab.guru', type: 'doc' },
              { label: 'DigitalOcean — systemd Guide', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units', type: 'doc' },
            ]},
          { id: 'ssh-keys',       label: 'SSH: key-based auth, port forwarding, config file',
            resources: [
              { label: 'SSH Guide', url: '/learn/ssh-guide', type: 'article' },
              { label: 'SSH Academy', url: 'https://www.ssh.com/academy/ssh', type: 'doc' },
            ]},
          { id: 'networking-101', label: 'Networking: TCP/IP, DNS, HTTP/HTTPS, ports, firewalls',
            resources: [
              { label: 'Networking Fundamentals', url: '/learn/networking-fundamentals-devops', type: 'article' },
              { label: 'How DNS Works', url: 'https://howdns.works', type: 'doc' },
              { label: 'NetworkChuck — Free CCNA', url: 'https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P', type: 'video' },
            ]},
          { id: 'process-mgmt',   label: 'Process management: ps, top, kill, systemctl, journalctl',
            resources: [
              { label: 'DigitalOcean — Process Management', url: 'https://www.digitalocean.com/community/tutorials/process-management-in-linux', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'devops-vcs-cicd',
        label: 'Phase 2 — Git & CI/CD Basics',
        weeks: '5–8',
        color: '#6366f1',
        steps: [
          { id: 'git-advanced',   label: 'Git: branching strategies, GitFlow, rebasing, cherry-pick',
            resources: [
              { label: 'Git Mastery Guide', url: '/learn/git-fundamentals', type: 'article' },
              { label: 'Pro Git Book (free)', url: 'https://git-scm.com/book/en/v2', type: 'doc' },
              { label: 'Atlassian GitFlow Guide', url: 'https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow', type: 'doc' },
            ]},
          { id: 'github-actions', label: 'Build CI/CD pipeline with GitHub Actions (lint, test, deploy)',
            resources: [
              { label: 'GitHub Actions CI/CD', url: '/learn/github-actions-cicd', type: 'article' },
              { label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', type: 'doc' },
              { label: 'TechWorld Nana — GitHub Actions', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', type: 'video' },
            ]},
          { id: 'jenkins-basics', label: 'Set up Jenkins, create a declarative pipeline (Jenkinsfile)',
            resources: [
              { label: 'Jenkins Official Docs', url: 'https://www.jenkins.io/doc/tutorials/', type: 'doc' },
              { label: 'TechWorld Nana — Jenkins', url: 'https://www.youtube.com/watch?v=pMO26j2OUME', type: 'video' },
            ]},
          { id: 'gitlab-cicd',    label: 'Understand GitLab CI/CD .gitlab-ci.yml structure',
            resources: [
              { label: 'GitLab CI/CD Docs', url: 'https://docs.gitlab.com/ee/ci/', type: 'doc' },
            ]},
          { id: 'sonarqube',      label: 'Integrate code quality checks with SonarQube',
            resources: [
              { label: 'SonarQube Docs', url: 'https://docs.sonarsource.com/sonarqube/latest/', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'devops-containers',
        label: 'Phase 3 — Docker & Containerization',
        weeks: '9–12',
        color: '#06b6d4',
        steps: [
          { id: 'docker-basics',   label: 'Docker: images, containers, Dockerfile best practices',
            resources: [
              { label: 'Docker Fundamentals', url: '/learn/docker-containers-guide', type: 'article' },
              { label: 'Docker Official Docs', url: 'https://docs.docker.com/get-started/', type: 'doc' },
              { label: 'TechWorld Nana — Docker Full Course', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'video' },
            ]},
          { id: 'docker-compose',  label: 'Docker Compose: multi-container apps, networks, volumes',
            resources: [
              { label: 'Docker Compose Guide', url: '/learn/docker-compose-guide', type: 'article' },
              { label: 'Docker Compose Docs', url: 'https://docs.docker.com/compose/', type: 'doc' },
            ]},
          { id: 'docker-registry', label: 'Push/pull images: Docker Hub, AWS ECR, GitHub Packages',
            resources: [
              { label: 'Docker Hub Guide', url: 'https://docs.docker.com/docker-hub/', type: 'doc' },
              { label: 'AWS ECR Docs', url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html', type: 'doc' },
            ]},
          { id: 'docker-security', label: 'Container security: non-root users, image scanning, secrets',
            resources: [
              { label: 'Docker Security Best Practices', url: 'https://docs.docker.com/develop/security-best-practices/', type: 'doc' },
            ]},
          { id: 'docker-project',  label: 'Containerize a full-stack app (frontend + backend + DB)',
            resources: [
              { label: 'Docker Compose Samples', url: 'https://docs.docker.com/samples/', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'devops-kubernetes',
        label: 'Phase 4 — Kubernetes (K8s)',
        weeks: '13–18',
        color: '#3b82f6',
        steps: [
          { id: 'k8s-core',       label: 'K8s architecture: nodes, pods, deployments, services, ingress',
            resources: [
              { label: 'Kubernetes Architecture', url: '/learn/kubernetes-architecture', type: 'article' },
              { label: 'Kubernetes Official Docs', url: 'https://kubernetes.io/docs/home/', type: 'doc' },
              { label: 'TechWorld Nana — Kubernetes Full Course', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'video' },
            ]},
          { id: 'k8s-config',     label: 'ConfigMaps, Secrets, PersistentVolumes, PVCs',
            resources: [
              { label: 'K8s ConfigMaps Docs', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/', type: 'doc' },
              { label: 'K8s Secrets Docs', url: 'https://kubernetes.io/docs/concepts/configuration/secret/', type: 'doc' },
            ]},
          { id: 'k8s-scaling',    label: 'HPA, VPA, resource limits, node affinity',
            resources: [
              { label: 'Kubernetes Scaling Guide', url: '/learn/kubernetes-scaling', type: 'article' },
              { label: 'K8s HPA Docs', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/', type: 'doc' },
            ]},
          { id: 'k8s-networking', label: 'K8s networking: CNI plugins, NetworkPolicy, DNS',
            resources: [
              { label: 'K8s Networking Docs', url: 'https://kubernetes.io/docs/concepts/services-networking/', type: 'doc' },
              { label: 'Kubernetes Networking — TechWorld Nana', url: 'https://www.youtube.com/watch?v=5cNrTU6o3Fw', type: 'video' },
            ]},
          { id: 'helm-charts',    label: 'Package apps with Helm: charts, values, templating',
            resources: [
              { label: 'Helm Official Docs', url: 'https://helm.sh/docs/', type: 'doc' },
              { label: 'TechWorld Nana — Helm', url: 'https://www.youtube.com/watch?v=-ykwb1d0DXU', type: 'video' },
            ]},
          { id: 'k8s-debug',      label: 'Troubleshooting K8s: kubectl logs, exec, describe, events',
            resources: [
              { label: 'kubectl Cheat Sheet', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/', type: 'doc' },
            ]},
          { id: 'k8s-project',    label: 'Deploy a microservices app on Kubernetes (minikube or kind)',
            resources: [
              { label: 'Play with Kubernetes', url: 'https://labs.play-with-k8s.com', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'devops-cloud',
        label: 'Phase 5 — Cloud (AWS)',
        weeks: '19–24',
        color: '#f59e0b',
        steps: [
          { id: 'aws-core',       label: 'AWS core: EC2, S3, RDS, VPC, IAM, Security Groups',
            resources: [
              { label: 'AWS Free Tier', url: 'https://aws.amazon.com/free/', type: 'doc' },
              { label: 'freeCodeCamp — AWS CCP Course', url: 'https://www.youtube.com/watch?v=NhDYbskXRgc', type: 'video' },
            ]},
          { id: 'aws-networking', label: 'VPC deep dive: subnets, NAT gateway, route tables, peering',
            resources: [
              { label: 'AWS VPC Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html', type: 'doc' },
              { label: 'VPC Explained — Be A Better Dev', url: 'https://www.youtube.com/watch?v=7_NNlnH7sAg', type: 'video' },
            ]},
          { id: 'aws-compute',    label: 'ECS, EKS, Lambda, Auto Scaling Groups, Load Balancers',
            resources: [
              { label: 'AWS ECS Docs', url: 'https://docs.aws.amazon.com/ecs/latest/developerguide/Welcome.html', type: 'doc' },
              { label: 'AWS Lambda Docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html', type: 'doc' },
            ]},
          { id: 'aws-storage',    label: 'S3 policies, EBS, EFS, RDS Multi-AZ vs Read Replicas',
            resources: [
              { label: 'AWS S3 Docs', url: 'https://docs.aws.amazon.com/s3/index.html', type: 'doc' },
              { label: 'AWS RDS Docs', url: 'https://docs.aws.amazon.com/rds/', type: 'doc' },
            ]},
          { id: 'aws-serverless', label: 'Serverless: Lambda + API Gateway + DynamoDB stack',
            resources: [
              { label: 'Serverless Framework Docs', url: 'https://www.serverless.com/framework/docs/', type: 'doc' },
              { label: 'AWS Serverless — freeCodeCamp', url: 'https://www.youtube.com/watch?v=eOBq__h4OJ4', type: 'video' },
            ]},
          { id: 'aws-ccp',        label: 'Pass AWS Cloud Practitioner (CLF-C02) certification',
            resources: [
              { label: 'AWS CCP Exam Guide', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', type: 'doc' },
              { label: 'Andrew Brown — AWS CCP Free Course', url: 'https://www.youtube.com/watch?v=NhDYbskXRgc', type: 'video' },
            ]},
          { id: 'aws-saa',        label: 'Study for AWS Solutions Architect Associate (SAA-C03)',
            resources: [
              { label: 'AWS SAA Exam Guide', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', type: 'doc' },
              { label: 'freeCodeCamp — AWS SAA Course', url: 'https://www.youtube.com/watch?v=c3Cn4xYfxJY', type: 'video' },
            ]},
        ],
      },
      {
        id: 'devops-iac',
        label: 'Phase 6 — Infrastructure as Code',
        weeks: '25–28',
        color: '#8b5cf6',
        steps: [
          { id: 'terraform-basics',  label: 'Terraform: providers, resources, variables, outputs, state',
            resources: [
              { label: 'Terraform Introduction', url: '/learn/terraform-introduction', type: 'article' },
              { label: 'Terraform Official Docs', url: 'https://developer.hashicorp.com/terraform/docs', type: 'doc' },
              { label: 'TechWorld Nana — Terraform', url: 'https://www.youtube.com/watch?v=l5k1ai_GBDE', type: 'video' },
            ]},
          { id: 'terraform-modules', label: 'Terraform modules: reusability, remote state, workspaces',
            resources: [
              { label: 'Terraform Registry (modules)', url: 'https://registry.terraform.io', type: 'doc' },
              { label: 'Terraform Modules Guide', url: 'https://developer.hashicorp.com/terraform/language/modules', type: 'doc' },
            ]},
          { id: 'terraform-aws',     label: 'Provision VPC + EC2 + RDS on AWS with Terraform',
            resources: [
              { label: 'Terraform AWS Provider Docs', url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs', type: 'doc' },
            ]},
          { id: 'ansible-basics',    label: 'Ansible: inventory, playbooks, roles, handlers, templates',
            resources: [
              { label: 'Ansible Official Docs', url: 'https://docs.ansible.com/ansible/latest/getting_started/', type: 'doc' },
              { label: 'TechWorld Nana — Ansible', url: 'https://www.youtube.com/watch?v=1id6ERvfozo', type: 'video' },
            ]},
          { id: 'gitops',            label: 'GitOps with ArgoCD: declarative K8s deployments from Git',
            resources: [
              { label: 'ArgoCD Official Docs', url: 'https://argo-cd.readthedocs.io/en/stable/', type: 'doc' },
              { label: 'TechWorld Nana — ArgoCD', url: 'https://www.youtube.com/watch?v=MeU5_k9ssrs', type: 'video' },
            ]},
        ],
      },
      {
        id: 'devops-monitoring',
        label: 'Phase 7 — Monitoring & Observability',
        weeks: '29–32',
        color: '#10b981',
        steps: [
          { id: 'prometheus',          label: 'Prometheus: metrics, PromQL, alerting rules, Alertmanager',
            resources: [
              { label: 'Prometheus Monitoring Guide', url: '/learn/prometheus-monitoring-guide', type: 'article' },
              { label: 'Prometheus Official Docs', url: 'https://prometheus.io/docs/introduction/overview/', type: 'doc' },
              { label: 'TechWorld Nana — Prometheus', url: 'https://www.youtube.com/watch?v=h4Sl21AKiDg', type: 'video' },
            ]},
          { id: 'grafana',             label: 'Build Grafana dashboards for infrastructure & app metrics',
            resources: [
              { label: 'Grafana Official Docs', url: 'https://grafana.com/docs/grafana/latest/', type: 'doc' },
              { label: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/', type: 'doc' },
            ]},
          { id: 'elk-stack',           label: 'ELK Stack: ship logs with Filebeat, search in Kibana',
            resources: [
              { label: 'Elastic ELK Docs', url: 'https://www.elastic.co/guide/index.html', type: 'doc' },
              { label: 'freeCodeCamp — ELK Stack', url: 'https://www.youtube.com/watch?v=4X0WLg05ASw', type: 'video' },
            ]},
          { id: 'distributed-tracing', label: 'Distributed tracing with Jaeger or OpenTelemetry',
            resources: [
              { label: 'OpenTelemetry Docs', url: 'https://opentelemetry.io/docs/', type: 'doc' },
              { label: 'Jaeger Docs', url: 'https://www.jaegertracing.io/docs/latest/', type: 'doc' },
            ]},
          { id: 'sre-concepts',        label: 'SRE: SLOs, SLIs, SLAs, error budgets, incident runbooks',
            resources: [
              { label: 'SRE Concepts Guide', url: '/learn/sre-concepts-guide', type: 'article' },
              { label: 'Google SRE Book (free)', url: 'https://sre.google/sre-book/table-of-contents/', type: 'doc' },
            ]},
          { id: 'devops-interview',    label: 'Practice 50 DevOps scenario interview questions',
            resources: [
              { label: 'DevOps Interview Questions (GitHub)', url: 'https://github.com/bregman-arie/devops-exercises', type: 'doc' },
            ]},
          { id: 'devops-offer',        label: '🎉 Land your DevOps / SRE role!', resources: [] },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DATA ANALYST
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    emoji: '📊',
    track: 'data',
    color: '#a78bfa',
    description: 'From service company to data analyst at a product firm — SQL, Python, dashboards, and storytelling',
    duration: '4–5 months',
    premium: false,
    freePhases: 2,
    phases: [
      {
        id: 'da-sql',
        label: 'Phase 1 — SQL Mastery',
        weeks: '1–3',
        color: '#a78bfa',
        steps: [
          { id: 'sql-basics-da',  label: 'SELECT, WHERE, GROUP BY, HAVING, ORDER BY — master all',
            resources: [
              { label: 'SQL Mastery Guide', url: '/learn/sql-fundamentals-guide', type: 'article' },
              { label: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'doc' },
              { label: 'SQLZoo', url: 'https://sqlzoo.net', type: 'doc' },
            ]},
          { id: 'sql-joins',      label: 'All JOIN types: INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS',
            resources: [
              { label: 'SQL JOINs Explained', url: '/learn/sql-joins-explained', type: 'article' },
              { label: 'Visual JOIN Guide', url: 'https://joins.spathon.com', type: 'doc' },
              { label: 'Mode — SQL JOINs', url: 'https://mode.com/sql-tutorial/sql-joins/', type: 'doc' },
            ]},
          { id: 'sql-subqueries', label: 'Subqueries, CTEs (WITH clause), correlated subqueries',
            resources: [
              { label: 'Subqueries & CTEs Guide', url: '/learn/sql-subqueries-cte-guide', type: 'article' },
              { label: 'Mode — CTEs Guide', url: 'https://mode.com/sql-tutorial/sql-cte/', type: 'doc' },
            ]},
          { id: 'sql-window',     label: 'Window functions: ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY',
            resources: [
              { label: 'Window Functions Guide', url: '/learn/sql-window-functions-guide', type: 'article' },
              { label: 'Mode — Window Functions', url: 'https://mode.com/sql-tutorial/sql-window-functions/', type: 'doc' },
              { label: 'StrataScratch — Practice', url: 'https://platform.stratascratch.com/coding?code_type=1', type: 'doc' },
            ]},
          { id: 'sql-agg',        label: 'Aggregations: COUNT, SUM, AVG, MIN, MAX with NULL handling',
            resources: [
              { label: 'SQL Mastery Guide', url: '/learn/sql-fundamentals-guide', type: 'article' },
              { label: 'Mode — SQL Aggregations', url: 'https://mode.com/sql-tutorial/sql-aggregate-functions/', type: 'doc' },
            ]},
          { id: 'sql-practice',   label: 'Solve 50+ SQL problems on LeetCode / StrataScratch / HackerRank',
            resources: [
              { label: 'LeetCode SQL Study Plan', url: 'https://leetcode.com/studyplan/top-sql-50/', type: 'doc' },
              { label: 'DataLemur SQL Questions', url: 'https://datalemur.com/questions', type: 'doc' },
            ]},
          { id: 'sql-perf',       label: 'Query optimization: EXPLAIN, indexes, avoiding full scans',
            resources: [
              { label: 'Use The Index, Luke', url: 'https://use-the-index-luke.com', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'da-python',
        label: 'Phase 2 — Python for Data',
        weeks: '4–7',
        color: '#6366f1',
        steps: [
          { id: 'python-basics-da', label: 'Python fundamentals: lists, dicts, loops, functions, comprehensions',
            resources: [
              { label: 'Python.org Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'doc' },
              { label: 'freeCodeCamp — Python Full Course', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', type: 'video' },
            ]},
          { id: 'pandas-basics',    label: 'Pandas: read CSV/Excel, filter, sort, groupby, merge DataFrames',
            resources: [
              { label: 'Pandas Data Analysis Guide', url: '/learn/pandas-data-analysis-guide', type: 'article' },
              { label: 'Pandas Official Docs', url: 'https://pandas.pydata.org/docs/user_guide/', type: 'doc' },
              { label: 'Keith Galli — Pandas Tutorial', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', type: 'video' },
            ]},
          { id: 'pandas-advanced',  label: 'Pandas: pivot tables, apply(), lambda, datetime handling',
            resources: [
              { label: 'Pandas Cookbook', url: 'https://pandas.pydata.org/docs/user_guide/cookbook.html', type: 'doc' },
            ]},
          { id: 'numpy-basics',     label: 'NumPy: arrays, vectorized operations, broadcasting',
            resources: [
              { label: 'NumPy Official Docs', url: 'https://numpy.org/doc/stable/user/quickstart.html', type: 'doc' },
              { label: 'NumPy in 15 Minutes', url: 'https://www.youtube.com/watch?v=uRsE5WGiKWo', type: 'video' },
            ]},
          { id: 'data-cleaning',    label: 'Handle missing values, duplicates, outliers, encoding categoricals',
            resources: [
              { label: 'Kaggle — Data Cleaning Course', url: 'https://www.kaggle.com/learn/data-cleaning', type: 'doc' },
            ]},
          { id: 'jupyter-nb',       label: 'Structure analysis in Jupyter Notebooks professionally',
            resources: [
              { label: 'Jupyter Official Docs', url: 'https://jupyter-notebook.readthedocs.io/en/latest/', type: 'doc' },
              { label: 'Jupyter Tips & Tricks', url: 'https://www.youtube.com/watch?v=2eCHD6f_phE', type: 'video' },
            ]},
          { id: 'first-eda',        label: 'Complete first full EDA on a real dataset (Kaggle)',
            resources: [
              { label: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets', type: 'doc' },
              { label: 'EDA Tutorial — Krish Naik', url: 'https://www.youtube.com/watch?v=5NcbVYhQJvw', type: 'video' },
            ]},
        ],
      },
      {
        id: 'da-viz',
        label: 'Phase 3 — Data Visualization & Storytelling',
        weeks: '8–10',
        color: '#ec4899',
        steps: [
          { id: 'matplotlib',     label: 'Matplotlib & Seaborn: line, bar, scatter, heatmap, box plots',
            resources: [
              { label: 'Matplotlib Docs', url: 'https://matplotlib.org/stable/tutorials/', type: 'doc' },
              { label: 'Seaborn Docs', url: 'https://seaborn.pydata.org/tutorial.html', type: 'doc' },
            ]},
          { id: 'plotly',         label: 'Plotly for interactive charts in notebooks',
            resources: [
              { label: 'Plotly Python Docs', url: 'https://plotly.com/python/', type: 'doc' },
            ]},
          { id: 'tableau',        label: 'Tableau Public: dimensions, measures, calculated fields, dashboards',
            resources: [
              { label: 'Tableau Free Training', url: 'https://www.tableau.com/learn/training', type: 'doc' },
              { label: 'Simplilearn — Tableau Tutorial', url: 'https://www.youtube.com/watch?v=aHaOIvR00So', type: 'video' },
            ]},
          { id: 'powerbi',        label: 'Power BI Desktop: DAX basics, relationships, reports',
            resources: [
              { label: 'Microsoft Power BI Learning', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', type: 'doc' },
              { label: 'Guy in a Cube — Power BI', url: 'https://www.youtube.com/@GuyInACube', type: 'video' },
            ]},
          { id: 'dashboard-proj', label: 'Build a business dashboard with 5+ charts telling a story',
            resources: [
              { label: 'Tableau Public Gallery', url: 'https://public.tableau.com/app/discover', type: 'doc' },
              { label: 'Looker Studio (free)', url: 'https://lookerstudio.google.com', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'da-stats',
        label: 'Phase 4 — Statistics & A/B Testing',
        weeks: '11–13',
        color: '#10b981',
        steps: [
          { id: 'descriptive-stats', label: 'Mean, median, mode, std deviation, variance, percentiles',
            resources: [
              { label: 'Descriptive Statistics Guide', url: '/learn/descriptive-statistics-guide', type: 'article' },
              { label: 'StatQuest — Statistics Basics', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9', type: 'video' },
            ]},
          { id: 'distributions',     label: 'Normal, binomial, Poisson distributions & their applications',
            resources: [
              { label: 'Statistics for Analysts', url: '/learn/statistics-for-analysts', type: 'article' },
              { label: 'StatQuest — Distributions', url: 'https://www.youtube.com/watch?v=oI3hZJqXJuc', type: 'video' },
            ]},
          { id: 'hypothesis-test',   label: 'Hypothesis testing: null/alternate hypothesis, p-value, alpha',
            resources: [
              { label: 'Statistics for Analysts', url: '/learn/statistics-for-analysts', type: 'article' },
              { label: 'StatQuest — Hypothesis Testing', url: 'https://www.youtube.com/watch?v=0oc49DyA3hU', type: 'video' },
            ]},
          { id: 'ttest-chi',         label: 'T-test, chi-square, ANOVA — when to use each',
            resources: [
              { label: 'StatQuest — T-test', url: 'https://www.youtube.com/watch?v=pTmLQvMM-1M', type: 'video' },
              { label: 'Statistics How To', url: 'https://www.statisticshowto.com', type: 'doc' },
            ]},
          { id: 'ab-testing',        label: 'Design and analyze an A/B test: sample size, significance',
            resources: [
              { label: 'A/B Testing Guide', url: '/learn/ab-testing-guide', type: 'article' },
              { label: 'Evan Miller A/B Test Calculator', url: 'https://www.evanmiller.org/ab-testing/', type: 'doc' },
            ]},
          { id: 'correlation',       label: 'Correlation vs causation, Pearson & Spearman correlation',
            resources: [
              { label: 'Statistics for Analysts', url: '/learn/statistics-for-analysts', type: 'article' },
              { label: 'StatQuest — Correlation', url: 'https://www.youtube.com/watch?v=xZ_z8KWkhXE', type: 'video' },
            ]},
        ],
      },
      {
        id: 'da-bi',
        label: 'Phase 5 — Business Intelligence & BI Tools',
        weeks: '14–16',
        color: '#f59e0b',
        steps: [
          { id: 'data-warehouse',   label: 'Star schema, snowflake schema, OLAP vs OLTP',
            resources: [
              { label: 'Data Warehouse Concepts', url: '/learn/data-warehouse-concepts', type: 'article' },
              { label: 'Kimball Group DW Guide', url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/', type: 'doc' },
              { label: 'DW Concepts — freeCodeCamp', url: 'https://www.youtube.com/watch?v=AHR_JoHHIx0', type: 'video' },
            ]},
          { id: 'etl-basics',       label: 'ETL/ELT pipeline concepts and tools (dbt basics)',
            resources: [
              { label: 'dbt Learn (free)', url: 'https://learn.getdbt.com', type: 'doc' },
              { label: 'dbt Fundamentals Course', url: 'https://courses.getdbt.com/courses/fundamentals', type: 'doc' },
            ]},
          { id: 'metabase',         label: 'Set up Metabase or Looker Studio with a real database',
            resources: [
              { label: 'Metabase Docs', url: 'https://www.metabase.com/docs/latest/', type: 'doc' },
              { label: 'Looker Studio (free)', url: 'https://lookerstudio.google.com', type: 'doc' },
            ]},
          { id: 'excel-advanced',   label: 'Excel: VLOOKUP, INDEX-MATCH, pivot tables, Power Query',
            resources: [
              { label: 'Excel Jet (free guides)', url: 'https://exceljet.net', type: 'doc' },
              { label: 'Leila Gharani — Excel', url: 'https://www.youtube.com/@LeilaGharani', type: 'video' },
            ]},
          { id: 'sql-bi-tools',     label: 'Write SQL queries in Redash, Superset, or BigQuery console',
            resources: [
              { label: 'BigQuery Docs', url: 'https://cloud.google.com/bigquery/docs/introduction', type: 'doc' },
              { label: 'Apache Superset Docs', url: 'https://superset.apache.org/docs/intro', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'da-portfolio',
        label: 'Phase 6 — Portfolio & Interview Prep',
        weeks: '17–20',
        color: '#f97316',
        steps: [
          { id: 'kaggle-proj',      label: 'Complete 2 end-to-end projects on Kaggle with writeups',
            resources: [
              { label: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', type: 'doc' },
              { label: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'doc' },
            ]},
          { id: 'github-portfolio', label: 'Host all projects on GitHub with clean READMEs',
            resources: [
              { label: 'GitHub', url: 'https://github.com', type: 'doc' },
            ]},
          { id: 'sql-interview',    label: 'Practice 50 SQL interview questions (window functions focus)',
            resources: [
              { label: 'DataLemur SQL Questions', url: 'https://datalemur.com/questions', type: 'doc' },
              { label: 'StrataScratch SQL', url: 'https://platform.stratascratch.com', type: 'doc' },
            ]},
          { id: 'case-studies',     label: 'Practice 5 product analytics case studies (metrics, funnels)',
            resources: [
              { label: 'Analytics Case Studies — exponent', url: 'https://www.tryexponent.com/courses/data-analysis', type: 'doc' },
            ]},
          { id: 'resume-da',        label: 'Resume: quantify every bullet (e.g., "reduced churn by 12%")',
            resources: [
              { label: 'Resume for Product Companies', url: '/learn/resume-for-product-companies', type: 'article' },
              { label: 'Tech Interview Handbook Resume', url: 'https://www.techinterviewhandbook.org/resume/', type: 'doc' },
            ]},
          { id: 'da-offer',         label: '🎉 Land your Data Analyst role at a product company!', resources: [] },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SYSTEM DESIGN (Premium)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'system-design',
    label: 'System Design Mastery',
    emoji: '🏗️',
    track: 'sde',
    color: '#f59e0b',
    description: 'Master HLD + LLD to clear SDE-2 and senior rounds',
    duration: '2–3 months',
    premium: true,
    phases: [
      {
        id: 'hld-basics',
        label: 'Phase 1 — HLD Fundamentals',
        weeks: '1–3',
        color: '#f59e0b',
        steps: [
          { id: 'scalability-101',  label: 'Horizontal vs vertical scaling, load balancers',
            resources: [
              { label: 'Scalability Fundamentals', url: '/learn/scalability-fundamentals', type: 'article' },
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer#scalability', type: 'doc' },
            ]},
          { id: 'caching-patterns', label: 'Cache-aside, write-through, write-back patterns',
            resources: [
              { label: 'Caching Design Patterns', url: '/learn/caching-design-patterns', type: 'article' },
              { label: 'AWS Caching Best Practices', url: 'https://aws.amazon.com/caching/best-practices/', type: 'doc' },
            ]},
          { id: 'cap-theorem',      label: 'CAP theorem and real-world trade-offs',
            resources: [
              { label: 'CAP Theorem Explained', url: '/learn/cap-theorem-explained', type: 'article' },
              { label: 'Martin Fowler — CAP Theorem', url: 'https://martinfowler.com/articles/cap-misconceptions.html', type: 'doc' },
            ]},
          { id: 'database-choice',  label: 'SQL vs NoSQL: when to use what',
            resources: [
              { label: 'SQL vs NoSQL: When to Use What', url: '/learn/sql-vs-nosql-when-to-use', type: 'article' },
              { label: 'System Design Primer — DB choices', url: 'https://github.com/donnemartin/system-design-primer#relational-database-management-system-rdbms', type: 'doc' },
            ]},
          { id: 'cdn-and-dns',      label: 'How CDNs, DNS, and edge computing work',
            resources: [
              { label: 'Cloudflare — CDN Explained', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', type: 'doc' },
              { label: 'How DNS Works', url: 'https://howdns.works', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'hld-designs',
        label: 'Phase 2 — Classic HLD Designs',
        weeks: '4–7',
        color: '#ec4899',
        steps: [
          { id: 'url-shortener', label: 'Design URL Shortener (tinyurl)',
            resources: [
              { label: 'Design a URL Shortener', url: '/learn/design-url-shortener', type: 'article' },
              { label: 'ByteByteGo — URL Shortener', url: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4', type: 'video' },
            ]},
          { id: 'chat-system',   label: 'Design WhatsApp / Chat System',
            resources: [
              { label: 'Design a Chat System', url: '/learn/design-chat-system', type: 'article' },
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
            ]},
          { id: 'instagram',     label: 'Design Instagram / Photo Sharing',
            resources: [
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
              { label: 'Educative — Instagram Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/m2yDVZnQ8lG', type: 'doc' },
            ]},
          { id: 'netflix',       label: 'Design Netflix / Video Streaming',
            resources: [
              { label: 'ByteByteGo — Netflix', url: 'https://www.youtube.com/watch?v=x9ErHju7PkI', type: 'video' },
            ]},
          { id: 'uber',          label: 'Design Uber / Ride Sharing',
            resources: [
              { label: 'Design Uber', url: '/learn/design-uber', type: 'article' },
              { label: 'ByteByteGo Blog', url: 'https://blog.bytebytego.com', type: 'doc' },
            ]},
          { id: 'search-engine', label: 'Design Google Search / Typeahead',
            resources: [
              { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'doc' },
            ]},
        ],
      },
      {
        id: 'lld',
        label: 'Phase 3 — Low Level Design',
        weeks: '8–10',
        color: '#6366f1',
        steps: [
          { id: 'solid-principles', label: 'SOLID principles with real examples',
            resources: [
              { label: 'SOLID Principles Guide', url: '/learn/solid-principles-guide', type: 'article' },
              { label: 'Refactoring Guru — SOLID', url: 'https://refactoring.guru/solid-principles', type: 'doc' },
            ]},
          { id: 'design-patterns',  label: '10 essential design patterns: Factory, Singleton, Observer…',
            resources: [
              { label: '10 Essential Design Patterns', url: '/learn/essential-design-patterns', type: 'article' },
              { label: 'Refactoring Guru — Patterns', url: 'https://refactoring.guru/design-patterns', type: 'doc' },
              { label: 'Fireship — Design Patterns', url: 'https://www.youtube.com/watch?v=tv-_1er1mWI', type: 'video' },
            ]},
          { id: 'lld-parking',      label: 'Design Parking Lot system',
            resources: [
              { label: 'awesome-low-level-design', url: 'https://github.com/ashishps1/awesome-low-level-design', type: 'doc' },
            ]},
          { id: 'lld-books',        label: 'Design Library Management / BookMyShow',
            resources: [
              { label: 'awesome-low-level-design', url: 'https://github.com/ashishps1/awesome-low-level-design', type: 'doc' },
            ]},
          { id: 'lld-snake',        label: 'Design Snake & Ladder / Chess',
            resources: [
              { label: 'awesome-low-level-design', url: 'https://github.com/ashishps1/awesome-low-level-design', type: 'doc' },
            ]},
        ],
      },
    ],
  },
];
