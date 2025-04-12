import {Component, input} from '@angular/core';
import {DiscussionMessageModel} from '../../models/discussion-message-model';
import {DatePipe, UpperCasePipe} from '@angular/common';
import {UserModelPipe} from '../../../../user-model.pipe';

@Component({
  selector: 'app-message',
  imports: [
    DatePipe,
    UserModelPipe,
    UpperCasePipe
  ],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  message = input.required<DiscussionMessageModel>();
}
