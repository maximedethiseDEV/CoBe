import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RouterLink } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import { AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink,
    NavbarComponent
  ]
})
export class HeaderComponent {

  constructor(private authService: AuthService ,private router: Router) {
  }

  onLogin():void {
    this.router.navigate(['/login']);
  }

  onSignUp():void {
    this.router.navigate(['/register']);
  }

  onLogout():void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
