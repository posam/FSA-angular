import {Injectable, signal} from '@angular/core';
import {UserModel} from './core/models/user-model';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './core/config/authCodeFlowConfig.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<UserModel | undefined>(undefined);

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.tryLogin();
  }


  getUserSignal() {
    return this.user.asReadonly();
  }

  tryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        this.user.set(this.oauthService.getIdentityClaims() as UserModel);
      })
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        this.user.set(this.oauthService.getIdentityClaims() as UserModel);
      })
  }

  logout() {
    this.oauthService.logOut();
    this.user.set(undefined);
  }




}
