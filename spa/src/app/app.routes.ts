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
import {ProfileSettingsComponent} from './features/profile-settings/profile-settings.component';
import {AddCountryComponent} from './features/add-country/add-country.component';
import {AddCityComponent} from './features/add-city/add-city.component';
import {AddressComponent} from './features/address/address.component';
import {AddressFormComponent} from './features/address/address-form/address-form.component';

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

      { path: 'settings', title: "Modifier les paramètres", component: ProfileSettingsComponent},

      { path: 'dashboard', title:'Tableau de bord', component: DashboardComponent },

      { path: 'schedule', title:'Planification', component: ScheduleComponent},

      { path: 'add-order', title:'Ajouter une commande', component: OrderComponent},

      { path: 'add-contact', title:'Ajouter un contact', component: AddContactComponent},

      { path: 'add-country', title: 'Ajouter un pays', component: AddCountryComponent},

      { path: 'add-city', title: 'Ajouter une ville', component: AddCityComponent},

      { path: 'read-address', title: 'Ajouter une adresse', component: AddressComponent},
      { path: 'add-address', title: 'Ajouter une adresse', component: AddressFormComponent},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];
