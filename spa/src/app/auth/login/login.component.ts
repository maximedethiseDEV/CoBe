import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * The `LoginComponent` is a standalone Angular component designed for handling user login functionality.
 * It interacts with an authentication service to validate user credentials and manages navigation upon successful login.
 *
 * This component uses Angular's `CommonModule` and `FormsModule` to support its template rendering and data-binding features.
 *
 * Features:
 * - Provides input fields for `username` and `password`.
 * - Makes an authentication request to the `AuthService` upon login.
 * - Handles and displays error messages for failed login attempts.
 * - Stores authentication token and roles in session storage upon successful login.
 * - Navigates the user to the `dashboard` page after successful authentication.
 *
 * Dependencies:
 * - `AuthService` for communicating with the backend authentication system.
 * - `Router` for redirecting to different application routes.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = null;

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response?.token && response?.roles) {
          // Nettoyer les rôles pour supprimer le préfixe "ROLE_"
          const cleanedRoles = response.roles
            .split(',')
            .map((role: string) => role.replace('ROLE_', ''));

          sessionStorage.setItem('app.token', response.token);
          sessionStorage.setItem('app.roles', cleanedRoles.join(',')); // Stocker les rôles nettoyés
          this.router.navigateByUrl('dashboard');
        } else {
          this.errorMessage = 'Connexion échouée. Jeton ou rôles non reçus.';
        }
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = error.error?.message || 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
    );
  }
}
