import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard.service';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {DashboardComponent} from './user-layout/dashboard/dashboard.component';
import { LoginComponent } from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {HomeComponent} from './shared/home/home.component';
import {ScheduleComponent} from './user-layout/schedule/schedule.component';
import {OrderComponent} from './features/orders/order.component';
import {AddContactComponent} from './features/add-contact/add-contact.component';

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
      { path: 'order-form', title:'Ajouter une commande', component: OrderComponent},
      { path: 'add-contact', title:'Ajouter un contact', component: AddContactComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];
