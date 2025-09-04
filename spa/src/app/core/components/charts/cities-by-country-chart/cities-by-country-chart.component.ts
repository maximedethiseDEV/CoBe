import {Component, OnInit, inject} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {forkJoin} from 'rxjs';
import {CountryProvider, CityProvider} from '@core/providers';
import {Country, City} from '@core/models';
import {ChartData, ChartOptions} from '@core/types';

@Component({
    selector: 'app-cities-by-country-chart',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './cities-by-country-chart.component.html'
})
export class CitiesByCountryChartComponent implements OnInit {
    private countryProvider = inject(CountryProvider);
    private cityProvider = inject(CityProvider);

    public data!: ChartData;
    public options!: ChartOptions;

    ngOnInit(): void {
        this.computeData();
    }

    private computeData(): void {
        forkJoin({
            countries: this.countryProvider.getAllNoPage(),
            cities: this.cityProvider.getAllNoPage()
        }).subscribe(({ countries, cities }: { countries: Country[]; cities: City[] }) => {
            this.computeChart(countries, cities);
        });
    }

    private computeChart(countries: Country[], cities: City[]): void {
        countries.sort((a, b) => a.countryName.localeCompare(b.countryName));

        const labels = countries.map(c => c.countryName);
        const cityCounts = countries.map(c =>
            cities.filter(city => city.countryId === c.id).length
        );

        const backgroundColors = labels.map((_, i) =>
            `hsl(${(i * 360) / labels.length}, 70%, 50%)`
        );
        const hoverBackgroundColors = labels.map((_, i) =>
            `hsl(${(i * 360) / labels.length}, 70%, 60%)`
        );

        this.data = {
            labels,
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
