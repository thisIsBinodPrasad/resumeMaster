import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../../services/resume.service';
import { Education } from '../../../models/resume.model';

@Component({
  selector: 'app-education',
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
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
  private fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);

  form = this.fb.group({
    education: this.fb.array([])
  });

  get educationArray() {
    return this.form.get('education') as FormArray;
  }

  constructor() {
    // Load initial data
    // Load initial data once
    const eduList = this.resumeService.education();
    this.educationArray.clear();
    eduList.forEach(edu => this.addEducation(edu));

    // Update service on change
    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.resumeService.updateEducation(value.education as Education[]);
      }
    });
  }

  addEducation(edu?: Education) {
    const group = this.fb.group({
      institution: [edu?.institution || '', Validators.required],
      degree: [edu?.degree || '', Validators.required],
      year: [edu?.year || '', Validators.required],
      description: [edu?.description || '']
    });
    this.educationArray.push(group);
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }
}
