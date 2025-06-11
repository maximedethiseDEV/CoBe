import { Component } from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {SideMenuComponent} from './side-menu/side-menu.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MainMenuComponent,
    SideMenuComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
