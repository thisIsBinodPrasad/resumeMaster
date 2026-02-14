import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor';
import { PreviewComponent } from './components/preview/preview';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EditorComponent, PreviewComponent, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
