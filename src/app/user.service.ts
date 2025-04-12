import {Injectable, signal} from '@angular/core';
import {UserModel} from './core/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<UserModel | undefined>(undefined);

  getUserSignal() {
    return this.user.asReadonly();
  }

}
