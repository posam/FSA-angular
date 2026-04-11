import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterService } from '../../service/counter.service';
import { SectionContainer } from '../../../../shared/component/section-container/section-container';

@Component({
  selector: 'app-counter',
  imports: [FormsModule, SectionContainer],
  templateUrl: './counter.html',
})
export class Counter {
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
