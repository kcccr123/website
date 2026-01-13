export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  forceParallel?: boolean;
  logoUrl?: string;
  location?: string;
  start: string;
  end?: string;
  summary?: string;
  highlights?: string[];
  link?: string;
  tags?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "exp-01",
    role: "Backend Software Engineer",
    company: "Tesla",
    logoUrl: "/experience-logos/tesla_motors_logo.jpg",
    location: "Austin, Texas, United States",
    start: "Sep 2025",
    end: "Dec 2025",
    summary: "Cell Software",
    highlights: [
      "Built Escalation Service, a Go fault-response system for cell production lines that routes machine errors and anomalies to service teams and issues containment commands.",
      "Engineered real-time, distributed ingestion of cell production-line telemetry by replacing legacy connectors with Go/Kafka/Kubernetes pipelines for high-throughput analytics and controls feedback.",
      "Designed a RAG-powered AI agent that generates standardized Grafana dashboards and SQL queries, enabling self-serve analytics across the org.",
      "Developed and deployed Signal Explorer, a gRPC API and web app that catalogs PLC signals so users and services can discover data needed for production queries.",
      "Drove the datastore migration from Flux to ClickHouse, improving query speed and enabling real-time shop-floor analytics."
    ],
    tags: [
      "Backend",
      "Go",
      "Kafka",
      "Kubernetes",
      "gRPC",
      "ClickHouse",
      "Grafana",
      "SQL"
    ]
  },
  {
    id: "exp-02",
    role: "Software Developer",
    company: "Department of Computer Science, University of Toronto",
    forceParallel: true,
    logoUrl: "/experience-logos/uoftcompsci_logo.jpg",
    location: "Toronto, Ontario, Canada",
    start: "Apr 2025",
    end: "Present",
    summary: "Building MemoryLab",
    highlights: [
      "Building a guided visual editor for Python memory models, helping students translate code into clear heap/stack diagrams.",
      "Integrating MemoryViz, PythonTA, and MarkUs to create, deploy, and automatically grade interactive exercises.",
      "Supporting University of Toronto courses by teaching the Python memory model through hands-on practice.",
      "Working under Prof. Jonathan Calver and Prof. David Liu."
    ],
    tags: ["Web App", "Python", "MemoryViz", "PythonTA", "MarkUs"]
  },
  {
    id: "exp-03",
    role: "Software Developer",
    company: "Geotab",
    logoUrl: "/experience-logos/geotab_logo.jpg",
    location: "Toronto, Ontario, Canada",
    start: "May 2024",
    end: "Dec 2024",
    summary:
      "Data Platform Team",
    highlights: [
      "Developed web portals for the Data Platform Management Console (DPMC) to centralize internal developer tools using React/TypeScript and REST APIs.",
      "Integrated Airflow and Superset for scheduled query caching, reducing query wait times and improving dashboard responsiveness.",
      "Automated testing and deployments with Terraform and GitLab CI to reduce manual steps and prevent config drift.",
      "Managed GCP workloads with Kubernetes/Docker/Helm for DPMC apps, ensuring reliable, scalable releases."
    ],
    tags: ["Full Stack", "React", "TypeScript", "Airflow", "Superset", "Terraform", "GCP", "Kubernetes"]
  },
  {
    id: "exp-04",
    role: "Full Stack Developer",
    company: "Kelsen Legal Technologies",
    logoUrl: "/experience-logos/kelsen_legal_tech_logo.jpg",
    location: "Toronto, Ontario, Canada",
    start: "Apr 2023",
    end: "Sep 2023",
    summary: "",
    highlights: [
      "Supported the development of AI chat in Kelsen’s legal editor for drafting help and predictive text.",
      "Built UIs and REST APIs for user document management with React, TypeScript, and Express.",
      "Delivered a framework for multilingual support for consistent UX across regions."
    ],
    tags: ["Full Stack", "React", "TypeScript", "Express", "AI"]
  }
];
