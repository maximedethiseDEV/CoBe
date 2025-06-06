import { Component } from '@angular/core';
import {DashboardheaderComponent} from '../dashboardheader/dashboardheader.component';
import {OrdersummaryComponent} from '../ordersummary/ordersummary.component';
import {WeeklyordersComponent} from '../weeklyorders/weeklyorders.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    DashboardheaderComponent,
    OrdersummaryComponent,
    WeeklyordersComponent
  ]
})
export class DashboardComponent{
}
