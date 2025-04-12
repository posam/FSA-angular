import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counterValue = signal(0);

  increment() {
    this.counterValue.update(value => {
      return value + 1;
    })
  }

  decrement() {
    this.counterValue.set(this.counterValue() - 1)
  }

  getSignal() {
    return this.counterValue.asReadonly();
  }

}
