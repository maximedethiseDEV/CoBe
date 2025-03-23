import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink
  ]
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  onLogin():void {
    this.router.navigate(['/login']);
  }

  onSignUp():void {
    this.router.navigate(['/register']);
  }

}
