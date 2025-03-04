import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {translateProviders} from './i18n.config';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {MyPreset} from './styles/app-preset';
import {commonInterceptor, CommonInterceptor} from './core/services/common.interceptor';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        ...translateProviders,
        provideHttpClient(withInterceptorsFromDi()),
        // provideHttpClient(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CommonInterceptor,
            multi: true
        },
        MessageService,
        // provideHttpClient(withInterceptors([commonInterceptor])),
        providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.dark',
                    // darkModeSelector: 'system',
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
