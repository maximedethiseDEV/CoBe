import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MainMenuTestComponent} from './nav-menu/main-menu-test/main-menu-test.component';
import {SideMenuTestComponent} from './nav-menu/side-menu-test/side-menu-test.component';

@Component({
  selector: 'app-user-layout',
  imports: [
    RouterOutlet,
    MainMenuTestComponent,
    SideMenuTestComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  activeMenuItem: any = null;
  isSubMenuVisible = false;

  /**
   * Appelé quand on clique sur un élément du menu principal
   */
  onMenuItemSelected(menuItem: any): void {
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
  closeSubMenu(): void {
    this.isSubMenuVisible = false;
    setTimeout(() => (this.activeMenuItem = null), 300); // attendre la transition
  }

  onSubMenuItemClicked() {
    this.activeMenuItem = null;
  }
}
