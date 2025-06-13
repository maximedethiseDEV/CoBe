import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {DashboardComponent} from './user-layout/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './shared/home/home.component';
import {OrderFormComponent} from './features/orders/order-form/order-form.component';
import {ScheduleComponent} from './user-layout/schedule/schedule.component';

export const routes: Routes = [



  { path: 'login', title: "Se connecter", component: LoginComponent },
  { path: 'register', title: "S'enregistrer", component: RegisterComponent },
  { path: '', title: 'Accueil', component: HomeComponent },

  {
    path: 'app',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' },
    children: [
      { path: 'dashboard', title:'Tableau de bord', component: DashboardComponent },
      { path: 'schedule', title:'Planification', component: ScheduleComponent},
      { path: 'order-form', title:'Nouvelle commande', component: OrderFormComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];
