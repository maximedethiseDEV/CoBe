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
  private filterMapFormToFinder: { [formKey: string]: string } = {
    cityName: 'cityName',
    postalCode: 'postalCode',
    countryId: 'country.countryCode' // <- clé du champ filtré dans le Finder
  };

  constructor(
    private formGroup: FormBuilder,
    private countryService: CountryService
  ) {
    this.cityForm = this.formGroup.group({
      cityName: [''],
      postalCode: [''],
      countryId: ['']
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

        Object.entries(formValue).forEach(([formKey, value]) => {
          const tableKey = this.filterMapFormToFinder[formKey];
          const isNotEmpty = value !== null && value !== undefined && value !== '';
          if (tableKey && isNotEmpty) {
            this.cityFinder.dt.filter(value, tableKey, 'contains');
          }
        });
      }
    });
  }
}
