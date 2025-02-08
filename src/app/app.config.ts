import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {translateProviders} from './i18n.config';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MyPreset} from './styles/app-preset';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        ...translateProviders,
        provideHttpClient(withInterceptorsFromDi()),
        providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                    prefix: 'p',
                    // darkModeSelector: '.my-app-dark',
                    darkModeSelector: 'system',
                    cssLayer: false,

                },
            },
            ripple: true,
            csp: {
                nonce: '...'
            },
            translation: {
                accept: 'Accept',
                reject: 'Reject',
                //translations
            }
        }),

    ]
};
