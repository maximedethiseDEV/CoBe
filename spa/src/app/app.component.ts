// src/app/app.component.ts
import { Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl("/");
  }

}
