import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        CommonModule
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  onCustomerClick(): void {
    this.router.navigateByUrl('/customerform');
  }

  onContactClick(): void {
    this.router.navigateByUrl('/contact');
  }


}
