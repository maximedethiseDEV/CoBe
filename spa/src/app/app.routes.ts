import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LandingPageComponent} from './features/landingPageManagement/landing-page/landing-page.component';
import {DashboardComponent} from './features/dashBoardManagement/dashboard/dashboard.component';
import {ContactListComponent} from './features/dataManagement/contactManagement/contact-list/contact-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';


/**
 * Defines the application routes for navigation and component rendering.
 * Each route specifies a path, title, associated component, and optional route guards or additional data.
 *
 * Routes:
 * - '' (root): Displays the landing page.
 * - 'register': Displays the registration page.
 * - 'login': Displays the login page.
 * - 'dashboard': Displays the dashboard, accessible only for authenticated users with the role 'USER'.
 * - 'contact': Displays the contact list, accessible only for authenticated users with the role 'USER'.
 *
 * Properties:
 * - `path`: Specifies the URL path for the route.
 * - `title`: Sets the title of the page for the route.
 * - `component`: The Angular component to be rendered for the route.
 * - `canActivate`: (Optional) An array of route guards to control access to the route.
 * - `data`: (Optional) Additional metadata associated with the route.
 */
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
    data: { role: 'USER' },
  },
  { path: 'contact',
    title: 'Contact',
    component: ContactListComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  }
];
