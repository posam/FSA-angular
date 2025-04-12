import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SectionContainerComponent} from '../section-container/section-container.component';
import {SectionHeadlineComponent} from '../section-headline/section-headline.component';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    SectionContainerComponent,
    SectionHeadlineComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
