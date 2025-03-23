import { Component, OnInit } from '@angular/core';
import { Country } from '../country.model';
import { ApiService } from '../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData("countries").subscribe(
      response => {
        this.countries = response;
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  viewCountry(country: Country) {
    console.log('Viewing country:', country);
    // Ajoutez ici la logique pour visualiser le pays
  }

  editCountry(country: Country) {
    console.log('Editing country:', country);
    // Ajoutez ici la logique pour modifier le pays
  }
}
