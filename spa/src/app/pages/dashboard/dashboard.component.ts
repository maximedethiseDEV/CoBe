import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
    selector: 'app-dashboard',
    imports: [
        LucideAngularModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public readonly iconsList: any = LucideIconsList;
}
