import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LandingPageComponent} from './features/landingPageManagement/landing-page/landing-page.component';
import {DashboardComponent} from './features/dashBoardManagement/dashboard/dashboard.component';
import {ContactListComponent} from './features/dataManagement/contactManagement/contact-list/contact-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';


export const appRoutes: Routes = [
  { path: '',
    title: 'Welcome',
    component : LandingPageComponent
  },
  { path: 'register',
    title: "S'enregistrer",
    component: RegisterComponent
  },
  {
    path: 'login',
    title: 'Se connecter',
    component: LoginComponent
  },
  { path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'contact',
    title: 'Contact',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  }
];
