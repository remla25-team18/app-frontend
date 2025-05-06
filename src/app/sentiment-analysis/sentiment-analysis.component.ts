import { Component, Input, Injectable, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ModelOutput } from '../ModelOutput';
import { UserInput } from '../UserInput';

@Component({
  selector: 'app-sentiment-analysis',
  imports: [
    FeedbackComponent, 
    FormsModule,
  ],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.css'
})

@Injectable({
  providedIn: 'root',
})

export class SentimentAnalysisComponent {

  // Getting User Input
  userInput: UserInput = {
    comment: ""
  };
  updateInput(): void {
    console.log(`Submit: ${this.userInput.comment} to model`);
  }


  // Submit User Input
  private http = inject(HttpClient);
  inputUrl = "http://localhost:3000/userInput";
  modelOutput: ModelOutput = {
    analysis: "default",
    app_version: "0.0.0",
    model_version: "0.0.0",
  };

  submitAction(): void {
    console.log(this.userInput);

    // Post the inputresponse
    this.http.post<{ label: string, model_version: string }>(this.inputUrl, { text: this.userInput})
      .subscribe(response => {
        this.modelOutput.analysis = response.label;
        this.modelOutput.model_version = response.model_version;

        console.log(this.modelOutput.analysis, this.modelOutput.model_version);
    });
  }

  // User feedback
  judgmentUrl = "http://localhost:3000/judgment";
  submitJudgment(isCorrect: boolean): void {
    const judgmentPayload = { isCorrect }; // Wrap the boolean in an object
    console.log(judgmentPayload);

    // Pop out a widget telling user we have received the response;
    if (isCorrect) {
      alert("Thanks for feedback, we are happy we get you :)");
    } else {
      alert("Oops, sorry! We'll do better next time ;)");
    }


    // Post the feedback to app-service
    this.http.post(this.judgmentUrl, judgmentPayload).subscribe({
      next: (response) => {
        console.log('Judgment submitted successfully:', response);
      },
      error: (error) => {
        console.error('Error submitting judgment:', error);
      }
    });
  }
}
