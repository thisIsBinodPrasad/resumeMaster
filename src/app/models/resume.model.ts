export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    title: string;
    summary: string;
    location: string;
    zipCode?: string;
    linkedin?: string;
    website?: string;
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
    description?: string;
}

export interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

export interface Skill {
    name: string;
    level?: string; // e.g., Beginner, Intermediate, Expert
}

export interface Project {
    name: string;
    description: string;
    technologies?: string[];
    link?: string;
}

export interface Resume {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    projects: Project[];
}

export const INITIAL_RESUME_STATE: Resume = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        title: '',
        summary: '',
        location: '',
        zipCode: '',
        linkedin: '',
        website: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
};
