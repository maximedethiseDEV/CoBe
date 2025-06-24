import { Component } from '@angular/core';
import {ICONS_LIST} from '../../core/lucide-icons-list';
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

  protected readonly ICONS_LIST = ICONS_LIST;
}
