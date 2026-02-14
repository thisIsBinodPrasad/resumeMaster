import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../../services/resume.service';
import { Experience } from '../../../models/resume.model';

@Component({
  selector: 'app-experience',
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
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  private fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);

  form = this.fb.group({
    experience: this.fb.array([])
  });

  get experienceArray() {
    return this.form.get('experience') as FormArray;
  }

  constructor() {
    // Load initial data once
    const expList = this.resumeService.experience();
    this.experienceArray.clear();
    expList.forEach(exp => this.addExperience(exp));

    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.resumeService.updateExperience(value.experience as Experience[]);
      }
    });
  }

  addExperience(exp?: Experience) {
    const group = this.fb.group({
      company: [exp?.company || '', Validators.required],
      role: [exp?.role || '', Validators.required],
      duration: [exp?.duration || '', Validators.required],
      description: [exp?.description || '']
    });
    this.experienceArray.push(group);
  }

  removeExperience(index: number) {
    this.experienceArray.removeAt(index);
  }
}
