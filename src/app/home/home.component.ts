import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SectionHeadlineComponent} from '../section-headline/section-headline.component';
import {DiscussionMessagesApiService} from '../features/messages/services/discussion-messages-api.service';
import {DiscussionMessageModel} from '../features/messages/models/discussion-message-model';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    SectionHeadlineComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  messages: DiscussionMessageModel[] | undefined;

  private messagesService = inject(DiscussionMessagesApiService);

  constructor() {
    this.messagesService.getDiscussionMessages()
      .subscribe({
        next: (messages) => {
          this.messages = messages
        },
        error: (error) => {
          alert(error.message)
        }
      })
  }
}
