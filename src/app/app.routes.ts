import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {canActiveHome} from './user.service';
import {MessageDetailComponent} from './message-detail/message-detail.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [canActiveHome]},
  {path: 'counter', component: CounterComponent},
  {path: 'messages/:id', component: MessageDetailComponent},

  {path: '', redirectTo: 'counter', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];
