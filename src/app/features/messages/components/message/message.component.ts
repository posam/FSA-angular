import {Component, input} from '@angular/core';
import {DiscussionMessageModel} from '../../models/discussion-message-model';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {UserModelPipe} from '../../../../shared/pipes/user-model.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-message',
  imports: [
    DatePipe,
    UserModelPipe,
    UpperCasePipe,
    RouterLink
  ],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  message = input.required<DiscussionMessageModel>();
}
