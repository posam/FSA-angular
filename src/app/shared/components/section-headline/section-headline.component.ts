import {Component, EventEmitter, input, output, Output} from '@angular/core';

@Component({
  selector: 'app-section-headline',
  imports: [],
  templateUrl: './section-headline.component.html'
})
export class SectionHeadlineComponent {
  // @Input() header: string | undefined;
  // @Output() categories = new EventEmitter();

  header = input.required<string>();
  categories = output<string>();

  onCategoriesClick() {
    this.categories.emit('XXX');
  }
}
