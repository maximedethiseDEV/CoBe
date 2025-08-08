import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MainMenuComponent, SideMenuComponent} from '@core/components';

@Component({
    selector: 'app-hub',
    imports: [
        RouterOutlet,
        MainMenuComponent,
        SideMenuComponent
    ],
    templateUrl: './hub.component.html'
})
export class HubComponent {
    private isSubMenuVisible: boolean = false;
    public activeMenuItem: any = null;

    /**
     * Appelé quand on clique sur un élément du menu principal
     */
    public onMenuItemSelected(menuItem: any): void {
        if (this.activeMenuItem === menuItem) {
            // Toggle si on clique une deuxième fois
            this.closeSubMenu();
        } else {
            this.activeMenuItem = menuItem;
            this.isSubMenuVisible = true;
        }
    }

    /**
     * Ferme le sous-menu
     */
    private closeSubMenu(): void {
        this.isSubMenuVisible = false;

        const timeOut: any = setTimeout(() => {
            this.activeMenuItem = null
            clearTimeout(timeOut);
        }, 300);
    }

    public onSubMenuItemClicked() {
        this.activeMenuItem = null;
    }
}
