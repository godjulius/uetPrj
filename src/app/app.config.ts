import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {translateProviders} from './i18n.config';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {MyPreset} from './styles/app-preset';
import {CommonInterceptor} from './core/services/common.interceptor';
import {MessageService} from 'primeng/api';
// Third-party authentication providers
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {environment} from '../environments/environment';

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
        // Third-party authentication providers
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                lang: 'en',
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment['google_oauth2'] ||
                            '678773826180-11bfng2mkn4h8h3p4s17kcl32a4fdjfp.apps.googleusercontent.com'
                        )
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('clientId')
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }
    ]
};
