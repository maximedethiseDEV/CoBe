import {ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {ChartModule} from 'primeng/chart';
import {isPlatformBrowser} from '@angular/common';
import {CountryProvider, CityProvider} from '@core/providers';
import {Country, City, PaginatedResponse} from '@core/models';
import {forkJoin} from 'rxjs';

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
    }[];
}

interface ChartOptions {
    cutout: string;
    plugins: {
        legend: {
            labels: {
                color: string;
            };
        };
    };
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        LucideAngularModule,
        ChartModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    public readonly iconsList = LucideIconsList;

    data!: ChartData;
    options!: ChartOptions;

    platformId = inject(PLATFORM_ID);
    private countryProvider = inject(CountryProvider);
    private cityProvider = inject(CityProvider);

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        forkJoin({
            countries: this.countryProvider.getAll(),
            cities: this.cityProvider.getAll()
        }).subscribe(({countries, cities}) => {
            this.initChart(countries, cities);
        });
    }

    private initChart(countries: PaginatedResponse<Country>, cities: PaginatedResponse<City>) {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            // Créer un Map pour compter les villes par pays
            const citiesPerCountry = new Map<string, number>();
            countries.content.forEach(country => {
                const cityCount = cities.content.filter(city => city.countryId === country.id).length;
                citiesPerCountry.set(country.countryName, cityCount);
            });

            const labels = Array.from(citiesPerCountry.keys());
            const cityCounts = Array.from(citiesPerCountry.values());

            // Générer des couleurs dynamiques
            const backgroundColors = labels.map((_, index) =>
                `hsl(${(index * 360) / labels.length}, 70%, 50%)`
            );
            const hoverBackgroundColors = labels.map((_, index) =>
                `hsl(${(index * 360) / labels.length}, 70%, 60%)`
            );

            this.data = {
                labels: labels,
                datasets: [
                    {
                        data: cityCounts,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: hoverBackgroundColors
                    }
                ]
            };

            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };

            this.cd.markForCheck();
        }
    }
}
