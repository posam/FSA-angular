import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './core/auth-interceptor';
import localeSk from '@angular/common/locales/sk';
import { registerLocaleData } from '@angular/common';
import { DefaultOAuthInterceptor, provideOAuthClient } from 'angular-oauth2-oidc';

registerLocaleData(localeSk, 'sk');


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(/*withInterceptors([authInterceptor])*/ withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'sk' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true },
  ],
};
