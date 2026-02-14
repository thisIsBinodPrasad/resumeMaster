import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../../services/resume.service';

@Component({
  selector: 'app-template-student',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resume-container" [class.pdf-export]="true">
      <header>
        <div class="name">{{ resume().personalInfo.fullName }}</div>
        <div class="title">{{ resume().personalInfo.title }}</div>
        <div class="contact-line">
          {{ resume().personalInfo.email }} | {{ resume().personalInfo.phone }} | 
          {{ resume().personalInfo.location }} {{ resume().personalInfo.zipCode }}
        </div>
      </header>

      <div class="section" *ngIf="resume().personalInfo.summary">
        <div class="section-title">Objective / Profile</div>
        <p class="summary">{{ resume().personalInfo.summary }}</p>
      </div>

      <div class="section" *ngIf="resume().education.length > 0">
        <div class="section-title">Education</div>
        <div class="entry" *ngFor="let edu of resume().education">
          <div class="entry-header">
            <span class="main-text">{{ edu.institution }}</span>
            <span class="date">{{ edu.year }}</span>
          </div>
          <div class="sub-text">{{ edu.degree }}</div>
          <div class="description">{{ edu.description }}</div>
        </div>
      </div>

      <div class="section" *ngIf="resume().projects.length > 0">
        <div class="section-title">Academic & Technical Projects</div>
        <div class="entry" *ngFor="let proj of resume().projects">
          <div class="entry-header">
            <span class="main-text">{{ proj.name }}</span>
            <a *ngIf="proj.link" [href]="proj.link" class="link">Project Link</a>
          </div>
          <div class="tech-stack" *ngIf="proj.technologies?.length">Tech: {{ proj.technologies?.join(', ') }}</div>
          <div class="description">{{ proj.description }}</div>
        </div>
      </div>

      <div class="section" *ngIf="resume().experience.length > 0">
        <div class="section-title">Experience & Internships</div>
        <div class="entry" *ngFor="let exp of resume().experience">
          <div class="entry-header">
            <span class="main-text">{{ exp.company }}</span>
            <span class="date">{{ exp.duration }}</span>
          </div>
          <div class="sub-text">{{ exp.role }}</div>
          <div class="description">{{ exp.description }}</div>
        </div>
      </div>

      <div class="section" *ngIf="resume().skills.length > 0">
        <div class="section-title">Skills & Interests</div>
        <div class="skills-list">
          <span class="skill-item" *ngFor="let skill of resume().skills; let last = last">
            {{ skill.name }}{{ last ? '' : ', ' }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .resume-container {
      font-family: 'Outfit', 'Inter', sans-serif;
      color: #334155;
      max-width: 850px;
      margin: 0 auto;
      background: white;
      padding: 40px 50px;
      line-height: 1.5;
    }

    header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 15px;

      .name {
        font-size: 32pt;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.5px;
      }

      .title {
        font-size: 14pt;
        color: #475569;
        font-weight: 500;
        margin-top: 5px;
      }

      .contact-line {
        font-size: 10pt;
        color: #64748b;
        margin-top: 8px;
      }
    }

    .section {
      margin-bottom: 22px;
      break-inside: avoid;

      .section-title {
        font-size: 14pt;
        font-weight: 700;
        color: #0f172a;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
        border-left: 4px solid #3f51b5;
        padding-left: 10px;
        background: #f8fafc;
      }
    }

    .summary {
      font-size: 10.5pt;
      color: #334155;
    }

    .entry {
      margin-bottom: 15px;
      break-inside: avoid;

      .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .main-text {
        font-size: 12pt;
        font-weight: 700;
        color: #1e293b;
      }

      .date {
        font-size: 10pt;
        color: #64748b;
        font-weight: 500;
      }

      .sub-text {
        font-size: 11pt;
        font-weight: 600;
        color: #3f51b5;
        margin: 2px 0;
      }

      .description {
        font-size: 10.5pt;
        color: #475569;
        white-space: pre-line;
      }

      .tech-stack {
        font-size: 9.5pt;
        font-weight: 600;
        color: #64748b;
        background: #f1f5f9;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        margin: 4px 0;
      }

      .link {
        font-size: 10pt;
        color: #3f51b5;
        text-decoration: underline;
      }
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      font-size: 10.5pt;
      color: #334155;

      .skill-item {
        font-weight: 500;
      }
    }

    @media print {
      .resume-container {
        padding: 0;
        width: 100%;
      }
    }
  `,
})
export class TemplateStudent {
  private resumeService = inject(ResumeService);
  resume = this.resumeService.resume;
}
