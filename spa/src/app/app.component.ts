// src/app/app.component.ts
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CountryComponent} from './components/country/country.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CountryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
