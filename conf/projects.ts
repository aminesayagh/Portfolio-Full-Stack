const TASK_PROJECTS = {
    'WEB_DESIGNER': 'Web Designer',
    'WEB_DEVELOPER': 'Web Developer',
    'MOBILE_DEVELOPER': 'Mobile Developer',
    "CRYPTO_DEVELOPER": "Crypto Developer",
    "GRAPHIC_DESIGNER": "Graphic Designer",
    "MARKETER": "Marketer",
    "DATABASE_CONSULTANT": "Database Consultant",
    "SCRAPE_DEVELOPER": "Scrape Developer",
    "BACKEND_DEVELOPER": "Backend Developer",
    "FRONTEND_DEVELOPER": "Frontend Developer",
    "INFRASTRUCTURE_DEVELOPER": "Infrastructure Developer",
    "TECHNICAL_ADVISOR": "Technical Advisor",
    'FULLSTACK_DEVELOPER': 'FULLSTACK DEVELOPER',
} as const;

const TITLE = {
    'CTO': 'CTO',
    'CEO': 'CEO',
    'CO_FOUNDER': 'CO-FOUNDER',
    'FOUNDER': 'FOUNDER',
    'TECHNICAL_ADVISOR': 'TECHNICAL_ADVISOR',
    'RECHERCHE_AND_DEVELOPMENT': 'RECHERCHE AND DEVELOPMENT',
    'FREELANCER': 'FREELANCER',
    'AUTOMATION_SPECIALIST': 'AUTOMATION SPECIALIST',
    "ACADEMIC_PROJECT_PLATFORM_ARCHITECT" :'Academic Project Platform Architect'
} as const;

export type TaskProject = typeof TASK_PROJECTS[keyof typeof TASK_PROJECTS];
export type TitleProject = typeof TITLE[keyof typeof TITLE];

const { WEB_DESIGNER, WEB_DEVELOPER, MOBILE_DEVELOPER, CRYPTO_DEVELOPER, GRAPHIC_DESIGNER, MARKETER, DATABASE_CONSULTANT, SCRAPE_DEVELOPER, BACKEND_DEVELOPER, FRONTEND_DEVELOPER, FULLSTACK_DEVELOPER, INFRASTRUCTURE_DEVELOPER } = TASK_PROJECTS;
const { CTO, CEO, CO_FOUNDER, FOUNDER, TECHNICAL_ADVISOR, RECHERCHE_AND_DEVELOPMENT, FREELANCER,ACADEMIC_PROJECT_PLATFORM_ARCHITECT, AUTOMATION_SPECIALIST } = TITLE;

export type ProjectTitle = 'Happy Water' | 'Nft Musical' | 'Cyber Cohesion' | 'Shinoby boy' | 'Web Application for managing university Projects' | 'SODIADD' | 'Jonas Agency' | "Lavish Trading" | "Maschool" | "FreeLance Projects";

interface Project {
    id: `${number}`;
    title: ProjectTitle;
    tasks: TaskProject[];
    jobTitle: TitleProject[];
}
const PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Happy Water',
        tasks: [WEB_DESIGNER, WEB_DEVELOPER, CRYPTO_DEVELOPER],
        jobTitle: [CTO, CO_FOUNDER]
    },
    {
        id: '2',
        title: 'Nft Musical',
        tasks: [FRONTEND_DEVELOPER],
        jobTitle: [ AUTOMATION_SPECIALIST]
    },
    {
        id: '3',
        title: "Cyber Cohesion",
        tasks: [WEB_DEVELOPER, DATABASE_CONSULTANT],
        jobTitle: [TECHNICAL_ADVISOR, RECHERCHE_AND_DEVELOPMENT]
    },
    {
        id: '4',
        title: "Shinoby boy",
        tasks: [FULLSTACK_DEVELOPER, SCRAPE_DEVELOPER, INFRASTRUCTURE_DEVELOPER],
        jobTitle: [FOUNDER]
    },
    {
        id: '5',
        title: "Web Application for managing university Projects",
        tasks: [FULLSTACK_DEVELOPER],
        jobTitle: [ACADEMIC_PROJECT_PLATFORM_ARCHITECT]
    },
    {
        id: '6',
        title: "SODIADD",
        tasks: [WEB_DESIGNER, FULLSTACK_DEVELOPER],
        jobTitle: [CTO, CO_FOUNDER]
    },
    {
        id: '7',
        title: "Jonas Agency",
        tasks: [FULLSTACK_DEVELOPER],
        jobTitle: [FREELANCER]
    },
    {
        id: '8',
        title: "Lavish Trading",
        tasks: [WEB_DESIGNER,FULLSTACK_DEVELOPER],
        jobTitle: [FREELANCER]
    },
    {
        id: '9',
        title: "Maschool",
        tasks: [WEB_DESIGNER, FRONTEND_DEVELOPER],
        jobTitle: [CO_FOUNDER]
    },
    {
        id: '10',
        title: "FreeLance Projects",
        tasks: [WEB_DESIGNER, GRAPHIC_DESIGNER, WEB_DEVELOPER],
        jobTitle: [FREELANCER]
    }
];
export default PROJECTS;