import {Component, inject, OnInit} from '@angular/core';
import {DiscussionMessageModel} from '../features/messages/models/discussion-message-model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DiscussionMessagesApiService} from '../features/messages/services/discussion-messages-api.service';

@Component({
  selector: 'app-answer-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './answer-modal.component.html'
})
export class AnswerModalComponent implements OnInit {

  question: DiscussionMessageModel | undefined;

  form: FormGroup;

  private activeModal = inject(NgbActiveModal);
  private messagesApiService = inject(DiscussionMessagesApiService);

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    this.form.controls['name'].disable();
  }

  ngOnInit() {
    if (this.question) {
      this.form.patchValue({
        name: this.question.name,
      })
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }


    if (this.question) {
      this.messagesApiService.answerQuestion(this.question, this.form.getRawValue())
        .subscribe(value => {
          this.activeModal.close(value);
        })
    }

  }
}
