import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Resume, INITIAL_RESUME_STATE, PersonalInfo, Education, Experience, Skill, Project } from '../models/resume.model';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {
    // Signal to hold the entire resume state
    private resumeSignal: WritableSignal<Resume> = signal(INITIAL_RESUME_STATE);

    // Read-only signals for components to consume
    resume = computed(() => this.resumeSignal());
    personalInfo = computed(() => this.resumeSignal().personalInfo);
    education = computed(() => this.resumeSignal().education);
    experience = computed(() => this.resumeSignal().experience);
    skills = computed(() => this.resumeSignal().skills);
    projects = computed(() => this.resumeSignal().projects);

    constructor() {
        // Load from local storage if available
        const saved = localStorage.getItem('resume-maker-data');
        if (saved) {
            try {
                this.resumeSignal.set(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load resume data', e);
            }
        }
    }

    // Generic update method
    updateResume(partialResume: Partial<Resume>) {
        this.resumeSignal.update(current => {
            const newState = { ...current, ...partialResume };
            this.saveToStorage(newState);
            return newState;
        });
    }

    updatePersonalInfo(info: PersonalInfo) {
        this.updateResume({ personalInfo: info });
    }

    updateEducation(education: Education[]) {
        this.updateResume({ education });
    }

    updateExperience(experience: Experience[]) {
        this.updateResume({ experience });
    }

    updateSkills(skills: Skill[]) {
        this.updateResume({ skills });
    }

    updateProjects(projects: Project[]) {
        this.updateResume({ projects });
    }

    private saveToStorage(state: Resume) {
        localStorage.setItem('resume-maker-data', JSON.stringify(state));
    }

    resetResume() {
        this.resumeSignal.set(INITIAL_RESUME_STATE);
        localStorage.removeItem('resume-maker-data');
    }
}
