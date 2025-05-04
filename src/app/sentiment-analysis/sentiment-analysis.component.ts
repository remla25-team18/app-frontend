import { Component, Injectable } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ModelOutput } from '../ModelOutput';

@Component({
  selector: 'app-sentiment-analysis',
  imports: [FeedbackComponent],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.css'
})
@Injectable({
  providedIn: 'root',
})
export class SentimentAnalysisComponent {
  url = "http://localhost:3000/modelOutput";
  modelOutput: ModelOutput = {
     analysis: "positive",
     version: "1.0.0"
  };
  loading: boolean = true;

  async getResponce(): Promise<void> {
    const data = await fetch(this.url); // TODO: improve with HttpClient
    const dataList = (await data.json()) ?? null; 
    console.log(dataList[0]);
    this.loading = false;
    if (dataList && dataList.length > 0) {
      this.modelOutput = dataList[0];
    } else {
      console.error('No data received from the model output.');
    }
  }

  ngOnInit(): void {
    this.getResponce();
  }
}
