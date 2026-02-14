import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../../services/resume.service';
import { Project } from '../../../models/resume.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  private fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);

  form = this.fb.group({
    projects: this.fb.array([])
  });

  get projectsArray() {
    return this.form.get('projects') as FormArray;
  }

  constructor() {
    // Load initial data once
    const projList = this.resumeService.projects();
    this.projectsArray.clear();
    projList.forEach(proj => this.addProject(proj));

    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        const projects = value.projects?.map((p: any) => ({
          ...p,
          technologies: typeof p.technologies === 'string' ? p.technologies.split(',').map((t: string) => t.trim()) : p.technologies
        })) as Project[];
        this.resumeService.updateProjects(projects);
      }
    });
  }

  addProject(proj?: Project) {
    const group = this.fb.group({
      name: [proj?.name || '', Validators.required],
      description: [proj?.description || '', Validators.required],
      technologies: [proj?.technologies?.join(', ') || ''],
      link: [proj?.link || '']
    });
    this.projectsArray.push(group);
  }

  removeProject(index: number) {
    this.projectsArray.removeAt(index);
  }
}
