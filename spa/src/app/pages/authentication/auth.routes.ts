import {Routes} from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        title: 'Se connecter',
        loadComponent: () => import('./components/login/login.component').then(component => component.LoginComponent)
    },
    {
        path: 'register',
        title: 'S\'enregistrer',
        loadComponent: () => import('./components/register/register.component').then(component => component.RegisterComponent)
    }
];
