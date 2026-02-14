import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from './personal-info/personal-info';
import { EducationComponent } from './education/education';
import { ExperienceComponent } from './experience/experience';
import { SkillsComponent } from './skills/skills';
import { ProjectsComponent } from './projects/projects';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    PersonalInfoComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class EditorComponent {
  selectedIndex = signal(0);

  nextTab() {
    if (this.selectedIndex() < 4) {
      this.selectedIndex.update(i => i + 1);
    }
  }

  prevTab() {
    if (this.selectedIndex() > 0) {
      this.selectedIndex.update(i => i - 1);
    }
  }
}
