import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {ChartModule} from 'primeng/chart';
import {ChartData, ChartOptions, Pagination} from '@core/types';
import {forkJoin} from 'rxjs';
import {CityProvider, CountryProvider} from '@core/providers';
import {Country, City} from '@core/models';

@Component({
    selector: 'app-dashboard',
    imports: [
        LucideAngularModule,
        ChartModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    private countryProvider: CountryProvider = inject(CountryProvider);
    private cityProvider: CityProvider = inject(CityProvider);
    public readonly iconsList: any = LucideIconsList;
    public data!: ChartData;
    public options!: ChartOptions;

    ngOnInit(): void {
        this.computeData();
    }

    private computeData(): void {
        forkJoin({
            countries: this.countryProvider.getAll(),
            cities: this.cityProvider.getAll()
        }).subscribe((response: {countries: Pagination<Country>; cities: Pagination<City>}) => {
            this.computeChart(response.countries.content, response.cities.content);
        });
    }

    private computeChart(countries: Country[], cities: City[]): void {
        countries.sort((previousCountry: Country, nextCountry: Country) => previousCountry.countryName.localeCompare(nextCountry.countryName));

        const labels: string[] = countries.map((country: Country) => country.countryName);
        const cityCounts: number[] = [];
        for (const country of countries) {
            const count: number = cities.filter((city: City) => city.countryId === country.id)?.length || 0;
            cityCounts.push(count);
        }

        const backgroundColors: any = labels.map((_: string, index: number) =>
            `hsl(${(index * 360) / labels.length}, 70%, 50%)`
        );
        const hoverBackgroundColors: any = labels.map((_: string, index: number) =>
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
                        color: '#000'
                    }
                }
            }
        };
    }
}
