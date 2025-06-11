import { Component } from '@angular/core';
import {LucideIconsService} from '../../api/lucide-icons.service';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  TrafficCone;
  Truck;
  ChartLine;
  CirclePlus;

  constructor(
    private lucideService: LucideIconsService,
  ) {
    this.TrafficCone = this.lucideService.getIcon('TrafficCone');
    this.Truck = this.lucideService.getIcon('Truck');
    this.ChartLine = this.lucideService.getIcon('ChartLine');
    this.CirclePlus = this.lucideService.getIcon('CirclePlus');
  }
}
