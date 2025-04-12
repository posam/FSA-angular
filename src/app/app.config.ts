import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './auth.interceptor';
import localeSk from '@angular/common/locales/sk';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeSk, 'sk');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    // { provide: LOCALE_ID, useValue: 'sk' }
  ]
};
