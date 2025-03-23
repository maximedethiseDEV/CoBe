import { Routes } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


export const appRoutes: Routes = [
  { path: '',
    title: 'Welcome',
    component : LandingPageComponent
  },
  { path: 'register',
    title: 'Sign up',
    component: RegisterComponent
  },
  { path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  }
];
