import {Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {MenuItem} from '@core/types';

@Component({
    selector: 'app-side-menu',
    imports: [
        LucideAngularModule,
        RouterLink
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
    parentLabel = input<string | undefined>();
    menuItems = input<MenuItem[]>();
    menuItemClicked = output<MenuItem>();

    public onItemClick(item: MenuItem) {
        this.menuItemClicked.emit(item);
    }
}
