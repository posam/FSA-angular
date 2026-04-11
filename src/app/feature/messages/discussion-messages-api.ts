import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionMessageModel } from './model/discussion-message-model';
import { map } from 'rxjs';
import { DiscussionMessageTypeEnum } from './model/discussion-message-type-enum';

@Injectable({
  providedIn: 'root',
})
export class DiscussionMessagesApi {
  private http = inject(HttpClient);

  private readonly _url = '/discussion-messages';

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

  getLatestQuestions() {
    return this.getDiscussionQuestions().pipe(
      map((messages: DiscussionMessageModel[]) => messages.slice(0, 3)),
    );
  }

  getDiscussionMessage(id: number) {
    return this.http.get<DiscussionMessageModel>(`${this._url}/${id}`);
  }

  createQuestion(question: DiscussionMessageModel) {
    question.typ = DiscussionMessageTypeEnum.QUESTION;
    return this.http.post(this._url, question);
  }

  editDiscussionMessage(discussionMessage: DiscussionMessageModel) {
    return this.http.put<void>(`${this._url}/${discussionMessage.id}`, discussionMessage);
  }

  deleteDiscussionMessage(id: number) {
    return this.http.delete<void>(`${this._url}/${id}`);
  }
}
