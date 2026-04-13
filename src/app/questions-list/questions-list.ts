import { Component, inject, Signal } from '@angular/core';
import { DiscussionMessageModel } from '../feature/messages/model/discussion-message-model';
import { DiscussionMessagesApi } from '../feature/messages/discussion-messages-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { Message } from '../message/message';
import { SectionContainer } from '../shared/component/section-container/section-container';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModal } from '../question-modal/question-modal';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-questions-list',
  imports: [Message, SectionContainer],
  templateUrl: './questions-list.html',
})
export class QuestionsList {
  messages: Signal<DiscussionMessageModel[] | undefined>;
  refreshSubject = new BehaviorSubject<void>(undefined);

  private api = inject(DiscussionMessagesApi);
  private modal = inject(NgbModal);

  constructor() {
    this.messages = toSignal(
      this.refreshSubject.asObservable().pipe(switchMap(() => this.api.getDiscussionQuestions())),
    );
  }

  protected onNewQuestionClick() {
    let modalRef = this.modal.open(QuestionModal);
    modalRef.componentInstance.question = {};
    modalRef.result.then((question) => {
      this.api.createQuestion(question).subscribe(() => {
        this.refreshSubject.next();
      });
    });
  }
}
