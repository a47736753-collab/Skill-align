import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("colleges").first();
    if (existing) return "already_seeded";

    const now = Date.now();

    // ── Skills ──────────────────────────────────────────────
    const skillData: [string, string[]][] = [
      [
        "Programming Languages",
        [
          "C",
          "C++",
          "Java",
          "Python",
          "JavaScript",
          "TypeScript",
          "Go",
          "Rust",
          "Kotlin",
          "Swift",
          "C#",
        ],
      ],
      [
        "Web Development",
        [
          "HTML",
          "CSS",
          "React",
          "Angular",
          "Vue.js",
          "Node.js",
          "Express.js",
          "Next.js",
          "Django",
          "Flask",
          "Spring Boot",
        ],
      ],
      [
        "Database",
        ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Cassandra"],
      ],
      [
        "CS Fundamentals",
        [
          "Data Structures",
          "Algorithms",
          "OOP",
          "Operating Systems",
          "Computer Networks",
          "DBMS",
          "Compiler Design",
          "System Design",
        ],
      ],
      [
        "Tools & Platforms",
        [
          "Git",
          "GitHub",
          "Docker",
          "Kubernetes",
          "AWS",
          "Azure",
          "GCP",
          "Linux",
          "CI/CD",
          "Jenkins",
          "Nginx",
        ],
      ],
      [
        "Data & Analytics",
        [
          "Excel",
          "Power BI",
          "Tableau",
          "NumPy",
          "Pandas",
          "Matplotlib",
          "Scikit-learn",
          "TensorFlow",
          "PyTorch",
          "Statistics",
        ],
      ],
      [
        "Mobile Development",
        [
          "Android Development",
          "iOS Development",
          "Flutter",
          "React Native",
        ],
      ],
      [
        "Soft Skills",
        [
          "Problem Solving",
          "Communication",
          "Team Leadership",
          "Agile",
          "SDLC",
        ],
      ],
    ];

    for (const [category, names] of skillData) {
      for (const name of names) {
        await ctx.db.insert("skills", { name, category });
      }
    }

    // ── Colleges ────────────────────────────────────────────
    const collegeData = [
      {
        name: "COEP Technological University, Pune",
        branches: [
          {
            campus: "Main Campus",
            branchName: "Computer Engineering",
            skills: [
              "C",
              "C++",
              "Java",
              "Python",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Git",
              "Linux",
              "OOP",
            ],
          },
          {
            campus: "Main Campus",
            branchName: "Information Technology",
            skills: [
              "C",
              "C++",
              "Python",
              "Java",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Angular",
              "Git",
              "Linux",
            ],
          },
          {
            campus: "Main Campus",
            branchName: "Electronics & Telecom",
            skills: [
              "C",
              "C++",
              "Python",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "HTML",
              "CSS",
              "JavaScript",
            ],
          },
        ],
      },
      {
        name: "PCCOE Akurdi, Pune",
        branches: [
          {
            campus: "Main Campus",
            branchName: "Computer Engineering",
            skills: [
              "C",
              "C++",
              "Java",
              "Python",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Git",
              "OOP",
            ],
          },
          {
            campus: "Main Campus",
            branchName: "Information Technology",
            skills: [
              "C",
              "C++",
              "Python",
              "Java",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "Git",
            ],
          },
        ],
      },
      {
        name: "PCCOE Ravet, Pune",
        branches: [
          {
            campus: "Main Campus",
            branchName: "Computer Engineering",
            skills: [
              "C",
              "C++",
              "Java",
              "Python",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Git",
            ],
          },
        ],
      },
      {
        name: "VIT Pune",
        branches: [
          {
            campus: "Main Campus",
            branchName: "Computer Engineering",
            skills: [
              "C",
              "C++",
              "Java",
              "Python",
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "Git",
              "Docker",
              "AWS",
              "Linux",
            ],
          },
          {
            campus: "Main Campus",
            branchName: "Information Technology",
            skills: [
              "C",
              "C++",
              "Python",
              "Java",
              "JavaScript",
              "React",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "Git",
            ],
          },
        ],
      },
      {
        name: "MIT WPU Pune",
        branches: [
          {
            campus: "Main Campus",
            branchName: "Computer Engineering",
            skills: [
              "C",
              "C++",
              "Java",
              "Python",
              "JavaScript",
              "React",
              "Angular",
              "Data Structures",
              "Algorithms",
              "Operating Systems",
              "Computer Networks",
              "DBMS",
              "SQL",
              "Git",
              "Docker",
            ],
          },
        ],
      },
    ];

    const collegeIds: Record<string, string> = {};
    for (const col of collegeData) {
      const collegeId = await ctx.db.insert("colleges", { name: col.name });
      collegeIds[col.name] = collegeId;
      for (const br of col.branches) {
        await ctx.db.insert("branches", {
          collegeId: collegeId as any,
          campus: br.campus,
          branchName: br.branchName,
          skills: br.skills,
        });
      }
    }

    // ── Companies ───────────────────────────────────────────
    const companyData = [
      {
        name: "Google",
        roles: [
          {
            location: "Hyderabad",
            title: "Software Engineer",
            requiredSkills: [
              "Java",
              "Python",
              "C++",
              "Data Structures",
              "Algorithms",
              "System Design",
              "Git",
              "SQL",
              "AWS",
            ],
            source: "Google Careers Page",
          },
          {
            location: "Pune",
            title: "Software Engineer",
            requiredSkills: [
              "Java",
              "Python",
              "C++",
              "Data Structures",
              "Algorithms",
              "System Design",
              "Git",
              "SQL",
              "GCP",
            ],
            source: "Google Careers Page",
          },
        ],
      },
      {
        name: "JP Morgan Chase",
        roles: [
          {
            location: "Mumbai",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "SQL",
              "Data Structures",
              "Algorithms",
              "Spring Boot",
              "Docker",
              "Git",
              "AWS",
            ],
            source: "JP Morgan Careers",
          },
          {
            location: "Hyderabad",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "SQL",
              "Data Structures",
              "Algorithms",
              "Spring Boot",
              "React",
              "Git",
              "Docker",
            ],
            source: "JP Morgan Careers",
          },
          {
            location: "Mumbai",
            title: "Data Analyst",
            requiredSkills: [
              "Python",
              "SQL",
              "Excel",
              "Pandas",
              "NumPy",
              "Power BI",
              "Statistics",
            ],
            source: "JP Morgan Careers",
          },
        ],
      },
      {
        name: "TCS",
        roles: [
          {
            location: "Pune",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "C++",
              "SQL",
              "Data Structures",
              "Algorithms",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Git",
            ],
            source: "TCS iON Careers",
          },
          {
            location: "Mumbai",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "Angular",
              "Git",
              "DBMS",
            ],
            source: "TCS iON Careers",
          },
        ],
      },
      {
        name: "Infosys",
        roles: [
          {
            location: "Pune",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "SQL",
              "Data Structures",
              "Algorithms",
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Git",
            ],
            source: "Infosys Careers",
          },
          {
            location: "Mysore",
            title: "Software Developer",
            requiredSkills: [
              "Java",
              "Python",
              "C++",
              "SQL",
              "HTML",
              "CSS",
              "JavaScript",
              "Git",
              "DBMS",
            ],
            source: "Infosys Careers",
          },
        ],
      },
      {
        name: "Microsoft",
        roles: [
          {
            location: "Hyderabad",
            title: "Software Engineer",
            requiredSkills: [
              "C++",
              "Java",
              "Python",
              "C#",
              "Data Structures",
              "Algorithms",
              "System Design",
              "Azure",
              "SQL",
              "Git",
            ],
            source: "Microsoft Careers",
          },
          {
            location: "Bangalore",
            title: "Software Engineer",
            requiredSkills: [
              "C++",
              "Java",
              "Python",
              "C#",
              "Data Structures",
              "Algorithms",
              "System Design",
              "Azure",
              "Git",
            ],
            source: "Microsoft Careers",
          },
        ],
      },
    ];

    for (const comp of companyData) {
      const companyId = await ctx.db.insert("companies", { name: comp.name });
      for (const role of comp.roles) {
        await ctx.db.insert("companyRoles", {
          companyId: companyId as any,
          location: role.location,
          title: role.title,
          requiredSkills: role.requiredSkills,
          lastUpdated: now,
          source: role.source,
        });
      }
    }

    return "seeded";
  },
});
