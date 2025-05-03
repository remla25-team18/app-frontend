import { Component } from '@angular/core';

@Component({
  selector: 'app-sentiment-analysis',
  imports: [],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Search Area" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
  `,
  styleUrl: './sentiment-analysis.component.css'
})
export class SentimentAnalysisComponent {

}
