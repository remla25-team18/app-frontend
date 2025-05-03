import { Component } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ModelOutput } from '../ModelOutput';

@Component({
  selector: 'app-sentiment-analysis',
  imports: [FeedbackComponent],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.css'
})
export class SentimentAnalysisComponent {
  modelOutput: ModelOutput = {
    analysis: "positive",
    version: "1.0.0",
  }
}
