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

  submitAction(): void {
    console.log(this.userInput);
    this.http.post(this.inputUrl, this.userInput).subscribe( {
      next: (response) => {
        console.log(`User input: ${this.userInput.comment} successfully sent to the server: ${response.toString}`);
      },
      error: (error) => {
        console.error('Error sending user input to the server:', error);
      },
    })
  }


  // Receiving Responce
  outputUrl = "http://localhost:3000/modelOutput";
  modelOutput: ModelOutput = {
     analysis: "default",
     version: "1.0.0"
  };
  loading: boolean = true;

  getResponce(): void {
    this.loading = true;

    this.http.get<ModelOutput>(this.outputUrl).subscribe({
      next: (receivedData) => {
        this.loading = false; // Set loading to false after receiving the response

        console.log(this.modelOutput);
        if (receivedData) {
          this.modelOutput = receivedData;
          console.log(`Successfully set modelOutput to be ${receivedData.analysis}`);
        } else {
          console.error('No data received from the model output.');
        }
      },
      error: (error) => {
        console.error('Error fetching model output:', error);
        this.loading = false; 
      },
    });
  }

  ngOnInit(): void {
    this.getResponce();
  }

  // Background animation
}
