import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { FormGroup } from '@angular/forms';
import {Observable, tap, Subscription, filter} from 'rxjs';
import {NgIf} from '@angular/common';
import {NavigationStart, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {CityDto} from '../../../core/model/dto/city.dto';
import {CityService} from '../../../core/service/city.service';
import {CitySummaryComponent} from '../city-summary/city-summary.component';
import {CountryDto} from '../../../core/model/dto/country.dto';

@Component({
  selector: 'app-city-finder',
  standalone: true,
  imports: [
    TableModule,
    Button,
    NgIf,
    CitySummaryComponent,
  ],
  templateUrl: './city-finder.component.html',
})
export class CityFinderComponent implements OnInit, OnDestroy {

  cities: CityDto[] = [];
  countries: CountryDto[] = [];
  previewCity$: CityDto | null = null;
  private sseSubscription!: Subscription;
  private routerSubscription!: Subscription;

  // Configuration du tableau PrimeNg
  @ViewChild('dt') dt!: Table;
  selectedCity!: CityDto;
  loading: boolean = true;
  metaKey: boolean = true;
  readonly TABLE_STYLE = { width: '100%', height: '100%' };
  readonly rowsPerPageOptions = [50, 100, 200];
  globalFilterFields: string[] = [
    'postalCode',
    'cityName',
    'country.countryName'
];
  displayDialog: boolean = false;

  @Input() cityForm!: FormGroup;
  @Input() cityPreview$!: Observable<CityDto>;

  constructor(
    private cityService: CityService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cityPreview$.subscribe(preview => {
      this.previewCity$ = preview;
    });

    this.loadCities();
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
    this.sseSubscription = this.cityService.subscribeToCityUpdates()
      .subscribe({
        next: (event) => {
          if (event.eventType === 'CREATE') {
            this.cities = [...this.cities, event.payload];
          }
          else if (event.eventType === 'UPDATE') {
            this.cities = this.cities.map(city =>
              city.cityId === event.payload.cityId ? event.payload : city
            );
          }
          else if (event.eventType === 'DELETE') {
            this.cities = this.cities.filter(city =>
              city.cityId !== event.payload.cityId
            );
          }
        },
        error: (error) => {
          console.error('Erreur SSE:', error);
        }
      });
  }

  loadCities() {
    this.loading = true;
    this.cityService.getAllCities()
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe({
        next: (cities) => {
          this.cities = cities;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des cities:', error);
          this.loading = false;
        }
      });
  }

  get tableData(): CityDto[] {
    return this.cities;
  }


  clear(table: Table): void {
    table.clear();
    if (this.cityForm) {
      this.cityForm.reset();
    }
  }


  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

  onRowSelect(event: any) {
    this.selectedCity = event.data;
    this.displayDialog = true;
  }

  copyCityToForm(city: CityDto) {
    if (this.cityForm) {
      this.cityForm.patchValue({
        postalCode: city.postalCode,
        cityName: city.cityName,
        countryId: city.country.countryId
      });
      this.displayDialog = false;
    }
  }
}
