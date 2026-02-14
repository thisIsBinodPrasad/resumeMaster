import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../../services/resume.service';

@Component({
  selector: 'app-template-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-one.html',
  styleUrl: './template-one.scss'
})
export class TemplateOneComponent {
  resumeService = inject(ResumeService);
  resume = this.resumeService.resume;
}
