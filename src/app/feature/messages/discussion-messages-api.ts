import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionMessageModel } from './model/discussion-message-model';
import { map, switchMap } from 'rxjs';
import { DiscussionMessageTypeEnum } from './model/discussion-message-type-enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscussionMessagesApi {
  private http = inject(HttpClient);

  private readonly _url = environment.beUrl + '/discussion-messages';

  getDiscussionMessages() {
    return this.http.get<DiscussionMessageModel[]>(this._url);
  }

  getDiscussionQuestions() {
    return this.getDiscussionMessages().pipe(
      map((messages: DiscussionMessageModel[]) =>
        messages.filter((m) => m.typ === DiscussionMessageTypeEnum.QUESTION),
      ),
    );
  }
  getAnswers() {
    return this.getDiscussionMessages().pipe(
      map((messages: DiscussionMessageModel[]) =>
        messages.filter((m) => m.typ === DiscussionMessageTypeEnum.ANSWER),
      ),
    );
  }

  getLatestQuestions() {
    return this.getDiscussionQuestions().pipe(
      map((messages: DiscussionMessageModel[]) => messages.slice(0, 3)),
    );
  }

  getQuestion(id: number) {
    return this.getDiscussionQuestions().pipe(
      map((questions) => {
        return questions.find((question) => question.id === id);
      }),
    );
  }

  createQuestion(question: DiscussionMessageModel) {
    question.typ = DiscussionMessageTypeEnum.QUESTION;
    return this.http.post(this._url, question);
  }

  getQuestionAnswers(id: number) {
    return this.getQuestion(id).pipe(
      switchMap((question) => {
        return this.getAnswers().pipe(
          map((allAnswers) =>
            allAnswers.filter((answer) => answer!.name!.indexOf(question!.name!) > -1),
          ),
        );
      }),
    );
  }

  editDiscussionMessage(discussionMessage: DiscussionMessageModel) {
    return this.http.put<void>(`${this._url}/${discussionMessage.id}`, discussionMessage);
  }

  deleteDiscussionMessage(id: number) {
    return this.http.delete<void>(`${this._url}/${id}`);
  }
}
