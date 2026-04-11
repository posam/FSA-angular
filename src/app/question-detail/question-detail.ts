import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { DiscussionMessagesApi } from '../feature/messages/discussion-messages-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { SectionContainer } from '../shared/component/section-container/section-container';
import { Message } from '../message/message';

@Component({
  selector: 'app-question-detail',
  imports: [JsonPipe, SectionContainer, Message],
  templateUrl: './question-detail.html',
})
export class QuestionDetail {
  private route = inject(ActivatedRoute);
  private api = inject(DiscussionMessagesApi);

  question = toSignal(
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.api.getQuestion(Number(params.get('id')));
      }),
    ),
  );

  answers = toSignal(
    this.route.paramMap.pipe(
      switchMap((value) => {
        const id = Number(value.get('id'));
        return this.api.getQuestionAnswers(id);
      }),
    ),
  );

  protected onAnswerClick(question: any) {}
}
