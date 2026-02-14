import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../../services/resume.service';

@Component({
  selector: 'app-template-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-two.html',
  styleUrl: './template-two.scss'
})
export class TemplateTwoComponent {
  resumeService = inject(ResumeService);
  resume = this.resumeService.resume;

  getSkillsString() {
    return this.resume().skills.map(s => s.name).join(', ');
  }
}
