import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryComponent } from './components/country/country.component';


export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'country', component: CountryComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];