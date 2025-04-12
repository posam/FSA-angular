import {inject, Injectable} from '@angular/core';
import {DiscussionMessageModel} from '../models/discussion-message-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionMessagesApiService {

  private http = inject(HttpClient);

  getDiscussionMessages() {
    return this.http.get<DiscussionMessageModel[]>('/discussion-messages');
    // return of([
    //   {
    //     id: 1,
    //     name: 'Angular',
    //     message: ' Angular course',
    //     created: new Date(),
    //     typ: DiscussionMessageTypeEnum.QUESTION
    //   } as DiscussionMessageModel,
    // ]);
  }

}
