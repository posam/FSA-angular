import { effect, Injectable, signal } from '@angular/core';

const COUNTER_VALUE_KEY = 'counterValue';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counterValue = signal(Number(localStorage.getItem(COUNTER_VALUE_KEY)));

  constructor() {
    effect(() => {
      localStorage.setItem(COUNTER_VALUE_KEY, this.counterValue().toString());
    });
  }

  increment() {
    this.counterValue.update((value) => value + 1);
  }
}
