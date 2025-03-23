import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LandingPageComponent} from './features/landingPageManagement/landing-page/landing-page.component';
import {DashboardComponent} from './features/dashBoardManagement/dashboard/dashboard.component';
import {ContactListComponent} from './features/dataManagement/contactManagement/contact-list/contact-list.component';
import { LoginComponent } from './auth/login/login.component';


export const appRoutes: Routes = [
  { path: '',
    title: 'Welcome',
    component : LandingPageComponent
  },
  { path: 'register',
    title: 'Sign up',
    component: RegisterComponent
  },
  {
    path: 'login',
    title: 'Sign in',
    component: LoginComponent
  },
  { path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  },
  { path: 'contact',
    title: 'Contact',
    component: ContactListComponent
  }
];
