import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiscussionMessageModel } from '../feature/messages/model/discussion-message-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-answer-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './answer-modal.html',
})
export class AnswerModal implements OnInit {
  question: DiscussionMessageModel | undefined;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  private modal = inject(NgbActiveModal);

  constructor() {
    this.form.controls['name'].disable();
  }

  ngOnInit() {
    if (this.question) {
      this.form.patchValue({
        name: this.question.name,
      });
    }
  }

  close() {
    this.modal.dismiss();
  }

  protected submit() {
    if (this.form.invalid) {
      return;
    }

    this.modal.close(this.form.getRawValue());
  }
}
