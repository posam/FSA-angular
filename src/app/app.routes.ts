import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {NotFoundComponent} from './not-found/not-found.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'counter', component: CounterComponent},

  {path: '', redirectTo: 'counter', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];
