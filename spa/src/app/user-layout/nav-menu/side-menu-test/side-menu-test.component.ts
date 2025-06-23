import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MenuItem } from '../menu-item';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu-test',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './side-menu-test.component.html',
  styleUrl: './side-menu-test.component.css'
})
export class SideMenuTestComponent {
  @Input() parentLabel!: string | undefined;
  @Input() menuItems!: MenuItem[];
  @Output() menuItemClicked = new EventEmitter<MenuItem>();

  onItemClick(item: MenuItem) {
    this.menuItemClicked.emit(item);
  }
}
