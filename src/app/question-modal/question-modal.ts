import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscussionMessageModel } from '../feature/messages/model/discussion-message-model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule],
  templateUrl: './question-modal.html',
})
export class QuestionModal implements OnInit {
  question: DiscussionMessageModel | undefined;

  private modal = inject(NgbActiveModal);

  ngOnInit() {
    console.log(this.question);
  }

  protected close() {
    this.modal.dismiss();
  }

  protected onSubmit(ngForm: NgForm) {
    if (ngForm.invalid) {
      return;
    }

    this.modal.close(this.question);
  }
}
