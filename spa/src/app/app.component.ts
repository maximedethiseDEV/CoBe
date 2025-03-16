// src/app/app.component.ts
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CountryComponent} from './components/country/country.component';
import {OrderComponent} from './components/order/order.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CountryComponent, OrderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
