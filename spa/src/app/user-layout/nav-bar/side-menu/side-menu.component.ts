import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../menu-state.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  activeMenu: string | null = null;

  constructor(private menuStateService: MenuStateService) {}

  ngOnInit(): void {
    // Écouter les modifications du menu actif
    this.menuStateService.activeMenu$.subscribe((menuId: string | null) => {
      this.activeMenu = menuId;
    });
  }
}
