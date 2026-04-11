import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  // lubos.pittner@posam.sk
  // zadanie 1: counterValue mat v counterService a odkladat ju do localStorage

  private counterService = inject(CounterService);

  name = signal('Angular');
  counterValue = this.counterService.counterValue;
  multipleCounter = computed(() => {
    return this.counterValue() * 2;
  });

  protected increment() {
    this.counterService.increment();
  }
}
