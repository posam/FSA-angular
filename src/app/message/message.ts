import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DiscussionMessageModel } from '../feature/messages/model/discussion-message-model';

@Component({
  selector: 'app-message',
  imports: [DatePipe],
  templateUrl: './message.html',
})
export class Message {
  message = input.required<DiscussionMessageModel>();
}
