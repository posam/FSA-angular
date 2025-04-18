import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {DiscussionMessagesApiService} from '../../services/discussion-messages-api.service';
import {DiscussionMessageModel} from '../../models/discussion-message-model';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MessageComponent} from '../message/message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnswerModalComponent} from '../../../../answer-modal/answer-modal.component';
import {SectionContainerComponent} from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'app-message-detail',
  imports: [
    AsyncPipe,
    MessageComponent,
    NgForOf,
    SectionContainerComponent
  ],
  templateUrl: './message-detail.component.html'
})
export class MessageDetailComponent {

  question$: Observable<DiscussionMessageModel | undefined>;
  answers$: Observable<DiscussionMessageModel[]>;

  private refreshSubject = new BehaviorSubject(undefined);
  private ngbModal = inject(NgbModal);

  constructor(route: ActivatedRoute, messagesApiService: DiscussionMessagesApiService) {

    this.question$ = this.refreshSubject
      .pipe(switchMap(() => {
        return route.paramMap
          .pipe(switchMap(map => {
            const id = Number(map.get('id'));
            return messagesApiService.getMessage(id);
          }))
      }));

    this.answers$ = this.refreshSubject
      .pipe(switchMap(() => {
        return route.paramMap
          .pipe(switchMap(value => {
            const id = Number(value.get('id'));
            return messagesApiService.getAnswers(id);
          }))
      }));
  }

  onAnswerClick(question: DiscussionMessageModel) {
    const ngbModalRef = this.ngbModal.open(AnswerModalComponent);

    ngbModalRef.componentInstance.question = question;

    ngbModalRef.result.then(() => {
      this.refreshSubject.next(undefined);
    })
  }
}
