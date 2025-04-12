import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'Angular';

  counterValue = signal(0);
  counterMultiplied = computed(() => {
    return this.counterValue() * 2;
  })

  increment() {
    this.counterValue.update(value => {
      return value + 1;
    })
  }

  decrement() {
    this.counterValue.set(this.counterValue() - 1)
  }
}
