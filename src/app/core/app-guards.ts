import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';
import { inject } from '@angular/core';

export const isLoggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.tryLogin().then((user) => {
    if (user) {
      return true;
    } else {
      // return router.createUrlTree(['/counter']);
      userService.login();
      return false;
    }
  });
};
