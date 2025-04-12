// src/app/app.component.ts
import { Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {AuthService} from './auth/auth.service';


/**
 * The AppComponent serves as the root component for the application. It utilizes
 * Angular's standalone component feature and is set up with a selector of 'app-root'.
 *
 * It imports RouterOutlet and HeaderComponent to define its structure and behavior.
 * The component uses an external HTML template and CSS stylesheet for its view.
 *
 * Dependencies injected into this component:
 * - AuthService: Handles the authentication functionalities like logging out the user.
 * - Router: Enables navigation between different routes in the application.
 *
 * Methods:
 * - logout(): Logs the user out using the AuthService and navigates to the root route.
 */
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
