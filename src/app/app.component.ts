import {Component, computed, effect, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

const LOCALSTORAGE_NAME_KEY = 'name';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = model(localStorage.getItem(LOCALSTORAGE_NAME_KEY) || 'Angular');

  counterValue = signal(0);
  counterMultiplied = computed(() => {
    return this.counterValue() * 2;
  })

  constructor() {
    effect(() => {
      localStorage.setItem(LOCALSTORAGE_NAME_KEY, this.name());
    })
  }

  increment() {
    this.counterValue.update(value => {
      return value + 1;
    })
  }

  decrement() {
    this.counterValue.set(this.counterValue() - 1)
  }


}
