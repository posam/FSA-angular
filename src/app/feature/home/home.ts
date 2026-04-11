import { Component, inject } from '@angular/core';
import { SectionContainer } from '../../shared/component/section-container/section-container';
import { DiscussionMessagesApi } from '../messages/discussion-messages-api';

@Component({
  selector: 'app-home',
  imports: [SectionContainer],
  templateUrl: './home.html',
})
export class Home {
  private api = inject(DiscussionMessagesApi);

  constructor() {
    this.api.getDiscussionMessages().subscribe((value) => {
      console.log(value);
    });
  }
}
