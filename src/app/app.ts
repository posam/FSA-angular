import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  name = signal('Angular');
  counterValue = signal(0);
  multipleCounter = computed(() => {
    return this.counterValue() * 2;
  });

  constructor() {
    effect(() => {
      console.log(this.multipleCounter());
    });
  }

  protected increment() {
    // this.counterValue.set(this.counterValue() + 1);
    this.counterValue.update((value) => value + 1);
  }
}
