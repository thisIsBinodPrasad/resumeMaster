import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../../services/resume.service';
import { PersonalInfo } from '../../../models/resume.model';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.scss'
})
export class PersonalInfoComponent {
  private fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    title: ['', Validators.required],
    summary: [''],
    location: [''],
    zipCode: [''],
    linkedin: [''],
    website: ['']
  });

  constructor() {
    // Load initial data
    const info = this.resumeService.personalInfo();
    this.form.patchValue(info, { emitEvent: false });

    // Update service on change
    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.resumeService.updatePersonalInfo(value as PersonalInfo);
      }
    });
  }
}
