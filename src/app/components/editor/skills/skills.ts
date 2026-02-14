import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ResumeService } from '../../../services/resume.service';
import { Skill } from '../../../models/resume.model';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  private resumeService = inject(ResumeService);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills = signal<Skill[]>([]);

  constructor() {
    this.skills.set(this.resumeService.skills());
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const newSkills = [...this.skills(), { name: value }];
      this.skills.set(newSkills);
      this.resumeService.updateSkills(newSkills);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const newSkills = this.skills().filter(s => s !== skill);
    this.skills.set(newSkills);
    this.resumeService.updateSkills(newSkills);
  }
}
