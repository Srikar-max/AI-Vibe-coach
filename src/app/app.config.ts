import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import { provideHttpClient } from '@angular/common/http';

export function playerFactory() {
  return import('lottie-web');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideLottieOptions({
      player: playerFactory,
    }),
    provideHttpClient()
  ],
};
