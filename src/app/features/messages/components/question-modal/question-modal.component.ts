import {Component, inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DiscussionMessageModel} from '../../models/discussion-message-model';
import {FormsModule, NgForm} from '@angular/forms';
import {DiscussionMessagesApiService} from '../../services/discussion-messages-api.service';

@Component({
  selector: 'app-question-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  message: DiscussionMessageModel = {};

  private activeModal = inject(NgbActiveModal);
  private messagesApiService = inject(DiscussionMessagesApiService);

  close() {
    this.activeModal.dismiss();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.messagesApiService.createQuestion(this.message)
      .subscribe(value => {
        this.activeModal.close(value);
      })
  }

}
