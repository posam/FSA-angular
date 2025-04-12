import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SectionHeadlineComponent} from '../section-headline/section-headline.component';
import {DiscussionMessagesApiService} from '../features/messages/services/discussion-messages-api.service';
import {DiscussionMessageModel} from '../features/messages/models/discussion-message-model';
import {MessageComponent} from '../features/messages/components/message/message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionModalComponent} from '../question-modal/question-modal.component';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    SectionHeadlineComponent,
    MessageComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  messages: DiscussionMessageModel[] | undefined;

  private messagesService = inject(DiscussionMessagesApiService);
  private ngModal = inject(NgbModal);

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

  onNewQuestionClick() {
    const modalRef = this.ngModal.open(QuestionModalComponent);

    modalRef.result.then((result) => {

    }, reason => {

    })
  }
}
