import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {CounterComponent} from './counter/counter.component';
import {NotFoundComponent} from './features/not-found/not-found.component';
import {canActiveHome} from './core/services/user.service';
import {MessageDetailComponent} from './features/messages/components/message-detail/message-detail.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [canActiveHome]},
  {path: 'counter', component: CounterComponent},
  {path: 'messages/:id', component: MessageDetailComponent},

  {path: '', redirectTo: 'counter', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];
