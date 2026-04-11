import { Component, inject, Signal } from '@angular/core';
import { SectionContainer } from '../../shared/component/section-container/section-container';
import { DiscussionMessagesApi } from '../messages/discussion-messages-api';
import { DiscussionMessageModel } from '../messages/model/discussion-message-model';
import { Message } from '../../message/message';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SectionContainer, Message, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  messages: Signal<DiscussionMessageModel[] | undefined>;

  private api = inject(DiscussionMessagesApi);

  constructor() {
    this.messages = toSignal(this.api.getLatestQuestions());
  }
}
