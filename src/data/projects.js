export const initialProjects = [
  {
    id: 1,
    slug: "react-shopping-cart",
    title: "React Shopping Cart",
    shortDescription: "Interactive e-commerce shopping cart interface with dynamic product catalog, real-time quantity updates, cart tally badges, and total-price computation.",
    description: "A production-ready shopping cart application built with React.js featuring responsive product card grids, fast state transitions, real-time subtotal and tax calculation, quantity increments/decrements, item removal, and persistent localStorage synchronization. Built with modular component architecture and clean state isolation.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80"
    ],
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "React Context", "LocalStorage"],
    category: "React",
    categories: ["React", "Frontend", "JavaScript"],
    github: "https://github.com/karuppasamy74/react-shopping-cart",
    liveDemo: "https://react-shopping-cart-demo.vercel.app",
    featured: true,
    status: "Completed",
    problemStatement: "E-commerce web apps often encounter performance degradation or inconsistent UI state between navigation item counters and individual cart line items during high-frequency user actions.",
    solution: "Implemented an optimized React Context reducer architecture that centralizes cart updates, prevents unnecessary component rerenders, computes financial summaries in real-time, and saves cart state locally.",
    features: [
      "Product listing with category filtering and sorting",
      "One-click add to cart and instant item removal",
      "Granular quantity increase and decrease controls",
      "Real-time cart badge item count in the navigation header",
      "Automated total price and discount calculation",
      "Reusable, decoupled components with clear prop contracts",
      "Persistent state recovery using browser LocalStorage"
    ],
    challenges: "Synchronizing state across separate header navigation counters and deep checkout drawer items without prop drilling or render lag.",
    learningOutcomes: "Mastered React useReducer + useContext state patterns, performance memoization with useMemo, and defensive state synchronization."
  },
  {
    id: 2,
    slug: "react-task-manager",
    title: "React Task Manager",
    shortDescription: "A minimalist, developer-focused task and workflow manager with instant status toggling, priority filters, and persistent local storage.",
    description: "A lightweight, distraction-free task management web application engineered for maximum daily productivity. Features instant task creation, inline status toggling, priority badges, category filtering (All, Active, Completed), clear-completed actions, and resilient LocalStorage integration.",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=900&q=80"
    ],
    technologies: ["React.js", "JavaScript", "CSS3", "LocalStorage", "Framer Motion"],
    category: "React",
    categories: ["React", "Frontend", "JavaScript"],
    github: "https://github.com/karuppasamy74/react-task-manager",
    liveDemo: "https://react-task-manager-demo.vercel.app",
    featured: true,
    status: "Completed",
    problemStatement: "Most task apps are over-engineered, slow to load, or require heavy remote database round-trips for simple daily productivity capture.",
    solution: "Engineered a rapid, keyboard-friendly single-page dashboard utilizing custom React storage hooks, micro-animations, and instant optimistic state updates.",
    features: [
      "Quick task addition with keyboard Enter shortcut",
      "Instant status toggle with animated visual completion strike",
      "Filter views: All, Active, Completed, and Priority tasks",
      "Single-click delete and bulk clear-completed actions",
      "Automated LocalStorage persistence across browser sessions",
      "Modular design with custom React Hooks",
      "Responsive, clean black-and-white theme aesthetics"
    ],
    challenges: "Designing clean edge-case handlers for empty tasks, long strings, and maintaining keyboard accessibility across focusable items.",
    learningOutcomes: "Solidified custom hook design (`useLocalStorage`), accessible ARIA checkboxes, and Framer Motion layout animations."
  },
  {
    id: 3,
    slug: "laughbook-comedy-booking",
    title: "LaughBook — Comedy Event Booking",
    shortDescription: "A comprehensive comedy show discovery and seat reservation platform with dynamic event listings, seat tiers, and checkout ticket flow.",
    description: "LaughBook is an end-to-end comedy show booking platform that enables users to browse upcoming stand-up specials, explore comedian profiles and tour dates, select numbered seats via an interactive seating grid, and complete user registration, login, and ticket checkout.",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "JSON", "Bootstrap"],
    category: "Full Stack",
    categories: ["Full Stack", "Frontend", "JavaScript"],
    github: "https://github.com/karuppasamy74/laughbook-comedy-booking",
    liveDemo: "https://laughbook-demo.vercel.app",
    featured: true,
    status: "Completed",
    problemStatement: "Online ticketing interfaces can be convoluted, creating high drop-off rates during seat selection and authentication steps.",
    solution: "Designed a clean 3-step booking funnel with visual seat tier status indicators (Available, Selected, Reserved), instant client-side credential validation, and auto-generated digital ticket passes.",
    features: [
      "Dynamic comedy event listing with genre and venue filtering",
      "User authentication module with registration and login validation",
      "Detailed event modal with artist bio and showtime schedules",
      "Interactive visual seat selection grid with price tier multipliers",
      "Streamlined checkout flow with booking summary calculation",
      "User profile dashboard showing booked tickets and history",
      "Printable digital e-ticket generation"
    ],
    challenges: "Managing real-time seat matrix states using vanilla JavaScript DOM methods and structuring clean JSON data sets.",
    learningOutcomes: "Mastered JSON-driven dynamic rendering, client-side form validation, modal state coordination, and responsive layouts."
  },
  {
    id: 4,
    slug: "python-django-task-portal",
    title: "Python Full-Stack Task & REST Portal",
    shortDescription: "A robust backend service and management portal with Django REST framework, MySQL database, JWT auth, and interactive API documentation.",
    description: "A complete full-stack web service and API built with Python, Django, and MySQL. Features JWT token authentication, role-based permission tiers, comprehensive CRUD endpoints, relational schema normalization, and Postman API collection documentation.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80"
    ],
    technologies: ["Python", "Django", "Django REST Framework", "MySQL", "Postman", "Git"],
    category: "Python",
    categories: ["Python", "Backend", "Full Stack"],
    github: "https://github.com/karuppasamy74/python-django-task-api",
    liveDemo: "https://api-task-portal.fly.dev",
    featured: false,
    status: "Completed",
    problemStatement: "Organizations need reliable, structured backend services with role-based security to manage internal developer tasks and client communications without data leaks.",
    solution: "Architected a scalable Django REST Framework architecture with database migrations, JWT authorization middleware, and automated unit test suites.",
    features: [
      "JWT Token-based user authentication and refresh endpoints",
      "Relational MySQL database schema with index optimizations",
      "Full CRUD REST API endpoints with DRF Serializers",
      "Granular user permission classes and role-based access control",
      "Structured error handling and API logging",
      "Postman collection documentation for rapid client integration"
    ],
    challenges: "Configuring cross-origin resource sharing (CORS) and optimizing SQL query execution plans with select_related to eliminate N+1 queries.",
    learningOutcomes: "Gained hands-on proficiency in Django ORM, RESTful API contract design, relational database modeling, and backend security fundamentals."
  }
];
