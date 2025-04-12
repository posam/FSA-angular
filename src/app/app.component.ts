import {Component, computed, effect, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CounterService} from './counter.service';

const LOCALSTORAGE_NAME_KEY = 'name';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

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


}
