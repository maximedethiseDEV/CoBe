import { bootstrapApplication } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { ApiService } from './app/api/api.service';
import {AuthInterceptor} from './app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    ApiService,
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ]
}).catch(err => console.error(err));
