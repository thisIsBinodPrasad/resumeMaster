import { Component, signal, inject } from '@angular/core';
declare var html2pdf: any;
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TemplateOneComponent } from '../templates/template-one/template-one';
import { TemplateTwoComponent } from '../templates/template-two/template-two';
import { TemplateStudent } from '../templates/template-student/template-student';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    TemplateOneComponent,
    TemplateTwoComponent,
    TemplateStudent
  ],
  templateUrl: './preview.html',
  styleUrl: './preview.scss'
})
export class PreviewComponent {
  private resumeService = inject(ResumeService);
  selectedTemplate = signal<'one' | 'two' | 'student'>('one');

  downloadPDF() {
    const element = document.querySelector('.resume-container');
    if (!element) return;

    // Remove shadows/margins for PDF capture
    element.classList.add('pdf-export');

    const personalInfo = this.resumeService.resume().personalInfo;
    let filename = 'resume.pdf';

    if (personalInfo.fullName) {
      const names = personalInfo.fullName.trim().split(/\s+/);
      if (names.length >= 2) {
        const firstName = names[0];
        const lastName = names[names.length - 1];
        filename = `${lastName}${firstName}CV.pdf`;
      } else {
        filename = `${names[0]}CV.pdf`;
      }
    }

    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    html2pdf().from(element).set(options).save().then(() => {
      element.classList.remove('pdf-export');
    });
  }

  clearData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      this.resumeService.resetResume();
      window.location.reload();
    }
  }
}
