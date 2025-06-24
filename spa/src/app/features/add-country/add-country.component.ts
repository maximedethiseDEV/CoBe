import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {distinctUntilChanged, Observable} from 'rxjs';
import {CountryDto} from "../../core/model/dto/country.dto";
import {CountryFinderComponent} from "./country-finder/country-finder.component";
import {CountryFormComponent} from "./country-form/country-form.component";

@Component({
  selector: 'app-add-country',
  imports: [
    CountryFormComponent,
    CountryFinderComponent
  ],
  templateUrl: './add-country.component.html'
})
export class AddCountryComponent implements OnInit, AfterViewInit {

  @ViewChild('countryFinder') countryFinder!: CountryFinderComponent;

  countryForm: FormGroup;
  countryPreview$!: Observable<CountryDto>;

  constructor(private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      countryName: [''],
      countryCode: ['']
    });
  }

  ngOnInit() {
    this.countryPreview$ = this.countryForm.valueChanges;
  }

  ngAfterViewInit() {
    this.countryForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(formValue => {
      if (this.countryFinder && this.countryFinder.dt) {
        this.countryFinder.dt.filters = {};

        Object.entries(formValue).forEach(([key, value]) => {
          if (value && typeof value === 'string' && value.trim() !== '') {
            this.countryFinder.dt.filter(value, key, 'contains');
          }
        });
      }
    });
  }
}
