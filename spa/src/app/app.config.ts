import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {
    PreloadAllModules,
    provideRouter,
    TitleStrategy,
    withComponentInputBinding,
    withPreloading
} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {MessageService} from 'primeng/api';

import {routes} from './app.routes';
import {CustomTitleStrategy} from '@core/services';
import {AuthenticationInterceptor} from '@core/interceptors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
        provideHttpClient(withInterceptors([AuthenticationInterceptor])),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false
                }
            }
        }),
        MessageService,
        {
            provide: TitleStrategy,
            useClass: CustomTitleStrategy
        }
    ]
};
