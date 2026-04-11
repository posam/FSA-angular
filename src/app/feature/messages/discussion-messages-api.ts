import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionMessageModel } from './model/discussion-message-model';

@Injectable({
  providedIn: 'root',
})
export class DiscussionMessagesApi {
  private http = inject(HttpClient);

  getDiscussionMessages() {
    return this.http.get<DiscussionMessageModel[]>('/discussion-messages');
  }

}
