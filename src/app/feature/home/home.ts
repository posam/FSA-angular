import { Component, inject } from '@angular/core';
import { SectionContainer } from '../../shared/component/section-container/section-container';
import { DiscussionMessagesApi } from '../messages/discussion-messages-api';
import { Observable } from 'rxjs';
import { DiscussionMessageModel } from '../messages/model/discussion-message-model';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Message } from '../../message/message';

@Component({
  selector: 'app-home',
  imports: [SectionContainer, AsyncPipe, JsonPipe, DatePipe, CurrencyPipe, Message],
  templateUrl: './home.html',
})
export class Home {
  messages$: Observable<DiscussionMessageModel[]>;

  private api = inject(DiscussionMessagesApi);

  constructor() {
    this.messages$ = this.api.getDiscussionMessages();
  }
}
