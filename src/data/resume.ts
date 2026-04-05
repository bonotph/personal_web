export const resume = {
  name: "About Me ",
  headline: "BSc Computer Science · City University of Hong Kong",
  tagline: "Application development, research, and full-stack engineering",

  education: [
    {
      school: "City University of Hong Kong",
      date: "Anticipated June 2027",
      title: "BSc in Computer Science (CGPA: 3.63)",
      bullets: [
        "Awarded Dean's list in Semester B 2023/24",
        "Attained Bright Future Whole Person Development Scholarship (Engineering)",
      ],
      coursework:
        "Data Science, Artificial Intelligence, Internet Applications Development, Managing Software Projects, Software Design, Computational Probability Modeling, Database Systems",
    },
    {
      school: "University of Leeds",
      date: "Sep 2024 – Jan 2025",
      title: "Academic exchange programme",
      coursework:
        "Further Linear Algebra, Financial Mathematics, Software Engineering Principles",
    },
    {
      school: "SKH Lamwoo Memorial Secondary School",
      date: "Sep 2017 – Jun 2023",
      title: "Graduate",
    },
  ],

  work: [
    {
      company: "Shanghai Commercial Bank",
      date: "Sep 2025 – May 2026",
      role: "Intern (Application development)",
      bullets: [
        "Modernized a legacy Payment Gateway and Payroll system by migrating the codebase from VB6 to VB.NET, ensuring cross-version compatibility from Windows XP to Windows 11.",
        "Strengthened system security and compliance by implementing AES-GCM encryption and robust credential policies to meet banking audit requirements.",
        "Developed the bank's 75th-anniversary page using JSP, facilitating company-wide engagement through interactive media.",
        "Spearheaded UAT and debugging for the Transaction Management System paperless solution, streamlining the transition from physical to digital receipts.",
      ],
    },
    {
      company: "Hong Kong Genome Institute",
      date: "Jun 2024 – Aug 2024",
      role: "Summer Intern (Bioinformatic Platform and Application)",
      bullets: [
        "Constructed an automated tool application for report generation to streamline test and review workflow and facilitate cross-team communication.",
        "Designed and developed enhancement functions on the application dashboard to reduce latency and improve user experience.",
        "Performed platform configuration, testing, debugging, and prepared system documentation.",
      ],
    },
  ],

  projects: [
    {
      name: "Federated Machine Unlearning on Credit Scoring Model",
      date: "Mar 2026 – Present",
      bullets: [
        "Achieves explainability-stable unlearning results under non-IID financial heterogeneity.",
      ],
    },
    {
      name: "Event-based Multi-modal LLM Portfolio Investment System",
      date: "Sep 2025 – May 2026",
      context: "Under CityU CS Research Mentoring Scheme",
      bullets: [
        "Built a robust data retrieval engine to collect and process multi-source financial options data.",
        'Co-developed "Option Query Language" (OQL) to facilitate precise, LLM-driven financial analysis.',
        "Developed an automated annotation pipeline for high-quality dataset creation in quantitative research.",
      ],
    },
  ],

  achievements: [
    {
      title: "AWS Solution Architect – Associate Certification (SAA-C03)",
      date: "Aug 2025",
    },
    {
      title: "2024 ISMHK Case Competition",
      date: "Mar 2024",
      role: "Semifinalist",
      bullets: [
        "Conducted research about technological innovation in risk mitigation strategies.",
        "Crafted a comprehensive presentation on supply chain risk management, highlighting key strategies to mitigate potential disruptions and implementing an innovative and well-designed digital solution to improve overall efficiency.",
      ],
    },
    {
      title: "CityU SLTP Cultural Walker",
      date: "Sep 2023 – Jun 2024",
      role: "Volunteer / Student Helper",
      bullets: [
        "Designed detailed itineraries that showcase Hong Kong's unique history and culture, tailored to students' interests.",
        "Led guided tours and interactive activities, fostering engagement and earning positive feedback from participants.",
        "Collaborated with fellow members to coordinate events that strengthened cross-cultural connections.",
      ],
    },
  ],

  skills: {
    languages: "Native Cantonese, Proficient English (IELTS 8.0), Basic Mandarin",
    programming:
      "Python, Java, C++, JavaScript (React, Next.js, Node.js), VB.NET, SQL",
    cloud: "AWS, Git, CI/CD Pipelines, Docker",
    database: "MySQL, PostgreSQL, SQL Server",
    affiliations: "Student Member, The Hong Kong Institution of Engineers (HKIE)",
    interests: "Music, badminton, photography",
  },
} as const;
