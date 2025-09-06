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
    },
    {
        path: 'forget-password',
        title: 'Mot de passe oublié',
        loadComponent: () => import('./components/forget-password/forget-password.component').then(component => component.ForgetPasswordComponent)
    }
];
