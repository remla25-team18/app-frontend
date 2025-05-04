import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelOutput } from '../ModelOutput';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  @Input() feedback!: ModelOutput; // variable: dataType
}
