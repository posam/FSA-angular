import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DiscussionMessageModel } from '../feature/messages/model/discussion-message-model';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-message',
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './message.html',
})
export class Message {
  message = input.required<DiscussionMessageModel>();
}
