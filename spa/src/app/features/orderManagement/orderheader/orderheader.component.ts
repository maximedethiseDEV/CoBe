import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';


@Component({
  selector: 'app-orderheader',
  imports: [
    CommonModule,
  ],
  templateUrl: './orderheader.component.html',
  styleUrl: './orderheader.component.css'
})
export class OrderheaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  onCustomerClick(): void {
    this.router.navigateByUrl('/customerform');
  }
}
