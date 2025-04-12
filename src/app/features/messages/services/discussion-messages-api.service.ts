import {inject, Injectable} from '@angular/core';
import {DiscussionMessageModel} from '../models/discussion-message-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DiscussionMessageTypeEnum} from '../models/discussion-message-type-enum';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionMessagesApiService {

  private http = inject(HttpClient);
  private beUrl = environment.beUrl + '/discussion-messages';

  getDiscussionMessages() {
    return this.http.get<DiscussionMessageModel[]>(this.beUrl);
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

  createQuestion(question: DiscussionMessageModel) {
    const questionBody = {...question} as DiscussionMessageModel;

    questionBody.created = new Date();
    questionBody.typ = DiscussionMessageTypeEnum.QUESTION;

    return this.http.post(this.beUrl, questionBody);
  }


  getAllQuestion() {
    return this.getDiscussionMessages()
      .pipe(map(allMessages => allMessages
        .filter(message => message.typ === DiscussionMessageTypeEnum.QUESTION)));
  }


  getAllAnswers() {
    return this.getDiscussionMessages()
      .pipe(map(allMessages => allMessages
        .filter(message => message.typ === DiscussionMessageTypeEnum.ANSWER)));
  }

  getMessage(id: number) {
    return this.getAllQuestion()
      .pipe(map(questions => {
        return questions.find(question => question.id === id)
      }));
  }


  getAnswers(messageId: number) {
    return this.getMessage(messageId)
      .pipe(switchMap(question => {
        return this.getAllAnswers()
          .pipe(map(allAnswers => allAnswers.filter(answer => answer.name === question?.name)));
      }))
  }


}
