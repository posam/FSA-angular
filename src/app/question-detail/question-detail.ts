import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { DiscussionMessagesApi } from '../feature/messages/discussion-messages-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionContainer } from '../shared/component/section-container/section-container';
import { Message } from '../message/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerModal } from '../answer-modal/answer-modal';

@Component({
  selector: 'app-question-detail',
  imports: [SectionContainer, Message],
  templateUrl: './question-detail.html',
})
export class QuestionDetail {
  private route = inject(ActivatedRoute);
  private api = inject(DiscussionMessagesApi);
  private ngbModal = inject(NgbModal);

  question = toSignal(
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.api.getQuestion(Number(params.get('id')));
      }),
    ),
  );

  private refreshSubject = new BehaviorSubject<void>(undefined);

  answers = toSignal(
    combineLatest([
      this.route.paramMap,
      this.refreshSubject.asObservable()
    ]).pipe(
      switchMap(([value]) => {
        const id = Number(value.get('id'));
        return this.api.getQuestionAnswers(id);
      }),
    ),
  );

  protected onAnswerClick(question: any) {
    const modalRef = this.ngbModal.open(AnswerModal);
    modalRef.componentInstance.question = question;

    modalRef.result.then((answer) => {
      this.question();
      this.api.answerQuestion(question, answer).subscribe(() => {
        this.refreshSubject.next(undefined);
      });
    });
  }
}
