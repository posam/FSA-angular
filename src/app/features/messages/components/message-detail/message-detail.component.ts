import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {DiscussionMessagesApiService} from '../../services/discussion-messages-api.service';
import {DiscussionMessageModel} from '../../models/discussion-message-model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-message-detail',
  imports: [
    AsyncPipe,
    MessageComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './message-detail.component.html'
})
export class MessageDetailComponent {

  question$: Observable<DiscussionMessageModel | undefined>;
  answers$: Observable<DiscussionMessageModel[]>;

  constructor(private route: ActivatedRoute, private messagesApiService: DiscussionMessagesApiService) {

    this.question$ = route.paramMap
      .pipe(switchMap(map => {
        const id = Number(map.get('id'));
        return messagesApiService.getMessage(id);
      }))


    this.answers$ = route.paramMap
      .pipe(switchMap(value => {
        const id = Number(value.get('id'));
        return messagesApiService.getAnswers(id);
      }))


  }
}
