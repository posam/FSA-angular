import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SectionHeadlineComponent} from '../../shared/components/section-headline/section-headline.component';
import {DiscussionMessagesApiService} from '../messages/services/discussion-messages-api.service';
import {DiscussionMessageModel} from '../messages/models/discussion-message-model';
import {MessageComponent} from '../messages/components/message/message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionModalComponent} from '../messages/components/question-modal/question-modal.component';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    SectionHeadlineComponent,
    MessageComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  messages$: Observable<DiscussionMessageModel[] | undefined>;

  private messagesService = inject(DiscussionMessagesApiService);
  private ngModal = inject(NgbModal);

  private refreshSubject = new BehaviorSubject(undefined);

  constructor() {
    this.messages$ = this.refreshSubject
      .pipe(switchMap(() => {
        return this.messagesService.getDiscussionMessages();
      }))
  }

  onNewQuestionClick() {
    const modalRef = this.ngModal.open(QuestionModalComponent);

    modalRef.result.then(() => {
      this.refreshSubject.next(undefined);
    }, () => {

    })
  }
}
