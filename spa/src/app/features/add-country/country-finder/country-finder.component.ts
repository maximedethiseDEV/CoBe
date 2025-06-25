import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { FormGroup } from '@angular/forms';
import {Observable, tap, Subscription, filter} from 'rxjs';
import {NgIf} from '@angular/common';
import {NavigationStart, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {CountryDto} from '../../../core/model/dto/country.dto';
import {CountryService} from '../../../core/service/country.service';
import {CountrySummaryComponent} from '../country-summary/country-summary.component';

@Component({
  selector: 'app-country-finder',
  standalone: true,
  imports: [
    TableModule,
    Button,
    NgIf,
    CountrySummaryComponent,
  ],
  templateUrl: './country-finder.component.html',
})
export class CountryFinderComponent implements OnInit, OnDestroy {

  countries: CountryDto[] = [];
  previewCountry$: CountryDto | null = null;
  private sseSubscription!: Subscription;
  private routerSubscription!: Subscription;

  // Configuration du tableau PrimeNg
  @ViewChild('dt') dt!: Table;
  selectedCountry!: CountryDto;
  loading: boolean = true;
  metaKey: boolean = true;
  readonly TABLE_STYLE = { width: '100%', height: '100%' };
  readonly rowsPerPageOptions = [50, 100, 200];
  globalFilterFields: string[] = [
    'countryName',
    'countryCode'
];
  displayDialog: boolean = false;

  @Input() countryForm!: FormGroup;
  @Input() countryPreview$!: Observable<CountryDto>;

  constructor(
    private countryService: CountryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.countryPreview$.subscribe(preview => {
      this.previewCountry$ = preview;
    });

    this.loadCountries();
    this.setupSseConnection();

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.cleanupSse();
      });
  }

  ngOnDestroy() {
    this.cleanupSse();

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private cleanupSse() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }


  private setupSseConnection() {
    this.sseSubscription = this.countryService.subscribeToCountryUpdates()
      .subscribe({
        next: (event) => {
          if (event.eventType === 'CREATE') {
            this.countries = [...this.countries, event.payload];
          }
          else if (event.eventType === 'UPDATE') {
            this.countries = this.countries.map(country =>
              country.countryId === event.payload.countryId ? event.payload : country
            );
          }
          else if (event.eventType === 'DELETE') {
            this.countries = this.countries.filter(country =>
              country.countryId !== event.payload.countryId
            );
          }
        },
        error: (error) => {
          console.error('Erreur SSE:', error);
        }
      });
  }

  loadCountries() {
    this.loading = true;
    this.countryService.getAllCountries()
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe({
        next: (countries) => {
          this.countries = countries;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des countries:', error);
          this.loading = false;
        }
      });
  }

  get tableData(): CountryDto[] {
    return this.countries;
  }


  clear(table: Table): void {
    table.clear();
    if (this.countryForm) {
      this.countryForm.reset();
    }
  }


  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

  onRowSelect(event: any) {
    this.selectedCountry = event.data;
    this.displayDialog = true;
  }

  copyCountryToForm(country: CountryDto) {
    if (this.countryForm) {
      this.countryForm.patchValue({
        countryName: country.countryName,
        countryCode: country.countryCode
      });
      this.displayDialog = false;
    }
  }
}
