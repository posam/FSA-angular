import {Component, computed, effect, inject, model} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CounterService} from '../counter.service';
import {SectionContainerComponent} from '../section-container/section-container.component';
import {SectionHeadlineComponent} from '../section-headline/section-headline.component';

const LOCALSTORAGE_NAME_KEY = 'name';

@Component({
  selector: 'app-counter',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SectionContainerComponent,
    SectionHeadlineComponent
  ],
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  private counterService = inject(CounterService);


  name = model(localStorage.getItem(LOCALSTORAGE_NAME_KEY) || 'Angular');
  counterValue = this.counterService.getSignal();

  counterMultiplied = computed(() => {
    return this.counterValue() * 2;
  })

  constructor(/*private counterService: CounterService*/) {
    effect(() => {
      localStorage.setItem(LOCALSTORAGE_NAME_KEY, this.name());
    })
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  onCatClick($event: string) {
    alert('Categories clicked ' + $event);
  }
}
