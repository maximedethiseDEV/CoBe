import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {ChartModule} from 'primeng/chart';
import {PurchaseOrderNextDayChartComponent, TonnageByCustomerChartComponent} from '@core/components';

@Component({
    selector: 'app-dashboard',
    imports: [
        LucideAngularModule,
        ChartModule,
        PurchaseOrderNextDayChartComponent,
        TonnageByCustomerChartComponent
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
