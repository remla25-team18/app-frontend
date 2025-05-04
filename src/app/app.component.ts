import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SentimentAnalysisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'app-frontend';
}
