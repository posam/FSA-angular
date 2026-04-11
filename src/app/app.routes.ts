import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { PageNotFound } from './core/component/page-not-found/page-not-found';
import { Counter } from './feature/counter/page/counter/counter';
import { isLoggedIn } from './core/app-guards';
import { QuestionsList } from './questions-list/questions-list';
import { QuestionDetail } from './question-detail/question-detail';

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [isLoggedIn] },
  { path: 'counter', component: Counter },
  { path: 'questions', component: QuestionsList, canActivate: [isLoggedIn] },
  { path: 'questions/:id', component: QuestionDetail, canActivate: [isLoggedIn] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];
