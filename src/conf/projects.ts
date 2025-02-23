const TASK_PROJECTS = {
  WEB_DESIGNER: "Web Designer",
  WEB_DEVELOPER: "Web Developer",
  MOBILE_DEVELOPER: "Mobile Developer",
  CRYPTO_DEVELOPER: "Crypto Developer",
  GRAPHIC_DESIGNER: "Graphic Designer",
  MARKETER: "Marketer",
  DATABASE_CONSULTANT: "Database Consultant",
  SCRAPE_DEVELOPER: "Scrape Developer",
  BACKEND_DEVELOPER: "Backend Developer",
  FRONTEND_DEVELOPER: "Frontend Developer",
  INFRASTRUCTURE_DEVELOPER: "Infrastructure Developer",
  TECHNICAL_ADVISOR: "Technical Advisor",
  FULLSTACK_DEVELOPER: "Fullstack Developer"
} as const;

const TITLE = {
  CTO: "CTO",
  CEO: "CEO",
  CO_FOUNDER: "CO-FOUNDER",
  FOUNDER: "FOUNDER",
  TECHNICAL_ADVISOR: "TECHNICAL ADVISOR",
  RECHERCHE_AND_DEVELOPMENT: "RECHERCHE AND DEVELOPMENT",
  FREELANCER: "FREELANCER",
  AUTOMATION_SPECIALIST: "AUTOMATION SPECIALIST",
  ACADEMIC_PROJECT_PLATFORM_ARCHITECT: "ACADEMIC PROJECT PLATFORM ARCHITECT"
} as const;

export type TaskProject = (typeof TASK_PROJECTS)[keyof typeof TASK_PROJECTS];
export type TitleProject = (typeof TITLE)[keyof typeof TITLE];

const {
  WEB_DESIGNER,
  WEB_DEVELOPER,
  CRYPTO_DEVELOPER,
  GRAPHIC_DESIGNER,
  DATABASE_CONSULTANT,
  SCRAPE_DEVELOPER,
  FRONTEND_DEVELOPER,
  FULLSTACK_DEVELOPER,
  INFRASTRUCTURE_DEVELOPER
} = TASK_PROJECTS;
const {
  CTO,
  CO_FOUNDER,
  FOUNDER,
  TECHNICAL_ADVISOR,
  RECHERCHE_AND_DEVELOPMENT,
  FREELANCER,
  ACADEMIC_PROJECT_PLATFORM_ARCHITECT,
  AUTOMATION_SPECIALIST
} = TITLE;

export type ProjectTitle =
  | "Happy Water"
  | "Sofiane Pamart's Musical NFT"
  | "Cyber Cohesion"
  | "Shinobi Boy"
  | "Web Application for managing university Projects"
  | "SODIADD"
  | "Jonas Agency"
  | "Lavish Trading"
  | "Maschool"
  | "FreeLance Projects"
  | "French Dandy"
  | "Mirrati"
  | "Horde Studio"
  | "Iso Watt"
  | "Maud Diamond"
  | "Code Wrangler"
  | "CKM CKP Accelerator"
  | "Rich Media";

export type ProjectId = 
  | "french_dandy"
  | "happy_water"
  | "sofiane_pamart"
  | "cyber_cohesion"
  | "shinobi_boy"
  | "sodiadd"
  | "jonas_agency"
  | "lavish_trading"
  | "maschool"
  | "freelance_project"
  | "miratti_morocco"
  | "horde_studio"
  | "iso_watt"
  | "maud"
  | "code_wrangler"
  | "ckm_ckp"
  | "rich_media"
  | "university_project_platform";

export type CountryNames =
  | "French"
  | "Morocco"
  | "United States"
  | "Singapore"
  | "London"
  | "United Arab Emirates";

