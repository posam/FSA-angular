import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionMessageModel } from './model/discussion-message-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscussionMessagesApi {
  private http = inject(HttpClient);

  private readonly _url = '/discussion-messages';

  getDiscussionMessages() {
    return this.http.get<DiscussionMessageModel[]>(this._url);
  }

  getLatestMessages() {
    return this.getDiscussionMessages().pipe(
      map((messages: DiscussionMessageModel[]) => messages.slice(0, 3)),
    );
  }

  getDiscussionMessage(id: number) {
    return this.http.get<DiscussionMessageModel>(`${this._url}/${id}`);
  }

  createDiscussionMessage(discussionMessage: DiscussionMessageModel) {
    return this.http.post<number>(this._url, discussionMessage);
  }

  editDiscussionMessage(discussionMessage: DiscussionMessageModel) {
    return this.http.put<void>(`${this._url}/${discussionMessage.id}`, discussionMessage);
  }

  deleteDiscussionMessage(id: number) {
    return this.http.delete<void>(`${this._url}/${id}`);
  }
}
