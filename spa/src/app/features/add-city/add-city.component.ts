import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {distinctUntilChanged, Observable} from 'rxjs';
import {CityDto} from "../../core/model/dto/city.dto";
import {CityFinderComponent} from "./city-finder/city-finder.component";
import {CityFormComponent} from "./city-form/city-form.component";
import {CountryDto} from '../../core/model/dto/country.dto';
import {CountryService} from '../../core/service/country.service';

@Component({
  selector: 'app-add-city',
  imports: [
    CityFormComponent,
    CityFinderComponent
  ],
  templateUrl: './add-city.component.html'
})
export class AddCityComponent implements OnInit, AfterViewInit {

  @ViewChild('cityFinder') cityFinder!: CityFinderComponent;

  cityForm: FormGroup;
  cityPreview$!: Observable<CityDto>;
  countries: CountryDto[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {
    this.cityForm = this.fb.group({
      cityName: [''],
      postalCode: [''],
      country: this.fb.group({
        countryId: ['']
      })
    });
  }

  ngOnInit() {
    this.cityPreview$ = this.cityForm.valueChanges;

    this.countryService.getAllCountries().subscribe({
      next: countries => this.countries = countries,
      error: err => console.error('Erreur lors du chargement des pays', err)
    });
  }

  ngAfterViewInit() {
    this.cityForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(formValue => {
      if (this.cityFinder && this.cityFinder.dt) {
        this.cityFinder.dt.filters = {};

        Object.entries(formValue).forEach(([key, value]) => {
          if (value && typeof value === 'string' && value.trim() !== '') {
            this.cityFinder.dt.filter(value, key, 'contains');
          }
        });
      }
    });
  }
}