export interface Project {
  id: ProjectId;
  title: ProjectTitle;
  tasks: TaskProject[];
  category: ("best" | "ongoing" | "completed" | "inMyWorksPipeline")[];
  jobTitle: TitleProject[];
  picture?: [string];
  country?: CountryNames;
  order?: number;
  date?: {
    start: string;
    end?: string;
    duration?: string;
  }
}
const PROJECTS: Project[] = [
  {
    id: "french_dandy",
    title: "French Dandy",
    category: ["best", "completed", "inMyWorksPipeline"],
    tasks: [WEB_DESIGNER, WEB_DEVELOPER, GRAPHIC_DESIGNER],
    jobTitle: [FREELANCER],
    country: "United Arab Emirates",
    date: {
      start: "Sep 2024",
      end: "Nov 2024",
      duration: "3 months"
    },
    order: 30
  },
  {
    id: "happy_water",
    title: "Happy Water",
    category: ["best", "completed"],
    tasks: [WEB_DESIGNER, WEB_DEVELOPER, CRYPTO_DEVELOPER],
    jobTitle: [CTO, CO_FOUNDER],
    picture: ["/images/project/happy_water_mockup_main.webp"],
    country: "French",
    date: {
      start: "Jun 2023",
      end: "Sep 2023",
      duration: "3 months"
    }
  },
  {
    id: "sofiane_pamart",
    title: "Sofiane Pamart's Musical NFT",
    category: ["completed"],
    tasks: [FRONTEND_DEVELOPER],
    jobTitle: [AUTOMATION_SPECIALIST],
    country: "French"
  },
  {
    id: "cyber_cohesion",
    title: "Cyber Cohesion",
    tasks: [WEB_DEVELOPER, DATABASE_CONSULTANT],
    category: ["ongoing", "inMyWorksPipeline"],
    jobTitle: [TECHNICAL_ADVISOR, RECHERCHE_AND_DEVELOPMENT],
    country: "Singapore",
    date: {
      start: "May 2023",
      end: "Jun 2024",
      duration: "15 months"
    },
    order: 70
  },
  {
    id: "shinobi_boy",
    title: "Shinobi Boy",
    category: ["completed"],
    tasks: [FULLSTACK_DEVELOPER, SCRAPE_DEVELOPER, INFRASTRUCTURE_DEVELOPER],
    jobTitle: [FOUNDER],
    country: "Morocco"
  },
  {
    id: "university_project_platform",
    title: "Web Application for managing university Projects",
    tasks: [FULLSTACK_DEVELOPER],
    category: ["completed"],
    jobTitle: [ACADEMIC_PROJECT_PLATFORM_ARCHITECT],
    country: "Morocco"
  },
  {
    id: "sodiadd",
    title: "SODIADD",
    category: ["best", "ongoing"],
    tasks: [WEB_DESIGNER, FULLSTACK_DEVELOPER],
    jobTitle: [CTO, CO_FOUNDER],
    picture: ["/images/project/sodiadd_mockup_main.webp"],
    country: "French",
    date: {
      start: "Feb 2023",
      end: "Jun 2023",
      duration: "4 months"
    }
  },
  {
    id: "jonas_agency",
    title: "Jonas Agency",
    category: ["ongoing", "inMyWorksPipeline"],
    tasks: [FULLSTACK_DEVELOPER],
    jobTitle: [TECHNICAL_ADVISOR],
    country: "London",
    date: {
      start: "July 2023",
      end: "Oct 2024",
      duration: "15 months"
    },
    order: 80
  },
  {
    id: "lavish_trading",
    category: ["best", "completed", "inMyWorksPipeline"],
    title: "Lavish Trading",
    tasks: [WEB_DESIGNER, FULLSTACK_DEVELOPER],
    jobTitle: [FREELANCER],
    picture: ["/images/project/lavish_mockup_main.webp"],
    order: 90,
    country: "French",
    date: {
      start: "Mar 2023",
      end: "May 2023",
      duration: "3 months"
    }
  },
  {
    id: "maschool",
    category: ["completed"],
    title: "Maschool",
    tasks: [WEB_DESIGNER, FRONTEND_DEVELOPER],
    jobTitle: [CO_FOUNDER],
    country: "French"
  },
  {
    id: "freelance_project",
    category: ["completed"],
    title: "FreeLance Projects",
    tasks: [WEB_DESIGNER, GRAPHIC_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    country: "French"
  },
  {
    id: "miratti_morocco",
    category: ["completed", "inMyWorksPipeline"],
    title: "Mirrati",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    date: {
      start: "Jun 2025"
    },
    order: 15,
    country: "French"
  },
  {
    id: "horde_studio",
    category: ["completed", "inMyWorksPipeline"],
    title: "Horde Studio",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    date: {
      start: "June 2024",
      end: "Sep 2024",
      duration: "3 months"
    },
    country: "French",
    order: 60
  },
  {
    id: "iso_watt",
    category: ["completed"],
    title: "Iso Watt",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    country: "French"
  },
  {
    id: "maud",
    category: ["completed"],
    title: "Maud Diamond",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    date: {
      start: "Sep 2024",
      end: "Oct 2024",
      duration: "2 months"
    },
    country: "French",
    order: 50
  },
  {
    id: "sodiadd",
    category: ["completed"],
    title: "SODIADD",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    country: "French"
  },
  {
    id: "code_wrangler",
    category: ["completed"],
    title: "Code Wrangler",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    country: "French"
  },
  {
    id: "ckm_ckp",
    category: ["completed", "inMyWorksPipeline"],
    title: "CKM CKP Accelerator",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    date: {
      start: "Dec 2024"
    },
    order: 10,
    country: "French"
  },
  {
    id: "rich_media",
    category: ["completed", "inMyWorksPipeline"],
    title: "Rich Media",
    tasks: [WEB_DESIGNER, WEB_DEVELOPER],
    jobTitle: [FREELANCER],
    date: {
      start: "Dec 2024",
      end: "Jun 2025",
      duration: "2 months"
    },
    order: 20,
    country: "French"
  }
] ;


export const getProject = (id: string) =>
  PROJECTS.find(project => project.id === id);
export const getProjectsByCategory = (
  category: Project["category"][number]
) => PROJECTS.filter(project => project.category.includes(category)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export default PROJECTS;
